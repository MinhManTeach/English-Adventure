import React, { useState } from 'react';
import type { AvatarGender, AvatarSlot, AvatarState, CosmeticResult, CosmeticState } from '../../types';
import { createDefaultCosmetics } from '../../engine/avatarCosmetics';
import { previewAvatarGender } from '../../engine/avatarCloset';
import { AvatarRenderer } from './AvatarRenderer';
import { AvatarCloset } from './AvatarCloset';
import { Button } from '../common/Button';

export function AvatarEditor({ cosmetics, canSave, onSave, onCancel }: {
  cosmetics: CosmeticState; canSave: boolean;
  onSave: (draft: AvatarState) => CosmeticResult; onCancel: () => void;
}) {
  const [draft, setDraft] = useState<AvatarState | null>(() => cosmetics.setupCompleted
    ? { ...cosmetics.avatar, equipped: { ...cosmetics.avatar.equipped } } : null);
  const [category, setCategory] = useState<AvatarSlot>('top');
  const [feedback, setFeedback] = useState('');
  const [failed, setFailed] = useState(false);
  const chooseGender = (gender: AvatarGender) => {
    setDraft(current => current ? previewAvatarGender({ ...cosmetics, avatar: current }, gender) : createDefaultCosmetics(gender).avatar);
    setFeedback(''); setFailed(false);
  };
  const save = () => {
    if (!draft) return;
    const result = onSave(draft);
    setFailed(result.status !== 'success');
    setFeedback(result.status === 'success' ? 'Hero saved! Đã lưu nhân vật.'
      : result.status === 'read-only' ? 'Another adventure tab is saving. Keep this preview and try again in the active tab.'
      : result.status === 'storage-failed' ? 'We could not save your hero. Your saved look is safe. Please try again.'
      : 'This outfit could not be saved. Choose your ready, owned clothes and try again.');
  };
  return <section className="space-y-5" aria-label="Avatar creator and closet">
    <div className={`grid gap-6 items-start ${draft ? 'grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[292px_1fr]' : 'grid-cols-1'}`}>
      <div className={`card-3d p-4 space-y-4 ${draft ? 'md:sticky md:top-24' : ''}`}>
        <h2 className="font-display text-xl font-black text-ink">{cosmetics.setupCompleted ? 'Your hero preview' : 'Choose your hero'}</h2>
        {draft && <div className="relative flex justify-center overflow-hidden rounded-2xl" style={{ background: 'radial-gradient(circle at 50% 35%, #ffffff 0 35%, #ddf4ff 72%)' }}><AvatarRenderer avatar={draft} size="large" /></div>}
        <div role="group" aria-label="Choose Boy or Girl" className={`grid gap-3 ${draft ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {(['boy', 'girl'] as const).map(gender => <button key={gender} type="button" aria-label={gender === 'boy' ? 'Boy · Bé trai' : 'Girl · Bé gái'} aria-pressed={draft?.gender === gender}
            onClick={() => chooseGender(gender)} className={`card-3d min-h-12 p-3 font-display font-black text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${draft?.gender === gender ? '!border-sky-brand !bg-sky-50 text-sky-brand-dark' : ''}`}>
            {!draft && <div className="flex justify-center"><AvatarRenderer avatar={createDefaultCosmetics(gender).avatar} size="large" /></div>}
            {gender === 'boy' ? 'Boy · Bé trai' : 'Girl · Bé gái'}{draft?.gender === gender ? ' ✓' : ''}
          </button>)}
        </div>
        <p className="text-sm text-ink-soft">Switch heroes anytime. Your clothes stay yours.</p>
        <p className="text-sm font-bold text-grape-dark">Preview only — save when you love your look.</p>
        {!canSave && <p className="text-sm text-slate-700">Saving is unavailable in this tab. You can still try a look.</p>}
        <div className="grid grid-cols-1 gap-3">
          <Button size="lg" variant="success" className="whitespace-normal! motion-reduce:transition-none motion-reduce:active:translate-y-0" disabled={!draft || !canSave} onClick={save}>
            {cosmetics.setupCompleted ? 'Save / Equip' : 'Save my hero'}
          </Button>
          <Button size="lg" variant="secondary" className="whitespace-normal! motion-reduce:transition-none motion-reduce:active:translate-y-0" onClick={onCancel}>Cancel preview</Button>
        </div>
        <p role={failed ? 'alert' : 'status'} aria-live={failed ? 'assertive' : 'polite'} className={`text-sm font-bold ${failed ? 'text-rose-800' : 'text-emerald-800'}`}>{feedback}</p>
      </div>
      <div className="card-3d p-4 sm:p-6">
        {draft ? <AvatarCloset cosmetics={cosmetics} draft={draft} category={category} onCategory={setCategory}
          onSelect={(slot, id) => { setDraft({ ...draft, equipped: { ...draft.equipped, [slot]: id } }); setFeedback(''); setFailed(false); }} />
          : <div className="space-y-3"><h2 className="font-display text-2xl font-black text-ink">A new hero, the same adventure!</h2>
            <p className="text-slate-700">Choose Boy or Girl to try your free starter outfit. Nothing changes until you save.</p>
            <p className="text-sm text-slate-600" lang="vi">Chọn nhân vật và thử trang phục. Chỉ lưu khi em sẵn sàng.</p></div>}
      </div>
    </div>
  </section>;
}
