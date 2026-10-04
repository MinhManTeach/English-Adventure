import { Question, UserProgressState, ErrorBankItem, TopicMastery } from '../types';
import { calculateMasteryStatus } from './mastery';
import { calculateLevel } from './scoring';

/** Pure progression update, shared by lessons, Boss Battle and Smart Review. */
export function applyQuestionResult(
  prev: UserProgressState, question: Question, isCorrect: boolean,
  isChallengeOrBoss: boolean, timestamp: string, wrongAnswer?: string,
  today = timestamp.slice(0, 10),
  source: 'practice' | 'review' | 'boss' = question.id.startsWith('BOSS-') ? 'boss' : 'practice',
): UserProgressState {
  const next = { ...prev };
  if (source === 'boss') next.startedStages = [...new Set([...(prev.startedStages ?? []), 'boss'])];

  // 1. Error Bank management
  const errorBank = { ...next.errorBank };
  if (source === 'review' && question.reviewOf?.length) {
    for (const id of new Set(question.reviewOf)) {
      const existing = errorBank[id];
      if (!existing) continue;
      const reviewCorrectStreak = isCorrect ? (existing.reviewCorrectStreak ?? 0) + 1 : 0;
      errorBank[id] = {
        ...existing, reviewCorrectStreak, mastered: isCorrect && (existing.mastered || reviewCorrectStreak >= 3),
        wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
        lastWrongAt: isCorrect ? existing.lastWrongAt : timestamp,
        lastReviewedAt: timestamp, lastReviewQuestionId: question.id, lastAttemptSource: 'review',
        lastReviewWrongAnswer: isCorrect ? existing.lastReviewWrongAnswer : wrongAnswer,
      };
    }
  } else if (!isCorrect) {
    const existing = errorBank[question.id];
    const wrongCount = (existing ? existing.wrongCount : 0) + 1;
    const errorItem: ErrorBankItem = {
      ...existing,
      questionId: question.id,
      unit: question.unit,
      topic: question.topic,
      skill: question.skill,
      questionText: question.question,
      wrongCount,
      lastWrongAt: timestamp,
      source,
      questionType: question.type,
      reviewCorrectStreak: 0,
      lastAttemptSource: source,
      options: question.options ? [...question.options] : undefined,
      correctAnswer: Array.isArray(question.answer) ? [...question.answer] : question.answer,
      wrongAnswer,
      explanation: { ...question.explanation },
      mastered: false,
    };
    errorBank[question.id] = errorItem;

    // Deduct heart only in Challenge or Boss
    if (isChallengeOrBoss) {
      next.hearts = Math.max(0, next.hearts - 1);
    }
  } else {
    // If correct, check if was in error bank and mark progress towards recovery
    if (errorBank[question.id]) {
      errorBank[question.id] = {
        ...errorBank[question.id],
        mastered: source === 'review' ? errorBank[question.id].mastered || (errorBank[question.id].reviewCorrectStreak ?? 0) + 1 >= 3 : true,
        reviewCorrectStreak: source === 'review' ? (errorBank[question.id].reviewCorrectStreak ?? 0) + 1 : errorBank[question.id].reviewCorrectStreak,
        lastAttemptSource: source,
      };
    }
  }
  next.errorBank = errorBank;

  // 2. Topic Mastery updates
  const topicKey = question.topic || 'general';
  const masteryMap = { ...next.topicMastery };
  const existingMastery: TopicMastery = masteryMap[topicKey] || {
    topicKey,
    title: question.topic.replace(/-/g, ' ').toUpperCase(),
    skill: question.skill,
    totalAttempts: 0,
    correctAttempts: 0,
    accuracy: 0,
    status: 'NEW',
    lastPracticed: today,
  };

  const totalAttempts = existingMastery.totalAttempts + 1;
  const correctAttempts = existingMastery.correctAttempts + (isCorrect ? 1 : 0);
  const { accuracy, status } = calculateMasteryStatus(correctAttempts, totalAttempts);

  masteryMap[topicKey] = {
    ...existingMastery,
    totalAttempts,
    correctAttempts,
    accuracy,
    status,
    lastPracticed: today,
  };
  next.topicMastery = masteryMap;

  // 3. Vocab Master achievement check
  if (isCorrect && question.skill === 'vocabulary') {
    const previousVocab = next.achievements.vocab_master;
    const vocabAch = previousVocab ? { ...previousVocab } : undefined;
    if (vocabAch && !vocabAch.unlockedAt) {
      next.achievements = { ...next.achievements, vocab_master: vocabAch };
      vocabAch.currentProgress += 1;
      if (vocabAch.currentProgress >= vocabAch.maxProgress) {
        vocabAch.unlockedAt = today;
        next.xp += vocabAch.xpReward;
        next.coins += vocabAch.coinReward;
      }
    }
  }

  return next;
}

export interface BossVictoryResult {
  isFirstVictory: boolean;
  leveledUp: boolean;
  newLevel: number;
  xp: number;
  coins: number;
}

/** One transaction per battle; first-clear and achievement bonuses persist across replays. */
export function applyBossVictory(prev: UserProgressState, battleId: string, today: string): {
  state: UserProgressState; result: BossVictoryResult;
} {
  const oldLevel = calculateLevel(prev.xp).level;
  if (prev.lastBossRewardBattleId === battleId) {
    return { state: prev, result: {
      isFirstVictory: false, leveledUp: false, newLevel: oldLevel, xp: 0, coins: 0,
    } };
  }
  const isFirstVictory = !prev.bossDefeated;
  let xp = isFirstVictory ? 100 : 20;
  let coins = isFirstVictory ? 50 : 10;
  const achievements = { ...prev.achievements };
  const slayer = achievements.boss_slayer;
  if (slayer && !slayer.unlockedAt) {
    achievements.boss_slayer = { ...slayer, unlockedAt: today, currentProgress: 1 };
    xp += slayer.xpReward;
    coins += slayer.coinReward;
  }
  const next = {
    ...prev, achievements, bossDefeated: true, lastBossRewardBattleId: battleId,
    xp: prev.xp + xp, coins: prev.coins + coins, hearts: prev.maxHearts,
  };
  const newLevel = calculateLevel(next.xp).level;
  return { state: next, result: { isFirstVictory, leveledUp: newLevel > oldLevel, newLevel, xp, coins } };
}
