import type { AppScreen } from '../../context/GameContext';
import type { ChapterId } from '../../types';
import type { NextStep } from '../../engine/journey';
import { ALL_UNITS } from '../../data/unitsMeta';
import { getWorld } from '../../data/worlds';

/** Each world gets one bright colour; the list repeats after seven worlds. */
const PALETTE = [
  { main: '#58cc02', dark: '#58a700', soft: '#d7ffb8' }, // green
  { main: '#1cb0f6', dark: '#1899d6', soft: '#ddf4ff' }, // blue
  { main: '#ce82ff', dark: '#a568cc', soft: '#f3e3ff' }, // purple
  { main: '#ff9600', dark: '#e08600', soft: '#ffefd6' }, // orange
  { main: '#ff86d0', dark: '#e46eb6', soft: '#ffe3f4' }, // pink
  { main: '#00cd9c', dark: '#00a57d', soft: '#d2fbef' }, // teal
  { main: '#ff4b4b', dark: '#ea2b2b', soft: '#ffdfe0' }, // red
] as const;

export type WorldColors = typeof PALETTE[number];
export const worldColors = (chapter: ChapterId): WorldColors => PALETTE[(chapter - 1) % PALETTE.length];

type Navigate = (screen: AppScreen, params?: { unitId?: number; reviewGate?: boolean; chapterId?: ChapterId }) => void;

/** Opens the screen for a path stop, passing the chapter so gates and bosses load the right world. */
export function openStep(navigateTo: Navigate, step: NextStep) {
  if (step.kind === 'unit') navigateTo('unit', { unitId: step.unitId });
  else if (step.kind === 'review') navigateTo('review', { reviewGate: true, chapterId: step.chapter });
  else if (step.kind === 'boss') navigateTo('boss', { chapterId: step.chapter });
  else navigateTo('map');
}

/** Child-facing names for a path stop, in English with a Vietnamese line underneath. */
export function describeStep(step: NextStep): { icon: string; eyebrow: string; title: string; titleVi: string } {
  const world = getWorld(step.chapter);
  if (step.kind === 'unit') {
    const unit = ALL_UNITS.find(u => u.id === step.unitId)!;
    return { icon: unit.icon, eyebrow: `World ${step.chapter} · Unit ${unit.number}`, title: unit.title, titleVi: unit.titleVi };
  }
  if (step.kind === 'review') return { icon: '📜', eyebrow: `World ${step.chapter} · Checkpoint`, title: 'Review Gate', titleVi: 'Cổng ôn tập: 8 câu, đúng 80% để gặp trùm' };
  if (step.kind === 'boss') return { icon: world.boss.emoji, eyebrow: `World ${step.chapter} · Boss`, title: world.boss.fullName, titleVi: 'Đánh bại trùm để mở thế giới mới' };
  return { icon: '👑', eyebrow: 'A1 Champion', title: 'All worlds cleared!', titleVi: 'Bạn đã hoàn thành toàn bộ A1. Ôn lại để giữ phong độ nhé!' };
}
