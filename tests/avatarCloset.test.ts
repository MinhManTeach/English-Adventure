import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState } from '../src/services/storage';
import { createDefaultCosmetics } from '../src/engine/avatarCosmetics';
import { saveAvatarDraft, previewAvatarGender, ownedClosetItems } from '../src/engine/avatarCloset';
import { persistBeforePublish, runCosmeticAction } from '../src/services/durableState';
import { COSMETIC_CATALOG } from '../src/data/cosmeticsCatalog';
import type { AvatarGender } from '../src/types';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AvatarCloset } from '../src/components/avatar/AvatarCloset';
import { AvatarEditor } from '../src/components/avatar/AvatarEditor';

const player = () => ({ ...createDefaultState(), coins: 200, xp: 350,
  profile: { ...createDefaultState().profile, name: 'Existing hero', avatarId: 'draco', title: 'Dragon Knight' } });
for (const gender of ['boy', 'girl'] as const) test(`optional ${gender} setup confirms only through a successful transaction`, () => {
  const state = player(); const c = state.cosmetics ?? createDefaultCosmetics();
  assert.equal(c.setupCompleted, false);
  const before = JSON.stringify(state); const draft = previewAvatarGender(c, gender);
  assert.equal(JSON.stringify(state), before);
  const transaction = saveAvatarDraft(state, draft);
  assert.equal(transaction.result.status, 'success'); assert.equal(transaction.state.cosmetics?.setupCompleted, true);
  assert.equal(transaction.state.cosmetics?.avatar.gender, gender);
  assert.deepEqual(transaction.state.profile, state.profile);
  const { cosmetics, ...rest } = transaction.state; const { cosmetics: old, ...prior } = state;
  assert.deepEqual(rest, prior);
  assert.deepEqual(migrateState(JSON.parse(JSON.stringify(transaction.state))).cosmetics, cosmetics);
});
test('closet contains owned compatible ready items only, with correct categories', () => {
  const c = createDefaultCosmetics();
  for (const slot of ['hair', 'top', 'bottom', 'shoes', 'accessory'] as const) {
    const items = ownedClosetItems(c, c.avatar.gender, slot);
    assert.ok(items.every(item => item.slot === slot && c.ownedItemIds.includes(item.id) && item.assetStatus === 'ready'));
    assert.ok(items.every(item => item.starter));
    assert.equal(items.length, slot === 'hair' ? 1 : slot === 'accessory' ? 0 : 2);
  }
  assert.ok(!ownedClosetItems({ ...c, ownedItemIds: [] }, 'boy', 'top').length);
});
for (const [title, draftChange, expected] of [
  ['unowned', (draft: ReturnType<typeof previewAvatarGender>) => { draft.equipped.top = 'top.sunshine-tee'; }, 'not-owned'],
  ['wrong slot', (draft: ReturnType<typeof previewAvatarGender>) => { draft.equipped.top = 'shoes.starter-white'; }, 'invalid-slot'],
  ['incompatible', (draft: ReturnType<typeof previewAvatarGender>) => { draft.equipped.hair = 'hair.starter-girl'; }, 'incompatible'],
] as const) test(`atomic save rejects ${title} without applying any preceding change`, () => {
  const state = player(); const draft = previewAvatarGender(state.cosmetics ?? createDefaultCosmetics(), 'boy');
  draft.equipped.bottom = 'bottom.starter-jeans'; draftChange(draft);
  const transaction = saveAvatarDraft(state, draft);
  assert.equal(transaction.result.status, expected); assert.equal(transaction.state, state);
});
test('storage failures and secondary writers never publish setup or partial equipment', () => {
  for (const writer of ['writable', 'read-only'] as const) {
    const state = player(); let authoritative = state; let writes = 0;
    const draft = previewAvatarGender(state.cosmetics ?? createDefaultCosmetics(), 'girl');
    const result = runCosmeticAction(s => saveAvatarDraft(s, draft), () => authoritative, writer, true,
      next => persistBeforePublish(next, writer, () => { writes++; return false; }, next => { authoritative = next; }));
    assert.equal(result.status, writer === 'writable' ? 'storage-failed' : 'read-only');
    assert.equal(authoritative, state); assert.equal(writes, writer === 'writable' ? 1 : 0);
    assert.equal(authoritative.cosmetics?.setupCompleted ?? false, false);
  }
});
test('repeated gender previews preserve compatible clothes, ownership, profile and rewards', () => {
  let state = player(); const owned = state.cosmetics?.ownedItemIds ?? createDefaultCosmetics().ownedItemIds;
  const profile = state.profile;
  for (let i = 0; i < 12; i++) {
    const c = state.cosmetics ?? createDefaultCosmetics(); const gender: AvatarGender = i % 2 ? 'boy' : 'girl';
    const draft = previewAvatarGender(c, gender);
    assert.equal(draft.equipped.top, c.avatar.equipped.top);
    state = saveAvatarDraft(state, draft).state;
    assert.deepEqual(state.cosmetics?.ownedItemIds, owned);
    assert.deepEqual(state.profile, profile); assert.equal(state.coins, 200); assert.equal(state.xp, 350);
    assert.equal(state.cosmetics?.avatar.equipped.hair, `hair.starter-${gender}`);
  }
  assert.ok(COSMETIC_CATALOG.filter(item => !item.starter).every(item => item.assetStatus === 'unavailable'));
});
test('valid draft is written exactly once and reload restores the whole outfit', () => {
  let authoritative = player(); const before = authoritative; let serialized = ''; let writes = 0;
  const draft = previewAvatarGender(authoritative.cosmetics ?? createDefaultCosmetics(), 'girl');
  draft.equipped.top = 'top.starter-mint'; draft.equipped.bottom = 'bottom.starter-jeans';
  const result = runCosmeticAction(s => saveAvatarDraft(s, draft), () => authoritative, 'writable', true,
    next => persistBeforePublish(next, 'writable', next => { assert.equal(authoritative, before); writes++; serialized = JSON.stringify(next); return true; }, next => { authoritative = next; }));
  assert.equal(result.status, 'success'); assert.equal(writes, 1);
  assert.deepEqual(migrateState(JSON.parse(serialized)).cosmetics?.avatar, draft);
  assert.deepEqual(authoritative.profile, before.profile);
});
test('owned but unavailable paid artwork cannot be saved or shown', () => {
  const state = player(); state.cosmetics = { ...createDefaultCosmetics(), ownedItemIds: [...createDefaultCosmetics().ownedItemIds, 'top.sunshine-tee'] };
  const draft = previewAvatarGender(state.cosmetics, 'boy'); draft.equipped.top = 'top.sunshine-tee';
  assert.equal(saveAvatarDraft(state, draft).result.status, 'asset-unavailable');
  assert.ok(!ownedClosetItems(state.cosmetics, 'boy', 'top').some(item => item.id === 'top.sunshine-tee'));
});
test('invalid or incomplete drafts never confirm setup', () => {
  const state = player();
  for (const invalid of [null, { gender: 'other', equipped: {} }, { gender: 'boy' }, { gender: 'boy', equipped: {} }]) {
    const result = saveAvatarDraft(state, invalid as never);
    assert.notEqual(result.result.status, 'success'); assert.equal(result.state, state);
  }
});
test('creator starts with no selection and cannot confirm silently or in a read-only tab', () => {
  const c = createDefaultCosmetics();
  for (const canSave of [true, false]) {
    const html = renderToStaticMarkup(React.createElement(AvatarEditor, { cosmetics: c, canSave,
      onSave: () => { throw new Error('Rendering must not save'); }, onCancel: () => {} }));
    assert.ok(html.includes('aria-label="Boy · Bé trai"')); assert.ok(html.includes('aria-label="Girl · Bé gái"'));
    assert.equal((html.match(/aria-pressed="false"/g) ?? []).length, 2);
    assert.ok(/disabled=""[^>]*>Save my hero/.test(html)); assert.ok(!html.includes('id="closet-heading"'));
  }
});
test('closet markup distinguishes selected draft from equipped gear and never exposes purchases', () => {
  const cosmetics = { ...createDefaultCosmetics(), setupCompleted: true };
  const draft = previewAvatarGender(cosmetics, 'boy'); draft.equipped.top = 'top.starter-mint';
  const html = renderToStaticMarkup(React.createElement(AvatarCloset, { cosmetics, draft, category: 'top', onCategory: () => {}, onSelect: () => {} }));
  assert.ok(html.includes('Owned · Equipped')); assert.ok(html.includes('✓ Selected'));
  assert.ok(html.includes('aria-pressed="true"')); assert.ok(!/Buy|checkout|Coins|sunshine-tee/.test(html));
  assert.equal((html.match(/alt=""/g) ?? []).length, 2);
  assert.equal(cosmetics.avatar.equipped.top, 'top.starter-blue');
});
test('owned ready fixtures retain compatible clothes and clear incompatible accessories for free', () => {
  const top = { ...COSMETIC_CATALOG.find(item => item.id === 'top.sunshine-tee')!, assetStatus: 'ready' as const,
    preview: { thumbnailSrc: '/avatars/v1/test-top.webp', alt: 'Fixture top' },
    assets: { boy: [{ plane: 'top' as const, src: '/avatars/v1/test-top.webp' }], girl: [{ plane: 'top' as const, src: '/avatars/v1/test-top.webp' }] } };
  const accessory = { ...COSMETIC_CATALOG.find(item => item.id === 'accessory.round-glasses')!, compatibleWith: ['boy' as const], assetStatus: 'ready' as const,
    preview: { thumbnailSrc: '/avatars/v1/test-accessory.webp', alt: 'Fixture accessory' },
    assets: { boy: [{ plane: 'accessory-front' as const, src: '/avatars/v1/test-accessory.webp' }] } };
  const catalog = COSMETIC_CATALOG.map(item => item.id === top.id ? top : item.id === accessory.id ? accessory : item);
  const state = player(); const c = createDefaultCosmetics();
  state.cosmetics = { ...c, setupCompleted: true, ownedItemIds: [...c.ownedItemIds, top.id, accessory.id],
    avatar: { ...c.avatar, equipped: { ...c.avatar.equipped, top: top.id, accessory: accessory.id } } };
  assert.ok(ownedClosetItems(state.cosmetics, 'girl', 'top', catalog).some(item => item.id === top.id));
  const draft = previewAvatarGender(state.cosmetics, 'girl', catalog);
  assert.equal(draft.equipped.top, top.id); assert.equal(draft.equipped.accessory, null);
  const saved = saveAvatarDraft(state, draft, catalog);
  assert.equal(saved.result.status, 'success'); assert.equal(saved.state.coins, state.coins);
  assert.deepEqual(saved.state.cosmetics?.ownedItemIds, state.cosmetics.ownedItemIds);
});
test('failed or throwing storage preserves an existing completed hero and does not announce success', () => {
  const state = player(); state.cosmetics = { ...createDefaultCosmetics(), setupCompleted: true };
  const draft = previewAvatarGender(state.cosmetics, 'girl');
  for (const save of [() => false, () => { throw new Error('Storage unavailable'); }]) {
    let authoritative = state;
    const result = runCosmeticAction(s => saveAvatarDraft(s, draft), () => authoritative, 'writable', true,
      next => persistBeforePublish(next, 'writable', save, next => { authoritative = next; }));
    assert.equal(result.status, 'storage-failed'); assert.equal(authoritative, state);
    assert.equal(authoritative.cosmetics?.avatar.gender, 'boy');
  }
});
