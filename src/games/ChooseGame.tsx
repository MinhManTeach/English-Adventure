import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { useQuestionAttempts } from './useQuestionAttempts';
import { checkAnswer } from '../engine/validator';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { PronounceButton } from '../components/common/PronounceButton';
import { soundService } from '../services/sound';

interface ChooseGameProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean, answer?: string) => void;
}

export const ChooseGame: React.FC<ChooseGameProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { wrongAttempts, hasAnswered, isCorrect, canTryAgain, submit, retry } = useQuestionAttempts(question, onAnswerSubmit);

  // Reset local state when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleSelect = (option: string) => {
    if (submit(option)) setSelectedOption(option);
  };
  const handleTryAgain = () => {
    if (retry()) setSelectedOption(null);
  };

  // Build audio sentence if question is a sentence
  const completedSentence = question.question.includes('___') && selectedOption
    ? question.question.replace('___', selectedOption)
    : question.audioText || question.question;

  const targetAnswerText =
    typeof question.answer === 'string'
      ? question.answer
      : Array.isArray(question.answer)
      ? question.answer[0]
      : '';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-100 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            {question.subPrompt || 'Choose the correct answer'}
          </span>
          <PronounceButton text={question.audioText || question.question} label="Listen Question" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-snug font-game">
          {question.question}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {question.options?.map((option, index) => {
          const letter = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedOption === option;

          let cardStyle =
            'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-xs';

          if (hasAnswered) {
            if (isSelected) {
              if (isCorrect) {
                cardStyle =
                  'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-emerald-100 ring-2 ring-emerald-300';
              } else if (canTryAgain) {
                // First wrong attempt: subtle warning styling without revealing answer
                cardStyle =
                  'bg-amber-50 border-2 border-amber-400 text-amber-900 ring-2 ring-amber-200';
              } else {
                // Second wrong attempt: red highlight
                cardStyle =
                  'bg-rose-50 border-2 border-rose-500 text-rose-900 shadow-rose-100 ring-2 ring-rose-300';
              }
            } else if (!canTryAgain && checkAnswer(option, question.answer)) {
              // Only reveal the correct answer if player exhausted their attempts
              cardStyle = 'bg-emerald-50/80 border-2 border-emerald-400 text-emerald-900';
            } else if (hasAnswered && !canTryAgain) {
              cardStyle = 'bg-slate-50 text-slate-400 border border-slate-200 opacity-60';
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={hasAnswered}
              onClick={() => handleSelect(option)}
              className={`p-4 sm:p-5 rounded-2xl flex items-center gap-4 text-left font-bold text-lg sm:text-xl transition-all duration-150 cursor-pointer ${cardStyle} ${
                hasAnswered && (isCorrect || !canTryAgain) ? 'cursor-default' : 'active:scale-[0.98]'
              }`}
            >
              <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-extrabold shrink-0 border border-slate-200">
                {letter}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {hasAnswered && (
        <FeedbackBanner
          isCorrect={isCorrect}
          explanation={question.explanation}
          audioSentence={isCorrect ? completedSentence : undefined}
          correctAnswerText={!isCorrect && !canTryAgain ? targetAnswerText : undefined}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          canTryAgain={canTryAgain}
        />
      )}
    </div>
  );
};
