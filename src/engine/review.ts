/**
 * Pure functions for Smart Review logic.
 * Prioritizes frequently missed questions, recent mistakes, and weak topics.
 */
import { ErrorBankItem, Question } from '../types';

export function calculateReviewPriority(item: ErrorBankItem): number {
  const now = Date.now();
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
