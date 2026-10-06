import React, { useState } from 'react';
import { AvatarRenderer } from '../components/avatar/AvatarRenderer';
import { COSMETIC_CATALOG, STARTER_DEFAULTS } from '../data/cosmeticsCatalog';
import type { AvatarGender, AvatarSlot, AvatarState } from '../types';

// Read-only previews exercise the actual production catalog and renderer.
const candidates = COSMETIC_CATALOG;
const outfits = [
  ['hair.pony-tail', 'top.sky-hoodie', 'bottom.plum-skirt', 'shoes.sky-high-tops', 'accessory.sun-cap'],
  ['hair.twist-braids', 'top.library-shirt', 'bottom.denim-jeans', 'shoes.castle-boots', 'accessory.school-backpack'],
  ['hair.wavy-bob', 'top.space-sweater', 'bottom.navy-joggers', 'shoes.mint-trainers', 'accessory.star-headband'],
  ['hair.short-curls', 'top.castle-jacket', 'bottom.sand-shorts', 'shoes.red-sneakers', 'accessory.castle-crown'],
  ['hair.soft-crop', 'top.coral-stripes', 'bottom.denim-jeans', 'shoes.sky-high-tops', 'accessory.music-headphones'],
  ['hair.side-sweep', 'top.sunshine-tee', 'bottom.navy-joggers', 'shoes.castle-boots', 'accessory.round-glasses'],
];
export function CatalogVisualLab() {
  const [gender, setGender] = useState<AvatarGender>('boy');
  const [slot, setSlot] = useState<AvatarSlot | 'outfits'>('hair');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedLook, setSelectedLook] = useState('all');
  const [headwear, setHeadwear] = useState<string | null>(null);
  const base = (): AvatarState => ({ gender, equipped: { ...STARTER_DEFAULTS[gender], accessory: null } });
  const looks: { label: string; avatar: AvatarState; thumbnail?: string | null }[] = slot === 'outfits' ? outfits.map((ids, index) => {
    const avatar = base();
    for (const id of ids) { const item = candidates.find(x => x.id === id)!;
      if (item.compatibleWith.includes(gender)) avatar.equipped[item.slot] = id; }
    return { label: `Cross-combination ${index + 1}`, avatar };
  }) : candidates.filter(item => item.slot === slot && item.compatibleWith.includes(gender)).map(item => ({
    label: item.name.en, thumbnail: item.preview.thumbnailSrc, avatar: { ...base(), equipped: { ...base().equipped, [slot]: item.id, ...(slot === 'hair' ? { accessory: headwear } : {}) } },
  }));
  const filtered = looks.some(look => look.label === selectedLook) ? looks.filter(look => look.label === selectedLook) : looks;
  return <section aria-label="Catalog asset QA" className="my-8 space-y-4">
    <h2 className="text-2xl font-bold">Catalog asset QA — development only</h2>
    <p>Candidate artwork. No player save, inventory, purchase or reward actions.</p>
    <div className="flex flex-wrap gap-4">
      <label>QA gender <select className="min-h-12 border p-2" value={gender} onChange={e=>setGender(e.target.value as AvatarGender)}><option value="boy">Boy</option><option value="girl">Girl</option></select></label>
      <label>QA category <select className="min-h-12 border p-2" value={slot} onChange={e=>setSlot(e.target.value as AvatarSlot | 'outfits')}>{['hair','top','bottom','shoes','accessory','outfits'].map(s=><option key={s}>{s}</option>)}</select></label>
      <label>QA size <select className="min-h-12 border p-2" value={size} onChange={e=>setSize(e.target.value as typeof size)}>{['small','medium','large'].map(s=><option key={s}>{s}</option>)}</select></label>
      <label>QA item <select className="min-h-12 border p-2" value={looks.some(l=>l.label===selectedLook) ? selectedLook : 'all'} onChange={e=>setSelectedLook(e.target.value)}><option value="all">All items</option>{looks.map(l=><option key={l.label}>{l.label}</option>)}</select></label>
      {slot === 'hair' && <label>QA headwear <select className="min-h-12 border p-2" value={headwear ?? ''} onChange={e=>setHeadwear(e.target.value || null)}><option value="">None</option>{candidates.filter(i=>i.slot==='accessory' && i.compatibleWith.includes(gender)).map(i=><option key={i.id} value={i.id}>{i.name.en}</option>)}</select></label>}
    </div>
    <div data-testid="catalog-sheet" className={filtered.length === 1 ? 'flex gap-3' : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'}>
      {filtered.map(look=><figure key={`${gender}:${look.label}:${size}`} className="border rounded-xl p-3 bg-amber-50 flex flex-col items-center min-w-0">
        <AvatarRenderer avatar={look.avatar} catalog={candidates} size={size}/><figcaption className="text-center font-bold text-sm">{look.label}</figcaption>
        {look.thumbnail && <img src={look.thumbnail} width={48} height={48} alt={`${look.label} thumbnail`} />}
      </figure>)}
    </div>
  </section>;
}
