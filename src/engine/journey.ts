import { UserProgressState, ChapterId } from '../types';
import { WORLDS, WorldConfig } from '../data/worlds';
import { getQuestionsByUnit } from '../data/curriculum';
import {
  NodeStatus, getUnitStatus, getReviewGateStatus, canEnterBoss, getChapterProgress, isChapterBossDefeated,
} from './worldProgression';

/** One stop on a world's path: three units, the review gate, then the boss. */
export type PathNode =
  | { kind: 'unit'; chapter: ChapterId; unitId: number; status: NodeStatus }
  | { kind: 'review'; chapter: ChapterId; status: NodeStatus }
  | { kind: 'boss'; chapter: ChapterId; status: NodeStatus };

/** What the big "Continue" button should open. `done` means every world is cleared. */
export type NextStep = PathNode | { kind: 'done'; chapter: ChapterId };

const isFinished = (status: NodeStatus) => status === 'COMPLETED' || status === 'MASTERED';

function reviewGateCompleted(state: UserProgressState, chapter: ChapterId): boolean {
  return chapter === 1 ? !!state.reviewGateCompleted : !!getChapterProgress(state, chapter)?.reviewGateCompleted;
}

function bossStatus(state: UserProgressState, world: WorldConfig): NodeStatus {
  if (isChapterBossDefeated(state, world.chapter)) return 'MASTERED';
  if (!canEnterBoss(state, world.chapter)) return 'LOCKED';
  return state.startedStages?.includes(world.bossStageKey) ? 'IN PROGRESS' : 'AVAILABLE';
}

/** The five stops of one world, in the order the player meets them. */
export function getWorldPath(state: UserProgressState, chapter: ChapterId): PathNode[] {
  const world = WORLDS.find(w => w.chapter === chapter);
  if (!world) return [];
  const units: PathNode[] = world.units.map(unitId => ({
    kind: 'unit', chapter, unitId,
    status: getUnitStatus(state, unitId, [...new Set(getQuestionsByUnit(unitId).map(q => q.topic))]),
  }));
  return [
    ...units,
    { kind: 'review', chapter, status: getReviewGateStatus(state, chapter) },
    { kind: 'boss', chapter, status: bossStatus(state, world) },
  ];
}

/** Share of a world's five stops that are finished, from 0 to 1. */
export function getWorldCompletion(path: readonly PathNode[]): number {
  return path.length ? path.filter(node => isFinished(node.status)).length / path.length : 0;
}

/**
 * The first unfinished stop the player can open right now, scanning worlds in order.
 * It never points at a locked stop: a world whose boss is beaten is skipped,
 * and inside a world units come first, then the review gate, then the boss.
 */
export function getNextStep(state: UserProgressState): NextStep {
  for (const world of WORLDS) {
    if (isChapterBossDefeated(state, world.chapter)) continue;
    const path = getWorldPath(state, world.chapter);
    const unit = path.find(node => node.kind === 'unit' && !isFinished(node.status) && node.status !== 'LOCKED');
    if (unit) return unit;
    const gate = path.find(node => node.kind === 'review')!;
    if (!reviewGateCompleted(state, world.chapter) && gate.status !== 'LOCKED') return gate;
    const boss = path.find(node => node.kind === 'boss')!;
    if (boss.status !== 'LOCKED') return boss;
    // Nothing open in the earliest unbeaten world: fall back to its first unit (always open once the world is).
    return path[0];
  }
  return { kind: 'done', chapter: WORLDS[WORLDS.length - 1].chapter };
}
