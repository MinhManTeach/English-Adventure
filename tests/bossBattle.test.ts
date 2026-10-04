import test from 'node:test';
import assert from 'node:assert/strict';
import { createBossBattle, transitionBossBattle, getBossPhase, BossBattleState } from '../src/engine/bossLogic';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { createDefaultState, storageService } from '../src/services/storage';
import { INITIAL_ACHIEVEMENTS } from '../src/data/achievementsData';
import { BOSS_BATTLE_QUESTIONS } from '../src/data/bossQuestions';
import { getBossQuestions, getReviewQuestionPool, getAllQuestions } from '../src/data/curriculum';
import { selectReviewQuestions } from '../src/engine/review';
import { shuffleQuestionOptions, prepareSessionQuestions } from '../src/engine/sessionQuestions';
import { checkAnswer } from '../src/engine/validator';

const answer = (state: BossBattleState, correct: boolean) =>
  transitionBossBattle(state, { type: 'answer', questionIndex: state.currentIndex, correct });
const retry = (state: BossBattleState) =>
  transitionBossBattle(state, { type: 'retry', questionIndex: state.currentIndex });
const next = (state: BossBattleState) =>
  transitionBossBattle(state, { type: 'next', questionIndex: state.currentIndex });
const fail = (state: BossBattleState) => answer(retry(answer(state, false)), false);
const bossQuestion = BOSS_BATTLE_QUESTIONS[0];
const timestamp = new Date().toISOString();

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

test('A: perfect battle damages 100→90→…→0 and wins only at zero', () => {
  let battle = createBossBattle('fighting');
  const hp = [battle.bossHp];
  for (let i = 0; i < 10; i++) {
    battle = answer(battle, true);
    hp.push(battle.bossHp);
    battle = next(battle);
    assert.equal(battle.status, i === 9 ? 'victory' : 'fighting');
  }
  assert.deepEqual(hp, [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]);
  assert.equal(battle.successfulHits, 10);
  assert.equal(battle.playerHearts, 5);
});

test('B: wrong once then correct costs no heart and advances once', () => {
  let battle = answer(createBossBattle('fighting'), false);
  assert.equal(battle.bossHp, 100);
  assert.equal(battle.playerHearts, 5);
  assert.equal(battle.currentIndex, 0);
  assert.equal(battle.wrongAttempts, 1);
  assert.strictEqual(next(battle), battle);
  battle = answer(retry(battle), true);
  assert.equal(battle.bossHp, 90);
  assert.equal(battle.playerHearts, 5);
  assert.equal(battle.successfulHits, 1);
  battle = next(battle);
  assert.equal(battle.currentIndex, 1);
  assert.equal(battle.wrongAttempts, 0);
});

test('C: wrong twice removes one heart, records final failure, advances once', () => {
  const battle = fail(createBossBattle('fighting'));
  assert.equal(battle.bossHp, 100);
  assert.equal(battle.playerHearts, 4);
  assert.equal(battle.wrongAttempts, 2);
  const progression = applyQuestionResult(createDefaultState(), bossQuestion, false, true, timestamp, 'are');
  assert.equal(progression.hearts, 4);
  assert.equal(progression.errorBank[bossQuestion.id].wrongCount, 1);
  const advanced = next(battle);
  assert.equal(advanced.currentIndex, 1);
  assert.equal(advanced.wrongAttempts, 0);
  assert.strictEqual(next(advanced), advanced);
});

test('D: duplicate correct submissions cause only 10 damage', () => {
  const resolved = answer(createBossBattle('fighting'), true);
  assert.strictEqual(answer(resolved, true), resolved);
  assert.strictEqual(answer(resolved, false), resolved);
  assert.equal(resolved.bossHp, 90);
  assert.equal(resolved.successfulHits, 1);
});

