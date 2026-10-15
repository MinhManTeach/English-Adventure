import React from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Play, Sparkles, Trophy, Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getStageStatus, isStageAvailable } from '../engine/worldProgression';
import { ALL_UNITS, UNIT_STAGES } from '../data/unitsMeta';
import { Button } from '../components/common/Button';
import { WorldBackground } from '../components/common/WorldBackground';

export const UnitScreen: React.FC = () => {
  const { activeUnitId, navigateTo, state } = useGame();
  const unitId = activeUnitId || 1;
  const unit = ALL_UNITS.find(u => u.id === unitId) || ALL_UNITS[0];

  const isUnitCompleted = state.completedUnits.includes(unitId);

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <WorldBackground unitId={unitId} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-amber-100">
        <button
          type="button"
          onClick={() => navigateTo('map')}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white transition-colors flex items-center gap-1.5 font-bold text-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Adventure Map</span>
        </button>

        <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
          CEFR {unit.level} · Unit {unit.number}
        </span>
      </div>

      {/* Unit Hero Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner shrink-0">
              {unit.icon}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-200">
                Level {unit.level} · {unit.theme.toUpperCase()}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-game leading-tight">
                {unit.title}
              </h1>
              <p className="text-xs text-amber-100 font-medium">{unit.titleVi}</p>
            </div>
          </div>

          {isUnitCompleted && (
            <div className="self-start sm:self-center px-4 py-1.5 rounded-2xl bg-emerald-500/90 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Unit Completed (+50 XP)</span>
            </div>
          )}
        </div>

        <p className="text-sm text-white/90 leading-relaxed max-w-2xl">
          {unit.description}
        </p>

        {/* Grammar Topics Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {unit.grammarPoints.map(point => (
            <span
              key={point}
              className="text-xs font-bold px-3 py-1 rounded-xl bg-white/20 backdrop-blur-sm text-white border border-white/30"
            >
              ✓ {point}
            </span>
          ))}
        </div>
      </div>

      {/* Learning Loop Stages */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-800 font-game">
            Unit Roadmap
          </h2>
          <span className="text-xs font-bold text-slate-500">
            {UNIT_STAGES.filter(s => state.unitStageProgress[`unit${unitId}-${s.id}`]).length} / {UNIT_STAGES.length} Stages Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {UNIT_STAGES.map((stage, idx) => {
            const stageKey = `unit${unitId}-${stage.id}`;
            const stageStatus = getStageStatus(state, unitId, stage.id);
            const canEnter = isStageAvailable(state, unitId, stage.id);
            const isStageDone = !!state.unitStageProgress[stageKey] || isUnitCompleted;

            return (
              <div
                key={stage.id}
                className={`p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between gap-4 ${
                  isStageDone
                    ? 'bg-white border-emerald-300 shadow-xs'
                    : 'bg-white border-amber-200 shadow-sm hover:border-amber-400'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
                      Stage {idx + 1}
                    </span>

                    {isStageDone ? (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {stageStatus}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-600">{stageStatus}</span>
                    )}
                  </div>

                  <h3 className="text-lg font-black text-slate-800 font-game">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{stage.titleVi}</p>
                  <p className="text-xs text-slate-600 leading-snug">{stage.description}</p>
                </div>

                <div className="pt-2">
                  {stage.id === 'learn' ? (
                    <Button
                      variant={isStageDone ? 'secondary' : 'amber'}
                      size="md"
                      disabled={!canEnter}
                      onClick={() => navigateTo('learn', { unitId })}
                      className="w-full gap-2 font-black"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{!canEnter ? 'Locked' : isStageDone ? 'Review Knowledge' : 'Start Learn'}</span>
                    </Button>
                  ) : (
                    <Button
                      variant={isStageDone ? 'secondary' : 'primary'}
                      size="md"
                      disabled={!canEnter}
                      onClick={() => navigateTo('session', { unitId, stageId: stage.id as 'practice' | 'minigame' | 'challenge' })}
                      className="w-full gap-2 font-black"
                    >
                      <Play className="w-4 h-4" />
                      <span>{!canEnter ? 'Locked' : isStageDone ? 'Play Again' : `Start ${stage.title}`}</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  );
};
