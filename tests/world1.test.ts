import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState, getTodayDateString } from '../src/services/storage';
import { calculateMasteryStatus } from '../src/engine/mastery';
import { applySessionCompletion, LearningSessionSummary } from '../src/engine/sessionCompletion';
import { applyQuestionResult, applyBossVictory } from '../src/engine/progression';
import {
  isUnitAvailable, isStageAvailable, getStageStatus, getUnitStatus, completeLearnStage,
  startLearningStage, finishReviewGate, getReviewGateStatus, canEnterBoss,
} from '../src/engine/worldProgression';
import { createQuestionAttempt, resolveQuestionAttempt, retryQuestionAttempt } from '../src/engine/questionAttempts';
import { selectAdaptiveReviewQuestions, selectReviewGateQuestions, calculateReviewPriority } from '../src/engine/review';
import { getAllQuestions, getQuestionsByUnit, getQuestionsForStage, getReviewQuestionPool } from '../src/data/curriculum';
import { prepareSessionQuestions, shuffleQuestionOptions } from '../src/engine/sessionQuestions';
import { checkAnswer, normalizeAnswerText } from '../src/engine/validator';
import { HOME_WORDS, HOME_ACTIONS } from '../src/data/A1/world1Expansion';
import { LEARN_CARDS_DATA } from '../src/data/learnContent';
import { ALL_UNITS } from '../src/data/unitsMeta';
import { UserProgressState } from '../src/types';

const timestamp = '2026-10-04T10:00:00.000Z';
const today = '2026-10-04';
const question = getAllQuestions()[0];
let sessionNumber = 0;
const summary = (unitId = 1, stageId: LearningSessionSummary['stageId'] = 'practice', correctCount = 6): LearningSessionSummary => ({
  sessionId: `test-session-${++sessionNumber}`, unitId, stageId, totalQuestions: 6, correctCount, durationSeconds: 30,
});
function freeze<T>(value: T): T {
  if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
  return value;
}
function finishUnit(state: UserProgressState, unit: number): UserProgressState {
  state = completeLearnStage(state, unit);
  for (const stage of ['practice', 'minigame', 'challenge'] as const) {
    state = applySessionCompletion(state, summary(unit, stage), timestamp, today).state;
  }
  return state;
}

test('fresh progress opens Unit 1 Learn only, with no unlock on visitation', () => {
  const state = freeze(createDefaultState());
  assert.equal(isUnitAvailable(state, 1), true);
  assert.equal(isUnitAvailable(state, 2), false);
  assert.equal(isUnitAvailable(state, 3), false);
  assert.equal(isStageAvailable(state, 1, 'learn'), true);
  for (const stage of ['practice', 'minigame', 'challenge'] as const) assert.equal(isStageAvailable(state, 1, stage), false);
  assert.equal(getReviewGateStatus(state), 'LOCKED');
  assert.equal(canEnterBoss(state), false);
  assert.deepEqual(state.completedUnits, []);
  assert.equal(state.xp, 0);
});

test('explicit Learn completion opens Practice without XP or coin farming', () => {
  const initial = freeze(createDefaultState());
  const learned = completeLearnStage(initial, 1);
  assert.equal(learned.unitStageProgress['unit1-learn'], true);
  assert.equal(isStageAvailable(learned, 1, 'practice'), true);
  assert.equal(isStageAvailable(learned, 1, 'minigame'), false);
  assert.equal(learned.xp, 0);
  assert.equal(learned.coins, 0);
  assert.strictEqual(completeLearnStage(learned, 1), learned);
  assert.strictEqual(completeLearnStage(initial, 2), initial);
});

test('locked stage completion cannot grant rewards or unlock a unit', () => {
  const state = freeze(createDefaultState());
  const result = applySessionCompletion(state, summary(1, 'challenge'), timestamp, today);
  assert.strictEqual(result.state, state);
  assert.equal(result.result.xpEarned, 0);
  assert.equal(result.result.passed, false);
});

test('full Learn→Practice→Mini Game→Challenge unlocks only the next unit', () => {
  const unit1 = finishUnit(freeze(createDefaultState()), 1);
  assert.deepEqual(unit1.completedUnits, [1]);
  assert.equal(isUnitAvailable(unit1, 2), true);
  assert.equal(isUnitAvailable(unit1, 3), false);
  assert.equal(canEnterBoss(unit1), false);
  const unit2 = finishUnit(freeze(unit1), 2);
  assert.deepEqual(unit2.completedUnits, [1, 2]);
  assert.equal(isUnitAvailable(unit2, 3), true);
});

