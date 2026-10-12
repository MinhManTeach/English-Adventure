import React, { useState, useRef } from 'react';
import { getWorld, getWorldOfUnit } from '../data/worlds';
import { RotateCcw, Target, Sparkles, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { REVIEW_GATE_PASS_PERCENT } from '../engine/worldProgression';
import { Question } from '../types';
import { GameSessionDispatcher } from '../games/GameSessionDispatcher';
import { Button } from '../components/common/Button';
import { soundService } from '../services/sound';

export const SmartReviewScreen: React.FC = () => {
  const { state, recordQuestionResult, navigateTo, isReviewGate, completeReviewGate, activeChapterId, createReviewSession } = useGame();
  const world = getWorld(activeChapterId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const resolvedIndexRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const correctCountRef = useRef(0);
  const reviewSessionIdRef = useRef('');

  const errorItems = Object.values(state.errorBank);
  const pendingErrors = errorItems.filter(item => !item.mastered);
  const masteredErrors = errorItems.filter(item => item.mastered);

  // Group by skill
  const grammarErrors = pendingErrors.filter(e => e.skill === 'grammar').length;
  const vocabErrors = pendingErrors.filter(e => e.skill === 'vocabulary').length;

  const handleStartReview = () => {
    const prepared = createReviewSession(isReviewGate ? activeChapterId : undefined);
    resolvedIndexRef.current = null;
    completedRef.current = false;
    correctCountRef.current = 0;
    reviewSessionIdRef.current = crypto.randomUUID();
    setReviewQuestions(prepared);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setIsPlaying(true);
  };

  const currentQuestion = reviewQuestions[currentIndex];

  const handleAnswerSubmit = (isCorrect: boolean, answer?: string) => {
    if (!currentQuestion || completedRef.current || resolvedIndexRef.current === currentIndex) return;
    resolvedIndexRef.current = currentIndex;
    if (isCorrect) {
      correctCountRef.current += 1;
      setCorrectCount(correctCountRef.current);
    }
    recordQuestionResult(currentQuestion, isCorrect, false, isCorrect ? undefined : answer, 'review');
  };

  const handleNext = () => {
    if (completedRef.current || resolvedIndexRef.current !== currentIndex) return;
    resolvedIndexRef.current = null;
    if (currentIndex + 1 < reviewQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completedRef.current = true;
      if (isReviewGate) completeReviewGate(correctCountRef.current, reviewQuestions.length, activeChapterId);
      setIsCompleted(true);
      soundService.playLevelComplete();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-100">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Adaptive Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
            {isReviewGate ? activeChapterId === 1 ? 'Review Gate' : `Review Gate ${activeChapterId} · ${world.reviewTitle}` : 'Smart Review'}
          </h1>
        </div>

        {isPlaying && (
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className="text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            ← Exit Review
          </button>
        )}
      </div>

      {!isPlaying ? (
        <div className="space-y-6">
          {/* Status Overview Card */}
          <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                🎯
              </div>
              <div>
                <h2 className="text-2xl font-black font-game">
                  {isReviewGate ? world.boss.gateGoal : 'Targeted Weak Spot Recovery'}
                </h2>
                <p className="text-xs text-rose-100">
                  {isReviewGate ? `8 questions from Units ${world.units[0]}–${world.units[2]}. Reach 80% to face ${world.boss.name}.` : 'Practice your weak spots with fresh questions. Recover each mistake with three successful reviews.'}
                </p>
              </div>
            </div>

            {/* Error statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="text-[11px] font-bold text-rose-100 block">Grammar Points</span>
                <span className="text-2xl font-black">{grammarErrors} to review</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
                <span className="text-[11px] font-bold text-rose-100 block">Vocabulary Words</span>
                <span className="text-2xl font-black">{vocabErrors} to review</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-bold text-rose-100 block">Mastered Recoveries</span>
                <span className="text-2xl font-black text-emerald-200">
                  {masteredErrors.length} Fixed
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleStartReview}
                className="w-full sm:w-auto font-black text-slate-900 bg-white hover:bg-amber-50 shadow-md"
              >
                <span>{isReviewGate ? 'START REVIEW GATE' : 'START REVIEW SESSION'}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Active Error Bank List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 font-game">
                Recent Weak Spots in Error Bank
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {pendingErrors.length} recorded
              </span>
            </div>

            {pendingErrors.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border border-emerald-200 text-center space-y-2">
                <span className="text-4xl block">🎉</span>
                <h4 className="text-lg font-bold text-slate-800 font-game">
                  Your Error Bank is Clean!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No active mistakes recorded! Start a review session anyway to refresh key A1 topics.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pendingErrors.slice(0, 6).map(item => (
                  <div
                    key={item.questionId}
                    className="p-4 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-rose-600 uppercase">
                        {item.source === 'boss' || item.questionId.startsWith('BOSS-') ? (getWorldOfUnit(item.unit)?.chapter ?? 1) > 1 ? `Boss ${getWorldOfUnit(item.unit)!.chapter}` : 'Boss' : `Unit ${item.unit}`} · {item.topic}
                      </span>
                      <span className="font-bold text-slate-400">
                        {item.wrongCount}x missed
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 font-game">
                      {item.questionText}
                    </p>
                    <p className="text-xs text-slate-500">Recovery: {Math.min(item.reviewCorrectStreak ?? 0, 3)} / 3 successful reviews</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : !isCompleted ? (
        /* Review in progress */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Review Question {currentIndex + 1} of {reviewQuestions.length}</span>
            <span>Correct so far: {correctCount}</span>
          </div>

          {currentQuestion && (
            <GameSessionDispatcher
              key={reviewSessionIdRef.current}
              question={currentQuestion}
              onNext={handleNext}
              onAnswerSubmit={handleAnswerSubmit}
            />
          )}
        </div>
      ) : (
        /* Review complete */
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-emerald-300 shadow-xl text-center space-y-6 animate-pop">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl shadow-sm">
            ✨
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-black font-game text-slate-900">
              {isReviewGate ? correctCount / reviewQuestions.length * 100 >= REVIEW_GATE_PASS_PERCENT ? 'PASS · Review Gate' : 'Keep Practicing!' : 'Review Complete!'}
            </h2>
            <p className="text-sm font-semibold text-slate-500">
              You scored {correctCount} / {reviewQuestions.length} in this smart review session!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            {isReviewGate ? correctCount / reviewQuestions.length * 100 >= REVIEW_GATE_PASS_PERCENT ? world.boss.gatePass : 'Aim for 80%. Review your mistakes and try again!' : 'Your recovery progress has been saved. Historical mistakes are kept.'}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button variant="amber" size="lg" className="w-full font-black" onClick={() => isReviewGate && correctCount / reviewQuestions.length * 100 < REVIEW_GATE_PASS_PERCENT ? handleStartReview() : navigateTo('map')}>
              {isReviewGate && correctCount / reviewQuestions.length * 100 < REVIEW_GATE_PASS_PERCENT ? 'Retry Review Gate' : 'Continue to Adventure Map'}
            </Button>
            <Button variant="secondary" size="lg" className="w-full" onClick={() => { setIsPlaying(false); setIsCompleted(false); navigateTo('review'); }}>
              Back to Review Hub
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
