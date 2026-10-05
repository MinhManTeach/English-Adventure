import type { AvatarGender, AvatarSlot, CosmeticState, CosmeticResult, StoreItem, UserProgressState } from '../types';
import { COSMETIC_CATALOG, STARTER_DEFAULTS, STARTER_IDS } from '../data/cosmeticsCatalog';
import { calculateLevel } from './scoring';

export const AVATAR_SLOTS: readonly AvatarSlot[] = ['hair', 'top', 'bottom', 'shoes', 'accessory'];
const planes = { hair: ['behind-body', 'hair'], top: ['top'], bottom: ['bottom'], shoes: ['shoes'], accessory: ['behind-body', 'accessory-front'] };
const localPath = (value: unknown): value is string => typeof value === 'string'
  && /^\/avatars\/v1\/[a-zA-Z0-9./_-]+\.(webp|png|svg)$/.test(value) && !value.includes('..');
export function hasUsableAssets(item: StoreItem, gender: AvatarGender): boolean {
  const layers = item.assets?.[gender];
  return item.assetStatus === 'ready' && localPath(item.preview?.thumbnailSrc)
    && Array.isArray(layers) && layers.length > 0
    && layers.some(layer => layer?.plane === (item.slot === 'accessory' ? 'accessory-front' : item.slot))
    && layers.every(layer => !!layer && planes[item.slot]?.includes(layer.plane) && localPath(layer.src));
}

/** 'ready' is a deployment assertion, not proof that a URL happens to exist.
 * Asset production must verify files before changing this flag. Pending metadata is valid. */
export function validateCosmeticCatalog(catalog: readonly StoreItem[]): string[] {
  const errors: string[] = [], seen = new Set<string>();
  for (const item of catalog) {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !Array.isArray(item.compatibleWith)) {
      errors.push('malformed catalog item');
      continue;
    }
    const fail = (reason: string) => errors.push(`${item.id}: ${reason}`);
    if (typeof item.id !== 'string' || !/^(hair|top|bottom|shoes|accessory)\.[a-z0-9-]+$/.test(item.id) || seen.has(item.id)) fail('invalid/duplicate ID');
    seen.add(item.id);
    if (!AVATAR_SLOTS.includes(item.slot) || !item.id.startsWith(`${item.slot}.`)) fail('invalid slot');
    if (!Number.isSafeInteger(item.price) || item.price < 0) fail('invalid price');
    if (!['starter', 'common', 'special', 'premium'].includes(item.rarity)) fail('invalid rarity');
    if (!item.name?.en || !item.name?.vi || !item.preview?.alt) fail('missing labels');
    if (!Array.isArray(item.compatibleWith) || !item.compatibleWith.length || new Set(item.compatibleWith).size !== item.compatibleWith.length
      || item.compatibleWith.some(g => g !== 'boy' && g !== 'girl')) fail('invalid compatibility');
    const u = item.unlock;
    if (!u || !(u.kind === 'always' || (u.kind === 'level' && Number.isSafeInteger(u.minimum) && u.minimum >= 1)
      || (u.kind === 'unit-completed' && Number.isInteger(u.unitId) && u.unitId >= 1 && u.unitId <= 6)
      || (u.kind === 'boss-defeated' && (u.chapter === 1 || u.chapter === 2)))) fail('invalid unlock');
    if (item.starter !== STARTER_IDS.includes(item.id) || (item.starter && (item.price !== 0 || item.rarity !== 'starter' || u?.kind !== 'always'))
      || (!item.starter && item.rarity === 'starter')) fail('invalid starter');
    if (item.assetStatus !== 'unavailable' && item.assetStatus !== 'ready') fail('invalid asset status');
    if (!item.assets || typeof item.assets !== 'object' || Array.isArray(item.assets)) fail('invalid assets');
    for (const [gender, layers] of Object.entries(item.assets ?? {})) {
      if (!item.compatibleWith?.includes(gender as AvatarGender) || !Array.isArray(layers)
        || layers.some(layer => !layer || !planes[item.slot]?.includes(layer.plane) || !localPath(layer.src))
        || new Set(layers.map(layer => layer?.plane)).size !== layers.length) fail('invalid asset planes/paths');
    }
    if (item.assetStatus === 'ready' && item.compatibleWith.some(g => !hasUsableAssets(item, g))) fail('ready assets incomplete');
  }
  for (const gender of ['boy', 'girl'] as const) for (const [slot, id] of Object.entries(STARTER_DEFAULTS[gender])) {
    const item = catalog.find(x => x?.id === id);
    if (!item || !item.starter || item.slot !== slot || !Array.isArray(item.compatibleWith)
      || !item.compatibleWith.includes(gender)) errors.push(`missing valid ${gender}/${slot} default`);
  }
  return errors;
}

