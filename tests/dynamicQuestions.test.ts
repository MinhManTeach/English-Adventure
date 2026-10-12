import test from 'node:test';
import assert from 'node:assert/strict';
import { buildDynamicSession, buildDynamicReview, buildDynamicBoss, getDynamicPool, validateGeneratedQuestion } from '../src/engine/dynamicQuestions';
import { QUESTION_TEMPLATES, renderTemplate, validateControlledFrame } from '../src/data/templates/questionTemplates';
import { createDefaultState, migrateState } from '../src/services/storage';
import { applyQuestionResult } from '../src/engine/progression';
import { prepareSessionQuestions } from '../src/engine/sessionQuestions';
import { SUBJECTS, ACTIVITIES } from '../src/data/templates/controlledPools';
import { ALL_WORLD_UNIT_IDS, WORLDS, getWorld } from '../src/data/worlds';
const seeded = (seed = 42) => () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const ids = (questions: ReturnType<typeof buildDynamicSession>['questions']) => questions.map(q => q.variantId!);
for (const unit of [1,2,3,4,5,6,7,8,9,10,11,12]) {
  test(`Unit ${unit}: unique fresh stages, viable templates, stable snapshots`, () => {
    let state = createDefaultState(); const rng = seeded(unit), used = new Set<string>();
    assert.ok((QUESTION_TEMPLATES.filter(t => t.unitId === unit).length) >= (5));
    for (const stage of ['practice','minigame','challenge'] as const) {
      const session = buildDynamicSession(state, unit, stage, 6, rng, `${unit}-${stage}`);
      assert.equal(session.questions.length, 6);
      assert.equal(new Set(ids(session.questions)).size, 6);
      for (const q of session.questions) { assert.equal(used.has(q.variantId!), false); used.add(q.variantId!); }
      const snapshot = JSON.stringify(session.questions);
      state = { ...state, recentQuestionHistory: session.history };
      buildDynamicSession(state, unit, stage, 6, rng);
      assert.equal(JSON.stringify(session.questions), snapshot);
      if (stage === 'minigame' && unit >= 4) {
        assert.equal(session.questions.filter(q => q.type === 'sentence-builder').length, 2);
        assert.equal(session.questions.filter(q => q.type === 'time-attack').length, 4);
      }
    }
  });
}
test('Ten seeded six-question Practice replays use 60 different variants when the pool permits', () => {
  for (const unit of ALL_WORLD_UNIT_IDS.filter(unit => unit !== 6)) {
    let state = createDefaultState(); const rng = seeded(unit), seen = new Set<string>();
    for (let i=0;i<10;i++) { const session = buildDynamicSession(state,unit,'practice',6,rng); session.questions.forEach(q => {assert.equal(seen.has(q.variantId!), false);seen.add(q.variantId!);}); state={...state,recentQuestionHistory:session.history}; }
    assert.equal(seen.size, 60); assert.equal(state.recentQuestionHistory![unit].variantIds.length, 50);
  }
});
test('Exhaustion is bounded and never duplicates within a small eligible pool', () => {
  const q = getDynamicPool(1,'practice')[0];
  const session=buildDynamicSession(createDefaultState(),1,'practice',99,seeded(), 'small', x=>x.variantId===q.variantId);
  assert.equal(session.questions.length, 1);
  assert.deepEqual(buildDynamicSession(createDefaultState(),1,'practice',6,seeded(),'empty',()=>false).questions, []);
});
test('Every rendered template has exactly one correct choice or a reconstructible word bank',()=>{
  for(const t of QUESTION_TEMPLATES) for(const frame of t.frames) {
    const q=renderTemplate(t,frame);assert.equal(validateGeneratedQuestion(q), true);
    const shuffled=prepareSessionQuestions([q],false,seeded())[0];
    if(shuffled.options) {assert.equal(new Set(shuffled.options).size, shuffled.options.length);assert.equal(shuffled.options.filter(x=>x===shuffled.answer).length, 1);}
    else assert.deepEqual([...shuffled.words!].sort(), String(shuffled.answer).split(' ').sort());
  }
});
test('Controlled grammar frames enforce agreement, number and compatible activities',()=>{
  for(const t of QUESTION_TEMPLATES) for(const f of t.frames) {
    assert.equal(/[.!?]$/.test(f.correct), true);assert.equal(/\s[,.!?]|[!?]{2}/.test(f.correct), false);
    if(t.topic==='there-is-there-are') assert.equal(f.correct.startsWith(f.correct.includes(' one ')?'There is ':'There are '), true);
    if(t.topic==='demonstratives') assert.equal(/^(This|That) is my |^(These|Those) are my /.test(f.correct), true);
    if(t.topic==='present-simple' && t.id.includes('.question.')) {
      const [,i,j]=f.key.split('-'); // question-i-j-time
      const subject=SUBJECTS[Number(i)], activity=ACTIVITIES[Number(j)];
      assert.equal(f.correct.startsWith(`${subject.third?'Does':'Do'} ${subject.text} ${activity.base} ${activity.object}`), true);
    }
  }
});
test('Generated mistakes aggregate by concept, preserving the original mistake and Boss source',()=>{
  const first=buildDynamicSession(createDefaultState(),2,'practice',1,seeded()).questions[0];
  let state=applyQuestionResult(createDefaultState(),first,false,false,'2026-10-04T00:00:00Z','wrong',undefined,'boss');
  const second=buildDynamicSession(state,2,'challenge',1,seeded(99),'next',q=>q.conceptId===first.conceptId && q.variantId!==first.variantId).questions[0];
  state=applyQuestionResult(state,second,false,false,'2026-10-04T01:00:00Z','later');
  const error=state.errorBank[`concept:${first.conceptId}`];
  assert.equal(Object.keys(state.errorBank).length, 1);assert.equal(error.wrongCount, 2);assert.equal(error.questionText, first.question);assert.equal(error.originalVariantId, first.variantId);assert.equal(error.source, 'boss');
  assert.equal(state.conceptMastery![first.conceptId!].totalAttempts, 2);
});
test('Three distinct fresh concept reviews recover; duplicate variants and original variants do not',()=>{
  const original=buildDynamicSession(createDefaultState(),1,'practice',1,seeded()).questions[0];
  let state=applyQuestionResult(createDefaultState(),original,false,false,'2026-10-04T00:00:00Z');
  const key=`concept:${original.conceptId}`;
  state=applyQuestionResult(state,{...original,reviewOf:[key]},true,false,'2026-10-04T00:01:00Z',undefined,undefined,'review');
  assert.equal(state.errorBank[key].reviewCorrectStreak, 0);
  for(let i=0;i<3;i++) {
    const session=buildDynamicReview(state,undefined,seeded(i+4));const q=session.questions.find(q=>q.reviewOf?.includes(key))!;
    assert.equal(q.conceptId, original.conceptId);assert.notEqual(q.variantId, original.variantId);
    state={...state,recentQuestionHistory:session.history};state=applyQuestionResult(state,q,true,false,`2026-10-04T00:0${i+2}:00Z`,undefined,undefined,'review');
    state=applyQuestionResult(state,{...q,questionInstanceId:`repeated-${i}`},true,false,'2026-10-04T00:09:00Z',undefined,undefined,'review');
    assert.equal(state.errorBank[key].reviewCorrectStreak, i+1);assert.equal(state.errorBank[key].mastered, i===2);
    state=migrateState(JSON.parse(JSON.stringify(state)));
  }
  assert.equal(state.errorBank[key].recoveryVariantIds!.length, 3);
});
test('Failed fresh review resets recovery and preserves history without a second error card',()=>{
  const original=buildDynamicSession(createDefaultState(),4,'practice',1,seeded()).questions[0];
  let state=applyQuestionResult(createDefaultState(),original,false,false,'2026-10-04T00:00:00Z');const key=`concept:${original.conceptId}`;
  const q=buildDynamicReview(state,undefined,seeded()).questions.find(q=>q.reviewOf?.includes(key))!;
  state=applyQuestionResult(state,q,true,false,'2026-10-04T01:00:00Z',undefined,undefined,'review');
  state=applyQuestionResult(state,q,false,false,'2026-10-04T02:00:00Z','wrong',undefined,'review');
  assert.equal(state.errorBank[key].reviewCorrectStreak, 0);assert.equal(state.errorBank[key].wrongCount, 2);assert.equal(state.errorBank[key].recoveryVariantIds!.length, 1);assert.equal(Object.keys(state.errorBank).length, 1);
});
for(const chapter of WORLDS.map(w=>w.chapter)) test(`Dynamic Boss ${chapter} preserves ten spells, balance, options and fresh replays`,()=>{
  let state=createDefaultState();const rng=seeded(chapter), first=buildDynamicBoss(state,chapter,rng);state={...state,recentQuestionHistory:first.history};const second=buildDynamicBoss(state,chapter,rng);
  assert.equal(first.questions.length, 10);assert.equal(new Set(ids(first.questions)).size, 10);
  assert.deepEqual(first.questions.map(q=>q.unit).sort((a,b)=>a-b), getWorld(chapter).bossQuota.flatMap(([unit,count])=>Array(count).fill(unit)));
  for(const q of first.questions) {assert.equal(q.type, 'multiple-choice');assert.equal(q.options!.filter(x=>x===q.answer).length, 1);assert.ok(!(ids(second.questions)).includes(q.variantId!));}
});
test('Additive history migration preserves progress and rejects malformed/bloated history',()=>{
  const old={...createDefaultState(),xp:1234,coins:456,bossDefeated:true,completedUnits:[1,2,3],recentQuestionHistory:{1:{variantIds:Array(80).fill('valid'),templateIds:[3,'template'],cycleVariantIds:null}}};
  const state=migrateState(old);assert.equal(state.xp, 1234);assert.equal(state.coins, 456);assert.equal(state.bossDefeated, true);assert.equal(state.recentQuestionHistory!['1'].variantIds.length, 50);assert.deepEqual(state.recentQuestionHistory!['1'].templateIds, ['template']);assert.deepEqual(state.recentQuestionHistory!['1'].cycleVariantIds, []);assert.deepEqual(migrateState(state), state);
});
test('Stage-specific providers offer manipulation and mixed independent application',()=>{
  for(const unit of ALL_WORLD_UNIT_IDS) {
    const practice=buildDynamicSession(createDefaultState(),unit,'practice',6,seeded()).questions;
    assert.equal(practice.every(q=>q.difficulty<=2), true);
    const mini=buildDynamicSession(createDefaultState(),unit,'minigame',6,seeded()).questions;
    assert.equal(mini.some(q=>q.type==='sentence-builder'), true);
    const challenge=buildDynamicSession(createDefaultState(),unit,'challenge',6,seeded()).questions;
    assert.ok((new Set(challenge.map(q=>q.type)).size) >= (2));
  }
});

