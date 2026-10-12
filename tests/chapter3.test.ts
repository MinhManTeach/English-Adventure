import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState } from '../src/services/storage';
import { isUnitAvailable, completeLearnStage, canEnterBoss, finishReviewGate, isReviewGateAvailable, getReviewGateStatus, getUnitStatus } from '../src/engine/worldProgression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { selectReviewGateQuestions } from '../src/engine/review';
import { getQuestionsByUnit, getBossQuestions, getReviewQuestionPool, HOOT_QUESTIONS, getQuestionById } from '../src/data/curriculum';
import { LEARN_CARDS_DATA } from '../src/data/learnContent';
import { ALL_UNITS } from '../src/data/unitsMeta';
import { getWorld } from '../src/data/worlds';
import { checkAnswer, normalizeAnswerText } from '../src/engine/validator';
import { isCosmeticUnlocked } from '../src/engine/avatarCosmetics';
import { UserProgressState, StoreItem } from '../src/types';

const day = '2026-10-12';
const reload = (state: UserProgressState) => migrateState(JSON.parse(JSON.stringify(state)));
let session = 0;
function completeUnit(state: UserProgressState, unitId: number) {
  state = completeLearnStage(state, unitId);
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) state = applySessionCompletion(state, { sessionId: `c3-test-${++session}`, unitId, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, day, day).state;
  return state;
}
/** A player who has finished Chapters 1 and 2, including both bosses. */
function chapter2Done() {
  let state = applyBossVictory({ ...createDefaultState(), completedUnits: [1, 2, 3], reviewGateCompleted: true }, 'boss1', day).state;
  for (const unit of [4, 5, 6]) state = completeUnit(state, unit);
  return reload(applyBossVictory(finishReviewGate(state, 8, 8, 2), 'chronos', day, 2).state);
}
function chapter3Units() { let state = chapter2Done(); for (const unit of [7, 8, 9]) state = completeUnit(state, unit); return state; }

