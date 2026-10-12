import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { COSMETIC_CATALOG, STARTER_IDS } from '../src/data/cosmeticsCatalog';
import { createDefaultState } from '../src/services/storage';
import { purchaseItem, equipItem, changeAvatarGender } from '../src/engine/avatarCosmetics';
import { ownedClosetItems } from '../src/engine/avatarCloset';
import { persistBeforePublish, runCosmeticAction } from '../src/services/durableState';
import { storeItems, storeItemStatus, previewStoreItem, unlockDescription, STORE_CATEGORIES, STORE_COLLECTIONS } from '../src/engine/cosmeticStore';
import { Storefront } from '../src/components/store/Storefront';
import type { UserProgressState } from '../src/types';

const player = (): UserProgressState => ({ ...createDefaultState(), coins: 100,
  cosmetics: { ...createDefaultState().cosmetics!, setupCompleted: true } });
const tee = COSMETIC_CATALOG.find(x => x.id === 'top.sunshine-tee')!;

test('Store uses 59 authoritative ready items; all six filters respect gender and slot', () => {
  assert.equal(COSMETIC_CATALOG.length, 59);
  assert.equal(STORE_CATEGORIES.length, 6);
  for (const gender of ['boy', 'girl'] as const) for (const { slot } of STORE_CATEGORIES) {
    const result = storeItems(gender, slot);
    assert.deepEqual(result.map(x => x.id), COSMETIC_CATALOG.filter(x => x.compatibleWith.includes(gender)
      && (slot === 'all' || x.slot === slot)).map(x => x.id));
    assert.ok(result.length > 0);
    assert.ok(result.every(x => x.assetStatus === 'ready'));
  }
});
test('preview changes only a local draft; unowned preview and leaving preserve every saved field', () => {
  const state = player(), before = structuredClone(state);
  const preview = previewStoreItem(state.cosmetics!.avatar, tee);
  assert.equal(preview.equipped.top, tee.id);
  assert.notEqual(preview, state.cosmetics!.avatar);
  assert.deepEqual(state, before);
  assert.ok(!state.cosmetics!.ownedItemIds.includes(tee.id));
  assert.equal(previewStoreItem(state.cosmetics!.avatar, COSMETIC_CATALOG.find(x => x.id === 'hair.starter-girl')!), state.cosmetics!.avatar);
});
test('starter ownership, equipped state, locks and asset readiness produce truthful Store states', () => {
  const state = player();
  assert.equal(storeItemStatus(state, tee), 'available');
  assert.equal(storeItemStatus({ ...state, coins: 0 }, tee), 'insufficient-coins');
  for (const id of STARTER_IDS) assert.ok(state.cosmetics!.ownedItemIds.includes(id));
  const starter = COSMETIC_CATALOG.find(x => x.id === state.cosmetics!.avatar.equipped.top)!;
  assert.equal(storeItemStatus(state, starter), 'equipped'); assert.equal(starter.price, 0);
  assert.equal(storeItemStatus(state, { ...tee, assetStatus: 'unavailable' }), 'asset-unavailable');
  const locked = COSMETIC_CATALOG.find(x => x.unlock.kind === 'boss-defeated')!;
  assert.equal(storeItemStatus(state, locked), 'locked');
  assert.match(unlockDescription(locked), /Defeat/);
  assert.equal(storeItemStatus({ ...state, bossDefeated: true }, locked), 'insufficient-coins');
});
test('durable purchase deducts exact price once, never auto-equips; free equip reloads in Closet', () => {
  let state = player(), saved = structuredClone(state), writes = 0;
  const before = structuredClone(state);
  const action = (reduce: typeof purchaseItem, id: string) => runCosmeticAction(s => reduce(s, id), () => state,
    'writable', true, next => persistBeforePublish(next, 'writable', s => { saved = structuredClone(s); writes++; return true; }, s => { state = s; }));
  assert.equal(action(purchaseItem, tee.id).status, 'success');
  assert.equal(state.coins, before.coins - tee.price);
  assert.deepEqual(state.cosmetics!.avatar, before.cosmetics!.avatar);
  assert.equal(action(purchaseItem, tee.id).status, 'already-owned');
  assert.equal(action(purchaseItem, tee.id).status, 'already-owned'); assert.equal(writes, 1);
  assert.equal(action(equipItem, tee.id).status, 'success'); assert.equal(writes, 2);
  state = structuredClone(saved);
  assert.equal(state.coins, before.coins - tee.price);
  assert.equal(storeItemStatus(state, tee), 'equipped');
  assert.ok(ownedClosetItems(state.cosmetics!, 'boy', 'top').some(x => x.id === tee.id));
  const { coins: _a, cosmetics: _b, ...rest } = state;
  const { coins: _c, cosmetics: _d, ...original } = before;
  assert.deepEqual(rest, original);
});
for (const [coins, id, status] of [[0, tee.id, 'insufficient-coins'], [19, tee.id, 'insufficient-coins'],
  [100, 'hair.tidy-spikes', 'locked'], [100, 'hair.pony-tail', 'incompatible'], [100, 'missing', 'invalid-item']] as const)
  test(`Store transaction rejects ${status} at ${coins} coins without any changes`, () => {
    const state = { ...player(), coins }; const before = structuredClone(state);
    const result = purchaseItem(state, id);
    assert.equal(result.result.status, status); assert.equal(result.state, state); assert.deepEqual(state, before);
  });
