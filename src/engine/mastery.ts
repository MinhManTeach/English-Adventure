/**
 * Pure functions for topic mastery tracking.
 */
import { TopicMastery } from '../types';

export function calculateMasteryStatus(
  correctAttempts: number,
  totalAttempts: number
): { accuracy: number; status: TopicMastery['status'] } {
  if (totalAttempts === 0) {
    return { accuracy: 0, status: 'NEW' };
  }

  const accuracy = Math.round((correctAttempts / totalAttempts) * 100);

  if (totalAttempts < 3) {
    return { accuracy, status: 'LEARNING' };
  }

  if (accuracy >= 80 && totalAttempts >= 4) {
    return { accuracy, status: 'MASTERED' };
  }

  if (accuracy >= 50) {
    return { accuracy, status: 'PRACTICING' };
  }

  return { accuracy, status: 'LEARNING' };
}