test('Challenge requires 80%: a weak result leaves the unit incomplete', () => {
  let state = completeLearnStage(createDefaultState(), 1);
  state = applySessionCompletion(state, summary(1, 'practice'), timestamp, today).state;
  state = applySessionCompletion(state, summary(1, 'minigame'), timestamp, today).state;
  const failed = applySessionCompletion(state, summary(1, 'challenge', 4), timestamp, today);
  assert.equal(failed.result.passed, false);
  assert.equal(failed.state.unitStageProgress['unit1-challenge'], false);
  assert.deepEqual(failed.state.completedUnits, []);
  const passed = applySessionCompletion(failed.state, summary(1, 'challenge', 5), timestamp, today);
  assert.equal(passed.result.passed, true);
  assert.deepEqual(passed.state.completedUnits, [1]);
});

test('all three units unlock Review Gate, not Boss; 7/8 passes and 6/8 does not', () => {
  let state = createDefaultState();
  for (const unit of [1, 2, 3]) state = finishUnit(state, unit);
  assert.equal(getReviewGateStatus(state), 'AVAILABLE');
  assert.equal(canEnterBoss(state), false);
  const failed = finishReviewGate(freeze(state), 6, 8);
  assert.equal(getReviewGateStatus(failed), 'IN PROGRESS');
  assert.equal(canEnterBoss(failed), false);
  const passed = finishReviewGate(freeze(failed), 7, 8);
  assert.equal(canEnterBoss(passed), true);
  assert.equal(passed.bossUnlocked, true);
  assert.equal(getReviewGateStatus(passed), 'MASTERED');
  assert.equal(passed.xp, state.xp);
  assert.equal(passed.coins, state.coins);
});

test('Review Gate cannot complete before units or with an empty/incomplete session', () => {
  const initial = freeze(createDefaultState());
  assert.strictEqual(finishReviewGate(initial, 8, 8), initial);
  const completed = migrateState({ completedUnits: [1, 2, 3] });
  assert.strictEqual(finishReviewGate(completed, 0, 0), completed);
  assert.strictEqual(finishReviewGate(completed, 7, 7), completed);
  assert.strictEqual(finishReviewGate(completed, 9, 8), completed);
});

test('five node states are derived from persisted performance', () => {
  let state = createDefaultState();
  assert.equal(getStageStatus(state, 1, 'practice'), 'LOCKED');
  assert.equal(getUnitStatus(state, 1), 'AVAILABLE');
  state = startLearningStage(state, 1, 'learn');
  assert.equal(getStageStatus(state, 1, 'learn'), 'IN PROGRESS');
  assert.equal(getUnitStatus(state, 1), 'IN PROGRESS');
  state = finishUnit(state, 1);
  assert.equal(getStageStatus(state, 1, 'practice'), 'COMPLETED');
  state = applySessionCompletion(state, summary(1, 'practice'), timestamp, today).state;
  assert.equal(getStageStatus(state, 1, 'practice'), 'MASTERED');
  state.topicMastery[question.topic] = { ...state.topicMastery[question.topic], ...calculateMasteryStatus(4, 4), correctAttempts: 4, totalAttempts: 4 };
  assert.equal(getUnitStatus(state, 1, [question.topic]), 'MASTERED');
});

test('NEW→LEARNING→PRACTICING→MASTERED requires actual attempts and accuracy', () => {
  assert.equal(calculateMasteryStatus(0, 0).status, 'NEW');
  assert.equal(calculateMasteryStatus(1, 1).status, 'LEARNING');
  assert.equal(calculateMasteryStatus(2, 3).status, 'PRACTICING');
  assert.equal(calculateMasteryStatus(4, 5).status, 'MASTERED');
  assert.equal(calculateMasteryStatus(1, 5).status, 'LEARNING');
});

