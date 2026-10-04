import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { useQuestionAttempts } from './useQuestionAttempts';
import { checkAnswer } from '../engine/validator';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { PronounceButton } from '../components/common/PronounceButton';
import { soundService } from '../services/sound';

interface PictureMatchProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean, answer?: string) => void;
}

// Icon mapping helper for vocabulary items
const VOCAB_ICONS: Record<string, string> = {
  kitchen: '🍳',
  bedroom: '🛏️',
  bathroom: '🚿',
  'living room': '📺',
  garden: '🌻',
  sofa: '🛋️',
  wardrobe: '🚪',
  bookcase: '📚',
  armchair: '💺',
  curtains: '🪟',
  carpet: '🧶',
  key: '🔑',
  ceiling: '💡',
  flat: '🏢',
  cupboard: '🗄️',
  house: '🏡',
  table: '🪵',
  chair: '🪑',
};

export const PictureMatch: React.FC<PictureMatchProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { wrongAttempts, hasAnswered, isCorrect, canTryAgain, submit, retry } = useQuestionAttempts(question, onAnswerSubmit);

  useEffect(() => {
    setSelectedOption(null);
  }, [question.id]);

  const handleSelect = (option: string) => {
    if (submit(option)) setSelectedOption(option);
  };
  const handleTryAgain = () => {
    if (retry()) setSelectedOption(null);
  };

  const centralIcon =
    question.imageIcon ||
    (typeof question.answer === 'string' ? VOCAB_ICONS[question.answer.toLowerCase()] : '🏡') ||
    '🏡';

  const targetAnswerText =
    typeof question.answer === 'string'
      ? question.answer
      : Array.isArray(question.answer)
      ? question.answer[0]
      : '';

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Central Visual Focus Card */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-200 text-center space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Picture Match · Ghép Từ Với Hình Ảnh
          </span>
          <PronounceButton text={question.audioText || question.question} label="Listen" />
        </div>

        {/* Big Thematic Visual Illustration Icon */}
        <div className="w-28 h-28 mx-auto rounded-3xl bg-white shadow-md border-2 border-amber-200 flex items-center justify-center text-6xl animate-float">
          {centralIcon}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-game">
          {question.question}
        </h3>
      </div>

      {/* Options Cards */}
      <div className="grid grid-cols-2 gap-4">
        {question.options?.map(option => {
          const optionIcon = VOCAB_ICONS[option.toLowerCase()] || '✨';
          const isSelected = selectedOption === option;

          let cardStyle =
            'bg-white text-slate-800 border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 shadow-xs';

          if (hasAnswered) {
            if (isSelected) {
              if (isCorrect) {
                cardStyle =
                  'bg-emerald-50 border-2 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
              } else if (canTryAgain) {
                cardStyle =
                  'bg-amber-50 border-2 border-amber-400 text-amber-900 ring-2 ring-amber-200';
              } else {
                cardStyle =
                  'bg-rose-50 border-2 border-rose-500 text-rose-900 ring-2 ring-rose-300';
              }
            } else if (!canTryAgain && checkAnswer(option, question.answer)) {
              cardStyle = 'bg-emerald-50/80 border-2 border-emerald-400 text-emerald-900';
            } else if (hasAnswered && !canTryAgain) {
              cardStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-50';
            }
          }

          return (
            <button
              key={option}
              type="button"
              disabled={hasAnswered}
              onClick={() => handleSelect(option)}
              className={`p-5 rounded-3xl flex flex-col items-center justify-center gap-2 font-bold text-xl sm:text-2xl transition-all cursor-pointer ${cardStyle} ${
                hasAnswered && (isCorrect || !canTryAgain) ? 'cursor-default' : 'active:scale-95'
              }`}
            >
              <span className="text-4xl">{optionIcon}</span>
              <span className="capitalize">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {hasAnswered && (
        <FeedbackBanner
          isCorrect={isCorrect}
          explanation={question.explanation}
          audioSentence={question.audioText || targetAnswerText}
          correctAnswerText={!isCorrect && !canTryAgain ? targetAnswerText : undefined}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          canTryAgain={canTryAgain}
        />
      )}
    </div>
  );
};
