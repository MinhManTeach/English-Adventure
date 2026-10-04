import { UserProgressState } from '../types';
import { calculateLevel } from './scoring';

export function shouldCelebrateLevel(state: UserProgressState, level: number): boolean {
  return Number.isInteger(level) && level > (state.acknowledgedLevel ?? 1) && level <= calculateLevel(state.xp).level;
}

export function acknowledgeLevel(state: UserProgressState, level: number): UserProgressState {
  if (!shouldCelebrateLevel(state, level)) return state;
  return { ...state, acknowledgedLevel: level };
}
