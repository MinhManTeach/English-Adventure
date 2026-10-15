import test from 'node:test';
import assert from 'node:assert/strict';
import { PACKAGES, canOpenChapter, canOpenUnit, fetchAccess, packageForChapter, packageForUnit, signInUrl, startPurchase } from '../src/services/access';
import { WORLDS } from '../src/data/worlds';

const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8' } });
const stub = (res: Response | Error) => (async () => { if (res instanceof Error) throw res; return res; }) as unknown as typeof fetch;

test('Units 1–6 are free, A1 Units 7–42 need ENGLISH_A1 and every A2 unit needs ENGLISH_A2', () => {
  for (let unit = 1; unit <= 6; unit++) assert.equal(packageForUnit(unit), null, `Unit ${unit}`);
  const units = WORLDS.flatMap(w => w.units);
  for (const unit of units.filter(u => u > 6 && u <= 42)) assert.equal(packageForUnit(unit)?.id, 'ENGLISH_A1', `Unit ${unit}`);
  for (const unit of units.filter(u => u > 42)) assert.equal(packageForUnit(unit)?.id, 'ENGLISH_A2', `Unit ${unit}`);
  assert.equal(packageForChapter(14)?.id, 'ENGLISH_A1');
  assert.equal(packageForChapter(15)?.id, 'ENGLISH_A2');
});

test('each package opens only its own level; a development build opens everything', () => {
  for (const status of ['checking', 'signed-out', 'offline'] as const) {
    assert.equal(canOpenUnit({ status }, 7), false, status);
    assert.equal(canOpenUnit({ status }, 6), true, status);
    assert.equal(canOpenChapter({ status }, 2), true, status);
  }
  const a1 = { status: 'signed-in' as const, owns: ['ENGLISH_A1'] };
  assert.equal(canOpenUnit(a1, 42), true);
  assert.equal(canOpenChapter(a1, 15), false);
  const a2 = { status: 'signed-in' as const, owns: ['ENGLISH_A2'] };
  assert.equal(canOpenChapter(a2, 15), true);
  assert.equal(canOpenUnit(a2, 7), false);
  assert.equal(canOpenChapter({ status: 'open' }, 28), true);
});

test('reads what the account owns from the site server', async () => {
  assert.deepEqual(await fetchAccess(stub(json(200, { user: { name: 'Mẹ An' }, credits: 0, owns: ['ENGLISH_A1'] }))), { status: 'signed-in', owns: ['ENGLISH_A1'], name: 'Mẹ An' });
  // An older server without `owns` means nothing was bought.
  assert.deepEqual((await fetchAccess(stub(json(200, { user: { name: 'A' }, credits: 3 })))).owns, []);
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
  assert.deepEqual(await startPurchase(PACKAGES.A2, capture), { kind: 'redirect', url: 'https://pay.payos.vn/web/x' });
  assert.deepEqual(sent, { plan: 'ENGLISH_A2' });
  assert.deepEqual(await startPurchase(PACKAGES.A1, stub(json(409, { error: 'PAY_OWNED' }))), { kind: 'owned' });
  assert.deepEqual(await startPurchase(PACKAGES.A1, stub(json(401, { error: 'AUTH_REQUIRED' }))), { kind: 'signed-out' });
  assert.equal((await startPurchase(PACKAGES.A1, stub(json(503, { error: 'PAY_UNAVAILABLE' })))).kind, 'error');
  assert.equal((await startPurchase(PACKAGES.A1, stub(new Error('network')))).kind, 'error');
});
