import type { AvatarGender, AvatarSlot, AvatarState, StoreItem, UserProgressState, CosmeticStatus } from '../types';
import { COSMETIC_CATALOG } from '../data/cosmeticsCatalog';
import { hasUsableAssets, isCosmeticUnlocked } from './avatarCosmetics';

export type StoreCategory = AvatarSlot | 'all';
export const STORE_CATEGORIES: readonly { slot: StoreCategory; label: string }[] = [
  { slot: 'all', label: 'All · Tất cả' }, { slot: 'hair', label: 'Hair · Tóc' },
  { slot: 'top', label: 'Tops · Áo' }, { slot: 'bottom', label: 'Bottoms · Quần' },
  { slot: 'shoes', label: 'Shoes · Giày' }, { slot: 'accessory', label: 'Accessories · Phụ kiện' },
];
export function storeItems(gender: AvatarGender, category: StoreCategory): StoreItem[] {
  return COSMETIC_CATALOG.filter(item => item.compatibleWith.includes(gender) && (category === 'all' || item.slot === category));
}
export function storeItemStatus(state: UserProgressState, item: StoreItem): 'available' | 'owned' | 'equipped' | CosmeticStatus {
  const c = state.cosmetics!;
  if (!item.compatibleWith.includes(c.avatar.gender)) return 'incompatible';
  if (!hasUsableAssets(item, c.avatar.gender)) return 'asset-unavailable';
  if (c.ownedItemIds.includes(item.id)) return c.avatar.equipped[item.slot] === item.id ? 'equipped' : 'owned';
  if (!isCosmeticUnlocked(state, item)) return 'locked';
  if (!Number.isSafeInteger(state.coins) || state.coins < 0) return 'invalid-balance';
  return state.coins < item.price ? 'insufficient-coins' : 'available';
}
/** A disposable preview only: never passes through a save writer. */
export function previewStoreItem(avatar: AvatarState, item: StoreItem): AvatarState {
  if (!item.compatibleWith.includes(avatar.gender) || !hasUsableAssets(item, avatar.gender)) return avatar;
  return { ...avatar, equipped: { ...avatar.equipped, [item.slot]: item.id } };
}
export function unlockDescription(item: StoreItem): string {
  switch (item.unlock.kind) {
    case 'always': return 'Ready for your adventure';
    case 'level': return `Reach level ${item.unlock.minimum} to unlock.`;
    case 'unit-completed': return `Complete Unit ${item.unlock.unitId} to unlock.`;
    case 'boss-defeated': return item.unlock.chapter === 1 ? 'Defeat the Grammar Castle dragon to unlock.' : 'Defeat Chronos in Chapter 2 to unlock.';
  }
}
export function cosmeticFeedback(status: CosmeticStatus, item: StoreItem, coins: number): string {
  switch (status) {
    case 'success': return `${item.name.en} is now yours! Choose Equip to wear it.`;
    case 'already-owned': return 'You already own this item. No coins were spent.';
    case 'insufficient-coins': return `You need ${Math.max(0, item.price - coins)} more coins. Complete another learning challenge to earn more!`;
    case 'locked': return unlockDescription(item);
    case 'read-only': return 'Your game is open in another tab, or safe saving is unavailable. Return to the active tab to buy or equip items.';
    case 'storage-failed': return 'We could not save this change. Your coins and outfit are safe. Check browser storage and try again.';
    case 'incompatible': return 'This item is for a different hero.';
    case 'asset-unavailable': return 'This outfit is not ready to wear yet.';
    case 'not-owned': return 'Choose an item you own to equip it.';
    default: return 'This change could not be made safely. Your coins and outfit are unchanged.';
  }
}
