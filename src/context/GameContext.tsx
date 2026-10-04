import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  UserProgressState,
  Question,
  UserSettings,
  ChapterId,
} from '../types';
import { createDefaultState, StorageStatus, storageService, getTodayDateString } from '../services/storage';
import { calculateLevel, LevelInfo } from '../engine/scoring';
import { acknowledgeLevel } from '../engine/levelUp';
import { soundService } from '../services/sound';
import { applySessionCompletion, LearningSessionSummary, LearningSessionResult } from '../engine/sessionCompletion';
import { isUnitAvailable, isStageAvailable, canEnterBoss, isReviewGateAvailable, completeLearnStage, startLearningStage, finishReviewGate, LearningStage } from '../engine/worldProgression';
import { applyQuestionResult, applyBossVictory, BossVictoryResult } from '../engine/progression';

import { buildDynamicSession, buildDynamicReview, buildDynamicBoss, GeneratedSession } from '../engine/dynamicQuestions';
import { StudyStage } from '../data/templates/questionTemplates';
import { SaveWriter, WriterStatus } from '../services/saveWriter';
import { persistBeforePublish, runCosmeticAction, PublicationStatus } from '../services/durableState';
import { purchaseItem as purchase, equipItem as equip, unequipItem as unequip, changeAvatarGender as switchGender, CosmeticTransaction } from '../engine/avatarCosmetics';
import { applyDevShortcut } from '../engine/devShortcuts';
import type { AvatarGender, AvatarSlot, CosmeticResult } from '../types';

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
  chapterId?: ChapterId;
}

