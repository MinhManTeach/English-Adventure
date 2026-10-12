import React from 'react';
import { BossPhase } from '../../engine/bossLogic';
interface Props { hp: number; phase: BossPhase; isHit?: boolean; isAttacking?: boolean; isDefeated?: boolean; }
export const CaptainFogbeard: React.FC<Props> = ({ hp, phase, isHit, isAttacking, isDefeated }) => (
  <div role="img" aria-label={`Captain Fogbeard, the Memory Thief: ${hp} HP`} className={`relative w-36 h-40 sm:w-52 sm:h-52 max-w-full max-h-full flex items-center justify-center transition-transform motion-reduce:transition-none ${isHit ? 'scale-95' : ''} ${isDefeated ? 'opacity-50' : ''}`}>
    <div className="absolute inset-3 rounded-full bg-slate-300/20 shadow-[0_0_40px_#94a3b855]" />
    <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-lg" aria-hidden="true">
      <path d="M40 182 Q100 150 160 182 Z" fill="#334155" />
      <rect x="62" y="112" width="76" height="62" rx="18" fill="#1e3a5f" stroke="#fbbf24" strokeWidth="4" />
      <path d="M100 116 L100 170" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 6" />
      <circle cx="100" cy="88" r="36" fill="#f1c9a5" stroke="#1e293b" strokeWidth="4" />
      <path d="M66 96 Q72 140 100 146 Q128 140 134 96 Q120 112 100 112 Q80 112 66 96 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="3" />
      <path d="M86 116 Q100 108 114 116" stroke="#64748b" strokeWidth="3" fill="none" />
      {isDefeated
        ? <path d="M78 78 L90 90 M90 78 L78 90" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        : <circle cx="84" cy="84" r={phase === 3 ? 4 : 6} fill={isAttacking ? '#e11d48' : '#1e293b'} />}
      <path d="M106 76 L126 76 L126 92 Q116 98 106 92 Z" fill="#0f172a" />
      <path d="M70 70 L132 78" stroke="#0f172a" strokeWidth="3" />
      <path d="M52 62 Q100 18 148 62 Q100 50 52 62 Z" fill="#0f172a" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="100" cy="46" r="7" fill="#f8fafc" />
      <path d="M95 52 L105 52" stroke="#0f172a" strokeWidth="2" />
      <path d="M20 150 Q40 136 60 150 T100 150" stroke="#e2e8f0" strokeWidth="6" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M110 160 Q130 146 150 160 T188 156" stroke="#e2e8f0" strokeWidth="6" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
    <span aria-hidden="true" className="absolute -bottom-2 text-3xl">🧭</span>
  </div>
);
