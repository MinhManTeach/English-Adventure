import type { CosmeticState } from './cosmetics';
export * from './cosmetics';
export type CEFRLevel = 'A1' | 'A2';

export type SkillCategory = 'grammar' | 'vocabulary' | 'listening' | 'speaking';

export type GameQuestionType =
  | 'multiple-choice'
  | 'fill-gap'
  | 'matching'
  | 'sentence-builder'
  | 'listen-choice'
  | 'error-hunter'
  | 'time-attack';

export interface QuestionExplanation {
  en: string;
  vi?: string;
}

export interface Question {
  id: string;
  level: CEFRLevel;
  unit: number;
  skill: SkillCategory;
  topic: string;
  type: GameQuestionType;
  question: string;
  subPrompt?: string; // e.g. "Choose the correct word" or "Find the mistake"
  options?: string[];
  words?: string[]; // for sentence-builder or word bank
  answer: string | string[]; // Single string or array of acceptable answers
  correctSentence?: string; // For error hunter or pronunciation
  explanation: QuestionExplanation;
  difficulty: 1 | 2 | 3;
  xp: number;
  imageIcon?: string; // Icon or emoji or identifier for picture match
  disablePreAnswerAudio?: boolean; // Independent assessment: feedback audio remains available.
  audioText?: string; // Text to speak when listening
  conceptId?: string;
  templateId?: string;
  contextKey?: string; // Semantic cluster, independent of subject, form and task mode.
  contextFamilyKey?: string; // Coarse taught word/activity shared by authored situations.
  subjectKey?: string;
  variantId?: string;
  questionInstanceId?: string;
  reviewOf?: string[]; // Runtime links to historical mistakes being reviewed.
}

export interface UnitStage {
  id: 'learn' | 'practice' | 'minigame' | 'challenge';
  title: string;
  titleVi: string;
  description: string;
  gameType?: GameQuestionType;
  requiredScore?: number;
}

export interface UnitInfo {
  id: number;
  slug: string;
  level: CEFRLevel;
  number: number;
  title: string;
  titleVi: string;
  subtitle: string;
  theme: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  grammarPoints: string[];
  vocabularyCount: number;
  questionsCount: number;
}

export interface UserProfile {
  name: string;
  avatarId: string;
  avatarColor: string;
  title: string;
  joinedAt: string;
}

export interface ErrorBankItem {
  questionId: string;
  unit: number;
  topic: string;
  skill: SkillCategory;
  questionText: string;
  wrongCount: number;
  lastWrongAt: string;
  mastered: boolean;
  source?: 'boss' | 'curriculum' | 'practice' | 'review';
  options?: string[];
  correctAnswer?: string | string[];
  wrongAnswer?: string;
  explanation?: QuestionExplanation;
  questionType?: GameQuestionType;
  reviewCorrectStreak?: number;
  lastReviewedAt?: string;
  lastReviewQuestionId?: string;
  lastAttemptSource?: 'practice' | 'review' | 'boss';
  conceptId?: string;
  originalContextKey?: string;
  lastContextKey?: string;
  lastReviewContextKey?: string;
  originalVariantId?: string;
  recoveryVariantIds?: string[];
  recoveryInstanceIds?: string[];
  lastVariantId?: string;
  lastQuestionText?: string;
  lastReviewWrongAnswer?: string;
}

export interface TopicMastery {
  topicKey: string;
  title: string;
  skill: SkillCategory;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  status: 'NEW' | 'LEARNING' | 'PRACTICING' | 'MASTERED';
  lastPracticed: string;
}

export interface Achievement {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'accuracy' | 'special';
  unlockedAt: string | null;
  xpReward: number;
  coinReward: number;
  maxProgress: number;
  currentProgress: number;
}

export interface LessonAttemptLog {
  id: string;
  unitId: number;
  stageId: string;
  completedAt: string;
  score: number;
  total: number;
  xpEarned: number;
  coinsEarned: number;
  accuracy: number;
  durationSeconds: number;
}

export interface UserSettings {
  soundEnabled: boolean;
  speechEnabled: boolean;
  speechRate: number; // 0.8, 1.0, 1.2
  showVietnameseHints: boolean;
  voiceGender?: 'female' | 'male';
}

export type ChapterId = 1 | 2 | 3;
export interface ChapterProgress {
  reviewGateCompleted: boolean;
  reviewGateAttempts: number;
  reviewGateBestAccuracy: number;
  bossDefeated: boolean;
  lastBossRewardBattleId?: string;
  rewardedBattleIds?: string[];
}
export interface RecentQuestionHistory {
  variantIds: string[];
  templateIds: string[];
  cycleVariantIds: string[];
  contextKeys?: string[];
  lastSessionContextKeys?: string[];
  lastSessionContextFamilyKeys?: string[];
  conceptIds?: string[];
  visibleTaskKeys?: string[];
}
export interface UserProgressState {
  cosmetics?: CosmeticState;
  recentQuestionHistory?: Record<string, RecentQuestionHistory>;
  conceptMastery?: Record<string, TopicMastery>;
  chapter2?: ChapterProgress;
  /** Progress for Chapter 3 onwards, keyed by chapter number. Chapter 2 keeps its original field. */
  chapters?: Record<string, ChapterProgress>;
  version: number;
  profile: UserProfile;
  xp: number;
  coins: number;
  level: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  activeDays: string[]; // List of YYYY-MM-DD dates practiced
  completedUnits: number[]; // e.g. [1, 2]
  unitStageProgress: Record<string, boolean>; // key: "unit1-practice" -> true
  unlockedUnits: number[]; // e.g. [1, 2, 3]
  bossUnlocked: boolean;
  bossDefeated: boolean;
  lastBossRewardBattleId?: string;
  errorBank: Record<string, ErrorBankItem>; // questionId -> ErrorBankItem
  topicMastery: Record<string, TopicMastery>;
  achievements: Record<string, Achievement>;
  attemptLogs: LessonAttemptLog[];
  settings: UserSettings;
  totalStudySeconds: number;
  startedStages?: string[];
  stagePerformance?: Record<string, { attempts: number; bestAccuracy: number }>;
  completedSessionIds?: string[];
  acknowledgedLevel?: number;
  reviewGateCompleted?: boolean;
  reviewGateAttempts?: number;
  reviewGateBestAccuracy?: number;
}
