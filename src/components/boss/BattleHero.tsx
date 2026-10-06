import React from 'react';
import { Heart } from 'lucide-react';
import type { CosmeticState } from '../../types';
import { PlayerAvatar } from '../avatar/PlayerAvatar';
import { AVATAR_PRESETS } from '../../data/avatarsData';

interface BattleHeroProps {
  avatarId: string;
  cosmetics?: CosmeticState;
  name: string;
  title: string;
  hearts: number;
  maxHearts?: number;
  isCasting?: boolean;
  isHurt?: boolean;
}

export const BattleHero: React.FC<BattleHeroProps> = ({
  avatarId,
  cosmetics,
  name,
  title,
  hearts,
  maxHearts = 5,
  isCasting = false,
  isHurt = false,
}) => {
  const currentAvatar =
    AVATAR_PRESETS.find(a => a.id === avatarId) || AVATAR_PRESETS[0];

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-transform duration-200 select-none ${
        isCasting
          ? 'scale-105 translate-x-2'
          : isHurt
          ? 'animate-shake scale-90'
          : ''
      }`}
    >
      {/* Magic Spell Circle beneath hero on the arena floor */}
      <div className="absolute -bottom-4 w-28 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 blur-[1px] -z-1 animate-pulse" />

      {/* Hero Avatar Card */}
      <div className="relative">
        {/* Magic Aura when casting or standing ready */}
        <div
          className={`absolute -inset-2 rounded-3xl blur-md transition-opacity ${
            isCasting
              ? 'bg-cyan-400/60 opacity-100 animate-pulse'
              : 'bg-amber-400/25 opacity-70'
          }`}
        />

        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 border-3 border-white shadow-xl flex items-center justify-center text-4xl sm:text-5xl relative z-10">
          <PlayerAvatar profile={{ avatarId, name }} cosmetics={cosmetics} size="medium" variant="compact" decorative />

          {/* Wizard Staff / Spell Wand badge */}
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-md border-2 border-white">
            🪄
          </div>
        </div>
      </div>

      {/* Hero Name & Title */}
      <div className="text-center mt-1.5 space-y-0.5 z-10">
        <h4 className="text-sm sm:text-base font-black text-white font-game drop-shadow-md">
          {name || 'Hero'}
        </h4>
        <span className="text-[10px] sm:text-xs font-bold text-amber-300 block truncate max-w-[120px]">
          {title || currentAvatar.title}
        </span>
      </div>

      {/* Hero HP (Hearts) */}
      <div className="flex items-center gap-1 mt-1 bg-slate-950/70 backdrop-blur-xs px-2 py-0.5 rounded-xl border border-slate-700 z-10">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <Heart
            key={i}
            className={`w-3.5 h-3.5 transition-all ${
              i < hearts
                ? 'text-rose-500 fill-rose-500 scale-100'
                : 'text-slate-600 scale-75 opacity-30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
