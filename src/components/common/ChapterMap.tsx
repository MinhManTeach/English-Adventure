import React from 'react';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ALL_UNITS } from '../../data/unitsMeta';
import { getQuestionsByUnit } from '../../data/curriculum';
import { getWorld, LAST_CHAPTER } from '../../data/worlds';
import { getUnitStatus, getReviewGateStatus, canEnterBoss, getChapterProgress, isChapterBossDefeated } from '../../engine/worldProgression';
import { ChapterId } from '../../types';
import { Button } from './Button';

/** Map section for Chapter 2 onwards; every chapter shares the same trail, gate and boss layout. */
export const ChapterMap: React.FC<{ chapter: ChapterId }> = ({ chapter }) => {
  const { state, navigateTo } = useGame();
  const world = getWorld(chapter);
  const progress = getChapterProgress(state, chapter);
  const opened = isChapterBossDefeated(state, (chapter - 1) as ChapterId);
  const reviewStatus = getReviewGateStatus(state, chapter);
  const bossAvailable = canEnterBoss(state, chapter);
  const bossComplete = !!progress?.bossDefeated;
  const bossStatus = bossComplete ? 'MASTERED' : !bossAvailable ? 'LOCKED' : state.startedStages?.includes(world.bossStageKey) ? 'IN PROGRESS' : 'AVAILABLE';
  const [first, , last] = world.units;
  return <section aria-label={`Chapter ${chapter} ${world.title}`} className="relative rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-teal-50 via-sky-50 to-violet-50 p-4 sm:p-6 space-y-6">
    <header className="text-center space-y-2">
      <span className="text-3xl" aria-hidden="true">{world.emojis}</span>
      <h2 className="text-2xl sm:text-3xl font-black font-game text-sky-950">CHAPTER {chapter} · {world.title.toUpperCase()}</h2>
      <p className="text-sm text-sky-800">{world.titleVi}</p>
      <p className="font-black text-sky-900">{opened ? `CHAPTER ${chapter} START · AVAILABLE` : `CHAPTER ${chapter} START · LOCKED`}</p>
      <p className="text-sm text-slate-700">{opened ? world.intro : world.lockedHint}</p>
    </header>
    <div className="space-y-5">
      {ALL_UNITS.filter(unit => world.units.includes(unit.id)).map(unit => {
        const status = getUnitStatus(state, unit.id, [...new Set(getQuestionsByUnit(unit.id).map(q => q.topic))]);
        const locked = status === 'LOCKED';
        return <React.Fragment key={unit.id}>
          <article className={`mx-auto max-w-lg rounded-3xl border-2 bg-white p-5 sm:p-6 shadow-sm ${locked ? 'border-slate-200' : 'border-sky-300'}`}>
            <div className="flex items-start gap-3"><span className="text-3xl" aria-hidden="true">{unit.icon}</span><div className="min-w-0">
              <p className="text-xs font-black text-sky-700">UNIT {unit.id}</p>
              <h3 className="text-xl font-black font-game text-slate-900">{unit.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{unit.description}</p>
            </div></div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-black text-sky-800">{locked ? <Lock className="inline h-4 w-4 mr-1" /> : null}{status} · {unit.questionsCount} Questions</span>
              <Button size="md" variant="amber" disabled={locked} onClick={() => navigateTo('unit', { unitId: unit.id })}>{status === 'COMPLETED' || status === 'MASTERED' ? 'Review' : 'Enter'}<ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </article>
          <p aria-hidden="true" className="text-center text-xl font-black text-sky-500">↓</p>
        </React.Fragment>;
      })}
      <article className="mx-auto max-w-lg rounded-3xl border-2 border-sky-300 bg-white p-5 space-y-3">
        <h3 className="text-xl font-black text-sky-950">📜 REVIEW GATE {chapter}</h3>
        <p className="text-sm font-bold text-sky-800">{world.reviewTitle} · {reviewStatus}</p>
        <p className="text-sm text-slate-600">Complete Units {first}–{last}. Answer 8 mixed questions and reach 80% to face {world.boss.name}.</p>
        <Button variant="amber" size="lg" disabled={reviewStatus === 'LOCKED'} onClick={() => navigateTo('review', { reviewGate: true, chapterId: chapter })}>{progress?.reviewGateCompleted ? 'Review Again' : `Start Review Gate ${chapter}`}</Button>
      </article>
      <p aria-hidden="true" className="text-center text-xl font-black text-sky-500">↓</p>
      <article className="mx-auto max-w-lg rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-indigo-950 to-sky-900 p-5 sm:p-6 text-white space-y-3 shadow-lg">
        <span className="text-4xl" aria-hidden="true">{world.boss.emoji}</span>
        <p className="text-sm font-black text-amber-200">FINAL BOSS {chapter} · {bossStatus}</p>
        <h3 className="text-2xl font-black font-game">{world.boss.fullName}</h3>
        <p className="text-sm text-sky-100">100 HP · 10 Questions. {world.boss.mapBlurb}</p>
        <Button size="lg" variant="amber" disabled={!bossAvailable} onClick={() => navigateTo('boss', { chapterId: chapter })}>{bossComplete ? 'Fight Again' : bossAvailable ? world.boss.fightLabel : `Pass Review Gate ${chapter}`}</Button>
      </article>
      {bossComplete && <section aria-label={`Chapter ${chapter} Complete`} className="mx-auto max-w-lg rounded-3xl border-2 border-emerald-300 bg-white p-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-700" /><h2 className="text-2xl font-black text-emerald-900">CHAPTER {chapter} COMPLETE</h2>
        <p className="text-sm text-emerald-900">{world.completeMessage}</p>
        <p className="text-sm font-black text-slate-800">{chapter === LAST_CHAPTER ? 'NEXT ADVENTURE · Coming Soon' : `NEXT ADVENTURE · Chapter ${chapter + 1} is open!`}</p>
      </section>}
    </div>
  </section>;
};