test('session transaction duplicates are ignored, including after serialization', () => {
  const state = completeLearnStage(createDefaultState(), 1);
  const event = summary();
  const first = applySessionCompletion(freeze(state), event, timestamp, today);
  const stored = JSON.parse(JSON.stringify(first.state));
  const duplicate = applySessionCompletion(stored, event, timestamp, today);
  assert.strictEqual(duplicate.state, stored);
  assert.equal(duplicate.result.xpEarned, 0);
  assert.equal(duplicate.result.coinsEarned, 0);
  assert.equal(stored.attemptLogs.length, 1);
});

test('replaying completed units grants session rewards but never repeats unit or achievement bonuses', () => {
  const first = finishUnit(createDefaultState(), 1);
  const replay = applySessionCompletion(freeze(first), summary(1, 'challenge'), timestamp, today);
  assert.equal(replay.result.xpEarned, 80); // 6×10 + perfect bonus, existing rule.
  assert.equal(replay.result.coinsEarned, 22);
  assert.deepEqual(replay.state.completedUnits, [1]);
  assert.equal(replay.state.achievements.grammar_rookie.unlockedAt, first.achievements.grammar_rookie.unlockedAt);
});

test('first-clear Boss remains exactly 200 XP and 100 Gold, replay remains 20/10', () => {
  const first = applyBossVictory(freeze(createDefaultState()), 'first-boss', today);
  assert.equal(first.result.xp, 200);
  assert.equal(first.result.coins, 100);
  const repeat = applyBossVictory(first.state, 'replay-boss', today);
  assert.equal(repeat.result.xp, 20);
  assert.equal(repeat.result.coins, 10);
});

test('two attempts require explicit retry; duplicate submissions do not resolve again', () => {
  const first = resolveQuestionAttempt(createQuestionAttempt(), false);
  assert.equal(first.status, 'retry');
  assert.strictEqual(resolveQuestionAttempt(first, false), first);
  const second = resolveQuestionAttempt(retryQuestionAttempt(first), false);
  assert.equal(second.status, 'resolved');
  assert.equal(second.wrongAttempts, 2);
  assert.strictEqual(resolveQuestionAttempt(second, true), second);
  const correct = resolveQuestionAttempt(retryQuestionAttempt(first), true);
  assert.equal(correct.isCorrect, true);
  assert.equal(correct.wrongAttempts, 1);
});

test('Error Bank stores question type, source, answer and explanation without duplicates', () => {
  let state = applyQuestionResult(freeze(createDefaultState()), question, false, false, timestamp, 'are', today, 'practice');
  state = applyQuestionResult(freeze(state), question, false, false, timestamp, 'is', today, 'practice');
  const item = state.errorBank[question.id];
  assert.equal(Object.keys(state.errorBank).length, 1);
  assert.equal(item.wrongCount, 2);
  assert.equal(item.questionType, question.type);
  assert.equal(item.source, 'practice');
  assert.equal(item.wrongAnswer, 'is');
  assert.deepEqual(item.correctAnswer, question.answer);
  assert.deepEqual(item.explanation, question.explanation);
  assert.equal(state.hearts, 5);
});

test('adaptive review tests transfer with another question from the same skill/topic', () => {
  const state = applyQuestionResult(createDefaultState(), question, false, false, timestamp);
  const review = selectAdaptiveReviewQuestions(state.errorBank, getReviewQuestionPool(), 1, state.topicMastery);
  assert.equal(review[0].topic, question.topic);
  assert.equal(review[0].skill, question.skill);
  assert.notEqual(review[0].id, question.id);
  assert.deepEqual(review[0].reviewOf, [question.id]);
});

test('three successful reviews recover a historical mistake without erasing it', () => {
  let state = applyQuestionResult(createDefaultState(), question, false, false, timestamp);
  const ids: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const review = selectAdaptiveReviewQuestions(state.errorBank, getReviewQuestionPool(), 1, state.topicMastery)[0];
    ids.push(review.id);
    state = applyQuestionResult(freeze(state), review, true, false, timestamp, undefined, today, 'review');
    assert.equal(state.errorBank[question.id].reviewCorrectStreak, i);
    assert.equal(state.errorBank[question.id].mastered, i === 3);
    assert.equal(state.errorBank[question.id].wrongCount, 1);
  }
  assert.ok(new Set(ids).size > 1);
  assert.equal(Object.keys(state.errorBank).length, 1);
});

