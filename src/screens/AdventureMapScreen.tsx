import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { WORLDS } from '../data/worlds';
import { getNextStep } from '../engine/journey';
import { WorldPath, nodeKey } from '../components/map/WorldPath';
import { describeStep, openStep } from '../components/map/journeyUi';
import { Button } from '../components/common/Button';

/** The whole A1 journey as one winding path, world after world, scrolled to where the player is. */
export const AdventureMapScreen: React.FC = () => {
  const { state, navigateTo } = useGame();
  const step = getNextStep(state);
  const currentKey = step.kind === 'done' ? null : nodeKey(step);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const info = describeStep(step);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.querySelector('[data-current="true"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-6 sm:py-8">
      <div className="sticky top-[66px] z-20 -mx-1 mb-6 flex items-center gap-3 rounded-2xl border-2 border-line bg-white/95 p-2.5 pl-4 backdrop-blur">
        <div className="min-w-0 flex-1">
          <h1 className="eyebrow text-ink-soft">Adventure Map · Bản đồ</h1>
          <p className="truncate font-display text-base font-black text-ink"><span aria-hidden="true">{info.icon}</span> {info.title}</p>
        </div>
        <Button variant="success" size="md" className="shrink-0 uppercase" onClick={() => (step.kind === 'done' ? navigateTo('review') : openStep(navigateTo, step))}>
          {step.kind === 'done' ? 'Review' : 'Go!'}
        </Button>
      </div>
      <div className="space-y-12">
        {WORLDS.map(world => (
          <WorldPath key={world.chapter} chapter={world.chapter} currentKey={currentKey} selectedKey={selectedKey} onSelect={setSelectedKey} />
        ))}
      </div>
    </div>
  );
};
