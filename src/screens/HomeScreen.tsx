import React from 'react';
import { useGame, AppScreen } from '../context/GameContext';
import { PlayerAvatar } from '../components/avatar/PlayerAvatar';
import { Button } from '../components/common/Button';
import { MascotSays } from '../components/common/Mascot';
import { getNextStep, getWorldPath, getWorldCompletion } from '../engine/journey';
import { getWorld } from '../data/worlds';
import { describeStep, openStep, worldColors } from '../components/map/journeyUi';
import { PronounceButton } from '../components/common/PronounceButton';
import { DAILY_XP_GOAL, xpEarnedOn, weekActivity, sentenceOfTheDay } from '../engine/daily';
import { getTodayDateString } from '../services/storage';

const TILES: readonly { screen: AppScreen; icon: string; title: string; titleVi: string; tint: string }[] = [
  { screen: 'map', icon: '🗺️', title: 'Map', titleVi: 'Bản đồ phiêu lưu', tint: '#d7ffb8' },
  { screen: 'learn', icon: '📖', title: 'Learn', titleVi: 'Thẻ ngữ pháp', tint: '#ddf4ff' },
  { screen: 'review', icon: '🎯', title: 'Review', titleVi: 'Luyện câu sai', tint: '#ffdfe0' },
  { screen: 'achievements', icon: '🏆', title: 'Badges', titleVi: 'Huy hiệu', tint: '#fff4cc' },
  { screen: 'store', icon: '🛍️', title: 'Shop', titleVi: 'Cửa hàng', tint: '#f3e3ff' },
  { screen: 'progress', icon: '📊', title: 'Progress', titleVi: 'Tiến độ', tint: '#d2fbef' },
];

