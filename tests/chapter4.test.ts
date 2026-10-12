import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState } from '../src/services/storage';
import { isUnitAvailable, completeLearnStage, canEnterBoss, finishReviewGate, isReviewGateAvailable, getReviewGateStatus, getUnitStatus } from '../src/engine/worldProgression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { selectReviewGateQuestions } from '../src/engine/review';
import { getQuestionsByUnit, getBossQuestions, getReviewQuestionPool, FOGBEARD_QUESTIONS, getQuestionById } from '../src/data/curriculum';
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
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) state = applySessionCompletion(state, { sessionId: `c4-test-${++session}`, unitId, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, day, day).state;
  return state;
}
/** A player who has finished Chapters 1 and 2, including both bosses. */
function chapter2Done() {
  let state = applyBossVictory({ ...createDefaultState(), completedUnits: [1, 2, 3], reviewGateCompleted: true }, 'boss1', day).state;
  for (const unit of [4, 5, 6]) state = completeUnit(state, unit);
  return reload(applyBossVictory(finishReviewGate(state, 8, 8, 2), 'chronos', day, 2).state);
}
function chapter3Done() {
  let state = chapter2Done(); for (const unit of [7, 8, 9]) state = completeUnit(state, unit);
  return reload(applyBossVictory(finishReviewGate(state, 8, 8, 3), 'hoot', day, 3).state);
}
function chapter4Units() { let state = chapter3Done(); for (const unit of [10, 11, 12]) state = completeUnit(state, unit); return state; }

test('Only defeating Professor Hoot opens Chapter 4, starting with Unit 10', () => {
  let state = chapter3Done();
  assert.equal(isUnitAvailable(state, 10), true);
  assert.equal(isUnitAvailable(state, 11), false); assert.equal(isUnitAvailable(state, 12), false);
  const beforeHoot = { ...state, chapters: { ...state.chapters, 3: { ...state.chapters!['3'], bossDefeated: false } } };
  assert.equal(isUnitAvailable(beforeHoot, 10), false);
  state = reload(completeUnit(state, 10)); assert.equal(isUnitAvailable(state, 11), true); assert.equal(isUnitAvailable(state, 12), false);
  state = reload(completeUnit(state, 11)); assert.equal(isUnitAvailable(state, 12), true);
});
test('Review Gate 4 needs Units 10–12; 7/8 passes, 6/8 fails, and a pass is kept', () => {
  assert.equal(isReviewGateAvailable(completeUnit(chapter3Done(), 10), 4), false);
  const ready = chapter4Units(); assert.equal(isReviewGateAvailable(ready, 4), true); assert.equal(canEnterBoss(ready, 4), false);
  assert.equal(canEnterBoss(reload(finishReviewGate(ready, 6, 8, 4)), 4), false);
  const passed = reload(finishReviewGate(ready, 7, 8, 4));
  assert.equal(canEnterBoss(passed, 4), true); assert.equal(passed.chapters?.['4']?.reviewGateCompleted, true);
  assert.deepEqual(passed.chapters?.['3'], ready.chapters?.['3']);
  const replay = finishReviewGate(passed, 0, 8, 4); assert.equal(canEnterBoss(replay, 4), true); assert.equal(getReviewGateStatus(replay, 4), 'MASTERED');
});
test('Captain Fogbeard first clear grants 350/175 and MEMORY KEEPER once; replays pay 20/10', () => {
  const first = applyBossVictory(finishReviewGate(chapter4Units(), 8, 8, 4), 'fog-first', day, 4);
  assert.equal(first.result.xp, 350); assert.equal(first.result.coins, 175); assert.equal(first.result.isFirstVictory, true);
  assert.ok(first.state.achievements.memory_keeper.unlockedAt);
  const saved = reload(first.state);
  assert.equal(saved.chapters?.['4']?.bossDefeated, true);
  assert.equal(applyBossVictory(saved, 'fog-first', day, 4).result.xp, 0);
  const replay = applyBossVictory(saved, 'fog-replay', day, 4);
  assert.equal(replay.result.xp, 20); assert.equal(replay.result.coins, 10);
  assert.deepEqual(replay.state.chapters?.['3'], saved.chapters?.['3']);
});
test('Older saves without Chapter 4 migrate additively and keep Chapter 3 progress', () => {
  const before = chapter3Done(); delete before.chapters!['4'];
  const saved = reload(before);
  assert.deepEqual(saved.chapters?.['3'], before.chapters?.['3']);
  assert.equal(saved.chapters?.['4']?.bossDefeated, false);
  assert.equal(isUnitAvailable(saved, 10), true);
  assert.deepEqual(reload(saved), saved);
  const done = reload(applyBossVictory(finishReviewGate(chapter4Units(), 8, 8, 4), 'fog', day, 4).state);
  for (let i = 0; i < 3; i++) assert.deepEqual(reload(done), done);
  for (const unit of [10, 11, 12]) assert.equal(getUnitStatus(done, unit), 'COMPLETED');
});
test('Boss 4 mistakes enter the shared Error Bank with their unit and boss marker', () => {
  const q = FOGBEARD_QUESTIONS.find(item => item.unit === 11)!;
  const state = applyQuestionResult(chapter3Done(), q, false, true, day, 'wrong', day);
  assert.equal(state.errorBank[q.id].source, 'boss'); assert.equal(state.errorBank[q.id].unit, 11);
  assert.ok(state.startedStages?.includes('boss4'));
  assert.equal(getQuestionById(q.id)?.id, q.id);
});
test('Boss-defeated cosmetics can require Chapter 4', () => {
  const item = { unlock: { kind: 'boss-defeated', chapter: 4 } } as StoreItem;
  assert.equal(isCosmeticUnlocked(chapter4Units(), item), false);
  assert.equal(isCosmeticUnlocked(applyBossVictory(chapter4Units(), 'fog', day, 4).state, item), true);
});
test('Chapter 4 banks have stable IDs, unique prompts, one answer and bilingual feedback', () => {
  const ids = new Set<string>();
  for (const [unit, minimum] of [[10, 30], [11, 30], [12, 60]]) {
    const questions = getQuestionsByUnit(unit); assert.ok(questions.length >= minimum);
    assert.equal(ALL_UNITS.find(u => u.id === unit)?.questionsCount, questions.length);
    const prompts = new Set<string>();
    for (const q of questions) {
      assert.match(q.id, new RegExp(`^A1-U${unit}-C4-\\d{3}$`));
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
test('Review Gate 4 and Captain Fogbeard balance Units 10–12', () => {
  const gate = selectReviewGateQuestions({}, getReviewQuestionPool(), {}, 4);
  assert.deepEqual(gate.map(q => q.unit).sort((a, b) => a - b), [10, 10, 10, 11, 11, 11, 12, 12]);
  for (let i = 0; i < 20; i++) {
    const questions = getBossQuestions(10, 4); assert.equal(new Set(questions.map(q => q.id)).size, 10);
    assert.deepEqual(questions.map(q => q.unit).sort((a, b) => a - b), [10, 10, 10, 11, 11, 11, 11, 12, 12, 12]);
    for (const q of questions) { assert.equal(q.type, 'multiple-choice'); assert.ok(q.options!.some(o => checkAnswer(o, q.answer))); }
  }
  assert.equal(getWorld(4).boss.name, 'Captain Fogbeard');
});
