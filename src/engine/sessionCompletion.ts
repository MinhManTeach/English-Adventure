import { UserProgressState, LessonAttemptLog } from '../types';
import { calculateXP, calculateCoins, calculateLevel } from './scoring';
import { LearningStage, isStageAvailable, canEnterBoss, CHALLENGE_PASS_PERCENT } from './worldProgression';

export interface LearningSessionSummary {
  sessionId: string;
  unitId: number;
  stageId: Exclude<LearningStage, 'learn'>;
  totalQuestions: number;
  correctCount: number;
  durationSeconds: number;
}
export interface LearningSessionResult {
  xpEarned: number;
  coinsEarned: number;
  isPerfect: boolean;
  passed: boolean;
  leveledUp: boolean;
  newLevel: number;
  levelTitle: string;
}

export function applySessionCompletion(prev: UserProgressState, summary: LearningSessionSummary, timestamp: string, today: string): {
  state: UserProgressState; result: LearningSessionResult;
} {
  const previousLevel = calculateLevel(prev.xp);
  const empty: LearningSessionResult = {
    xpEarned: 0, coinsEarned: 0, isPerfect: false, passed: false,
    leveledUp: false, newLevel: previousLevel.level, levelTitle: previousLevel.title,
  };
  if (!summary.sessionId || prev.completedSessionIds?.includes(summary.sessionId) ||
      !isStageAvailable(prev, summary.unitId, summary.stageId) || summary.totalQuestions < 6 ||
      !Number.isInteger(summary.correctCount) || summary.correctCount < 0 || summary.correctCount > summary.totalQuestions) {
    return { state: prev, result: empty };
  }
  const accuracy = Math.round(summary.correctCount / summary.totalQuestions * 100);
  const isPerfect = summary.correctCount === summary.totalQuestions;
  const xpEarned = calculateXP({ baseXP: summary.correctCount * 10, isPerfect, streakDays: prev.streak });
  const coinsEarned = calculateCoins({ correctCount: summary.correctCount, isPerfect });
  const next = { ...prev };
  next.xp += xpEarned;
  next.coins += coinsEarned;

  // Mark stage completed
  const stageKey = `unit${summary.unitId}-${summary.stageId}`;
  const passed = summary.stageId !== 'challenge' || accuracy >= CHALLENGE_PASS_PERCENT;
  next.unitStageProgress = {
    ...next.unitStageProgress,
    [stageKey]: !!next.unitStageProgress[stageKey] || passed,
  };
  const previousPerformance = prev.stagePerformance?.[stageKey];
  next.stagePerformance = { ...prev.stagePerformance, [stageKey]: {
    attempts: (previousPerformance?.attempts ?? 0) + 1,
    bestAccuracy: Math.max(previousPerformance?.bestAccuracy ?? 0, accuracy),
  } };

  // Complete the unit only after all four stages have been completed.
  const stages = ['learn', 'practice', 'minigame', 'challenge'];
  const allCompleted = stages.every(s => next.unitStageProgress[`unit${summary.unitId}-${s}`]);

  if (allCompleted) {
    // Strictly prevent duplicate unit completion rewards
    if (!next.completedUnits.includes(summary.unitId)) {
      next.completedUnits = [...next.completedUnits, summary.unitId];
      next.xp += 50; // One-time Unit completion reward
      next.coins += 25;

      // Unlock next unit
      const nextUnitNum = summary.unitId + 1;
      if (nextUnitNum <= 3 && !next.unlockedUnits.includes(nextUnitNum)) {
        next.unlockedUnits = [...next.unlockedUnits, nextUnitNum];
      }
    }
  }

  next.bossUnlocked = canEnterBoss(next);

  // Achievements verification (one-time grants only)
  const ach = Object.fromEntries(Object.entries(next.achievements).map(([id, item]) => [id, { ...item }]));
  next.achievements = ach;
  if (ach.first_step && !ach.first_step.unlockedAt) {
    ach.first_step.unlockedAt = today;
    ach.first_step.currentProgress = 1;
    next.xp += ach.first_step.xpReward;
    next.coins += ach.first_step.coinReward;
  }

  if (isPerfect && ach.perfect_round && !ach.perfect_round.unlockedAt) {
    ach.perfect_round.unlockedAt = today;
    ach.perfect_round.currentProgress = 1;
    next.xp += ach.perfect_round.xpReward;
    next.coins += ach.perfect_round.coinReward;
  }

  if (next.completedUnits.includes(1) && ach.grammar_rookie && !ach.grammar_rookie.unlockedAt) {
    ach.grammar_rookie.unlockedAt = today;
    ach.grammar_rookie.currentProgress = 1;
    next.xp += ach.grammar_rookie.xpReward;
    next.coins += ach.grammar_rookie.coinReward;
  }

  if (next.completedUnits.includes(2) && ach.daily_hero && !ach.daily_hero.unlockedAt) {
    ach.daily_hero.unlockedAt = today;
    ach.daily_hero.currentProgress = 1;
    next.xp += ach.daily_hero.xpReward;
    next.coins += ach.daily_hero.coinReward;
  }

  if (next.completedUnits.includes(3) && ach.home_explorer && !ach.home_explorer.unlockedAt) {
    ach.home_explorer.unlockedAt = today;
    ach.home_explorer.currentProgress = 1;
    next.xp += ach.home_explorer.xpReward;
    next.coins += ach.home_explorer.coinReward;
  }


  // Attempt log
  const logItem: LessonAttemptLog = {
    id: summary.sessionId,
    unitId: summary.unitId,
    stageId: summary.stageId,
    completedAt: timestamp,
    score: summary.correctCount,
    total: summary.totalQuestions,
    xpEarned,
    coinsEarned,
    accuracy: summary.totalQuestions > 0 ? Math.round((summary.correctCount / summary.totalQuestions) * 100) : 100,
    durationSeconds: summary.durationSeconds,
  };
  next.attemptLogs = [logItem, ...next.attemptLogs.slice(0, 49)];

  // Auto refill hearts on normal stage finish
  next.hearts = next.maxHearts;

  next.completedSessionIds = [...(prev.completedSessionIds ?? []), summary.sessionId].slice(-100);
  const nextLevel = calculateLevel(next.xp);
  return { state: next, result: {
    xpEarned: next.xp - prev.xp, coinsEarned: next.coins - prev.coins, isPerfect, passed,
    leveledUp: nextLevel.level > previousLevel.level, newLevel: nextLevel.level, levelTitle: nextLevel.title,
  } };
}
