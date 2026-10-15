import { GameQuestionType, Question } from '../../types';
import { levelOfUnit } from '../levels';

export type TeachingRules = Record<string, { en: string; vi: string }>;
/** [question with ___, answer, three wrong options, rule, topic, difficulty] */
export type GapItem<K extends string> = readonly [string, string, readonly [string, string, string], K, string, 1 | 2 | 3];
/** [wrong sentence, correct sentence, two more wrong sentences, rule, topic] */
export type RepairItem<K extends string> = readonly [string, string, readonly [string, string], K, string];
/** [sentence to build, rule, topic] */
export type BuildItem<K extends string> = readonly [string, K, string];

/** Turns compact authored items into a unit bank with stable ids like A1-U07-C3-001. */
export function createBankBuilder<R extends TeachingRules>(rules: R, chapter: number) {
  type K = keyof R & string;
  return (unit: number, gaps: readonly GapItem<K>[], repairs: readonly RepairItem<K>[], builders: readonly BuildItem<K>[]): Question[] => {
    const id = (n: number) => `${levelOfUnit(unit)}-U${String(unit).padStart(2, '0')}-C${chapter}-${String(n).padStart(3, '0')}`;
    const questions: Question[] = [];
    const add = (type: GameQuestionType, fields: Omit<Question, 'id' | 'level' | 'unit' | 'skill' | 'type' | 'xp'>) =>
      questions.push({ id: id(questions.length + 1), level: levelOfUnit(unit), unit, skill: 'grammar', type, xp: 10, ...fields });
    gaps.forEach(([question, answer, wrong, rule, topic, difficulty], index) => {
      const sentence = question.replace('___', answer);
      add(index % 2 === 0 ? 'fill-gap' : 'multiple-choice', { topic, question, options: [answer, ...wrong], answer, difficulty,
        explanation: { en: `${rules[rule].en} ${sentence}`, vi: rules[rule].vi }, audioText: sentence });
    });
    repairs.forEach(([wrongSentence, correct, others, rule, topic]) => add('error-hunter', { topic, question: wrongSentence,
      subPrompt: 'Find the mistake and choose the correct sentence.', options: [correct, wrongSentence, ...others], answer: correct,
      correctSentence: correct, difficulty: 2, explanation: { en: `${rules[rule].en} ${correct}`, vi: rules[rule].vi }, audioText: correct }));
    builders.forEach(([sentence, rule, topic]) => add('sentence-builder', { topic, question: 'Build the sentence.', words: sentence.split(' '),
      answer: sentence, difficulty: 3, explanation: { en: `${rules[rule].en} ${sentence}`, vi: rules[rule].vi }, audioText: sentence }));
    return questions;
  };
}

/** Meaning and translation checks for every taught word of a vocabulary unit. */
export function buildWordBank(unit: number, chapter: number, words: readonly { word: string; topic: string; definition: string; vi: string; icon: string; example: string; exampleVi: string }[]): Question[] {
  const prefix = `${levelOfUnit(unit)}-U${String(unit).padStart(2, '0')}-C${chapter}-`;
  return words.flatMap((word, index) => {
    const sameTopic = words.filter(other => other.topic === word.topic && other !== word);
    const pick = (start: number) => [0, 2, 4].map(step => sameTopic[(index + start + step) % sameTopic.length].word);
    const base = { level: levelOfUnit(unit), unit, skill: 'vocabulary' as const, topic: word.topic, xp: 10, imageIcon: word.icon,
      answer: word.word, explanation: { en: `${word.word}: ${word.definition}. ${word.example}`, vi: `${word.word}: ${word.vi}. ${word.exampleVi}` }, audioText: word.word };
    return [
      { ...base, id: `${prefix}${String(index * 2 + 1).padStart(3, '0')}`, type: 'matching' as const, difficulty: 1 as const,
        question: `Which word or phrase means "${word.definition}"?`, options: [word.word, ...pick(0)] },
      { ...base, id: `${prefix}${String(index * 2 + 2).padStart(3, '0')}`, type: 'multiple-choice' as const, difficulty: 2 as const,
        question: `How do you say "${word.vi}" in English?`, options: [word.word, ...pick(1)] },
    ];
  });
}
