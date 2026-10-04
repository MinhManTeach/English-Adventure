import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, Sparkles } from 'lucide-react';
import { Question } from '../types';
import { useQuestionAttempts } from './useQuestionAttempts';
import { checkAnswer } from '../engine/validator';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { Button } from '../components/common/Button';
import { fisherYatesShuffle } from '../engine/sessionQuestions';
import { soundService } from '../services/sound';

interface SentenceBuilderProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean, answer?: string) => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  // Available words in WORD BANK
  const [bankWords, setBankWords] = useState<{ id: string; text: string }[]>([]);
  // Words placed into YOUR SENTENCE
  const [placedWords, setPlacedWords] = useState<{ id: string; text: string }[]>([]);

  // Wrong attempts tracking for 2-attempt flow
  const { wrongAttempts, hasAnswered, isCorrect, canTryAgain, submit, retry } = useQuestionAttempts(question, onAnswerSubmit);
  const hasChecked = hasAnswered;

  // Initialize and shuffle words
  useEffect(() => {
    const rawWords =
      question.words ||
      (typeof question.answer === 'string' ? question.answer.split(' ') : []);
    const items = rawWords.map((word, idx) => ({
      id: `${word}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      text: word,
    }));
    // Fisher-Yates shuffle
    const shuffled = fisherYatesShuffle(items);
    setBankWords(shuffled);
    setPlacedWords([]);
  }, [question.id]);

  const handlePickWord = (wordItem: { id: string; text: string }) => {
    if (hasChecked) return;
    soundService.playCoin();
    setBankWords(prev => prev.filter(w => w.id !== wordItem.id));
    setPlacedWords(prev => [...prev, wordItem]);
  };

  const handleReturnWord = (wordItem: { id: string; text: string }) => {
    if (hasChecked) return;
    soundService.playCoin();
    setPlacedWords(prev => prev.filter(w => w.id !== wordItem.id));
    setBankWords(prev => [...prev, wordItem]);
  };

  const handleReset = () => {
    if (hasChecked) return;
    const all = fisherYatesShuffle([...placedWords, ...bankWords]);
    setBankWords(all);
    setPlacedWords([]);
  };

  const handleCheck = () => {
    if (placedWords.length > 0) submit(placedWords.map(w => w.text).join(' '));
  };
  const handleTryAgain = () => { retry(); };

  const currentSentence = placedWords.map(w => w.text).join(' ');
  const targetAnswerText =
    typeof question.answer === 'string'
      ? question.answer
      : Array.isArray(question.answer)
      ? question.answer[0]
      : '';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Prompt Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-amber-100 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider block">
            Sentence Builder · Xếp từ thành câu đúng
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-game">
            {question.question}
          </h3>
        </div>

        {placedWords.length > 0 && !hasChecked && (
          <button
            type="button"
            onClick={handleReset}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-bold shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* ZONE 1: YOUR SENTENCE */}
      <div className="bg-white rounded-3xl p-5 border-2 border-amber-200/90 shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-amber-800">
          <span>YOUR SENTENCE</span>
          <span className="text-slate-400 font-bold normal-case text-[11px]">
            {placedWords.length} words placed
          </span>
        </div>

        <div
          className={`min-h-[72px] sm:min-h-[80px] p-3 rounded-2xl border-2 border-dashed flex flex-wrap items-center gap-2 transition-all ${
            placedWords.length === 0
              ? 'border-amber-200 bg-amber-50/30'
              : hasChecked && isCorrect
              ? 'border-emerald-400 bg-emerald-50/40'
              : hasChecked && !isCorrect && !canTryAgain
              ? 'border-rose-400 bg-rose-50/30'
              : 'border-amber-300 bg-amber-50/50'
          }`}
        >
          {placedWords.length === 0 ? (
            <p className="text-slate-400 font-medium italic text-xs sm:text-sm select-none w-full text-center py-2">
              Tap words from the Word Bank below to construct your sentence
            </p>
          ) : (
            placedWords.map(item => (
              <button
                key={item.id}
                type="button"
                disabled={hasChecked}
                onClick={() => handleReturnWord(item)}
                title="Tap to return word to bank"
                className="px-4 py-2 rounded-2xl bg-amber-500 text-white font-black text-base sm:text-lg shadow-[0_3px_0_0_#d97706] hover:bg-amber-400 active:translate-y-0.5 cursor-pointer animate-pop transition-transform"
              >
                {item.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ZONE 2: WORD BANK */}
      <div className="bg-amber-50/60 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-500">
          <span>WORD BANK</span>
          <span className="text-[11px] font-bold text-slate-400 normal-case">
            {bankWords.length} remaining
          </span>
        </div>

        <div className="min-h-[64px] flex flex-wrap gap-2.5 items-center">
          {bankWords.length === 0 ? (
            <p className="text-slate-400 text-xs italic select-none py-1">
              All words placed into your sentence!
            </p>
          ) : (
            bankWords.map(item => (
              <button
                key={item.id}
                type="button"
                disabled={hasChecked}
                onClick={() => handlePickWord(item)}
                className="px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-base sm:text-lg shadow-[0_3px_0_0_#cbd5e1] hover:border-amber-400 hover:bg-amber-50 active:translate-y-0.5 cursor-pointer transition-all animate-pop"
              >
                {item.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Action / Check Button */}
      {!hasChecked && (
        <div className="flex justify-end pt-1">
          <Button
            type="button"
            variant="primary"
            size="md"
            disabled={placedWords.length === 0}
            onClick={handleCheck}
            className="gap-2 font-black px-6"
          >
            <Check className="w-5 h-5" />
            <span>Check Answer</span>
          </Button>
        </div>
      )}

      {/* Feedback Banner */}
      {hasChecked && (
        <FeedbackBanner
          isCorrect={isCorrect}
          explanation={question.explanation}
          audioSentence={isCorrect ? currentSentence : targetAnswerText}
          correctAnswerText={!isCorrect && !canTryAgain ? targetAnswerText : undefined}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          canTryAgain={canTryAgain}
        />
      )}
    </div>
  );
};
