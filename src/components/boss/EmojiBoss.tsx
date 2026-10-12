import React from 'react';
import { BossPhase } from '../../engine/bossLogic';
interface Props { hp: number; phase: BossPhase; isHit?: boolean; isAttacking?: boolean; isDefeated?: boolean; }

/** A boss drawn from its emoji, used by worlds that have no hand-drawn boss yet. */
export function createEmojiBoss(name: string, emoji: string, color: string): React.FC<Props> {
  const EmojiBoss: React.FC<Props> = ({ hp, phase, isHit, isAttacking, isDefeated }) => (
    <div role="img" aria-label={`${name}: ${hp} HP`} className={`relative w-36 h-40 sm:w-52 sm:h-52 max-w-full max-h-full flex items-center justify-center transition-transform motion-reduce:transition-none ${isHit ? 'scale-95' : ''} ${isDefeated ? 'opacity-50 grayscale' : ''}`}>
      <div className="absolute inset-3 rounded-full blur-sm" style={{ background: `radial-gradient(circle, ${color}55 0%, ${color}11 70%, transparent 100%)`, boxShadow: `0 0 40px ${color}66` }} />
      <div className="absolute inset-6 rounded-full border-4" style={{ borderColor: isAttacking ? '#e11d48' : `${color}aa` }} />
      <span aria-hidden="true" className={`relative leading-none select-none ${phase === 3 ? 'text-8xl sm:text-9xl' : 'text-7xl sm:text-8xl'} ${isDefeated ? 'rotate-12' : ''}`}>{emoji}</span>
    </div>
  );
  return EmojiBoss;
}
