import React from 'react';
import { useGame } from '../../context/GameContext';

interface WorldBackgroundProps {
  unitId?: number | null;
  isBoss?: boolean;
}

export const WorldBackground: React.FC<WorldBackgroundProps> = ({ unitId, isBoss }) => {
  const { activeUnitId, currentScreen } = useGame();
  const effectiveUnit = unitId ?? activeUnitId ?? 1;

  if (isBoss || currentScreen === 'boss') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Castle Ramparts & Torches Silhouette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 opacity-95" />
        
        {/* Torch glow effects */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-amber-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />

        {/* Castle Battlements SVG at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-36 text-slate-950/60"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,40 L40,40 L40,60 L80,60 L80,40 L140,40 L140,60 L180,60 L180,40 L240,40 L240,60 L280,60 L280,40 L340,40 L340,60 L380,60 L380,40 L440,40 L440,60 L480,60 L480,40 L540,40 L540,60 L580,60 L580,40 L640,40 L640,60 L680,60 L680,40 L740,40 L740,60 L780,60 L780,40 L840,40 L840,60 L880,60 L880,40 L940,40 L940,60 L980,60 L980,40 L1040,40 L1040,60 L1080,60 L1080,40 L1140,40 L1140,60 L1180,60 L1180,40 L1200,40 L1200,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (effectiveUnit >= 4) {
    return <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-sky-50 via-teal-50/70 to-amber-50">
      <div className="absolute top-24 left-6 h-40 w-40 rounded-full bg-amber-200/30 blur-2xl" />
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="absolute bottom-0 h-32 w-full text-teal-200/50"><path fill="currentColor" d="M0 90 Q200 0 400 90 T800 90 T1200 90 V180 H0 Z" /></svg>
      <span className="absolute bottom-4 left-6 text-5xl opacity-15">{effectiveUnit === 4 ? '🚲' : effectiveUnit === 5 ? '🌳' : '⛵'}</span>
    </div>;
  }

  if (effectiveUnit === 1) {
    // Unit 1: Magic Grammar Gate - Star runes, glowing arch, floating crystals
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Magic aura lights */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />

        {/* Floating magic gate sparkle runes */}
        <svg
          className="absolute inset-0 w-full h-full text-blue-500/10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle celestial stars & runes */}
          <circle cx="10%" cy="15%" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="85%" cy="20%" r="3" fill="currentColor" opacity="0.4" />
          <circle cx="20%" cy="45%" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="92%" cy="60%" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="15%" cy="80%" r="3" fill="currentColor" opacity="0.4" />
          <path
            d="M 60,80 L 70,60 L 80,80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M 900,120 L 915,100 L 930,120 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>

        {/* Subtle stone arch gateway base */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-blue-900/5 to-transparent" />
      </div>
    );
  }

  if (effectiveUnit === 2) {
    // Unit 2: Daily Life Village - Rolling hills, sun glow, cozy rooftops
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Warm village sun glow */}
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />

        {/* Gentle rolling hills SVG at bottom */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-24 text-emerald-600/8"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C150,80 350,110 500,70 C650,30 850,90 1000,50 C1100,20 1180,60 1200,80 L1200,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  // Unit 3: My Home Town - Warm cozy interior wallpaper lines, window warmth
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Warm room lamp glow */}
      <div className="absolute -top-16 left-1/3 w-80 h-80 bg-orange-300/12 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />

      {/* Cozy floor/wainscot trim */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-900/5 to-transparent border-t border-amber-900/5" />
    </div>
  );
};
