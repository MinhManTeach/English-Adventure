import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState } from '../src/services/storage';
import { addKid, isFresh, listKids, loadCopy, pushCopy, reconcile, type CloudCopy, type CloudLink } from '../src/services/cloudSync';

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const stub = (res: Response | Error) => (async () => { if (res instanceof Error) throw res; return res; }) as unknown as typeof fetch;

const learned = () => ({ ...createDefaultState(), xp: 120, completedUnits: [1, 2] });
const copy = (rev: number, state = learned()): CloudCopy => ({ rev, state, updatedAt: 1 });
const link = (rev: number, dirty: boolean): CloudLink => ({ kidId: 'k1', kidName: 'An', rev, dirty });

test('same child: keep going, send ours, or take the newer account copy', () => {
  assert.deepEqual(reconcile(learned(), link(3, false), 'k1', copy(3)), { kind: 'in-sync' });
  assert.deepEqual(reconcile(learned(), link(3, true), 'k1', copy(3)), { kind: 'push', baseRev: 3 });
  // Another device saved since, and nothing new here: take theirs.
  assert.equal(reconcile(learned(), link(3, false), 'k1', copy(5)).kind, 'adopt');
  // Both changed: the player decides.
  assert.equal(reconcile(learned(), link(3, true), 'k1', copy(5)).kind, 'ask');
  // The account copy is gone (server reset): send ours on top of what is there.
  assert.deepEqual(reconcile(learned(), link(3, false), 'k1', { rev: 0, state: null, updatedAt: 0 }), { kind: 'push', baseRev: 0 });
});

test('picking a child: a new device takes the account copy, a used one asks, an empty account gets ours', () => {
  const fresh = createDefaultState();
  assert.equal(isFresh(fresh), true);
  assert.equal(isFresh(learned()), false);
  assert.equal(reconcile(fresh, null, 'k1', copy(4)).kind, 'adopt');
  assert.equal(reconcile(learned(), null, 'k1', copy(4)).kind, 'ask');
  assert.deepEqual(reconcile(learned(), null, 'k1', { rev: 0, state: null, updatedAt: 0 }), { kind: 'push', baseRev: 0 });
  // Linked to another child before: treated as picking anew.
  assert.equal(reconcile(learned(), { ...link(9, false), kidId: 'k2' }, 'k1', copy(4)).kind, 'ask');
});

test('talks to the account server', async () => {
  assert.deepEqual(await listKids(stub(json(200, { kids: [{ id: 'k1', name: 'An' }, { bad: 1 }] }))), [{ id: 'k1', name: 'An' }]);
  assert.equal(await listKids(stub(json(401, {}))), null);
  assert.equal(await listKids(stub(new Error('offline'))), null);
  assert.deepEqual(await addKid('An', stub(json(200, { kid: { id: 'k1', name: 'An' } }))), { kind: 'added', kid: { id: 'k1', name: 'An' } });
  assert.deepEqual(await addKid('An', stub(json(409, { error: 'KID_LIMIT' }))), { kind: 'limit' });

  const empty = await loadCopy('k1', stub(json(200, { rev: 0, data: null, updatedAt: 0 })));
  assert.deepEqual(empty, { kind: 'loaded', copy: { rev: 0, state: null, updatedAt: 0 } });
  const saved = await loadCopy('k1', stub(json(200, { rev: 2, data: { xp: 50, completedUnits: [1] }, updatedAt: 9 })));
  assert.equal(saved.kind === 'loaded' && saved.copy.state?.xp, 50);
  assert.deepEqual(await loadCopy('k1', stub(json(404, {}))), { kind: 'missing' });
  assert.deepEqual(await loadCopy('k1', stub(new Error('offline'))), { kind: 'failed' });

  let sent: { url: string; init?: RequestInit } | null = null;
  const capture = (async (url: string, init?: RequestInit) => { sent = { url, init }; return json(200, { rev: 4 }); }) as unknown as typeof fetch;
  assert.deepEqual(await pushCopy('k1', 3, learned(), capture), { kind: 'saved', rev: 4 });
  assert.equal(sent!.url, '/api/kids/k1/progress/english-adventure');
  assert.equal(JSON.parse(String(sent!.init?.body)).rev, 3);
  const stale = await pushCopy('k1', 3, learned(), stub(json(409, { error: 'PROGRESS_STALE', rev: 5, data: { xp: 9 }, updatedAt: 1 })));
  assert.equal(stale.kind === 'stale' && stale.copy.rev, 5);
  assert.deepEqual(await pushCopy('k1', 3, learned(), stub(new Error('offline'))), { kind: 'failed' });
});
