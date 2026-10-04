import type { AvatarGender, AvatarSlot, RequiredSlot, StoreItem, UnlockCondition } from '../types/cosmetics';
import { STARTER_ASSET_PATHS } from './avatarAssets';

// Only the verified starter slice has production artwork.
const item = (id: string, en: string, slot: AvatarSlot, compatibleWith: AvatarGender[], price: number,
  rarity: StoreItem['rarity'], unlock: UnlockCondition, vi: string): StoreItem => ({
  id, name: { en, vi }, slot, compatibleWith, price, rarity, unlock,
  starter: rarity === 'starter', assetStatus: STARTER_ASSET_PATHS[id] ? 'ready' : 'unavailable',
  assets: STARTER_ASSET_PATHS[id] ? Object.fromEntries(compatibleWith.map(gender => [gender,
    [{ plane: slot === 'accessory' ? 'accessory-front' : slot, src: STARTER_ASSET_PATHS[id] }]])) : {},
  preview: { thumbnailSrc: STARTER_ASSET_PATHS[id] ? `/avatars/v1/previews/${id}.webp` : null, alt: en },
});
export const COSMETIC_CATALOG: readonly StoreItem[] = [
  item('hair.starter-boy', 'Starter Short Hair', 'hair', ['boy'], 0, 'starter', { kind: 'always' }, 'Tóc ngắn khởi đầu'),
  item('hair.starter-girl', 'Starter Bob', 'hair', ['girl'], 0, 'starter', { kind: 'always' }, 'Tóc bob khởi đầu'),
  item('hair.soft-crop', 'Soft Crop', 'hair', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Tóc ngắn mềm'),
  item('hair.short-curls', 'Short Curls', 'hair', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Tóc xoăn ngắn'),
  item('hair.side-sweep', 'Side Sweep', 'hair', ['boy'], 40, 'common', { kind: 'always' }, 'Tóc vuốt lệch'),
  item('hair.wavy-short', 'Wavy Short Hair', 'hair', ['boy'], 50, 'common', { kind: 'always' }, 'Tóc ngắn gợn sóng'),
  item('hair.tidy-spikes', 'Tidy Spikes', 'hair', ['boy'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Tóc dựng gọn'),
  item('hair.pony-tail', 'Ponytail', 'hair', ['girl'], 40, 'common', { kind: 'always' }, 'Tóc đuôi ngựa'),
  item('hair.twist-braids', 'Twist Braids', 'hair', ['girl'], 50, 'common', { kind: 'always' }, 'Tóc tết xoắn'),
  item('hair.wavy-bob', 'Wavy Bob', 'hair', ['girl'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Tóc bob gợn sóng'),
  item('top.starter-blue', 'Starter Blue Tee', 'top', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Áo xanh khởi đầu'),
  item('top.starter-mint', 'Starter Mint Tee', 'top', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Áo xanh bạc hà khởi đầu'),
  item('top.sunshine-tee', 'Sunshine Tee', 'top', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Áo nắng vàng'),
  item('top.coral-stripes', 'Coral Stripe Tee', 'top', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Áo sọc san hô'),
  item('top.sky-hoodie', 'Sky Hoodie', 'top', ['boy', 'girl'], 50, 'common', { kind: 'always' }, 'Áo hoodie xanh trời'),
  item('top.library-shirt', 'Library Shirt', 'top', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Áo sơ mi thư viện'),
  item('top.space-sweater', 'Space Sweater', 'top', ['boy', 'girl'], 90, 'special', { kind: 'unit-completed', unitId: 2 }, 'Áo len vũ trụ'),
  item('top.castle-jacket', 'Castle Jacket', 'top', ['boy', 'girl'], 140, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Áo khoác lâu đài'),
  item('bottom.starter-shorts', 'Starter Shorts', 'bottom', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Quần đùi khởi đầu'),
  item('bottom.starter-jeans', 'Starter Jeans', 'bottom', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Quần jean khởi đầu'),
  item('bottom.sand-shorts', 'Sand Shorts', 'bottom', ['boy', 'girl'], 25, 'common', { kind: 'always' }, 'Quần đùi màu cát'),
  item('bottom.navy-joggers', 'Navy Joggers', 'bottom', ['boy', 'girl'], 40, 'common', { kind: 'always' }, 'Quần thể thao xanh đậm'),
  item('bottom.denim-jeans', 'Denim Jeans', 'bottom', ['boy', 'girl'], 50, 'common', { kind: 'always' }, 'Quần jean xanh'),
  item('bottom.plum-skirt', 'Plum Skirt', 'bottom', ['girl'], 70, 'special', { kind: 'unit-completed', unitId: 1 }, 'Váy màu mận'),
  item('shoes.starter-white', 'Starter White Shoes', 'shoes', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Giày trắng khởi đầu'),
  item('shoes.starter-navy', 'Starter Navy Shoes', 'shoes', ['boy', 'girl'], 0, 'starter', { kind: 'always' }, 'Giày xanh đậm khởi đầu'),
  item('shoes.red-sneakers', 'Red Sneakers', 'shoes', ['boy', 'girl'], 25, 'common', { kind: 'always' }, 'Giày thể thao đỏ'),
  item('shoes.mint-trainers', 'Mint Trainers', 'shoes', ['boy', 'girl'], 40, 'common', { kind: 'always' }, 'Giày thể thao bạc hà'),
  item('shoes.sky-high-tops', 'Sky High Tops', 'shoes', ['boy', 'girl'], 70, 'special', { kind: 'unit-completed', unitId: 2 }, 'Giày cao cổ xanh trời'),
  item('shoes.castle-boots', 'Castle Boots', 'shoes', ['boy', 'girl'], 120, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Bốt lâu đài'),
  item('accessory.round-glasses', 'Round Glasses', 'accessory', ['boy', 'girl'], 20, 'common', { kind: 'always' }, 'Kính tròn'),
  item('accessory.sun-cap', 'Sun Cap', 'accessory', ['boy', 'girl'], 30, 'common', { kind: 'always' }, 'Mũ nắng'),
  item('accessory.star-headband', 'Star Headband', 'accessory', ['boy', 'girl'], 35, 'common', { kind: 'always' }, 'Băng đô ngôi sao'),
  item('accessory.music-headphones', 'Music Headphones', 'accessory', ['boy', 'girl'], 60, 'common', { kind: 'always' }, 'Tai nghe âm nhạc'),
  item('accessory.school-backpack', 'School Backpack', 'accessory', ['boy', 'girl'], 80, 'special', { kind: 'unit-completed', unitId: 1 }, 'Ba lô đi học'),
  item('accessory.library-badge', 'Library Badge', 'accessory', ['boy', 'girl'], 80, 'special', { kind: 'unit-completed', unitId: 3 }, 'Huy hiệu thư viện'),
  item('accessory.castle-crown', 'Castle Crown', 'accessory', ['boy', 'girl'], 150, 'premium', { kind: 'boss-defeated', chapter: 1 }, 'Vương miện lâu đài'),
  item('accessory.time-watch', 'Time Watch', 'accessory', ['boy', 'girl'], 150, 'premium', { kind: 'boss-defeated', chapter: 2 }, 'Đồng hồ thời gian'),
];
export const STARTER_DEFAULTS: Record<AvatarGender, Record<RequiredSlot, string>> = {
  boy: { hair: 'hair.starter-boy', top: 'top.starter-blue', bottom: 'bottom.starter-shorts', shoes: 'shoes.starter-white' },
  girl: { hair: 'hair.starter-girl', top: 'top.starter-mint', bottom: 'bottom.starter-jeans', shoes: 'shoes.starter-navy' },
};
export const STARTER_IDS = [...new Set(Object.values(STARTER_DEFAULTS).flatMap(outfit => Object.values(outfit)))];
