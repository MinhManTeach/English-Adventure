import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AvatarRenderer } from '../src/components/avatar/AvatarRenderer';
import { AVATAR_BODY_ASSETS, STARTER_ASSET_PATHS } from '../src/data/avatarAssets';
import { COSMETIC_CATALOG, STARTER_DEFAULTS } from '../src/data/cosmeticsCatalog';
import { resolveAvatarLayers, AVATAR_SIZES } from '../src/engine/avatarRendering';
import { validateCosmeticCatalog } from '../src/engine/avatarCosmetics';
import type { AvatarGender, AvatarState, StoreItem } from '../src/types';

const avatar = (gender: AvatarGender): AvatarState => ({ gender, equipped: { ...STARTER_DEFAULTS[gender], accessory: null } });
for (const gender of ['boy', 'girl'] as const) {
  test(`${gender}: complete ordered starter and neutral body`, () => {
    const state = avatar(gender); const before = JSON.stringify(state);
    const plan = resolveAvatarLayers(state);
    assert.equal(plan.placeholder, false); assert.equal(plan.usedFallback, false);
    assert.deepEqual(plan.layers.map(layer => layer.plane), ['body', 'bottom', 'shoes', 'top', 'hair']);
    assert.equal(resolveAvatarLayers(state, { presentation: 'body-only' }).layers.length, 1);
    assert.equal(JSON.stringify(state), before);
  });
  test(`${gender}: unknown, incompatible and unavailable equipment falls back safely`, () => {
    const state = avatar(gender);
    for (const id of ['unknown', 'top.space-sweater', STARTER_DEFAULTS[gender === 'boy' ? 'girl' : 'boy'].hair]) {
      const plan = resolveAvatarLayers({ ...state, equipped: { ...state.equipped, hair: id, accessory: 'accessory.castle-crown' } });
      assert.equal(plan.placeholder, false); assert.equal(plan.usedFallback, true); assert.equal(plan.layers.length, 5);
    }
    assert.equal(resolveAvatarLayers(state, { failedSources: new Set([AVATAR_BODY_ASSETS[gender].src]) }).placeholder, true);
    assert.equal(resolveAvatarLayers(state, { failedSources: new Set([STARTER_ASSET_PATHS[state.equipped.top!]]) }).placeholder, true);
  });
}
test('failed alternate clothing uses the available default', () => {
  const state = avatar('boy'); state.equipped.top = 'top.starter-mint';
  const plan = resolveAvatarLayers(state, { failedSources: new Set([STARTER_ASSET_PATHS['top.starter-mint']]) });
  assert.equal(plan.placeholder, false); assert.ok(plan.layers.some(layer => layer.src === STARTER_ASSET_PATHS['top.starter-blue']));
});
test('all sixteen curriculum-independent starter outfits resolve without visual repair', () => {
  for (const gender of ['boy', 'girl'] as const) for (const top of ['blue', 'mint'])
    for (const bottom of ['shorts', 'jeans']) for (const shoes of ['white', 'navy']) {
      const state = avatar(gender);
      Object.assign(state.equipped, { top: `top.starter-${top}`, bottom: `bottom.starter-${bottom}`, shoes: `shoes.starter-${shoes}` });
      const plan = resolveAvatarLayers(state);
      assert.equal(plan.placeholder, false); assert.equal(plan.usedFallback, false); assert.equal(plan.layers.length, 5);
    }
});
test('future accessory planes compose around the body without item-specific rendering', () => {
  const accessory: StoreItem = { ...COSMETIC_CATALOG.find(item => item.slot === 'accessory')!, assetStatus: 'ready',
    preview: { thumbnailSrc: '/avatars/v1/preview.webp', alt: 'test' }, assets: { boy: [
      { plane: 'behind-body', src: '/avatars/v1/back.webp' }, { plane: 'accessory-front', src: '/avatars/v1/front.webp' }] } };
  const state = avatar('boy'); state.equipped.accessory = accessory.id;
  const plan = resolveAvatarLayers(state, { catalog: [...COSMETIC_CATALOG.filter(item => item.id !== accessory.id), accessory] });
  assert.equal(plan.layers[0].plane, 'behind-body'); assert.equal(plan.layers.at(-1)?.plane, 'accessory-front');
});
for (const size of Object.keys(AVATAR_SIZES) as (keyof typeof AVATAR_SIZES)[]) test(`${size}: accessible responsive full-canvas markup`, () => {
  const html = renderToStaticMarkup(<AvatarRenderer avatar={avatar('boy')} size={size} />);
  assert.equal((html.match(/role="img"/g) ?? []).length, 1);
  assert.ok(html.includes(`width:${AVATAR_SIZES[size]}px`)); assert.ok(html.includes('max-width:100%'));
  assert.equal((html.match(/alt=""/g) ?? []).length, 5); assert.ok(html.includes('aspect-ratio:3 / 5'));
});
test('only eight verified free starters are ready; paid metadata remains unavailable', () => {
  assert.deepEqual(validateCosmeticCatalog(COSMETIC_CATALOG), []);
  const ready = COSMETIC_CATALOG.filter(item => item.assetStatus === 'ready'); assert.equal(ready.length, 8);
  for (const item of ready) {
    assert.equal(item.starter, true); assert.equal(item.price, 0);
    assert.ok(existsSync(`public${item.preview.thumbnailSrc}`));
    for (const gender of item.compatibleWith) assert.ok(existsSync(`public${item.assets[gender]![0].src}`));
  }
  assert.ok(COSMETIC_CATALOG.filter(item => !item.starter).every(item => item.assetStatus === 'unavailable' && !item.preview.thumbnailSrc));
});
test('all ten transparent lossless exports match reviewed masters and the common rig', () => {
  const manifest = JSON.parse(readFileSync('assets/avatar-rig-v1/verified-exports.json', 'utf8'));
  assert.equal(manifest.entries.length, 10);
  for (const entry of manifest.entries) {
    const bytes = readFileSync(`public${entry.url}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256);
    let offset = 12; let found = false;
    while (offset + 8 <= bytes.length) {
      const length = bytes.readUInt32LE(offset + 4);
      if (bytes.toString('ascii', offset, offset + 4) === 'VP8L') {
        const bits = bytes.readUInt32LE(offset + 9);
        assert.equal(1 + (bits & 0x3fff), 768); assert.equal(1 + ((bits >>> 14) & 0x3fff), 1280);
        assert.equal((bits >>> 28) & 1, 1); found = true;
      }
      offset += 8 + length + (length % 2);
    }
    assert.ok(found); const master = readFileSync(`assets/avatar-rig-v1/${entry.name}.svg`, 'utf8');
    assert.ok(master.includes('viewBox="0 0 768 1280"')); assert.ok(!master.includes('<script'));
  }
});
