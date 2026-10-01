import React from 'react';
import { Trophy, CheckCircle2, Lock, Star, Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Achievement } from '../types';

export const AchievementsScreen: React.FC = () => {
  const { state } = useGame();

  const achievementsList = Object.values(state.achievements);
  const unlockedCount = achievementsList.filter(a => a.unlockedAt !== null).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-amber-100">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Trophy Hall · Sảnh Danh Vọng
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
            Achievements & Badges
          </h1>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-black text-slate-800">
            {unlockedCount} / {achievementsList.length} Unlocked
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievementsList.map(item => {
          const isUnlocked = item.unlockedAt !== null;
          const progressPercent = Math.min(
            100,
            Math.round((item.currentProgress / item.maxProgress) * 100)
          );

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border-2 transition-all duration-200 flex items-start gap-4 ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100'
                  : 'bg-slate-50/80 border-slate-200 opacity-70'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isUnlocked ? item.icon : <Lock className="w-6 h-6 text-slate-400" />}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 font-game">
                    {item.title}
                  </h3>
                  {isUnlocked && (
                    <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>

                <p className="text-xs font-semibold text-amber-800">{item.titleVi}</p>
                <p className="text-xs text-slate-600 leading-snug">{item.description}</p>

                {/* Progress Bar */}
                <div className="pt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                    <span>Progress</span>
                    <span>
                      {item.currentProgress} / {item.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isUnlocked ? 'bg-amber-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Rewards pill */}
                <div className="flex items-center gap-2 pt-1 text-[11px] font-extrabold">
                  <span className="text-indigo-600">+{item.xpReward} XP</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-amber-600">+{item.coinReward} Coins</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
