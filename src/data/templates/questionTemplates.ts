import { Question, GameQuestionType } from '../../types';
import { HOME_WORDS, HOME_ACTIONS } from '../A1/world1Expansion';
import { SUBJECTS, ACTIVITIES, CONTINUOUS_ACTIVITIES, ROUTINE_TIMES, COUNTED_OBJECTS, HOBBIES } from './controlledPools';

import { HOME_SITUATIONS, HOME_RESPONSES } from './homeSituations';
import { LEISURE_SITUATIONS } from './leisureSituations';

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
  for (const mode of modes) templates.push({ id: `u${unit}.${topic}.${family}.${mode}`, conceptId: `unit${unit}.${topic}${['verb-to-be','present-simple','present-continuous'].includes(topic) ? '.' + (family === 'plural-statement' ? 'statement' : family) : ''}`,
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
