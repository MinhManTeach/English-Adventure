/**
 * Authoritative Boss Battle Invariant Helpers.
 * Guarantees that HP and Phase are always strictly derived and bounded.
 */

export type BossPhase = 1 | 2 | 3;

/**
 * Phase 1: 100–70 HP
 * Phase 2: 60–40 HP
 * Final Phase: 30–1 HP
 * Defeated: 0 HP (Phase 3)
 */
export function getBossPhase(bossHp: number): BossPhase {
  if (bossHp >= 70) return 1;
  if (bossHp >= 40) return 2;
  return 3;
}

/**
 * Safely clamps boss HP between 0 and 100 in exact multiples of 10.
 */
export function clampBossHp(hp: number): number {
  const bounded = Math.max(0, Math.min(100, hp));
  // Round to nearest 10
  return Math.round(bounded / 10) * 10;
}

/**
 * Safely clamps player hearts between 0 and 5.
 */
export function clampHearts(hearts: number, maxHearts = 5): number {
  return Math.max(0, Math.min(maxHearts, hearts));
}