test('Legacy Unit 0 Boss mistakes and old topic aliases receive fresh concept reviews',()=>{
  for (const [topic, unit] of [['verb-to-be-questions',1],['it-is',1],['present-simple-questions',2],['home-parts',3],['sentence-builder',2]] as const) {
    const state=createDefaultState();state.errorBank.legacy={questionId:'BOSS-OLD',unit:0,topic,skill:topic.startsWith('home-')?'vocabulary':'grammar',questionText:'Historical mistake',wrongCount:2,lastWrongAt:'2026-10-04',mastered:false};
    const q=buildDynamicReview(state,undefined,seeded()).questions.find(q=>q.reviewOf?.includes('legacy'))!;assert.notEqual(q, undefined);assert.equal(q.unit, unit);
  }
});
test('Dynamic Review Gates retain 3/3/2 balance and Chapter 2 tense contrast',()=>{
  for(const chapter of WORLDS.map(w=>w.chapter)) {const session=buildDynamicReview(createDefaultState(),chapter,seeded());assert.equal(session.questions.length, 8);assert.equal(new Set(ids(session.questions)).size, 8);if(chapter===2)assert.equal(session.questions.some(q=>q.topic==='present-simple-vs-continuous'), true);}
  assert.equal(buildDynamicBoss(createDefaultState(),2,seeded()).questions.filter(q=>q.topic==='present-simple-vs-continuous').length, 2);
});
test('Quality guards reject malformed punctuation, agreement and number',()=>{
  for(const topic of ['verb-to-be','there-is-there-are','demonstratives','present-simple']) {
    const t=QUESTION_TEMPLATES.find(t=>t.topic===topic && (topic!=='present-simple'||t.id.includes('.question.')))!;const f=t.frames[0];assert.equal(validateControlledFrame(t,f), true);assert.equal(validateControlledFrame(t,{...f,correct:'Broken sentence !'}), false);
  }
  const t=QUESTION_TEMPLATES.find(t=>t.topic==='there-is-there-are')!;assert.equal(validateControlledFrame(t,{...t.frames[0],correct:'There are one book on the desk.'}), false);
});
