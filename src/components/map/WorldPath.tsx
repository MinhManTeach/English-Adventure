import React from 'react';
import { Lock, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { PlayerAvatar } from '../avatar/PlayerAvatar';
import { ALL_UNITS } from '../../data/unitsMeta';
import { getWorld, LAST_CHAPTER } from '../../data/worlds';
import { ChapterId } from '../../types';
import { NodeStatus, isChapterBossDefeated } from '../../engine/worldProgression';
import { PathNode, getWorldPath, getWorldCompletion } from '../../engine/journey';
import { openStep, worldColors } from './journeyUi';

export const nodeKey = (node: { kind: string; chapter: number; unitId?: number }) => `${node.kind}-${node.chapter}-${node.unitId ?? ''}`;

const STATUS_VI: Record<NodeStatus, string> = {
  LOCKED: 'Chưa mở', AVAILABLE: 'Sẵn sàng', 'IN PROGRESS': 'Đang học', COMPLETED: 'Đã xong', MASTERED: 'Thành thạo',
};
const finished = (status: NodeStatus) => status === 'COMPLETED' || status === 'MASTERED';
/** Horizontal offsets that make the path zig-zag; odd and even worlds bend opposite ways. */
const OFFSETS = [0, 52, 78, 52, 0];
/** Scenery planted beside the path; each world mixes its own emojis with these. */
const NATURE = ['🌳', '🌼', '🍄', '🌲', '🌷', '⛰️', '🌻', '🪨'];

interface Props { chapter: ChapterId; currentKey: string | null; selectedKey: string | null; onSelect: (key: string | null) => void }

/** One world on the adventure map: a coloured banner, then a winding path of five round stops. */
export const WorldPath: React.FC<Props> = ({ chapter, currentKey, selectedKey, onSelect }) => {
  const { state, navigateTo } = useGame();
  const world = getWorld(chapter);
  const colors = worldColors(chapter);
  const path = getWorldPath(state, chapter);
  const open = chapter === 1 || isChapterBossDefeated(state, (chapter - 1) as ChapterId);
  const cleared = isChapterBossDefeated(state, chapter);
  const doneCount = Math.round(getWorldCompletion(path) * path.length);
  const side = chapter % 2 === 0 ? -1 : 1;
  const own = world.emojis.split(' ').filter(Boolean);
  const scenery = [own[1] ?? NATURE[0], NATURE[chapter % NATURE.length], own[2] ?? NATURE[1], NATURE[(chapter + 3) % NATURE.length], own[0] ?? NATURE[2]];

  const describe = (node: PathNode) => {
    if (node.kind === 'unit') {
      const unit = ALL_UNITS.find(u => u.id === node.unitId)!;
      return { icon: unit.icon, label: `Unit ${unit.number}`, title: unit.title, sub: unit.subtitle,
        action: finished(node.status) ? 'Practice again · Ôn lại' : node.status === 'IN PROGRESS' ? 'Continue · Học tiếp' : 'Start · Bắt đầu',
        lockedHint: open ? 'Hoàn thành bài trước để mở bài này.' : `Đánh bại trùm thế giới ${chapter - 1} để mở.` };
    }
    if (node.kind === 'review') return { icon: '📜', label: 'Checkpoint', title: 'Review Gate', sub: `8 câu trộn từ Unit ${world.units[0]}–${world.units[2]}. Đúng 80% để gặp trùm.`,
      action: finished(node.status) ? 'Review again · Ôn lại' : 'Start · Bắt đầu', lockedHint: 'Hoàn thành 3 bài của thế giới này để mở.' };
    return { icon: world.boss.emoji, label: 'Boss', title: world.boss.fullName, sub: world.boss.mapBlurb,
      action: cleared ? 'Fight again · Đấu lại' : `${world.boss.fightLabel} · Chiến!`, lockedHint: 'Qua Cổng ôn tập để gặp trùm.' };
  };

  return (
    <section aria-label={`World ${chapter} ${world.title}`} className="relative space-y-6 overflow-hidden rounded-[2rem] border-2 border-white/80 p-3 sm:p-4"
      style={{ background: open ? `linear-gradient(180deg, ${colors.soft} 0%, rgba(255,255,255,.55) 100%)` : 'linear-gradient(180deg, #ececec 0%, rgba(255,255,255,.5) 100%)',
      }}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: `radial-gradient(${open ? colors.main : '#bdbdbd'}22 2px, transparent 2.5px)`, backgroundSize: '24px 24px' }} />
      <header className="relative flex items-center gap-3 rounded-3xl p-4 text-white shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] sm:p-5"
        style={open ? { backgroundColor: colors.main, borderBottom: `5px solid ${colors.dark}` } : { backgroundColor: '#afafaf', borderBottom: '5px solid #8f8f8f' }}>
        <div className="min-w-0 flex-1">
          <p className="eyebrow text-white/85">World {chapter} · {STATUS_VI[cleared ? 'COMPLETED' : open ? 'AVAILABLE' : 'LOCKED']}</p>
          <h2 className="font-display text-2xl font-black leading-tight">{world.title}</h2>
          <p className="text-sm font-bold text-white/90">{world.titleVi}</p>
        </div>
        <div className="shrink-0 text-right">
          {open ? <p className="font-display text-2xl font-black tabular-nums">{doneCount}/5</p> : <Lock aria-label="Locked" className="ml-auto h-7 w-7" />}
          <p aria-hidden="true" className="text-lg tracking-tight">{world.emojis.split(' ').slice(0, 3).join('')}</p>
        </div>
      </header>

      <ol className="relative flex flex-col items-center gap-8 pb-4 pt-6">
        {path.map((node, index) => {
          const key = nodeKey(node);
          const info = describe(node);
          const locked = node.status === 'LOCKED';
          const isCurrent = key === currentKey;
          const isBoss = node.kind === 'boss';
          const size = isBoss ? 96 : 76;
          const x = OFFSETS[index] * side;
          const face = locked ? { bg: '#e5e5e5', edge: '#c4c4c4' } : { bg: colors.main, edge: colors.dark };
          const selected = selectedKey === key;
          return (
            <li key={key} className="relative flex w-full flex-col items-center">
              {!isCurrent && <span aria-hidden="true" className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-4xl drop-shadow sm:text-5xl ${open ? '' : 'opacity-40 grayscale'}`}
                style={{ left: `calc(50% + ${-side * (128 + (index % 2) * 28)}px - 24px)` }}>{scenery[index % scenery.length]}</span>}
              <div className="relative" style={{ transform: `translateX(${x}px)` }}>
                {isCurrent && !selected && (
                  <span className="animate-nudge absolute -top-11 left-1/2 z-10 whitespace-nowrap rounded-xl border-2 border-line bg-white px-3 py-1.5 font-display text-sm font-black uppercase"
                    style={{ color: colors.main }}>
                    {node.status === 'IN PROGRESS' ? 'Học tiếp' : 'Bắt đầu'}
                    <span aria-hidden="true" className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-line bg-white" />
                  </span>
                )}
                {isCurrent && (
                  <span className="absolute top-1/2 -translate-y-1/2" style={{ [side > 0 ? 'right' : 'left']: `${size + 20}px` }}>
                    <PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" variant="compact" decorative />
                  </span>
                )}
                <button type="button" data-current={isCurrent || undefined} onClick={() => onSelect(selected ? null : key)}
                  aria-expanded={selected} aria-label={`${info.label}: ${info.title}. ${STATUS_VI[node.status]}`}
                  className={`relative flex items-center justify-center rounded-full transition-transform active:translate-y-1 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${isCurrent ? 'ring-[6px] ring-offset-4' : ''}`}
                  style={{ width: size, height: size, backgroundColor: face.bg, borderBottom: `7px solid ${face.edge}`, ['--tw-ring-color' as string]: `${colors.main}55` }}>
                  <span aria-hidden="true" className={`${isBoss ? 'text-5xl' : 'text-4xl'} leading-none ${locked ? 'opacity-40 grayscale' : ''}`}>{info.icon}</span>
                  {finished(node.status) && (
                    <span aria-hidden="true" className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-sun text-white">
                      <Check className="h-4 w-4" strokeWidth={4} />
                    </span>
                  )}
                  {locked && (
                    <span aria-hidden="true" className="absolute -bottom-2 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-ink-soft text-white">
                      <Lock className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                </button>
              </div>

              {selected && (
                <div role="dialog" aria-label={info.title} className="relative z-10 mt-4 w-full max-w-xs rounded-2xl p-4 animate-pop"
                  style={locked ? { backgroundColor: '#f7f7f7', border: '2px solid #e5e5e5' } : { backgroundColor: colors.main, borderBottom: `5px solid ${colors.dark}` }}>
                  <p className={`eyebrow ${locked ? 'text-ink-soft' : 'text-white/85'}`}>{info.label} · {STATUS_VI[node.status]}</p>
                  <h3 className={`font-display text-xl font-black leading-tight ${locked ? 'text-ink' : 'text-white'}`}>{info.title}</h3>
                  <p className={`mt-1 text-sm font-bold ${locked ? 'text-ink-soft' : 'text-white/90'}`}>{locked ? info.lockedHint : info.sub}</p>
                  {locked ? (
                    <p className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-line py-3 font-display font-black uppercase text-ink-soft"><Lock className="h-4 w-4" /> Locked · Chưa mở</p>
                  ) : (
                    <button type="button" onClick={() => openStep(navigateTo, node)}
                      className="mt-3 w-full rounded-2xl border-b-4 border-line bg-white py-3 font-display text-base font-black uppercase tracking-wide active:translate-y-[2px] active:border-b-2 cursor-pointer"
                      style={{ color: colors.dark }}>
                      {info.action}
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {cleared && (
        <section aria-label={`World ${chapter} Complete`} className="card-3d relative mx-auto max-w-md p-4 text-center">
          <p aria-hidden="true" className="text-3xl">🎉</p>
          <h3 className="font-display text-lg font-black text-ink">World {chapter} complete!</h3>
          <p className="text-sm font-bold text-ink-soft">{world.completeMessage}</p>
          <p className="mt-1 text-sm font-black" style={{ color: colors.dark }}>
            {chapter === LAST_CHAPTER ? '👑 A1 Champion! Bạn đã đi hết hành trình A1.' : `Thế giới ${chapter + 1} đã mở!`}
          </p>
        </section>
      )}
    </section>
  );
};
