import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  UserProgressState,
  Question,
  UserSettings,
} from '../types';
import { storageService, getTodayDateString } from '../services/storage';
import { calculateLevel, LevelInfo } from '../engine/scoring';
import { acknowledgeLevel } from '../engine/levelUp';
import { soundService } from '../services/sound';
import { applySessionCompletion, LearningSessionSummary, LearningSessionResult } from '../engine/sessionCompletion';
import { isUnitAvailable, isStageAvailable, canEnterBoss, isReviewGateAvailable, completeLearnStage, startLearningStage, finishReviewGate, LearningStage } from '../engine/worldProgression';
import { applyQuestionResult, applyBossVictory, BossVictoryResult } from '../engine/progression';

export type AppScreen =
  | 'welcome'
  | 'home'
  | 'map'
  | 'unit'
  | 'learn'
  | 'session'
  | 'boss'
  | 'review'
  | 'achievements'
  | 'avatar'
  | 'progress'
  | 'parent'
  | 'settings';

interface NavigationParams {
  unitId?: number;
  stageId?: 'learn' | 'practice' | 'minigame' | 'challenge';
  reviewGate?: boolean;
}

interface GameContextType {
  state: UserProgressState;
  levelInfo: LevelInfo;
  currentScreen: AppScreen;
  activeUnitId: number | null;
  activeStageId: 'learn' | 'practice' | 'minigame' | 'challenge' | null;
  isReviewGate: boolean;
  acknowledgeLevelUp: (level: number) => void;
  completeLearn: (unitId: number) => void;
  startStage: (unitId: number, stage: LearningStage) => void;
  completeReviewGate: (correct: number, total: number) => void;
  navigateTo: (screen: AppScreen, params?: NavigationParams) => void;
  createProfile: (name: string, avatarId: string) => void;
  updateAvatar: (avatarId: string, title?: string) => void;
  recordQuestionResult: (
    question: Question,
    isCorrect: boolean,
    isChallengeOrBoss?: boolean,
    wrongAnswer?: string,
    source?: 'practice' | 'review' | 'boss'
  ) => void;
  finishSession: (summary: LearningSessionSummary) => LearningSessionResult;
  recordBossVictory: (battleId: string) => BossVictoryResult;
  loseHeart: () => void;
  restoreHearts: () => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetAllProgress: () => void;
  // Dev shortcuts for quick verification
  devUnlockAll: () => void;
  devAddXP: (amount: number) => void;
  devAddCoins: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setReactState] = useState<UserProgressState>(() => storageService.loadState());
  // Resolve updates synchronously outside React updater callbacks. Event handlers
  // always see the latest snapshot, even when React batches multiple events.
  const stateRef = useRef(state);
  const setState = useCallback((update: React.SetStateAction<UserProgressState>) => {
    const next = typeof update === 'function' ? update(stateRef.current) : update;
    if (next === stateRef.current) return;
    stateRef.current = next;
    storageService.saveState(next);
    setReactState(next);
  }, []);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    const loaded = storageService.loadState();
    return loaded.profile.name ? 'home' : 'welcome';
  });
  const [isReviewGate, setIsReviewGate] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState<number | null>(1);
  const [activeStageId, setActiveStageId] = useState<
    'learn' | 'practice' | 'minigame' | 'challenge' | null
  >(null);

  // Sync mute setting to soundService
  useEffect(() => {
    soundService.setMuted(!state.settings.soundEnabled);
  }, [state.settings.soundEnabled]);

  // Track study time (increments every minute if active)
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        totalStudySeconds: prev.totalStudySeconds + 10,
      }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const levelInfo = useMemo(() => calculateLevel(state.xp), [state.xp]);

  const navigateTo = useCallback((screen: AppScreen, params?: NavigationParams) => {
    const snapshot = stateRef.current;
    const unitId = params?.unitId ?? activeUnitId ?? 1;
    if ((screen === 'unit' || screen === 'learn') && !isUnitAvailable(snapshot, unitId)) return;
    if (screen === 'session' && !isStageAvailable(snapshot, unitId, params?.stageId ?? 'practice')) return;
    if (screen === 'boss' && !canEnterBoss(snapshot)) return;
    if (screen === 'review' && params?.reviewGate && !isReviewGateAvailable(snapshot)) return;
    setIsReviewGate(screen === 'review' && !!params?.reviewGate);
    if (params?.unitId !== undefined) {
      setActiveUnitId(params.unitId);
    }
    if (params?.stageId !== undefined) {
      setActiveStageId(params.stageId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeUnitId]);

  const createProfile = useCallback((name: string, avatarId: string) => {
    setState(prev => {
      const today = getTodayDateString();
      const next: UserProgressState = {
        ...prev,
        profile: {
          ...prev.profile,
          name: name.trim() || 'Champion',
          avatarId: avatarId || 'leo',
          joinedAt: today,
        },
      };
      return next;
    });
    setCurrentScreen('home');
  }, []);

  const updateAvatar = useCallback((avatarId: string, title?: string) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatarId,
        title: title || prev.profile.title,
      },
    }));
  }, []);

  const loseHeart = useCallback(() => {
    setState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
    soundService.playWrong();
  }, []);

  const restoreHearts = useCallback(() => {
    setState(prev => ({
      ...prev,
      hearts: prev.maxHearts,
    }));
  }, []);

  const recordQuestionResult = useCallback(
    (question: Question, isCorrect: boolean, isChallengeOrBoss = false, wrongAnswer?: string, source?: 'practice' | 'review' | 'boss') => {
      const timestamp = new Date().toISOString();
      setState(prev => applyQuestionResult(prev, question, isCorrect, isChallengeOrBoss, timestamp, wrongAnswer, getTodayDateString(), source));
    }, [setState]
  );

  const acknowledgeLevelUp = useCallback((level: number) => { setState(prev => acknowledgeLevel(prev, level)); }, [setState]);
  const completeLearn = useCallback((unitId: number) => {
    setState(prev => completeLearnStage(prev, unitId));
  }, [setState]);
  const startStage = useCallback((unitId: number, stage: LearningStage) => {
    setState(prev => startLearningStage(prev, unitId, stage));
  }, [setState]);
  const completeReviewGate = useCallback((correct: number, total: number) => {
    setState(prev => finishReviewGate(prev, correct, total));
  }, [setState]);
  const finishSession = useCallback((summary: LearningSessionSummary) => {
    const transaction = applySessionCompletion(stateRef.current, summary, new Date().toISOString(), getTodayDateString());
    setState(transaction.state);
    return transaction.result;
  }, [setState]);

  const recordBossVictory = useCallback((battleId: string) => {
    const transaction = applyBossVictory(stateRef.current, battleId, getTodayDateString());
    setState(transaction.state);
    return transaction.result;
  }, [setState]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  }, []);

  const resetAllProgress = useCallback(() => {
    const fresh = storageService.resetState();
    setState(fresh);
    setCurrentScreen('welcome');
    setActiveUnitId(1);
    setActiveStageId(null);
  }, []);

  // Developer testing helpers
  const devUnlockAll = useCallback(() => {
    setState(prev => ({
      ...prev,
      unlockedUnits: [1, 2, 3],
      completedUnits: [1, 2, 3],
      bossUnlocked: true,
      reviewGateCompleted: true,
      xp: Math.max(prev.xp, 750),
      coins: Math.max(prev.coins, 120),
    }));
  }, []);

  const devAddXP = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  }, []);

  const devAddCoins = useCallback((amount: number) => {
    setState(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  }, []);

  const value = useMemo(
    () => ({
      state,
      levelInfo,
      currentScreen,
      activeUnitId,
      activeStageId,
      isReviewGate,
      acknowledgeLevelUp,
      completeLearn,
      startStage,
      completeReviewGate,
      navigateTo,
      createProfile,
      updateAvatar,
      recordQuestionResult,
      finishSession,
      recordBossVictory,
      loseHeart,
      restoreHearts,
      updateSettings,
      resetAllProgress,
      devUnlockAll,
      devAddXP,
      devAddCoins,
    }),
    [
      state,
      levelInfo,
      currentScreen,
      activeUnitId,
      activeStageId,
      isReviewGate,
      acknowledgeLevelUp,
      completeLearn,
      startStage,
      completeReviewGate,
      navigateTo,
      createProfile,
      updateAvatar,
      recordQuestionResult,
      finishSession,
      recordBossVictory,
      loseHeart,
      restoreHearts,
      updateSettings,
      resetAllProgress,
      devUnlockAll,
      devAddXP,
      devAddCoins,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
