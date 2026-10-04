import { UserProgressState } from '../types';
import { calculateLevel } from '../engine/scoring';
import { INITIAL_ACHIEVEMENTS } from '../data/achievementsData';

const STORAGE_KEY = 'ENGLISH_ADVENTURE_STATE_V1';
const CURRENT_VERSION = 1;

export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createDefaultState(): UserProgressState {
  const today = getTodayDateString();
  return {
    version: CURRENT_VERSION,
    profile: {
      name: '',
      avatarId: 'leo',
      avatarColor: '#F59E0B',
      title: 'Brave Explorer',
      joinedAt: today,
    },
    xp: 0,
    coins: 0,
    level: 1,
    hearts: 5,
    maxHearts: 5,
    streak: 1,
    lastActiveDate: today,
    activeDays: [today],
    completedUnits: [],
    unitStageProgress: {},
    unlockedUnits: [1], // Unit 1 starts unlocked
    bossUnlocked: false,
    bossDefeated: false,
    errorBank: {},
    topicMastery: {
      'verb-to-be': {
        topicKey: 'verb-to-be',
        title: 'Verb "to be" (am / is / are)',
        skill: 'grammar',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        status: 'NEW',
        lastPracticed: today,
      },
      'there-is-there-are': {
        topicKey: 'there-is-there-are',
        title: 'There is / There are',
        skill: 'grammar',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        status: 'NEW',
        lastPracticed: today,
      },
      demonstratives: {
        topicKey: 'demonstratives',
        title: 'This / That / These / Those',
        skill: 'grammar',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        status: 'NEW',
        lastPracticed: today,
      },
      'present-simple': {
        topicKey: 'present-simple',
        title: 'Present Simple Routines',
        skill: 'grammar',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        status: 'NEW',
        lastPracticed: today,
      },
      'home-vocabulary': {
        topicKey: 'home-vocabulary',
        title: 'My Home Vocabulary & Rooms',
        skill: 'vocabulary',
        totalAttempts: 0,
        correctAttempts: 0,
        accuracy: 0,
        status: 'NEW',
        lastPracticed: today,
      },
    },
    achievements: Object.fromEntries(Object.entries(INITIAL_ACHIEVEMENTS).map(([id, item]) => [id, { ...item }])),
    attemptLogs: [],
    settings: {
      soundEnabled: true,
      speechEnabled: true,
      speechRate: 0.9,
      showVietnameseHints: true,
      voiceGender: 'female',
    },
    totalStudySeconds: 0,
    startedStages: [],
    stagePerformance: {},
    completedSessionIds: [],
    acknowledgedLevel: 1,
    reviewGateCompleted: false,
    reviewGateAttempts: 0,
    reviewGateBestAccuracy: 0,
  };
}

