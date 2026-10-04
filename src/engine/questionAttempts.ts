export interface QuestionAttemptState {
  wrongAttempts: number;
  status: 'ready' | 'retry' | 'resolved';
  isCorrect: boolean;
}
export const createQuestionAttempt = (): QuestionAttemptState => ({ wrongAttempts: 0, status: 'ready', isCorrect: false });

export function resolveQuestionAttempt(state: QuestionAttemptState, correct: boolean): QuestionAttemptState {
  if (state.status !== 'ready') return state;
  if (correct) return { ...state, status: 'resolved', isCorrect: true };
  const wrongAttempts = state.wrongAttempts + 1;
  return { wrongAttempts, status: wrongAttempts === 2 ? 'resolved' : 'retry', isCorrect: false };
}
export function retryQuestionAttempt(state: QuestionAttemptState): QuestionAttemptState {
  return state.status === 'retry' ? { ...state, status: 'ready' } : state;
}
