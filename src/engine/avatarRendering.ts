import type { AvatarGender, AvatarState, LayerPlane, StoreItem } from '../types';
import { AVATAR_BODY_ASSETS, AvatarBodyAsset } from '../data/avatarAssets';
import { COSMETIC_CATALOG, STARTER_DEFAULTS } from '../data/cosmeticsCatalog';
import { AVATAR_SLOTS, hasUsableAssets } from './avatarCosmetics';

export const AVATAR_PLANES: Readonly<Record<LayerPlane | 'body', number>> = {
  'behind-body': 0, body: 10, bottom: 20, shoes: 30, top: 40, hair: 50, 'accessory-front': 60,
};
export const AVATAR_SIZES = { small: 48, medium: 112, large: 256, responsive: 320 } as const;
export type AvatarSize = keyof typeof AVATAR_SIZES;
export type AvatarPresentation = 'complete' | 'body-only';
export interface RenderLayer { key: string; src: string; plane: LayerPlane | 'body' }
export interface AvatarRenderPlan { gender: AvatarGender; layers: RenderLayer[]; usedFallback: boolean; placeholder: boolean }
interface ResolutionOptions {
  failedSources?: ReadonlySet<string>;
  presentation?: AvatarPresentation;
  catalog?: readonly StoreItem[];
  bodyAssets?: Readonly<Record<AvatarGender, AvatarBodyAsset>>;
}
const NO_FAILURES: ReadonlySet<string> = new Set();

/** Visual resolution only: never normalizes a save, acquires ownership or changes money. */
export function resolveAvatarLayers(avatar: AvatarState, options: ResolutionOptions = {}): AvatarRenderPlan {
  const gender = avatar?.gender === 'girl' ? 'girl' : 'boy';
  const failed = options.failedSources ?? NO_FAILURES;
  const body = (options.bodyAssets ?? AVATAR_BODY_ASSETS)[gender];
  const placeholder = (): AvatarRenderPlan => ({ gender, layers: [], usedFallback: true, placeholder: true });
  if (!body || body.assetStatus !== 'ready' || failed.has(body.src)) return placeholder();
  const layers: RenderLayer[] = [{ key: `body:${gender}:${body.src}`, src: body.src, plane: 'body' }];
  let usedFallback = avatar?.gender !== gender;
  const catalog = options.catalog ?? COSMETIC_CATALOG;
  if (options.presentation !== 'body-only') for (const slot of AVATAR_SLOTS) {
    const requested = avatar?.equipped?.[slot];
    const usable = (item: StoreItem | undefined): item is StoreItem => !!item && item.slot === slot
      && item.compatibleWith.includes(gender) && hasUsableAssets(item, gender)
      && item.assets[gender]!.every(layer => !failed.has(layer.src));
    let item = catalog.find(candidate => candidate.id === requested);
    if (!usable(item)) {
      if (slot === 'accessory') { if (requested) usedFallback = true; continue; }
      item = catalog.find(candidate => candidate.id === STARTER_DEFAULTS[gender][slot]);
      usedFallback = true;
      if (!usable(item)) return placeholder();
    }
    for (const layer of item.assets[gender]!) layers.push({ ...layer, key: `${item.id}:${layer.plane}:${layer.src}` });
  }
  layers.sort((a, b) => AVATAR_PLANES[a.plane] - AVATAR_PLANES[b.plane] || a.key.localeCompare(b.key));
  return { gender, layers, usedFallback, placeholder: false };
}
