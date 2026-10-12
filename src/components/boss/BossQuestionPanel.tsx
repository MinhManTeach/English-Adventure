import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Question } from '../../types';
import { checkAnswer } from '../../engine/validator';
import { fisherYatesShuffle } from '../../engine/sessionQuestions';
import { BossBattleState } from '../../engine/bossLogic';
import { PronounceButton } from '../common/PronounceButton';
import { Button } from '../common/Button';
import { useGame } from '../../context/GameContext';

interface BossQuestionPanelProps {
  question: Question;
  isActionLocked: boolean;
  comboCount: number;
  wrongAttempts: number;
  resolution: BossBattleState['resolution'];
  onTryAgain: () => void;
  onAnswerResolved: (isCorrect: boolean, answer: string) => boolean;
  onNextQuestion: () => void;
  /** How the boss is named in feedback lines, e.g. "the Dragon" or "Chronos". */
  bossName?: string;
}

export const BossQuestionPanel: React.FC<BossQuestionPanelProps> = ({
  question,
  isActionLocked,
  comboCount,
  wrongAttempts,
  resolution,
  onTryAgain,
  onAnswerResolved,
  onNextQuestion,
  bossName = 'the Dragon',
}) => {
  const { state } = useGame();

  // Selected or typed option
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Sentence builder state
  const [placedWords, setPlacedWords] = useState<{ id: string; text: string }[]>([]);
  const [bankWords, setBankWords] = useState<{ id: string; text: string }[]>([]);

  const hasAnswered = resolution !== 'ready';
  const isCorrect = resolution === 'resolved' && wrongAttempts < 2;

  // Reset when question changes
  useEffect(() => {
    setSelectedOption(null);

    if (question.type === 'sentence-builder') {
      const rawWords =
        question.words ||
        (typeof question.answer === 'string'
          ? question.answer.split(' ')
          : []);
      const items = rawWords.map((word, idx) => ({
        id: `${word}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
        text: word,
      }));
      setBankWords(fisherYatesShuffle(items));
      setPlacedWords([]);
    }
  }, [question.id, question.type, question.words, question.answer]);

  const handleSelectOption = (option: string) => {
    if (isActionLocked || hasAnswered) return;
    if (onAnswerResolved(checkAnswer(option, question.answer), option)) setSelectedOption(option);
  };

  const handleCheckSentence = () => {
    if (placedWords.length === 0 || isActionLocked || hasAnswered) return;
    const answer = placedWords.map(w => w.text).join(' ');
    onAnswerResolved(checkAnswer(answer, question.answer), answer);
  };

  const handleTryAgain = () => {
    if (isActionLocked || resolution !== 'retry') return;
    setSelectedOption(null);
    if (question.type === 'sentence-builder') {
      setBankWords(fisherYatesShuffle([...placedWords, ...bankWords]));
      setPlacedWords([]);
    }
    onTryAgain();
  };

  const canTryAgain = hasAnswered && !isCorrect && wrongAttempts < 2;

  const targetAnswerText =
    question.correctSentence ||
    (typeof question.answer === 'string'
      ? question.answer
      : question.answer[0]);

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-5 text-slate-900 border-2 border-amber-300 shadow-xl space-y-3">
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
            ⚡
          </div>
          <div>
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider block">
              CAST YOUR SPELL · ĐỌC THẦN CHÚ CHIẾN ĐẤU
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {question.subPrompt || `Choose the correct answer to strike ${bossName}!`}
            </span>
          </div>
        </div>

        <PronounceButton
          text={question.audioText || question.question}
          label="Listen"
        />
      </div>

      {/* English Prompt */}
      <div>
        <h3 className="text-lg sm:text-xl font-black text-slate-900 font-game leading-snug">
          {question.question}
        </h3>
      </div>

      {/* --- SENTENCE BUILDER INSIDE BOSS (Requirement 11) --- */}
      {question.type === 'sentence-builder' ? (
        <div className="space-y-2.5">
          {/* YOUR SENTENCE SLOT */}
          <div className="bg-amber-50/40 rounded-2xl p-2.5 border-2 border-dashed border-amber-300 min-h-[50px] flex flex-wrap items-center gap-2">
            {placedWords.length === 0 ? (
              <span className="text-slate-400 text-xs italic px-2">
                Tap words from the Word Bank below to assemble the attack spell...
              </span>
            ) : (
              placedWords.map(item => (
                <button
                  key={item.id}
                  type="button"
                  disabled={isActionLocked || hasAnswered}
                  onClick={() => {
                    setPlacedWords(prev => prev.filter(w => w.id !== item.id));
                    setBankWords(prev => [...prev, item]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xs active:scale-95 cursor-pointer"
                >
                  {item.text}
                </button>
              ))
            )}
          </div>

          {/* WORD BANK */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2 items-center flex-1">
              {bankWords.map(item => (
                <button
                  key={item.id}
                  type="button"
                  disabled={isActionLocked || hasAnswered}
                  onClick={() => {
                    setBankWords(prev => prev.filter(w => w.id !== item.id));
                    setPlacedWords(prev => [...prev, item]);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-xs hover:border-amber-400 hover:bg-amber-50 active:scale-95 cursor-pointer"
                >
                  {item.text}
                </button>
              ))}
            </div>

            {/* CHECK SPELL BUTTON */}
            {!hasAnswered && (
              <Button
                variant="primary"
                size="sm"
                disabled={placedWords.length === 0 || isActionLocked}
                onClick={handleCheckSentence}
                className="gap-1 font-black shrink-0"
              >
                <Check className="w-4 h-4" />
                <span>CHECK SPELL</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* --- MULTIPLE CHOICE / ERROR HUNTER / FILL GAP --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {question.options?.map((option, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedOption === option;

            let cardStyle =
              'bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/60 shadow-xs';

            if (hasAnswered) {
              if (isSelected) {
                if (isCorrect) {
                  cardStyle =
                    'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                } else if (canTryAgain) {
                  cardStyle =
                    'bg-amber-50 border-2 border-amber-400 text-amber-950 ring-2 ring-amber-200';
                } else {
                  cardStyle =
                    'bg-rose-50 border-2 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                }
              } else if (!canTryAgain && checkAnswer(option, question.answer)) {
                cardStyle =
                  'bg-emerald-50/80 border-2 border-emerald-400 text-emerald-950';
              } else if (hasAnswered && !canTryAgain) {
                cardStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={option}
                type="button"
                disabled={isActionLocked || hasAnswered}
                onClick={() => handleSelectOption(option)}
                className={`p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 text-left font-bold text-sm sm:text-base transition-all cursor-pointer ${cardStyle} ${
                  hasAnswered && (isCorrect || !canTryAgain)
                    ? 'cursor-default'
                    : 'active:scale-[0.98]'
                }`}
              >
                <span className="w-7 h-7 rounded-xl bg-white text-slate-800 flex items-center justify-center text-xs font-black shrink-0 border border-slate-300 shadow-xs">
                  {letter}
                </span>
                <span className="flex-1 font-extrabold text-slate-800 leading-snug">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* FEEDBACK & RESOLUTION BAR */}
      {hasAnswered && (
        <div
          className={`rounded-2xl p-3 sm:p-3.5 border transition-all animate-pop flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : canTryAgain
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <div
              className={`p-1.5 rounded-xl shrink-0 ${
                isCorrect
                  ? 'bg-emerald-200 text-emerald-800'
                  : canTryAgain
                  ? 'bg-amber-200 text-amber-800'
                  : 'bg-rose-200 text-rose-800'
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-0.5">
              <span className="font-black text-sm sm:text-base font-game block">
                {isCorrect
                  ? comboCount >= 3
                    ? '⚡ SUPER SPELL! -10 HP'
                    : '✓ PERFECT SPELL! -10 HP'
                  : canTryAgain
                  ? 'Almost! Try again.'
                  : `${bossName[0].toUpperCase()}${bossName.slice(1)} strikes back! (-1 ❤️)`}
              </span>

              {canTryAgain && !isCorrect ? (
                <p className="text-xs font-semibold text-amber-900">
                  Focus your magic! Try one more time before {bossName} counters.
                </p>
              ) : (
                <>
                  {!isCorrect && (
                    <p className="text-xs font-bold text-slate-800">
                      Correct Spell: <span className="text-emerald-700 font-extrabold">{targetAnswerText}</span>
                    </p>
                  )}
                  <p className="text-xs text-slate-700 font-medium">
                    {question.explanation.en}
                  </p>
                  {state.settings.showVietnameseHints && question.explanation.vi && (
                    <p className="text-[11px] text-slate-500 italic">
                      {question.explanation.vi}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="self-end sm:self-center shrink-0">
            {canTryAgain && !isCorrect ? (
              <Button
                variant="amber"
                size="sm"
                onClick={handleTryAgain}
                className="font-black text-slate-900 gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </Button>
            ) : (
              <Button
                variant={isCorrect ? 'success' : 'amber'}
                size="sm"
                disabled={isActionLocked}
                onClick={onNextQuestion}
                className="font-black gap-1"
              >
                <span>Next Spell</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
