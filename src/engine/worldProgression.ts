import { UserProgressState, ChapterId } from '../types';

export const WORLD2_UNITS = [4, 5, 6] as const;
export const WORLD1_UNITS = [1, 2, 3] as const;
export const LEARNING_STAGES = ['learn', 'practice', 'minigame', 'challenge'] as const;
export type LearningStage = typeof LEARNING_STAGES[number];
export type NodeStatus = 'LOCKED' | 'AVAILABLE' | 'IN PROGRESS' | 'COMPLETED' | 'MASTERED';
export const CHALLENGE_PASS_PERCENT = 80;
export const REVIEW_GATE_PASS_PERCENT = 80;
export const stageKey = (unitId: number, stage: LearningStage) => `unit${unitId}-${stage}`;

export function isUnitAvailable(state: UserProgressState, unitId: number): boolean {
  if (unitId >= 4) return WORLD2_UNITS.some(id => id === unitId) && state.bossDefeated && (
    unitId === 4 || state.completedUnits.includes(unitId) || state.completedUnits.includes(unitId - 1)
  );
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

export function isReviewGateAvailable(state: UserProgressState, chapter: ChapterId = 1): boolean {
  if (chapter === 2) return state.bossDefeated && WORLD2_UNITS.every(id => state.completedUnits.includes(id));
  return WORLD1_UNITS.every(id => state.completedUnits.includes(id));
}

export function getReviewGateStatus(state: UserProgressState, chapter: ChapterId = 1): NodeStatus {
  if (chapter === 2) {
    if (!isReviewGateAvailable(state, 2)) return 'LOCKED';
    const progress = state.chapter2;
    return progress?.reviewGateCompleted ? progress.reviewGateAttempts >= 2 && progress.reviewGateBestAccuracy >= 80 ? 'MASTERED' : 'COMPLETED' : progress?.reviewGateAttempts ? 'IN PROGRESS' : 'AVAILABLE';
  }
  if (!isReviewGateAvailable(state)) return 'LOCKED';
  if (state.reviewGateCompleted) {
    return (state.reviewGateAttempts ?? 0) >= 2 && (state.reviewGateBestAccuracy ?? 0) >= 80 ? 'MASTERED' : 'COMPLETED';
  }
  return (state.reviewGateAttempts ?? 0) > 0 ? 'IN PROGRESS' : 'AVAILABLE';
}

export function canEnterBoss(state: UserProgressState, chapter: ChapterId = 1): boolean {
  if (chapter === 2) return state.bossDefeated && (!!state.chapter2?.bossDefeated || isReviewGateAvailable(state, 2) && !!state.chapter2?.reviewGateCompleted);
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

export function finishReviewGate(state: UserProgressState, correct: number, total: number, chapter: ChapterId = 1): UserProgressState {
  if (chapter === 2) {
    if (!isReviewGateAvailable(state, 2) || total !== 8 || !Number.isInteger(correct) || correct < 0 || correct > total) return state;
    const old = state.chapter2 ?? { reviewGateCompleted: false, reviewGateAttempts: 0, reviewGateBestAccuracy: 0, bossDefeated: false };
    const accuracy = Math.round(correct / total * 100);
    return { ...state, chapter2: { ...old, reviewGateCompleted: old.reviewGateCompleted || accuracy >= REVIEW_GATE_PASS_PERCENT,
      reviewGateAttempts: old.reviewGateAttempts + 1, reviewGateBestAccuracy: Math.max(old.reviewGateBestAccuracy, accuracy) } };
  }
  if (!isReviewGateAvailable(state) || total < 8 || correct < 0 || correct > total) return state;
  const accuracy = Math.round(correct / total * 100);
  const reviewGateCompleted = !!state.reviewGateCompleted || accuracy >= REVIEW_GATE_PASS_PERCENT;
  return {
    ...state, reviewGateCompleted, bossUnlocked: reviewGateCompleted || state.bossDefeated,
    reviewGateAttempts: (state.reviewGateAttempts ?? 0) + 1,
    reviewGateBestAccuracy: Math.max(state.reviewGateBestAccuracy ?? 0, accuracy),
  };
}
