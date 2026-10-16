// Ties this device's save to one child on the signed-in family account and
// keeps the account copy up to date. See services/cloudSync.ts for the rules.
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react';
import type { UserProgressState } from '../types';
import type { Access } from '../services/access';
import { createDefaultState } from '../services/storage';
import {
  addKid, listKids, loadCopy, pushCopy, readLink, reconcile, writeLink,
  type CloudCopy, type CloudLink, type Kid, type SyncPlan,
} from '../services/cloudSync';

/**
 * - off: no account server here (development build, opened outside lopso.vn) or this tab is read-only.
 * - signed-out: a parent can sign in to start saving.
 * - choose: signed in; pick (or add) the child this device learns for.
 * - ask: this device and the account both changed; the player picks which to keep.
 */
export type CloudPhase = 'off' | 'signed-out' | 'loading' | 'choose' | 'ask' | 'saving' | 'saved' | 'error';
export interface CloudConflict { kidId: string; kidName: string; copy: CloudCopy; linking: boolean }
export interface CloudSync {
  phase: CloudPhase;
  kids: Kid[];
  link: CloudLink | null;
  conflict: CloudConflict | null;
  busy: boolean;
  message: string;
  chooseKid: (kid: Kid) => Promise<void>;
  createKid: (name: string) => Promise<void>;
  resolveConflict: (keep: 'device' | 'account' | 'cancel') => void;
  switchKid: () => Promise<void>;
}

const SAVE_EVERY_MS = 30_000;

