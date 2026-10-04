export type AvatarGender = 'boy' | 'girl';
export type AvatarSlot = 'hair' | 'top' | 'bottom' | 'shoes' | 'accessory';
export type RequiredSlot = Exclude<AvatarSlot, 'accessory'>;
export type LayerPlane = 'behind-body' | 'bottom' | 'shoes' | 'top' | 'hair' | 'accessory-front';
export type UnlockCondition = { kind: 'always' } | { kind: 'level'; minimum: number }
  | { kind: 'unit-completed'; unitId: number } | { kind: 'boss-defeated'; chapter: 1 | 2 };
export interface AvatarState {
  gender: AvatarGender;
  equipped: Record<RequiredSlot, string> & { accessory: string | null };
}
export interface CosmeticState {
  schemaVersion: 1;
  setupCompleted: boolean;
  ownedItemIds: string[];
  avatar: AvatarState;
}
export interface AvatarAssetLayer { plane: LayerPlane; src: string }
export interface StoreItem {
  id: string;
  name: { en: string; vi: string };
  slot: AvatarSlot;
  compatibleWith: readonly AvatarGender[];
  price: number;
  rarity: 'starter' | 'common' | 'special' | 'premium';
  unlock: UnlockCondition;
  starter: boolean;
  assetStatus: 'unavailable' | 'ready';
  assets: Partial<Record<AvatarGender, readonly AvatarAssetLayer[]>>;
  preview: { thumbnailSrc: string | null; alt: string };
}
export type CosmeticStatus = 'success' | 'already-owned' | 'insufficient-coins' | 'locked'
  | 'incompatible' | 'asset-unavailable' | 'storage-failed' | 'read-only'
  | 'invalid-item' | 'invalid-catalog' | 'invalid-balance' | 'not-owned' | 'invalid-gender' | 'invalid-slot';
export interface CosmeticResult { status: CosmeticStatus }
