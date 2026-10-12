import { UserProgressState } from '../types';
import { LEARN_CARDS_DATA } from '../data/learnContent';

/** XP a child aims for each day; about two practice rounds. */
export const DAILY_XP_GOAL = 50;

const localDay = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** XP earned from lessons finished on `day` (YYYY-MM-DD, local time). */
export function xpEarnedOn(state: UserProgressState, day: string): number {
  return state.attemptLogs
    .filter(log => { const at = new Date(log.completedAt); return !Number.isNaN(at.getTime()) && localDay(at) === day; })
    .reduce((sum, log) => sum + log.xpEarned, 0);
}

/** Monday to Sunday of the week containing `day`, each marked if the child practised that day. */
export function weekActivity(state: UserProgressState, day: string) {
  const [y, m, d] = day.split('-').map(Number);
  const today = new Date(y, m - 1, d);
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const active = new Set(state.activeDays);
  return ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((label, i) => {
    const date = new Date(monday); date.setDate(monday.getDate() + i);
    const key = localDay(date);
    return { label, date: key, active: active.has(key), isToday: key === day };
  });
}

/** One example sentence from the unit's Learn cards, changing each day but stable within a day. */
export function sentenceOfTheDay(unitId: number, day: string) {
  const examples = (LEARN_CARDS_DATA[unitId] ?? LEARN_CARDS_DATA[1]).flatMap(card => card.examples);
  const seed = [...day].reduce((sum, ch) => sum * 31 + ch.charCodeAt(0), 7) >>> 0;
  return examples[seed % examples.length];
}