/** Additive V1 migration: old completed progress and first-clear flags are retained. */
export function migrateState(value: unknown): UserProgressState {
  const defaults = createDefaultState();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return defaults;
  const old = value as Partial<UserProgressState>;
  const object = <T extends object>(candidate: T | undefined, fallback: T): T =>
    candidate && typeof candidate === 'object' && !Array.isArray(candidate) ? { ...fallback, ...candidate } : fallback;
  const unitList = (candidate: number[] | undefined, fallback: number[]) =>
    Array.isArray(candidate) ? [...new Set(candidate.filter(id => [1, 2, 3].includes(id)))] : fallback;
  const completedUnits = unitList(old.completedUnits, []);
  const unitStageProgress = object(old.unitStageProgress, {});
  // Legacy completion did not always record Learn/Practice/Mini Game. Grandfather it.
  for (const unit of completedUnits) {
    for (const stage of ['learn', 'practice', 'minigame', 'challenge']) unitStageProgress[`unit${unit}-${stage}`] = true;
  }
  for (const unit of [1, 2, 3]) {
    const stages = ['learn', 'practice', 'minigame', 'challenge'];
    for (let index = 1; index < stages.length; index++) {
      if (unitStageProgress[`unit${unit}-${stages[index]}`]) {
        for (const prerequisite of stages.slice(0, index)) unitStageProgress[`unit${unit}-${prerequisite}`] = true;
      }
    }
  }
  const achievements = { ...defaults.achievements };
  if (old.achievements && typeof old.achievements === 'object') {
    for (const [id, achievement] of Object.entries(old.achievements)) {
      if (achievement && typeof achievement === 'object') achievements[id] = { ...defaults.achievements[id], ...achievement };
    }
  }
  const topicMastery = { ...defaults.topicMastery };
  if (old.topicMastery && typeof old.topicMastery === 'object') {
    for (const [topic, mastery] of Object.entries(old.topicMastery)) {
      if (mastery && typeof mastery === 'object') topicMastery[topic] = Object.assign({
        topicKey: topic, title: topic.replace(/-/g, ' '), skill: 'grammar', totalAttempts: 0,
        correctAttempts: 0, accuracy: 0, status: 'NEW', lastPracticed: defaults.lastActiveDate,
      }, defaults.topicMastery[topic], mastery);
    }
  }
  const state: UserProgressState = {
    ...defaults, ...old, version: CURRENT_VERSION, completedUnits, unitStageProgress, achievements, topicMastery,
    profile: object(old.profile, defaults.profile), settings: object(old.settings, defaults.settings),
    errorBank: object(old.errorBank, {}), stagePerformance: object(old.stagePerformance, {}),
    unlockedUnits: [...new Set([1, ...unitList(old.unlockedUnits, [1]), ...completedUnits,
      ...completedUnits.filter(id => id < 3).map(id => id + 1)])],
    activeDays: Array.isArray(old.activeDays) ? [...old.activeDays] : defaults.activeDays,
    attemptLogs: Array.isArray(old.attemptLogs) ? [...old.attemptLogs] : [],
    startedStages: Array.isArray(old.startedStages) ? [...old.startedStages] : [],
    completedSessionIds: Array.isArray(old.completedSessionIds) ? [...old.completedSessionIds] : [],
    reviewGateCompleted: old.reviewGateCompleted ?? !!(old.bossUnlocked || old.bossDefeated),
    reviewGateAttempts: old.reviewGateAttempts ?? 0,
    reviewGateBestAccuracy: old.reviewGateBestAccuracy ?? 0,
  };
  for (const key of ['xp', 'coins', 'hearts', 'maxHearts', 'streak', 'totalStudySeconds'] as const) {
    const value = state[key];
    state[key] = typeof value === 'number' && Number.isFinite(value) ? Math.max(0, value) : defaults[key];
  }
  const currentLevel = calculateLevel(state.xp).level;
  state.acknowledgedLevel = Number.isInteger(old.acknowledgedLevel) && old.acknowledgedLevel! >= 1
    ? Math.min(old.acknowledgedLevel!, currentLevel) : currentLevel;
  state.hearts = Math.min(state.hearts, state.maxHearts);
  return state;
}

class StorageService {
  public loadState(): UserProgressState {
    if (typeof window === 'undefined') {
      return createDefaultState();
    }

    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        return createDefaultState();
      }

      const migrated = migrateState(JSON.parse(serialized));
      return this.checkAndUpdateStreak(migrated);
    } catch {
      return createDefaultState();
    }
  }

  public saveState(state: UserProgressState): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  public resetState(): UserProgressState {
    const fresh = createDefaultState();
    this.saveState(fresh);
    return fresh;
  }

  public checkAndUpdateStreak(state: UserProgressState): UserProgressState {
    const today = getTodayDateString();
    if (state.lastActiveDate === today) {
      // Already recorded for today
      return state;
    }

    const lastDate = new Date(state.lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = state.streak;
    if (diffDays === 1) {
      // Consecutive day!
      newStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken, reset to 1
      newStreak = 1;
    }

    const updatedActiveDays = Array.from(new Set([...state.activeDays, today]));

    const updated: UserProgressState = {
      ...state,
      streak: newStreak,
      lastActiveDate: today,
      activeDays: updatedActiveDays,
    };

    // Check streak hero achievement
    if (updated.achievements.streak_hero) {
      const hero = { ...updated.achievements.streak_hero };
      updated.achievements = { ...updated.achievements, streak_hero: hero };
      hero.currentProgress = Math.min(hero.maxProgress, newStreak);
      if (newStreak >= hero.maxProgress && !hero.unlockedAt) {
        hero.unlockedAt = today;
      }
    }

    this.saveState(updated);
    return updated;
  }
}

export const storageService = new StorageService();
