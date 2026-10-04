import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState } from '../src/services/storage';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { canEnterBoss, finishReviewGate, getReviewGateStatus, getUnitStatus } from '../src/engine/worldProgression';
import { acknowledgeLevel, shouldCelebrateLevel } from '../src/engine/levelUp';
import { calculateLevel } from '../src/engine/scoring';
import { getAllQuestions, getQuestionsForStage } from '../src/data/curriculum';
import { checkAnswer } from '../src/engine/validator';
import { selectAdaptiveReviewQuestions } from '../src/engine/review';

const day = '2026-10-04';
const reload = (state: ReturnType<typeof createDefaultState>) => migrateState(JSON.parse(JSON.stringify(state)));
const completed = () => ({ ...createDefaultState(), completedUnits: [1, 2, 3], unlockedUnits: [1, 2, 3] });

test('Boss first clear, achievement and replay guards survive repeated storage round trips', () => {
  const first = applyBossVictory(completed(), 'first', day);
  assert.equal(first.result.xp, 200); assert.equal(first.result.coins, 100);
  let state = reload(first.state);
  const achievement = { ...state.achievements.boss_slayer };
  for (let i = 0; i < 10; i++) {
    const duplicate = applyBossVictory(state, 'first', day);
    assert.equal(duplicate.result.xp, 0); assert.equal(duplicate.result.coins, 0);
    state = reload(duplicate.state);
  }
  const replay = applyBossVictory(state, 'replay', day);
  assert.equal(replay.result.xp, 20); assert.equal(replay.result.coins, 10);
  assert.deepEqual(replay.state.achievements.boss_slayer, achievement);
  assert.equal(applyBossVictory(reload(replay.state), 'replay', day).result.xp, 0);
});

test('Review Gate pass/fail persists with no XP or coin grants', () => {
  for (const [correct, passed] of [[6, false], [7, true], [8, true]] as const) {
    const before = completed(); const state = reload(finishReviewGate(before, correct, 8));
    assert.equal(canEnterBoss(state), passed);
    assert.equal(state.reviewGateCompleted, passed);
    assert.equal(state.xp, before.xp); assert.equal(state.coins, before.coins);
    assert.equal(getReviewGateStatus(state), passed ? 'COMPLETED' : 'IN PROGRESS');
  }
});

test('completed chapter, reward totals and replay access survive reload', () => {
  const state = reload(applyBossVictory(finishReviewGate(completed(), 8, 8), 'victory', day).state);
  assert.equal(state.bossDefeated, true); assert.equal(canEnterBoss(state), true);
  assert.equal(state.reviewGateCompleted, true);
  for (const id of [1, 2, 3]) assert.equal(getUnitStatus(state, id), 'COMPLETED');
  assert.equal(state.xp, 200); assert.equal(state.coins, 100);
  assert.equal(calculateLevel(state.xp).level, 2);
  assert.ok(state.achievements.boss_slayer.unlockedAt);
});

test('Practice, Mini Game and Challenge completion IDs each prevent duplicate rewards after reload', () => {
  let state = reload(completed());
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) {
    const summary = { sessionId: stageId, unitId: 1, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 };
    state = reload(applySessionCompletion(state, summary, day, day).state);
    const duplicate = applySessionCompletion(state, summary, day, day);
    assert.equal(duplicate.result.xpEarned, 0); assert.equal(duplicate.result.coinsEarned, 0);
    assert.deepEqual(duplicate.state, state);
  }
});

test('Error Bank metadata and three-review recovery history survive each reload', () => {
  const question = getAllQuestions()[0];
  let state = reload(applyQuestionResult(createDefaultState(), question, false, false, day, 'wrong choice', day, 'practice'));
  const original = { ...state.errorBank[question.id] };
  for (let count = 1; count <= 3; count++) {
    const variant = selectAdaptiveReviewQuestions(state.errorBank, getAllQuestions(), 1, state.topicMastery)[0];
    state = reload(applyQuestionResult(state, variant, true, false, day, undefined, day, 'review'));
    const item = state.errorBank[question.id];
    assert.equal(item.reviewCorrectStreak, count); assert.equal(item.mastered, count === 3);
    for (const key of ['source', 'unit', 'topic', 'questionText', 'wrongAnswer', 'correctAnswer', 'explanation', 'lastWrongAt', 'wrongCount'] as const) assert.deepEqual(item[key], original[key]);
  }
});

test('acknowledged levels 2, 3 and 4 never celebrate again after rerender or reload', () => {
  let state = createDefaultState();
  for (const [xp, level] of [[200, 2], [500, 3], [900, 4]]) {
    state = { ...state, xp };
    assert.equal(calculateLevel(xp).level, level);
    assert.equal(shouldCelebrateLevel(state, level), true);
    state = reload(acknowledgeLevel(state, level));
    assert.equal(shouldCelebrateLevel(state, level), false);
    assert.equal(acknowledgeLevel(state, level), state);
  }
  assert.equal(shouldCelebrateLevel(state, 5), false);
  assert.equal(shouldCelebrateLevel(state, NaN), false);
});

test('legacy level migration acknowledges existing level without changing XP thresholds', () => {
  const state = { ...createDefaultState(), xp: 900 }; delete state.acknowledgedLevel;
  const loaded = reload(state);
  assert.equal(loaded.acknowledgedLevel, 4); assert.equal(loaded.xp, 900);
  assert.equal(shouldCelebrateLevel(loaded, 4), false);
});

test('many generated sessions keep choice correctness and varied answer positions', () => {
  const positions = new Set<number>();
  let first = 0, total = 0;
  for (let session = 0; session < 80; session++) {
    const questions = getQuestionsForStage(session % 3 + 1, 'practice', 6);
    for (const question of questions) {
      if (!question.options || question.options.length < 2) continue;
      const position = question.options.findIndex(answer => checkAnswer(answer, question.answer));
      assert.ok(position >= 0, question.id); positions.add(position); total++;
      if (position === 0) first++;
    }
  }
  assert.ok(positions.size >= 3);
  assert.ok(first < total * 0.6, `First option correct ${first}/${total} times`);
});