test('unavailable catalog assets reject purchase and are never actionable', () => {
  const state = player(); const unavailable = { ...tee, assetStatus: 'unavailable' as const };
  const catalog = COSMETIC_CATALOG.map(x => x.id === tee.id ? unavailable : x);
  assert.equal(storeItemStatus(state, unavailable), 'asset-unavailable');
  assert.equal(purchaseItem(state, tee.id, catalog).result.status, 'asset-unavailable');
});
for (const failure of ['storage-failed', 'read-only'] as const) test(`${failure} leaves ownership, equipment, coins and saved state unchanged`, () => {
  let state = player(); const original = state; let writes = 0;
  const status = runCosmeticAction(s => purchaseItem(s, tee.id), () => state, failure === 'read-only' ? 'read-only' : 'writable', true,
    next => persistBeforePublish(next, 'writable', () => { writes++; return false; }, s => { state = s; }));
  assert.equal(status.status, failure); assert.equal(state, original); assert.equal(writes, failure === 'read-only' ? 0 : 1);
});
test('Closet equip and gender switching share Store state and preserve incompatible inventory', () => {
  let state = purchaseItem(player(), tee.id).state;
  state = equipItem(state, tee.id).state;
  assert.equal(storeItemStatus(state, tee), 'equipped');
  state = changeAvatarGender(state, 'girl').state;
  assert.ok(state.cosmetics!.ownedItemIds.includes(tee.id));
  assert.ok(storeItems('girl', 'hair').every(x => x.compatibleWith.includes('girl')));
});
test('Store markup has balance, six semantic filters, real thumbnails, explicit states and no starter Buy', () => {
  const html = renderToStaticMarkup(<Storefront state={player()} blockedReason={null}
    onPurchase={() => ({ status: 'success' })} onEquip={() => ({ status: 'success' })} onOpenAvatar={() => {}} />);
  assert.match(html, /Avatar Store/); assert.match(html, /Learning coins: 100/);
  assert.equal((html.match(/aria-pressed=/g) ?? []).length, 6 + 1 + STORE_COLLECTIONS.length + storeItems('boy', 'all').length);
  assert.match(html, /Preview Sunshine Tee/); assert.match(html, /Owned · Equipped/);
  assert.match(html, /\/avatars\/v1\//); assert.match(html, /Locked/);
  assert.doesNotMatch(html, /Buy Starter/);
});

test('dialog success stays modal with a disabled Buy to prevent double-click through; confirmation never projects a negative balance', async () => {
  const { PurchaseDialog } = await import('../src/components/store/PurchaseDialog');
  const html = renderToStaticMarkup(<PurchaseDialog item={tee} coins={0} blockedReason={null} error="" complete={true}
    successMessage="Sunshine Tee is now yours!" fallbackFocus={null} returnFocus={null} onCancel={() => {}} onConfirm={() => {}} />);
  assert.match(html, /<dialog/); assert.match(html, /Your coins now/); assert.match(html, /Done/);
  assert.match(html, /disabled=""[^>]*>Owned/); assert.match(html, /role="status"/);
  assert.doesNotMatch(html, /<strong>-\d/);
});
test('read-only Store still presents previews with the writer explanation', () => {
  const html = renderToStaticMarkup(<Storefront state={player()} blockedReason="Return to the active tab to buy or equip."
    onPurchase={() => { throw new Error('must not execute while rendering'); }} onEquip={() => { throw new Error('must not execute while rendering'); }} onOpenAvatar={() => {}} />);
  assert.match(html, /You can still browse and try a look/);
  assert.match(html, /Preview Sunshine Tee/);
});

test('owned gender-specific purchases survive switching and disappear only from incompatible Store browsing', () => {
  const item = COSMETIC_CATALOG.find(x => x.id === 'hair.side-sweep')!;
  let state = purchaseItem(player(), item.id).state;
  state = equipItem(state, item.id).state;
  state = changeAvatarGender(state, 'girl').state;
  assert.ok(state.cosmetics!.ownedItemIds.includes(item.id));
  assert.ok(!storeItems('girl', 'hair').some(x => x.id === item.id));
  assert.equal(storeItemStatus(state, item), 'incompatible');
  assert.equal(state.coins, 100 - item.price);
});

test('every item belongs to a fashion collection and each collection has looks for both heroes', () => {
  const ids = new Set(STORE_COLLECTIONS.map(c => c.id));
  assert.ok(COSMETIC_CATALOG.every(item => ids.has(item.collection ?? 'classic')));
  for (const gender of ['boy', 'girl'] as const) for (const { id } of STORE_COLLECTIONS) {
    const looks = storeItems(gender, 'all', id);
    assert.ok(looks.length > 0, `${id} for ${gender}`);
    assert.ok(looks.every(item => (item.collection ?? 'classic') === id && item.compatibleWith.includes(gender)));
  }
  assert.equal(storeItems('girl', 'all', 'all').length, storeItems('girl', 'all').length);
});
