import { Question, GameQuestionType } from '../../types';
import { HOME_WORDS, HOME_ACTIONS } from '../A1/world1Expansion';
import { SUBJECTS, ACTIVITIES, CONTINUOUS_ACTIVITIES, ROUTINE_TIMES, COUNTED_OBJECTS, HOBBIES } from './controlledPools';

import { HOME_SITUATIONS, HOME_RESPONSES } from './homeSituations';
import { LEISURE_SITUATIONS } from './leisureSituations';
import { HABIT_MARKERS, NOW_MARKERS, STATIVE_VERBS, PAST_VERBS, PAST_TIMES, PAST_SPELLING_RULES } from './chapter3Pools';
import { SCHOOL_WORDS } from './schoolLife';
import type { VocabWord } from '../chapters/shared';
import { addLaterChapterTemplates } from '../chapters';
import { WAS_WERE_PREDICATES, IRREGULAR_VERBS, LONG_ACTIONS, PAST_MOMENTS, INTERRUPTIONS } from './chapter4Pools';
import { FRIEND_WORDS } from './friendship';

export type StudyStage = 'practice' | 'minigame' | 'challenge';
export interface ControlledFrame {
  contextKey?: string; contextFamilyKey?: string; subjectKey?: string;
  key: string; correct: string; errors: string[]; gap: string; answer: string;
  choices: string[]; clue: string; en: string; vi: string; icon?: string;
}
export interface QuestionTemplate {
  id: string; conceptId: string; unitId: number; topic: string; skill: Question['skill'];
  mode: 'gap' | 'choose' | 'build' | 'repair' | 'apply'; stages: StudyStage[];
  frames: readonly ControlledFrame[];
}
const cap = (value: string) => value[0].toUpperCase() + value.slice(1);
const templates: QuestionTemplate[] = [];
function register(unit: number, topic: string, family: string, frames: ControlledFrame[], vocabulary = false) {
  const modes = ['gap', 'choose', 'build', 'repair', 'apply'] as const;
  for (const mode of modes) templates.push({ id: `u${unit}.${topic}.${family}.${mode}`, conceptId: `unit${unit}.${topic}${unit >= 7 || ['verb-to-be','present-simple','present-continuous'].includes(topic) ? '.' + (family === 'plural-statement' ? 'statement' : family) : ''}`,
    unitId: unit, topic, skill: vocabulary ? 'vocabulary' : 'grammar', mode,
    stages: mode === 'gap' || mode === 'choose' ? ['practice', 'challenge'] : mode === 'build' || mode === 'repair' ? ['minigame', 'challenge'] : ['challenge'], frames });
}
function frame(key: string, correct: string, errors: string[], gap: string, answer: string, choices: string[], clue: string, en: string, vi: string): ControlledFrame {
  return { key, correct, errors, gap, answer, choices: [answer, ...choices.filter(choice => choice !== answer)], clue, en, vi };
}
/** Coarse context deliberately ignores grammar form, pronoun and cosmetic time changes. */
function withContext(f: ControlledFrame, contextKey: string, subjectKey?: string): ControlledFrame {
  return { ...f, contextKey, subjectKey };
}
// Unit 1: be agreement, negative forms, questions and short answers already taught in Learn.
for (const form of ['statement', 'negative', 'question', 'short-answer', 'plural-statement']) {
  const frames: ControlledFrame[] = [];
  for (const [i, subject] of SUBJECTS.entries()) for (const [j, predicate] of ['happy', 'ready', 'at school', 'in the garden', 'at home', 'tired', 'hungry', 'brave', 'on my team', 'in the school library', 'at the gate', 'with my teacher'].entries()) {
    if (form === 'plural-statement' && subject.be !== 'are') continue;
    const s = cap(subject.text), b = subject.be;
    let correct = `${s} ${b} ${predicate}.`, gap = `${s} ___ ${predicate}.`, answer: string = b;
    let errors = ['am', 'is', 'are', 'be'].filter(x => x !== b).map(x => `${s} ${x} ${predicate}.`);
    let clue = `Complete: ${s} ___ ${predicate}.`;
    if (form === 'negative') { correct = `${s} ${b} not ${predicate}.`; gap = `${s} ___ not ${predicate}.`; errors = ['am','is','are','be'].filter(x=>x!==b).map(x=>`${s} ${x} not ${predicate}.`); clue = `Say no. Complete: ${s} ___ not ${predicate}.`; }
    if (form === 'question') { correct = `${cap(b)} ${subject.text} ${predicate}?`; gap = `___ ${subject.text} ${predicate}?`; errors = ['am','is','are','be'].filter(x=>x!==b).map(x=>`${cap(x)} ${subject.text} ${predicate}?`); clue = `Ask a question: ___ ${subject.text} ${predicate}?`; }
    if (form === 'short-answer') { const pronoun = subject.pronoun === 'you' ? 'I' : subject.pronoun; answer = pronoun === 'I' ? 'am' : pronoun === 'they' || pronoun === 'we' ? 'are' : 'is'; correct = `Yes, ${pronoun} ${answer}.`; gap = `${cap(b)} ${subject.text} ${predicate}? Yes, ${pronoun} ___.`; errors = ['am','is','are','be'].filter(x=>x!==answer).map(x=>`Yes, ${pronoun} ${x}.`); clue = `Answer yes: ${cap(b)} ${subject.text} ${predicate}?`; }
    frames.push(withContext(frame(`${form}-${i}-${j}`, correct, errors, gap, answer, ['am','is','are','be'], clue, `Choose am, is or are to agree with the subject. ${correct}`, 'Chọn am, is hoặc are đúng với chủ ngữ.'), `state:${predicate}`, subject.text));
  }
  register(1, 'verb-to-be', form, frames);
}
for (const kind of ['counted-scene', 'count-to-sentence']) {
  const frames: ControlledFrame[] = [];
  for (const [i, noun] of COUNTED_OBJECTS.entries()) for (const n of [1,2,3,4,5]) {
    const phrase = `${n === 1 ? 'one ' + noun.one : n + ' ' + noun.many} ${noun.place}`, b = n === 1 ? 'is' : 'are';
    const correct = `There ${b} ${phrase}.`, wrong = `There ${b === 'is' ? 'are' : 'is'} ${phrase}.`;
    const clue = `${cap(noun.place)}: ${n} ${n === 1 ? noun.one : noun.many}. Use There is / There are.`;
    frames.push(withContext(frame(`${kind}-${i}-${n}`,correct,[wrong,`Is there ${phrase}.`,`There ${phrase} ${b}.`],`${kind === 'count-to-sentence' ? clue + ' ' : ''}There ___ ${phrase}.`,b,['is','are','is there','are there'],clue,`${n === 1 ? 'One object takes there is.' : 'More than one object takes there are.'} ${correct}`,'Một vật dùng there is; nhiều vật dùng there are.'), `object:${noun.one}`));
  }
  register(1,'there-is-there-are',kind,frames);
}
for (const near of [true,false]) {
  const frames: ControlledFrame[] = [];
  for (const [i,noun] of COUNTED_OBJECTS.entries()) for (const n of [1,2,3,4]) {
    const answer = n === 1 ? near ? 'this' : 'that' : near ? 'these' : 'those';
    const correct = `${cap(answer)} ${n === 1 ? 'is my ' + noun.one : 'are my ' + noun.many}.`;
    const clue = `${n} ${n===1?noun.one:noun.many} ${near ? 'close to you' : 'far from you'}.`;
    frames.push(withContext(frame(`${near?'near':'far'}-${i}-${n}`,correct,['this','that','these','those'].filter(x=>x!==answer).map(x=>`${cap(x)} ${n===1?'is my '+noun.one:'are my '+noun.many}.`),`${clue} ___ ${n===1?'is my '+noun.one:'are my '+noun.many}.`,cap(answer),['This','That','These','Those'],clue,`Use ${answer} for ${n===1?'one object':'several objects'} ${near?'nearby':'far away'}.`,'Chọn theo số lượng và khoảng cách: this/these gần; that/those xa.'), `object:${noun.one}`));
  }
  register(1,'demonstratives',near?'near':'far',frames);
}
register(1,'its-it-is','weather-time', [...['sunny','rainy','windy','cold','hot','cloudy'].flatMap(weather => ['today','this morning','here'].map(context => `${weather} ${context}`)), 'seven o’clock', 'time for school', 'a purple kite', 'a coin', 'a boat', 'a flag'].map((description,i)=>withContext(frame(`its-${i}`,`It's ${description}.`,[`Its ${description}.`,`It ${description}.`,`There ${description}.`],`___ ${description}.`,"It's",['Its','It','There'],`Complete the description: ___ ${description}.`,`It's means it is. It's ${description}.`,"It’s là dạng viết ngắn của it is."), description.startsWith('a ') ? `object:${description.split(' ').at(-1)}` : `weather-time:${description.replace(/ (today|this morning|here)$/, '')}`)));

