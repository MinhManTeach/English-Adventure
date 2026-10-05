import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { createDefaultCosmetics } from '../engine/avatarCosmetics';
import { AvatarEditor } from '../components/avatar/AvatarEditor';
import { LegacyAvatarProfile } from '../components/avatar/LegacyAvatarProfile';
import { Button } from '../components/common/Button';

export const AvatarScreen: React.FC = () => {
  const { state, saveAvatarDraft, writerStatus, storageStatus } = useGame();
  const cosmetics = state.cosmetics ?? createDefaultCosmetics();
  const [creating, setCreating] = useState(false);
  const [revision, setRevision] = useState(0);
  return <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
    <header className="border-b border-amber-100 pb-4"><p className="text-sm font-bold text-amber-800">Your hero, your adventure · Nhân vật của em</p>
      <h1 className="font-game text-3xl font-black text-slate-900">My Avatar</h1></header>
    {!cosmetics.setupCompleted && <LegacyAvatarProfile />}
    {cosmetics.setupCompleted || creating ? <AvatarEditor key={revision} cosmetics={cosmetics}
      canSave={writerStatus === 'writable' && storageStatus === 'ready'} onSave={saveAvatarDraft}
      onCancel={() => { setCreating(false); setRevision(value => value + 1); }} />
      : <section className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 space-y-3">
        <h2 className="font-game text-2xl font-black text-slate-900">Create your new hero!</h2>
        <p className="text-slate-700">Try a Boy or Girl hero with a free starter outfit. Your classic avatar stays until you save.</p>
        <Button size="lg" variant="amber" className="text-slate-900! whitespace-normal! motion-reduce:transition-none motion-reduce:active:translate-y-0" onClick={() => setCreating(true)}>Create my hero</Button>
      </section>}
    {cosmetics.setupCompleted && <LegacyAvatarProfile />}
  </main>;
};
