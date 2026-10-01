import React, { useState, useEffect } from 'react';
import { Check, Keyboard } from 'lucide-react';
import { Question } from '../types';
import { checkAnswer } from '../engine/validator';
import { FeedbackBanner } from '../components/common/FeedbackBanner';
import { PronounceButton } from '../components/common/PronounceButton';
import { Button } from '../components/common/Button';
import { soundService } from '../services/sound';

interface FillGapProps {
  question: Question;
  onNext: () => void;
  onAnswerSubmit: (isCorrect: boolean) => void;
}

export const FillGap: React.FC<FillGapProps> = ({
  question,
  onNext,
  onAnswerSubmit,
}) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [inputMode, setInputMode] = useState<'bank' | 'type'>('bank');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedWord('');
    setTypedInput('');
    setWrongAttempts(0);
    setHasAnswered(false);
    setIsCorrect(false);
  }, [question.id]);

  const handleBankSelect = (word: string) => {
    if (hasAnswered && (isCorrect || wrongAttempts >= 2)) return;
    setSelectedWord(word);
    evaluate(word);
  };

  const handleTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasAnswered && (isCorrect || wrongAttempts >= 2)) return;
    if (!typedInput.trim()) return;
    evaluate(typedInput);
  };

  const evaluate = (answerCandidate: string) => {
    const correct = checkAnswer(answerCandidate, question.answer);

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
    setSelectedWord('');
    setTypedInput('');
    setHasAnswered(false);
  };

  const canTryAgain = hasAnswered && !isCorrect && wrongAttempts < 2;

  // Build sentence preview
  const displaySentence = question.question.replace(
    '___',
    hasAnswered
      ? selectedWord || typedInput || '___'
      : selectedWord || typedInput || '______'
  );

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
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Fill the Gap · Điền từ vào chỗ trống
          </span>
          <div className="flex items-center gap-2">
            <PronounceButton text={question.audioText || question.question} label="Listen" />
            <button
              type="button"
              onClick={() => setInputMode(prev => (prev === 'bank' ? 'type' : 'bank'))}
              title="Switch input mode (Word bank / Keyboard typing)"
              className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Keyboard className="w-4 h-4" />
              <span className="hidden sm:inline">
                {inputMode === 'bank' ? 'Type mode' : 'Choice mode'}
              </span>
            </button>
          </div>
        </div>

        <div className="py-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-relaxed font-game">
            {question.question.split('___').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    className={`inline-block px-4 py-1 mx-1.5 rounded-xl border-b-4 font-black transition-all ${
                      hasAnswered
                        ? isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-500'
                          : canTryAgain
                          ? 'bg-amber-100 text-amber-900 border-amber-500'
                          : 'bg-rose-100 text-rose-800 border-rose-500'
                        : selectedWord || typedInput
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-slate-100 text-slate-400 border-slate-300 min-w-[70px] text-center'
                    }`}
                  >
                    {selectedWord || typedInput || '...'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </h3>
        </div>
      </div>

      {/* Choice Mode (Word Bank) */}
      {inputMode === 'bank' && question.options && (
        <div className="flex flex-wrap items-center justify-center gap-3 p-2">
          {question.options.map(word => {
            const isSelected = selectedWord === word;
            let btnStyle =
              'bg-white text-slate-800 border-2 border-slate-200 shadow-[0_3px_0_0_#cbd5e1] hover:border-amber-400 hover:bg-amber-50';

            if (hasAnswered) {
              if (isSelected) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white shadow-[0_3px_0_0_#059669]';
                } else if (canTryAgain) {
                  btnStyle = 'bg-amber-500 text-white shadow-[0_3px_0_0_#d97706]';
                } else {
                  btnStyle = 'bg-rose-500 text-white shadow-[0_3px_0_0_#e11d48]';
                }
              } else if (!canTryAgain && checkAnswer(word, question.answer)) {
                btnStyle = 'bg-emerald-100 border-2 border-emerald-400 text-emerald-900';
              } else if (hasAnswered && !canTryAgain) {
                btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={word}
                type="button"
                disabled={hasAnswered && (isCorrect || !canTryAgain)}
                onClick={() => handleBankSelect(word)}
                className={`px-6 py-3 rounded-2xl font-bold text-xl transition-all cursor-pointer ${btnStyle} ${
                  hasAnswered && (isCorrect || !canTryAgain)
                    ? 'cursor-default'
                    : 'active:translate-y-0.5'
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {/* Typing Mode */}
      {inputMode === 'type' && (
        <form onSubmit={handleTypeSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={typedInput}
            disabled={hasAnswered && (isCorrect || !canTryAgain)}
            onChange={e => setTypedInput(e.target.value)}
            placeholder="Type your answer here..."
            className="flex-1 px-5 py-3 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none text-xl font-bold bg-white shadow-inner"
            autoFocus
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={(hasAnswered && (isCorrect || !canTryAgain)) || !typedInput.trim()}
          >
            <Check className="w-5 h-5" />
          </Button>
        </form>
      )}

      {/* Feedback Banner */}
      {hasAnswered && (
        <FeedbackBanner
          isCorrect={isCorrect}
          explanation={question.explanation}
          audioSentence={isCorrect ? displaySentence : undefined}
          correctAnswerText={!isCorrect && !canTryAgain ? targetAnswerText : undefined}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          canTryAgain={canTryAgain}
        />
      )}
    </div>
  );
};
