import React, { memo, useCallback, useMemo, useState } from 'react';
import type { AvatarState, StoreItem } from '../../types';
import { COSMETIC_CATALOG } from '../../data/cosmeticsCatalog';
import { AVATAR_BODY_ASSETS } from '../../data/avatarAssets';
import { assetUrl } from '../../engine/assetUrl';
import { AVATAR_PLANES, AVATAR_SIZES, AvatarPresentation, AvatarSize, resolveAvatarLayers } from '../../engine/avatarRendering';

export interface AvatarRendererProps {
  avatar: AvatarState;
  size?: AvatarSize;
  presentation?: AvatarPresentation;
  label?: string;
  className?: string;
  /** Read-only asset overrides support previews and failure diagnostics; never player save data. */
  bodyAssets?: typeof AVATAR_BODY_ASSETS;
  catalog?: readonly StoreItem[];
  unavailableSources?: readonly string[];
}
const NO_SOURCES: readonly string[] = [];
const FULL_CANVAS: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' };

function NeutralAvatar() {
  return <svg aria-hidden="true" viewBox="0 0 768 1280" style={FULL_CANVAS}>
    <g fill="#c5d4e4" stroke="#526a83" strokeWidth="8" strokeLinejoin="round">
      <path d="M280 690H375L356 1150H288Z M393 690H488L480 1150H413Z" />
      <path d="M267 434Q240 424 230 460L212 752Q220 790 250 774L277 520Z M501 434Q528 424 538 460L556 752Q548 790 518 774L491 520Z" />
      <path d="M348 370H420V430H348Z" />
      <path d="M292 424Q384 405 476 424L500 727Q384 755 268 727Z" fill="#7299ba" />
      <ellipse cx="384" cy="256" rx="124" ry="126" />
      <path d="M288 1100H353L364 1176H276Z M415 1100H480L492 1176H404Z" fill="#526a83" />
    </g>
    <g fill="#526a83"><ellipse cx="336" cy="266" rx="12" ry="18" /><ellipse cx="432" cy="266" rx="12" ry="18" /></g>
    <path d="M354 326Q384 350 414 326" fill="none" stroke="#526a83" strokeWidth="8" strokeLinecap="round" />
  </svg>;
}

export const AvatarRenderer = memo(function AvatarRenderer({ avatar, size = 'medium', presentation = 'complete',
  label, className = '', bodyAssets = AVATAR_BODY_ASSETS, catalog = COSMETIC_CATALOG, unavailableSources = NO_SOURCES }: AvatarRendererProps) {
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const blocked = useMemo(() => new Set([...failed, ...unavailableSources]), [failed, unavailableSources]);
  const plan = useMemo(() => resolveAvatarLayers(avatar, { failedSources: blocked, presentation, bodyAssets, catalog }),
    [avatar, blocked, presentation, bodyAssets, catalog]);
  const onError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const src = event.currentTarget.dataset.src;
    if (src) setFailed(previous => previous.has(src) ? previous : new Set([...previous, src]));
  }, []);
  const onLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const src = event.currentTarget.dataset.src;
    if (src) setLoaded(previous => previous.has(src) ? previous : new Set([...previous, src]));
  }, []);
  const ready = !plan.placeholder && plan.layers.every(layer => loaded.has(layer.src));
  const description = label ?? `${plan.gender === 'girl' ? 'Girl' : 'Boy'} adventure avatar${presentation === 'body-only' ? ' in neutral base clothing' : ''}`;
  return <div role="img" aria-label={`${description}${plan.placeholder ? ' — complete neutral fallback' : plan.usedFallback ? ' — starter fallback' : ''}`}
    className={className} data-avatar-size={size} data-asset-state={plan.placeholder ? 'placeholder' : ready ? 'loaded' : 'loading'}
    style={{ position: 'relative', width: AVATAR_SIZES[size], maxWidth: '100%', aspectRatio: '3 / 5', flexShrink: 0, isolation: 'isolate' }}>
    {!ready && <NeutralAvatar />}
    {plan.layers.map(layer => <img key={layer.key} src={assetUrl(layer.src)} data-src={layer.src} alt="" aria-hidden="true" draggable={false}
      width={768} height={1280} decoding="async" onError={onError} onLoad={onLoad}
      style={{ ...FULL_CANVAS, zIndex: AVATAR_PLANES[layer.plane], opacity: ready ? 1 : 0 }} />)}
  </div>;
});