export function useCloudSync({ access, writable, state, stateRef, replaceState }: {
  access: Access;
  writable: boolean;
  state: UserProgressState;
  stateRef: MutableRefObject<UserProgressState>;
  /** Puts a whole save on this device (and on screen); false when it could not be saved. */
  replaceState: (next: UserProgressState) => boolean;
}): CloudSync {
  // Whether this device had unsaved changes when the page opened, before this visit's own writes.
  const [opened] = useState(() => readLink());
  const [link, setLinkState] = useState<CloudLink | null>(opened);
  const linkRef = useRef(link);
  const setLink = useCallback((next: CloudLink | null) => {
    linkRef.current = next;
    writeLink(next);
    setLinkState(next);
  }, []);
  const [phase, setPhaseState] = useState<CloudPhase>('off');
  const phaseRef = useRef(phase);
  const setPhase = useCallback((next: CloudPhase) => { phaseRef.current = next; setPhaseState(next); }, []);
  const [kids, setKids] = useState<Kid[]>([]);
  const [conflict, setConflict] = useState<CloudConflict | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const inFlight = useRef(false);
  const active = access.status === 'signed-in' && writable;
  const activeRef = useRef(active);
  activeRef.current = active;

  // Any change to the save after it matched the account is a change to send.
  const quiet = useRef(state);
  useEffect(() => {
    if (state === quiet.current) return;
    quiet.current = state;
    const current = linkRef.current;
    if (current && !current.dirty) setLink({ ...current, dirty: true });
  }, [state, setLink]);

  const push = useCallback(async (keepalive = false) => {
    const current = linkRef.current;
    if (!current || inFlight.current || !activeRef.current || phaseRef.current === 'ask') return;
    inFlight.current = true;
    setPhase('saving');
    const sent = stateRef.current;
    const result = await pushCopy(current.kidId, current.rev, sent, fetch, keepalive);
    inFlight.current = false;
    if (linkRef.current?.kidId !== current.kidId) return;
    if (result.kind === 'saved') {
      setLink({ ...linkRef.current, rev: result.rev, dirty: stateRef.current !== sent, savedAt: Date.now() });
      setPhase('saved');
    } else if (result.kind === 'stale') {
      setConflict({ kidId: current.kidId, kidName: current.kidName, copy: result.copy, linking: false });
      setPhase('ask');
    } else if (result.kind === 'missing') {
      // Another parent signed in on this device: this child is not on their account.
      setLink(null);
      setKids((await listKids()) ?? []);
      setPhase('choose');
    } else setPhase('error');
  }, [stateRef, setLink, setPhase]);

  const adopt = useCallback((kidId: string, kidName: string, copy: CloudCopy) => {
    if (!copy.state || !replaceState(copy.state)) { setPhase('error'); return; }
    quiet.current = stateRef.current;
    setLink({ kidId, kidName, rev: copy.rev, dirty: false, savedAt: copy.updatedAt || Date.now() });
    setPhase('saved');
  }, [replaceState, stateRef, setLink, setPhase]);

  const apply = useCallback((plan: SyncPlan, kidId: string, kidName: string, linking: boolean) => {
    setConflict(null);
    if (plan.kind === 'adopt') return adopt(kidId, kidName, plan.copy);
    if (plan.kind === 'ask') {
      setConflict({ kidId, kidName, copy: plan.copy, linking });
      return setPhase('ask');
    }
    const current = linkRef.current?.kidId === kidId ? linkRef.current : null;
    if (plan.kind === 'in-sync') {
      setLink({ kidId, kidName, rev: current?.rev ?? 0, dirty: current?.dirty ?? false, savedAt: current?.savedAt });
      return setPhase('saved');
    }
    setLink({ kidId, kidName, rev: plan.baseRev, dirty: true, savedAt: current?.savedAt });
    setPhase('saved');
    void push();
  }, [adopt, push, setLink, setPhase]);

  // On opening (and after sign-in): catch up with the account, or ask which child this is.
  useEffect(() => {
    if (access.status === 'signed-out') { setPhase('signed-out'); return; }
    if (!active) { setPhase('off'); return; }
    let stopped = false;
    void (async () => {
      setPhase('loading');
      const current = linkRef.current;
      if (current) {
        const loaded = await loadCopy(current.kidId);
        if (stopped) return;
        if (loaded.kind === 'failed') return setPhase('error');
        if (loaded.kind === 'loaded') {
          const dirty = opened?.kidId === current.kidId ? opened.dirty : current.dirty;
          return apply(reconcile(stateRef.current, { ...current, dirty }, current.kidId, loaded.copy), current.kidId, current.kidName, false);
        }
        setLink(null);
      }
      const list = await listKids();
      if (stopped) return;
      if (!list) return setPhase('error');
      setKids(list);
      setPhase('choose');
    })();
    return () => { stopped = true; };
    // Runs again only when the account or this tab's right to save changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access.status, active]);

  // Send changes every little while, and once more as the page is hidden or closed.
  useEffect(() => {
    if (!active) return;
    const tick = () => { if (linkRef.current?.dirty && phaseRef.current !== 'loading') void push(); };
    const timer = setInterval(tick, SAVE_EVERY_MS);
    const onHide = () => { if (document.visibilityState === 'hidden' && linkRef.current?.dirty) void push(true); };
    document.addEventListener('visibilitychange', onHide);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onHide); };
  }, [active, push]);

  const chooseKid = useCallback(async (kid: Kid) => {
    setBusy(true);
    setMessage('');
    const loaded = await loadCopy(kid.id);
    setBusy(false);
    if (loaded.kind !== 'loaded') { setMessage('Chưa mở được tiến độ của bé. Kiểm tra mạng rồi thử lại.'); return; }
    apply(reconcile(stateRef.current, linkRef.current, kid.id, loaded.copy), kid.id, kid.name, true);
  }, [apply, stateRef]);

  const createKid = useCallback(async (name: string) => {
    setBusy(true);
    setMessage('');
    const added = await addKid(name.trim());
    setBusy(false);
    if (added.kind === 'limit') { setMessage('Tài khoản đã có đủ 6 bé.'); return; }
    if (added.kind !== 'added') { setMessage('Chưa thêm được bé. Kiểm tra mạng rồi thử lại.'); return; }
    setKids(list => [...list, added.kid]);
    apply({ kind: 'push', baseRev: 0 }, added.kid.id, added.kid.name, true);
  }, [apply]);

  const resolveConflict = useCallback((keep: 'device' | 'account' | 'cancel') => {
    const current = conflict;
    if (!current) return;
    setConflict(null);
    if (keep === 'cancel') { setPhase('choose'); return; }
    if (keep === 'account') { adopt(current.kidId, current.kidName, current.copy); return; }
    setLink({ kidId: current.kidId, kidName: current.kidName, rev: current.copy.rev, dirty: true, savedAt: linkRef.current?.savedAt });
    setPhase('saved');
    void push();
  }, [conflict, adopt, push, setLink, setPhase]);

  // Another child on the same device: save this one's progress, then start from a clean device.
  const switchKid = useCallback(async () => {
    setMessage('');
    if (linkRef.current?.dirty) {
      setBusy(true);
      await push();
      setBusy(false);
      if (linkRef.current?.dirty) { setMessage('Cần có mạng để lưu bài của bé trước khi đổi bé khác.'); return; }
    }
    setLink(null);
    if (!replaceState(createDefaultState())) return;
    quiet.current = stateRef.current;
    setKids((await listKids()) ?? []);
    setPhase('choose');
  }, [push, replaceState, stateRef, setLink, setPhase]);

  return { phase, kids, link, conflict, busy, message, chooseKid, createKid, resolveConflict, switchKid };
}
