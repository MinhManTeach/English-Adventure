import React, { memo } from 'react';
import type { CosmeticState, UserProgressState } from '../../types';
import { AVATAR_PRESETS } from '../../data/avatarsData';
import { AVATAR_SIZES, AvatarSize } from '../../engine/avatarRendering';
import { AvatarRenderer } from './AvatarRenderer';

export interface PlayerAvatarProps {
  profile: Pick<UserProgressState['profile'], 'avatarId' | 'name'>;
  cosmetics?: CosmeticState;
  size?: AvatarSize;
  variant?: 'full' | 'compact';
  className?: string;
  ariaLabel?: string;
  decorative?: boolean;
}
/** Saved player identity only. Creator/Store drafts continue to use AvatarRenderer directly. */
export const PlayerAvatar = memo(function PlayerAvatar({ profile, cosmetics, size = 'medium', variant = 'full',
  className = '', ariaLabel, decorative = false }: PlayerAvatarProps) {
  const preset = AVATAR_PRESETS.find(item => item.id === profile.avatarId) ?? AVATAR_PRESETS[0];
  const configured = cosmetics?.setupCompleted === true;
  const label = ariaLabel ?? (configured ? `${profile.name || 'Hero'}'s adventure avatar` : `Legacy avatar ${preset.name}`);
  const width = AVATAR_SIZES[size];
  return <span role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : label} aria-hidden={decorative || undefined}
    data-player-avatar={configured ? 'layered' : 'legacy'} className={className}
    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width, maxWidth: '100%',
      aspectRatio: variant === 'compact' ? '1' : '3 / 5', flexShrink: 0, verticalAlign: 'middle' }}>
    {configured ? variant === 'compact'
      // Compact frames show a head-and-shoulders portrait, so the face stays readable at 48px.
      ? <span aria-hidden="true" data-avatar-portrait="" style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '1', clipPath: 'circle(50%)' }}>
        <span style={{ position: 'absolute', display: 'block', width: '200%', left: '-50%', top: '-22%' }}>
          <AvatarRenderer avatar={cosmetics.avatar} size="medium" />
        </span>
      </span>
      : <span aria-hidden="true" style={{ display: 'block', width: '100%' }}>
        <AvatarRenderer avatar={cosmetics.avatar} size={size} />
      </span> : <span aria-hidden="true" style={{ fontSize: width * (variant === 'compact' ? 0.55 : 0.6), lineHeight: 1 }}>{preset.icon}</span>}
  </span>;
});
