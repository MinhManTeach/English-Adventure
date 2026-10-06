import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createDefaultState, migrateState, StorageService, getTodayDateString } from '../src/services/storage';
import { COSMETIC_CATALOG, STARTER_DEFAULTS, STARTER_IDS } from '../src/data/cosmeticsCatalog';
import { changeAvatarGender, createDefaultCosmetics, equipItem, normalizeCosmetics, purchaseItem,
  unequipItem, validateCosmeticCatalog } from '../src/engine/avatarCosmetics';
import type { StoreItem, UserProgressState } from '../src/types';
import { persistBeforePublish, runCosmeticAction } from '../src/services/durableState';
import { SaveWriter, LockProvider } from '../src/services/saveWriter';
import { applyDevShortcut } from '../src/engine/devShortcuts';
import { applyBossVictory, applyQuestionResult } from '../src/engine/progression';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import { getAllQuestions } from '../src/data/curriculum';

// Synthetic paths isolate transaction behavior from production asset files.
const readyCatalog: StoreItem[] = COSMETIC_CATALOG.map(item => ({ ...item, assetStatus: 'ready',
  preview: { ...item.preview, thumbnailSrc: `/avatars/v1/previews/${item.id}.webp` },
  assets: Object.fromEntries(item.compatibleWith.map(g => [g, [{
    plane: item.slot === 'accessory' ? 'accessory-front' : item.slot,
    src: `/avatars/v1/items/${item.id}/${g}/front.webp`,
  }]])),
}));
const player = (): UserProgressState => ({ ...createDefaultState(), coins: 200, xp: 350,
  profile: { ...createDefaultState().profile, name: 'Existing learner', avatarId: 'draco', title: 'Dragon Knight' } });
const excludingCosmetics = (state: UserProgressState) => { const { cosmetics, ...rest } = state; return rest; };
const purchase = (state = player(), id = 'top.sunshine-tee') => purchaseItem(state, id, readyCatalog);
const unavailableCatalog = COSMETIC_CATALOG.map(item => item.starter ? item : { ...item, assetStatus: 'unavailable' as const });

test('38 approved items have valid metadata and unavailable artwork rejects purchases', () => {
  assert.equal(COSMETIC_CATALOG.length, 38);
  assert.deepEqual(validateCosmeticCatalog(COSMETIC_CATALOG), []);
  assert.deepEqual(validateCosmeticCatalog(readyCatalog), []);
  assert.equal(new Set(COSMETIC_CATALOG.map(x => x.id)).size, 38);
  for (const gender of ['boy', 'girl'] as const) {
    assert.equal(COSMETIC_CATALOG.filter(x => x.slot === 'hair' && x.compatibleWith.includes(gender)).length, 6);
    for (const [slot, id] of Object.entries(STARTER_DEFAULTS[gender])) {
      const item = COSMETIC_CATALOG.find(x => x.id === id)!;
      assert.equal(item.slot, slot); assert.equal(item.price, 0); assert.equal(item.starter, true);
      assert.ok(createDefaultCosmetics(gender).ownedItemIds.includes(id));
    }
  }
  for (const item of COSMETIC_CATALOG.filter(x => !x.starter && x.unlock.kind === 'always' && x.compatibleWith.includes('boy')))
    assert.equal(purchaseItem(player(), item.id, unavailableCatalog).result.status, 'asset-unavailable');
});

