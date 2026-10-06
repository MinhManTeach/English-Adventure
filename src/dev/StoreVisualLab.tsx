import React, { useRef, useState } from 'react';
import { Storefront } from '../components/store/Storefront';
import { createDefaultState } from '../services/storage';
import { purchaseItem, equipItem } from '../engine/avatarCosmetics';
import { runCosmeticAction, persistBeforePublish } from '../services/durableState';
import type { CosmeticTransaction } from '../engine/avatarCosmetics';
import type { UserProgressState } from '../types';

/** DEV-only disposable fixture. Never reads or writes a learner's saved game. */
export default function StoreVisualLab() {
  const [state, setState] = useState<UserProgressState>(() => {
    const initial = createDefaultState();
    return { ...initial, coins: 50, cosmetics: { ...initial.cosmetics!, setupCompleted: true } };
  });
  const latest = useRef(state);
  const [mode, setMode] = useState('writable');
  function action(reduce: (value: UserProgressState) => CosmeticTransaction) {
    return runCosmeticAction(reduce, () => latest.current, mode === 'read-only' ? 'read-only' : 'writable', true,
      next => persistBeforePublish(next, 'writable', () => mode !== 'storage-failed', value => { latest.current = value; setState(value); }));
  }
  return <div className="min-h-screen bg-amber-50 text-slate-800">
    <aside className="flex flex-wrap gap-4 bg-slate-900 p-4 text-white"><strong>Store QA · disposable memory only</strong>
      <label>Saving mode <select className="ml-2 bg-white p-2 text-slate-900" value={mode} onChange={e => setMode(e.target.value)}>
        <option value="writable">Writable</option><option value="read-only">Read-only</option><option value="storage-failed">Storage fails</option></select></label></aside>
    <Storefront state={state} blockedReason={mode === 'read-only' ? 'Your game is open in another tab. Return there to buy or equip items.' : null}
      onPurchase={id => action(value => purchaseItem(value, id))} onEquip={id => action(value => equipItem(value, id))} onOpenAvatar={() => {}} />
  </div>;
}
