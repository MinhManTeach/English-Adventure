import { UserProgressState } from '../types';
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
    achievements: { ...INITIAL_ACHIEVEMENTS },
    attemptLogs: [],
    settings: {
      soundEnabled: true,
      speechEnabled: true,
      speechRate: 0.9,
      showVietnameseHints: true,
      voiceGender: 'female',
    },
    totalStudySeconds: 0,
  };
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

      const parsed = JSON.parse(serialized) as UserProgressState;

      // Schema check & migration if needed
      if (!parsed || typeof parsed !== 'object' || parsed.version !== CURRENT_VERSION) {
        return createDefaultState();
      }

      // Check daily streak on load
      return this.checkAndUpdateStreak(parsed);
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
      const hero = updated.achievements.streak_hero;
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
