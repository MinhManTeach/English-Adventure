import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState, storageService, getTodayDateString } from '../src/services/storage';
import { isUnitAvailable, isStageAvailable, completeLearnStage, canEnterBoss, finishReviewGate, isReviewGateAvailable, getReviewGateStatus, getUnitStatus } from '../src/engine/worldProgression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { createBossBattle, transitionBossBattle, getBossPhase, canClaimBossVictory } from '../src/engine/bossLogic';
import { selectAdaptiveReviewQuestions, selectReviewGateQuestions } from '../src/engine/review';
import { getQuestionsByUnit, getQuestionsForStage, getBossQuestions, getReviewQuestionPool, CHRONOS_QUESTIONS } from '../src/data/curriculum';
import { LEARN_CARDS_DATA } from '../src/data/learnContent';
import { ALL_UNITS } from '../src/data/unitsMeta';
import { checkAnswer, normalizeAnswerText } from '../src/engine/validator';
import { startAttemptTimer } from '../src/engine/attemptTimer';
import { createQuestionAttempt, resolveQuestionAttempt, retryQuestionAttempt } from '../src/engine/questionAttempts';
import { UserProgressState } from '../src/types';

const day = '2026-10-04';
const reload = (state: UserProgressState) => migrateState(JSON.parse(JSON.stringify(state)));
const chapter1 = () => reload(applyBossVictory({ ...createDefaultState(), completedUnits: [1, 2, 3], reviewGateCompleted: true }, 'boss1', day).state);
let session = 0;
function completeUnit(state: UserProgressState, unitId: number) {
  state = completeLearnStage(state, unitId);
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) state = applySessionCompletion(state, { sessionId: `c2-test-${++session}`, unitId, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, day, day).state;
  return state;
}
function allUnits() { let state = chapter1(); for (const unit of [4, 5, 6]) state = completeUnit(state, unit); return state; }
function runBoss(correctCount: number) {
  let state = createBossBattle('fighting');
  for (let i = 0; i < 10; i++) {
    const correct = i < correctCount;
    state = transitionBossBattle(state, { type: 'answer', questionIndex: i, correct });
    if (!correct) {
      state = transitionBossBattle(state, { type: 'retry', questionIndex: i });
      state = transitionBossBattle(state, { type: 'answer', questionIndex: i, correct: false });
    }
    state = transitionBossBattle(state, { type: 'next', questionIndex: i });
    if (state.status !== 'fighting') break;
  }
  return state;
}

