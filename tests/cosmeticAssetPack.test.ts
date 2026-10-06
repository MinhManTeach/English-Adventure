import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { COSMETIC_CATALOG, STARTER_DEFAULTS } from '../src/data/cosmeticsCatalog';
import { COSMETIC_ASSET_PACK } from '../src/data/cosmeticAssetPack';
import { resolveAvatarLayers } from '../src/engine/avatarRendering';
import { validateCosmeticCatalog, purchaseItem, equipItem, createDefaultCosmetics } from '../src/engine/avatarCosmetics';
import { createDefaultState } from '../src/services/storage';
import type { AvatarState } from '../src/types';

function losslessWebP(src: string, width: number, height: number) {
  assert.match(src, /^\/avatars\/v1\/[a-z0-9./-]+\.webp$/); assert.ok(!src.includes('..'));
  const bytes = readFileSync(`public${src}`);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF'); assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  let found = false;
  for (let offset = 12; offset + 8 <= bytes.length;) {
    const size = bytes.readUInt32LE(offset + 4);
    if (bytes.toString('ascii', offset, offset + 4) === 'VP8L') {
      assert.equal(bytes[offset + 8], 0x2f);
      const bits = bytes.readUInt32LE(offset + 9);
      assert.equal((bits & 0x3fff) + 1, width);
      assert.equal(((bits >>> 14) & 0x3fff) + 1, height);
      assert.equal((bits >>> 28) & 1, 1, 'transparent alpha is present'); found = true;
    }
    offset += 8 + size + (size % 2);
  }
  assert.ok(found, 'lossless WebP image chunk'); return bytes;
}

test('all 30 missing cosmetics have intact full-canvas masters, exports and transparent thumbnails', () => {
  const manifest = JSON.parse(readFileSync('assets/avatar-rig-v1/cosmetics/exports.json', 'utf8'));
  assert.equal(Object.keys(COSMETIC_ASSET_PACK).length, 30); assert.equal(manifest.entries.length, 32);
  assert.equal(new Set(COSMETIC_CATALOG.map(i => i.id)).size, 38);
  for (const entry of manifest.entries) {
    assert.ok(COSMETIC_CATALOG.some(i => i.id === entry.id && !i.starter));
    assert.ok(existsSync(entry.source));
    const master = readFileSync(entry.source, 'utf8');
    assert.ok(master.includes('width="768" height="1280" viewBox="0 0 768 1280"'));
    const bytes = losslessWebP(entry.url, 768, 1280);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), entry.sha256);
    assert.ok(COSMETIC_ASSET_PACK[entry.id].some(l => l.src === entry.url && l.plane === entry.plane));
  }
  for (const id of Object.keys(COSMETIC_ASSET_PACK)) losslessWebP(`/avatars/v1/previews/${id}.webp`, 192, 192);
});

const candidates = COSMETIC_CATALOG;
test('every declared compatible item resolves on its body with allowed planes and actual files', () => {
  assert.deepEqual(validateCosmeticCatalog(candidates), []);
  assert.equal(candidates.filter(item => item.assetStatus === 'ready').length, 38);
  for (const item of candidates) for (const gender of item.compatibleWith) {
    const avatar: AvatarState = { gender, equipped: { ...STARTER_DEFAULTS[gender], accessory: null, [item.slot]: item.id } };
    const plan = resolveAvatarLayers(avatar, { catalog: candidates });
    assert.equal(plan.placeholder, false); assert.equal(plan.usedFallback, false);
    for (const layer of plan.layers) losslessWebP(layer.src, 768, 1280);
    // Existing verified starter thumbnails are 216px; preserve Phase 2.5C assets.
    losslessWebP(item.preview.thumbnailSrc!, item.starter ? 216 : 192, item.starter ? 216 : 192);
  }
});
test('all tops/bottoms/shoes and hair/headwear combinations preserve generic layer resolution', () => {
  for (const gender of ['boy', 'girl'] as const) {
    const compatible = (slot: string) => candidates.filter(i => i.slot === slot && i.compatibleWith.includes(gender));
    for (const top of compatible('top')) for (const bottom of compatible('bottom')) for (const shoes of compatible('shoes')) {
      const avatar: AvatarState = { gender, equipped: { ...STARTER_DEFAULTS[gender], top: top.id, bottom: bottom.id, shoes: shoes.id, accessory: null } };
      assert.equal(resolveAvatarLayers(avatar, { catalog: candidates }).usedFallback, false);
    }
    for (const hair of compatible('hair')) for (const accessory of compatible('accessory')) {
      const avatar: AvatarState = { gender, equipped: { ...STARTER_DEFAULTS[gender], hair: hair.id, accessory: accessory.id } };
      assert.equal(resolveAvatarLayers(avatar, { catalog: candidates }).usedFallback, false);
    }
  }
});
test('ready artwork retains ownership, unlock, charging and repeated purchase protection', () => {
  const state = { ...createDefaultState(), coins: 200, cosmetics: createDefaultCosmetics() };
  const buy = purchaseItem(state, 'top.sunshine-tee', candidates);
  assert.equal(buy.result.status, 'success'); assert.equal(buy.state.coins, 180);
  assert.equal(purchaseItem(buy.state, 'top.sunshine-tee', candidates).result.status, 'already-owned');
  const equip = equipItem(buy.state, 'top.sunshine-tee', candidates);
  assert.equal(equip.result.status, 'success'); assert.equal(equip.state.coins, 180); assert.equal(equip.state.xp, state.xp);
  assert.equal(purchaseItem(state, 'top.castle-jacket', candidates).result.status, 'locked');
  const unavailable = candidates.map(i => !i.starter ? { ...i, assetStatus: 'unavailable' as const } : i);
  const denied = purchaseItem(state, 'top.sunshine-tee', unavailable);
  assert.equal(denied.result.status, 'asset-unavailable'); assert.equal(denied.state, state);
});