for (const [name, alter] of [
  ['duplicate ID', (x: StoreItem) => ({ ...x, id: COSMETIC_CATALOG[1].id })],
  ['negative price', (x: StoreItem) => ({ ...x, price: -1 })],
  ['fractional price', (x: StoreItem) => ({ ...x, price: 1.2 })],
  ['unknown slot', (x: StoreItem) => ({ ...x, slot: 'cape' })],
  ['wrong plane', (x: StoreItem) => ({ ...x, assets: { boy: [{ plane: 'top', src: '/avatars/v1/hair.webp' }] } })],
  ['unknown unlock', (x: StoreItem) => ({ ...x, unlock: { kind: 'pay' } })],
  ['bad compatibility', (x: StoreItem) => ({ ...x, compatibleWith: ['other'] })],
  ['charged starter', (x: StoreItem) => ({ ...x, price: 10 })],
  ['false readiness', (x: StoreItem) => ({ ...x, assetStatus: 'ready', assets: {}, preview: { ...x.preview, thumbnailSrc: null } })],
  ['remote path', (x: StoreItem) => ({ ...x, assets: { boy: [{ plane: 'hair', src: 'https://external/hair.svg' }] } })],
] as const) test(`catalog rejects ${name}`, () => {
  const catalog = [...COSMETIC_CATALOG]; catalog[0] = alter(catalog[0]) as StoreItem;
  assert.ok(validateCosmeticCatalog(catalog).length);
  const state = player(); assert.equal(purchaseItem(state, 'top.sunshine-tee', catalog).state, state);
});
test('catalog rejects missing defaults and malformed entries without throwing', () => {
  assert.ok(validateCosmeticCatalog(COSMETIC_CATALOG.slice(1)).length);
  assert.ok(validateCosmeticCatalog([null, { id: 1 }] as unknown as StoreItem[]).length);
});

for (const chapter of [0, 1, 2]) test(`legacy chapter ${chapter} migration preserves every established normalized field`, () => {
  let old = player();
  if (chapter >= 1) old = migrateState({ ...old, completedUnits: [1, 2, 3], bossDefeated: true,
    lastBossRewardBattleId: 'saved-dragon', reviewGateCompleted: true });
  if (chapter === 2) old = migrateState({ ...old, completedUnits: [1, 2, 3, 4],
    chapter2: { reviewGateCompleted: true, reviewGateAttempts: 3, reviewGateBestAccuracy: 100,
      bossDefeated: true, lastBossRewardBattleId: 'saved-chronos', rewardedBattleIds: ['saved-chronos'] } });
  const q = getAllQuestions()[0];
  old = applyQuestionResult(old, q, false, false, '2026-10-04T10:00:00Z', 'wrong', getTodayDateString(), 'boss');
  old = applyQuestionResult(old, { ...q, reviewOf: [q.id] }, true, false, '2026-10-04T10:01:00Z', undefined, getTodayDateString(), 'review');
  old = migrateState({ ...old, coins: 123, xp: 350, hearts: 3, completedSessionIds: ['saved-session'] });
  old.settings.speechRate = 0.8;
  old.achievements.first_step = { ...old.achievements.first_step, unlockedAt: '2026-10-01', currentProgress: 1 };
  old.stagePerformance = { 'unit1-practice': { attempts: 5, bestAccuracy: 83 } };
  old.recentQuestionHistory = { '1': { variantIds: ['variant-a'], templateIds: ['template-a'], cycleVariantIds: ['variant-a'],
    contextKeys: ['context-a'], lastSessionContextKeys: ['context-a'], lastSessionContextFamilyKeys: ['family-a'],
    conceptIds: ['concept-a'], visibleTaskKeys: ['task-a'] } };
  old.errorBank[q.id] = { ...old.errorBank[q.id], recoveryVariantIds: ['fresh-a', 'fresh-b'],
    recoveryInstanceIds: ['instance-a', 'instance-b'], reviewCorrectStreak: 2 };
  const legacy = excludingCosmetics(old), migrated = migrateState(legacy);
  assert.deepEqual(excludingCosmetics(migrated), legacy);
  assert.equal(migrated.cosmetics!.setupCompleted, false);
  assert.equal(migrated.cosmetics!.ownedItemIds.length, 8);
  assert.deepEqual(migrateState(migrated), migrated);
  const serialized = JSON.parse(JSON.stringify(migrated));
  assert.deepEqual(migrateState(serialized), serialized);
  assert.equal(migrated.errorBank[q.id].reviewCorrectStreak, old.errorBank[q.id].reviewCorrectStreak);
});
for (const cosmetics of [null, [], 'broken', { avatar: { gender: 'unknown', equipped: { top: 'unowned' } }, ownedItemIds: [1, 'retired.item', 'retired.item'] }])
  test(`malformed cosmetics repaired alone: ${JSON.stringify(cosmetics)}`, () => {
    const baseline = migrateState(player()), after = migrateState({ ...baseline, cosmetics });
    assert.deepEqual(excludingCosmetics(after), excludingCosmetics(baseline));
    assert.deepEqual(after.cosmetics!.avatar.equipped, createDefaultCosmetics().avatar.equipped);
    assert.equal(new Set(after.cosmetics!.ownedItemIds).size, after.cosmetics!.ownedItemIds.length);
  });