// Present Simple: affirmative, negative, questions, short answers, frequency.
for (const unit of [2,4]) for (const form of ['affirmative','negative','question','short-answer', ...(unit===4?['frequency']:[])]) {
  const frames: ControlledFrame[] = [];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of ACTIVITIES.entries()) for (const [t,time] of ROUTINE_TIMES.entries()) {
    const subject=cap(s.text), aux=s.third?'does':'do', neg=s.third?"doesn't":"don't", verb=s.third?v.third:v.base;
    const clause=`${v.object} ${time}`; let correct=`${subject} ${verb} ${clause}.`, answer: string=verb, gap=`${subject} ___ ${clause}.`;
    let errors=[`${subject} ${s.third?v.base:v.third} ${clause}.`,`${subject} ${v.ing} ${clause}.`,`${subject} ${aux} ${v.third} ${clause}.`];
    let choices=[s.third?v.base:v.third,v.ing,`${aux} ${v.third}`], clue=`Complete the routine: ${subject} ___ ${clause}.`;
    if (form==='negative') {correct=`${subject} ${neg} ${v.base} ${clause}.`;answer=neg;gap=`${subject} ___ ${v.base} ${clause}.`;choices=[s.third?"don't":"doesn't",`${s.be} not`,'not'];errors=choices.map(x=>`${subject} ${x} ${v.base} ${clause}.`);clue=`Make a negative sentence: ${subject} ___ ${v.base} ${clause}.`;}
    if (form==='question') {correct=`${cap(aux)} ${s.text} ${v.base} ${clause}?`;answer=cap(aux);gap=`___ ${s.text} ${v.base} ${clause}?`;choices=['Do','Does','Am','Is','Are'].filter(x=>x!==answer).slice(0,3);errors=[`${s.third?'Do':'Does'} ${s.text} ${v.base} ${clause}?`,`${cap(aux)} ${s.text} ${v.third} ${clause}?`,`${cap(s.be)} ${s.text} ${v.base} ${clause}?`];clue=`Make a question: ___ ${s.text} ${v.base} ${clause}?`;}
    if (form==='short-answer') {const pronoun=s.pronoun==='you'?'I':s.pronoun;const yes=t%2===0, lead=yes?'Yes':'No';const a=yes?aux:neg;correct=`${lead}, ${pronoun} ${a}.`;answer=a;gap=`${cap(aux)} ${s.text} ${v.base} ${clause}? ${lead}, ${pronoun} ___.`;choices=yes?[s.third?'do':'does',s.be,neg]:[s.third?"don't":"doesn't",aux,`${s.be} not`];errors=choices.map(x=>`${lead}, ${pronoun} ${x}.`);clue=`Answer ${yes?'yes':'no'}: ${cap(aux)} ${s.text} ${v.base} ${clause}?`;}
    if (form==='frequency') {const frequency=['always','usually','sometimes','never'][(j+t)%4];correct=`${subject} ${frequency} ${verb} ${v.object} ${time}.`;gap=`${subject} ${frequency} ___ ${v.object} ${time}.`;errors=[`${subject} ${frequency} ${s.third?v.base:v.third} ${clause}.`,`${subject} ${frequency} ${v.ing} ${clause}.`,`${subject} ${frequency} ${aux} ${v.third} ${clause}.`];clue=`Complete the routine: ${subject} ${frequency} ___ ${clause}.`;}
    frames.push(withContext(frame(`${form}-${i}-${j}-${t}`,correct,errors,gap,answer,choices,clue,`${s.third?'He, she or one named person takes a third-person verb; after does use the base verb.':'I, you, we and they use the base verb with do.'} ${correct}`,'Thói quen dùng hiện tại đơn. Sau do/does dùng động từ nguyên mẫu.'), `activity:${v.base}|${v.object}`, s.text));
  }
  register(unit, form==='frequency'?'daily-routines':'present-simple',form,frames);
}
// Unit 5: actions now, plus an introductory habit-versus-now contrast.
for (const form of ['affirmative','negative','question','short-answer','ing-spelling','routine-contrast','now-contrast']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of CONTINUOUS_ACTIVITIES.entries()) {
    const subject=cap(s.text), tail=[v.object,v.now,'now'].filter(Boolean).join(' '), b=s.be;
    let correct=`${subject} ${b} ${v.ing} ${tail}.`,answer:string=b,gap=`${subject} ___ ${v.ing} ${tail}.`,choices=['am','is','are','do'].filter(x=>x!==b);
    let errors=choices.map(x=>`${subject} ${x} ${v.ing} ${tail}.`),clue=`Look! Complete: ${subject} ___ ${v.ing} ${tail}.`;
    if(form==='negative'){correct=`${subject} ${b} not ${v.ing} ${tail}.`;gap=`${subject} ___ not ${v.ing} ${tail}.`;errors=choices.map(x=>`${subject} ${x} not ${v.ing} ${tail}.`);clue=`Say no. Complete: ${subject} ___ not ${v.ing} ${tail}.`;}
    if(form==='question'){correct=`${cap(b)} ${s.text} ${v.ing} ${tail}?`;answer=cap(b);choices=['Am','Is','Are','Do'].filter(x=>x!==answer);gap=`___ ${s.text} ${v.ing} ${tail}?`;errors=choices.map(x=>`${x} ${s.text} ${v.ing} ${tail}?`);clue=`Make a question: ___ ${s.text} ${v.ing} ${tail}?`;}
    if(form==='short-answer'){const pronoun=s.pronoun==='you'?'I':s.pronoun;answer=pronoun==='I'?'am':pronoun==='we'||pronoun==='they'?'are':'is';correct=`Yes, ${pronoun} ${answer}.`;gap=`${cap(b)} ${s.text} ${v.ing} ${tail}? Yes, ${pronoun} ___.`;choices=['am','is','are','do'].filter(x=>x!==answer);errors=choices.map(x=>`Yes, ${pronoun} ${x}.`);clue=`Answer yes: ${cap(b)} ${s.text} ${v.ing} ${tail}?`;}
    if(form==='ing-spelling'){clue=`Use ${v.base} for an action now: ${subject} ${b} ___ ${tail}.`;answer=v.ing;gap=`${subject} ${b} ___ ${tail}.`;choices=[v.base,v.third,`${v.base}ing`].filter(x=>x!==answer);if(new Set(choices).size<3) choices.push('to '+v.base);errors=choices.map(x=>`${subject} ${b} ${x} ${tail}.`);}
    if(form==='routine-contrast'){answer=s.third?v.third:v.base;gap=`Every Saturday, ${s.text} ___ ${v.object || v.now}.`;correct=`Every Saturday, ${s.text} ${answer} ${v.object || v.now}.`;choices=[`${b} ${v.ing}`,s.third?v.base:v.third,`${b} ${v.base}`];errors=choices.map(x=>`Every Saturday, ${s.text} ${x} ${v.object || v.now}.`);clue=`Every Saturday describes a habit. Complete: ${s.text} ___ ${v.object || v.now}.`;}
    if(form==='now-contrast'){answer=`${b} ${v.ing}`;gap=`Look! ${subject} ___ ${tail}.`;choices=[s.third?v.third:v.base,v.ing,`${b} ${v.base}`];errors=choices.map(x=>`${subject} ${x} ${tail}.`);}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,`${form==='routine-contrast'?'Every Saturday describes a habit.':'For an action now use am/is/are + verb-ing.'} ${correct}`,'Thói quen dùng hiện tại đơn; hành động lúc này dùng am/is/are + động từ-ing.'), `activity:${v.base}|${v.object}`, s.text));
  }
  register(5,form.includes('contrast')?'present-simple-vs-continuous':'present-continuous',form,frames);
}
// Each word keeps its taught definition/translation and four authored situations.
const homeRecords = [...HOME_WORDS.map(x=>({...x,topic:x.topic})), ...HOME_ACTIONS.map(x=>({...x,topic:'home-chores',icon:'🏡'}))];
for(const topic of [...new Set(homeRecords.map(x=>x.topic))]) {
  const records=homeRecords.filter(x=>x.topic===topic);
  const frames=records.flatMap((word,i)=>HOME_SITUATIONS[word.word].map((situation,j)=>{
    const alternatives=homeRecords.filter(x=>x.word!==word.word && x.topic===topic).map(x=>x.word);
    const others=[...alternatives,...homeRecords.filter(x=>x.topic!==topic).map(x=>x.word)].slice(0,3);
    const correct = HOME_RESPONSES[word.word][j];
    const errors = others.map(other => homeRecords.find(record => record.word===other)!.example);
    const q=frame(`${word.word}-situation-${j}`,correct,errors,`${situation} Choose the word or phrase: ___.`,word.word,others,situation,`${word.word}: ${word.definition}. ${word.example}`,`${word.word}: ${word.vi}. ${word.exampleVi}`);
    q.icon=word.icon; q.contextFamilyKey=`vocabulary:${word.word}`; q.contextKey=`home:${word.word}:${j}`;
    return q;
  }));
  register(3,topic,'home-meaning',frames,true);
}
for(const topic of ['hobbies','leisure-activities']) {
  const frames: ControlledFrame[]=[];
  for(const [i,[word,meaning,vi,icon]] of HOBBIES.entries()) for(const [j,s] of SUBJECTS.entries()) {
    const opening = topic==='hobbies' ? `${cap(s.text)} ${s.third?'likes':'like'}` : `${cap(s.text)} ${s.third?'enjoys':'enjoy'}`;
    const correct=`${opening} ${word}.`, others=[3,7,11].map(offset=>HOBBIES[(i+offset)%HOBBIES.length][0]);
    const situation=topic==='hobbies' ? `You ${meaning}. This is a favourite activity.` : LEISURE_SITUATIONS[i];
    const q=frame(`${i}-${j}`,correct,others.map(x=>`${opening} ${x}.`),`${situation} ${opening} ___.`,word,others,`${situation} Complete: ${opening} ___.`,`${word}: ${meaning}. ${correct}`,`${word}: ${vi}. Sau like/enjoy dùng tên hoạt động dạng -ing.`);
    q.icon=icon; q.contextFamilyKey=`activity:${word}`; q.contextKey=`hobby:${word}:${topic==='hobbies'?'interest':'shared-task'}`; q.subjectKey=s.text; frames.push(q);
    if(topic==='hobbies' && s.text==='I') {
      frames.push({...q,key:`${i}-my-hobby`,correct:`My hobby is ${word}.`,gap:`${situation} My hobby is ___.`,clue:`${situation} Complete: My hobby is ___.`,subjectKey:'I',en:`${word}: ${meaning}. My hobby is ${word}.`});
    }
  }
  register(6,topic,'hobby-context',frames,true);
}
// Unit 7: time markers decide Present Simple (habits) or Present Continuous (now); state verbs stay simple.
for (const form of ['habit-marker','now-marker','question-choice','negative-choice','time-expression']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of ACTIVITIES.entries()) {
    const subject=cap(s.text), b=s.be, verb=s.third?v.third:v.base, other=s.third?v.base:v.third;
    const aux=s.third?'does':'do', otherAux=s.third?'Do':'Does', neg=s.third?"doesn't":"don't", beNot=b==='am'?'am not':`${b}n't`;
    const habit=HABIT_MARKERS[(i+j)%HABIT_MARKERS.length], now=NOW_MARKERS[(i+j)%NOW_MARKERS.length];
    const habitTail=`${v.object} ${habit}`, nowTail=`${v.object} ${now}`, asksHabit=(i+j)%2===0;
    let correct:string, answer:string, gap:string, choices:string[], errors:string[], clue:string, en:string, vi:string;
    if(form==='habit-marker'){answer=verb;correct=`${subject} ${verb} ${habitTail}.`;gap=`${subject} ___ ${habitTail}.`;choices=[`${b} ${v.ing}`,other,v.ing];errors=choices.map(x=>`${subject} ${x} ${habitTail}.`);clue=`"${habit}" shows a habit. Complete: ${subject} ___ ${habitTail}.`;en=`"${habit}" shows a habit, so use Present Simple. ${correct}`;vi=`"${habit}" chỉ thói quen nên dùng hiện tại đơn.`;}
    else if(form==='now-marker'){answer=`${b} ${v.ing}`;correct=`${subject} ${answer} ${nowTail}.`;gap=`${subject} ___ ${nowTail}.`;choices=[verb,`${b} ${v.base}`,v.ing];errors=choices.map(x=>`${subject} ${x} ${nowTail}.`);clue=`"${now}" shows an action happening now. Complete: ${subject} ___ ${nowTail}.`;en=`"${now}" shows an action in progress, so use am/is/are + verb-ing. ${correct}`;vi=`"${now}" chỉ việc đang diễn ra nên dùng am/is/are + động từ-ing.`;}
    else if(form==='question-choice'&&asksHabit){answer=cap(aux);correct=`${answer} ${s.text} ${v.base} ${habitTail}?`;gap=`___ ${s.text} ${v.base} ${habitTail}?`;choices=[cap(b),otherAux,b==='is'?'Are':'Is'];errors=[`${cap(b)} ${s.text} ${v.base} ${habitTail}?`,`${answer} ${s.text} ${v.ing} ${habitTail}?`,`${otherAux} ${s.text} ${v.base} ${habitTail}?`];clue=`Ask about a habit: ___ ${s.text} ${v.base} ${habitTail}?`;en=`A habit question uses Do/Does + base verb. ${correct}`;vi=`Hỏi về thói quen: Do/Does + động từ nguyên mẫu.`;}
    else if(form==='question-choice'){answer=cap(b);correct=`${answer} ${s.text} ${v.ing} ${nowTail}?`;gap=`___ ${s.text} ${v.ing} ${nowTail}?`;choices=[cap(aux),otherAux,b==='is'?'Are':'Is'];errors=[`${cap(aux)} ${s.text} ${v.ing} ${nowTail}?`,`${answer} ${s.text} ${v.base} ${nowTail}?`,`${answer} ${s.text} ${v.third} ${nowTail}?`];clue=`Ask about now: ___ ${s.text} ${v.ing} ${nowTail}?`;en=`A question about now uses Am/Is/Are + verb-ing. ${correct}`;vi=`Hỏi về việc đang diễn ra: Am/Is/Are + động từ-ing.`;}
    else if(form==='negative-choice'&&asksHabit){answer=neg;correct=`${subject} ${neg} ${v.base} ${habitTail}.`;gap=`${subject} ___ ${v.base} ${habitTail}.`;choices=[beNot,s.third?"don't":"doesn't",'not'];errors=[`${subject} ${beNot} ${v.base} ${habitTail}.`,`${subject} ${neg} ${v.third} ${habitTail}.`,`${subject} ${s.third?"don't":"doesn't"} ${v.base} ${habitTail}.`];clue=`Say no about a habit: ${subject} ___ ${v.base} ${habitTail}.`;en=`For a habit, say no with don't/doesn't + base verb. ${correct}`;vi=`Phủ định thói quen: don't/doesn't + động từ nguyên mẫu.`;}
    else if(form==='negative-choice'){answer=beNot;correct=`${subject} ${beNot} ${v.ing} ${nowTail}.`;gap=`${subject} ___ ${v.ing} ${nowTail}.`;choices=[neg,b==='is'?"aren't":"isn't",'not'];errors=[`${subject} ${neg} ${v.ing} ${nowTail}.`,`${subject} ${beNot} ${v.base} ${nowTail}.`,`${subject} not ${v.ing} ${nowTail}.`];clue=`Say no about now: ${subject} ___ ${v.ing} ${nowTail}.`;en=`For an action now, say no with am not/isn't/aren't + verb-ing. ${correct}`;vi=`Phủ định việc đang diễn ra: am not/isn't/aren't + động từ-ing.`;}
    else if(asksHabit){answer=habit;correct=`${subject} ${verb} ${habitTail}.`;gap=`${subject} ${verb} ${v.object} ___.`;choices=[...NOW_MARKERS];errors=choices.map(x=>`${subject} ${verb} ${v.object} ${x}.`);clue=`Choose the time words for this habit: ${subject} ${verb} ${v.object} ___.`;en=`Present Simple goes with habit words like "${habit}". ${correct}`;vi=`Hiện tại đơn đi với từ chỉ thói quen như "${habit}".`;}
    else {answer=now;correct=`${subject} ${b} ${v.ing} ${nowTail}.`;gap=`${subject} ${b} ${v.ing} ${v.object} ___.`;choices=HABIT_MARKERS.filter((_,k)=>k!==(i+j)%HABIT_MARKERS.length).slice(0,3);errors=choices.map(x=>`${subject} ${b} ${v.ing} ${v.object} ${x}.`);clue=`Choose the time words for an action now: ${subject} ${b} ${v.ing} ${v.object} ___.`;en=`Present Continuous goes with "${now}". ${correct}`;vi=`Hiện tại tiếp diễn đi với "${now}".`;}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,en,vi), `activity:${v.base}|${v.object}`, s.text));
  }
  register(7,'present-simple-vs-continuous',form,frames);
}
{
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of STATIVE_VERBS.entries()) {
    const subject=cap(s.text), verb=s.third?v.third:v.base, other=s.third?v.base:v.third, tail=(i+j)%2===0?`${v.object} now`:v.object;
    const correct=`${subject} ${verb} ${tail}.`, choices=[`${s.be} ${v.ing}`,other,v.ing];
    frames.push(withContext(frame(`stative-${i}-${j}`,correct,choices.map(x=>`${subject} ${x} ${tail}.`),`${subject} ___ ${tail}.`,verb,choices,`"${v.base}" is a state verb. Complete: ${subject} ___ ${tail}.`,`"${v.base}" is a state verb, so we don't use it with -ing, even with "now". ${correct}`,`"${v.base}" (${v.vi}) là động từ chỉ trạng thái, không dùng dạng -ing kể cả khi có "now".`), `stative:${v.base}|${v.object}`, s.text));
  }
  register(7,'stative-verbs','state',frames);
}
// Unit 8: Past Simple of regular verbs: -ed endings and spelling, didn't, Did questions and short answers.
for (const form of ['affirmative','ed-spelling','negative','question','short-answer']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of PAST_VERBS.entries()) {
    const subject=cap(s.text), time=PAST_TIMES[(i+j)%PAST_TIMES.length], tail=`${v.object} ${time}`, rule=PAST_SPELLING_RULES[v.rule];
    let correct=`${subject} ${v.past} ${tail}.`, answer:string=v.past, gap=`${subject} ___ ${tail}.`, choices:string[]=[v.base,v.third,`${s.be} ${v.ing}`];
    let errors=choices.map(x=>`${subject} ${x} ${tail}.`), clue=`"${time}" is in the past. Complete: ${subject} ___ ${tail}.`;
    let en=`"${time}" is finished time, so use the past form ${v.past}. ${correct}`, vi=`"${time}" là thời gian đã qua nên dùng quá khứ đơn: ${v.base} → ${v.past}.`;
    if(form==='ed-spelling'){gap=`${subject} ___ ${tail}. (${v.base})`;choices=[...v.wrong,v.base];errors=v.wrong.map(x=>`${subject} ${x} ${tail}.`);clue=`Write "${v.base}" in the past: ${subject} ___ ${tail}.`;en=`${rule.en} ${v.base} → ${v.past}. ${correct}`;vi=`${rule.vi} ${v.base} → ${v.past}.`;}
    if(form==='negative'){correct=`${subject} didn't ${v.base} ${tail}.`;answer="didn't";gap=`${subject} ___ ${v.base} ${tail}.`;choices=["don't","doesn't","wasn't"];errors=[`${subject} didn't ${v.past} ${tail}.`,`${subject} ${s.third?"doesn't":"don't"} ${v.base} ${tail}.`,`${subject} not ${v.past} ${tail}.`];clue=`Say no about the past: ${subject} ___ ${v.base} ${tail}.`;en=`Past negative: didn't + base verb for every subject. ${correct}`;vi=`Phủ định quá khứ: didn't + động từ nguyên mẫu (không thêm -ed).`;}
    if(form==='question'){correct=`Did ${s.text} ${v.base} ${tail}?`;answer='Did';gap=`___ ${s.text} ${v.base} ${tail}?`;choices=['Do','Does','Was'];errors=[`Did ${s.text} ${v.past} ${tail}?`,`${s.third?'Does':'Do'} ${s.text} ${v.base} ${tail}?`,`Was ${s.text} ${v.base} ${tail}?`];clue=`Ask about the past: ___ ${s.text} ${v.base} ${tail}?`;en=`Past question: Did + subject + base verb. ${correct}`;vi=`Câu hỏi quá khứ: Did + chủ ngữ + động từ nguyên mẫu.`;}
    if(form==='short-answer'){const pronoun=s.pronoun==='you'?'I':s.pronoun, yes=(i+j)%2===0, lead=yes?'Yes':'No';answer=yes?'did':"didn't";correct=`${lead}, ${pronoun} ${answer}.`;gap=`Did ${s.text} ${v.base} ${tail}? ${lead}, ${pronoun} ___.`;choices=yes?[s.third?'does':'do','was',v.past]:[s.third?"doesn't":"don't","wasn't",'not'];errors=choices.map(x=>`${lead}, ${pronoun} ${x}.`);clue=`Answer ${yes?'yes':'no'}: Did ${s.text} ${v.base} ${tail}?`;en=`Short answers to Did questions: Yes, ... did. / No, ... didn't. ${correct}`;vi=`Trả lời ngắn câu hỏi Did: Yes, ... did. / No, ... didn't.`;}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,en,vi), `past:${v.base}|${v.object}`, s.text));
  }
  register(8,'past-simple',form,frames);
}
/** Vocabulary units: every word appears in three authored situations, with distractors from its own topic. */
function registerWordUnit(unit: number, words: readonly VocabWord[], contextPrefix: string, family: string) {
  for (const topic of [...new Set(words.map(word => word.topic))]) {
    const topicWords=words.filter(word=>word.topic===topic);
    const frames=topicWords.flatMap((word,index)=>word.situations.map((situation,j)=>{
      const rest=topicWords.filter(other=>other!==word), others=[0,2,4].map(step=>rest[(index+2*j+step)%rest.length]);
      const q=frame(`${word.word}-situation-${j}`,word.example,others.map(other=>other.example),`${situation} Choose the word or phrase: ___.`,word.word,others.map(other=>other.word),situation,`${word.word}: ${word.definition}. ${word.example}`,`${word.word}: ${word.vi}. ${word.exampleVi}`);
      q.icon=word.icon; q.contextFamilyKey=`vocabulary:${word.word}`; q.contextKey=`${contextPrefix}:${word.word}:${j}`;
      return q;
    }));
    register(unit,topic,family,frames,true);
  }
}
// Unit 9: school life words, each in three authored situations.
registerWordUnit(9, SCHOOL_WORDS, 'school', 'school-meaning');
// Unit 10: was/were agreement, then irregular Past Simple forms with didn't and Did.
const wasWere=(be:string)=>be==='are'?'were':'was';
for (const form of ['statement','negative','question','short-answer']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,predicate] of WAS_WERE_PREDICATES.entries()) {
    const subject=cap(s.text), b=wasWere(s.be), other=b==='was'?'were':'was', time=PAST_TIMES[(i+j)%PAST_TIMES.length], tail=`${predicate} ${time}`;
    let correct=`${subject} ${b} ${tail}.`, answer=b, gap=`${subject} ___ ${tail}.`, choices=[other,s.be,'did'];
    let errors=choices.map(x=>`${subject} ${x} ${tail}.`), clue=`"${time}" is in the past. Complete: ${subject} ___ ${tail}.`;
    let en=`Past of be: I/he/she/it was, you/we/they were. ${correct}`, vi='Quá khứ của be: I/he/she/it dùng was; you/we/they dùng were.';
    if(form==='negative'){answer=`${b}n't`;correct=`${subject} ${answer} ${tail}.`;choices=[`${other}n't`,"didn't",`${s.be} not`];errors=choices.map(x=>`${subject} ${x} ${tail}.`);clue=`Say no about the past: ${subject} ___ ${tail}.`;en=`Past negative of be: wasn't / weren't. ${correct}`;vi="Phủ định quá khứ của be: wasn't / weren't.";}
    if(form==='question'){answer=cap(b);correct=`${answer} ${s.text} ${tail}?`;gap=`___ ${s.text} ${tail}?`;choices=[cap(other),'Did',cap(s.be)];errors=choices.map(x=>`${x} ${s.text} ${tail}?`);clue=`Ask about the past: ___ ${s.text} ${tail}?`;en=`Past questions with be start with Was or Were. ${correct}`;vi='Câu hỏi quá khứ với be bắt đầu bằng Was hoặc Were.';}
    if(form==='short-answer'){const pronoun=s.pronoun==='you'?'I':s.pronoun, pb=['we','they'].includes(pronoun)?'were':'was', yes=(i+j)%2===0, lead=yes?'Yes':'No';answer=yes?pb:`${pb}n't`;correct=`${lead}, ${pronoun} ${answer}.`;gap=`${cap(b)} ${s.text} ${tail}? ${lead}, ${pronoun} ___.`;choices=yes?[pb==='was'?'were':'was','did',pronoun==='I'?'am':['we','they'].includes(pronoun)?'are':'is']:[`${pb==='was'?'were':'was'}n't`,"didn't",'not'];errors=choices.map(x=>`${lead}, ${pronoun} ${x}.`);clue=`Answer ${yes?'yes':'no'}: ${cap(b)} ${s.text} ${tail}?`;en=`Short answers: Yes, … was/were. / No, … wasn't/weren't. ${correct}`;vi="Trả lời ngắn: Yes, … was/were. / No, … wasn't/weren't.";}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,en,vi), `was-were:${predicate}`, s.text));
  }
  register(10,'was-were',form,frames);
}
for (const form of ['affirmative','irregular-form','negative','question']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of IRREGULAR_VERBS.entries()) {
    const subject=cap(s.text), time=PAST_TIMES[(i+j)%PAST_TIMES.length], tail=`${v.object} ${time}`;
    let correct=`${subject} ${v.past} ${tail}.`, answer:string=v.past, gap=`${subject} ___ ${tail}.`, choices:string[]=[v.base,v.third,v.wrong[0]];
    let errors=choices.map(x=>`${subject} ${x} ${tail}.`), clue=`"${time}" is in the past. Complete: ${subject} ___ ${tail}.`;
    let en=`"${v.base}" is irregular: its past form is ${v.past}. ${correct}`, vi=`"${v.base}" là động từ bất quy tắc: quá khứ là ${v.past}.`;
    if(form==='irregular-form'){gap=`${subject} ___ ${tail}. (${v.base})`;choices=[...v.wrong,v.base];errors=v.wrong.map(x=>`${subject} ${x} ${tail}.`);clue=`Write "${v.base}" in the past: ${subject} ___ ${tail}.`;en=`Irregular verbs don't add -ed: ${v.base} → ${v.past}. ${correct}`;vi=`Động từ bất quy tắc không thêm -ed: ${v.base} → ${v.past}.`;}
    if(form==='negative'){correct=`${subject} didn't ${v.base} ${tail}.`;answer="didn't";gap=`${subject} ___ ${v.base} ${tail}.`;choices=["wasn't","don't","doesn't"];errors=[`${subject} didn't ${v.past} ${tail}.`,`${subject} ${s.third?"doesn't":"don't"} ${v.base} ${tail}.`,`${subject} not ${v.past} ${tail}.`];clue=`Say no about the past: ${subject} ___ ${v.base} ${tail}.`;en=`Irregular verbs also use didn't + base verb: didn't ${v.base}, not didn't ${v.past}. ${correct}`;vi=`Động từ bất quy tắc cũng dùng didn't + nguyên mẫu: didn't ${v.base}.`;}
    if(form==='question'){correct=`Did ${s.text} ${v.base} ${tail}?`;answer='Did';gap=`___ ${s.text} ${v.base} ${tail}?`;choices=['Was','Were','Do'];errors=[`Did ${s.text} ${v.past} ${tail}?`,`${wasWere(s.be)==='was'?'Was':'Were'} ${s.text} ${v.base} ${tail}?`,`${s.third?'Does':'Do'} ${s.text} ${v.base} ${tail}?`];clue=`Ask about the past: ___ ${s.text} ${v.base} ${tail}?`;en=`Past questions use Did + subject + base verb, also for irregular verbs. ${correct}`;vi='Câu hỏi quá khứ: Did + chủ ngữ + động từ nguyên mẫu, kể cả động từ bất quy tắc.';}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,en,vi), `irregular:${v.base}|${v.object}`, s.text));
  }
  register(10,'irregular-past',form,frames);
}
// Unit 11: Past Continuous for an action in progress at a past moment, or interrupted by a short Past Simple action.
for (const form of ['affirmative','negative','question','short-answer','interrupted','short-action']) {
  const frames: ControlledFrame[]=[];
  for (const [i,s] of SUBJECTS.entries()) for (const [j,v] of LONG_ACTIONS.entries()) {
    const subject=cap(s.text), b=wasWere(s.be), other=b==='was'?'were':'was', moment=PAST_MOMENTS[(i+j)%PAST_MOMENTS.length];
    const cut=INTERRUPTIONS[(i+j)%INTERRUPTIONS.length], cutText=`${cut.subject} ${cut.past}${cut.tail}`, tail=`${v.object} ${moment}`;
    let correct=`${subject} ${b} ${v.ing} ${tail}.`, answer=`${b} ${v.ing}`, gap=`${subject} ___ ${tail}.`, choices=[`${other} ${v.ing}`,`${s.be} ${v.ing}`,`${b} ${v.base}`];
    let errors=choices.map(x=>`${subject} ${x} ${tail}.`), clue=`"${moment}" is a moment in the past. Complete: ${subject} ___ ${tail}.`;
    let en=`An action in progress at a past moment uses was/were + verb-ing. ${correct}`, vi='Hành động đang diễn ra tại một thời điểm trong quá khứ: was/were + động từ-ing.';
    if(form==='negative'){answer=`${b}n't`;correct=`${subject} ${answer} ${v.ing} ${tail}.`;gap=`${subject} ___ ${v.ing} ${tail}.`;choices=[`${other}n't`,"didn't",`${s.be}n't`.replace("amn't","am not")];errors=[`${subject} ${other}n't ${v.ing} ${tail}.`,`${subject} didn't ${v.ing} ${tail}.`,`${subject} ${answer} ${v.base} ${tail}.`];clue=`Say no: ${subject} ___ ${v.ing} ${tail}.`;en=`Past Continuous negative: wasn't/weren't + verb-ing. ${correct}`;vi="Phủ định quá khứ tiếp diễn: wasn't/weren't + động từ-ing.";}
    if(form==='question'){answer=cap(b);correct=`${answer} ${s.text} ${v.ing} ${tail}?`;gap=`___ ${s.text} ${v.ing} ${tail}?`;choices=[cap(other),'Did',cap(s.be)];errors=[`${cap(other)} ${s.text} ${v.ing} ${tail}?`,`Did ${s.text} ${v.ing} ${tail}?`,`${answer} ${s.text} ${v.base} ${tail}?`];clue=`Ask about a past moment: ___ ${s.text} ${v.ing} ${tail}?`;en=`Past Continuous questions: Was/Were + subject + verb-ing. ${correct}`;vi='Câu hỏi quá khứ tiếp diễn: Was/Were + chủ ngữ + động từ-ing.';}
    if(form==='short-answer'){const pronoun=s.pronoun==='you'?'I':s.pronoun, pb=['we','they'].includes(pronoun)?'were':'was', yes=(i+j)%2===1, lead=yes?'Yes':'No';answer=yes?pb:`${pb}n't`;correct=`${lead}, ${pronoun} ${answer}.`;gap=`${cap(b)} ${s.text} ${v.ing} ${tail}? ${lead}, ${pronoun} ___.`;choices=yes?[pb==='was'?'were':'was','did',v.ing]:[`${pb==='was'?'were':'was'}n't`,"didn't",'not'];errors=choices.map(x=>`${lead}, ${pronoun} ${x}.`);clue=`Answer ${yes?'yes':'no'}: ${cap(b)} ${s.text} ${v.ing} ${tail}?`;en=`Short answers: Yes, … was/were. / No, … wasn't/weren't. ${correct}`;vi="Trả lời ngắn: Yes, … was/were. / No, … wasn't/weren't.";}
    if(form==='interrupted'){correct=`${subject} ${b} ${v.ing} ${v.object} when ${cutText}.`;gap=`${subject} ___ ${v.object} when ${cutText}.`;errors=choices.map(x=>`${subject} ${x} ${v.object} when ${cutText}.`);clue=`The long action was in progress when something happened. Complete: ${subject} ___ ${v.object} when ${cutText}.`;en=`The long action uses was/were + verb-ing; the short action that interrupts it uses Past Simple. ${correct}`;vi='Hành động dài đang diễn ra dùng was/were + -ing; hành động ngắn xen vào dùng quá khứ đơn.';}
    if(form==='short-action'){correct=`${subject} ${b} ${v.ing} ${v.object} when ${cutText}.`;answer=cut.past;gap=`${subject} ${b} ${v.ing} ${v.object} when ${cut.subject} ___${cut.tail}.`;choices=[cut.wrong,cut.third,cut.base];errors=choices.map(x=>`${subject} ${b} ${v.ing} ${v.object} when ${cut.subject} ${x}${cut.tail}.`);clue=`A short action interrupted a long one. Complete: … when ${cut.subject} ___${cut.tail}.`;en=`The short action after "when" uses Past Simple: ${cut.base} → ${cut.past}. ${correct}`;vi=`Hành động ngắn xen vào sau "when" dùng quá khứ đơn: ${cut.base} → ${cut.past}.`;}
    frames.push(withContext(frame(`${form}-${i}-${j}`,correct,errors,gap,answer,choices,clue,en,vi), `past-continuous:${v.base}|${v.object}`, s.text));
  }
  register(11,'past-continuous',form,frames);
}
// Unit 12: making friends words, each in three authored situations.
registerWordUnit(12, FRIEND_WORDS, 'friends', 'friend-meaning');
/** Helpers handed to later chapters so each chapter keeps its templates in its own folder. */
export interface TemplateApi {
  register: typeof register; frame: typeof frame; withContext: typeof withContext; cap: typeof cap; registerWordUnit: typeof registerWordUnit;
}
addLaterChapterTemplates({ register, frame, withContext, cap, registerWordUnit });
export const QUESTION_TEMPLATES: readonly QuestionTemplate[] = templates;

