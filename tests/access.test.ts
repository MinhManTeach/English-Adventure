import test from 'node:test';
import assert from 'node:assert/strict';
import { canOpenChapter, canOpenUnit, fetchAccess, isPaidUnit, signInUrl, startPurchase } from '../src/services/access';
import { WORLDS } from '../src/data/worlds';

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const stub = (res: Response | Error) => (async () => { if (res instanceof Error) throw res; return res; }) as unknown as typeof fetch;

test('Units 1–6 are free and every later A1 unit needs the package', () => {
  for (let unit = 1; unit <= 6; unit++) assert.equal(isPaidUnit(unit), false, `Unit ${unit}`);
  const later = WORLDS.flatMap(w => w.units).filter(u => u > 6);
  assert.equal(later.length, 36);
  for (const unit of later) assert.equal(isPaidUnit(unit), true, `Unit ${unit}`);
});

test('only an owned package (or a development build) opens the paid worlds', () => {
  for (const status of ['checking', 'signed-out', 'not-owned', 'offline'] as const) {
    assert.equal(canOpenUnit({ status }, 7), false, status);
    assert.equal(canOpenChapter({ status }, 14), false, status);
    assert.equal(canOpenUnit({ status }, 6), true, status);
    assert.equal(canOpenChapter({ status }, 2), true, status);
  }
  assert.equal(canOpenUnit({ status: 'owned' }, 42), true);
  assert.equal(canOpenChapter({ status: 'open' }, 3), true);
});

test('reads what the account owns from the site server', async () => {
  assert.deepEqual(await fetchAccess(stub(json(200, { user: { name: 'Mẹ An' }, credits: 0, owns: ['ENGLISH_A1'] }))), { status: 'owned', name: 'Mẹ An' });
  assert.deepEqual(await fetchAccess(stub(json(200, { user: { name: 'Mẹ An' }, credits: 0, owns: [] }))), { status: 'not-owned', name: 'Mẹ An' });
  // An older server without `owns` means nothing was bought.
  assert.equal((await fetchAccess(stub(json(200, { user: { name: 'A' }, credits: 3 })))).status, 'not-owned');
  assert.equal((await fetchAccess(stub(json(401, { error: 'AUTH_REQUIRED' })))).status, 'signed-out');
  // Opened outside lopso.vn: the address answers with a page or nothing at all.
  assert.equal((await fetchAccess(stub(new Response('<!doctype html>', { status: 200, headers: { 'content-type': 'text/html' } })))).status, 'offline');
  assert.equal((await fetchAccess(stub(new Response('', { status: 404 })))).status, 'offline');
  assert.equal((await fetchAccess(stub(new Error('network')))).status, 'offline');
});

test('sign-in comes back to this app', () => {
  assert.equal(signInUrl('/hoc-sinh/english-adventure/'), '/auth/google?next=%2Fhoc-sinh%2Fenglish-adventure%2F');
  assert.equal(signInUrl('/hoc-sinh/english-adventure'), '/auth/google?next=%2Fhoc-sinh%2Fenglish-adventure%2F');
  assert.equal(signInUrl('/'), '/auth/google');
});

test('buying sends the browser to PayOS, or says why it cannot', async () => {
  let sent: unknown;
  const capture = (async (_url: string, init: RequestInit) => { sent = JSON.parse(String(init.body)); return json(200, { checkoutUrl: 'https://pay.payos.vn/web/x' }); }) as unknown as typeof fetch;
  assert.deepEqual(await startPurchase(capture), { kind: 'redirect', url: 'https://pay.payos.vn/web/x' });
  assert.deepEqual(sent, { plan: 'ENGLISH_A1' });
  assert.deepEqual(await startPurchase(stub(json(409, { error: 'PAY_OWNED' }))), { kind: 'owned' });
  assert.deepEqual(await startPurchase(stub(json(401, { error: 'AUTH_REQUIRED' }))), { kind: 'signed-out' });
  assert.equal((await startPurchase(stub(json(503, { error: 'PAY_UNAVAILABLE' })))).kind, 'error');
  assert.equal((await startPurchase(stub(new Error('network')))).kind, 'error');
});
