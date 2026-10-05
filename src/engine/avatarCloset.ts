import type { AvatarGender, AvatarSlot, AvatarState, CosmeticState, UserProgressState } from '../types';
import { COSMETIC_CATALOG } from '../data/cosmeticsCatalog';
import { AVATAR_SLOTS, changeAvatarGender, createDefaultCosmetics, equipItem, hasUsableAssets,
  resolveGenderEquipment, unequipItem, type CosmeticTransaction } from './avatarCosmetics';

export function ownedClosetItems(c: CosmeticState, gender: AvatarGender, slot: AvatarSlot, catalog = COSMETIC_CATALOG) {
  return catalog.filter(item => item.slot === slot && c.ownedItemIds.includes(item.id)
    && item.compatibleWith.includes(gender) && hasUsableAssets(item, gender));
}
export function previewAvatarGender(c: CosmeticState, gender: AvatarGender, catalog = COSMETIC_CATALOG): AvatarState {
  return resolveGenderEquipment(c, gender, catalog);
}

/** Reduce the complete draft before one durable publication; never persist intermediate equips. */
export function saveAvatarDraft(state: UserProgressState, draft: AvatarState, catalog = COSMETIC_CATALOG): CosmeticTransaction {
  const reject = (status: CosmeticTransaction['result']['status']): CosmeticTransaction => ({ state, result: { status } });
  if (!draft || (draft.gender !== 'boy' && draft.gender !== 'girl')) return reject('invalid-gender');
  if (!draft.equipped || typeof draft.equipped !== 'object') return reject('invalid-item');
  let transaction = changeAvatarGender(state, draft.gender, catalog);
  if (transaction.result.status !== 'success') return reject(transaction.result.status);
  for (const slot of AVATAR_SLOTS) {
    const id = draft.equipped[slot];
    if (slot === 'accessory' && id === null) transaction = unequipItem(transaction.state, slot);
    else {
      const item = catalog.find(item => item.id === id);
      if (!item) return reject('invalid-item');
      if (item.slot !== slot) return reject('invalid-slot');
      transaction = equipItem(transaction.state, item.id, catalog);
    }
    if (transaction.result.status !== 'success') return reject(transaction.result.status);
  }
  const cosmetics = transaction.state.cosmetics ?? createDefaultCosmetics(draft.gender);
  return { state: { ...transaction.state, cosmetics: { ...cosmetics, setupCompleted: true } }, result: { status: 'success' } };
}