interface GameContextType {
  writerStatus: WriterStatus;
  storageStatus: StorageStatus;
  saveStatus: PublicationStatus;
  purchaseItem: (id: string) => CosmeticResult;
  equipItem: (id: string) => CosmeticResult;
  unequipItem: (slot: AvatarSlot) => CosmeticResult;
  changeAvatarGender: (gender: AvatarGender) => CosmeticResult;
  createLearningSession: (unit: number, stage: StudyStage, count?: number) => Question[];
  createReviewSession: (chapter?: ChapterId) => Question[];
  createBossSession: (chapter: ChapterId) => Question[];
  state: UserProgressState;
  levelInfo: LevelInfo;
  currentScreen: AppScreen;
  activeUnitId: number | null;
  activeStageId: 'learn' | 'practice' | 'minigame' | 'challenge' | null;
  isReviewGate: boolean;
  activeChapterId: ChapterId;
  acknowledgeLevelUp: (level: number) => void;
  completeLearn: (unitId: number) => void;
  startStage: (unitId: number, stage: LearningStage) => void;
  completeReviewGate: (correct: number, total: number, chapter?: ChapterId) => void;
  navigateTo: (screen: AppScreen, params?: NavigationParams) => void;
  createProfile: (name: string, avatarId: string) => void;
  updateAvatar: (avatarId: string, title?: string) => boolean;
  recordQuestionResult: (
    question: Question,
    isCorrect: boolean,
    isChallengeOrBoss?: boolean,
    wrongAnswer?: string,
    source?: 'practice' | 'review' | 'boss'
  ) => void;
  finishSession: (summary: LearningSessionSummary) => LearningSessionResult & { persistenceStatus: PublicationStatus };
  recordBossVictory: (battleId: string, chapter?: ChapterId) => BossVictoryResult & { persistenceStatus: PublicationStatus };
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
  const [state, setReactState] = useState<UserProgressState>(() => storageService.loadStateResult().state);
  const stateRef = useRef(state);
  const [writer] = useState(() => new SaveWriter(typeof navigator !== 'undefined' ? navigator.locks : undefined));
  const [writerStatus, setWriterStatus] = useState<WriterStatus>(writer.status);
  const [storageStatus, setStorageStatus] = useState<StorageStatus>(storageService.status);
  const [saveStatus, setSaveStatus] = useState<PublicationStatus>('success');
  const setState = useCallback((update: React.SetStateAction<UserProgressState>): PublicationStatus => {
    if (writer.status !== 'writable') { setSaveStatus('read-only'); return 'read-only'; }
    const next = typeof update === 'function' ? update(stateRef.current) : update;
    if (next === stateRef.current) return 'success';
    const status = persistBeforePublish(next, writer.status, value => storageService.saveState(value), value => {
      stateRef.current = value;
      setReactState(value);
    });
    setSaveStatus(status);
    return status;
  }, [writer]);
  useEffect(() => {
    const unsubscribe = writer.subscribe(setWriterStatus);
    storageService.setWritePermission(() => writer.status === 'writable');
    const refresh = () => {
      // A queued tab must reload the last writer's save before its first mutation.
      const loaded = storageService.loadStateResult();
      setStorageStatus(loaded.status);
      setSaveStatus(loaded.status === 'ready' ? 'success' : 'storage-failed');
      if (loaded.state.profile.name !== stateRef.current.profile.name) {
        setCurrentScreen(loaded.state.profile.name ? 'home' : 'welcome');
      }
      stateRef.current = loaded.state;
      setReactState(loaded.state);
      if (loaded.status === 'ready') setState(storageService.checkAndUpdateStreak(loaded.state));
    };
    let stop = writer.start(refresh);
    const onPageHide = () => stop();
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) stop = writer.start(refresh);
    };
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      stop(); unsubscribe();
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [writer, setState]);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => state.profile.name ? 'home' : 'welcome');
  const runCosmetic = useCallback((reduce: (state: UserProgressState) => CosmeticTransaction): CosmeticResult => {
    return runCosmeticAction(reduce, () => stateRef.current, writer.status,
      storageService.status === 'ready', setState);
  }, [writer, setState]);
  const purchaseItem = useCallback((id: string) => runCosmetic(state => purchase(state, id)), [runCosmetic]);
  const equipItem = useCallback((id: string) => runCosmetic(state => equip(state, id)), [runCosmetic]);
  const unequipItem = useCallback((slot: AvatarSlot) => runCosmetic(state => unequip(state, slot)), [runCosmetic]);
  const changeAvatarGender = useCallback((gender: AvatarGender) => runCosmetic(state => switchGender(state, gender)), [runCosmetic]);
  const [activeChapterId, setActiveChapterId] = useState<ChapterId>(1);
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
  }, [setState]);

  const reserveSession = useCallback((session: GeneratedSession) => {
    setState(prev => ({ ...prev, recentQuestionHistory: session.history }));
    if (import.meta.env.DEV) console.debug('[Dynamic questions]', session.questions.map(({ conceptId, templateId, variantId, contextKey, subjectKey, questionInstanceId }) => ({ conceptId, templateId, variantId, contextKey, subjectKey, questionInstanceId })));
    return session.questions;
  }, [setState]);
  const createLearningSession = useCallback((unit: number, stage: StudyStage, count = 6) => reserveSession(buildDynamicSession(stateRef.current, unit, stage, count)), [reserveSession]);
  const createReviewSession = useCallback((chapter?: ChapterId) => reserveSession(buildDynamicReview(stateRef.current, chapter)), [reserveSession]);
  const createBossSession = useCallback((chapter: ChapterId) => reserveSession(buildDynamicBoss(stateRef.current, chapter)), [reserveSession]);

  const levelInfo = useMemo(() => calculateLevel(state.xp), [state.xp]);

  const navigateTo = useCallback((screen: AppScreen, params?: NavigationParams) => {
    const snapshot = stateRef.current;
    const chapter = params?.chapterId ?? 1;
    const unitId = params?.unitId ?? activeUnitId ?? 1;
    if ((screen === 'unit' || screen === 'learn') && !isUnitAvailable(snapshot, unitId)) return;
    if (screen === 'session' && !isStageAvailable(snapshot, unitId, params?.stageId ?? 'practice')) return;
    if (screen === 'boss' && !canEnterBoss(snapshot, chapter)) return;
    if (screen === 'review' && params?.reviewGate && !isReviewGateAvailable(snapshot, chapter)) return;
    if (screen === 'boss' || screen === 'review') setActiveChapterId(chapter);
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
    const status = setState(prev => {
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
    if (status === 'success') setCurrentScreen('home');
  }, [setState]);

  const updateAvatar = useCallback((avatarId: string, title?: string) => {
    return setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        avatarId,
        title: title || prev.profile.title,
      },
    })) === 'success';
  }, [setState]);

  const loseHeart = useCallback(() => {
    setState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
    soundService.playWrong();
  }, [setState]);

  const restoreHearts = useCallback(() => {
    setState(prev => ({
      ...prev,
      hearts: prev.maxHearts,
    }));
  }, [setState]);

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
  const completeReviewGate = useCallback((correct: number, total: number, chapter: ChapterId = 1) => {
    setState(prev => finishReviewGate(prev, correct, total, chapter));
  }, [setState]);
  const finishSession = useCallback((summary: LearningSessionSummary) => {
    const transaction = applySessionCompletion(stateRef.current, summary, new Date().toISOString(), getTodayDateString());
    const persistenceStatus = setState(transaction.state);
    if (persistenceStatus !== 'success') {
      const level = calculateLevel(stateRef.current.xp);
      return { ...transaction.result, xpEarned: 0, coinsEarned: 0, passed: false, leveledUp: false,
        newLevel: level.level, levelTitle: level.title, persistenceStatus };
    }
    return { ...transaction.result, persistenceStatus };
  }, [setState]);

  const recordBossVictory = useCallback((battleId: string, chapter: ChapterId = 1) => {
    const transaction = applyBossVictory(stateRef.current, battleId, getTodayDateString(), chapter);
    const persistenceStatus = setState(transaction.state);
    return persistenceStatus === 'success' ? { ...transaction.result, persistenceStatus }
      : { isFirstVictory: false, leveledUp: false, newLevel: calculateLevel(stateRef.current.xp).level,
          xp: 0, coins: 0, persistenceStatus };
  }, [setState]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  }, [setState]);

  const resetAllProgress = useCallback(() => {
    const fresh = createDefaultState();
    if (setState(fresh) !== 'success') return;
    setCurrentScreen('welcome');
    setActiveUnitId(1);
    setActiveStageId(null);
  }, [setState]);

  // Defense in depth: production callers cannot bypass the hidden Settings section.
  const devUnlockAll = useCallback(() => { setState(prev => applyDevShortcut(prev, import.meta.env.DEV, 'unlock')); }, [setState]);
  const devAddXP = useCallback((amount: number) => { setState(prev => applyDevShortcut(prev, import.meta.env.DEV, 'xp', amount)); }, [setState]);
  const devAddCoins = useCallback((amount: number) => { setState(prev => applyDevShortcut(prev, import.meta.env.DEV, 'coins', amount)); }, [setState]);

  const value = useMemo(
    () => ({
      writerStatus, storageStatus, saveStatus, purchaseItem, equipItem, unequipItem, changeAvatarGender,
      createLearningSession, createReviewSession, createBossSession,
      state,
      levelInfo,
      currentScreen,
      activeUnitId,
      activeStageId,
      activeChapterId,
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
      writerStatus, storageStatus, saveStatus, purchaseItem, equipItem, unequipItem, changeAvatarGender,
      createLearningSession, createReviewSession, createBossSession,
      state,
      levelInfo,
      currentScreen,
      activeUnitId,
      activeStageId,
      activeChapterId,
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