test('unknown owned IDs remain dormant after normalization', () => {
  const c = normalizeCosmetics({ ownedItemIds: ['retired.item'], avatar: { gender: 'girl' } });
  assert.ok(c.ownedItemIds.includes('retired.item')); assert.equal(c.avatar.gender, 'girl');
});
test('genuine new-player legacy save gains only cosmetics', () => {
  const before = createDefaultState(), legacy = excludingCosmetics(before), after = migrateState(legacy);
  assert.deepEqual(excludingCosmetics(after), legacy);
  assert.equal(after.cosmetics!.setupCompleted, false); assert.deepEqual(after.cosmetics!.ownedItemIds, STARTER_IDS);
});

test('purchase deducts exact price once without auto-equip or any unrelated change', () => {
  const before = player(), tx = purchase(before);
  assert.equal(tx.result.status, 'success'); assert.equal(tx.state.coins, 180);
  assert.deepEqual(tx.state.cosmetics!.avatar, before.cosmetics!.avatar);
  assert.deepEqual({ ...excludingCosmetics(tx.state), coins: before.coins }, excludingCosmetics(before));
  const duplicate = purchase(tx.state); assert.equal(duplicate.result.status, 'already-owned'); assert.equal(duplicate.state, tx.state);
});
for (const balance of [0, 19]) test(`insufficient balance ${balance} is unchanged`, () => {
  const state = { ...player(), coins: balance }, tx = purchase(state);
  assert.equal(tx.result.status, 'insufficient-coins'); assert.equal(tx.state, state);
});
for (const balance of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) test(`invalid balance ${balance} is rejected`, () => {
  const state = { ...player(), coins: balance }; assert.equal(purchase(state).result.status, 'invalid-balance');
});
test('exact balance reaches zero, never negative', () => {
  const tx = purchase({ ...player(), coins: 20 }); assert.equal(tx.state.coins, 0);
  assert.equal(purchase(tx.state, 'top.coral-stripes').result.status, 'insufficient-coins');
});
test('nonexistent, locked, incompatible and unavailable assets reject', () => {
  assert.equal(purchase(player(), 'unknown').result.status, 'invalid-item');
  assert.equal(purchase(player(), 'top.castle-jacket').result.status, 'locked');
  assert.equal(purchase(player(), 'hair.pony-tail').result.status, 'incompatible');
  assert.equal(purchaseItem(player(), 'top.sunshine-tee', unavailableCatalog).result.status, 'asset-unavailable');
});
test('unit, XP-derived level and Boss unlocks use progress, not legacy level', () => {
  assert.equal(purchase({ ...player(), completedUnits: [1] }, 'hair.tidy-spikes').result.status, 'success');
  assert.equal(purchase({ ...player(), bossDefeated: true }, 'top.castle-jacket').result.status, 'success');
  assert.equal(purchase({ ...player(), chapter2: { ...player().chapter2!, bossDefeated: true } }, 'accessory.time-watch').result.status, 'success');
  const catalog = readyCatalog.map(x => x.id === 'top.sunshine-tee' ? { ...x, unlock: { kind: 'level' as const, minimum: 3 } } : x);
  assert.equal(purchaseItem({ ...player(), xp: 0, level: 99 }, 'top.sunshine-tee', catalog).result.status, 'locked');
  assert.equal(purchaseItem({ ...player(), xp: 500, level: 1 }, 'top.sunshine-tee', catalog).result.status, 'success');
});
test('owned equip replaces exactly its slot, costs nothing, persists in normalized ready catalog', () => {
  const bought = purchase().state, tx = equipItem(bought, 'top.sunshine-tee', readyCatalog);
  assert.equal(tx.result.status, 'success'); assert.equal(tx.state.coins, bought.coins);
  assert.deepEqual(excludingCosmetics(tx.state), excludingCosmetics(bought));
  assert.deepEqual(tx.state.cosmetics!.avatar.equipped, { ...bought.cosmetics!.avatar.equipped, top: 'top.sunshine-tee' });
  assert.deepEqual(normalizeCosmetics(JSON.parse(JSON.stringify(tx.state.cosmetics)), readyCatalog), tx.state.cosmetics);
});
test('equip rejects unowned, invalid, incompatible, wrong-slot catalog and unavailable art', () => {
  assert.equal(equipItem(player(), 'top.sunshine-tee', readyCatalog).result.status, 'not-owned');
  assert.equal(equipItem(player(), 'unknown', readyCatalog).result.status, 'invalid-item');
  const state = player(); state.cosmetics!.ownedItemIds.push('hair.pony-tail', 'top.sunshine-tee');
  assert.equal(equipItem(state, 'hair.pony-tail', readyCatalog).result.status, 'incompatible');
  assert.equal(equipItem(state, 'top.sunshine-tee', unavailableCatalog).result.status, 'asset-unavailable');
  const wrong = readyCatalog.map(x => x.id === 'top.sunshine-tee' ? { ...x, slot: 'shoes' as const } : x);
  assert.equal(equipItem(state, 'top.sunshine-tee', wrong).result.status, 'invalid-catalog');
});
test('owned items remain equippable after acquisition unlock changes', () => {
  const bought = purchase({ ...player(), completedUnits: [1] }, 'hair.tidy-spikes').state;
  assert.equal(equipItem({ ...bought, completedUnits: [] }, 'hair.tidy-spikes', readyCatalog).result.status, 'success');
});
test('unequip clears accessory, restores required default and rejects unknown slot', () => {
  const bought = purchase(player(), 'accessory.round-glasses').state;
  const worn = equipItem(bought, 'accessory.round-glasses', readyCatalog).state;
  assert.equal(unequipItem(worn, 'accessory').state.cosmetics!.avatar.equipped.accessory, null);
  const top = equipItem(purchase().state, 'top.sunshine-tee', readyCatalog).state;
  assert.equal(unequipItem(top, 'top').state.cosmetics!.avatar.equipped.top, STARTER_DEFAULTS.boy.top);
  assert.equal(unequipItem(top, 'invalid' as never).result.status, 'invalid-slot');
  assert.equal(unequipItem(top, 'top').state.coins, top.coins);
});
test('gender switches preserve purchases/progress and compatible clothes with free fallback', () => {
  let state = purchase(player(), 'hair.side-sweep').state;
  state = equipItem(state, 'hair.side-sweep', readyCatalog).state;
  state = equipItem(purchase(state).state, 'top.sunshine-tee', readyCatalog).state;
  const before = state;
  state = changeAvatarGender(state, 'girl', readyCatalog).state;
  assert.equal(state.cosmetics!.avatar.equipped.hair, STARTER_DEFAULTS.girl.hair);
  assert.equal(state.cosmetics!.avatar.equipped.top, 'top.sunshine-tee');
  for (let i = 0; i < 8; i++) state = changeAvatarGender(state, i % 2 ? 'girl' : 'boy', readyCatalog).state;
  assert.deepEqual(excludingCosmetics(state), excludingCosmetics(before));
  assert.deepEqual(state.cosmetics!.ownedItemIds, before.cosmetics!.ownedItemIds);
  state = changeAvatarGender(state, 'boy', readyCatalog).state;
  assert.equal(equipItem(state, 'hair.side-sweep', readyCatalog).result.status, 'success');
  assert.equal(changeAvatarGender(state, 'invalid' as never).result.status, 'invalid-gender');
});
test('gender switch clears incompatible accessory without deleting ownership', () => {
  const catalog = readyCatalog.map(x => x.id === 'accessory.round-glasses' ? { ...x, compatibleWith: ['boy'] as const,
    assets: { boy: x.assets.boy } } : x);
  const bought = purchaseItem(player(), 'accessory.round-glasses', catalog).state;
  const worn = equipItem(bought, 'accessory.round-glasses', catalog).state;
  const switched = changeAvatarGender(worn, 'girl', catalog).state;
  assert.equal(switched.cosmetics!.avatar.equipped.accessory, null);
  assert.ok(switched.cosmetics!.ownedItemIds.includes('accessory.round-glasses'));
});

