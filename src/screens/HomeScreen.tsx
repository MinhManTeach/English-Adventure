import React from 'react';
import { useGame, AppScreen } from '../context/GameContext';
import { PlayerAvatar } from '../components/avatar/PlayerAvatar';
import { Button } from '../components/common/Button';
import { MascotSays } from '../components/common/Mascot';
import { getNextStep, getWorldPath, getWorldCompletion } from '../engine/journey';
import { getWorld, WORLDS } from '../data/worlds';
import { describeStep, openStep, worldColors } from '../components/map/journeyUi';

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

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:py-8">
      <MascotSays title={`Hi ${name}! 👋`} subtitle={step.kind === 'done' ? 'Bạn đã là nhà vô địch A1!' : 'Hôm nay mình học tiếp nhé!'} />

      {/* Continue card: always opens the next stop the player can actually play. */}
      <section aria-label="Continue" className="relative overflow-hidden rounded-3xl p-5 text-white sm:p-7"
        style={{ backgroundColor: colors.main, borderBottom: `6px solid ${colors.dark}` }}>
        <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-6 select-none text-[140px] leading-none opacity-25">{info.icon}</span>
        <p className="eyebrow text-white/85">{info.eyebrow} · {world.title}</p>
        <h1 className="mt-1 font-display text-3xl font-black leading-tight sm:text-4xl">{info.title}</h1>
        <p className="mt-1 max-w-md text-sm font-bold text-white/90">{info.titleVi}</p>
        {step.kind !== 'done' && (
          <div className="mt-4 flex max-w-sm items-center gap-3">
            <div className="h-4 flex-1 rounded-full bg-black/15" role="progressbar" aria-label={`World ${step.chapter} progress`} aria-valuemin={0} aria-valuemax={5} aria-valuenow={done}>
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${(done / 5) * 100}%` }} />
            </div>
            <span className="text-sm font-black tabular-nums">{done}/5</span>
          </div>
        )}
        <Button variant="secondary" size="xl" onClick={() => openStep(navigateTo, step)}
          className="mt-5 w-full uppercase sm:w-auto sm:min-w-64" style={{ color: colors.dark }}>
          {step.kind === 'done' ? 'Open map · Xem bản đồ' : step.kind === 'boss' ? 'Fight! · Chiến thôi' : 'Start · Bắt đầu'}
        </Button>
      </section>

      {/* Hero and daily stats */}
      <section aria-label="My hero" className="card-3d flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button type="button" onClick={() => navigateTo('avatar')} aria-label="Change avatar"
            className="shrink-0 rounded-2xl border-2 border-line bg-cloud p-1 hover:border-sky-brand cursor-pointer">
            <PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" decorative />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-black text-ink">{name}</p>
            <p className="text-xs font-extrabold text-ink-soft">Level {levelInfo.level} · {levelInfo.title}</p>
            <div className="mt-1.5 h-3 rounded-full bg-line" role="progressbar" aria-label="Level progress" aria-valuemin={0} aria-valuemax={levelInfo.neededLevelXP} aria-valuenow={levelInfo.currentLevelXP}>
              <div className="h-full rounded-full bg-sun" style={{ width: `${levelInfo.progressPercent}%` }} />
            </div>
            <p className="mt-1 text-[11px] font-bold text-ink-soft tabular-nums">{levelInfo.currentLevelXP} / {levelInfo.neededLevelXP} XP</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:w-72">
          {[
            { icon: '🔥', value: state.streak, label: 'ngày liên tiếp', color: 'text-flame' },
            { icon: '🪙', value: state.coins, label: 'xu', color: 'text-sun-dark' },
            { icon: '🗺️', value: `${WORLDS.filter(w => step.kind === 'done' || w.chapter < step.chapter).length}/${WORLDS.length}`, label: 'thế giới', color: 'text-go-dark' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl bg-cloud px-2 py-2 text-center">
              <p className={`font-display text-lg font-black tabular-nums ${stat.color}`}><span aria-hidden="true">{stat.icon}</span> {stat.value}</p>
              <p className="text-[11px] font-bold text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

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
        <button type="button" onClick={() => navigateTo('parent')} className="text-xs font-extrabold text-ink-soft underline underline-offset-4 hover:text-ink cursor-pointer">
          Góc phụ huynh · Parent dashboard
        </button>
      </p>
    </div>
  );
};
