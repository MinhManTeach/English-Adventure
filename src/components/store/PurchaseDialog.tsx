import React, { useEffect, useRef } from 'react';
import type { StoreItem } from '../../types';

export function PurchaseDialog({ item, coins, blockedReason, error, complete, successMessage, onCancel, onConfirm, returnFocus, fallbackFocus }: {
  item: StoreItem; coins: number; blockedReason: string | null; error: string;
  complete: boolean; successMessage: string; fallbackFocus: HTMLElement | null;
  onCancel: () => void; onConfirm: () => void; returnFocus: HTMLElement | null;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const node = dialog.current!;
    node.showModal(); cancel.current?.focus();
    return () => {
      node.close();
      const target = returnFocus?.isConnected ? returnFocus : fallbackFocus?.querySelector<HTMLElement>('button:not(:disabled)') ?? fallbackFocus;
      target?.focus({ preventScroll: true });
    };
  }, [returnFocus, fallbackFocus]);
  useEffect(() => { if (complete) cancel.current?.focus(); }, [complete]);
  const shortfall = Math.max(0, item.price - coins);
  return <dialog ref={dialog} aria-labelledby="purchase-title" aria-describedby="purchase-summary"
    onCancel={event => { event.preventDefault(); onCancel(); }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.current!.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement as HTMLButtonElement))) { event.preventDefault(); first?.focus(); }
    }}
    className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border-2 border-line border-b-4 bg-white p-6 text-ink shadow-xl backdrop:bg-slate-950/50">
    <h2 id="purchase-title" className="text-2xl font-black font-game">{complete ? 'Your item is ready!' : `Buy ${item.name.en}?`}</h2>
    <p lang="vi" className="mt-1 text-slate-600">{item.name.vi}</p>
    <p className="mt-5 text-xl font-extrabold">{item.price} learning coins</p>
    <p id="purchase-summary" className="mt-2">{complete ? 'Your coins now: ' : 'Your coins: '}<strong>{coins}</strong>{!complete && <> → <strong>{Math.max(0, coins - item.price)}</strong></>}</p>
    <p className="mt-2 text-sm text-slate-600">It will be yours to keep. You can choose Equip afterwards.</p>
    {complete && <p role="status" className="mt-4 rounded-xl bg-emerald-50 p-3 font-semibold text-emerald-900">{successMessage}</p>}
    {!complete && (error || blockedReason || shortfall > 0) && <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">{error || blockedReason || `You need ${shortfall} more coins. Learn another challenge to earn more!`}</p>}
    <div className="mt-6 flex flex-wrap gap-3">
      <button ref={cancel} type="button" onClick={onCancel} className="min-h-12 flex-1 rounded-2xl border-2 border-b-4 border-line px-4 font-display font-extrabold focus-visible:outline-4 focus-visible:outline-amber-500">{complete ? 'Done' : 'Cancel'}</button>
      <button type="button" disabled={complete || !!blockedReason || shortfall > 0} onClick={onConfirm}
        className="min-h-12 flex-1 rounded-2xl border-b-4 border-sun-dark bg-sun px-4 font-display font-black text-ink disabled:opacity-50 focus-visible:outline-4 focus-visible:outline-amber-700">{complete ? 'Owned' : `Buy for ${item.price} coins`}</button>
    </div>
  </dialog>;
}
