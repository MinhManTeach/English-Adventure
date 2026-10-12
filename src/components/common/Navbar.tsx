import React from 'react';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useGame, AppScreen } from '../../context/GameContext';
import { PlayerAvatar } from '../avatar/PlayerAvatar';
import { Mascot } from './Mascot';

interface NavItem { screen: AppScreen; icon: string; label: string; labelVi: string; tab?: boolean }

/** One list drives the desktop sidebar and the mobile tab bar, so both always match. */
export const NAV_ITEMS: readonly NavItem[] = [
  { screen: 'home', icon: '🏠', label: 'Home', labelVi: 'Trang chủ', tab: true },
  { screen: 'map', icon: '🗺️', label: 'Map', labelVi: 'Bản đồ', tab: true },
  { screen: 'learn', icon: '📖', label: 'Learn', labelVi: 'Bài học', tab: true },
  { screen: 'review', icon: '🎯', label: 'Review', labelVi: 'Ôn tập', tab: true },
  { screen: 'achievements', icon: '🏆', label: 'Badges', labelVi: 'Huy hiệu', tab: true },
  { screen: 'store', icon: '🛍️', label: 'Shop', labelVi: 'Cửa hàng' },
  { screen: 'avatar', icon: '🦊', label: 'My Hero', labelVi: 'Nhân vật' },
  { screen: 'progress', icon: '📊', label: 'Progress', labelVi: 'Tiến độ' },
];

/** Screens that belong to a nav item even though they have no item of their own. */
const SECTION_OF: Partial<Record<AppScreen, AppScreen>> = { unit: 'map', settings: 'progress', parent: 'progress' };

function useActiveSection() {
  const { currentScreen } = useGame();
  return SECTION_OF[currentScreen] ?? currentScreen;
}

const Brand: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { navigateTo } = useGame();
  return (
    <button type="button" onClick={() => navigateTo('home')} aria-label="English Adventure home"
      className="flex items-center gap-2 rounded-2xl p-1 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 cursor-pointer">
      <Mascot size={compact ? 36 : 44} />
      <span className={compact ? 'sr-only sm:not-sr-only' : ''}>
        <span className="block font-display text-xl font-black leading-none tracking-tight text-go">english<span className="text-sky-brand">adventure</span></span>
        {!compact && <span className="block text-xs font-extrabold text-ink-soft">Chinh phục tiếng Anh</span>}
      </span>
    </button>
  );
};

/** Desktop left rail, Duolingo style: big friendly rows with an outlined active state. */
export const SideNav: React.FC = () => {
  const { navigateTo } = useGame();
  const active = useActiveSection();
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col gap-6 border-r-2 border-line bg-white px-4 py-6 lg:flex">
      <div className="px-2"><Brand /></div>
      <nav aria-label="Main" className="flex flex-col gap-1.5">
        {NAV_ITEMS.map(item => {
          const isActive = active === item.screen;
          return (
            <button key={item.screen} type="button" onClick={() => navigateTo(item.screen)} aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-4 rounded-2xl border-2 px-3 py-2 text-left transition-colors cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
                isActive ? 'border-sky-brand/60 bg-sky-50' : 'border-transparent hover:bg-cloud'}`}>
              <span aria-hidden="true" className="text-[28px] leading-none">{item.icon}</span>
              <span className="min-w-0">
                <span className={`block font-display text-[15px] font-black uppercase tracking-wide ${isActive ? 'text-sky-brand-dark' : 'text-ink-soft'}`}>{item.label}</span>
                <span className="block text-xs font-bold text-ink-soft/80">{item.labelVi}</span>
              </span>
            </button>
          );
        })}
      </nav>
      <button type="button" onClick={() => navigateTo('settings')}
        className="mt-auto flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-extrabold text-ink-soft hover:bg-cloud cursor-pointer">
        <Settings aria-hidden="true" className="h-5 w-5" /> Settings · Cài đặt
      </button>
    </aside>
  );
};

/** Mobile bottom tab bar with the five most used places. */
export const BottomTabs: React.FC = () => {
  const { navigateTo } = useGame();
  const active = useActiveSection();
  return (
    <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {NAV_ITEMS.filter(item => item.tab).map(item => {
          const isActive = active === item.screen;
          return (
            <button key={item.screen} type="button" onClick={() => navigateTo(item.screen)} aria-current={isActive ? 'page' : undefined}
              className="flex min-h-16 flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none focus-visible:bg-sky-50">
              <span aria-hidden="true" className={`flex h-9 w-12 items-center justify-center rounded-xl border-2 text-2xl leading-none transition-colors ${
                isActive ? 'border-sky-brand/60 bg-sky-50' : 'border-transparent'}`}>{item.icon}</span>
              <span className={`text-[11px] font-black ${isActive ? 'text-sky-brand-dark' : 'text-ink-soft'}`}>{item.labelVi}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

const Stat: React.FC<{ icon: string; value: number; label: string; color: string; onClick?: () => void }> = ({ icon, value, label, color, onClick }) => {
  const body = <><span aria-hidden="true" className="text-xl leading-none">{icon}</span><span className={`tabular-nums font-display text-base font-black ${color}`}>{value}</span></>;
  const cls = 'flex min-h-11 items-center gap-1.5 rounded-xl px-2 sm:px-2.5';
  return onClick
    ? <button type="button" onClick={onClick} title={label} aria-label={`${label}: ${value}`} className={`${cls} hover:bg-cloud cursor-pointer`}>{body}</button>
    : <span title={label} aria-label={`${label}: ${value}`} role="img" className={cls}>{body}</span>;
};

/** Top bar: streak, hearts, coins and the player's hero, the same on every screen. */
export const Navbar: React.FC = () => {
  const { state, levelInfo, navigateTo, updateSettings } = useGame();
  return (
    <header className="sticky top-0 z-30 border-b-2 border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-3 sm:px-5">
        <div className="lg:hidden"><Brand compact /></div>
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <Stat icon="🔥" value={state.streak} label="Daily streak · Chuỗi ngày học" color="text-flame" />
          <Stat icon="❤️" value={state.hearts} label="Hearts · Tim" color="text-berry" />
          <Stat icon="🪙" value={state.coins} label="Coins · Xu" color="text-sun-dark" onClick={() => navigateTo('store')} />
          <Stat icon="⭐" value={levelInfo.level} label="Level · Cấp độ" color="text-sky-brand-dark" onClick={() => navigateTo('progress')} />
          <button type="button" onClick={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
            aria-label="Toggle sound" aria-pressed={state.settings.soundEnabled}
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-xl text-ink-soft hover:bg-cloud cursor-pointer sm:flex">
            {state.settings.soundEnabled ? <Volume2 className="h-5 w-5 text-sky-brand" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button type="button" onClick={() => navigateTo('avatar')} aria-label="Open My Avatar"
            className="ml-1 rounded-full border-2 border-line p-0.5 hover:border-sky-brand cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300">
            <PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" variant="compact" decorative />
          </button>
        </div>
      </div>
    </header>
  );
};
