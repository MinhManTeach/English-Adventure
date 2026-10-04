import { Question } from '../types';
import { normalizeAnswerText } from './validator';

/**
 * Robust Fisher-Yates array shuffle.
 */
export function fisherYatesShuffle<T>(array: T[], rng: () => number = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffles the options of a single question such that the correct answer
 * is placed at a specific target index (if provided), or a random index.
 */
export function shuffleQuestionOptions(
  question: Question,
  targetCorrectIndex?: number,
  rng: () => number = Math.random
): Question {
  if (!question.options || question.options.length <= 1) {
    return { ...question };
  }

  const rawOptions = [...question.options];
  const targetAnswer = Array.isArray(question.answer)
    ? question.answer[0]
    : question.answer;

  const normalizedTarget = normalizeAnswerText(targetAnswer);

  // Find which option matches the answer
  const correctOptionIndex = rawOptions.findIndex(
    opt => normalizeAnswerText(opt) === normalizedTarget
  );

  if (correctOptionIndex === -1) {
    // If none matches exactly, simply perform a Fisher-Yates shuffle
    return {
      ...question,
      options: fisherYatesShuffle(rawOptions, rng),
    };
  }

  const correctOption = rawOptions[correctOptionIndex];
  const distractors = rawOptions.filter((_, idx) => idx !== correctOptionIndex);
  const shuffledDistractors = fisherYatesShuffle(distractors, rng);

  // Determine target placement slot
  const numOptions = rawOptions.length;
  let targetIndex: number;
  if (
    typeof targetCorrectIndex === 'number' &&
    targetCorrectIndex >= 0 &&
    targetCorrectIndex < numOptions
  ) {
    targetIndex = targetCorrectIndex;
  } else {
    targetIndex = Math.floor(rng() * numOptions);
  }

  const finalOptions: string[] = [];
  let distractorPointer = 0;
  for (let i = 0; i < numOptions; i++) {
    if (i === targetIndex) {
      finalOptions.push(correctOption);
    } else {
      finalOptions.push(shuffledDistractors[distractorPointer++]);
    }
  }

  return {
    ...question,
    options: finalOptions,
  };
}

/**
 * Prepares a whole session of questions:
 * 1. Shuffles the questions themselves if randomizeQuestions is true.
 * 2. Distributes the correct answer positions across A, B, C, D evenly
 *    to avoid clumping patterns like A A A A B A or A B A B A B.
 */
export function prepareSessionQuestions(
  questions: Question[],
  randomizeQuestions = true,
  rng: () => number = Math.random
): Question[] {
  if (!questions || questions.length === 0) return [];

  // Step 1: Shuffle questions list
  const baseQuestions = randomizeQuestions
    ? fisherYatesShuffle(questions, rng)
    : [...questions];

  // Step 2: Generate balanced target answer positions (0=A, 1=B, 2=C, 3=D)
  // We generate permutations of [0, 1, 2, 3] to guarantee every position appears
  // and no two consecutive questions always share the same position.
  const choiceCount = baseQuestions.filter(q => q.options && q.options.length > 1).length;
  const positionPool: number[] = [];
  while (positionPool.length < choiceCount) {
    const cycle = fisherYatesShuffle([0, 1, 2, 3], rng);
    // Prevent immediate repeat at boundary
    if (
      positionPool.length > 0 &&
      cycle[0] === positionPool[positionPool.length - 1]
    ) {
      // Swap cycle[0] with cycle[1]
      [cycle[0], cycle[1]] = [cycle[1], cycle[0]];
    }
    positionPool.push(...cycle);
  }

  // Step 3: Apply balanced placement to each question
  let choiceIndex = 0;
  return baseQuestions.map(q => {
    if (!q.options || q.options.length <= 1) return { ...q };
    const targetIdx = positionPool[choiceIndex++];
    return shuffleQuestionOptions(q, targetIdx, rng);
  });
}
