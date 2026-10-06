import React from 'react';
import { useGame } from '../context/GameContext';
import { Storefront } from '../components/store/Storefront';

export function StoreScreen() {
  const { state, writerStatus, storageStatus, purchaseItem, equipItem, navigateTo } = useGame();
  const blockedReason = writerStatus !== 'writable'
    ? 'Your game is open in another tab, or safe saving is unavailable. Return to the active tab to buy or equip items.'
    : storageStatus !== 'ready' ? 'Your game cannot be saved right now. Check browser storage before buying or equipping.'
    : !state.cosmetics?.setupCompleted ? 'Create and save your hero in My Avatar before buying or equipping an outfit.' : null;
  return <Storefront state={state} blockedReason={blockedReason} onPurchase={purchaseItem} onEquip={equipItem} onOpenAvatar={() => navigateTo('avatar')} />;
}