export function createDefaultCosmetics(gender: AvatarGender = 'boy'): CosmeticState {
  return { schemaVersion: 1, setupCompleted: false, ownedItemIds: [...STARTER_IDS],
    avatar: { gender, equipped: { ...STARTER_DEFAULTS[gender], accessory: null } } };
}
export function normalizeCosmetics(value: unknown, catalog = COSMETIC_CATALOG): CosmeticState {
  const old = value && typeof value === 'object' && !Array.isArray(value) ? value as Partial<CosmeticState> : {};
  const gender = old.avatar?.gender === 'girl' ? 'girl' : 'boy';
  const result = createDefaultCosmetics(gender);
  result.setupCompleted = old.setupCompleted === true;
  result.ownedItemIds = [...new Set([...STARTER_IDS, ...(Array.isArray(old.ownedItemIds)
    ? old.ownedItemIds.filter((id): id is string => typeof id === 'string' && id.length > 0) : [])])];
  for (const slot of AVATAR_SLOTS) {
    const id = old.avatar?.equipped?.[slot];
    const item = catalog.find(x => x.id === id);
    // Pending starter metadata remains a valid fallback without replacing legacy emoji UI.
    if (item && item.slot === slot && result.ownedItemIds.includes(item.id) && item.compatibleWith.includes(gender)
      && (item.starter || hasUsableAssets(item, gender))) result.avatar.equipped[slot] = item.id;
  }
  return result;
}

export interface CosmeticTransaction { state: UserProgressState; result: CosmeticResult }
const rejected = (state: UserProgressState, status: CosmeticResult['status']): CosmeticTransaction => ({ state, result: { status } });
const success = (state: UserProgressState, cosmetics: CosmeticState, coins = state.coins): CosmeticTransaction =>
  ({ state: { ...state, cosmetics, coins }, result: { status: 'success' } });
function unlocked(state: UserProgressState, item: StoreItem): boolean {
  const u = item.unlock;
  switch (u.kind) {
    case 'always': return true;
    case 'level': return calculateLevel(state.xp).level >= u.minimum;
    case 'unit-completed': return state.completedUnits.includes(u.unitId);
    case 'boss-defeated': return u.chapter === 1 ? state.bossDefeated : !!state.chapter2?.bossDefeated;
  }
}
export function purchaseItem(state: UserProgressState, id: string, catalog = COSMETIC_CATALOG): CosmeticTransaction {
  if (validateCosmeticCatalog(catalog).length) return rejected(state, 'invalid-catalog');
  const item = catalog.find(x => x.id === id);
  if (!item) return rejected(state, 'invalid-item');
  const cosmetics = state.cosmetics ?? createDefaultCosmetics();
  if (cosmetics.ownedItemIds.includes(id)) return rejected(state, 'already-owned');
  if (!unlocked(state, item)) return rejected(state, 'locked');
  if (!item.compatibleWith.includes(cosmetics.avatar.gender)) return rejected(state, 'incompatible');
  if (!hasUsableAssets(item, cosmetics.avatar.gender)) return rejected(state, 'asset-unavailable');
  if (!Number.isSafeInteger(state.coins) || state.coins < 0) return rejected(state, 'invalid-balance');
  if (state.coins < item.price) return rejected(state, 'insufficient-coins');
  return success(state, { ...cosmetics, ownedItemIds: [...cosmetics.ownedItemIds, id] }, state.coins - item.price);
}
export function equipItem(state: UserProgressState, id: string, catalog = COSMETIC_CATALOG): CosmeticTransaction {
  if (validateCosmeticCatalog(catalog).length) return rejected(state, 'invalid-catalog');
  const item = catalog.find(x => x.id === id);
  if (!item) return rejected(state, 'invalid-item');
  const c = state.cosmetics ?? createDefaultCosmetics();
  if (!c.ownedItemIds.includes(id)) return rejected(state, 'not-owned');
  if (!item.compatibleWith.includes(c.avatar.gender)) return rejected(state, 'incompatible');
  if (!hasUsableAssets(item, c.avatar.gender)) return rejected(state, 'asset-unavailable');
  return success(state, { ...c, avatar: { ...c.avatar, equipped: { ...c.avatar.equipped, [item.slot]: id } } });
}
export function unequipItem(state: UserProgressState, slot: AvatarSlot): CosmeticTransaction {
  if (!AVATAR_SLOTS.includes(slot)) return rejected(state, 'invalid-slot');
  const c = state.cosmetics ?? createDefaultCosmetics();
  return success(state, { ...c, avatar: { ...c.avatar, equipped: { ...c.avatar.equipped,
    [slot]: slot === 'accessory' ? null : STARTER_DEFAULTS[c.avatar.gender][slot] } } });
}
export function resolveGenderEquipment(c: CosmeticState, gender: AvatarGender, catalog = COSMETIC_CATALOG) {
  const equipped = { ...STARTER_DEFAULTS[gender], accessory: null as string | null };
  for (const slot of AVATAR_SLOTS) {
    const item = catalog.find(x => x.id === c.avatar.equipped[slot]);
    if (item && c.ownedItemIds.includes(item.id) && item.slot === slot && item.compatibleWith.includes(gender)
      && (item.starter || hasUsableAssets(item, gender))) equipped[slot] = item.id;
  }
  return { gender, equipped };
}
export function changeAvatarGender(state: UserProgressState, gender: AvatarGender, catalog = COSMETIC_CATALOG): CosmeticTransaction {
  if (gender !== 'boy' && gender !== 'girl') return rejected(state, 'invalid-gender');
  if (validateCosmeticCatalog(catalog).length) return rejected(state, 'invalid-catalog');
  const c = state.cosmetics ?? createDefaultCosmetics();
  return success(state, { ...c, avatar: resolveGenderEquipment(c, gender, catalog) });
}
