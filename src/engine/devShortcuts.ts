import type { UserProgressState } from '../types';
export function applyDevShortcut(state: UserProgressState, enabled: boolean,
  operation: 'unlock' | 'xp' | 'coins', amount = 0): UserProgressState {
  if (enabled !== true) return state;
  if (operation === 'unlock') return { ...state, unlockedUnits: [1, 2, 3], completedUnits: [1, 2, 3],
    bossUnlocked: true, reviewGateCompleted: true, xp: Math.max(state.xp, 750), coins: Math.max(state.coins, 120) };
  if (!Number.isSafeInteger(amount) || amount < 0) return state;
  return operation === 'xp' ? { ...state, xp: state.xp + amount } : { ...state, coins: state.coins + amount };
}
