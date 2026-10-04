import React from 'react';
import { BossPhase } from '../../engine/bossLogic';
interface Props { hp: number; phase: BossPhase; isHit?: boolean; isAttacking?: boolean; isDefeated?: boolean; }
export const Chronos: React.FC<Props> = ({ hp, phase, isHit, isAttacking, isDefeated }) => (
  <div role="img" aria-label={`Chronos, the Time Keeper: ${hp} HP`} className={`relative w-36 h-40 sm:w-52 sm:h-52 max-w-full max-h-full flex items-center justify-center transition-transform motion-reduce:transition-none ${isHit ? 'scale-95' : ''} ${isDefeated ? 'opacity-50' : ''}`}>
    <div className={`absolute inset-1 rounded-full border-4 border-dashed border-sky-400/60 shadow-[0_0_40px_#38bdf866] ${!isDefeated ? 'animate-[spin_24s_linear_infinite] motion-reduce:animate-none' : ''}`} />
    <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-lg" aria-hidden="true">
      <circle cx="100" cy="100" r="75" fill="#312e81" stroke="#fbbf24" strokeWidth="8" />
      <circle cx="100" cy="100" r="61" fill="#0f172a" stroke="#7dd3fc" strokeWidth="2" />
      {[...Array(12)].map((_, i) => <path key={i} d="M100 43 L100 51" stroke="#fcd34d" strokeWidth="4" transform={`rotate(${i * 30} 100 100)`} />)}
      <g className={!isDefeated ? 'animate-[spin_12s_linear_infinite] motion-reduce:animate-none' : ''} style={{ transformOrigin: '100px 100px' }}><path d="M100 100 L100 60" stroke="#7dd3fc" strokeWidth="6" strokeLinecap="round" /></g>
      <path d="M100 100 L128 113" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
      <circle cx="100" cy="100" r="7" fill="#fde68a" />
      <path d="M76 118 L86 114 M114 114 L124 118" stroke={isAttacking ? '#fb7185' : '#7dd3fc'} strokeWidth="5" strokeLinecap="round" />
      <path d={isDefeated ? 'M80 142 Q100 150 120 142' : phase === 3 ? 'M80 144 Q100 133 120 144' : 'M80 136 Q100 150 120 136'} stroke="#fcd34d" fill="none" strokeWidth="4" />
    </svg>
    <span aria-hidden="true" className="absolute -bottom-2 text-3xl">⚙️</span>
  </div>
);