test('A: only Boss 1 completion opens Chapter 2, with Chapter 1 replay intact', () => {
  let state = { ...createDefaultState(), completedUnits: [1, 2, 3] };
  assert.equal(isUnitAvailable(state, 4), false);
  state = chapter1(); assert.equal(isUnitAvailable(state, 4), true);
  for (const unit of [1, 2, 3]) assert.equal(isUnitAvailable(state, unit), true);
  assert.equal(isUnitAvailable(state, 5), false); assert.equal(isUnitAvailable(state, 6), false);
  assert.equal(isStageAvailable(state, 4, 'practice'), false);
});
test('B: Unit 4 full learning loop opens Unit 5, not Unit 6', () => {
  const state = reload(completeUnit(chapter1(), 4));
  assert.equal(isUnitAvailable(state, 5), true); assert.equal(isUnitAvailable(state, 6), false);
  assert.equal(getUnitStatus(state, 4), 'COMPLETED');
});
test('C: Unit 5 completion opens Unit 6', () => {
  const state = completeUnit(completeUnit(chapter1(), 4), 5);
  assert.equal(isUnitAvailable(reload(state), 6), true);
});
test('D: Unit 6 completion opens only Review Gate 2', () => {
  const state = reload(allUnits()); assert.equal(isReviewGateAvailable(state, 2), true);
  assert.equal(canEnterBoss(state, 2), false);
});
test('E/F: Review Gate 2 pass is 7/8, fail is 6/8; gate 1 is independent', () => {
  for (const [score, passed] of [[6, false], [7, true], [8, true]] as const) {
    const before = allUnits(), state = reload(finishReviewGate(before, score, 8, 2));
    assert.equal(canEnterBoss(state, 2), passed); assert.equal(state.chapter2?.reviewGateCompleted, passed);
    assert.equal(state.reviewGateCompleted, true); assert.equal(state.xp, before.xp); assert.equal(state.coins, before.coins);
  }
  assert.equal(finishReviewGate(chapter1(), 8, 8, 2).chapter2?.reviewGateCompleted, false);
  assert.equal(finishReviewGate(allUnits(), 1, 0, 2).chapter2?.reviewGateCompleted, false);
});
test('Review Gate 2 keeps a completed pass after replay, never relocking the boss', () => {
  const state = finishReviewGate(finishReviewGate(allUnits(), 7, 8, 2), 0, 8, 2);
  assert.equal(canEnterBoss(reload(state), 2), true); assert.equal(getReviewGateStatus(state, 2), 'MASTERED');
});
test('G/H/I: shared Chronos battle starts 100 HP / 5 hearts and every combo hit deals 10', () => {
  let state = createBossBattle('fighting'); assert.equal(state.bossHp, 100); assert.equal(state.playerHearts, 5);
  for (let i = 0; i < 10; i++) {
    const next = transitionBossBattle(state, { type: 'answer', questionIndex: i, correct: true });
    assert.equal(state.bossHp - next.bossHp, 10); assert.equal(next.successfulHits, i + 1);
    assert.equal(transitionBossBattle(next, { type: 'answer', questionIndex: i, correct: true }), next);
    state = transitionBossBattle(next, { type: 'next', questionIndex: i });
  }
  assert.equal(state.comboCount, 10); assert.equal(state.bossHp, 0);
});
test('J: ten hits defeat Chronos; phase derives from HP', () => {
  const state = runBoss(10); assert.equal(state.status, 'victory'); assert.equal(state.bossHp, 0);
  assert.equal(getBossPhase(state.bossHp), 'defeated');
});
test('K/L: nine hits leave 10 HP, survived run never invokes a victory transaction', () => {
  const battle = runBoss(9); assert.equal(battle.status, 'survived'); assert.equal(battle.bossHp, 10);
  let state = allUnits(); const before = state;
  if (canClaimBossVictory(battle)) state = applyBossVictory(state, 'failed', day, 2).state;
  assert.equal(state, before); assert.equal(state.chapter2?.bossDefeated, false);
});
test('Chronos wrong retry has no penalty, final failure costs exactly one heart and no HP', () => {
  let state = createBossBattle('fighting');
  state = transitionBossBattle(state, { type: 'answer', questionIndex: 0, correct: false });
  assert.equal(state.playerHearts, 5); assert.equal(state.bossHp, 100);
  state = transitionBossBattle(state, { type: 'retry', questionIndex: 0 });
  state = transitionBossBattle(state, { type: 'answer', questionIndex: 0, correct: false });
  assert.equal(state.playerHearts, 4); assert.equal(state.bossHp, 100);
  assert.equal(transitionBossBattle(state, { type: 'answer', questionIndex: 0, correct: false }), state);
});
test('M/N: Chronos first clear grants 250/125 and TIME MASTER once; replay persists independent IDs', () => {
  const first = applyBossVictory(finishReviewGate(allUnits(), 8, 8, 2), 'chronos-first', day, 2);
  assert.equal(first.result.xp, 250); assert.equal(first.result.coins, 125);
  assert.ok(first.state.achievements.time_master.unlockedAt);
  const saved = reload(first.state), achievement = { ...saved.achievements.time_master };
  assert.equal(applyBossVictory(saved, 'chronos-first', day, 2).result.xp, 0);
  const replay = applyBossVictory(saved, 'chronos-replay', day, 2);
  assert.equal(replay.result.xp, 20); assert.equal(replay.result.coins, 10);
  assert.deepEqual(replay.state.achievements.time_master, achievement);
  assert.equal(applyBossVictory(reload(replay.state), 'chronos-first', day, 2).result.xp, 0);
});
test('O/P: Chronos rewards cannot reset or repay Boss 1 first-clear state', () => {
  const before = allUnits(), state = reload(applyBossVictory(before, 'chronos', day, 2).state);
  assert.equal(state.bossDefeated, true); assert.equal(state.lastBossRewardBattleId, before.lastBossRewardBattleId);
  assert.deepEqual(state.achievements.boss_slayer, before.achievements.boss_slayer);
  assert.equal(applyBossVictory(state, 'boss1', day).result.xp, 0);
  assert.equal(applyBossVictory(state, 'boss1-replay', day).result.xp, 20);
  assert.equal(canEnterBoss(state), true);
});
test('Q/R: Chapter 2 and Boss 2 errors use the single Error Bank and recover through Smart Review', () => {
  let state = chapter1();
  const questions = [getQuestionsByUnit(4)[0], getQuestionsByUnit(5)[0], getQuestionsByUnit(6)[0], CHRONOS_QUESTIONS[0]];
  for (const q of questions) state = applyQuestionResult(state, q, false, false, day, 'wrong choice', day);
  const boss = CHRONOS_QUESTIONS[0]; assert.equal(state.errorBank[boss.id].source, 'boss');
  assert.equal(state.errorBank[boss.id].unit, 4);
  const selected = selectAdaptiveReviewQuestions(state.errorBank, getReviewQuestionPool(), 8, state.topicMastery);
  assert.ok(selected.some(q => q.id === boss.id));
  for (const question of questions) assert.ok(selected.some(q => q.reviewOf?.includes(question.id)));
  for (let i = 0; i < 3; i++) {
    const q = { ...boss, reviewOf: [boss.id] };
    state = reload(applyQuestionResult(state, q, true, false, day, undefined, day, 'review'));
  }
  assert.equal(state.errorBank[boss.id].reviewCorrectStreak, 3); assert.equal(state.errorBank[boss.id].mastered, true);
});
test('S/T: old Chapter 1 saves migrate additively without resetting progress or errors', () => {
  const q = getQuestionsByUnit(1)[0]; const before = applyQuestionResult(chapter1(), q, false, false, day, 'old answer', day);
  delete before.chapter2; const saved = reload(before);
  for (const key of ['xp', 'coins', 'level', 'completedUnits', 'bossDefeated', 'lastBossRewardBattleId', 'errorBank', 'reviewGateCompleted', 'acknowledgedLevel'] as const) assert.deepEqual(saved[key], before[key]);
  assert.equal(saved.chapter2?.bossDefeated, false); assert.equal(saved.chapter2?.reviewGateCompleted, false);
  assert.deepEqual(saved.achievements.boss_slayer, before.achievements.boss_slayer);
  assert.equal(isUnitAvailable(saved, 4), true); assert.deepEqual(reload(saved), saved);
});
test('U: cancelled timer callbacks after click, question change or unmount cannot submit', () => {
  let callback = () => {}, cancellations = 0, expirations = 0;
  const stop = startAttemptTimer(() => expirations++, 10000, fn => { callback = fn; return 1; }, () => cancellations++);
  stop(); callback(); callback(); assert.equal(expirations, 0); assert.equal(cancellations, 1);
});
test('timer fires once; timeout and click races resolve at most two explicit attempts', () => {
  let callback = () => {}, state = createQuestionAttempt(), finals = 0;
  const submit = (correct: boolean) => { const next = resolveQuestionAttempt(state, correct); if (next !== state && next.status === 'resolved') finals++; state = next; };
  startAttemptTimer(() => submit(false), 10000, fn => { callback = fn; return 1; }, () => {});
  callback(); callback(); submit(true); assert.equal(state.status, 'retry'); assert.equal(finals, 0);
  state = retryQuestionAttempt(state);
  startAttemptTimer(() => submit(false), 10000, fn => { callback = fn; return 2; }, () => {});
  submit(true); callback(); callback(); assert.equal(finals, 1); assert.equal(state.isCorrect, true);
});
test('V: completed units 4–6, gate and Chronos state survive save/reload repeatedly', () => {
  const before = applyBossVictory(finishReviewGate(allUnits(), 7, 8, 2), 'finish', day, 2).state;
  let state = before; for (let i = 0; i < 5; i++) state = reload(state);
  assert.deepEqual(state, before); assert.equal(canEnterBoss(state, 2), true);
  for (const id of [4, 5, 6]) assert.equal(getUnitStatus(state, id), 'COMPLETED');
});
test('Chapter 2 banks have stable IDs, unique prompts, one answer and bilingual A1 feedback', () => {
  const ids = new Set<string>();
  for (const [unit, minimum] of [[4, 30], [5, 30], [6, 35]]) {
    const questions = getQuestionsByUnit(unit); assert.ok(questions.length >= minimum);
    assert.equal(ALL_UNITS.find(u => u.id === unit)?.questionsCount, questions.length);
    const prompts = new Set<string>();
    for (const q of questions) {
      assert.equal(ids.has(q.id), false); ids.add(q.id);
      // Builders deliberately use shared instructions; their answer sentences must be distinct.
      const key = q.type === 'sentence-builder' ? `${q.question}:${q.answer}` : q.question;
      assert.equal(prompts.has(key), false); prompts.add(key);
      assert.equal(q.level, 'A1'); assert.ok(q.explanation.en && q.explanation.vi);
      if (q.options) { assert.equal(q.options.filter(o => checkAnswer(o, q.answer)).length, 1); assert.equal(new Set(q.options).size, q.options.length); }
      if (q.words) { const answer = Array.isArray(q.answer) ? q.answer[0] : q.answer; assert.deepEqual(q.words.map(normalizeAnswerText).sort(), answer.split(' ').map(normalizeAnswerText).sort()); }
    }
    const cards = LEARN_CARDS_DATA[unit]; assert.ok(cards.length >= 6);
    for (const card of cards) { assert.ok(card.ruleEn && card.ruleVi); assert.ok(card.examples.length <= 3); for (const example of card.examples) assert.ok(example.en.includes(example.highlight!)); }
  }
});
test('all Chapter 2 stages have six unique items; Mini Game has reusable Time Attack', () => {
  for (const unit of [4, 5, 6]) for (const stage of ['practice', 'minigame', 'challenge'] as const) {
    const questions = getQuestionsForStage(unit, stage); assert.equal(questions.length, 6); assert.equal(new Set(questions.map(q => q.id)).size, 6);
    assert.ok(questions.every(q => q.unit === unit));
    if (stage === 'minigame') assert.equal(questions.filter(q => q.type === 'time-attack').length, 4);
    if (stage === 'challenge') assert.ok(new Set(questions.map(q => q.type)).size >= 3);
  }
});
test('Review Gate 2 and Chronos balance units and include introductory tense contrast', () => {
  const gate = selectReviewGateQuestions({}, getReviewQuestionPool(), {}, 2);
  assert.equal(gate.length, 8); assert.deepEqual(gate.map(q => q.unit).sort(), [4,4,4,5,5,5,6,6]);
  assert.ok(gate.some(q => q.topic === 'present-simple-vs-continuous'));
  const positions = new Set<number>();
  for (let i = 0; i < 30; i++) {
    const questions = getBossQuestions(10, 2); assert.equal(questions.length, 10); assert.equal(new Set(questions.map(q => q.id)).size, 10);
    assert.deepEqual(questions.map(q => q.unit).sort(), [4,4,4,5,5,5,5,6,6,6]);
    assert.ok(questions.some(q => q.topic === 'present-simple-vs-continuous'));
    for (const q of questions) { const index = q.options!.findIndex(o => checkAnswer(o, q.answer)); assert.ok(index >= 0); positions.add(index); }
  }
  assert.equal(positions.size, 4);
});
test('Chapter 2 completion duplicate transactions never repay unit first-clear bonuses', () => {
  let state = completeLearnStage(chapter1(), 4);
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) {
    const summary = { sessionId: `persist-${stageId}`, unitId: 4, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 };
    const completed = applySessionCompletion(state, summary, day, day); state = reload(completed.state);
    const duplicate = applySessionCompletion(state, summary, day, day);
    assert.equal(duplicate.result.xpEarned, 0); assert.equal(duplicate.result.coinsEarned, 0); assert.deepEqual(duplicate.state, state);
  }
});

