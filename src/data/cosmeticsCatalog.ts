import type { AvatarGender, AvatarSlot, RequiredSlot, StoreCollection, StoreItem, UnlockCondition } from '../types/cosmetics';
import { STARTER_ASSET_PATHS } from './avatarAssets';
import { COSMETIC_ASSET_PACK } from './cosmeticAssetPack';

// Only explicit, visually verified Rig V1 exports are ready. Readiness does not grant ownership.
const item = (id: string, en: string, slot: AvatarSlot, compatibleWith: AvatarGender[], price: number,
  rarity: StoreItem['rarity'], unlock: UnlockCondition, vi: string, collection: StoreCollection = 'classic'): StoreItem => ({
  id, name: { en, vi }, slot, compatibleWith, price, rarity, unlock,
  starter: rarity === 'starter', assetStatus: STARTER_ASSET_PATHS[id] || COSMETIC_ASSET_PACK[id] ? 'ready' : 'unavailable',
  assets: Object.fromEntries(compatibleWith.flatMap(gender => {
    const layers = COSMETIC_ASSET_PACK[id] ?? (STARTER_ASSET_PATHS[id]
      ? [{ plane: slot === 'accessory' ? 'accessory-front' as const : slot, src: STARTER_ASSET_PATHS[id] }] : null);
    return layers ? [[gender, layers]] : [];
  })),
  preview: { thumbnailSrc: STARTER_ASSET_PATHS[id] || COSMETIC_ASSET_PACK[id] ? `/avatars/v1/previews/${id}.webp` : null, alt: en },
  collection,
});
export const COSMETIC_CATALOG: readonly StoreItem[] = [
  item('hair.starter-boy', 'Starter Short Hair', 'hair', ['boy'], 0, 'starter', { kind: 'always' }, 'Tóc ngắn khởi đầu'),
  item('hair.starter-girl', 'Starter Bob', 'hair', ['girl'], 0, 'starter', { kind: 'always' }, 'Tóc bob khởi đầu'),
  item('hair.soft-crop', 'Soft Crop', 'hair', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Tóc ngắn mềm', 'pastel'),
  item('hair.short-curls', 'Short Curls', 'hair', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Tóc xoăn ngắn', 'street'),
  item('hair.side-sweep', 'Side Sweep', 'hair', ['boy'], 40, 'common', { kind: 'always' }, 'Tóc vuốt lệch', 'street'),
  item('hair.wavy-short', 'Wavy Short Hair', 'hair', ['boy'], 50, 'common', { kind: 'always' }, 'Tóc ngắn gợn sóng', 'earth'),
  item('hair.tidy-spikes', 'Tidy Spikes', 'hair', ['boy'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Tóc dựng gọn', 'sporty'),
  item('hair.pony-tail', 'Ponytail', 'hair', ['girl'], 40, 'common', { kind: 'always' }, 'Tóc đuôi ngựa', 'sporty'),
  item('hair.twist-braids', 'Twist Braids', 'hair', ['girl'], 50, 'common', { kind: 'always' }, 'Tóc tết xoắn', 'street'),
  item('hair.wavy-bob', 'Wavy Bob', 'hair', ['girl'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Tóc bob gợn sóng', 'pastel'),
  item('top.starter-blue', 'Starter Blue Tee', 'top', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Áo xanh khởi đầu'),
  item('top.starter-mint', 'Starter Mint Tee', 'top', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Áo xanh bạc hà khởi đầu'),
  item('top.sunshine-tee', 'Sunshine Tee', 'top', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Áo nắng vàng', 'pastel'),
  item('top.coral-stripes', 'Coral Stripe Tee', 'top', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Áo sọc san hô', 'pastel'),
  item('top.sky-hoodie', 'Sky Hoodie', 'top', ['boy', 'girl'], 50, 'common', { kind: 'always' }, 'Áo hoodie xanh trời', 'street'),
  item('top.library-shirt', 'Library Shirt', 'top', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Áo sơ mi thư viện', 'earth'),
  item('top.space-sweater', 'Space Sweater', 'top', ['boy', 'girl'], 90, 'special', { kind: 'unit-completed', unitId: 2 }, 'Áo len vũ trụ', 'street'),
  item('top.castle-jacket', 'Castle Jacket', 'top', ['boy', 'girl'], 140, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Áo khoác lâu đài', 'royal'),
  item('bottom.starter-shorts', 'Starter Shorts', 'bottom', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Quần đùi khởi đầu'),
  item('bottom.starter-jeans', 'Starter Jeans', 'bottom', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Quần jean khởi đầu'),
  item('bottom.sand-shorts', 'Sand Shorts', 'bottom', ['boy', 'girl'], 25, 'common', { kind: 'always' }, 'Quần đùi màu cát', 'earth'),
  item('bottom.navy-joggers', 'Navy Joggers', 'bottom', ['boy', 'girl'], 40, 'common', { kind: 'always' }, 'Quần thể thao xanh đậm', 'sporty'),
  item('bottom.denim-jeans', 'Denim Jeans', 'bottom', ['boy', 'girl'], 50, 'common', { kind: 'always' }, 'Quần jean xanh', 'street'),
  item('bottom.plum-skirt', 'Plum Skirt', 'bottom', ['girl'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Váy màu mận', 'royal'),
  item('shoes.starter-white', 'Starter White Shoes', 'shoes', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Giày trắng khởi đầu'),
  item('shoes.starter-navy', 'Starter Navy Shoes', 'shoes', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Giày xanh đậm khởi đầu'),
  item('shoes.red-sneakers', 'Red Sneakers', 'shoes', ['boy', 'girl'], 25, 'common', { kind: 'always' }, 'Giày thể thao đỏ', 'sporty'),
  item('shoes.mint-trainers', 'Mint Trainers', 'shoes', ['boy', 'girl'], 40, 'common', { kind: 'always' }, 'Giày thể thao bạc hà', 'pastel'),
  item('shoes.sky-high-tops', 'Sky High Tops', 'shoes', ['boy', 'girl'], 70, 'special', { kind: 'unit-completed', unitId: 2 }, 'Giày cao cổ xanh trời', 'street'),
  item('shoes.castle-boots', 'Castle Boots', 'shoes', ['boy', 'girl'], 120, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Bốt lâu đài', 'royal'),
  item('accessory.round-glasses', 'Round Glasses', 'accessory', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Kính tròn', 'earth'),
  item('accessory.sun-cap', 'Sun Cap', 'accessory', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Mũ nắng', 'sporty'),
  item('accessory.star-headband', 'Star Headband', 'accessory', ['boy', 'girl'], 35, 'common', { kind: 'always' }, 'Băng đô ngôi sao', 'pastel'),
  item('accessory.music-headphones', 'Music Headphones', 'accessory', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Tai nghe âm nhạc', 'street'),
  item('accessory.school-backpack', 'School Backpack', 'accessory', ['boy', 'girl'], 80, 'special', { kind: 'unit-completed', unitId: 1 }, 'Ba lô đi học', 'classic'),
  item('accessory.library-badge', 'Library Badge', 'accessory', ['boy', 'girl'], 80, 'special', { kind: 'unit-completed', unitId: 3 }, 'Huy hiệu thư viện', 'classic'),
  item('accessory.castle-crown', 'Castle Crown', 'accessory', ['boy', 'girl'], 150, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Vương miện lâu đài', 'royal'),
  item('accessory.time-watch', 'Time Watch', 'accessory', ['boy', 'girl'], 150, 'premium', { kind: 'boss-defeated', chapter: 2 }, 'Đồng hồ thời gian', 'royal'),
  // Fashion collections added with the redrawn art.
  item('hair.korean-fringe', 'Curtain Fringe', 'hair', ['boy'], 60, 'common', { kind: 'always' }, 'Tóc mái rèm', 'street'),
  item('hair.textured-quiff', 'Textured Quiff', 'hair', ['boy'], 80, 'special', { kind: 'unit-completed', unitId: 6 }, 'Tóc vuốt dựng', 'earth'),
  item('hair.long-waves', 'Long Waves', 'hair', ['girl'], 60, 'common', { kind: 'always' }, 'Tóc dài gợn sóng', 'pastel'),
  item('hair.space-buns', 'Space Buns', 'hair', ['girl'], 80, 'special', { kind: 'unit-completed', unitId: 6 }, 'Tóc búi hai bên', 'street'),
  item('top.lavender-cardigan', 'Lavender Cardigan', 'top', ['boy', 'girl'], 70, 'common', { kind: 'always' }, 'Áo cardigan tím oải hương', 'pastel'),
  item('top.varsity-jacket', 'Varsity Jacket', 'top', ['boy', 'girl'], 160, 'premium', { kind: 'boss-defeated', chapter: 3 }, 'Áo khoác bóng chày', 'street'),
  item('top.sage-overshirt', 'Terracotta Overshirt', 'top', ['boy', 'girl'], 90, 'special', { kind: 'unit-completed', unitId: 8 }, 'Áo sơ mi khoác đất nung', 'earth'),
  item('top.soccer-jersey', 'Soccer Jersey', 'top', ['boy', 'girl'], 110, 'special', { kind: 'unit-completed', unitId: 18 }, 'Áo đấu bóng đá', 'sporty'),
  item('top.ao-dai', 'Tet Ao Dai', 'top', ['boy', 'girl'], 200, 'premium', { kind: 'boss-defeated', chapter: 4 }, 'Áo dài Tết', 'tet'),
  item('bottom.cargo-pants', 'Cargo Pants', 'bottom', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Quần túi hộp', 'street'),
  item('bottom.pink-pleated-skirt', 'Pink Pleated Skirt', 'bottom', ['girl'], 60, 'common', { kind: 'always' }, 'Chân váy xếp ly hồng', 'pastel'),
  item('bottom.camel-chinos', 'Camel Chinos', 'bottom', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Quần kaki màu lạc đà', 'earth'),
  item('bottom.track-pants', 'Track Pants', 'bottom', ['boy', 'girl'], 90, 'special', { kind: 'unit-completed', unitId: 17 }, 'Quần thể thao sọc', 'sporty'),
  item('bottom.silk-pants', 'White Silk Pants', 'bottom', ['boy', 'girl'], 100, 'special', { kind: 'unit-completed', unitId: 12 }, 'Quần lụa trắng', 'tet'),
  item('shoes.chunky-sneakers', 'Chunky Sneakers', 'shoes', ['boy', 'girl'], 150, 'premium', { kind: 'boss-defeated', chapter: 7 }, 'Giày đế độn', 'street'),
  item('shoes.mary-janes', 'Pink Mary Janes', 'shoes', ['girl'], 60, 'common', { kind: 'always' }, 'Giày búp bê hồng', 'pastel'),
  item('shoes.brown-loafers', 'Brown Loafers', 'shoes', ['boy', 'girl'], 80, 'special', { kind: 'unit-completed', unitId: 9 }, 'Giày lười nâu', 'earth'),
  item('accessory.bucket-hat', 'Bucket Hat', 'accessory', ['boy', 'girl'], 50, 'common', { kind: 'always' }, 'Mũ tai bèo', 'street'),
  item('accessory.bow-clip', 'Big Bow Clip', 'accessory', ['girl'], 40, 'common', { kind: 'always' }, 'Kẹp nơ to', 'pastel'),
  item('accessory.beret', 'Artist Beret', 'accessory', ['boy', 'girl'], 100, 'special', { kind: 'unit-completed', unitId: 33 }, 'Mũ nồi họa sĩ', 'earth'),
  item('accessory.cat-ears', 'Cat Ears Headband', 'accessory', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Băng đô tai mèo', 'pastel'),
];
export const STARTER_DEFAULTS: Record<AvatarGender, Record<RequiredSlot, string>> = {
  boy: { hair: 'hair.starter-boy', top: 'top.starter-blue', bottom: 'bottom.starter-shorts', shoes: 'shoes.starter-white' },
  girl: { hair: 'hair.starter-girl', top: 'top.starter-mint', bottom: 'bottom.starter-jeans', shoes: 'shoes.starter-navy' },
};
export const STARTER_IDS = [...new Set(Object.values(STARTER_DEFAULTS).flatMap(outfit => Object.values(outfit)))];
