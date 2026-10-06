import React, { useRef, useState } from 'react';
import { Coins, ShoppingBag, Sparkles } from 'lucide-react';
import type { AvatarState, CosmeticResult, StoreItem, UserProgressState } from '../../types';
import { AvatarRenderer } from '../avatar/AvatarRenderer';
import { STORE_CATEGORIES, storeItems, storeItemStatus, previewStoreItem, unlockDescription, cosmeticFeedback, StoreCategory } from '../../engine/cosmeticStore';
import { PurchaseDialog } from './PurchaseDialog';

const button = 'min-h-12 rounded-xl px-4 py-2 font-bold focus-visible:outline-4 focus-visible:outline-amber-600 disabled:opacity-50';
const rarityLabel = { starter: 'Starter · Khởi đầu', common: 'Common · Thông thường', special: 'Special · Đặc biệt', premium: 'Premium · Cao cấp' };
function ItemThumbnail({ item }: { item: StoreItem }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="flex h-24 items-center text-sm text-slate-600">Preview unavailable</span>
    : <img src={item.preview.thumbnailSrc ?? undefined} alt="" width={96} height={96} loading="lazy" onError={() => setFailed(true)} className="h-24 w-24 object-contain" />;
}
export function Storefront({ state, blockedReason, onPurchase, onEquip, onOpenAvatar }: {
  state: UserProgressState; blockedReason: string | null;
  onPurchase: (id: string) => CosmeticResult; onEquip: (id: string) => CosmeticResult; onOpenAvatar: () => void;
}) {
  const cosmetics = state.cosmetics!;
  const [category, setCategory] = useState<StoreCategory>('all');
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
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-wider text-amber-800">Made for your next adventure</p>
        <h1 id="store-title" className="flex items-center gap-2 text-3xl font-black font-game text-slate-900"><ShoppingBag aria-hidden="true" />Avatar Store</h1>
        <p lang="vi" className="text-sm text-slate-600">Cửa hàng nhân vật · Dùng xu học tập để chọn trang phục</p></div>
      <div aria-label={`Learning coins: ${state.coins}`} className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-3 text-amber-950">
        <Coins aria-hidden="true" className="h-6 w-6" /><div><span className="block text-xs font-bold">Your learning coins</span><strong className="text-2xl tabular-nums">{state.coins}</strong></div></div>
    </div>
    {blockedReason && <p role="status" className="mb-4 rounded-2xl bg-amber-100 p-4 text-sm text-amber-950">{blockedReason} You can still browse and try a look.</p>}
    <div className="grid items-start gap-6 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]">
      <section ref={previewRegion} tabIndex={-1} aria-labelledby="store-preview-title" className="rounded-3xl border border-amber-200 bg-white p-4 scroll-mt-52 md:sticky md:top-32 md:max-h-[calc(100dvh-9rem)] md:overflow-y-auto">
        <h2 id="store-preview-title" className="text-xl font-black text-slate-900">{selected ? 'Try this look' : 'Your saved hero'}</h2>
        <div className="flex justify-center rounded-2xl bg-gradient-to-b from-sky-50 to-amber-50 py-3"><AvatarRenderer avatar={shownAvatar} size="large" label={selected ? `Preview with ${selected.name.en}` : 'Your saved avatar'} /></div>
        {selected ? <div className="mt-3 space-y-3">
          <div><h3 className="font-black text-slate-900">{selected.name.en}</h3><p lang="vi" className="text-sm text-slate-600">{selected.name.vi}</p></div>
          <p className="text-sm text-slate-600">Trying a look is free. Your saved outfit changes only when you choose Equip.</p>
          {selectedStatus === 'locked' && <p className="text-sm font-semibold text-amber-950">Locked · {unlockDescription(selected)}</p>}
          {selectedStatus === 'insufficient-coins' && <p className="text-sm font-semibold text-amber-950">{cosmeticFeedback('insufficient-coins', selected, state.coins)}</p>}
          {(selectedStatus === 'owned' || selectedStatus === 'equipped') ? <button type="button" disabled={!!blockedReason || selectedStatus === 'equipped'} onClick={() => equip(selected)} className={`${button} w-full bg-emerald-100 text-emerald-950`}>{selectedStatus === 'equipped' ? 'Equipped' : `Equip ${selected.name.en}`}</button>
            : selectedStatus === 'available' ? <button type="button" disabled={!!blockedReason} onClick={event => openPurchase(selected, event.currentTarget)} className={`${button} w-full bg-amber-300 text-slate-950`}>Buy {selected.name.en} · {selected.price} coins</button>
            : (selectedStatus === 'asset-unavailable' || selectedStatus === 'invalid-balance') && <p className="text-sm text-slate-600">{cosmeticFeedback(selectedStatus, selected, state.coins)}</p>}
          <button type="button" onClick={() => { setPreview(null); setSelectedId(null); setFeedback('Preview cancelled. Your saved outfit is unchanged.'); }} className={`${button} w-full border border-slate-300 bg-white`}>Cancel preview</button>
        </div> : <p className="my-3 text-sm text-slate-600">Pick an outfit to see it on your hero. Earn coins by learning, then choose something you love.</p>}
        <button type="button" onClick={onOpenAvatar} className={`${button} mt-3 w-full bg-slate-100 text-slate-800`}>My Avatar & Closet</button>
      </section>
      <div className="min-w-0 space-y-4">
        <div role="group" aria-label="Store categories" className="flex flex-wrap gap-2">
          {STORE_CATEGORIES.map(({ slot, label }) => <button type="button" key={slot} aria-pressed={category === slot} onClick={() => setCategory(slot)} className={`${button} border-2 ${category === slot ? 'border-amber-600 bg-amber-100 text-amber-950' : 'border-slate-200 bg-white text-slate-700'}`}>{label}</button>)}
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="min-h-6 text-sm font-bold text-emerald-800">{feedback && <><Sparkles aria-hidden="true" className="mr-1 inline h-4 w-4" />{feedback}</>}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
          {storeItems(cosmetics.avatar.gender, category).map(item => {
            const status = storeItemStatus(state, item);
            const owned = status === 'owned' || status === 'equipped';
            const statusLabel = status === 'equipped' ? 'Owned · Equipped' : owned ? 'Owned' : status === 'locked' ? 'Locked' : status === 'asset-unavailable' ? 'Not ready' : `${item.price} coins`;
            return <button type="button" key={item.id} aria-label={`Preview ${item.name.en} · ${statusLabel}`} aria-pressed={selectedId === item.id}
              onClick={() => select(item)} className={`min-w-0 rounded-2xl border-2 bg-white p-3 text-left focus-visible:outline-4 focus-visible:outline-amber-500 ${selectedId === item.id ? 'border-amber-600' : 'border-slate-200'}`}>
              <div className="flex justify-center rounded-xl bg-slate-50"><ItemThumbnail item={item} /></div>
              <span className="mt-2 block text-sm font-black text-slate-900">{item.name.en}</span>
              <span lang="vi" className="block text-xs text-slate-600">{item.name.vi}</span>
              <span className="mt-2 block text-xs text-slate-600">{rarityLabel[item.rarity]}</span>
              <span className="mt-2 block text-sm font-bold text-amber-950">{statusLabel}{item.starter ? ' · Free' : owned ? ` · Catalog price: ${item.price}` : ''}</span>
              {status === 'locked' && <span className="mt-1 block text-xs text-slate-600">{unlockDescription(item)}</span>}
              <span className="mt-2 block text-xs font-bold text-slate-700">{selectedId === item.id ? '✓ Preview selected' : 'Try on'}</span>
            </button>;
          })}
        </div>
      </div>
    </div>
    {confirmation && <PurchaseDialog item={confirmation} coins={state.coins} blockedReason={blockedReason} error={purchaseError} complete={purchaseComplete} successMessage={feedback} fallbackFocus={previewRegion.current} onCancel={() => setConfirmation(null)} onConfirm={buy} returnFocus={returnFocus.current} />}
  </section>;
}
