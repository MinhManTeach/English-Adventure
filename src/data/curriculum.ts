import { CHAPTER2_QUESTIONS } from './A1/chapter2';
import { CHAPTER3_QUESTIONS } from './A1/chapter3';
import { CHAPTER4_QUESTIONS } from './A1/chapter4';
import { ChapterId, Question } from '../types';
import { getWorld } from './worlds';
import { UNIT_01_QUESTIONS } from './A1/unit01';
import { UNIT_02_QUESTIONS } from './A1/unit02';
import { UNIT_03_QUESTIONS } from './A1/unit03';
import { UNIT_01_EXPANSION, UNIT_02_EXPANSION, UNIT_03_EXPANSION } from './A1/world1Expansion';
import { BOSS_BATTLE_QUESTIONS } from './bossQuestions';
import { prepareSessionQuestions, fisherYatesShuffle } from '../engine/sessionQuestions';

export const ALL_CURRICULUM_QUESTIONS: Question[] = [
  ...UNIT_01_QUESTIONS,
  ...UNIT_02_QUESTIONS,
  ...UNIT_03_QUESTIONS,
  ...UNIT_01_EXPANSION,
  ...UNIT_02_EXPANSION,
  ...UNIT_03_EXPANSION,
  ...CHAPTER2_QUESTIONS,
  ...CHAPTER3_QUESTIONS,
  ...CHAPTER4_QUESTIONS,
];

const toBossQuestions = (questions: Question[], chapter: ChapterId): Question[] =>
  questions.filter(q => q.type !== 'sentence-builder').map(q => ({ ...q, id: `BOSS-C${chapter}-${q.id}`, type: 'multiple-choice' }));
export const CHRONOS_QUESTIONS: Question[] = toBossQuestions(CHAPTER2_QUESTIONS, 2);
export const HOOT_QUESTIONS: Question[] = toBossQuestions(CHAPTER3_QUESTIONS, 3);
export const FOGBEARD_QUESTIONS: Question[] = toBossQuestions(CHAPTER4_QUESTIONS, 4);
/** Authored boss cards for each chapter after the first. */
const CHAPTER_BOSS_QUESTIONS: Partial<Record<ChapterId, Question[]>> = { 2: CHRONOS_QUESTIONS, 3: HOOT_QUESTIONS, 4: FOGBEARD_QUESTIONS };
const ALL_CHAPTER_BOSS_QUESTIONS: Question[] = Object.values(CHAPTER_BOSS_QUESTIONS).flat();

export function getAllQuestions(): Question[] {
  return ALL_CURRICULUM_QUESTIONS;
}

export function getReviewQuestionPool(): Question[] {
  return [...ALL_CURRICULUM_QUESTIONS, ...BOSS_BATTLE_QUESTIONS, ...ALL_CHAPTER_BOSS_QUESTIONS];
}

export function getQuestionsByUnit(unitId: number): Question[] {
  return ALL_CURRICULUM_QUESTIONS.filter(q => q.unit === unitId);
}

export function getQuestionsForStage(
  unitId: number,
  stageId: 'practice' | 'minigame' | 'challenge',
  count = 6
): Question[] {
  const unitQuestions = getQuestionsByUnit(unitId);

  if (unitId >= 4 && stageId === 'minigame') {
    const choices = fisherYatesShuffle(unitQuestions.filter(q => q.options && q.type !== 'error-hunter')).slice(0, Math.max(0, count - 2));
    const builders = fisherYatesShuffle(unitQuestions.filter(q => q.type === 'sentence-builder')).slice(0, 2);
    return prepareSessionQuestions([...choices.map(q => ({ ...q, type: 'time-attack' as const })), ...builders], true);
  }
  let filtered: Question[] = [];

  if (stageId === 'practice') {
    // Practice emphasizes step-by-step multiple choice & fill-gap
    filtered = unitQuestions.filter(q => q.type === 'multiple-choice' || q.type === 'fill-gap');
  } else if (stageId === 'minigame') {
    // Mini-game stage emphasizes sentence builders, matching, error hunter
    filtered = unitQuestions.filter(
      q => q.type === 'sentence-builder' || q.type === 'matching' || q.type === 'error-hunter'
    );
    if (filtered.length === 0) filtered = unitQuestions;
  } else {
    // Challenge stage: mixed comprehensive test
    filtered = unitQuestions;
  }

  if (unitId >= 4 && stageId === 'challenge') {
    const preferred = fisherYatesShuffle(filtered.filter(q => q.difficulty >= 2));
    const builder = preferred.find(q => q.type === 'sentence-builder');
    const gap = preferred.find(q => q.type === 'fill-gap');
    const choice = preferred.find(q => q.type === 'multiple-choice') ?? fisherYatesShuffle(filtered.filter(q => q.type === 'multiple-choice'))[0];
    const anchors = [builder, gap, choice].filter((q): q is Question => !!q);
    const ids = new Set(anchors.map(q => q.id));
    return prepareSessionQuestions([...anchors, ...preferred.filter(q => !ids.has(q.id))].slice(0, count), true);
  }
  // Shuffle subset for variety and apply runtime balanced option placement
  const shuffledSubset = fisherYatesShuffle(filtered).slice(0, Math.min(count, filtered.length));
  return prepareSessionQuestions(shuffledSubset, false);
}

export function getBossQuestions(count = 10, chapter: ChapterId = 1): Question[] {
  if (chapter === 2 && count === 10) {
    const unit4 = fisherYatesShuffle(CHRONOS_QUESTIONS.filter(q => q.unit === 4)).slice(0, 3);
    const contrast = fisherYatesShuffle(CHRONOS_QUESTIONS.filter(q => q.topic === 'present-simple-vs-continuous')).slice(0, 2);
    const unit5 = fisherYatesShuffle(CHRONOS_QUESTIONS.filter(q => q.unit === 5 && q.topic !== 'present-simple-vs-continuous')).slice(0, 2);
    const unit6 = fisherYatesShuffle(CHRONOS_QUESTIONS.filter(q => q.unit === 6)).slice(0, 3);
    return prepareSessionQuestions([...unit4, ...contrast, ...unit5, ...unit6], true);
  }
  const bank = CHAPTER_BOSS_QUESTIONS[chapter] ?? BOSS_BATTLE_QUESTIONS;
  if (chapter !== 1 && count === 10) {
    const picked = getWorld(chapter).bossQuota.flatMap(([unit, size]) => fisherYatesShuffle(bank.filter(q => q.unit === unit)).slice(0, size));
    return prepareSessionQuestions(picked, true);
  }
  const subset = fisherYatesShuffle(bank).slice(0, Math.min(count, bank.length));
  return prepareSessionQuestions(subset, false);
}

export function getQuestionById(id: string): Question | undefined {
  if (id.startsWith('BOSS-')) {
    return [...BOSS_BATTLE_QUESTIONS, ...ALL_CHAPTER_BOSS_QUESTIONS].find(q => q.id === id);
  }
  return ALL_CURRICULUM_QUESTIONS.find(q => q.id === id);
}
