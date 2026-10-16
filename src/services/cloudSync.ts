// Keeps a child's progress on the family account at lopso.vn, so a new or
// broken device can carry on where the child stopped. The copy on this device
// is still the one the game plays from; the account copy follows it whenever
// there is a network. Each save on the server has a revision number, and a
// device may only save on top of the revision it last saw.
import type { UserProgressState } from '../types';
import { migrateState } from './storage';

export const CLOUD_APP = 'english-adventure';
const LINK_KEY = 'ENGLISH_ADVENTURE_CLOUD_V1';

export interface Kid { id: string; name: string }
/** Which child this device saves for, and the account revision it last matched. */
export interface CloudLink { kidId: string; kidName: string; rev: number; dirty: boolean; savedAt?: number }
export interface CloudCopy { rev: number; state: UserProgressState | null; updatedAt: number }

export function readLink(): CloudLink | null {
  try {
    const value = JSON.parse(localStorage.getItem(LINK_KEY) ?? 'null') as Partial<CloudLink> | null;
    if (!value || typeof value.kidId !== 'string' || !Number.isInteger(value.rev)) return null;
    return { kidId: value.kidId, kidName: String(value.kidName ?? ''), rev: value.rev!, dirty: !!value.dirty,
      savedAt: typeof value.savedAt === 'number' ? value.savedAt : undefined };
  } catch { return null; }
}
export function writeLink(link: CloudLink | null): void {
  try {
    if (link) localStorage.setItem(LINK_KEY, JSON.stringify(link));
    else localStorage.removeItem(LINK_KEY);
  } catch { /* private mode: the link lasts only this visit */ }
}

const post = (body: string, keepalive = false): RequestInit => ({
  method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body, keepalive,
});
const progressUrl = (kidId: string) => `/api/kids/${encodeURIComponent(kidId)}/progress/${CLOUD_APP}`;

/** The children on the signed-in account, or null when the server could not be asked. */
export async function listKids(fetcher: typeof fetch = fetch): Promise<Kid[] | null> {
  try {
    const res = await fetcher('/api/kids', { cache: 'no-store', credentials: 'same-origin' });
    if (!res.ok) return null;
    const body = await res.json() as { kids?: unknown };
    return Array.isArray(body.kids) ? body.kids.filter((k): k is Kid => !!k && typeof k.id === 'string' && typeof k.name === 'string') : null;
  } catch { return null; }
}

export type AddKidResult = { kind: 'added'; kid: Kid } | { kind: 'limit' } | { kind: 'failed' };
export async function addKid(name: string, fetcher: typeof fetch = fetch): Promise<AddKidResult> {
  try {
    const res = await fetcher('/api/kids', post(JSON.stringify({ name })));
    if (res.status === 409) return { kind: 'limit' };
    const body = await res.json().catch(() => ({})) as { kid?: Kid };
    return res.ok && body.kid ? { kind: 'added', kid: body.kid } : { kind: 'failed' };
  } catch { return { kind: 'failed' }; }
}

const toCopy = (body: { rev?: unknown; data?: unknown; updatedAt?: unknown }): CloudCopy => ({
  rev: Number.isInteger(body.rev) ? body.rev as number : 0,
  state: body.data && typeof body.data === 'object' ? migrateState(body.data) : null,
  updatedAt: typeof body.updatedAt === 'number' ? body.updatedAt : 0,
});

export type LoadResult = { kind: 'loaded'; copy: CloudCopy } | { kind: 'missing' } | { kind: 'failed' };
/** The account's copy; `missing` when the child is not on this account (another parent signed in). */
export async function loadCopy(kidId: string, fetcher: typeof fetch = fetch): Promise<LoadResult> {
  try {
    const res = await fetcher(progressUrl(kidId), { cache: 'no-store', credentials: 'same-origin' });
    if (res.status === 404 || res.status === 401) return { kind: 'missing' };
    if (!res.ok) return { kind: 'failed' };
    return { kind: 'loaded', copy: toCopy(await res.json()) };
  } catch { return { kind: 'failed' }; }
}

export type PushResult = { kind: 'saved'; rev: number } | { kind: 'stale'; copy: CloudCopy } | { kind: 'missing' } | { kind: 'failed' };
export async function pushCopy(kidId: string, baseRev: number, state: UserProgressState,
  fetcher: typeof fetch = fetch, keepalive = false): Promise<PushResult> {
  try {
    const body = JSON.stringify({ rev: baseRev, data: state });
    // A save sent as the page closes must be small enough for the browser to finish it alone.
    const res = await fetcher(progressUrl(kidId), post(body, keepalive && body.length < 60_000));
    if (res.status === 409) return { kind: 'stale', copy: toCopy(await res.json()) };
    if (res.status === 404 || res.status === 401) return { kind: 'missing' };
    const answer = await res.json().catch(() => ({})) as { rev?: unknown };
    return res.ok && Number.isInteger(answer.rev) ? { kind: 'saved', rev: answer.rev as number } : { kind: 'failed' };
  } catch { return { kind: 'failed' }; }
}

/** A device that has learned nothing yet has nothing worth keeping. */
export const isFresh = (state: UserProgressState) => state.xp === 0 && state.completedUnits.length === 0;

export type SyncPlan = { kind: 'in-sync' } | { kind: 'push'; baseRev: number } | { kind: 'adopt'; copy: CloudCopy } | { kind: 'ask'; copy: CloudCopy };
/**
 * What to do when the device (last matched `link`) meets the account's copy for `kidId`:
 * - nothing changed anywhere, or only here: keep going / send ours;
 * - only the account changed (another device saved): take the account's copy;
 * - both changed, or a device that has learned picks a child who has learned too: ask.
 */
export function reconcile(local: UserProgressState, link: CloudLink | null, kidId: string, copy: CloudCopy): SyncPlan {
  const same = link?.kidId === kidId;
  if (same && copy.rev === link!.rev) return link!.dirty ? { kind: 'push', baseRev: copy.rev } : { kind: 'in-sync' };
  if (!copy.state) return { kind: 'push', baseRev: copy.rev };
  if (same ? !link!.dirty : isFresh(local)) return { kind: 'adopt', copy };
  return { kind: 'ask', copy };
}
