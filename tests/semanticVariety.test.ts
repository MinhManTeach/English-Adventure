import test from 'node:test';
import assert from 'node:assert/strict';
import { ALL_WORLD_UNIT_IDS, WORLDS } from '../src/data/worlds';
import { buildDynamicSession, buildDynamicReview, buildDynamicBoss, getDynamicPool } from '../src/engine/dynamicQuestions';
import { createDefaultState, migrateState } from '../src/services/storage';
import { applyQuestionResult } from '../src/engine/progression';
const seeded = (seed = 42) => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);

test('Semantic clusters ignore subject, polarity, task mode and cosmetic time differences', () => {
  const wash = getDynamicPool(5, 'challenge').filter(q => q.contextKey === 'activity:wash|the dishes');
  assert.ok(wash.some(q => q.audioText === 'I am not washing the dishes in the kitchen now.'));
  assert.ok(wash.some(q => q.audioText === 'Are you washing the dishes in the kitchen now?'));
  assert.ok(new Set(wash.map(q => q.variantId)).size > 1);
  assert.ok(new Set(wash.map(q => q.conceptId)).size > 1);
  const routines = getDynamicPool(4, 'practice').filter(q => q.contextKey === 'activity:wash|the dishes');
  assert.ok(routines.some(q => q.audioText?.includes('every evening')));
  assert.ok(routines.some(q => q.audioText?.includes('after school')));
  assert.equal(new Set(routines.map(q => q.contextKey)).size, 1);
});
for (const unit of ALL_WORLD_UNIT_IDS) {
  // Twelve seeds x three stages build many sessions; slower machines need more than the 5s default.
  test(`Unit ${unit}: six questions diversify contexts without dropping eligible concepts`, { timeout: 30000 }, () => {
    for (const stage of ['practice', 'minigame', 'challenge'] as const) for (let seed = 1; seed <= 12; seed++) {
      const session = buildDynamicSession(createDefaultState(), unit, stage, 6, seeded(seed));
      assert.equal(session.questions.length, 6);
      assert.equal(new Set(session.questions.map(q => q.variantId)).size, 6);
      assert.equal(new Set(session.questions.map(q => q.contextKey)).size, 6);
      const concepts = new Set(getDynamicPool(unit, stage).map(q => q.conceptId));
      assert.equal(new Set(session.questions.map(q => q.conceptId)).size, Math.min(6, concepts.size));
      if ([2, 4, 5, 7, 8, 10, 11, 13, 14].includes(unit)) assert.ok(new Set(session.questions.map(q => q.subjectKey)).size >= 4);
    }
  });
  test(`Unit ${unit}: consecutive sessions use all available new contexts before necessary recycling`, { timeout: 30000 }, () => {
    for (const [firstStage, secondStage] of [['practice', 'practice'], ['practice', 'minigame'], ['minigame', 'challenge']] as const) for (let seed = 1; seed <= 12; seed++) {
      const rng = seeded(seed), state = createDefaultState();
      const first = buildDynamicSession(state, unit, firstStage, 6, rng);
      const second = buildDynamicSession(migrateState({ ...state, recentQuestionHistory: first.history }), unit, secondStage, 6, rng);
      const firstContexts = new Set(first.questions.map(q => q.contextKey));
      const overlap = second.questions.filter(q => firstContexts.has(q.contextKey)).length;
      // Expanded compatible families now permit a disjoint immediate next session.
      assert.equal(overlap, 0);
      assert.equal(new Set(second.questions.map(q => q.contextKey)).size, 6);
    }
  });
}
test('Grammar coverage outranks semantic novelty when a required concept has only one context', () => {
  const state = createDefaultState();
  const question = getDynamicPool(2, 'practice').find(q => q.conceptId === 'unit2.present-simple.negative')!;
  state.recentQuestionHistory = { 2: { variantIds: [], templateIds: [], cycleVariantIds: [], contextKeys: [question.contextKey!], lastSessionContextKeys: [question.contextKey!] } };
  const restricted = (q: typeof question) => q.conceptId !== question.conceptId || q.contextKey === question.contextKey;
  const session = buildDynamicSession(state, 2, 'practice', 6, seeded(), 'coverage', restricted);
  assert.ok(session.questions.some(q => q.conceptId === question.conceptId));
  assert.equal(new Set(session.questions.map(q => q.conceptId)).size, 4);
});
test('Tiny pools recycle contexts gracefully and still never duplicate exact variants', () => {
  let state = createDefaultState(); const rng = seeded();
  for (let i = 0; i < 10; i++) {
    const session = buildDynamicSession(state, 5, 'practice', 6, rng, `tiny-${i}`, q => q.contextKey === 'activity:wash|the dishes');
    assert.equal(session.questions.length, 6);
    assert.equal(new Set(session.questions.map(q => q.variantId)).size, 6);
    assert.equal(new Set(session.questions.map(q => q.contextKey)).size, 1);
    state = { ...state, recentQuestionHistory: session.history };
  }
});
test('Fresh review changes context, retains the weak concept and preserves three-variant recovery', () => {
  const original = getDynamicPool(5, 'practice').find(q => q.conceptId === 'unit5.present-continuous.affirmative' && q.contextKey === 'activity:wash|the dishes')!;
  let state = applyQuestionResult(createDefaultState(), original, false, false, '2026-10-04T00:00:00Z', 'is');
  const key = `concept:${original.conceptId}`;
  assert.equal(state.errorBank[key].originalContextKey, original.contextKey);
  const usedContexts = new Set([original.contextKey]);
  for (let i = 0; i < 3; i++) {
    const review = buildDynamicReview(state, undefined, seeded(i + 1));
    const q = review.questions.find(q => q.reviewOf?.includes(key))!;
    assert.equal(q.conceptId, original.conceptId);
    assert.ok(!usedContexts.has(q.contextKey)); usedContexts.add(q.contextKey);
    state = { ...state, recentQuestionHistory: review.history };
    state = applyQuestionResult(state, q, true, false, `2026-10-04T00:0${i + 1}:00Z`, undefined, undefined, 'review');
    state = migrateState(JSON.parse(JSON.stringify(state)));
    assert.equal(state.errorBank[key].lastReviewContextKey, q.contextKey);
    assert.equal(state.errorBank[key].reviewCorrectStreak, i + 1);
  }
  assert.equal(state.errorBank[key].mastered, true);
  assert.equal(state.errorBank[key].recoveryVariantIds!.length, 3);
  assert.equal(state.errorBank[key].questionText, original.question);
});
test('Older generated mistakes infer their original context without rewriting saved progress', () => {
  const original = getDynamicPool(5, 'practice').find(q => q.contextKey === 'activity:wash|the dishes')!;
  const state = applyQuestionResult(createDefaultState(), original, false, false, '2026-10-04T00:00:00Z');
  const key = `concept:${original.conceptId}`; delete state.errorBank[key].originalContextKey;
  const before = JSON.stringify(state);
  const q = buildDynamicReview(state, undefined, seeded()).questions.find(q => q.reviewOf?.includes(key))!;
  assert.notEqual(q.contextKey, original.contextKey); assert.equal(q.conceptId, original.conceptId);
  assert.equal(JSON.stringify(state), before);
});
test('Context migration adds bounded defaults, retains previous session and preserves player state', () => {
  const old = { ...createDefaultState(), xp: 1234, coins: 456, bossDefeated: true, recentQuestionHistory: { 5: { variantIds: ['variant'], templateIds: ['template'], cycleVariantIds: ['variant'] } } };
  const migrated = migrateState(old);
  assert.deepEqual(migrated.recentQuestionHistory![5].contextKeys, []);
  assert.deepEqual(migrated.recentQuestionHistory![5].lastSessionContextKeys, []);
  assert.equal(migrated.xp, 1234); assert.equal(migrated.coins, 456); assert.equal(migrated.bossDefeated, true);
  const withHistory = buildDynamicSession(migrated, 5, 'practice', 6, seeded());
  const reloaded = migrateState({ ...migrated, recentQuestionHistory: withHistory.history });
  assert.deepEqual(reloaded.recentQuestionHistory![5].lastSessionContextKeys, withHistory.history[5].lastSessionContextKeys);
  const bounded = migrateState({ ...migrated, recentQuestionHistory: { 5: { ...withHistory.history[5], contextKeys: [...Array(50).fill('context'), 17], lastSessionContextKeys: null } } });
  assert.equal(bounded.recentQuestionHistory![5].contextKeys!.length, 24);
  assert.deepEqual(bounded.recentQuestionHistory![5].lastSessionContextKeys, []);
  assert.deepEqual(migrateState(bounded), bounded);
});
test('Composite review and Boss histories retain each unit’s complete last-session context set', () => {
  for (const build of [buildDynamicReview, buildDynamicBoss]) for (const chapter of WORLDS.map(w => w.chapter)) {
    const session = build(createDefaultState(), chapter, seeded());
    for (const unit of new Set(session.questions.map(q => q.unit))) assert.deepEqual(new Set(session.history[unit].lastSessionContextKeys), new Set(session.questions.filter(q => q.unit === unit).map(q => q.contextKey)));
  }
});

test('A later mistake does not relabel an older record’s original semantic context', () => {
  const pool = getDynamicPool(5, 'practice');
  const original = pool.find(q => q.contextKey === 'activity:wash|the dishes')!;
  let state = applyQuestionResult(createDefaultState(), original, false, false, '2026-10-04T00:00:00Z');
  const key = `concept:${original.conceptId}`; delete state.errorBank[key].originalContextKey;
  const later = pool.find(q => q.conceptId === original.conceptId && q.contextKey !== original.contextKey)!;
  state = applyQuestionResult(state, later, false, false, '2026-10-04T01:00:00Z');
  assert.equal(state.errorBank[key].originalContextKey, undefined);
  assert.equal(state.errorBank[key].originalVariantId, original.variantId);
  assert.equal(state.errorBank[key].lastContextKey, later.contextKey);
  const q = buildDynamicReview(state, undefined, seeded()).questions.find(q => q.reviewOf?.includes(key))!;
  assert.notEqual(q.contextKey, original.contextKey); assert.notEqual(q.contextKey, later.contextKey);
  assert.equal(q.conceptId, original.conceptId);
});
