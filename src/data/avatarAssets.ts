import type { AvatarGender } from '../types/cosmetics';

export const AVATAR_RIG = {
  version: 'v1', width: 768, height: 1280, centerX: 384,
  safeBounds: { left: 64, top: 48, right: 704, bottom: 1216 }, feetBaseline: 1184,
  head: { center: [384, 256], bounds: [256, 128, 512, 384] },
  neck: [384, 404], shoulders: [[256, 440], [512, 440]], torsoBounds: [256, 424, 512, 720], waistY: 704,
  hips: [[288, 744], [480, 744]], knees: [[320, 928], [448, 928]],
  ankles: [[320, 1104], [448, 1104]],
  shoeBounds: { left: [272, 1088, 368, 1184], right: [400, 1088, 496, 1184] },
} as const;

export interface AvatarBodyAsset { src: string; assetStatus: 'ready' | 'unavailable' }
export const AVATAR_BODY_ASSETS: Readonly<Record<AvatarGender, AvatarBodyAsset>> = {
  boy: { src: '/avatars/v1/bodies/boy/base.webp', assetStatus: 'ready' },
  girl: { src: '/avatars/v1/bodies/girl/base.webp', assetStatus: 'ready' },
};

// Only full-canvas exports verified against assets/avatar-rig-v1/verified-exports.json.
export const STARTER_ASSET_PATHS: Readonly<Record<string, string>> = {
  'hair.starter-boy': '/avatars/v1/items/hair.starter-boy/boy/front.webp',
  'hair.starter-girl': '/avatars/v1/items/hair.starter-girl/girl/front.webp',
  'top.starter-blue': '/avatars/v1/items/top.starter-blue/shared/front.webp',
  'top.starter-mint': '/avatars/v1/items/top.starter-mint/shared/front.webp',
  'bottom.starter-shorts': '/avatars/v1/items/bottom.starter-shorts/shared/front.webp',
  'bottom.starter-jeans': '/avatars/v1/items/bottom.starter-jeans/shared/front.webp',
  'shoes.starter-white': '/avatars/v1/items/shoes.starter-white/shared/front.webp',
  'shoes.starter-navy': '/avatars/v1/items/shoes.starter-navy/shared/front.webp',
};
