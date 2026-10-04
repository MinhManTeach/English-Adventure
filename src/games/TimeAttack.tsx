import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../types';
import { useQuestionAttempts } from './useQuestionAttempts';
import { startAttemptTimer } from '../engine/attemptTimer';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { PronounceButton } from '../components/common/PronounceButton';

interface Props { question: Question; onNext: () => void; onAnswerSubmit: (correct: boolean, answer?: string) => void; seconds?: number; }
export const TimeAttack: React.FC<Props> = ({ question, onNext, onAnswerSubmit, seconds = 10 }) => {
  const attempts = useQuestionAttempts(question, onAnswerSubmit);
  const [remaining, setRemaining] = useState(seconds);
  const [selected, setSelected] = useState<string | null>(null);
  const stopRef = useRef<() => void>(() => {});
  const submitRef = useRef(attempts.submit);
  submitRef.current = attempts.submit;
  useEffect(() => {
    if (attempts.hasAnswered) return;
    const duration = Math.max(1, seconds) * 1000;
    const deadline = performance.now() + duration;
    setRemaining(seconds);
    const stop = startAttemptTimer(() => { setRemaining(0); setSelected('Time ran out'); submitRef.current('Time ran out'); }, duration);
    stopRef.current = stop;
    const tick = setInterval(() => setRemaining(Math.max(0, Math.ceil((deadline - performance.now()) / 1000))), 200);
    return () => { stop(); clearInterval(tick); };
  }, [question.id, attempts.hasAnswered, seconds]);
  const answer = Array.isArray(question.answer) ? question.answer[0] : question.answer;
  return <div className="mx-auto w-full max-w-3xl space-y-4">
    <div className="rounded-3xl border-2 border-sky-200 bg-white p-5 sm:p-7 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black text-sky-900">⚡ Quick Choice · Time Attack</h2>
        <span role="timer" aria-label="Seconds remaining" className="shrink-0 rounded-xl bg-sky-100 px-3 py-2 font-black text-sky-900">{remaining}s</span>
      </div>
      <p className="text-sm text-slate-600">Choose before time runs out. You can retry your first mistake.</p><p aria-live="polite" className="text-sm font-bold text-amber-800">{remaining === 0 ? "Time ran out. Take a breath and try again!" : ""}</p>
      <div role="progressbar" aria-label="Time remaining" aria-valuemin={0} aria-valuemax={seconds} aria-valuenow={remaining} className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-sky-500 transition-[width] motion-reduce:transition-none" style={{ width: `${remaining / Math.max(1, seconds) * 100}%` }} />
      </div>
      <div className="flex items-center justify-between gap-3"><p className="text-xl sm:text-2xl font-black text-slate-900">{question.question}</p><PronounceButton disabled={question.disablePreAnswerAudio} text={question.audioText || question.question} label="Listen" /></div>
      {question.subPrompt && <p className="text-base text-slate-600">{question.subPrompt}</p>}
    </div>
    <div className="grid sm:grid-cols-2 gap-3">
      {question.options?.map(option => <button key={option} type="button" disabled={attempts.hasAnswered} onClick={() => {
        stopRef.current(); if (attempts.submit(option)) setSelected(option);
      }} className={`min-h-16 rounded-2xl border-2 p-4 text-left text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${selected === option ? 'border-sky-600 bg-sky-50' : 'border-slate-200 bg-white hover:border-sky-500'}`}>
        {option}{selected === option && <span className="ml-2">{attempts.isCorrect ? '✓' : '↻'}</span>}
      </button>)}
    </div>
    {attempts.hasAnswered && <FeedbackBanner isCorrect={attempts.isCorrect} explanation={question.explanation} correctAnswerText={answer}
      audioSentence={question.audioText || question.question.replace('___', answer)} onNext={onNext} canTryAgain={attempts.canTryAgain}
      onTryAgain={() => { if (attempts.retry()) setSelected(null); }} />}
  </div>;
};
