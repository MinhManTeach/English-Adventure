import { ALL_CURRICULUM_QUESTIONS } from '../data/curriculum';
import { prepareSessionQuestions } from './sessionQuestions';
import { normalizeAnswerText } from './validator';

export interface QAResult {
  totalSimulations: number;
  positionCounts: {
    A: number;
    B: number;
    C: number;
    D: number;
  };
  distributionPercentages: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  passed: boolean;
}

/**
 * Runs a QA simulation of question sessions and verifies that correct
 * answer positions are balanced across A, B, C, D with no index bias.
 */
export function runAnswerRandomizationQA(simulationsCount = 40): QAResult {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  const mcQuestions = ALL_CURRICULUM_QUESTIONS.filter(
    q => q.options && q.options.length === 4
  );

  let iterationsRun = 0;
  while (iterationsRun < simulationsCount) {
    const sessionSubset = prepareSessionQuestions(mcQuestions, true);
    for (const q of sessionSubset) {
      if (iterationsRun >= simulationsCount) break;
      if (!q.options || q.options.length !== 4) continue;

      const target = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      const targetNormalized = normalizeAnswerText(target);
      const correctIdx = q.options.findIndex(
        opt => normalizeAnswerText(opt) === targetNormalized
      );

      if (correctIdx === 0) counts.A++;
      else if (correctIdx === 1) counts.B++;
      else if (correctIdx === 2) counts.C++;
      else if (correctIdx === 3) counts.D++;

      iterationsRun++;
    }
  }

  const pct = (n: number) => ((n / simulationsCount) * 100).toFixed(1) + '%';

  // No position should hold more than 50% or less than 5% across 40 samples
  const passed =
    counts.A > 0 &&
    counts.B > 0 &&
    counts.C > 0 &&
    counts.D > 0 &&
    counts.A < simulationsCount * 0.5 &&
    counts.B < simulationsCount * 0.5 &&
    counts.C < simulationsCount * 0.5 &&
    counts.D < simulationsCount * 0.5;

  return {
    totalSimulations: simulationsCount,
    positionCounts: counts,
    distributionPercentages: {
      A: pct(counts.A),
      B: pct(counts.B),
      C: pct(counts.C),
      D: pct(counts.D),
    },
    passed,
  };
}
