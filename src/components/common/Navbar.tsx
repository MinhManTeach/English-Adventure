import React from 'react';
import { Volume2, VolumeX, Shield, Heart, Flame, Coins, Sparkles, Settings, ShoppingBag } from 'lucide-react';
import { useGame, AppScreen } from '../../context/GameContext';
import { PlayerAvatar } from '../avatar/PlayerAvatar';
import { AVATAR_PRESETS } from '../../data/avatarsData';

export const Navbar: React.FC = () => {
  const { state, levelInfo, currentScreen, navigateTo, updateSettings } = useGame();

  const currentAvatar =
    AVATAR_PRESETS.find(a => a.id === state.profile.avatarId) || AVATAR_PRESETS[0];

  const navLinks: { screen: AppScreen; label: string; labelVi: string }[] = [
    { screen: 'map', label: 'Adventure Map', labelVi: 'Bản Đồ' },
    { screen: 'learn', label: 'Learn', labelVi: 'Học' },
    { screen: 'review', label: 'Smart Review', labelVi: 'Ôn Tập' },
    { screen: 'achievements', label: 'Badges', labelVi: 'Huy Hiệu' },
    { screen: 'avatar', label: 'My Avatar', labelVi: 'Nhân Vật' },
    { screen: 'store', label: 'Store', labelVi: 'Cửa Hàng' },
    { screen: 'progress', label: 'My Progress', labelVi: 'Tiến Độ' },
  ];

  const toggleSound = () => {
    updateSettings({ soundEnabled: !state.settings.soundEnabled });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 min-h-16 flex flex-wrap min-[1440px]:flex-nowrap items-center justify-between gap-x-3 gap-y-2 py-2">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="flex shrink-0 items-center gap-2 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl p-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
            🌟
          </div>
          <div>
            <span className="text-base sm:text-lg whitespace-nowrap font-black tracking-tight text-slate-900 font-game block leading-none">
              English Adventure
            </span>
            <span className="block whitespace-nowrap text-[10px] sm:text-[11px] font-semibold text-amber-700 tracking-wide uppercase">
              Hành Trình Chinh Phục
            </span>
          </div>
        </button>

        {/* Zone 2: Clean Navigation Links */}
        <nav className="hidden min-[1440px]:flex shrink-0 items-center gap-3 xl:gap-4 text-sm font-bold text-slate-600">
          {navLinks.map(link => {
            const isActive = currentScreen === link.screen;
            return (
              <button
                key={link.screen}
                type="button"
                onClick={() => navigateTo(link.screen)}
                className={`relative py-2 transition-colors cursor-pointer whitespace-nowrap hover:text-amber-600 ${
                  isActive ? 'text-amber-600 font-extrabold' : 'text-slate-600'
                }`}
              >
                {link.screen === 'store' && <ShoppingBag aria-hidden="true" className="inline mr-1 h-4 w-4" />}{link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Character HUD & Controls with Tooltips (Requirement 8) */}
        <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 ml-auto">
          {/* Daily Streak */}
          <div className="relative group/tooltip">
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 text-orange-600 font-extrabold text-sm border border-orange-100 cursor-default select-none"
            >
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="tabular-nums">{state.streak}</span>
            </div>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              Daily Streak: {state.streak} Days
            </span>
          </div>

          {/* Hearts */}
          <div className="relative group/tooltip">
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-600 font-extrabold text-sm border border-rose-100 cursor-default select-none"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span className="tabular-nums">{state.hearts}</span>
            </div>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              Hearts: {state.hearts} / {state.maxHearts} Lives
            </span>
          </div>

          {/* Coins */}
          <div className="relative group/tooltip hidden sm:block">
            <div
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-700 font-extrabold text-sm border border-amber-100 cursor-default select-none"
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="tabular-nums">{state.coins}</span>
            </div>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              Coins: {state.coins}
            </span>
          </div>

          {/* Level & XP */}
          <div className="relative group/tooltip hidden sm:block">
            <button
              type="button"
              onClick={() => navigateTo('progress')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span className="font-extrabold">Lv.{levelInfo.level}</span>
            </button>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              Level {levelInfo.level} · {state.xp} XP
            </span>
          </div>

          {/* Sound Toggle */}
          <div className="relative group/tooltip">
            <button
              type="button"
              onClick={toggleSound}
              aria-label="Toggle sound"
              className="min-w-11 min-h-11 p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {state.settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-amber-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              {state.settings.soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
            </span>
          </div>

          {/* Settings / Parent link */}
          <div className="relative group/tooltip">
            <button
              type="button"
              onClick={() => navigateTo('settings')}
              aria-label="Settings"
              className="min-w-11 min-h-11 p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Settings className="w-5 h-5" />
            </button>
            <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              Settings & Options
            </span>
          </div>

          {/* Avatar Profile Pill */}
          <div className="relative group/tooltip">
            <button
              type="button"
              onClick={() => navigateTo('avatar')}
              aria-label="Open My Avatar"
              className="min-h-12 flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-2xl bg-amber-100/70 border border-amber-200 hover:bg-amber-200 transition-all cursor-pointer group"
            >
              <PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" variant="compact" decorative />
              <span className="text-xs font-bold text-slate-800 max-w-[70px] truncate hidden md:inline">
                {state.profile.name || 'Hero'}
              </span>
            </button>
            <span className="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100 shadow-md hidden sm:block z-50">
              {state.profile.name || 'Hero'} · {currentAvatar.title}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="min-[1440px]:hidden flex items-center sm:justify-center gap-1 border-t border-amber-50 bg-amber-50/50 px-2 py-1.5 overflow-x-auto text-xs font-bold text-slate-600">
        {navLinks.map(link => (
          <button
            key={link.screen}
            type="button"
            onClick={() => navigateTo(link.screen)}
            className={`shrink-0 min-h-11 px-2.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
              currentScreen === link.screen ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
            }`}
          >
            {link.screen === 'store' && <ShoppingBag aria-hidden="true" className="inline mr-1 h-4 w-4" />}{link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
