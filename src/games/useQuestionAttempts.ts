import { useRef, useState } from 'react';
import { Question } from '../types';
import { checkAnswer } from '../engine/validator';
import { createQuestionAttempt, resolveQuestionAttempt, retryQuestionAttempt } from '../engine/questionAttempts';
import { soundService } from '../services/sound';

/** Mounted per question by the dispatcher. Refs guard same-tick mouse/keyboard events. */
export function useQuestionAttempts(question: Question, onAnswerSubmit: (correct: boolean, answer?: string) => void) {
  const [attempt, setAttempt] = useState(createQuestionAttempt);
  const attemptRef = useRef(attempt);
  const submit = (answer: string): boolean => {
    const previous = attemptRef.current;
    const next = resolveQuestionAttempt(previous, checkAnswer(answer, question.answer));
    if (next === previous) return false;
    attemptRef.current = next;
    setAttempt(next);
    if (next.isCorrect) soundService.playCorrect();
    else soundService.playWrong();
    if (next.status === 'resolved') onAnswerSubmit(next.isCorrect, answer);
    return true;
  };
  const retry = (): boolean => {
    const next = retryQuestionAttempt(attemptRef.current);
    if (next === attemptRef.current) return false;
    attemptRef.current = next;
    setAttempt(next);
    return true;
  };
  return {
    submit, retry, wrongAttempts: attempt.wrongAttempts, isCorrect: attempt.isCorrect,
    hasAnswered: attempt.status !== 'ready', canTryAgain: attempt.status === 'retry',
  };
}
