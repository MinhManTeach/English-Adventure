import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  UserProgressState,
  Question,
  UserSettings,
  LessonAttemptLog,
} from '../types';
import { storageService, getTodayDateString } from '../services/storage';
import { calculateLevel, calculateXP, calculateCoins, LevelInfo } from '../engine/scoring';
import { soundService } from '../services/sound';
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
}

interface GameContextType {
  state: UserProgressState;
  levelInfo: LevelInfo;
  currentScreen: AppScreen;
  activeUnitId: number | null;
  activeStageId: 'learn' | 'practice' | 'minigame' | 'challenge' | null;
  navigateTo: (screen: AppScreen, params?: NavigationParams) => void;
  createProfile: (name: string, avatarId: string) => void;
  updateAvatar: (avatarId: string, title?: string) => void;
  recordQuestionResult: (
    question: Question,
    isCorrect: boolean,
    isChallengeOrBoss?: boolean,
    wrongAnswer?: string
  ) => void;
  finishSession: (summary: {
    unitId: number;
    stageId: string;
    totalQuestions: number;
    correctCount: number;
    durationSeconds: number;
  }) => {
    xpEarned: number;
    coinsEarned: number;
    isPerfect: boolean;
    leveledUp: boolean;
    newLevel: number;
    levelTitle: string;
  };
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
    if (params?.unitId !== undefined) {
      setActiveUnitId(params.unitId);
    }
    if (params?.stageId !== undefined) {
      setActiveStageId(params.stageId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    (question: Question, isCorrect: boolean, isChallengeOrBoss = false, wrongAnswer?: string) => {
      const timestamp = new Date().toISOString();
      setState(prev => applyQuestionResult(prev, question, isCorrect, isChallengeOrBoss, timestamp, wrongAnswer, getTodayDateString()));
    }, [setState]
  );

  const finishSession = useCallback(
    (summary: {
      unitId: number;
      stageId: string;
      totalQuestions: number;
      correctCount: number;
      durationSeconds: number;
    }) => {
      const isPerfect = summary.correctCount === summary.totalQuestions && summary.totalQuestions > 0;
      const today = getTodayDateString();

      const baseXp = summary.correctCount * 10;
      const xpEarned = calculateXP({
        baseXP: baseXp,
        isPerfect,
        streakDays: state.streak,
      });

      const coinsEarned = calculateCoins({
        correctCount: summary.correctCount,
        isPerfect,
      });

      const oldLevelInfo = calculateLevel(state.xp);
      let newLevel = oldLevelInfo.level;
      let levelTitle = oldLevelInfo.title;
      let leveledUp = false;

      setState(prev => {
        const next = { ...prev };
        next.xp += xpEarned;
        next.coins += coinsEarned;

        // Mark stage completed
        const stageKey = `unit${summary.unitId}-${summary.stageId}`;
        next.unitStageProgress = {
          ...next.unitStageProgress,
          [stageKey]: true,
        };

        // If this was challenge or all 4 stages are completed, complete unit
        const stages = ['learn', 'practice', 'minigame', 'challenge'];
        const allCompleted = stages.every(s => next.unitStageProgress[`unit${summary.unitId}-${s}`]);

        if (allCompleted || summary.stageId === 'challenge') {
          // Strictly prevent duplicate unit completion rewards
          if (!next.completedUnits.includes(summary.unitId)) {
            next.completedUnits = [...next.completedUnits, summary.unitId];
            next.xp += 50; // One-time Unit completion reward
            next.coins += 25;

            // Unlock next unit
            const nextUnitNum = summary.unitId + 1;
            if (nextUnitNum <= 3 && !next.unlockedUnits.includes(nextUnitNum)) {
              next.unlockedUnits = [...next.unlockedUnits, nextUnitNum];
            }
          }
        }

        // Check if Units 1, 2, and 3 are all completed -> Unlock Boss Battle!
        if (
          next.completedUnits.includes(1) &&
          next.completedUnits.includes(2) &&
          next.completedUnits.includes(3)
        ) {
          next.bossUnlocked = true;
        }

        // Achievements verification (one-time grants only)
        const ach = Object.fromEntries(Object.entries(next.achievements).map(([id, item]) => [id, { ...item }]));
        next.achievements = ach;
        if (ach.first_step && !ach.first_step.unlockedAt) {
          ach.first_step.unlockedAt = today;
          ach.first_step.currentProgress = 1;
          next.xp += ach.first_step.xpReward;
          next.coins += ach.first_step.coinReward;
        }

        if (isPerfect && ach.perfect_round && !ach.perfect_round.unlockedAt) {
          ach.perfect_round.unlockedAt = today;
          ach.perfect_round.currentProgress = 1;
          next.xp += ach.perfect_round.xpReward;
          next.coins += ach.perfect_round.coinReward;
        }

        if (next.completedUnits.includes(1) && ach.grammar_rookie && !ach.grammar_rookie.unlockedAt) {
          ach.grammar_rookie.unlockedAt = today;
          ach.grammar_rookie.currentProgress = 1;
          next.xp += ach.grammar_rookie.xpReward;
          next.coins += ach.grammar_rookie.coinReward;
        }

        if (next.completedUnits.includes(2) && ach.daily_hero && !ach.daily_hero.unlockedAt) {
          ach.daily_hero.unlockedAt = today;
          ach.daily_hero.currentProgress = 1;
          next.xp += ach.daily_hero.xpReward;
          next.coins += ach.daily_hero.coinReward;
        }

        if (next.completedUnits.includes(3) && ach.home_explorer && !ach.home_explorer.unlockedAt) {
          ach.home_explorer.unlockedAt = today;
          ach.home_explorer.currentProgress = 1;
          next.xp += ach.home_explorer.xpReward;
          next.coins += ach.home_explorer.coinReward;
        }

        // Check Level-up against new total XP
        const nextLevelInfo = calculateLevel(next.xp);
        if (nextLevelInfo.level > oldLevelInfo.level) {
          leveledUp = true;
          newLevel = nextLevelInfo.level;
          levelTitle = nextLevelInfo.title;
        }

        // Attempt log
        const logItem: LessonAttemptLog = {
          id: `log-${Date.now()}`,
          unitId: summary.unitId,
          stageId: summary.stageId,
          completedAt: new Date().toISOString(),
          score: summary.correctCount,
          total: summary.totalQuestions,
          xpEarned,
          coinsEarned,
          accuracy: summary.totalQuestions > 0 ? Math.round((summary.correctCount / summary.totalQuestions) * 100) : 100,
          durationSeconds: summary.durationSeconds,
        };
        next.attemptLogs = [logItem, ...next.attemptLogs.slice(0, 49)];

        // Auto refill hearts on normal stage finish
        next.hearts = next.maxHearts;

        return next;
      });

      return {
        xpEarned,
        coinsEarned,
        isPerfect,
        leveledUp,
        newLevel,
        levelTitle,
      };
    },
    [state.streak, state.xp]
  );

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