test('duplicate first and second wrong submissions do not consume extra attempts or hearts', () => {
  const first = answer(createBossBattle('fighting'), false);
  assert.strictEqual(answer(first, false), first);
  assert.strictEqual(answer(first, true), first);
  const second = answer(retry(first), false);
  assert.strictEqual(answer(second, false), second);
  assert.equal(second.playerHearts, 4);
});

test('duplicate Next and stale answer events cannot skip or hit the next question', () => {
  const advanced = next(answer(createBossBattle('fighting'), true));
  assert.strictEqual(transitionBossBattle(advanced, { type: 'next', questionIndex: 0 }), advanced);
  assert.strictEqual(transitionBossBattle(advanced, { type: 'answer', questionIndex: 0, correct: true }), advanced);
  assert.equal(advanced.currentIndex, 1);
  assert.equal(advanced.bossHp, 90);
});

test('E: combo and super spells always cause exactly 10 damage', () => {
  let battle = createBossBattle('fighting');
  for (let i = 1; i <= 10; i++) {
    const before = battle.bossHp;
    battle = answer(battle, true);
    assert.equal(battle.comboCount, i);
    assert.equal(before - battle.bossHp, 10);
    battle = next(battle);
  }
});

test('F: retry creates fresh state after a partial battle', () => {
  let partial = createBossBattle('fighting');
  for (let i = 0; i < 4; i++) partial = next(answer(partial, true));
  partial = next(fail(partial));
  partial = next(fail(partial));
  partial = answer(partial, true);
  assert.equal(partial.bossHp, 50);
  assert.equal(partial.playerHearts, 3);
  assert.ok(partial.comboCount > 0);
  assert.ok(partial.currentIndex > 0);
  const fresh = createBossBattle('fighting');
  assert.deepEqual(fresh, {
    bossHp: 100, playerHearts: 5, currentIndex: 0, comboCount: 0,
    wrongAttempts: 0, successfulHits: 0, resolution: 'ready', status: 'fighting',
  });
  assert.notStrictEqual(fresh, partial);
});

test('G: final correct answer leaves 10 HP and reports survived', () => {
  let battle = createBossBattle('fighting');
  battle = next(fail(battle));
  for (let i = 0; i < 8; i++) battle = next(answer(battle, true));
  assert.equal(battle.currentIndex, 9);
  assert.equal(battle.bossHp, 20);
  battle = next(answer(battle, true));
  assert.equal(battle.bossHp, 10);
  assert.equal(battle.status, 'survived');
  assert.equal(battle.successfulHits, 9);
});

test('H: first clear and Boss Slayer awarded once; legitimate replay gives 20 XP / 10 coins', () => {
  const original = freeze(createDefaultState());
  const first = applyBossVictory(original, 'battle-1', timestamp);
  assert.equal(first.result.isFirstVictory, true);
  assert.equal(first.result.xp, 200); // Existing 100 base + 100 Boss Slayer bonus.
  assert.equal(first.result.coins, 100);
  assert.equal(original.bossDefeated, false);
  assert.equal(original.achievements.boss_slayer.unlockedAt, null);
  const duplicate = applyBossVictory(first.state, 'battle-1', timestamp);
  assert.strictEqual(duplicate.state, first.state);
  assert.equal(duplicate.result.xp, 0);
  const persisted = JSON.parse(JSON.stringify(first.state));
  assert.equal(applyBossVictory(persisted, 'battle-1', timestamp).result.coins, 0);
  const replay = applyBossVictory(persisted, 'battle-2', timestamp);
  assert.equal(replay.result.isFirstVictory, false);
  assert.equal(replay.result.xp, 20);
  assert.equal(replay.result.coins, 10);
  assert.equal(replay.state.xp, 220);
  assert.equal(replay.state.coins, 110);
});

