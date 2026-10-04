import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Heart, Sparkles, Trophy, CheckCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_UNITS } from '../data/unitsMeta';
import { Question } from '../types';
import { GameSessionDispatcher } from '../games/GameSessionDispatcher';
import { Button } from '../components/common/Button';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { LevelUpModal } from '../components/common/LevelUpModal';
import { WorldBackground } from '../components/common/WorldBackground';
import { LearningSessionResult } from '../engine/sessionCompletion';
import { CHALLENGE_PASS_PERCENT } from '../engine/worldProgression';
import { soundService } from '../services/sound';

export const GameSessionScreen: React.FC = () => {
  const { createLearningSession } = useGame();
  const {
    activeUnitId,
    activeStageId,
    navigateTo,
    recordQuestionResult,
    finishSession,
    state,
    startStage,
  } = useGame();

  const unitId = activeUnitId || 1;
  const stageId = (activeStageId === 'learn' ? 'practice' : activeStageId) || 'practice';
  const unit = ALL_UNITS.find(u => u.id === unitId) || ALL_UNITS[0];

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const sessionStartTime = useRef(Date.now());
  const sessionIdRef = useRef(crypto.randomUUID());
  const resolvedIndexRef = useRef<number | null>(null);
  const correctCountRef = useRef(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [sessionSummary, setSessionSummary] = useState<LearningSessionResult | null>(null);

  // Anti-duplication lock
  const hasFinishedRef = useRef(false);
  const levelUpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelLevelUpTimer = () => {
    if (levelUpTimerRef.current !== null) clearTimeout(levelUpTimerRef.current);
    levelUpTimerRef.current = null;
  };
  useEffect(() => () => cancelLevelUpTimer(), []);

  const initializedSessionRef = useRef<string | null>(null);
  useEffect(() => {
    const key = `${unitId}:${stageId}`;
    if (initializedSessionRef.current === key) return;
    initializedSessionRef.current = key;
    cancelLevelUpTimer();
    hasFinishedRef.current = false;
    resolvedIndexRef.current = null;
    correctCountRef.current = 0;
    sessionIdRef.current = crypto.randomUUID();
    sessionStartTime.current = Date.now();
    const loaded = createLearningSession(unitId, stageId as 'practice' | 'minigame' | 'challenge', 6);
    setQuestions(loaded);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setShowLevelUp(false);
    setSessionSummary(null);
  }, [unitId, stageId]);

  const currentQuestion = questions[currentIndex];
  const isChallenge = stageId === 'challenge';

  const handleAnswerSubmit = (isCorrect: boolean, answer?: string) => {
    if (!currentQuestion || hasFinishedRef.current || resolvedIndexRef.current === currentIndex) return;
    resolvedIndexRef.current = currentIndex;
    startStage(unitId, stageId);
    if (isCorrect) correctCountRef.current += 1;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    recordQuestionResult(currentQuestion, isCorrect, isChallenge, isCorrect ? undefined : answer, 'practice');
  };

  const handleNextQuestion = () => {
    if (hasFinishedRef.current || resolvedIndexRef.current !== currentIndex) return;
    resolvedIndexRef.current = null;
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed the session!
      handleSessionComplete();
    }
  };

  const handleSessionComplete = () => {
    // Strictly prevent double-triggering finishSession
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const durationSeconds = Math.round((Date.now() - sessionStartTime.current) / 1000);
    const result = finishSession({
      sessionId: sessionIdRef.current,
      unitId,
      stageId,
      totalQuestions: questions.length,
      correctCount: correctCountRef.current,
      durationSeconds,
    });

    if (result.persistenceStatus !== 'success') {
      hasFinishedRef.current = false;
      return;
    }

    setSessionSummary(result);
    setIsCompleted(true);
    soundService.playLevelComplete();

    if (result.leveledUp) {
      levelUpTimerRef.current = setTimeout(() => setShowLevelUp(true), 400);
    }

    if (result.isPerfect) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleNextStage = () => {
    if (!sessionSummary?.passed) { handleRestart(); return; }
    if (stageId === 'practice') {
      navigateTo('session', { unitId, stageId: 'minigame' });
    } else if (stageId === 'minigame') {
      navigateTo('session', { unitId, stageId: 'challenge' });
    } else {
      // Finished challenge! Back to unit roadmap or map
      navigateTo('unit', { unitId });
    }
  };

  const handleRestart = () => {
    cancelLevelUpTimer();
    hasFinishedRef.current = false;
    resolvedIndexRef.current = null;
    correctCountRef.current = 0;
    sessionIdRef.current = crypto.randomUUID();
    sessionStartTime.current = Date.now();
    const loaded = createLearningSession(unitId, stageId as 'practice' | 'minigame' | 'challenge', 6);
    setQuestions(loaded);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsCompleted(false);
    setShowLevelUp(false);
    setSessionSummary(null);
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <p className="text-slate-600 font-bold">Loading exciting adventure questions...</p>
        <Button variant="secondary" onClick={() => navigateTo('unit', { unitId })}>
          Return to Unit
        </Button>
      </div>
    );
  }

  const stageDisplayNames: Record<string, string> = {
    practice: 'Practice',
    minigame: 'Mini Game',
    challenge: 'Challenge',
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <WorldBackground unitId={unitId} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 w-full space-y-6 flex-1 flex flex-col justify-start">
        {/* Level Up Celebration Modal Overlay */}
        {showLevelUp && sessionSummary && (
          <LevelUpModal
            newLevel={sessionSummary.newLevel}
            levelTitle={sessionSummary.levelTitle}
            onContinue={() => setShowLevelUp(false)}
          />
        )}

        {/* Clear Lesson Header & Progress Bar (Requirement 7) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-amber-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              type="button"
              onClick={() => navigateTo('unit', { unitId })}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit</span>
            </button>

            <div className="text-left">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">
                {stageDisplayNames[stageId] || 'Practice'}
              </span>
              <p className="text-sm font-bold text-slate-800">
                Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}
              </p>
            </div>
          </div>

          {/* Smooth Progress Bar with percentage */}
          <div className="w-full sm:max-w-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>Progress</span>
              <span className="tabular-nums">
                {Math.round(((currentIndex + (isCompleted ? 1 : 0)) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300 shadow-xs"
                style={{
                  width: `${((currentIndex + (isCompleted ? 1 : 0)) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Hearts or Score pill */}
          <div className="shrink-0 flex items-center gap-2">
            {isChallenge ? (
              <div
                title="Hearts remaining"
                className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-50 text-rose-600 font-black text-sm border border-rose-100 shadow-xs"
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span className="tabular-nums">{state.hearts}</span>
              </div>
            ) : (
              <div className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-2xl">
                Score: <span className="text-emerald-600 font-black tabular-nums">{correctCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Play Area */}
        {!isCompleted && currentQuestion && (
          <div className="flex flex-col justify-start">
            <GameSessionDispatcher
              key={sessionIdRef.current}
              question={currentQuestion}
              onNext={handleNextQuestion}
              onAnswerSubmit={handleAnswerSubmit}
            />
          </div>
        )}

        {/* Completed Session Modal / Summary with Animated Counting (Requirement 5) */}
        {isCompleted && sessionSummary && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-6 animate-pop">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-4xl shadow-xs">
              {sessionSummary.isPerfect ? '🌟' : '🎉'}
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-black font-game text-slate-900">
                {!sessionSummary.passed ? 'Keep Practicing!' : sessionSummary.isPerfect ? 'Perfect Round!' : 'Round Completed!'}
              </h2>
              <p className="text-sm font-semibold text-slate-500">
                You scored {correctCount} out of {questions.length} questions correctly.
              </p>
            </div>

            {!sessionSummary.passed && (
              <p className="text-sm font-bold text-amber-800">Aim for {CHALLENGE_PASS_PERCENT}% to complete the Challenge. You can do it!</p>
            )}
            {/* Animated Reward Counters */}
            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 shadow-xs">
                <span className="text-xs font-bold text-indigo-500 block mb-1">XP Earned</span>
                <div className="text-2xl font-black text-indigo-800">
                  <AnimatedCounter from={0} to={sessionSummary.xpEarned} prefix="+" suffix=" XP" />
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 shadow-xs">
                <span className="text-xs font-bold text-amber-600 block mb-1">Coins Earned</span>
                <div className="text-2xl font-black text-amber-800">
                  <AnimatedCounter from={0} to={sessionSummary.coinsEarned} prefix="+" suffix=" 🪙" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                variant="amber"
                size="lg"
                onClick={handleNextStage}
                className="w-full font-black text-slate-900 shadow-amber-600 gap-2"
              >
                <span>{!sessionSummary.passed ? 'Try Challenge Again' : stageId === 'challenge' ? 'Finish Unit!' : 'Continue Next Stage'}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>

              <Button
                variant="secondary"
                size="md"
                onClick={handleRestart}
                className="w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Practice Again</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
