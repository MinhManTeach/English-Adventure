import type { LearnCard } from '../learnContent';
import type { SchoolWord } from '../templates/schoolLife';

/** A taught vocabulary word with three authored situations that point to it. */
export type VocabWord = Omit<SchoolWord, 'topic'> & { topic: string };

type Example = readonly [en: string, vi: string, highlight: string];
/** Learn card factory with stable ids like u13-c5-card-1. */
export const cardMaker = (chapter: number) => (unitId: number, n: number, title: string, titleVi: string, ruleEn: string, ruleVi: string,
  examples: readonly Example[], tip?: { en: string; vi: string }): LearnCard => ({
  id: `u${unitId}-c${chapter}-card-${n}`, unitId, title, titleVi, ruleEn, ruleVi,
  examples: examples.map(([en, vi, highlight]) => ({ en, vi, highlight })), ...(tip ? { tip } : {}),
});
