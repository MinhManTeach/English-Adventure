import React from 'react';
import { BossPhase } from '../../engine/bossLogic';
interface Props { hp: number; phase: BossPhase; isHit?: boolean; isAttacking?: boolean; isDefeated?: boolean; }
export const ProfessorHoot: React.FC<Props> = ({ hp, phase, isHit, isAttacking, isDefeated }) => (
  <div role="img" aria-label={`Professor Hoot, the Exam Owl: ${hp} HP`} className={`relative w-36 h-40 sm:w-52 sm:h-52 max-w-full max-h-full flex items-center justify-center transition-transform motion-reduce:transition-none ${isHit ? 'scale-95' : ''} ${isDefeated ? 'opacity-50' : ''}`}>
    <div className="absolute inset-3 rounded-full bg-amber-300/10 shadow-[0_0_40px_#fbbf2455]" />
    <svg viewBox="0 0 200 200" className="relative w-full h-full drop-shadow-lg" aria-hidden="true">
      <ellipse cx="100" cy="120" rx="58" ry="66" fill="#7c4a2d" stroke="#fbbf24" strokeWidth="5" />
      <ellipse cx="100" cy="138" rx="36" ry="42" fill="#f5deb3" />
      {[0, 1, 2].map(i => <path key={i} d={`M${82 + i * 12} ${128 + (i % 2) * 8} q6 6 12 0`} stroke="#c08457" strokeWidth="3" fill="none" />)}
      <path d="M48 90 L62 58 L80 84 Z M152 90 L138 58 L120 84 Z" fill="#7c4a2d" stroke="#fbbf24" strokeWidth="4" />
      <circle cx="76" cy="98" r="20" fill="#fef3c7" stroke="#1e293b" strokeWidth="4" />
      <circle cx="124" cy="98" r="20" fill="#fef3c7" stroke="#1e293b" strokeWidth="4" />
      <path d="M96 98 L104 98" stroke="#1e293b" strokeWidth="4" />
      {isDefeated
        ? <path d="M68 92 L84 104 M84 92 L68 104 M116 92 L132 104 M132 92 L116 104" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        : <>
          <circle cx="76" cy="100" r={phase === 3 ? 6 : 8} fill={isAttacking ? '#e11d48' : '#1e293b'} />
          <circle cx="124" cy="100" r={phase === 3 ? 6 : 8} fill={isAttacking ? '#e11d48' : '#1e293b'} />
        </>}
      <path d="M93 116 L100 128 L107 116 Z" fill="#f59e0b" />
      <path d="M58 52 L100 34 L142 52 L100 70 Z" fill="#1e1b4b" stroke="#fbbf24" strokeWidth="3" />
      <path d="M142 52 L142 74" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="142" cy="78" r="5" fill="#fbbf24" />
      <rect x="128" y="150" width="44" height="30" rx="4" fill="#2563eb" stroke="#bfdbfe" strokeWidth="3" transform="rotate(-12 150 165)" />
    </svg>
    <span aria-hidden="true" className="absolute -bottom-2 text-3xl">📚</span>
  </div>
);
