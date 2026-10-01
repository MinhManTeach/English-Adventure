import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types';
import { checkAnswer } from '../engine/validator';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { PronounceButton } from '../components/common/PronounceButton';
import { soundService } from '../services/sound';

interface ErrorHunterProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

export const ErrorHunter: React.FC<ErrorHunterProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setWrongAttempts(0);
    setHasAnswered(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleSelect = (option: string) => {
    if (hasAnswered && (isCorrect || wrongAttempts >= 2)) return;

    setSelectedOption(option);
    const correct = checkAnswer(option, question.answer);

    if (correct) {
      setIsCorrect(true);
      setHasAnswered(true);
      soundService.playCorrect();
      onAnswerSubmit(true);
    } else {
      const nextWrong = wrongAttempts + 1;
      setWrongAttempts(nextWrong);
      setIsCorrect(false);
      setHasAnswered(true);
      soundService.playWrong();

      if (nextWrong >= 2) {
        onAnswerSubmit(false);
      }
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  const canTryAgain = hasAnswered && !isCorrect && wrongAttempts < 2;

  const targetAnswerText =
    question.correctSentence ||
    (typeof question.answer === 'string'
      ? question.answer
      : Array.isArray(question.answer)
      ? question.answer[0]
      : '');

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Target sentence with mistake */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-7 border-2 border-amber-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm uppercase tracking-wider">
            <Search className="w-4 h-4 text-amber-600" />
            <span>Error Hunter · Thợ Săn Lỗi Sai</span>
          </div>
          <PronounceButton text={question.question} label="Listen" />
        </div>

        <div className="p-4 rounded-2xl bg-white border border-amber-200 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
          </div>
          <div>
            <p className="text-xs font-bold text-amber-700 uppercase">Sentence has 1 mistake:</p>
            <p className="text-2xl font-black text-slate-800 font-game line-through decoration-rose-500 decoration-3">
              {question.question}
            </p>
          </div>
        </div>

        <p className="text-sm font-bold text-slate-700">
          {question.subPrompt || 'Which is the corrected sentence?'}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedOption === option;
          const isThisOptionCorrect = checkAnswer(option, question.answer);

          let style =
            'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 shadow-xs';

          if (hasAnswered) {
            if (isSelected) {
              if (isCorrect) {
                style =
                  'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
              } else if (canTryAgain) {
                style =
                  'bg-amber-50 border-2 border-amber-400 text-amber-950 ring-2 ring-amber-200';
              } else {
                style =
                  'bg-rose-50 border-2 border-rose-500 text-rose-950 ring-2 ring-rose-300';
              }
            } else if (!canTryAgain && isThisOptionCorrect) {
              style = 'bg-emerald-50/70 border-2 border-emerald-300 text-emerald-900';
            } else if (hasAnswered && !canTryAgain) {
              style = 'bg-slate-50 text-slate-400 border-slate-200 opacity-50';
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={hasAnswered && (isCorrect || !canTryAgain)}
              onClick={() => handleSelect(option)}
              className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between font-bold text-lg sm:text-xl transition-all text-left cursor-pointer ${style} ${
                hasAnswered && (isCorrect || !canTryAgain) ? 'cursor-default' : 'active:scale-[0.99]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </span>
                <span>{option}</span>
              </div>

              {hasAnswered && !canTryAgain && (
                <div>
                  {isThisOptionCorrect ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  ) : isSelected ? (
                    <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {hasAnswered && (
        <FeedbackBanner
          isCorrect={isCorrect}
          explanation={question.explanation}
          audioSentence={targetAnswerText}
          correctAnswerText={!isCorrect && !canTryAgain ? targetAnswerText : undefined}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          canTryAgain={canTryAgain}
        />
      )}
    </div>
  );
};
