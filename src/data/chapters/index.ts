/** Chapter 5 onwards (A2 is chapters 15–28): each chapter keeps its pools, templates, authored bank and Learn cards in its own folder. */
import type { Question } from '../../types';
import type { LearnCard } from '../learnContent';
import type { TemplateApi } from '../templates/questionTemplates';
import * as chapter5 from './chapter5';
import * as chapter6 from './chapter6';
import * as chapter7 from './chapter7';
import * as chapter8 from './chapter8';
import * as chapter9 from './chapter9';
import * as chapter10 from './chapter10';
import * as chapter11 from './chapter11';
import * as chapter12 from './chapter12';
import * as chapter13 from './chapter13';
import * as chapter14 from './chapter14';
import * as chapter15 from './chapter15';
import * as chapter16 from './chapter16';
import * as chapter17 from './chapter17';
import * as chapter18 from './chapter18';
import * as chapter19 from './chapter19';
import * as chapter20 from './chapter20';
import * as chapter21 from './chapter21';
import * as chapter22 from './chapter22';
import * as chapter23 from './chapter23';
import * as chapter24 from './chapter24';
import * as chapter25 from './chapter25';
import * as chapter26 from './chapter26';
import * as chapter27 from './chapter27';
import * as chapter28 from './chapter28';

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
  11: chapter11,
  12: chapter12,
  13: chapter13,
  14: chapter14,
  15: chapter15,
  16: chapter16,
  17: chapter17,
  18: chapter18,
  19: chapter19,
  20: chapter20,
  21: chapter21,
  22: chapter22,
  23: chapter23,
  24: chapter24,
  25: chapter25,
  26: chapter26,
  27: chapter27,
  28: chapter28,
};

export const LATER_CHAPTER_QUESTIONS: Question[] = Object.values(LATER_CHAPTERS).flatMap(chapter => chapter.questions);
export const LATER_LEARN_CARDS: Record<number, LearnCard[]> = Object.assign({}, ...Object.values(LATER_CHAPTERS).map(chapter => chapter.learnCards));
export function addLaterChapterTemplates(api: TemplateApi) {
  for (const chapter of Object.values(LATER_CHAPTERS)) chapter.addTemplates(api);
}
