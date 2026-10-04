/**
 * Authoritative Boss Battle Invariant Helpers.
 * Guarantees that HP and Phase are always strictly derived and bounded.
 */

export type BossPhase = 1 | 2 | 3 | 'defeated';

/**
 * Phase 1: 100–70 HP
 * Phase 2: 60–40 HP
 * Final Phase: 30–1 HP
 * Defeated: 0 HP
 */
export function getBossPhase(bossHp: number): BossPhase {
  if (bossHp <= 0) return 'defeated';
  if (bossHp >= 70) return 1;
  if (bossHp >= 40) return 2;
  return 3;
}

/**
 * Safely clamps boss HP between 0 and 100 in exact multiples of 10.
 */
export function clampBossHp(hp: number): number {
  const bounded = Math.max(0, Math.min(100, hp));
  // Round to nearest 10
  return Math.round(bounded / 10) * 10;
}

/**
 * Safely clamps player hearts between 0 and 5.
 */
export function clampHearts(hearts: number, maxHearts = 5): number {
  return Math.max(0, Math.min(maxHearts, hearts));
}

export const BOSS_QUESTION_COUNT = 10;
export interface BossBattleState {
  bossHp: number;
  playerHearts: number;
  currentIndex: number;
  comboCount: number;
  wrongAttempts: number;
  successfulHits: number;
  resolution: 'ready' | 'retry' | 'resolved';
  status: 'intro' | 'fighting' | 'victory' | 'defeat' | 'survived';
}

export function createBossBattle(status: 'intro' | 'fighting' = 'intro'): BossBattleState {
  return {
    bossHp: 100, playerHearts: 5, currentIndex: 0, comboCount: 0,
    wrongAttempts: 0, successfulHits: 0, resolution: 'ready', status,
  };
}

export type BossAction =
  | { type: 'start' }
  | { type: 'answer'; questionIndex: number; correct: boolean }
  | { type: 'retry'; questionIndex: number }
  | { type: 'next'; questionIndex: number };

/** Pure, authoritative transitions. Old question events and duplicate submits are ignored. */
export function transitionBossBattle(state: BossBattleState, action: BossAction): BossBattleState {
  if (action.type === 'start') {
    return state.status === 'intro' ? { ...state, status: 'fighting' } : state;
  }
  if (state.status !== 'fighting' || action.questionIndex !== state.currentIndex) return state;
  if (action.type === 'retry') {
    return state.resolution === 'retry' ? { ...state, resolution: 'ready' } : state;
  }
  if (action.type === 'answer') {
    if (state.resolution !== 'ready') return state;
    if (action.correct) {
      const successfulHits = state.successfulHits + 1;
      return {
        ...state, successfulHits, bossHp: Math.max(0, 100 - successfulHits * 10),
        comboCount: state.comboCount + 1, resolution: 'resolved',
      };
    }
    const wrongAttempts = state.wrongAttempts + 1;
    return {
      ...state, wrongAttempts, comboCount: 0,
      playerHearts: wrongAttempts === 2 ? clampHearts(state.playerHearts - 1) : state.playerHearts,
      resolution: wrongAttempts === 2 ? 'resolved' : 'retry',
    };
  }
  if (state.resolution !== 'resolved') return state;
  if (state.bossHp === 0) return { ...state, status: 'victory' };
  if (state.playerHearts === 0) return { ...state, status: 'defeat' };
  if (state.currentIndex === BOSS_QUESTION_COUNT - 1) return { ...state, status: 'survived' };
  return { ...state, currentIndex: state.currentIndex + 1, wrongAttempts: 0, resolution: 'ready' };
}

/** Only the terminal victory transition can claim the shared reward transaction. */
export function canClaimBossVictory(state: BossBattleState): boolean {
  return state.status === 'victory' && state.bossHp === 0;
}
