import { UserProgressState } from '../types';

export const WORLD1_UNITS = [1, 2, 3] as const;
export const LEARNING_STAGES = ['learn', 'practice', 'minigame', 'challenge'] as const;
export type LearningStage = typeof LEARNING_STAGES[number];
export type NodeStatus = 'LOCKED' | 'AVAILABLE' | 'IN PROGRESS' | 'COMPLETED' | 'MASTERED';
export const CHALLENGE_PASS_PERCENT = 80;
export const REVIEW_GATE_PASS_PERCENT = 80;
export const stageKey = (unitId: number, stage: LearningStage) => `unit${unitId}-${stage}`;

export function isUnitAvailable(state: UserProgressState, unitId: number): boolean {
  return WORLD1_UNITS.some(id => id === unitId) && (
    unitId === 1 || state.completedUnits.includes(unitId) ||
    state.unlockedUnits.includes(unitId) || state.completedUnits.includes(unitId - 1)
  );
}

export function isStageAvailable(state: UserProgressState, unitId: number, stage: LearningStage): boolean {
  if (!isUnitAvailable(state, unitId)) return false;
  const index = LEARNING_STAGES.indexOf(stage);
  if (index < 0) return false;
  return state.completedUnits.includes(unitId) || index === 0 ||
    !!state.unitStageProgress[stageKey(unitId, LEARNING_STAGES[index - 1])];
}

export function getStageStatus(state: UserProgressState, unitId: number, stage: LearningStage): NodeStatus {
  if (!isStageAvailable(state, unitId, stage)) return 'LOCKED';
  const key = stageKey(unitId, stage);
  if (state.unitStageProgress[key] || state.completedUnits.includes(unitId)) {
    const performance = state.stagePerformance?.[key];
    return performance && performance.attempts >= 2 && performance.bestAccuracy >= 80 ? 'MASTERED' : 'COMPLETED';
  }
  return state.startedStages?.includes(key) ? 'IN PROGRESS' : 'AVAILABLE';
}

export function getUnitStatus(state: UserProgressState, unitId: number, topics: string[] = []): NodeStatus {
  if (!isUnitAvailable(state, unitId)) return 'LOCKED';
  if (state.completedUnits.includes(unitId)) {
    return topics.length > 0 && topics.every(topic => state.topicMastery[topic]?.status === 'MASTERED')
      ? 'MASTERED' : 'COMPLETED';
  }
  return LEARNING_STAGES.some(stage => state.unitStageProgress[stageKey(unitId, stage)] ||
    state.startedStages?.includes(stageKey(unitId, stage))) ? 'IN PROGRESS' : 'AVAILABLE';
}

export function isReviewGateAvailable(state: UserProgressState): boolean {
  return WORLD1_UNITS.every(id => state.completedUnits.includes(id));
}

export function getReviewGateStatus(state: UserProgressState): NodeStatus {
  if (!isReviewGateAvailable(state)) return 'LOCKED';
  if (state.reviewGateCompleted) {
    return (state.reviewGateAttempts ?? 0) >= 2 && (state.reviewGateBestAccuracy ?? 0) >= 80 ? 'MASTERED' : 'COMPLETED';
  }
  return (state.reviewGateAttempts ?? 0) > 0 ? 'IN PROGRESS' : 'AVAILABLE';
}

export function canEnterBoss(state: UserProgressState): boolean {
  return state.bossDefeated || (isReviewGateAvailable(state) && !!state.reviewGateCompleted);
}

export function completeLearnStage(state: UserProgressState, unitId: number): UserProgressState {
  const key = stageKey(unitId, 'learn');
  if (!isStageAvailable(state, unitId, 'learn') || state.unitStageProgress[key]) return state;
  return { ...state, unitStageProgress: { ...state.unitStageProgress, [key]: true } };
}

export function startLearningStage(state: UserProgressState, unitId: number, stage: LearningStage): UserProgressState {
  const key = stageKey(unitId, stage);
  if (!isStageAvailable(state, unitId, stage) || state.startedStages?.includes(key)) return state;
  return { ...state, startedStages: [...(state.startedStages ?? []), key] };
}

export function finishReviewGate(state: UserProgressState, correct: number, total: number): UserProgressState {
  if (!isReviewGateAvailable(state) || total < 8 || correct < 0 || correct > total) return state;
  const accuracy = Math.round(correct / total * 100);
  const reviewGateCompleted = !!state.reviewGateCompleted || accuracy >= REVIEW_GATE_PASS_PERCENT;
  return {
    ...state, reviewGateCompleted, bossUnlocked: reviewGateCompleted || state.bossDefeated,
    reviewGateAttempts: (state.reviewGateAttempts ?? 0) + 1,
    reviewGateBestAccuracy: Math.max(state.reviewGateBestAccuracy ?? 0, accuracy),
  };
}