test('localStorage save/load round trip preserves both bosses and Chapter 2 recovery', () => {
  const priorWindow = globalThis.window, priorStorage = globalThis.localStorage;
  const values = new Map<string, string>();
  try {
    Object.defineProperty(globalThis, 'window', { value: {}, configurable: true, writable: true });
    Object.defineProperty(globalThis, 'localStorage', { value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    }, configurable: true, writable: true });
    let state = applyBossVictory(finishReviewGate(allUnits(), 8, 8, 2), 'storage-chronos', day, 2).state;
    const q = CHRONOS_QUESTIONS[0];
    state = applyQuestionResult(state, q, false, false, day, 'wrong selection', day);
    state = applyQuestionResult(state, { ...q, reviewOf: [q.id] }, true, false, day, undefined, day, 'review');
    state = reload({ ...state, lastActiveDate: getTodayDateString() });
    assert.equal(storageService.saveState(state), true);
    const loaded = storageService.loadState();
    assert.deepEqual(loaded, state);
    assert.equal(loaded.errorBank[q.id].reviewCorrectStreak, 1);
    assert.equal(applyBossVictory(loaded, 'storage-chronos', day, 2).result.xp, 0);
  } finally {
    Object.defineProperty(globalThis, 'window', { value: priorWindow, configurable: true, writable: true });
    Object.defineProperty(globalThis, 'localStorage', { value: priorStorage, configurable: true, writable: true });
  }
});