export function renderTemplate(template: QuestionTemplate, f: ControlledFrame): Question {
  let type: GameQuestionType='multiple-choice', question=f.gap, answer=f.answer, options: string[]|undefined=f.choices, words: string[]|undefined;
  if(template.mode==='choose'||template.mode==='apply'){ question=`${template.mode==='apply'?'Choose the sentence that fits':'Choose the correct sentence'}. ${f.clue}`;answer=f.correct;options=[f.correct,...f.errors]; }
  if(template.mode==='build'){type='sentence-builder';question=`Build the sentence. ${f.clue}`;answer=f.correct;words=f.correct.split(' ');options=undefined;}
  if(template.mode==='repair'){type='error-hunter';question=f.errors[0];answer=f.correct;options=[f.correct,...f.errors];}
  if(template.mode==='gap') type='fill-gap';
  // Meaning tasks must not mark a semantically different but grammatical sentence as a grammar error.
  if(template.skill==='vocabulary') {
    if(template.mode==='repair') {type='matching';question=`Find the word or phrase: ${f.clue}`;answer=f.answer;options=f.choices;}
    if(template.mode==='choose'){question=`Which word or phrase fits? ${f.clue}`;answer=f.answer;options=f.choices;}
    if(template.mode==='apply'){question=`Read the situation. Choose the sentence that fits. ${f.clue}`;answer=f.correct;options=[f.correct,...f.errors];}
  }
  return { id: `GEN:${template.id}:${f.key}`, conceptId:template.conceptId, templateId:template.id,
    contextKey:f.contextKey, contextFamilyKey:f.contextFamilyKey, subjectKey:f.subjectKey,
    variantId:`unit${template.unitId}:${encodeURIComponent(template.conceptId + '|' + template.mode + '|' + f.correct + '|' + f.clue)}`, unit:template.unitId, level:'A1',skill:template.skill,topic:template.topic,type,question,answer,options,words,
    subPrompt:template.mode==='repair'?f.clue:undefined, correctSentence:template.mode==='repair'?f.correct:undefined,explanation:{en:f.en,vi:f.vi},difficulty:template.mode==='apply'?3:template.mode==='gap'?1:2,xp:10,imageIcon:f.icon,audioText:f.correct };
}