test('failed review variants update the original error and reset recovery without extra cards', () => {
  let state = applyQuestionResult(createDefaultState(), question, false, false, timestamp);
  const review = selectAdaptiveReviewQuestions(state.errorBank, getReviewQuestionPool(), 1, state.topicMastery)[0];
  state = applyQuestionResult(state, review, true, false, timestamp, undefined, today, 'review');
  state = applyQuestionResult(freeze(state), review, false, false, timestamp, 'wrong answer', today, 'review');
  const item = state.errorBank[question.id];
  assert.equal(item.wrongCount, 2);
  assert.equal(item.reviewCorrectStreak, 0);
  assert.equal(item.lastReviewWrongAnswer, 'wrong answer');
  assert.equal(item.lastAttemptSource, 'review');
  assert.equal(Object.keys(state.errorBank).length, 1);
  assert.equal(state.hearts, 5);
});

test('review priority considers recent/frequent mistakes and weak topics', () => {
  const state = applyQuestionResult(createDefaultState(), question, false, false, timestamp);
  const item = state.errorBank[question.id];
  assert.ok(calculateReviewPriority(item, Date.parse(timestamp)) > calculateReviewPriority({ ...item, lastWrongAt: '2020-01-01' }, Date.parse(timestamp)));
  assert.ok(calculateReviewPriority({ ...item, wrongCount: 5 }) > calculateReviewPriority(item));
  const second = getQuestionsByUnit(2)[0];
  const withSecond = applyQuestionResult(state, second, false, false, timestamp);
  withSecond.topicMastery[question.topic] = { ...withSecond.topicMastery[question.topic], accuracy: 100 };
  const review = selectAdaptiveReviewQuestions(withSecond.errorBank, getReviewQuestionPool(), 1, withSecond.topicMastery, Date.parse(timestamp));
  assert.equal(review[0].topic, second.topic);
});

test('Review Gate contains 8 unique questions across all units', () => {
  const selected = selectReviewGateQuestions({}, getAllQuestions(), {});
  assert.equal(selected.length, 8);
  assert.equal(new Set(selected.map(q => q.id)).size, 8);
  assert.deepEqual([1, 2, 3].map(unit => selected.filter(q => q.unit === unit).length), [3, 3, 2]);
});

test('all units have >=20 stable, original question IDs and short unique sessions', () => {
  const all = getAllQuestions();
  assert.equal(new Set(all.map(q => q.id)).size, all.length);
  for (const unit of [1, 2, 3]) {
    assert.ok(getQuestionsByUnit(unit).length >= 20);
    assert.equal(ALL_UNITS.find(u => u.id === unit)!.questionsCount, getQuestionsByUnit(unit).length);
    for (const stage of ['practice', 'minigame', 'challenge'] as const) {
      const session = getQuestionsForStage(unit, stage, 6);
      assert.equal(session.length, 6);
      assert.equal(new Set(session.map(q => q.id)).size, 6);
      assert.ok(session.every(q => q.unit === unit));
    }
  }
  assert.deepEqual([1, 2, 3].map(unit => getQuestionsByUnit(unit).length), [30, 30, 53]);
});

test('all choice questions remain correct after shuffling; sentence word banks match answers', () => {
  for (const q of getAllQuestions()) {
    assert.ok(q.explanation.en && q.explanation.vi);
    if (q.options) {
      const original = [...q.options];
      const shuffled = prepareSessionQuestions([q], false)[0];
      assert.ok(shuffled.options!.some(option => checkAnswer(option, q.answer)), q.id);
      assert.deepEqual(q.options, original);
      assert.equal(shuffled.options!.filter(option => checkAnswer(option, q.answer)).length, 1, q.id);
      for (let position = 0; position < q.options.length; position++) {
        assert.ok(checkAnswer(shuffleQuestionOptions(q, position).options![position], q.answer), q.id);
      }
    }
    if (q.type === 'sentence-builder') {
      const answer = Array.isArray(q.answer) ? q.answer[0] : q.answer;
      assert.deepEqual(q.words!.flatMap(word => word.split(' ')).map(normalizeAnswerText).sort(), answer.split(' ').map(normalizeAnswerText).sort(), q.id);
    }
  }
});

