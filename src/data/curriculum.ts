import { Question } from '../types';
import { UNIT_01_QUESTIONS } from './A1/unit01';
import { UNIT_02_QUESTIONS } from './A1/unit02';
import { UNIT_03_QUESTIONS } from './A1/unit03';
import { BOSS_BATTLE_QUESTIONS } from './bossQuestions';
import { prepareSessionQuestions, fisherYatesShuffle } from '../engine/sessionQuestions';

export const ALL_CURRICULUM_QUESTIONS: Question[] = [
  ...UNIT_01_QUESTIONS,
  ...UNIT_02_QUESTIONS,
  ...UNIT_03_QUESTIONS,
];

export function getAllQuestions(): Question[] {
  return ALL_CURRICULUM_QUESTIONS;
}

export function getReviewQuestionPool(): Question[] {
  return [...ALL_CURRICULUM_QUESTIONS, ...BOSS_BATTLE_QUESTIONS];
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

  // Shuffle subset for variety and apply runtime balanced option placement
  const shuffledSubset = fisherYatesShuffle(filtered).slice(0, Math.min(count, filtered.length));
  return prepareSessionQuestions(shuffledSubset, false);
}

export function getBossQuestions(count = 10): Question[] {
  const subset = fisherYatesShuffle(BOSS_BATTLE_QUESTIONS).slice(0, Math.min(count, BOSS_BATTLE_QUESTIONS.length));
  return prepareSessionQuestions(subset, false);
}

export function getQuestionById(id: string): Question | undefined {
  if (id.startsWith('BOSS-')) {
    return BOSS_BATTLE_QUESTIONS.find(q => q.id === id);
  }
  return ALL_CURRICULUM_QUESTIONS.find(q => q.id === id);
}
