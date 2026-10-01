import React from 'react';
import { Star, CheckCircle2, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_UNITS } from '../data/unitsMeta';
import { Button } from '../components/common/Button';
import { WorldBackground } from '../components/common/WorldBackground';

export const AdventureMapScreen: React.FC = () => {
  const { state, navigateTo, activeUnitId } = useGame();

  const isBossUnlocked = state.bossUnlocked || (
    state.completedUnits.includes(1) &&
    state.completedUnits.includes(2) &&
    state.completedUnits.includes(3)
  );

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <WorldBackground unitId={activeUnitId || 1} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
          World 1 · The Realm of A1 English
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-game">
          Adventure Map · Bản Đồ Khám Phá
        </h1>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Complete each landmark to unlock the next world and face the Grammar Castle Boss!
        </p>
      </div>

      {/* Visual Adventure Winding Path */}
      <div className="relative py-8">
        {/* Connector Path Line */}
        <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-b from-amber-300 via-emerald-300 via-orange-300 to-violet-400 rounded-full shadow-inner hidden sm:block" />

        <div className="space-y-12 relative">
          {/* Start Landmark */}
          <div className="flex flex-col items-center justify-center">
            <div className="px-5 py-2 rounded-2xl bg-white border-2 border-amber-300 shadow-md text-center">
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest block">
                🏁 Journey Begins · Bắt Đầu
              </span>
              <p className="text-sm font-bold text-slate-800">English Adventure Basecamp</p>
            </div>
          </div>

          {/* Unit 1: Magic Grammar Gate */}
          {ALL_UNITS.map((unit, index) => {
            const isCompleted = state.completedUnits.includes(unit.id);
            const isUnlocked = state.unlockedUnits.includes(unit.id);
            const isCurrent = isUnlocked && !isCompleted;
            const isEven = index % 2 === 0;

            return (
              <div
                key={unit.id}
                className={`flex flex-col sm:flex-row items-center justify-center gap-6 ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Level Card */}
                <div
                  className={`w-full sm:w-80 rounded-3xl p-6 transition-all duration-200 border-2 ${
                    isCompleted
                      ? 'bg-white border-emerald-400 shadow-md'
                      : isCurrent
                      ? 'bg-white border-amber-400 shadow-xl ring-4 ring-amber-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{unit.icon}</span>
                      <div>
                        <span className="text-xs font-extrabold text-slate-400 uppercase">
                          Unit {unit.number}
                        </span>
                        <h3 className="text-lg font-black text-slate-800 font-game leading-tight">
                          {unit.title}
                        </h3>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isCompleted ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      ) : isUnlocked ? (
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs animate-bounce">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                    {unit.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">
                      {unit.questionsCount} Questions
                    </span>

                    {isUnlocked ? (
                      <Button
                        variant={isCurrent ? 'amber' : 'secondary'}
                        size="sm"
                        onClick={() => navigateTo('unit', { unitId: unit.id })}
                        className="gap-1.5"
                      >
                        <span>{isCompleted ? 'Review' : 'Enter'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    ) : (
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    )}
                  </div>
                </div>

                {/* Central Step Orb on Path */}
                <div
                  className={`w-14 h-14 rounded-3xl z-10 flex items-center justify-center text-xl font-black font-game shadow-md transition-all shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-emerald-200'
                      : isCurrent
                      ? 'bg-amber-500 text-white shadow-amber-300 ring-4 ring-amber-200 animate-pulse'
                      : 'bg-slate-300 text-slate-600'
                  }`}
                >
                  {unit.number}
                </div>
              </div>
            );
          })}

          {/* BOSS BATTLE LEVEL */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div
              className={`w-full sm:w-80 rounded-3xl p-6 transition-all duration-200 border-2 ${
                state.bossDefeated
                  ? 'bg-gradient-to-br from-violet-900 to-indigo-900 text-white border-amber-400 shadow-xl'
                  : isBossUnlocked
                  ? 'bg-gradient-to-br from-slate-900 to-violet-950 text-white border-violet-400 shadow-xl ring-4 ring-violet-300'
                  : 'bg-slate-800 text-slate-400 border-slate-700 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🐉</span>
                  <div>
                    <span className="text-xs font-extrabold text-amber-400 uppercase">
                      Final Boss
                    </span>
                    <h3 className="text-lg font-black font-game leading-tight text-white">
                      Grammar Castle
                    </h3>
                  </div>
                </div>

                <div>
                  {state.bossDefeated ? (
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
                      🏆
                    </div>
                  ) : isBossUnlocked ? (
                    <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center animate-bounce">
                      ⚡
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-400 flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-4">
                Lord Verbose awaits! Defeat him with your A1 grammar and home vocabulary mastery!
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <span className="text-[11px] font-bold text-amber-300">
                  100 HP · 10 Questions
                </span>

                {isBossUnlocked ? (
                  <Button
                    variant="amber"
                    size="sm"
                    onClick={() => navigateTo('boss')}
                    className="gap-1.5 font-black text-slate-900"
                  >
                    <span>{state.bossDefeated ? 'Fight Again' : 'Fight Boss!'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Complete Units 1-3
                  </span>
                )}
              </div>
            </div>

            {/* Castle Central Node */}
            <div
              className={`w-14 h-14 rounded-3xl z-10 flex items-center justify-center text-2xl font-black font-game shadow-md transition-all shrink-0 ${
                state.bossDefeated
                  ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-300'
                  : isBossUnlocked
                  ? 'bg-violet-600 text-white ring-4 ring-violet-300'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              👑
            </div>
          </div>

          {/* COMING SOON - WORLD 2 */}
          <div className="flex flex-col items-center justify-center pt-4">
            <div className="p-6 rounded-3xl bg-amber-50/60 border border-dashed border-amber-300 text-center max-w-sm">
              <span className="text-2xl mb-1 block">🚀</span>
              <h4 className="text-base font-black text-slate-800 font-game">
                World 2: Coming Soon!
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                A1 Units 4–42 & A2 Kingdom are currently under construction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
