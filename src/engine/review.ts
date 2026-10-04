/**
 * Pure functions for Smart Review logic.
 * Prioritizes frequently missed questions, recent mistakes, and weak topics.
 */
import { ErrorBankItem, Question, TopicMastery, ChapterId } from '../types';

export function calculateReviewPriority(item: ErrorBankItem, now = Date.now()): number {
  const lastWrongTime = new Date(item.lastWrongAt).getTime();
  const hoursSinceMistake = Math.max(0, (now - lastWrongTime) / (1000 * 60 * 60));

  // Recent mistake bonus: if made within last 24 hours +5, last 48 hours +3, else +1
  let recentMistakeBonus = 1;
  if (hoursSinceMistake <= 24) {
    recentMistakeBonus = 5;
  } else if (hoursSinceMistake <= 48) {
    recentMistakeBonus = 3;
  }

  // If already marked as mastered in a previous review session, lower weight
  const masteredPenalty = item.mastered ? 10 : 0;

  return Math.max(1, item.wrongCount * 2 + recentMistakeBonus - masteredPenalty);
}

/** Alternate a mistake with a fresh item from its topic, retaining its historical ID. */
export function selectAdaptiveReviewQuestions(
  errorBank: Record<string, ErrorBankItem>, allQuestions: Question[], limit = 8,
  mastery: Record<string, TopicMastery> = {}, now = Date.now(),
): Question[] {
  if (limit <= 0) return [];
  const selected: Question[] = [];
  const used = new Set<string>();
  const errors = Object.values(errorBank).sort((a, b) => {
    const priority = (item: ErrorBankItem) => calculateReviewPriority(item, now) +
      (mastery[item.topic] && mastery[item.topic].accuracy < 80 ? 4 : 0);
    return priority(b) - priority(a) || a.questionId.localeCompare(b.questionId);
  });
  for (const item of errors) {
    const original = allQuestions.find(q => q.id === item.questionId);
    const alternatives = allQuestions.filter(q => q.topic === item.topic && q.skill === item.skill &&
      q.id !== item.questionId && q.id !== item.lastReviewQuestionId && !used.has(q.id));
    // Boss cards remain directly eligible; subsequent sessions also test transfer.
    const useOriginal = original && !used.has(original.id) &&
      (item.lastReviewQuestionId && item.lastReviewQuestionId !== original.id ||
       !item.lastReviewQuestionId && (item.source === 'boss' || original.id.startsWith('BOSS-')));
    const rotation = (item.reviewCorrectStreak ?? 0) % Math.max(1, alternatives.length);
    const question = useOriginal ? original : alternatives[rotation] ?? original;
    if (!question || used.has(question.id)) continue;
    selected.push({ ...question, reviewOf: [item.questionId] });
    used.add(question.id);
    if (selected.length === limit) return selected;
  }
  // Fill from weak topics, rotating within them as practice accumulates.
  const fillers = [...allQuestions].sort((a, b) => {
    const weak = (q: Question) => mastery[q.topic]?.accuracy ?? 0;
    return weak(a) - weak(b);
  });
  const offset = Object.values(mastery).reduce((sum, item) => sum + item.totalAttempts, 0) % Math.max(1, fillers.length);
  for (let i = 0; i < fillers.length && selected.length < limit; i++) {
    const question = fillers[(i + offset) % fillers.length];
    if (!used.has(question.id)) {
      selected.push({ ...question });
      used.add(question.id);
    }
  }
  return selected;
}

/** Review Gate always tests all three units, regardless of Error Bank contents. */
export function selectReviewGateQuestions(
  errorBank: Record<string, ErrorBankItem>, questions: Question[], mastery: Record<string, TopicMastery>, chapter: ChapterId = 1,
): Question[] {
  const selected = (chapter === 2 ? [4, 5, 6] : [1, 2, 3]).flatMap((unit, index) => {
    const unitQuestions = questions.filter(q => q.unit === unit);
    const unitErrors = Object.fromEntries(Object.entries(errorBank).filter(([, item]) => item.unit === unit));
    return selectAdaptiveReviewQuestions(unitErrors, unitQuestions, index === 2 ? 2 : 3, mastery);
  });
  if (chapter === 2 && !selected.some(q => q.topic === 'present-simple-vs-continuous')) {
    const contrast = questions.find(q => q.unit === 5 && q.topic === 'present-simple-vs-continuous');
    let slot = -1; selected.forEach((q, index) => { if (q.unit === 5) slot = index; });
    if (contrast && slot >= 0) selected[slot] = { ...contrast };
  }
  return selected;
}

/**
 * Deterministically select up to `limit` questions for a review session.
 */
export function selectReviewQuestions(
  errorBank: Record<string, ErrorBankItem>,
  allQuestions: Question[],
  limit = 8
): Question[] {
  const errorItems = Object.values(errorBank);
  if (errorItems.length === 0) {
    // If error bank is empty, pick a balanced sample of foundational A1 questions
    return allQuestions.slice(0, limit);
  }

  // Sort error items by review priority descending
  const sortedErrors = [...errorItems].sort((a, b) => {
    return calculateReviewPriority(b) - calculateReviewPriority(a);
  });

  const questionMap = new Map<string, Question>();
  allQuestions.forEach(q => questionMap.set(q.id, q));

  const selected: Question[] = [];
  for (const errorItem of sortedErrors) {
    const q = questionMap.get(errorItem.questionId);
    if (q) {
      selected.push(q);
      if (selected.length >= limit) break;
    }
  }

  // If we still need more questions to meet target limit, fill in from general pool
  if (selected.length < limit) {
    const existingIds = new Set(selected.map(q => q.id));
    for (const q of allQuestions) {
      if (!existingIds.has(q.id)) {
        selected.push(q);
        if (selected.length >= limit) break;
      }
    }
  }

  return selected;
}
