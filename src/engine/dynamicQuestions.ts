import { Question, UserProgressState, RecentQuestionHistory, ChapterId } from '../types';
import { QUESTION_TEMPLATES, renderTemplate, StudyStage, validateControlledFrame } from '../data/templates/questionTemplates';
import { calculateReviewPriority } from './review';
import { getReviewQuestionPool } from '../data/curriculum';
import { fisherYatesShuffle, prepareSessionQuestions } from './sessionQuestions';
import { ALL_WORLD_UNIT_IDS, getWorld } from '../data/worlds';
import { isUnitAvailable } from './worldProgression';

export function validateGeneratedQuestion(q: Question): boolean {
  if (!q.conceptId || !q.templateId || !q.variantId || !q.contextKey || !q.question.trim() || !q.explanation.en || !q.explanation.vi) return false;
  if (q.type === 'sentence-builder') return !!q.words?.length && q.words.join(' ') === q.answer;
  return !!q.options && q.options.length >= 3 && new Set(q.options).size === q.options.length && q.options.filter(x => x === q.answer).length === 1;
}
const pools = new Map<string, Question[]>();
export function getDynamicPool(unit: number, stage: StudyStage): readonly Question[] {
  const key = `${unit}:${stage}`;
  if (!pools.has(key)) pools.set(key, QUESTION_TEMPLATES.filter(t => t.unitId === unit && t.stages.includes(stage)).flatMap(t => t.frames.filter(f => validateControlledFrame(t, f)).map(f => renderTemplate(t, f))).filter(validateGeneratedQuestion));
  return pools.get(key)!;
}
export interface GeneratedSession { questions: Question[]; history: NonNullable<UserProgressState['recentQuestionHistory']> }
let serial = 0;
/** Learner-visible identity ignores IDs, hidden metadata and shuffled answer order. */
export function visibleTaskFingerprint(q: Question): string {
  return JSON.stringify([q.type, q.question, ['error-hunter','time-attack'].includes(q.type) ? q.subPrompt ?? '' : '', q.answer, [...(q.options ?? [])].sort(), [...(q.words ?? [])].sort()]);
}
export function buildDynamicSession(state: UserProgressState, unit: number, stage: StudyStage, count = 6, rng = Math.random, sessionId = `session-${Date.now()}-${++serial}`, filter: (q: Question) => boolean = () => true): GeneratedSession {
  const history = { ...state.recentQuestionHistory };
  const previous: RecentQuestionHistory = history[String(unit)] ?? { variantIds: [], templateIds: [], cycleVariantIds: [] };
  const project = (q: Question): Question => ({ ...q, type: stage === 'minigame' && unit >= 4 && q.type !== 'sentence-builder' ? 'time-attack' : q.type, disablePreAnswerAudio: stage === 'challenge' });
  const pool = fisherYatesShuffle(getDynamicPool(unit, stage).filter(filter), rng).map(project);
  const concepts = [...new Set(pool.map(q => q.conceptId!))].sort((a,b) => (previous.conceptIds ?? []).lastIndexOf(a) - (previous.conceptIds ?? []).lastIndexOf(b));
  // Reserve a fair curriculum quota before ANY variant/history filtering.
  // More than six concepts rotate the omitted family using bounded concept history.
  const quota = Array.from({length: concepts.length ? count : 0}, (_,i) => concepts[i % concepts.length]);
  const chosen: Question[] = [], used = new Set<string>(), visible = new Set<string>();
  const cycle = new Set(previous.cycleVariantIds), recent = new Set(previous.variantIds);
  const previousContexts = new Set(previous.lastSessionContextKeys ?? []);
  const family = (q: Question) => q.contextFamilyKey ?? q.contextKey!;
  const previousFamilies = new Set(previous.lastSessionContextFamilyKeys ?? previous.lastSessionContextKeys ?? []);
  const rankCompare = (a: number[], b: number[]) => { for(let i=0;i<a.length;i++) if(a[i]!==b[i]) return a[i]-b[i]; return 0; };
  for(const concept of quota) {
    let candidates = pool.filter(q => q.conceptId === concept && !used.has(q.variantId!) && !visible.has(visibleTaskFingerprint(q)));
    if(!candidates.length) continue;
    const builders = chosen.filter(q => q.type === 'sentence-builder').length;
    const preferred = stage === 'minigame' && unit >= 4 ? candidates.filter(q => (builders < 2) === (q.type === 'sentence-builder')) : candidates;
    if(preferred.length) candidates = preferred;
    // Recycle a small family independently; a large unused family cannot starve it.
    if(candidates.every(q => cycle.has(q.variantId!))) candidates.forEach(q => cycle.delete(q.variantId!));
    const rank = (q: Question) => [
      chosen.filter(x => family(x) === family(q)).length,
      chosen.filter(x => x.contextKey === q.contextKey).length,
      Number(previousFamilies.has(family(q))),
      Number(previousContexts.has(q.contextKey!)),
      q.subjectKey ? chosen.filter(x => x.subjectKey === q.subjectKey).length : 0,
      Number(recent.has(q.variantId!)), Number((previous.visibleTaskKeys ?? []).includes(visibleTaskFingerprint(q))),
      Number(cycle.has(q.variantId!)), (previous.contextKeys ?? []).lastIndexOf(q.contextKey!), previous.variantIds.lastIndexOf(q.variantId!),
      chosen.filter(x => x.type === q.type).length * 3 + (stage === 'challenge' && q.difficulty === 1 ? 3 : 0) + previous.templateIds.filter(id => id === q.templateId).length,
    ];
    const q = candidates.reduce((best,item) => rankCompare(rank(item),rank(best)) < 0 ? item : best);
    chosen.push(q); used.add(q.variantId!); visible.add(visibleTaskFingerprint(q)); cycle.add(q.variantId!);
  }
  const questions = prepareSessionQuestions(chosen.map((q,i) => ({ ...q, questionInstanceId: `${sessionId}:${i}` })), true, rng);
  history[String(unit)] = { variantIds: [...previous.variantIds, ...chosen.map(q => q.variantId!)].slice(-50), templateIds: [...previous.templateIds, ...chosen.map(q => q.templateId!)].slice(-20), cycleVariantIds: [...cycle].slice(-2000),
    contextKeys: [...(previous.contextKeys ?? []), ...chosen.map(q => q.contextKey!)].slice(-24),
    lastSessionContextKeys: [...new Set(chosen.map(q => q.contextKey!))],
    lastSessionContextFamilyKeys: [...new Set(chosen.map(family))],
    conceptIds: [...(previous.conceptIds ?? []), ...chosen.map(q => q.conceptId!)].slice(-50),
    visibleTaskKeys: [...(previous.visibleTaskKeys ?? []), ...chosen.map(visibleTaskFingerprint)].slice(-50),
  };
  return { questions, history };
}
/** Composite Boss/review builders reserve smaller batches; retain the whole session boundary. */
function markCompositeContexts(questions: Question[], history: GeneratedSession['history']): GeneratedSession['history'] {
  const next = { ...history };
  for (const unit of new Set(questions.map(q => q.unit))) {
    next[unit] = { ...next[unit], lastSessionContextFamilyKeys: [...new Set(questions.filter(q => q.unit === unit).map(q => q.contextFamilyKey ?? q.contextKey!))], lastSessionContextKeys: [...new Set(questions.filter(q => q.unit === unit).map(q => q.contextKey!))] };
  }
  return next;
}
function buildChapterUnit(state: UserProgressState, unit: number, count: number, rng: () => number, boss = false): GeneratedSession {
  const eligible = (q: Question) => !boss || q.type === 'multiple-choice' || q.type === 'fill-gap';
  if (unit !== 5) return buildDynamicSession(state, unit, 'challenge', count, rng, undefined, eligible);
  const contrast = buildDynamicSession(state, unit, 'challenge', boss ? 2 : 1, rng, undefined, q => eligible(q) && q.topic === 'present-simple-vs-continuous');
  const remaining = buildDynamicSession({ ...state, recentQuestionHistory: contrast.history }, unit, 'challenge', count - contrast.questions.length, rng, undefined, q => eligible(q) && q.topic !== 'present-simple-vs-continuous');
  return { questions: [...contrast.questions, ...remaining.questions], history: remaining.history };
}
export function buildDynamicReview(state: UserProgressState, chapter?: ChapterId, rng = Math.random): GeneratedSession {
  let current = state; const questions: Question[] = [];
  if (chapter) {
    for (const [unit, count] of getWorld(chapter).reviewQuota) {
      const session = buildChapterUnit(current, unit, count, rng);
      questions.push(...session.questions.map(q => ({ ...q, reviewOf: Object.entries(state.errorBank).filter(([, e]) => !e.mastered && (e.conceptId === q.conceptId || !e.conceptId && e.unit === q.unit && e.topic === q.topic)).map(([key]) => key) }))); current = { ...current, recentQuestionHistory: session.history };
    }
  } else {
    const errors = Object.entries(state.errorBank).filter(([,e]) => !e.mastered).sort((a,b) => (calculateReviewPriority(b[1]) + ((state.topicMastery[b[1].topic]?.accuracy ?? 0) < 80 ? 4 : 0)) - (calculateReviewPriority(a[1]) + ((state.topicMastery[a[1].topic]?.accuracy ?? 0) < 80 ? 4 : 0)));
    for (const [key, error] of errors) {
      if (questions.length >= 8) break;
      const topic = error.topic.startsWith('verb-to-be') ? 'verb-to-be' : error.topic === 'it-is' ? 'its-it-is' : error.topic.startsWith('present-simple') && error.topic !== 'present-simple-vs-continuous' ? 'present-simple' : error.topic;
      const unit = error.unit || (topic.startsWith('home-') ? 3 : topic === 'present-simple' || topic === 'sentence-builder' ? 2 : 1);
      const form = error.topic.endsWith('-questions') ? '.question' : error.topic.endsWith('-negative') ? '.negative' : error.topic.endsWith('-affirmative') || error.topic.endsWith('-3rd-person') ? '.affirmative' : '';
      const concept = error.conceptId ?? `unit${unit}.${topic === 'sentence-builder' ? 'present-simple' : topic}${form}`;
      const original = getReviewQuestionPool().find(q => q.id === error.questionId);
      const originalText = original?.question ?? error.questionText;
      const baseFilter = (q: Question) => (q.conceptId === concept || !error.conceptId && !!q.conceptId?.startsWith(concept + '.')) && !questions.some(x => x.variantId === q.variantId);
      const freshFilter = (q: Question) => baseFilter(q) && q.variantId !== error.originalVariantId && q.question !== originalText && q.question !== error.lastQuestionText && q.id !== error.lastReviewQuestionId && !error.recoveryVariantIds?.includes(q.variantId!);
      const generatedOriginal = getDynamicPool(unit, 'challenge').find(q => q.variantId === error.originalVariantId || q.id === error.questionId.replace(/^BOSS-/, ''));
      const originalContext = error.originalContextKey ?? generatedOriginal?.contextKey;
      const originalFamily = generatedOriginal?.contextFamilyKey ?? (originalContext?.startsWith('home:') ? `vocabulary:${originalContext.split(':')[1]}` : originalContext?.startsWith('hobby:') ? `activity:${originalContext.split(':')[1]}` : originalContext);
      const changedContext = (q: Question) => freshFilter(q) && (q.contextFamilyKey ?? q.contextKey) !== originalFamily && q.contextKey !== originalContext && q.contextKey !== error.lastContextKey && q.contextKey !== error.lastReviewContextKey && !questions.some(x => x.contextKey === q.contextKey && x.unit === q.unit);
      let session = buildDynamicSession(current, unit, 'challenge', 1, rng, undefined, changedContext);
      if (!session.questions.length) session = buildDynamicSession(current, unit, 'challenge', 1, rng, undefined, freshFilter);
      if (!session.questions.length) session = buildDynamicSession(current, unit, 'challenge', 1, rng, undefined, baseFilter);
      if (!session.questions.length) continue;
      questions.push(...session.questions.map(q => ({ ...q, reviewOf: [key] })));
      current = { ...current, recentQuestionHistory: session.history };
    }
    const units = ALL_WORLD_UNIT_IDS.filter(u => state.unlockedUnits.includes(u) || isUnitAvailable(state, u));
    for (let i = 0; i < 8 && questions.length < 8; i++) {
      const session = buildDynamicSession(current, units[i % Math.max(1,units.length)] ?? 1, 'challenge', 1, rng, undefined, q => !questions.some(x => x.variantId === q.variantId));
      questions.push(...session.questions); current = { ...current, recentQuestionHistory: session.history };
    }
  }
  return { questions: prepareSessionQuestions(questions, true, rng), history: markCompositeContexts(questions, current.recentQuestionHistory ?? {}) };
}
export function buildDynamicBoss(state: UserProgressState, chapter: ChapterId, rng = Math.random): GeneratedSession {
  let current = state; const questions: Question[] = [];
  for (const [unit,count] of getWorld(chapter).bossQuota) {
    const session = buildChapterUnit(current, unit, count, rng, true);
    questions.push(...session.questions.map(q => ({ ...q, id: `BOSS-${q.id}`, type: 'multiple-choice' as const })));
    current = { ...current, recentQuestionHistory: session.history };
  }
  return { questions: prepareSessionQuestions(questions, true, rng), history: markCompositeContexts(questions, current.recentQuestionHistory ?? {}) };
}
