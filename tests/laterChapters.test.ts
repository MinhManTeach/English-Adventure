import test from 'node:test';
import assert from 'node:assert/strict';
import { createDefaultState, migrateState } from '../src/services/storage';
import { isUnitAvailable, completeLearnStage, canEnterBoss, finishReviewGate, isReviewGateAvailable, getUnitStatus } from '../src/engine/worldProgression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { selectReviewGateQuestions } from '../src/engine/review';
import { getQuestionsByUnit, getBossQuestions, getReviewQuestionPool, getQuestionById } from '../src/data/curriculum';
import { LEARN_CARDS_DATA } from '../src/data/learnContent';
import { ALL_UNITS } from '../src/data/unitsMeta';
import { WORLDS } from '../src/data/worlds';
import { INITIAL_ACHIEVEMENTS } from '../src/data/achievementsData';
import { checkAnswer, normalizeAnswerText } from '../src/engine/validator';
import { ChapterId, UserProgressState } from '../src/types';

/** Chapters 5 onwards share one shape, so one suite checks every new world. */
const day = '2026-10-12';
const reload = (state: UserProgressState) => migrateState(JSON.parse(JSON.stringify(state)));
let session = 0;
function completeUnit(state: UserProgressState, unitId: number) {
  state = completeLearnStage(state, unitId);
  for (const stageId of ['practice', 'minigame', 'challenge'] as const) state = applySessionCompletion(state, { sessionId: `later-${++session}`, unitId, stageId, totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, day, day).state;
  return state;
}
/** A player who has beaten every chapter before `chapter`. */
function doneBefore(chapter: number) {
  let state = applyBossVictory({ ...createDefaultState(), completedUnits: [1, 2, 3], reviewGateCompleted: true }, 'boss1', day).state;
  for (const world of WORLDS.filter(w => w.chapter > 1 && w.chapter < chapter)) {
    for (const unit of world.units) state = completeUnit(state, unit);
    state = applyBossVictory(finishReviewGate(state, 8, 8, world.chapter), `boss-${world.chapter}`, day, world.chapter).state;
  }
  return reload(state);
}

for (const world of WORLDS.filter(w => w.chapter >= 5)) {
  const chapter = world.chapter as ChapterId, [a, b, c] = world.units;
  test(`Chapter ${chapter} unlocks in order, gates its boss and pays first-clear rewards once`, () => {
    let state = doneBefore(chapter);
    assert.equal(isUnitAvailable(state, a), true); assert.equal(isUnitAvailable(state, b), false);
    state = reload(completeUnit(state, a)); assert.equal(isUnitAvailable(state, b), true); assert.equal(isUnitAvailable(state, c), false);
    state = reload(completeUnit(completeUnit(state, b), c));
    assert.equal(isReviewGateAvailable(state, chapter), true); assert.equal(canEnterBoss(state, chapter), false);
    assert.equal(canEnterBoss(reload(finishReviewGate(state, 6, 8, chapter)), chapter), false);
    state = reload(finishReviewGate(state, 7, 8, chapter)); assert.equal(canEnterBoss(state, chapter), true);
    const first = applyBossVictory(state, 'first', day, chapter);
    assert.deepEqual([first.result.xp, first.result.coins], [world.firstClear.xp, world.firstClear.coins]);
    assert.ok(first.state.achievements[world.achievementId].unlockedAt);
    const saved = reload(first.state);
    assert.equal(saved.chapters?.[String(chapter)]?.bossDefeated, true);
    assert.equal(applyBossVictory(saved, 'replay', day, chapter).result.xp, 20);
    for (const unit of world.units) assert.equal(getUnitStatus(saved, unit), 'COMPLETED');
    assert.deepEqual(reload(saved), saved);
  });
  test(`Chapter ${chapter} banks and Learn cards are complete and well-formed`, () => {
    assert.ok(INITIAL_ACHIEVEMENTS[world.achievementId]);
    const ids = new Set<string>();
    for (const unit of world.units) {
      const questions = getQuestionsByUnit(unit); assert.ok(questions.length >= 30, `unit ${unit}`);
      assert.equal(ALL_UNITS.find(u => u.id === unit)?.questionsCount, questions.length, `unit ${unit} count`);
      const prompts = new Set<string>();
      for (const q of questions) {
        assert.match(q.id, new RegExp(`^${unit > 42 ? 'A2' : 'A1'}-U${unit}-C${chapter}-\\d{3}$`)); assert.equal(q.level, unit > 42 ? 'A2' : 'A1');
        assert.equal(ids.has(q.id), false); ids.add(q.id);
        const key = q.type === 'sentence-builder' ? `${q.question}:${q.answer}` : q.question;
        assert.equal(prompts.has(key), false, key); prompts.add(key);
        assert.ok(q.explanation.en && q.explanation.vi);
        if (q.options) { assert.equal(q.options.filter(o => checkAnswer(o, q.answer)).length, 1, q.question); assert.equal(new Set(q.options).size, q.options.length, q.question); }
        if (q.words) { const answer = Array.isArray(q.answer) ? q.answer[0] : q.answer; assert.deepEqual(q.words.map(normalizeAnswerText).sort(), answer.split(' ').map(normalizeAnswerText).sort()); }
      }
      const cards = LEARN_CARDS_DATA[unit]; assert.ok(cards?.length >= 6, `unit ${unit} cards`);
      for (const card of cards) { assert.ok(card.ruleEn && card.ruleVi); assert.ok(card.examples.length <= 3); for (const example of card.examples) assert.ok(example.en.includes(example.highlight!), example.en); }
    }
  });
  test(`Review Gate ${chapter} and boss ${chapter} balance Units ${a}–${c}`, () => {
    const gate = selectReviewGateQuestions({}, getReviewQuestionPool(), {}, chapter);
    assert.deepEqual(gate.map(q => q.unit).sort((x, y) => x - y), [a, a, a, b, b, b, c, c]);
    for (let i = 0; i < 10; i++) {
      const questions = getBossQuestions(10, chapter); assert.equal(new Set(questions.map(q => q.id)).size, 10);
      assert.deepEqual(questions.map(q => q.unit).sort((x, y) => x - y), [a, a, a, b, b, b, b, c, c, c]);
      for (const q of questions) { assert.equal(q.type, 'multiple-choice'); assert.ok(q.options!.some(o => checkAnswer(o, q.answer))); }
    }
    const q = getBossQuestions(10, chapter)[0];
    const state = applyQuestionResult(doneBefore(chapter), q, false, true, day, 'wrong', day);
    assert.equal(state.errorBank[q.id].source, 'boss'); assert.ok(state.startedStages?.includes(world.bossStageKey));
    assert.equal(getQuestionById(q.id)?.id, q.id);
  });
}
