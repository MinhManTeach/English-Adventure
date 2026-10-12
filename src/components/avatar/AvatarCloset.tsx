import React, { useState } from 'react';
import type { AvatarSlot, AvatarState, CosmeticState, StoreItem } from '../../types';
import { ownedClosetItems } from '../../engine/avatarCloset';
import { AvatarRenderer } from './AvatarRenderer';

export const CLOSET_CATEGORIES: readonly { slot: AvatarSlot; label: string }[] = [
  { slot: 'hair', label: 'Hair · Tóc' }, { slot: 'top', label: 'Tops · Áo' },
  { slot: 'bottom', label: 'Bottoms · Quần' }, { slot: 'shoes', label: 'Shoes · Giày' },
  { slot: 'accessory', label: 'Accessories · Phụ kiện' },
];
const choice = 'min-h-12 rounded-2xl border-2 border-b-4 p-3 font-bold text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300';
function ClosetItemPreview({ item, draft }: { item: StoreItem; draft: AvatarState }) {
  const [failed, setFailed] = useState(false);
  return <div className="w-24 h-24 flex items-center justify-center" aria-hidden="true">
    {failed ? <AvatarRenderer size="small" avatar={{ ...draft, equipped: { ...draft.equipped, [item.slot]: item.id } }} />
      : <img src={item.preview.thumbnailSrc!} alt="" width={96} height={96} className="w-24 h-24 object-contain" onError={() => setFailed(true)} />}
  </div>;
}
export function AvatarCloset({ cosmetics, draft, category, onCategory, onSelect }: {
  cosmetics: CosmeticState; draft: AvatarState; category: AvatarSlot;
  onCategory: (slot: AvatarSlot) => void; onSelect: (slot: AvatarSlot, id: string | null) => void;
}) {
  const items = ownedClosetItems(cosmetics, draft.gender, category);
  return <section className="space-y-4" aria-labelledby="closet-heading">
    <h2 id="closet-heading" className="font-display text-2xl font-black text-ink">My Closet · Tủ đồ của em</h2>
    <p className="text-sm text-slate-600">Your clothes, your adventure. Try a look before saving!</p>
    <div role="group" aria-label="Closet categories" className="flex flex-wrap gap-2">
      {CLOSET_CATEGORIES.map(({ slot, label }) => <button key={slot} type="button" aria-pressed={slot === category}
        onClick={() => onCategory(slot)} className={`${choice} ${slot === category ? 'border-sky-brand bg-sky-50 text-sky-brand-dark' : 'border-line bg-white'}`}>{label}</button>)}
    </div>
    <div role="group" aria-label={`${CLOSET_CATEGORIES.find(c => c.slot === category)?.label} owned items`} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map(item => {
        const selected = draft.equipped[category] === item.id;
        const equipped = cosmetics.setupCompleted && cosmetics.avatar.gender === draft.gender && cosmetics.avatar.equipped[category] === item.id;
        return <button key={item.id} type="button" aria-pressed={selected} onClick={() => onSelect(category, item.id)}
          className={`${choice} flex flex-col items-center gap-1 ${selected ? 'border-sky-brand bg-sky-50' : 'border-line bg-white'}`}>
          <ClosetItemPreview item={item} draft={draft} />
          <span className="text-sm">{item.name.en}</span><span className="text-xs text-slate-600" lang="vi">{item.name.vi}</span>
          <span className="text-xs text-slate-600">Owned{equipped ? ' · Equipped' : ''}</span>
          <span className="text-sm font-black text-sky-brand-dark min-h-5">{selected ? '✓ Selected' : ''}</span>
        </button>;
      })}
      {category === 'accessory' && <button type="button" aria-pressed={draft.equipped.accessory === null}
        onClick={() => onSelect('accessory', null)} className={`${choice} bg-white border-line`}>No accessory{draft.equipped.accessory === null ? ' · ✓ Selected' : ''}</button>}
    </div>
    {items.length === 0 && <p className="rounded-2xl bg-cloud p-4 text-ink-soft">{category === 'accessory'
      ? 'Your starter hero is ready without an accessory. More adventures await!'
      : 'No ready clothes in this category yet. Your starter outfit stays safe.'}</p>}
  </section>;
}
