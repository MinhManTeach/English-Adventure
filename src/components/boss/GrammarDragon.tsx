import React from 'react';

interface GrammarDragonProps {
  hp: number;
  maxHp?: number;
  isHit?: boolean;
  isAttacking?: boolean;
  isDefeated?: boolean;
  phase: 1 | 2 | 3;
}

export const GrammarDragon: React.FC<GrammarDragonProps> = ({
  hp,
  maxHp = 100,
  isHit = false,
  isAttacking = false,
  isDefeated = false,
  phase = 1,
}) => {
  return (
    <div
      className={`relative select-none transition-transform duration-200 flex flex-col items-center justify-center ${
        isHit
          ? 'animate-shake scale-95 brightness-125'
          : isAttacking
          ? 'scale-110 -translate-x-4'
          : isDefeated
          ? 'scale-90 opacity-80'
          : 'animate-float'
      }`}
    >
      {/* Aura for Phase 2 & Final Phase */}
      {phase === 3 && !isDefeated && (
        <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
      )}
      {phase === 2 && !isDefeated && (
        <div className="absolute inset-0 bg-amber-500/15 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}

      {/* SVG Cartoon Dragon: Lord Verbose */}
      <svg
        viewBox="0 0 240 240"
        className="w-44 h-44 sm:w-60 sm:h-60 drop-shadow-xl overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dragonBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={phase === 3 ? '#9333EA' : '#7C3AED'} />
            <stop offset="100%" stopColor={phase === 3 ? '#C026D3' : '#4F46E5'} />
          </linearGradient>
          <linearGradient id="dragonBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="dragonWing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <radialGradient id="hornSparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#0284C7" />
          </radialGradient>
        </defs>

        {/* Back Wing */}
        <g className="origin-[100px_100px] transition-transform">
          <path
            d="M 120,90 Q 70,30 30,55 Q 55,85 70,110 Q 95,115 120,95 Z"
            fill="url(#dragonWing)"
            opacity="0.85"
          />
          <path
            d="M 30,55 Q 45,75 55,95"
            stroke="#F472B6"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Tail with spade */}
        <path
          d="M 170,180 Q 220,195 225,150 Q 220,135 235,125 Q 215,145 200,165 Q 185,175 160,180 Z"
          fill="url(#dragonBody)"
        />
        {/* Tail heart/spade */}
        <polygon
          points="235,120 220,135 238,145 242,130"
          fill="#EC4899"
        />

        {/* Main Body */}
        <ellipse cx="140" cy="150" rx="55" ry="50" fill="url(#dragonBody)" />

        {/* Golden Belly Plates */}
        <path
          d="M 105,140 Q 130,120 155,145 Q 160,175 135,195 Q 110,185 105,140 Z"
          fill="url(#dragonBelly)"
        />
        {/* Belly plate ridges */}
        <path d="M 115,152 Q 132,142 150,154" stroke="#D97706" strokeWidth="2.5" fill="none" />
        <path d="M 116,168 Q 132,158 147,170" stroke="#D97706" strokeWidth="2.5" fill="none" />
        <path d="M 120,182 Q 132,174 140,183" stroke="#D97706" strokeWidth="2.5" fill="none" />

        {/* Back Feet */}
        <ellipse cx="170" cy="195" rx="18" ry="12" fill="#5B21B6" />
        <circle cx="160" cy="202" r="3.5" fill="#FDE047" />
        <circle cx="170" cy="204" r="3.5" fill="#FDE047" />
        <circle cx="180" cy="202" r="3.5" fill="#FDE047" />

        {/* Front Feet */}
        <ellipse cx="115" cy="195" rx="18" ry="12" fill="#5B21B6" />
        <circle cx="105" cy="202" r="3.5" fill="#FDE047" />
        <circle cx="115" cy="204" r="3.5" fill="#FDE047" />
        <circle cx="125" cy="202" r="3.5" fill="#FDE047" />

        {/* Head */}
        <circle cx="105" cy="95" r="42" fill="url(#dragonBody)" />
        {/* Snout */}
        <ellipse cx="75" cy="110" rx="28" ry="20" fill="url(#dragonBody)" />
        {/* Nostrils */}
        <circle cx="62" cy="108" r="2.5" fill="#4C1D95" />
        <circle cx="70" cy="106" r="2.5" fill="#4C1D95" />

        {/* Smoke puff if phase 3 */}
        {phase === 3 && !isDefeated && (
          <g className="animate-pulse">
            <circle cx="48" cy="102" r="5" fill="#FB923C" opacity="0.8" />
            <circle cx="36" cy="96" r="7" fill="#F87171" opacity="0.6" />
          </g>
        )}

        {/* Cheeks */}
        <ellipse cx="78" cy="118" rx="8" ry="4" fill="#F472B6" opacity="0.6" />

        {/* Eyes: Change according to state */}
        {isDefeated ? (
          // Dizzy eyes on defeat
          <g stroke="#FDE047" strokeWidth="3" fill="none">
            <path d="M 85,82 Q 95,78 95,88 Q 90,95 82,90 Q 80,82 92,80" />
            <path d="M 112,82 Q 122,78 122,88 Q 117,95 109,90 Q 107,82 119,80" />
          </g>
        ) : isHit ? (
          // Squinched eyes on hit
          <g stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">
            <line x1="84" y1="84" x2="98" y2="92" />
            <line x1="84" y1="92" x2="98" y2="84" />
            <line x1="110" y1="84" x2="124" y2="92" />
            <line x1="110" y1="92" x2="124" y2="84" />
          </g>
        ) : (
          // Big Friendly Anime Dragon Eyes
          <g>
            <ellipse cx="90" cy="88" rx="10" ry="12" fill="#1E1B4B" />
            <ellipse cx="118" cy="88" rx="10" ry="12" fill="#1E1B4B" />
            {/* Highlights */}
            <circle cx="87" cy="84" r="4.5" fill="#FFFFFF" />
            <circle cx="93" cy="92" r="2" fill="#FFFFFF" />
            <circle cx="115" cy="84" r="4.5" fill="#FFFFFF" />
            <circle cx="121" cy="92" r="2" fill="#FFFFFF" />
            {/* Eye glint color depending on phase */}
            {phase === 3 && (
              <>
                <circle cx="90" cy="88" r="3" fill="#EF4444" opacity="0.5" />
                <circle cx="118" cy="88" r="3" fill="#EF4444" opacity="0.5" />
              </>
            )}
          </g>
        )}

        {/* Dragon smile */}
        {!isDefeated && !isHit && (
          <path
            d="M 68,118 Q 80,126 94,116"
            stroke="#1E1B4B"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        )}
        {isHit && (
          <ellipse cx="80" cy="120" rx="6" ry="7" fill="#4C1D95" />
        )}

        {/* Horns */}
        <path
          d="M 95,60 Q 85,25 65,15 Q 85,35 98,54 Z"
          fill="url(#hornSparkle)"
        />
        <path
          d="M 125,60 Q 135,25 155,15 Q 135,35 122,54 Z"
          fill="url(#hornSparkle)"
        />

        {/* Back Spine Spikes */}
        <polygon points="120,48 112,32 104,48" fill="#EC4899" />
        <polygon points="135,55 130,38 124,55" fill="#EC4899" />
        <polygon points="152,110 165,95 155,120" fill="#EC4899" />
        <polygon points="168,130 182,118 172,140" fill="#EC4899" />

        {/* Front Wing */}
        <g className="origin-[130px_130px]">
          <path
            d="M 140,125 Q 195,75 220,105 Q 185,135 160,150 Q 145,145 140,125 Z"
            fill="url(#dragonWing)"
          />
          <path
            d="M 145,125 Q 175,100 205,105"
            stroke="#F472B6"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* Wizard Medallion around neck */}
        <path
          d="M 95,125 Q 120,140 145,125"
          stroke="#F59E0B"
          strokeWidth="4"
          fill="none"
        />
        <circle cx="120" cy="138" r="9" fill="#06B6D4" stroke="#FDE047" strokeWidth="2.5" />
        <circle cx="120" cy="138" r="3.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
