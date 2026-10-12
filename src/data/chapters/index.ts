/** Chapter 5 onwards: each chapter keeps its pools, templates, authored bank and Learn cards in its own folder. */
import type { Question } from '../../types';
import type { LearnCard } from '../learnContent';
import type { TemplateApi } from '../templates/questionTemplates';
import * as chapter5 from './chapter5';
import * as chapter6 from './chapter6';
import * as chapter7 from './chapter7';
import * as chapter8 from './chapter8';
import * as chapter9 from './chapter9';
import * as chapter10 from './chapter10';

interface ChapterContent {
  questions: Question[];
  learnCards: Record<number, LearnCard[]>;
  addTemplates: (api: TemplateApi) => void;
}

export const LATER_CHAPTERS: Record<number, ChapterContent> = {
  5: chapter5,
  6: chapter6,
  7: chapter7,
  8: chapter8,
  9: chapter9,
  10: chapter10,
};

export const LATER_CHAPTER_QUESTIONS: Question[] = Object.values(LATER_CHAPTERS).flatMap(chapter => chapter.questions);
export const LATER_LEARN_CARDS: Record<number, LearnCard[]> = Object.assign({}, ...Object.values(LATER_CHAPTERS).map(chapter => chapter.learnCards));
export function addLaterChapterTemplates(api: TemplateApi) {
  for (const chapter of Object.values(LATER_CHAPTERS)) chapter.addTemplates(api);
}
