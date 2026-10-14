import React, { useRef, useState } from 'react';
import { Lock, Sparkles } from 'lucide-react';
import type { AvatarState, CosmeticResult, StoreItem, UserProgressState } from '../../types';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { STORE_CATEGORIES, STORE_COLLECTIONS, StoreCollectionFilter, storeItems, storeItemStatus, previewStoreItem, unlockDescription, cosmeticFeedback, StoreCategory } from '../../engine/cosmeticStore';
import { PurchaseDialog } from './PurchaseDialog';
import { assetUrl } from '../../engine/assetUrl';

const button = 'min-h-12 rounded-2xl px-4 py-2 font-display font-extrabold border-2 border-b-4 active:translate-y-[2px] active:border-b-2 focus-visible:outline-4 focus-visible:outline-sky-400 disabled:opacity-50 disabled:active:translate-y-0 cursor-pointer';
const chip = 'min-h-11 rounded-2xl border-2 px-3 py-1.5 text-sm font-extrabold focus-visible:outline-4 focus-visible:outline-sky-400 cursor-pointer';
const rarityLabel = { starter: 'Starter · Khởi đầu', common: 'Common · Thông thường', special: 'Special · Đặc biệt', premium: 'Premium · Cao cấp' };
const rarityStyle = { starter: 'bg-[#d7ffb8] text-go-dark', common: 'bg-cloud text-ink-soft', special: 'bg-sky-50 text-sky-brand-dark', premium: 'bg-[#f3e3ff] text-grape-dark' };
/** Soft card background for each palette so the grid reads like a fashion rack. */
const collectionTint = (id: string | undefined) => ({ classic: '#eef6ff', pastel: '#fbf3ff', street: '#f1f3e6', earth: '#fbf1e8', sporty: '#fff0f0', royal: '#f5f0ff', tet: '#fff2e6' } as Record<string, string>)[id ?? 'classic'];
const Swatches = ({ colors }: { colors: readonly string[] }) => <span aria-hidden="true" className="inline-flex -space-x-1.5">
  {colors.map(color => <span key={color} className="h-4 w-4 rounded-full border-2 border-white shadow-[0_0_0_1px_#e5e5e5]" style={{ backgroundColor: color }} />)}