test('I: repeated Boss mistakes update one Error Bank record with full review metadata', () => {
  const original = freeze(createDefaultState());
  let state = applyQuestionResult(original, bossQuestion, false, true, timestamp, 'are');
  state = applyQuestionResult(freeze(state), bossQuestion, false, true, timestamp, 'am');
  assert.equal(Object.keys(state.errorBank).length, 1);
  const item = state.errorBank[bossQuestion.id];
  assert.equal(item.wrongCount, 2);
  assert.equal(item.source, 'boss');
  assert.equal(item.wrongAnswer, 'am');
  assert.deepEqual(item.correctAnswer, bossQuestion.answer);
  assert.deepEqual(item.options, bossQuestion.options);
  assert.deepEqual(item.explanation, bossQuestion.explanation);
  assert.equal(item.lastWrongAt, timestamp);
  assert.equal(item.unit, bossQuestion.unit);
  assert.equal(item.topic, bossQuestion.topic);
  assert.deepEqual(original.errorBank, {});
});

test('J: Boss mistakes are Smart Review candidates, including older records without source', () => {
  const state = applyQuestionResult(createDefaultState(), bossQuestion, false, true, timestamp, 'are');
  const item = { ...state.errorBank[bossQuestion.id] };
  delete item.source;
  const selected = selectReviewQuestions({ [item.questionId]: item }, getReviewQuestionPool(), 8);
  assert.ok(selected.some(q => q.id === bossQuestion.id));
  const prepared = prepareSessionQuestions(selected, true);
  assert.ok(prepared.some(q => q.id === bossQuestion.id));
});

test('Smart Review preserves frequency and recency priority rather than forcing Boss first', () => {
  const curriculum = getAllQuestions()[0];
  let state = applyQuestionResult(createDefaultState(), bossQuestion, false, true, timestamp);
  state = applyQuestionResult(state, curriculum, false, false, timestamp);
  state.errorBank[curriculum.id] = { ...state.errorBank[curriculum.id], wrongCount: 20 };
  const selected = selectReviewQuestions(state.errorBank, getReviewQuestionPool(), 2);
  assert.equal(selected[0].id, curriculum.id);
  assert.equal(selected[1].id, bossQuestion.id);
});

test('correct Smart Review answers recover Boss mistakes without spending a heart', () => {
  const failed = applyQuestionResult(createDefaultState(), bossQuestion, false, true, timestamp);
  const recovered = applyQuestionResult(freeze(failed), bossQuestion, true, false, timestamp);
  assert.equal(recovered.errorBank[bossQuestion.id].mastered, true);
  assert.equal(recovered.errorBank[bossQuestion.id].wrongCount, 1);
  assert.equal(recovered.hearts, 4);
});

test('K: correctness is preserved at every shuffled answer position', () => {
  const original = freeze({ ...bossQuestion, options: [...bossQuestion.options!] });
  for (let position = 0; position < 4; position++) {
    const shuffled = shuffleQuestionOptions(original, position);
    assert.ok(checkAnswer(shuffled.options![position], original.answer));
    assert.equal(shuffled.options!.filter(option => checkAnswer(option, original.answer)).length, 1);
    assert.deepEqual([...shuffled.options!].sort(), [...original.options!].sort());
  }
});

test('Boss sessions contain exactly 10 unique questions with stable options and balanced positions', () => {
  for (let i = 0; i < 10; i++) {
    const session = getBossQuestions(10);
    assert.equal(session.length, 10);
    assert.equal(new Set(session.map(q => q.id)).size, 10);
    const positions = new Set<number>();
    for (const question of session) {
      if (!question.options) continue;
      const snapshot = [...question.options];
      positions.add(question.options.findIndex(option => checkAnswer(option, question.answer)));
      answer(createBossBattle('fighting'), true);
      assert.deepEqual(question.options, snapshot);
    }
    assert.ok(positions.size > 1);
    assert.ok(!positions.has(-1));
  }
});