test('publication never updates visible snapshot on failed storage, including thrown errors', () => {
  const initial = player(); let visible = initial;
  for (const save of [() => false, () => { throw new Error('quota'); }]) {
    assert.equal(persistBeforePublish(purchase(initial).state, 'writable', save, next => { visible = next; }), 'storage-failed');
    assert.equal(visible, initial);
  }
});
test('GameContext action boundary returns truthful storage/read-only outcomes and no false success', () => {
  const before = player(); let visible = before, calls = 0;
  const publish = (next: UserProgressState) => persistBeforePublish(next, 'writable', () => {
    calls++; assert.equal(visible, before); return false;
  }, next => { visible = next; });
  assert.equal(runCosmeticAction(purchase, () => visible, 'writable', true, publish).status, 'storage-failed');
  assert.equal(visible, before); assert.equal(calls, 1);
  assert.equal(runCosmeticAction(purchase, () => visible, 'read-only', true, publish).status, 'read-only');
  assert.equal(runCosmeticAction(purchase, () => visible, 'writable', false, publish).status, 'storage-failed');
  assert.equal(calls, 1);
});
test('GameContext action boundary serializes duplicate successful calls using latest snapshot', () => {
  let visible = player(), raw = '', calls = 0;
  const buy = () => runCosmeticAction(purchase, () => visible, 'writable', true, next =>
    persistBeforePublish(next, 'writable', state => { calls++; raw = JSON.stringify(state); return true; }, state => { visible = state; }));
  assert.equal(buy().status, 'success'); assert.equal(buy().status, 'already-owned');
  assert.equal(calls, 1); assert.equal(migrateState(JSON.parse(raw)).coins, 180);
});
test('rapid purchases use published latest snapshot and survive reload', () => {
  let visible = player(), raw = '';
  const buy = () => { const tx = purchase(visible); if (tx.result.status === 'success')
    persistBeforePublish(tx.state, 'writable', next => { raw = JSON.stringify(next); return true; }, next => { visible = next; }); return tx.result.status; };
  assert.equal(buy(), 'success'); assert.equal(buy(), 'already-owned'); assert.equal(visible.coins, 180);
  const reload = migrateState(JSON.parse(raw)); assert.equal(reload.coins, 180);
  assert.ok(reload.cosmetics!.ownedItemIds.includes('top.sunshine-tee'));
});
test('interleaved session reward, purchase and study timer preserve one latest full save', () => {
  let visible: UserProgressState = { ...player(), unitStageProgress: { 'unit1-learn': true } };
  let raw = '';
  const publish = (next: UserProgressState) => persistBeforePublish(next, 'writable', state => {
    raw = JSON.stringify(state); return true;
  }, state => { visible = state; });
  const summary = { sessionId: 'interleaved', unitId: 1, stageId: 'practice' as const, correctCount: 5, totalQuestions: 6, durationSeconds: 10 };
  publish(applySessionCompletion(visible, summary, 'now', getTodayDateString()).state);
  const earned = visible.coins, xp = visible.xp;
  publish(purchase(visible).state);
  publish({ ...visible, totalStudySeconds: visible.totalStudySeconds + 10 });
  const reloaded = migrateState(JSON.parse(raw));
  assert.equal(reloaded.coins, earned - 20); assert.equal(reloaded.xp, xp);
  assert.ok(reloaded.cosmetics!.ownedItemIds.includes('top.sunshine-tee'));
  assert.ok(reloaded.completedSessionIds!.includes('interleaved'));
  assert.equal(reloaded.totalStudySeconds, 10);
});