export const HomeScreen: React.FC = () => {
  const { state, levelInfo, navigateTo } = useGame();
  const step = getNextStep(state);
  const info = describeStep(step);
  const world = getWorld(step.chapter);
  const colors = worldColors(step.chapter);
  const done = Math.round(getWorldCompletion(getWorldPath(state, step.chapter)) * 5);
  const mistakes = Object.values(state.errorBank).filter(item => !item.mastered).length;
  const name = state.profile.name || 'Hero';
  const today = getTodayDateString();
  const xpToday = xpEarnedOn(state, today);
  const week = weekActivity(state, today);
  const sentence = sentenceOfTheDay(step.kind === 'unit' ? step.unitId : world.units[0], today);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      <div className="space-y-6">
        <MascotSays title={`Hi ${name}! 👋`} subtitle={step.kind === 'done' ? 'Bạn đã là nhà vô địch A1!' : 'Hôm nay mình học tiếp nhé!'} />

        {/* Continue card: always opens the next stop the player can actually play. */}
        <section aria-label="Continue" className="relative overflow-hidden rounded-3xl p-5 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] sm:p-7"
          style={{ backgroundColor: colors.main, borderBottom: `6px solid ${colors.dark}`,
            backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(255,255,255,.28) 0 60px, transparent 61px), radial-gradient(circle at 70% 110%, rgba(255,255,255,.18) 0 90px, transparent 91px), radial-gradient(rgba(255,255,255,.18) 2px, transparent 2.5px)',
            backgroundSize: 'auto, auto, 22px 22px' }}>
          <span aria-hidden="true" className="pointer-events-none absolute -right-2 top-2 select-none text-[96px] leading-none drop-shadow-lg sm:text-[150px] animate-float">{info.icon}</span>
          <p className="eyebrow relative max-w-[72%] text-white/90">{info.eyebrow} · {world.title}</p>
          <h1 className="relative mt-1 max-w-[75%] font-display text-3xl font-black leading-tight drop-shadow-sm sm:text-4xl">{info.title}</h1>
          <p className="relative mt-1 max-w-[70%] text-sm font-bold text-white/95">{info.titleVi}</p>
          {step.kind !== 'done' && (
            <div className="relative mt-4 flex max-w-sm items-center gap-3">
              <div className="h-4 flex-1 rounded-full bg-black/15" role="progressbar" aria-label={`World ${step.chapter} progress`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={done}>
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${(done / 5) * 100}%` }} />
              </div>
              <span className="text-sm font-black tabular-nums">{done}/5</span>
            </div>
          )}
          <Button variant="secondary" size="xl" onClick={() => openStep(navigateTo, step)}
            className="relative mt-5 w-full uppercase sm:w-auto sm:min-w-64" style={{ color: colors.dark }}>
            {step.kind === 'done' ? 'Open map · Xem bản đồ' : step.kind === 'boss' ? 'Fight! · Chiến thôi' : 'Start · Bắt đầu'}
          </Button>
        </section>
      </div>

      <aside className="space-y-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        {/* Hero */}
        <section aria-label="My hero" className="card-3d flex items-center gap-3 p-4">
          <button type="button" onClick={() => navigateTo('avatar')} aria-label="Change avatar"
            className="shrink-0 rounded-2xl border-2 border-line bg-sky-50 p-1 hover:border-sky-brand cursor-pointer">
            <PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" decorative />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-black text-ink">{name}</p>
            <p className="text-xs font-extrabold text-ink-soft">Level {levelInfo.level} · {levelInfo.title}</p>
            <div className="mt-1.5 h-3 rounded-full bg-line" role="progressbar" aria-label="Level progress" aria-valuemin={0} aria-valuemax={levelInfo.neededLevelXP} aria-valuenow={levelInfo.currentLevelXP}>
              <div className="h-full rounded-full bg-sun" style={{ width: `${levelInfo.progressPercent}%` }} />
            </div>
            <p className="mt-1 text-[11px] font-bold text-ink-soft tabular-nums">{levelInfo.currentLevelXP} / {levelInfo.neededLevelXP} XP · 🪙 {state.coins} xu</p>
          </div>
        </section>

        {/* Daily goal */}
        <section aria-label="Daily goal" className="card-3d p-4">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className={`text-4xl ${xpToday >= DAILY_XP_GOAL ? 'animate-float' : ''}`}>{xpToday >= DAILY_XP_GOAL ? '🎁' : '🎯'}</span>
            <div className="min-w-0 flex-1">
              <p className="eyebrow text-flame">Daily goal</p>
              <p className="font-display text-base font-black text-ink">Mục tiêu hôm nay</p>
              <p className="text-xs font-bold text-ink-soft">{xpToday >= DAILY_XP_GOAL ? 'Hoàn thành rồi, giỏi quá!' : `Kiếm ${DAILY_XP_GOAL} XP hôm nay`}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-4 flex-1 rounded-full bg-line" role="progressbar" aria-label="Daily XP" aria-valuemin={0} aria-valuemax={DAILY_XP_GOAL} aria-valuenow={Math.min(xpToday, DAILY_XP_GOAL)}>
              <div className="h-full rounded-full bg-flame" style={{ width: `${Math.min(100, (xpToday / DAILY_XP_GOAL) * 100)}%` }} />
            </div>
            <span className="text-xs font-black tabular-nums text-ink-soft">{Math.min(xpToday, DAILY_XP_GOAL)}/{DAILY_XP_GOAL}</span>
          </div>
        </section>

        {/* Streak this week */}
        <section aria-label="Streak this week" className="card-3d p-4">
          <p className="font-display text-base font-black text-ink"><span aria-hidden="true">🔥</span> {state.streak} ngày liên tiếp</p>
          <ol className="mt-3 grid grid-cols-7 gap-1 text-center">
            {week.map(day => (
              <li key={day.date} className="flex flex-col items-center gap-1">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${day.active ? 'bg-flame text-white' : 'bg-line'} ${day.isToday ? 'ring-2 ring-flame ring-offset-2' : ''}`}
                  aria-label={`${day.label}${day.active ? ': đã học' : ''}`}>{day.active ? '🔥' : ''}</span>
                <span className={`text-[11px] font-black ${day.isToday ? 'text-flame' : 'text-ink-soft'}`}>{day.label}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Sentence of the day */}
        {sentence && (
          <section aria-label="Sentence of the day" className="card-3d p-4">
            <p className="eyebrow text-grape-dark">Câu hay hôm nay</p>
            <div className="mt-1 flex items-start gap-2">
              <p className="min-w-0 flex-1 font-display text-lg font-black leading-snug text-ink">{sentence.en}</p>
              <PronounceButton text={sentence.en} label="Nghe" />
            </div>
            <p className="mt-1 text-sm font-bold text-ink-soft">{sentence.vi}</p>
          </section>
        )}
      </aside>

      <div className="space-y-6 lg:col-start-1">
        <section aria-label="More to do" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TILES.map(tile => (
            <button key={tile.screen} type="button" onClick={() => navigateTo(tile.screen)} className="card-3d relative flex items-center gap-3 p-3 text-left cursor-pointer sm:p-4">
              <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: tile.tint }}>{tile.icon}</span>
              <span className="min-w-0">
                <span className="block font-display text-base font-black text-ink">{tile.title}</span>
                <span className="block truncate text-xs font-bold text-ink-soft">{tile.titleVi}</span>
              </span>
              {tile.screen === 'review' && mistakes > 0 && (
                <span className="absolute -right-1.5 -top-1.5 min-w-6 rounded-full border-2 border-white bg-berry px-1.5 text-center text-xs font-black text-white">{mistakes}</span>
              )}
            </button>
          ))}
        </section>

        <p className="text-center">
          <button type="button" onClick={() => navigateTo('parent')} className="rounded-full bg-white/70 px-3 py-1 text-xs font-extrabold text-ink-soft underline underline-offset-4 hover:text-ink cursor-pointer">
            Góc phụ huynh · Parent dashboard
          </button>
        </p>
      </div>
    </div>
  );
};
