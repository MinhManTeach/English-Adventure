import { Question, UserProgressState, ErrorBankItem, TopicMastery, ChapterId } from '../types';
import { calculateMasteryStatus } from './mastery';
import { calculateLevel } from './scoring';
import { getWorld, getWorldOfUnit } from '../data/worlds';
import { EMPTY_CHAPTER_PROGRESS, getChapterProgress, withChapterProgress } from './worldProgression';

/** Pure progression update, shared by lessons, Boss Battle and Smart Review. */
export function applyQuestionResult(
  prev: UserProgressState, question: Question, isCorrect: boolean,
  isChallengeOrBoss: boolean, timestamp: string, wrongAnswer?: string,
  today = timestamp.slice(0, 10),
  source: 'practice' | 'review' | 'boss' = question.id.startsWith('BOSS-') ? 'boss' : 'practice',
): UserProgressState {
  const next = { ...prev };
  if (source === 'boss') next.startedStages = [...new Set([...(prev.startedStages ?? []), getWorldOfUnit(question.unit)?.bossStageKey ?? 'boss'])];

  // 1. Error Bank management
  const errorBank = { ...next.errorBank };
  if (source === 'review' && question.reviewOf?.length) {
    for (const id of new Set(question.reviewOf)) {
      const existing = errorBank[id];
      if (!existing) continue;
      if (question.conceptId && existing.conceptId && question.conceptId !== existing.conceptId) continue;
      const fresh = !question.variantId || (question.variantId !== existing.originalVariantId && !existing.recoveryVariantIds?.includes(question.variantId) && !existing.recoveryInstanceIds?.includes(question.questionInstanceId ?? ''));
      const reviewCorrectStreak = isCorrect ? (existing.reviewCorrectStreak ?? 0) + (fresh ? 1 : 0) : 0;
      errorBank[id] = {
        ...existing, reviewCorrectStreak,
        ...(question.variantId && isCorrect && fresh ? { recoveryVariantIds: [...(existing.recoveryVariantIds ?? []), question.variantId], recoveryInstanceIds: [...(existing.recoveryInstanceIds ?? []), question.questionInstanceId ?? question.id] } : {}), mastered: isCorrect && (existing.mastered || reviewCorrectStreak >= 3),
        wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
        lastWrongAt: isCorrect ? existing.lastWrongAt : timestamp,
        lastReviewContextKey: question.contextKey ?? existing.lastReviewContextKey,
        lastReviewedAt: timestamp, lastReviewQuestionId: question.id, lastAttemptSource: 'review',
        lastReviewWrongAnswer: isCorrect ? existing.lastReviewWrongAnswer : wrongAnswer,
      };
    }
  } else if (!isCorrect) {
    const errorKey = question.conceptId ? `concept:${question.conceptId}` : question.id;
    const existing = errorBank[errorKey];
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
    if (question.conceptId) Object.assign(errorItem, { conceptId: question.conceptId,
      questionId: existing?.questionId ?? question.id, questionText: existing?.questionText ?? question.question,
      correctAnswer: existing?.correctAnswer ?? question.answer, wrongAnswer: existing?.wrongAnswer ?? wrongAnswer,
      options: existing?.options ?? question.options, explanation: existing?.explanation ?? question.explanation,
      source: existing?.source ?? source, questionType: existing?.questionType ?? question.type, originalVariantId: existing?.originalVariantId ?? question.variantId,
      originalContextKey: existing ? existing.originalContextKey : question.contextKey, lastContextKey: question.contextKey,
      lastVariantId: question.variantId, lastQuestionText: question.question });
    errorBank[errorKey] = errorItem;

    // Deduct heart only in Challenge or Boss
    if (isChallengeOrBoss) {
      next.hearts = Math.max(0, next.hearts - 1);
    }
  } else {
    // If correct, check if was in error bank and mark progress towards recovery
    if (!question.conceptId && errorBank[question.id]) {
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
  if (question.conceptId) {
    const old = prev.conceptMastery?.[question.conceptId];
    const total = (old?.totalAttempts ?? 0) + 1, correct = (old?.correctAttempts ?? 0) + Number(isCorrect);
    next.conceptMastery = { ...prev.conceptMastery, [question.conceptId]: { ...masteryMap[topicKey], topicKey: question.conceptId, totalAttempts: total, correctAttempts: correct, ...calculateMasteryStatus(correct, total) } };
  }

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
export function applyBossVictory(prev: UserProgressState, battleId: string, today: string, chapter: ChapterId = 1): {
  state: UserProgressState; result: BossVictoryResult;
} {
  const oldLevel = calculateLevel(prev.xp).level;
  if (chapter !== 1) {
    const world = getWorld(chapter);
    const progress = getChapterProgress(prev, chapter) ?? EMPTY_CHAPTER_PROGRESS;
    const duplicate = progress.lastBossRewardBattleId === battleId || progress.rewardedBattleIds?.includes(battleId);
    if (duplicate) return { state: prev, result: { isFirstVictory: false, leveledUp: false, newLevel: oldLevel, xp: 0, coins: 0 } };
    const first = !progress.bossDefeated;
    const xp = first ? world.firstClear.xp : 20, coins = first ? world.firstClear.coins : 10;
    const achievement = prev.achievements[world.achievementId];
    const achievements = first && achievement && !achievement.unlockedAt ? { ...prev.achievements,
      [world.achievementId]: { ...achievement, unlockedAt: today, currentProgress: 1 } } : prev.achievements;
    const next = withChapterProgress({ ...prev, xp: prev.xp + xp, coins: prev.coins + coins, hearts: prev.maxHearts, achievements }, chapter,
      { ...progress, bossDefeated: true, lastBossRewardBattleId: battleId, rewardedBattleIds: [...(progress.rewardedBattleIds ?? []), battleId] });
    const newLevel = calculateLevel(next.xp).level;
    return { state: next, result: { isFirstVictory: first, leveledUp: newLevel > oldLevel, newLevel, xp, coins } };
  }
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
    ...prev, achievements, bossDefeated: true, unlockedUnits: [...new Set([...prev.unlockedUnits, 4])], lastBossRewardBattleId: battleId,
    xp: prev.xp + xp, coins: prev.coins + coins, hearts: prev.maxHearts,
  };
  const newLevel = calculateLevel(next.xp).level;
  return { state: next, result: { isFirstVictory, leveledUp: newLevel > oldLevel, newLevel, xp, coins } };
}