function withLocalStorage(run: (values: Map<string, string>) => void) {
  const oldWindow = globalThis.window, oldStorage = globalThis.localStorage, values = new Map<string, string>();
  Object.defineProperty(globalThis, 'window', { value: {}, configurable: true, writable: true });
  Object.defineProperty(globalThis, 'localStorage', { value: { getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); } }, configurable: true, writable: true });
  try { run(values); } finally {
    Object.defineProperty(globalThis, 'window', { value: oldWindow, configurable: true, writable: true });
    Object.defineProperty(globalThis, 'localStorage', { value: oldStorage, configurable: true, writable: true });
  }
}
for (const raw of ['{invalid', 'null', '[]', '7', '']) test(`invalid whole save is recoverable and never overwritten: ${raw}`, () => {
  withLocalStorage(values => {
    values.set('ENGLISH_ADVENTURE_STATE_V1', raw); const storage = new StorageService(), result = storage.loadStateResult();
    assert.equal(result.status, 'invalid-save'); assert.equal(result.raw, raw);
    assert.equal(storage.saveState(player()), false);
    assert.equal(values.get('ENGLISH_ADVENTURE_STATE_V1'), raw);
  });
});
test('load/streak calculations do not write before writer acquisition', () => withLocalStorage(values => {
  const storage = new StorageService(), old = { ...player(), lastActiveDate: '2020-01-01' };
  values.set('ENGLISH_ADVENTURE_STATE_V1', JSON.stringify(old));
  storage.loadState();
  assert.equal(values.get('ENGLISH_ADVENTURE_STATE_V1'), JSON.stringify(old));
  storage.setWritePermission(() => false); assert.equal(storage.saveState(player()), false);
}));
test('load result does not publish an unsaved streak/achievement update', () => withLocalStorage(values => {
  const storage = new StorageService(), before = { ...player(), streak: 4, lastActiveDate: '2026-10-03' };
  values.set('ENGLISH_ADVENTURE_STATE_V1', JSON.stringify(before));
  const loaded = storage.loadStateResult(); assert.equal(loaded.state.streak, 4);
  let visible = loaded.state;
  assert.equal(persistBeforePublish(storage.checkAndUpdateStreak(visible), 'writable', () => false, next => { visible = next; }), 'storage-failed');
  assert.equal(visible.streak, 4); assert.equal(visible.achievements.streak_hero.unlockedAt, null);
}));
test('successful ownership and starter equipment survive actual storage round trip', () => withLocalStorage(() => {
  const storage = new StorageService(); let state = purchase().state;
  state = changeAvatarGender(state, 'girl').state;
  state = equipItem(state, 'top.starter-blue', readyCatalog).state;
  assert.equal(storage.saveState(state), true);
  const loaded = storage.loadState(); assert.deepEqual(loaded.cosmetics, state.cosmetics); assert.equal(loaded.coins, 180);
}));
test('storage read failures and quota writes return recoverable failures without overwriting data', () => withLocalStorage(values => {
  const storage = new StorageService(), raw = JSON.stringify(player());
  values.set('ENGLISH_ADVENTURE_STATE_V1', raw);
  storage.loadStateResult();
  globalThis.localStorage.setItem = () => { throw new Error('quota'); };
  let visible = player(); const before = visible;
  assert.equal(persistBeforePublish(purchase(visible).state, 'writable', next => storage.saveState(next), next => { visible = next; }), 'storage-failed');
  assert.equal(visible, before); assert.equal(values.get('ENGLISH_ADVENTURE_STATE_V1'), raw);
  globalThis.localStorage.getItem = () => { throw new Error('storage denied'); };
  assert.equal(storage.loadStateResult().status, 'storage-unavailable');
  assert.equal(storage.saveState(player()), false);
}));