test('requested mixed sequence ends survived: 20 HP, 3 hearts, 8 successful hits', () => {
  let battle = createBossBattle('fighting');
  const hp: number[] = [];
  for (let question = 1; question <= 10; question++) {
    battle = question === 2 || question === 5 ? fail(battle) : answer(battle, true);
    hp.push(battle.bossHp);
    battle = next(battle);
  }
  assert.deepEqual(hp, [90, 90, 80, 70, 70, 60, 50, 40, 30, 20]);
  assert.equal(battle.status, 'survived');
  assert.equal(battle.bossHp, 20);
  assert.equal(battle.playerHearts, 3);
  assert.equal(battle.successfulHits, 8);
});

test('phase boundaries derive from HP, including a distinct defeated phase', () => {
  for (const hp of [100, 90, 80, 70]) assert.equal(getBossPhase(hp), 1);
  for (const hp of [60, 50, 40]) assert.equal(getBossPhase(hp), 2);
  for (const hp of [30, 20, 10, 1]) assert.equal(getBossPhase(hp), 3);
  assert.equal(getBossPhase(0), 'defeated');
});

test('Spell index is independent of hits and HP', () => {
  let battle = next(fail(createBossBattle('fighting')));
  battle = next(answer(battle, true));
  assert.equal(battle.currentIndex + 1, 3);
  assert.equal(battle.successfulHits, 1);
  assert.equal(battle.bossHp, 90);
});

test('existing defeat condition stops play at zero hearts without negative hearts', () => {
  let battle = createBossBattle('fighting');
  for (let i = 0; i < 5; i++) battle = next(fail(battle));
  assert.equal(battle.status, 'defeat');
  assert.equal(battle.playerHearts, 0);
  assert.strictEqual(answer(battle, false), battle);
  assert.strictEqual(retry(battle), battle);
  assert.strictEqual(next(battle), battle);
});

test('transitions are immutable and terminal screens ignore further events', () => {
  const initial = freeze(createBossBattle());
  assert.strictEqual(answer(initial, true), initial);
  const started = transitionBossBattle(initial, { type: 'start' });
  assert.equal(initial.status, 'intro');
  assert.equal(started.status, 'fighting');
  let battle = started;
  for (let i = 0; i < 10; i++) battle = next(answer(freeze(battle), true));
  assert.strictEqual(next(battle), battle);
  assert.strictEqual(answer(battle, true), battle);
});

test('vocabulary achievements update once and do not mutate default templates', () => {
  const question = { ...bossQuestion, skill: 'vocabulary' as const };
  let state = createDefaultState();
  state.achievements.vocab_master.currentProgress = 19;
  const result = applyQuestionResult(freeze(state), question, true, false, timestamp);
  assert.equal(result.achievements.vocab_master.currentProgress, 20);
  assert.equal(result.xp, 40);
  assert.equal(result.coins, 20);
  const repeat = applyQuestionResult(freeze(result), question, true, false, timestamp);
  assert.equal(repeat.xp, 40);
  assert.equal(INITIAL_ACHIEVEMENTS.vocab_master.currentProgress, 0);
  assert.equal(createDefaultState().achievements.vocab_master.currentProgress, 0);
});

test('persisted first-clear transaction survives storage save/load', () => {
  const data = new Map<string, string>();
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {} });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    setItem: (key: string, value: string) => data.set(key, value),
    getItem: (key: string) => data.get(key) ?? null,
  } });
  try {
    const first = applyBossVictory(createDefaultState(), 'persisted-battle', timestamp);
    assert.equal(storageService.saveState(first.state), true);
    const loaded = storageService.loadState();
    assert.equal(loaded.bossDefeated, true);
    assert.equal(applyBossVictory(loaded, 'persisted-battle', timestamp).result.xp, 0);
    assert.equal(applyBossVictory(loaded, 'new-battle', timestamp).result.xp, 20);
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
    else Reflect.deleteProperty(globalThis, 'window');
    if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
    else Reflect.deleteProperty(globalThis, 'localStorage');
  }
});