test('Home vocabulary covers all requested nouns and action phrases', () => {
  const words = ['house', 'flat', 'bedroom', 'bathroom', 'kitchen', 'living room', 'garden', 'floor', 'wall', 'ceiling', 'bed', 'table', 'chair', 'sofa', 'cupboard', 'wardrobe', 'bookcase', 'curtain', 'carpet', 'key'];
  for (const word of words) assert.ok(HOME_WORDS.some(item => item.word === word));
  for (const word of ['clean', 'wash', 'tidy', 'put away', 'dust', 'make the bed', 'feed', 'water']) assert.ok(HOME_ACTIONS.some(item => item.word === word));
});

test('Learn cards stay short, bilingual, have distinct IDs and valid highlights', () => {
  const ids = new Set<string>();
  for (const unit of [1, 2, 3]) for (const card of LEARN_CARDS_DATA[unit]) {
    assert.ok(!ids.has(card.id)); ids.add(card.id);
    assert.ok(card.ruleEn && card.ruleVi);
    assert.ok(card.examples.length > 0 && card.examples.length <= 3);
    for (const example of card.examples) {
      assert.ok(example.en && example.vi);
      if (example.highlight) assert.ok(example.en.toLowerCase().includes(example.highlight.toLowerCase()));
    }
  }
});

test('legacy migration preserves XP, gold, achievements, mistakes and completed progress', () => {
  const old = {
    version: 1, xp: 987, coins: 123, profile: { name: 'Mai' }, completedUnits: [1, 2, 3],
    bossUnlocked: true, bossDefeated: true, lastBossRewardBattleId: 'legacy-battle',
    achievements: { boss_slayer: { unlockedAt: '2026-01-01', currentProgress: 1 } },
    errorBank: { [question.id]: { questionId: question.id, topic: question.topic, unit: 1, skill: 'grammar', questionText: question.question, wrongCount: 4, lastWrongAt: today, mastered: false } },
  };
  const state = migrateState(freeze(old));
  assert.equal(state.xp, 987);
  assert.equal(state.coins, 123);
  assert.equal(state.profile.name, 'Mai');
  assert.equal(state.achievements.boss_slayer.unlockedAt, '2026-01-01');
  assert.equal(state.errorBank[question.id].wrongCount, 4);
  assert.equal(state.settings.speechEnabled, true);
  assert.equal(state.reviewGateCompleted, true);
  assert.equal(canEnterBoss(state), true);
  assert.equal(applyBossVictory(state, 'new-battle', today).result.xp, 20);
  assert.equal(isStageAvailable(state, 3, 'challenge'), true);
});

test('partial legacy stage completion retains completed prerequisites without paying rewards', () => {
  const state = migrateState({ xp: 75, coins: 10, unitStageProgress: { 'unit1-practice': true } });
  assert.equal(state.unitStageProgress['unit1-practice'], true);
  assert.equal(state.unitStageProgress['unit1-learn'], true);
  assert.equal(isStageAvailable(state, 1, 'minigame'), true);
  assert.equal(state.xp, 75);
  assert.equal(state.coins, 10);
  assert.deepEqual(state.completedUnits, []);
});

test('migration fills missing fields and is idempotent without wiping partial progress', () => {
  const state = migrateState({ xp: 65, coins: 12, settings: { soundEnabled: false }, completedUnits: [1] });
  assert.equal(state.xp, 65);
  assert.equal(state.coins, 12);
  assert.equal(state.settings.soundEnabled, false);
  assert.equal(state.settings.speechEnabled, true);
  assert.equal(isUnitAvailable(state, 2), true);
  assert.equal(canEnterBoss(state), false);
  assert.deepEqual(migrateState(freeze(state)), state);
  assert.deepEqual(migrateState(null), createDefaultState());
});

test('progress survives migration/refresh and completed screens do not repay session transactions', () => {
  let state = completeLearnStage(createDefaultState(), 1);
  const event = summary();
  state = applySessionCompletion(state, event, timestamp, getTodayDateString()).state;
  const refreshed = migrateState(JSON.parse(JSON.stringify(state)));
  assert.equal(getStageStatus(refreshed, 1, 'practice'), 'COMPLETED');
  assert.equal(isStageAvailable(refreshed, 1, 'minigame'), true);
  assert.equal(applySessionCompletion(refreshed, event, timestamp, today).result.xpEarned, 0);
});
