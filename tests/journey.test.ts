import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState } from '../src/services/storage';
import { completeLearnStage, finishReviewGate } from '../src/engine/worldProgression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { applyBossVictory } from '../src/engine/progression';
import { getNextStep, getWorldPath, getWorldCompletion } from '../src/engine/journey';
import { WORLDS } from '../src/data/worlds';
import { UserProgressState } from '../src/types';

const day = '2026-10-12';
let session = 0;
function completeUnit(state: UserProgressState, unitId: number) {
  state = completeLearnStage(state, unitId);
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) state = applySessionCompletion(state, { sessionId: `journey-${++session}`, unitId, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, day, day).state;
  return state;
}

test('a new player is sent to Unit 1 and sees one open stop on the first path', () => {
  const state = createDefaultState();
  assert.deepEqual(getNextStep(state), { kind: 'unit', chapter: 1, unitId: 1, status: 'AVAILABLE' });
  const path = getWorldPath(state, 1);
  assert.deepEqual(path.map(n => n.kind), ['unit', 'unit', 'unit', 'review', 'boss']);
  assert.deepEqual(path.map(n => n.status), ['AVAILABLE', 'LOCKED', 'LOCKED', 'LOCKED', 'LOCKED']);
  assert.equal(getWorldCompletion(path), 0);
});

test('Continue walks units, then the review gate, then the boss, then the next world', () => {
  let state = createDefaultState();
  state = completeUnit(state, 1);
  assert.equal((getNextStep(state) as { unitId: number }).unitId, 2);
  state = completeUnit(completeUnit(state, 2), 3);
  assert.equal(getNextStep(state).kind, 'review');
  state = finishReviewGate(state, 8, 8, 1);
  assert.deepEqual(getNextStep(state), { kind: 'boss', chapter: 1, status: 'AVAILABLE' });
  state = applyBossVictory(state, 'boss1', day).state;
  assert.deepEqual(getNextStep(state), { kind: 'unit', chapter: 2, unitId: 4, status: 'AVAILABLE' });
  assert.equal(getWorldCompletion(getWorldPath(state, 1)), 1);
});

test('Continue never points at a locked stop, even with odd saves', () => {
  // Units of a later world completed while World 1 is unfinished must not skip ahead.
  const state = { ...createDefaultState(), completedUnits: [1, 7, 8] };
  const step = getNextStep(state);
  assert.equal(step.kind, 'unit'); assert.equal((step as { unitId: number }).unitId, 2);
  assert.notEqual((step as { status: string }).status, 'LOCKED');
});

test('a player who beat every boss is told the journey is done', () => {
  const chapters = Object.fromEntries(WORLDS.filter(w => w.chapter > 2).map(w => [w.chapter, { reviewGateCompleted: true, reviewGateAttempts: 1, reviewGateBestAccuracy: 100, bossDefeated: true }]));
  const state = { ...createDefaultState(), bossDefeated: true, chapter2: { reviewGateCompleted: true, reviewGateAttempts: 1, reviewGateBestAccuracy: 100, bossDefeated: true }, chapters } as UserProgressState;
  assert.equal(getNextStep(state).kind, 'done');
});