test('Only defeating Chronos opens Chapter 3, starting with Unit 7', () => {
  let state = chapter2Done();
  assert.equal(isUnitAvailable(state, 7), true);
  assert.equal(isUnitAvailable(state, 8), false); assert.equal(isUnitAvailable(state, 9), false);
  const beforeChronos = { ...state, chapter2: { ...state.chapter2!, bossDefeated: false } };
  assert.equal(isUnitAvailable(beforeChronos, 7), false);
  state = reload(completeUnit(state, 7)); assert.equal(isUnitAvailable(state, 8), true); assert.equal(isUnitAvailable(state, 9), false);
  state = reload(completeUnit(state, 8)); assert.equal(isUnitAvailable(state, 9), true);
});
test('Review Gate 3 needs Units 7–9; 7/8 passes, 6/8 fails, and a pass is kept', () => {
  assert.equal(isReviewGateAvailable(completeUnit(chapter2Done(), 7), 3), false);
  const ready = chapter3Units(); assert.equal(isReviewGateAvailable(ready, 3), true); assert.equal(canEnterBoss(ready, 3), false);
  assert.equal(canEnterBoss(reload(finishReviewGate(ready, 6, 8, 3)), 3), false);
  const passed = reload(finishReviewGate(ready, 7, 8, 3));
  assert.equal(canEnterBoss(passed, 3), true); assert.equal(passed.chapters?.['3']?.reviewGateCompleted, true);
  assert.deepEqual(passed.chapter2, ready.chapter2);
  const replay = finishReviewGate(passed, 0, 8, 3); assert.equal(canEnterBoss(replay, 3), true); assert.equal(getReviewGateStatus(replay, 3), 'MASTERED');
});
test('Professor Hoot first clear grants 300/150 and TOP OF THE CLASS once; replays pay 20/10', () => {
  const first = applyBossVictory(finishReviewGate(chapter3Units(), 8, 8, 3), 'hoot-first', day, 3);
  assert.equal(first.result.xp, 300); assert.equal(first.result.coins, 150); assert.equal(first.result.isFirstVictory, true);
  assert.ok(first.state.achievements.top_of_the_class.unlockedAt);
  const saved = reload(first.state);
  assert.equal(saved.chapters?.['3']?.bossDefeated, true);
  assert.equal(applyBossVictory(saved, 'hoot-first', day, 3).result.xp, 0);
  const replay = applyBossVictory(saved, 'hoot-replay', day, 3);
  assert.equal(replay.result.xp, 20); assert.equal(replay.result.coins, 10);
  assert.deepEqual(replay.state.chapter2, saved.chapter2);
});
test('Older saves without Chapter 3 migrate additively and keep Chapter 2 progress', () => {
  const before = chapter2Done(); delete before.chapters;
  const saved = reload(before);
  assert.deepEqual(saved.chapter2, before.chapter2);
  assert.equal(saved.chapters?.['3']?.bossDefeated, false);
  assert.equal(isUnitAvailable(saved, 7), true);
  assert.deepEqual(reload(saved), saved);
  const done = reload(applyBossVictory(finishReviewGate(chapter3Units(), 8, 8, 3), 'hoot', day, 3).state);
  for (let i = 0; i < 3; i++) assert.deepEqual(reload(done), done);
  for (const unit of [7, 8, 9]) assert.equal(getUnitStatus(done, unit), 'COMPLETED');
});
test('Boss 3 mistakes enter the shared Error Bank with their unit and boss marker', () => {
  const q = HOOT_QUESTIONS.find(item => item.unit === 8)!;
  const state = applyQuestionResult(chapter2Done(), q, false, true, day, 'wrong', day);
  assert.equal(state.errorBank[q.id].source, 'boss'); assert.equal(state.errorBank[q.id].unit, 8);
  assert.ok(state.startedStages?.includes('boss3'));
  assert.equal(getQuestionById(q.id)?.id, q.id);
});
test('Boss-defeated cosmetics can require Chapter 3', () => {
  const item = { unlock: { kind: 'boss-defeated', chapter: 3 } } as StoreItem;
  assert.equal(isCosmeticUnlocked(chapter3Units(), item), false);
  assert.equal(isCosmeticUnlocked(applyBossVictory(chapter3Units(), 'hoot', day, 3).state, item), true);
});
test('Chapter 3 banks have stable IDs, unique prompts, one answer and bilingual feedback', () => {
  const ids = new Set<string>();
  for (const [unit, minimum] of [[7, 30], [8, 30], [9, 60]]) {
    const questions = getQuestionsByUnit(unit); assert.ok(questions.length >= minimum);
    assert.equal(ALL_UNITS.find(u => u.id === unit)?.questionsCount, questions.length);
    const prompts = new Set<string>();
    for (const q of questions) {
      assert.equal(ids.has(q.id), false); ids.add(q.id);
      const key = q.type === 'sentence-builder' ? `${q.question}:${q.answer}` : q.question;
      assert.equal(prompts.has(key), false, key); prompts.add(key);
      assert.equal(q.level, 'A1'); assert.ok(q.explanation.en && q.explanation.vi);
      if (q.options) { assert.equal(q.options.filter(o => checkAnswer(o, q.answer)).length, 1, q.question); assert.equal(new Set(q.options).size, q.options.length); }
      if (q.words) { const answer = Array.isArray(q.answer) ? q.answer[0] : q.answer; assert.deepEqual(q.words.map(normalizeAnswerText).sort(), answer.split(' ').map(normalizeAnswerText).sort()); }
    }
    const cards = LEARN_CARDS_DATA[unit]; assert.ok(cards.length >= 6);
    for (const card of cards) { assert.ok(card.ruleEn && card.ruleVi); assert.ok(card.examples.length <= 3); for (const example of card.examples) assert.ok(example.en.includes(example.highlight!), example.en); }
  }
});
test('Review Gate 3 and Professor Hoot balance Units 7–9', () => {
  const gate = selectReviewGateQuestions({}, getReviewQuestionPool(), {}, 3);
  assert.deepEqual(gate.map(q => q.unit).sort(), [7, 7, 7, 8, 8, 8, 9, 9]);
  for (let i = 0; i < 20; i++) {
    const questions = getBossQuestions(10, 3); assert.equal(new Set(questions.map(q => q.id)).size, 10);
    assert.deepEqual(questions.map(q => q.unit).sort(), [7, 7, 7, 8, 8, 8, 8, 9, 9, 9]);
    for (const q of questions) { assert.equal(q.type, 'multiple-choice'); assert.ok(q.options!.some(o => checkAnswer(o, q.answer))); }
  }
  assert.equal(getWorld(3).boss.name, 'Professor Hoot');
});