/** Deterministic implementation of browser lock queue/abort/release semantics. */
class LockQueue implements LockProvider {
  private tail: Promise<unknown> = Promise.resolve();
  request(_name: string, options: { signal: AbortSignal }, callback: (lock: unknown) => Promise<void>) {
    const turn = this.tail.then(async () => { if (options.signal.aborted) throw new Error('aborted'); await callback({}); });
    this.tail = turn.catch(() => {}); return turn;
  }
}
const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
test('secondary writer cannot purchase or overwrite; takeover reloads newest active save', async () => {
  const locks = new LockQueue(), first = new SaveWriter(locks), second = new SaveWriter(locks);
  let raw = JSON.stringify(player()), a = player(), b = player();
  const stopA = first.start(() => { a = migrateState(JSON.parse(raw)); });
  const stopB = second.start(() => { b = migrateState(JSON.parse(raw)); });
  await flush(); assert.equal(first.status, 'writable'); assert.equal(second.status, 'read-only');
  const save = (next: UserProgressState) => { raw = JSON.stringify(next); return true; };
  assert.equal(persistBeforePublish(purchase(b).state, second.status, save, next => { b = next; }), 'read-only');
  assert.equal(persistBeforePublish({ ...b, coins: 999 }, second.status, save, next => { b = next; }), 'read-only');
  assert.equal(persistBeforePublish(purchase(a).state, first.status, save, next => { a = next; }), 'success');
  stopA(); await flush(); assert.equal(second.status, 'writable'); assert.equal(b.coins, 180);
  assert.equal(purchase(b).result.status, 'already-owned'); stopB();
});
test('unsupported capability safely falls back to read-only; no persistence call', () => {
  const writer = new SaveWriter(); let called = false; writer.start(() => { called = true; });
  assert.equal(writer.status, 'unsupported');
  assert.equal(persistBeforePublish(player(), writer.status, () => { called = true; return true; }, () => {}), 'read-only');
  assert.equal(called, false);
});
test('lock denial and thrown lock API fail closed', async () => {
  for (const locks of [{ request: () => Promise.reject(new Error('denied')) }, { request: () => { throw new Error('unavailable'); } }]) {
    const writer = new SaveWriter(locks); writer.start(() => {}); await flush(); assert.equal(writer.status, 'unavailable');
  }
});
test('cancelled queued writer never acquires; repeated start/cleanup does not leak locks', async () => {
  const locks = new LockQueue(), first = new SaveWriter(locks), queued = new SaveWriter(locks);
  const stopA = first.start(() => {}); let acquired = 0;
  const stopQueued = queued.start(() => { acquired++; }); stopQueued(); await flush(); stopA(); await flush();
  assert.equal(acquired, 0);
  const stopRestart = queued.start(() => { acquired++; }); await flush(); assert.equal(acquired, 1); stopRestart();
});
test('page lifecycle release and reacquisition reload rather than reusing stale writable state', async () => {
  const locks = new LockQueue(), oldPage = new SaveWriter(locks), otherPage = new SaveWriter(locks);
  let reloads = 0; const onAcquired = () => { reloads++; };
  const hide = oldPage.start(onAcquired); await flush(); assert.equal(reloads, 1);
  const closeOther = otherPage.start(() => {}); hide(); await flush();
  assert.equal(oldPage.status, 'read-only'); assert.equal(otherPage.status, 'writable');
  const closeRestored = oldPage.start(onAcquired); await flush(); assert.equal(reloads, 1);
  closeOther(); await flush(); assert.equal(reloads, 2); assert.equal(oldPage.status, 'writable'); closeRestored();
});
test('production shortcut reducer cannot grant currency, XP or unlocks', () => {
  const state = player(); for (const op of ['coins', 'xp', 'unlock'] as const)
    assert.equal(applyDevShortcut(state, false, op, 999), state);
  assert.equal(applyDevShortcut(state, true, 'coins', 50).coins, 250);
  assert.equal(applyDevShortcut(state, true, 'coins', -1), state);
  const settings = readFileSync(new URL('../src/screens/SettingsScreen.tsx', import.meta.url), 'utf8');
  const context = readFileSync(new URL('../src/context/GameContext.tsx', import.meta.url), 'utf8');
  assert.ok(settings.includes('{import.meta.env.DEV && <div'));
  assert.equal((context.match(/applyDevShortcut\(prev, import.meta.env.DEV/g) ?? []).length, 3);
});
test('session/Boss rewards and duplicate guards are unchanged with cosmetics present', () => {
  const initial = { ...player(), unitStageProgress: { 'unit1-learn': true } };
  const summary = { sessionId: 'cosmetic-session', unitId: 1, stageId: 'practice' as const, totalQuestions: 6, correctCount: 6, durationSeconds: 20 };
  const session = applySessionCompletion(initial, summary, '2026-10-04T10:00:00Z', getTodayDateString());
  assert.equal(session.result.coinsEarned, 47); assert.equal(session.result.xpEarned, 130);
  assert.deepEqual(session.state.cosmetics, initial.cosmetics);
  assert.equal(applySessionCompletion(session.state, summary, 'now', getTodayDateString()).result.coinsEarned, 0);
  const boss = applyBossVictory(session.state, 'cosmetic-boss', getTodayDateString());
  assert.equal(boss.result.xp, 200); assert.equal(boss.result.coins, 100);
  assert.equal(applyBossVictory(boss.state, 'cosmetic-boss', getTodayDateString()).result.coins, 0);
  assert.deepEqual(boss.state.cosmetics, initial.cosmetics);
});
