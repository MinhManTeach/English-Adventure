import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  UserProgressState,
  Question,
  UserSettings,
  ErrorBankItem,
  TopicMastery,
  LessonAttemptLog,
} from '../types';
import { storageService, getTodayDateString } from '../services/storage';
import { calculateLevel, calculateXP, calculateCoins, LevelInfo } from '../engine/scoring';
import { calculateMasteryStatus } from '../engine/mastery';
import { soundService } from '../services/sound';

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
    isChallengeOrBoss?: boolean
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
  recordBossVictory: () => {
    isFirstVictory: boolean;
    leveledUp: boolean;
    newLevel: number;
  };
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
  const [state, setState] = useState<UserProgressState>(() => storageService.loadState());
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

  // Persist state updates
  useEffect(() => {
    storageService.saveState(state);
  }, [state]);

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
      storageService.saveState(next);
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
    (question: Question, isCorrect: boolean, isChallengeOrBoss = false) => {
      const today = getTodayDateString();

      setState(prev => {
        const next = { ...prev };

        // 1. Error Bank management
        const errorBank = { ...next.errorBank };
        if (!isCorrect) {
          const existing = errorBank[question.id];
          const wrongCount = (existing ? existing.wrongCount : 0) + 1;
          const errorItem: ErrorBankItem = {
            questionId: question.id,
            unit: question.unit,
            topic: question.topic,
            skill: question.skill,
            questionText: question.question,
            wrongCount,
            lastWrongAt: today,
            mastered: false,
          };
          errorBank[question.id] = errorItem;

          // Deduct heart only in Challenge or Boss
          if (isChallengeOrBoss) {
            next.hearts = Math.max(0, next.hearts - 1);
          }
        } else {
          // If correct, check if was in error bank and mark progress towards recovery
          if (errorBank[question.id]) {
            errorBank[question.id] = {
              ...errorBank[question.id],
              mastered: true,
            };
          }
        }
        next.errorBank = errorBank;

        // 2. Topic Mastery updates
        const topicKey = question.topic || 'general';
        const masteryMap = { ...next.topicMastery };
        const existingMastery: TopicMastery = masteryMap[topicKey] || {
          topicKey,
          title: question.topic.replace(/-/g, ' ').toUpperCase(),
          skill: question.skill,
          totalAttempts: 0,
          correctAttempts: 0,
          accuracy: 0,
          status: 'NEW',
          lastPracticed: today,
        };

        const totalAttempts = existingMastery.totalAttempts + 1;
        const correctAttempts = existingMastery.correctAttempts + (isCorrect ? 1 : 0);
        const { accuracy, status } = calculateMasteryStatus(correctAttempts, totalAttempts);

        masteryMap[topicKey] = {
          ...existingMastery,
          totalAttempts,
          correctAttempts,
          accuracy,
          status,
          lastPracticed: today,
        };
        next.topicMastery = masteryMap;

        // 3. Vocab Master achievement check
        if (isCorrect && question.skill === 'vocabulary') {
          const vocabAch = next.achievements.vocab_master;
          if (vocabAch && !vocabAch.unlockedAt) {
            vocabAch.currentProgress += 1;
            if (vocabAch.currentProgress >= vocabAch.maxProgress) {
              vocabAch.unlockedAt = today;
              next.xp += vocabAch.xpReward;
              next.coins += vocabAch.coinReward;
            }
          }
        }

        return next;
      });
    },
    []
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
        const ach = next.achievements;
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

  const recordBossVictory = useCallback(() => {
    const today = getTodayDateString();
    let isFirstVictory = false;
    let leveledUp = false;
    let newLevel = 1;

    setState(prev => {
      const next = { ...prev };
      const oldLevelInfo = calculateLevel(prev.xp);

      isFirstVictory = !prev.bossDefeated;
      next.bossDefeated = true;

      if (isFirstVictory) {
        next.xp += 100;
        next.coins += 50;
      } else {
        // Repeat victory gives gentle normal reward
        next.xp += 20;
        next.coins += 10;
      }

      if (next.achievements.boss_slayer && !next.achievements.boss_slayer.unlockedAt) {
        next.achievements.boss_slayer.unlockedAt = today;
        next.achievements.boss_slayer.currentProgress = 1;
        next.xp += next.achievements.boss_slayer.xpReward;
        next.coins += next.achievements.boss_slayer.coinReward;
      }

      const nextLevelInfo = calculateLevel(next.xp);
      if (nextLevelInfo.level > oldLevelInfo.level) {
        leveledUp = true;
        newLevel = nextLevelInfo.level;
      }

      next.hearts = next.maxHearts;
      return next;
    });

    return { isFirstVictory, leveledUp, newLevel };
  }, []);

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
