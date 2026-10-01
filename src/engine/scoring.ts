/**
 * Central scoring and progression engine.
 * Pure testable functions.
 */

export interface LevelInfo {
  level: number;
  title: string;
  titleVi: string;
  minXP: number;
  maxXP: number;
  currentLevelXP: number;
  neededLevelXP: number;
  progressPercent: number;
}

const LEVEL_TITLES = [
  { level: 1, en: 'Apprentice Explorer', vi: 'Thực Tập Sinh Thám Hiểm', threshold: 0 },
  { level: 2, en: 'Curious Seeker', vi: 'Người Tìm Kiếm Hiếu Kỳ', threshold: 200 },
  { level: 3, en: 'Grammar Adventurer', vi: 'Hiệp Sĩ Ngữ Pháp', threshold: 500 },
  { level: 4, en: 'Word Scout', vi: 'Trinh Sát Từ Vựng', threshold: 900 },
  { level: 5, en: 'Castle Champion', vi: 'Chiến Binh Lâu Đài', threshold: 1400 },
  { level: 6, en: 'Dragon Knight', vi: 'Kỵ Sĩ Rồng Thần', threshold: 2000 },
  { level: 7, en: 'Master Linguist', vi: 'Đại Sư Ngôn Ngữ', threshold: 2700 },
];

/**
 * Calculate level information from accumulated total XP.
 */
export function calculateLevel(totalXP: number): LevelInfo {
  const safeXP = Math.max(0, totalXP);

  let currentLevel = 1;
  let titleEn = LEVEL_TITLES[0].en;
  let titleVi = LEVEL_TITLES[0].vi;
  let minXP = 0;
  let maxXP = 200;

  for (let i = LEVEL_TITLES.length - 1; i >= 0; i--) {
    if (safeXP >= LEVEL_TITLES[i].threshold) {
      currentLevel = LEVEL_TITLES[i].level;
      titleEn = LEVEL_TITLES[i].en;
      titleVi = LEVEL_TITLES[i].vi;
      minXP = LEVEL_TITLES[i].threshold;

      if (i < LEVEL_TITLES.length - 1) {
        maxXP = LEVEL_TITLES[i + 1].threshold;
      } else {
        // Beyond highest predefined level: step by 800 XP per level
        const extraLevels = Math.floor((safeXP - minXP) / 800);
        currentLevel += extraLevels;
        minXP += extraLevels * 800;
        maxXP = minXP + 800;
      }
      break;
    }
  }

  const currentLevelXP = safeXP - minXP;
  const neededLevelXP = maxXP - minXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXP / neededLevelXP) * 100)));

  return {
    level: currentLevel,
    title: titleEn,
    titleVi,
    minXP,
    maxXP,
    currentLevelXP,
    neededLevelXP,
    progressPercent,
  };
}

/**
 * Calculate XP earned from an action.
 */
export function calculateXP(params: {
  baseXP: number;
  isPerfect?: boolean;
  streakDays?: number;
  isBoss?: boolean;
}): number {
  let earned = params.baseXP;
  if (params.isPerfect) {
    earned += 20; // Perfect round bonus
  }
  if (params.streakDays && params.streakDays >= 3) {
    earned += 5; // Streak dedication bonus
  }
  if (params.isBoss) {
    earned += 100; // Boss defeat bonus
  }
  return earned;
}

/**
 * Calculate virtual coin rewards.
 */
export function calculateCoins(params: {
  correctCount: number;
  isPerfect?: boolean;
  isBoss?: boolean;
}): number {
  let coins = Math.floor(params.correctCount * 2);
  if (params.isPerfect) coins += 10;
  if (params.isBoss) coins += 50;
  return coins;
}
