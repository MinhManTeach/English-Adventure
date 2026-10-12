import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { buildDynamicSession, getDynamicPool, visibleTaskFingerprint } from '../src/engine/dynamicQuestions';
import { createDefaultState, migrateState } from '../src/services/storage';
import { prepareSessionQuestions } from '../src/engine/sessionQuestions';
import { GameProvider } from '../src/context/GameContext';
import { ChooseGame } from '../src/games/ChooseGame';
import { FillGap } from '../src/games/FillGap';
import { PictureMatch } from '../src/games/PictureMatch';
import { ErrorHunter } from '../src/games/ErrorHunter';
import { TimeAttack } from '../src/games/TimeAttack';
const seeded=(seed=24)=>()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
for(const unit of [1,2,3,4,5,6]) test(`Unit ${unit}: fair curriculum quotas survive repeated sessions and saved histories`,{timeout:30000},()=>{ // 20 sessions x 3 stages; needs more than the 5s default on slower machines
  for(const stage of ['practice','minigame','challenge'] as const) {
    let state=createDefaultState();const rng=seeded(unit),concepts=[...new Set(getDynamicPool(unit,stage).map(q=>q.conceptId!))];
    const absences=new Map(concepts.map(c=>[c,0]));
    for(let i=0;i<20;i++) {
      const built=buildDynamicSession(state,unit,stage,6,rng);
      assert.equal(built.questions.length,6);
      assert.equal(new Set(built.questions.map(visibleTaskFingerprint)).size,6);
      assert.equal(new Set(built.questions.map(q=>q.contextKey)).size,6);
      for(const concept of concepts){const absent=built.questions.some(q=>q.conceptId===concept)?0:absences.get(concept)!+1;absences.set(concept,absent);assert.ok(absent<=5,`${concept} absent for ${absent} sessions`);}
      for(const subject of new Set(built.questions.map(q=>q.subjectKey).filter(Boolean))) assert.ok(built.questions.filter(q=>q.subjectKey===subject).length<=3);
      state=migrateState({...state,recentQuestionHistory:built.history});
    }
  }
});
for(const unit of [1,2,3,4,5,6]) test(`Unit ${unit}: mixed-stage transitions avoid immediately previous semantic contexts`,()=>{
  let state=createDefaultState();const rng=seeded(unit+100);let previous=new Set<string>(), previousFamilies=new Set<string>();
  for(let cycle=0;cycle<10;cycle++) for(const stage of ['practice','minigame','challenge'] as const) {
    const built=buildDynamicSession(state,unit,stage,6,rng);
    assert.ok(built.questions.filter(q=>previous.has(q.contextKey!)).length<=2);
    assert.ok(built.questions.filter(q=>previousFamilies.has(q.contextFamilyKey ?? q.contextKey!)).length<=2);
    previousFamilies=new Set(built.questions.map(q=>q.contextFamilyKey ?? q.contextKey!));
    previous=new Set(built.questions.map(q=>q.contextKey!));state={...state,recentQuestionHistory:built.history};
  }
});
test('Visible fingerprints ignore hidden identity but retain displayed context and task demand',()=>{
  const q=getDynamicPool(5,'minigame').find(q=>q.subPrompt)!;
  const projected={...q,type:'time-attack' as const};
  assert.equal(visibleTaskFingerprint(projected),visibleTaskFingerprint({...projected,id:'different',variantId:'different',contextKey:'hidden',options:[...q.options!].reverse()}));
  assert.notEqual(visibleTaskFingerprint(projected),visibleTaskFingerprint({...projected,subPrompt:'A different displayed situation.'}));
});
test('Challenge pre-answer audio is absent in every choice engine; Practice scaffolding remains',()=>{
  const question=buildDynamicSession(createDefaultState(),5,'challenge',1,seeded()).questions[0];
  for(const Engine of [ChooseGame,FillGap,PictureMatch,ErrorHunter,TimeAttack]) {
    const render=(disabled:boolean)=>renderToStaticMarkup(<GameProvider><Engine question={{...question,disablePreAnswerAudio:disabled}} onNext={()=>{}} onAnswerSubmit={()=>{}} /></GameProvider>);
    assert.doesNotMatch(render(true),/aria-label="Listen to /);
    assert.match(render(false),/aria-label="Listen to /);
  }
  for(const unit of [1,2,3,4,5,6]) assert.ok(buildDynamicSession(createDefaultState(),unit,'challenge',6,seeded()).questions.every(q=>q.disablePreAnswerAudio));
});
test('Time Attack actually renders the context needed for a short-answer/repair task',()=>{
  const question=getDynamicPool(5,'minigame').find(q=>q.subPrompt?.includes('Answer yes:'))!;
  const html=renderToStaticMarkup(<GameProvider><TimeAttack question={question} onNext={()=>{}} onAnswerSubmit={()=>{}} /></GameProvider>);
  assert.match(html,/Answer yes:/);assert.ok(html.includes(question.subPrompt!.replace(/&/g,'&amp;')));
});
test('Taught short-answer polarity, never and spelling transformations occur in generated practice',()=>{
  const unit2=getDynamicPool(2,'practice');assert.ok(unit2.some(q=>q.audioText?.startsWith('No,') && q.conceptId?.endsWith('.short-answer')));assert.ok(unit2.some(q=>q.audioText?.startsWith('Yes,') && q.conceptId?.endsWith('.short-answer')));
  assert.ok(getDynamicPool(4,'practice').some(q=>q.audioText?.includes(' never ')));
  const spelling=getDynamicPool(5,'practice').filter(q=>q.conceptId?.endsWith('.ing-spelling'));
  for(const [base,correct] of [['make','making'],['run','running'],['swim','swimming']]) assert.ok(spelling.some(q=>q.answer===correct && q.options?.includes(base+'ing')));
});
test('Unit 6 applies different interests/leisure situations and all taught speaker perspectives',()=>{
  const pool=getDynamicPool(6,'practice');
  assert.ok(new Set(pool.map(q=>q.contextKey)).size>=24);
  for(const subject of ['I','you','he','she','we','they','the children','your sister','Lan']) assert.ok(pool.some(q=>q.subjectKey===subject));
  const hobby=pool.find(q=>q.topic==='hobbies')!,leisure=pool.find(q=>q.topic==='leisure-activities' && q.answer===hobby.answer)!;
  assert.notEqual(hobby.contextKey,leisure.contextKey);assert.notEqual(hobby.question,leisure.question);
});

test('Situation variants still avoid overusing the same taught word or hobby inside one session',()=>{
  for(const unit of [3,6]) for(const stage of ['practice','minigame','challenge'] as const) {
    const built=buildDynamicSession(createDefaultState(),unit,stage,6,seeded(unit));
    for(const family of new Set(built.questions.map(q=>q.contextFamilyKey))) assert.ok(built.questions.filter(q=>q.contextFamilyKey===family).length<=2);
  }
});

test('Word-bank questions do not consume balanced correct-answer slots',()=>{
  const choice=getDynamicPool(2,'practice')[0], builder=getDynamicPool(2,'minigame').find(q=>q.type==='sentence-builder')!;
  for(let seed=1;seed<=30;seed++) {
    const questions=prepareSessionQuestions([choice,builder,choice,choice,builder,choice],true,seeded(seed));
    const positions=questions.filter(q=>q.options).map(q=>q.options!.indexOf(String(q.answer)));
    assert.deepEqual([...positions].sort(),[0,1,2,3]);
    assert.equal(questions.filter(q=>q.words).length,2);
  }
});

test('Vocabulary Challenge application uses scene responses instead of repeating word-recognition tasks',()=>{
  for(const unit of [3,6]) {
    const applied=getDynamicPool(unit,'challenge').filter(q=>q.templateId?.endsWith('.apply'));
    assert.ok(applied.length>0);
    for(const q of applied){assert.match(String(q.answer),/[.!?]$/);assert.ok(q.options!.every(option=>/[.!?]$/.test(option)));assert.match(q.question,/Read the situation/);}
    const recognized=getDynamicPool(unit,'practice').find(q=>q.templateId?.endsWith('.choose'))!;
    const transfer=applied.find(q=>q.contextKey===recognized.contextKey)!;
    assert.notEqual(transfer.answer,recognized.answer);
  }
});
