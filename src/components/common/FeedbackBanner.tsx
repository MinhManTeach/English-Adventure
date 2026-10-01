import React from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from './Button';
import { PronounceButton } from './PronounceButton';
import { QuestionExplanation } from '../../types';
import { useGame } from '../../context/GameContext';

interface FeedbackBannerProps {
  isCorrect: boolean;
  explanation: QuestionExplanation;
  audioSentence?: string;
  correctAnswerText?: string;
  onNext: () => void;
  onTryAgain?: () => void;
  canTryAgain?: boolean;
}

const PRAISES = ['✓ Well done!', '✓ Excellent!', '✓ Great job!', '✓ Amazing!', '✓ You got it!'];

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  isCorrect,
  explanation,
  audioSentence,
  correctAnswerText,
  onNext,
  onTryAgain,
  canTryAgain = false,
}) => {
  const { state } = useGame();

  const title = React.useMemo(() => {
    if (isCorrect) {
      return PRAISES[Math.floor(Math.random() * PRAISES.length)];
    }
    if (canTryAgain) {
      return 'Almost! Try again.';
    }
    return "Let's check the correct answer!";
  }, [isCorrect, canTryAgain]);

  return (
    <div
      role="region"
      aria-live="polite"
      className={`w-full rounded-3xl p-5 border-2 transition-all animate-pop shadow-md ${
        isCorrect
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : canTryAgain
          ? 'bg-amber-50 border-amber-300 text-amber-950'
          : 'bg-rose-50 border-rose-300 text-rose-950'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Feedback content */}
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-2xl shrink-0 ${
              isCorrect
                ? 'bg-emerald-200 text-emerald-800'
                : canTryAgain
                ? 'bg-amber-200 text-amber-800'
                : 'bg-rose-200 text-rose-800'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            ) : (
              <AlertCircle className="w-7 h-7" aria-hidden="true" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-extrabold font-game">{title}</h4>
              {isCorrect && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-800">
                  +10 XP
                </span>
              )}
            </div>

            {/* If first wrong attempt (canTryAgain), provide gentle encouragement without revealing answer */}
            {canTryAgain && !isCorrect ? (
              <p className="text-sm font-medium text-amber-800">
                Not quite! Give it another try before we look at the rule.
              </p>
            ) : (
              <>
                {/* Explicit correct answer reminder if failed second attempt */}
                {!isCorrect && correctAnswerText && (
                  <p className="text-sm font-bold text-slate-800">
                    Correct answer: <span className="text-emerald-700 font-extrabold">{correctAnswerText}</span>
                  </p>
                )}

                {/* English explanation */}
                <p className="text-sm font-medium text-slate-700 leading-snug">
                  {explanation.en}
                </p>

                {/* Vietnamese helper note if enabled */}
                {state.settings.showVietnameseHints && explanation.vi && (
                  <p className="text-xs text-slate-500 italic">
                    {explanation.vi}
                  </p>
                )}

                {/* Audio pronunciation trigger */}
                {audioSentence && (
                  <div className="pt-1">
                    <PronounceButton
                      text={audioSentence}
                      label="Listen to sentence"
                      variant="full"
                      className="bg-white/80 border-slate-200"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-3 self-end md:self-center shrink-0">
          {!isCorrect && canTryAgain && onTryAgain ? (
            <Button
              type="button"
              variant="amber"
              size="md"
              onClick={onTryAgain}
              className="gap-2 font-black text-slate-900"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant={isCorrect ? 'success' : 'amber'}
              size="md"
              onClick={onNext}
              className="gap-2 font-black"
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
