import React from 'react';
import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { ALL_UNITS } from '../../data/unitsMeta';
import { getQuestionsByUnit } from '../../data/curriculum';
import { getUnitStatus, getReviewGateStatus, canEnterBoss } from '../../engine/worldProgression';
import { Button } from './Button';

export const Chapter2Map: React.FC = () => {
  const { state, navigateTo } = useGame();
  const reviewStatus = getReviewGateStatus(state, 2);
  const bossAvailable = canEnterBoss(state, 2);
  const bossComplete = !!state.chapter2?.bossDefeated;
  const bossStatus = bossComplete ? 'MASTERED' : !bossAvailable ? 'LOCKED' : state.startedStages?.includes('boss2') ? 'IN PROGRESS' : 'AVAILABLE';
  return <section aria-label="Chapter 2 Everyday Adventure" className="relative rounded-3xl border-2 border-sky-200 bg-gradient-to-b from-teal-50 via-sky-50 to-violet-50 p-4 sm:p-6 space-y-6">
    <header className="text-center space-y-2">
      <span className="text-3xl" aria-hidden="true">🏡 🚲 🌳 ⛵</span>
      <h2 className="text-2xl sm:text-3xl font-black font-game text-sky-950">CHAPTER 2 · EVERYDAY ADVENTURE</h2>
      <p className="text-sm text-sky-800">Hành Trình Mỗi Ngày</p>
      <p className="font-black text-sky-900">{state.bossDefeated ? 'CHAPTER 2 START · AVAILABLE' : 'CHAPTER 2 START · LOCKED'}</p>
      <p className="text-sm text-slate-700">{state.bossDefeated ? 'Follow the trail, explore Action Park and share your hobbies!' : 'Complete Chapter 1 by defeating Lord Verbose to begin this adventure.'}</p>
    </header>
    <div className="space-y-5">
      {ALL_UNITS.filter(unit => unit.id >= 4).map(unit => {
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
        <h3 className="text-xl font-black text-sky-950">📜 REVIEW GATE 2</h3>
        <p className="text-sm font-bold text-sky-800">Everyday Adventure Review · {reviewStatus}</p>
        <p className="text-sm text-slate-600">Complete Units 4–6. Answer 8 mixed questions and reach 80% to open the Time Portal.</p>
        <Button variant="amber" size="lg" disabled={reviewStatus === 'LOCKED'} onClick={() => navigateTo('review', { reviewGate: true, chapterId: 2 })}>{state.chapter2?.reviewGateCompleted ? 'Review Again' : 'Start Review Gate 2'}</Button>
      </article>
      <p aria-hidden="true" className="text-center text-xl font-black text-sky-500">↓</p>
      <article className="mx-auto max-w-lg rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-indigo-950 to-sky-900 p-5 sm:p-6 text-white space-y-3 shadow-lg">
        <span className="text-4xl" aria-hidden="true">⏱️ ⚙️</span>
        <p className="text-sm font-black text-amber-200">FINAL BOSS 2 · {bossStatus}</p>
        <h3 className="text-2xl font-black font-game">Chronos — The Time Keeper</h3>
        <p className="text-sm text-sky-100">100 HP · 10 Questions. Control routines, actions and hobbies to open the Time Portal.</p>
        <Button size="lg" variant="amber" disabled={!bossAvailable} onClick={() => navigateTo('boss', { chapterId: 2 })}>{bossComplete ? 'Fight Again' : bossAvailable ? 'Fight Chronos!' : 'Pass Review Gate 2'}</Button>
      </article>
      {bossComplete && <section aria-label="Chapter 2 Complete" className="mx-auto max-w-lg rounded-3xl border-2 border-emerald-300 bg-white p-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-700" /><h2 className="text-2xl font-black text-emerald-900">CHAPTER 2 COMPLETE</h2>
        <p className="text-sm text-emerald-900">You mastered everyday routines, actions, and hobbies!</p>
        <p className="text-sm font-black text-slate-800">NEXT ADVENTURE · Coming Soon</p>
      </section>}
    </div>
  </section>;
};