/** Reject malformed controlled frames before they can enter a session. */
export function validateControlledFrame(template: QuestionTemplate, f: ControlledFrame): boolean {
  if (!/[.!?]$/.test(f.correct) || /\s[,.!?]|[!?]{2}|\s{2}/.test(f.correct)) return false;
  if (template.topic === 'there-is-there-are' && !f.correct.startsWith(f.correct.includes(' one ') ? 'There is ' : 'There are ')) return false;
  if (template.topic === 'demonstratives' && !/^(This|That) is my |^(These|Those) are my /.test(f.correct)) return false;
  if (template.topic === 'verb-to-be' && !f.correct.startsWith('Yes,')) {
    const subject = SUBJECTS.find(s => f.correct.startsWith(cap(s.text) + ' '));
    if (subject && !f.correct.startsWith(`${cap(subject.text)} ${subject.be} `)) return false;
    const questionSubject = SUBJECTS.find(s => f.correct.includes(` ${s.text} `));
    if (!subject && questionSubject && !f.correct.startsWith(cap(questionSubject.be) + ' ')) return false;
  }
  if (template.topic === 'present-simple' && template.id.includes('.question.')) {
    const parts = f.key.split('-'), subject = SUBJECTS[Number(parts[1])], activity = ACTIVITIES[Number(parts[2])];
    if (!subject || !activity || !f.correct.startsWith(`${subject.third ? 'Does' : 'Do'} ${subject.text} ${activity.base} ${activity.object} `)) return false;
  }
  return true;
}
