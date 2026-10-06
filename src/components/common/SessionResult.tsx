import React from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { PlayerAvatar, PlayerAvatarProps } from '../avatar/PlayerAvatar';
import { Button } from './Button';
import { AnimatedCounter } from './AnimatedCounter';
import { LearningSessionResult } from '../../engine/sessionCompletion';
import { CHALLENGE_PASS_PERCENT } from '../../engine/worldProgression';

export function SessionResult({ profile, cosmetics, summary, correctCount, totalQuestions, stageId, onNext, onRestart }: {
  profile: PlayerAvatarProps['profile']; cosmetics: PlayerAvatarProps['cosmetics']; summary: LearningSessionResult;
  correctCount: number; totalQuestions: number; stageId: string; onNext: () => void; onRestart: () => void;
}) {
  return (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-6 animate-pop">
<div className="flex justify-center"><PlayerAvatar profile={profile} cosmetics={cosmetics} size="medium" /></div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black font-game text-slate-900">
                {!summary.passed ? 'Keep Practicing!' : summary.isPerfect ? 'Perfect Round!' : 'Round Completed!'}
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                You scored {correctCount} out of {totalQuestions} questions correctly.
              </p>
            </div>

            {!summary.passed && (
              <p className="text-sm font-bold text-amber-800">Aim for {CHALLENGE_PASS_PERCENT}% to complete the Challenge. You can do it!</p>
            )}
            {/* Animated Reward Counters */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-xs">
                <span className="text-xs font-bold text-indigo-500 block mb-1">XP Earned</span>
                <div className="text-2xl font-black text-indigo-800">
                  <AnimatedCounter from={0} to={summary.xpEarned} prefix="+" suffix=" XP" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 shadow-xs">
                <span className="text-xs font-bold text-amber-600 block mb-1">Coins Earned</span>
                <div className="text-2xl font-black text-amber-800">
                  <AnimatedCounter from={0} to={summary.coinsEarned} prefix="+" suffix=" 🪙" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                variant="amber"
                size="lg"
                onClick={onNext}
                className="w-full font-black text-slate-900 shadow-amber-600 gap-2"
              >
                <span>{!summary.passed ? 'Try Challenge Again' : stageId === 'challenge' ? 'Finish Unit!' : 'Continue Next Stage'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={onRestart}
                className="w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Again</span>
              </Button>
            </div>
          </div>
  );
}