</span>;
function ItemThumbnail({ item }: { item: StoreItem }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="flex h-28 items-center text-sm text-ink-soft">Preview unavailable</span>
    : <img src={item.preview.thumbnailSrc ? assetUrl(item.preview.thumbnailSrc) : undefined} alt="" width={112} height={112} loading="lazy" onError={() => setFailed(true)} className="h-28 w-28 object-contain drop-shadow-sm" />;
}
export function Storefront({ state, blockedReason, onPurchase, onEquip, onOpenAvatar }: {
  state: UserProgressState; blockedReason: string | null;
  onPurchase: (id: string) => CosmeticResult; onEquip: (id: string) => CosmeticResult; onOpenAvatar: () => void;
}) {
  const cosmetics = state.cosmetics!;
  const [category, setCategory] = useState<StoreCategory>('all');
  const [collection, setCollection] = useState<StoreCollectionFilter>('all');
  const [preview, setPreview] = useState<AvatarState | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<StoreItem | null>(null);
  const [feedback, setFeedback] = useState('');
  const [purchaseError, setPurchaseError] = useState('');
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const previewRegion = useRef<HTMLElement>(null);
  const submitted = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const selected = storeItems(cosmetics.avatar.gender, 'all').find(item => item.id === selectedId);
  const selectedStatus = selected ? storeItemStatus(state, selected) : null;
  const shownAvatar = preview?.gender === cosmetics.avatar.gender ? preview : cosmetics.avatar;
  function select(item: StoreItem) {
    setSelectedId(item.id); setPreview(previewStoreItem(cosmetics.avatar, item)); setFeedback('');
    if (window.matchMedia('(max-width: 767px)').matches) previewRegion.current?.scrollIntoView({ block: 'start' });
  }
  function openPurchase(item: StoreItem, trigger: HTMLElement) {
    returnFocus.current = trigger; submitted.current = false; setPurchaseComplete(false); setPurchaseError(''); setConfirmation(item);
  }
  function buy() {
    if (!confirmation || submitted.current || blockedReason) return;
    submitted.current = true;
    const result = onPurchase(confirmation.id);
    const message = cosmeticFeedback(result.status, confirmation, state.coins);
    if (result.status === 'success' || result.status === 'already-owned') {
      setPurchaseComplete(true); setFeedback(message);
    } else { submitted.current = false; setPurchaseError(message); }
  }
  function equip(item: StoreItem) {
    if (blockedReason) { setFeedback(blockedReason); return; }
    const result = onEquip(item.id);
    if (result.status === 'success') {
      setPreview(previewStoreItem(cosmetics.avatar, item)); setFeedback(`${item.name.en} equipped! Your outfit is saved.`);
    } else setFeedback(cosmeticFeedback(result.status, item, state.coins));
  }
  return <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8" aria-labelledby="store-title">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div><p className="eyebrow text-grape-dark">Fashion for heroes · Thời trang cho nhà thám hiểm</p>
        <h1 id="store-title" className="font-display text-3xl font-black text-ink">🛍️ Avatar Store</h1>
        <p lang="vi" className="text-sm font-bold text-ink-soft">Cửa hàng nhân vật · Dùng xu học tập để chọn trang phục</p></div>
      <div aria-label={`Learning coins: ${state.coins}`} className="card-3d flex items-center gap-3 px-4 py-2.5">
        <span aria-hidden="true" className="text-3xl">🪙</span><div><span className="block text-xs font-extrabold text-ink-soft">Your learning coins</span><strong className="font-display text-2xl font-black tabular-nums text-sun-dark">{state.coins}</strong></div></div>
    </div>
    {blockedReason && <p role="status" className="mb-4 rounded-2xl border-2 border-sun bg-[#fff8db] p-4 text-sm font-bold text-ink">{blockedReason} You can still browse and try a look.</p>}
    <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
      <section ref={previewRegion} tabIndex={-1} aria-labelledby="store-preview-title" className="card-3d p-4 scroll-mt-52 md:sticky md:top-24 md:max-h-[calc(100dvh-7rem)] md:overflow-y-auto">
        <h2 id="store-preview-title" className="font-display text-xl font-black text-ink">{selected ? 'Try this look' : 'Your saved hero'}</h2>
        <div className="relative mt-2 flex justify-center overflow-hidden rounded-2xl py-3" style={{ background: `radial-gradient(circle at 50% 35%, #ffffff 0 35%, ${collectionTint(selected?.collection)} 70%)` }}>
          <span aria-hidden="true" className="absolute inset-x-6 bottom-3 h-5 rounded-full bg-black/10 blur-[2px]" />
          <AvatarRenderer avatar={shownAvatar} size="large" label={selected ? `Preview with ${selected.name.en}` : 'Your saved avatar'} />
        </div>
        {selected ? <div className="mt-3 space-y-3">
          <div><h3 className="font-display text-lg font-black text-ink">{selected.name.en}</h3><p lang="vi" className="text-sm font-bold text-ink-soft">{selected.name.vi}</p></div>
          <p className="text-sm text-ink-soft">Trying a look is free. Your saved outfit changes only when you choose Equip.</p>
          {selectedStatus === 'locked' && <p className="flex items-start gap-2 text-sm font-bold text-ink"><Lock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />Locked · {unlockDescription(selected)}</p>}
          {selectedStatus === 'insufficient-coins' && <p className="text-sm font-bold text-ink">{cosmeticFeedback('insufficient-coins', selected, state.coins)}</p>}
          {(selectedStatus === 'owned' || selectedStatus === 'equipped') ? <button type="button" disabled={!!blockedReason || selectedStatus === 'equipped'} onClick={() => equip(selected)} className={`${button} w-full border-go-dark bg-go text-white`}>{selectedStatus === 'equipped' ? 'Equipped' : `Equip ${selected.name.en}`}</button>
            : selectedStatus === 'available' ? <button type="button" disabled={!!blockedReason} onClick={event => openPurchase(selected, event.currentTarget)} className={`${button} w-full border-sun-dark bg-sun text-ink`}>Buy {selected.name.en} · {selected.price} coins</button>
            : (selectedStatus === 'asset-unavailable' || selectedStatus === 'invalid-balance') && <p className="text-sm text-ink-soft">{cosmeticFeedback(selectedStatus, selected, state.coins)}</p>}
          <button type="button" onClick={() => { setPreview(null); setSelectedId(null); setFeedback('Preview cancelled. Your saved outfit is unchanged.'); }} className={`${button} w-full border-line bg-white text-ink-soft`}>Cancel preview</button>
        </div> : <p className="my-3 text-sm text-ink-soft">Pick an outfit to see it on your hero. Earn coins by learning, then choose something you love.</p>}
        <button type="button" onClick={onOpenAvatar} className={`${button} mt-3 w-full border-sky-brand-dark bg-sky-brand text-white`}>My Avatar & Closet</button>
      </section>
      <div className="min-w-0 space-y-4">
        <div role="group" aria-label="Fashion collections" className="flex gap-2 overflow-x-auto pb-1">
          <button type="button" aria-pressed={collection === 'all'} onClick={() => setCollection('all')} className={`${chip} shrink-0 ${collection === 'all' ? 'border-grape bg-[#f3e3ff] text-grape-dark' : 'border-line bg-white text-ink-soft'}`}>✨ All looks</button>
          {STORE_COLLECTIONS.map(c => <button type="button" key={c.id} aria-pressed={collection === c.id} onClick={() => setCollection(c.id)}
            className={`${chip} flex shrink-0 items-center gap-2 ${collection === c.id ? 'border-grape bg-[#f3e3ff] text-grape-dark' : 'border-line bg-white text-ink-soft'}`}>
            <Swatches colors={c.swatches} /><span>{c.label}<span lang="vi" className="ml-1 font-bold opacity-70">· {c.labelVi}</span></span></button>)}
        </div>
        <div role="group" aria-label="Store categories" className="flex flex-wrap gap-2">
          {STORE_CATEGORIES.map(({ slot, label }) => <button type="button" key={slot} aria-pressed={category === slot} onClick={() => setCategory(slot)} className={`${chip} ${category === slot ? 'border-sky-brand bg-sky-50 text-sky-brand-dark' : 'border-line bg-white text-ink-soft'}`}>{label}</button>)}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="min-h-6 text-sm font-extrabold text-go-dark">{feedback && <><Sparkles aria-hidden="true" className="mr-1 inline h-4 w-4" />{feedback}</>}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
          {storeItems(cosmetics.avatar.gender, category, collection).map(item => {
            const status = storeItemStatus(state, item);
            const owned = status === 'owned' || status === 'equipped';
            const statusLabel = status === 'equipped' ? 'Owned · Equipped' : owned ? 'Owned' : status === 'locked' ? 'Locked' : status === 'asset-unavailable' ? 'Not ready' : `${item.price} coins`;
            const palette = STORE_COLLECTIONS.find(c => c.id === (item.collection ?? 'classic'));
            return <button type="button" key={item.id} aria-label={`Preview ${item.name.en} · ${statusLabel}`} aria-pressed={selectedId === item.id}
              onClick={() => select(item)} className={`card-3d relative min-w-0 p-3 text-left cursor-pointer focus-visible:outline-4 focus-visible:outline-sky-400 ${selectedId === item.id ? '!border-sky-brand' : ''}`}>
              <div className="relative flex justify-center rounded-xl py-1" style={{ backgroundColor: collectionTint(item.collection) }}>
                <ItemThumbnail item={item} />
                {status === 'locked' && <span aria-hidden="true" className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-soft text-white"><Lock className="h-3.5 w-3.5" /></span>}
                {status === 'equipped' && <span aria-hidden="true" className="absolute right-1.5 top-1.5 rounded-full bg-go px-2 py-0.5 text-[11px] font-black text-white">✓ Wearing</span>}
              </div>
              <span className="mt-2 block font-display text-sm font-black leading-tight text-ink">{item.name.en}</span>
              <span lang="vi" className="block text-xs font-bold text-ink-soft">{item.name.vi}</span>
              <span className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-black ${rarityStyle[item.rarity]}`}>{rarityLabel[item.rarity]}</span>
                {palette && <span className="inline-flex items-center gap-1 text-[11px] font-bold text-ink-soft"><Swatches colors={palette.swatches} />{palette.label}</span>}
              </span>
              <span className={`mt-2 block text-sm font-black ${owned ? 'text-go-dark' : status === 'locked' ? 'text-ink-soft' : 'text-sun-dark'}`}>{!owned && status !== 'locked' && !item.starter ? '🪙 ' : ''}{statusLabel}{item.starter ? ' · Free' : owned ? ` · Catalog price: ${item.price}` : ''}</span>
              {status === 'locked' && <span className="mt-1 block text-xs text-ink-soft">{unlockDescription(item)}</span>}
              <span className="mt-2 block text-xs font-extrabold text-sky-brand-dark">{selectedId === item.id ? '✓ Preview selected' : 'Try on'}</span>
            </button>;
          })}
        </div>
      </div>
    </div>
    {confirmation && <PurchaseDialog item={confirmation} coins={state.coins} blockedReason={blockedReason} error={purchaseError} complete={purchaseComplete} successMessage={feedback} fallbackFocus={previewRegion.current} onCancel={() => setConfirmation(null)} onConfirm={buy} returnFocus={returnFocus.current} />}
  </section>;
}
