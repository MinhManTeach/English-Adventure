import React from 'react';
import { Play, Sparkles, Map, BookOpen, RotateCcw, Trophy, User, BarChart2, Shield } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { AVATAR_PRESETS } from '../data/avatarsData';
import { ALL_UNITS } from '../data/unitsMeta';
import { Button } from '../components/common/Button';
import { WorldBackground } from '../components/common/WorldBackground';

export const HomeScreen: React.FC = () => {
  const { state, levelInfo, navigateTo } = useGame();

  const currentAvatar =
    AVATAR_PRESETS.find(a => a.id === state.profile.avatarId) || AVATAR_PRESETS[0];

  // Find next playable unit
  const nextUnitId =
    ALL_UNITS.find(u => !state.completedUnits.includes(u.id))?.id || 1;

  const mistakesCount = Object.values(state.errorBank).filter(i => !i.mastered).length;

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <WorldBackground unitId={nextUnitId} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Character Card */}
      <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-600/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <button
              type="button"
              onClick={() => navigateTo('avatar')}
              title="Change Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-5xl shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              {currentAvatar.icon}
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-black uppercase tracking-widest bg-white/25 px-2.5 py-0.5 rounded-lg text-white">
                  LEVEL {levelInfo.level}
                </span>
                <span className="text-xs font-bold text-amber-100">
                  {levelInfo.title}
                </span>
              </div>

              <h1 className="text-3xl font-black font-game leading-tight">
                {state.profile.name || 'Hero Explorer'}
              </h1>
              <p className="text-xs text-amber-100 font-semibold">{currentAvatar.tagline}</p>
            </div>
          </div>

          {/* Quick Stats Pill Group */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs font-extrabold text-slate-900 w-full sm:w-auto">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xs">
              <span className="text-slate-500 block text-[10px] uppercase">Streak</span>
              <span className="text-base text-orange-600 font-black">🔥 {state.streak} Days</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xs">
              <span className="text-slate-500 block text-[10px] uppercase">Coins</span>
              <span className="text-base text-amber-600 font-black">🪙 {state.coins}</span>
            </div>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/20 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-extrabold text-white">
            <span>LEVEL {levelInfo.level} PROGRESS</span>
            <span className="tabular-nums">
              {levelInfo.currentLevelXP} / {levelInfo.neededLevelXP} XP
            </span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-3 p-0.5 shadow-inner">
            <div
              className="bg-white rounded-full h-full transition-all duration-300 shadow-xs"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary CTA: CONTINUE ADVENTURE */}
      <div className="text-center py-2">
        <Button
          variant="amber"
          size="xl"
          onClick={() => navigateTo('unit', { unitId: nextUnitId })}
          className="w-full sm:w-auto min-w-[320px] gap-3 text-slate-900 font-black shadow-amber-600 text-2xl py-5"
        >
          <Play className="w-7 h-7 fill-slate-900" />
          <span>CONTINUE ADVENTURE</span>
        </Button>
      </div>

      {/* Secondary Hub Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Adventure Map */}
        <button
          type="button"
          onClick={() => navigateTo('map')}
          className="p-5 rounded-3xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🗺️
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">Adventure Map</h3>
          <p className="text-xs text-slate-500 font-medium">
            Explore 6 A1 lands and two chapter bosses.
          </p>
        </button>

        {/* Learn Screen */}
        <button
          type="button"
          onClick={() => navigateTo('learn')}
          className="p-5 rounded-3xl bg-white border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📖
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">Learn Academy</h3>
          <p className="text-xs text-slate-500 font-medium">
            Bite-sized grammar & audio cards.
          </p>
        </button>

        {/* Smart Review */}
        <button
          type="button"
          onClick={() => navigateTo('review')}
          className="p-5 rounded-3xl bg-white border-2 border-rose-200 hover:border-rose-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group relative"
        >
          {mistakesCount > 0 && (
            <span className="absolute top-4 right-4 text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
              {mistakesCount} to review
            </span>
          )}
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🎯
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">Smart Review</h3>
          <p className="text-xs text-slate-500 font-medium">
            Practice weak spots & error bank.
          </p>
        </button>

        {/* Achievements / Badges */}
        <button
          type="button"
          onClick={() => navigateTo('achievements')}
          className="p-5 rounded-3xl bg-white border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🏆
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">Badges</h3>
          <p className="text-xs text-slate-500 font-medium">
            View unlocked crowns & trophies.
          </p>
        </button>

        {/* Avatar Customization */}
        <button
          type="button"
          onClick={() => navigateTo('avatar')}
          className="p-5 rounded-3xl bg-white border-2 border-violet-200 hover:border-violet-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            🦊
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">My Avatar</h3>
          <p className="text-xs text-slate-500 font-medium">
            Change characters & hero titles.
          </p>
        </button>

        {/* My Progress */}
        <button
          type="button"
          onClick={() => navigateTo('progress')}
          className="p-5 rounded-3xl bg-white border-2 border-sky-200 hover:border-sky-400 hover:shadow-md transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            📊
          </div>
          <h3 className="text-base font-black text-slate-800 font-game">My Progress</h3>
          <p className="text-xs text-slate-500 font-medium">
            Grammar, vocab & listening stats.
          </p>
        </button>
      </div>

      {/* Parent Dashboard Quick Entry (Discreet parent area) */}
      <div className="pt-4 text-center">
        <button
          type="button"
          onClick={() => navigateTo('parent')}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 underline underline-offset-4 cursor-pointer"
        >
          Parent Dashboard · Khu Vực Phụ Huynh & Báo Cáo
        </button>
      </div>
    </div>
  </div>
  );
};
