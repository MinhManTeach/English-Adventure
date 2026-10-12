import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createDefaultState } from '../src/services/storage';
import { purchaseItem, equipItem, changeAvatarGender } from '../src/engine/avatarCosmetics';
import { saveAvatarDraft } from '../src/engine/avatarCloset';
import { previewStoreItem } from '../src/engine/cosmeticStore';
import { COSMETIC_CATALOG } from '../src/data/cosmeticsCatalog';
import { AVATAR_BODY_ASSETS } from '../src/data/avatarAssets';
import { PlayerAvatar } from '../src/components/avatar/PlayerAvatar';
import { SessionResult } from '../src/components/common/SessionResult';
import { AnimatedCounter } from '../src/components/common/AnimatedCounter';
import { GameProvider } from '../src/context/GameContext';
import { Navbar } from '../src/components/common/Navbar';
import { HomeScreen } from '../src/screens/HomeScreen';
import { AdventureMapScreen } from '../src/screens/AdventureMapScreen';
import { applySessionCompletion } from '../src/engine/sessionCompletion';
import type { UserProgressState } from '../src/types';

const player = () => {
  const state = createDefaultState();
  return { ...state, coins: 200, profile: { ...state.profile, name: 'Avatar QA', avatarId: 'draco', title: 'Dragon Knight' } };
};
const configured = () => saveAvatarDraft(player(), player().cosmetics!.avatar).state;
const render = (state: UserProgressState, decorative = false) => renderToStaticMarkup(<PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} decorative={decorative} />);
const sources = (html: string) => [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(match => match[1]);

test('unconfigured and missing cosmetics preserve the saved legacy identity without layered images', () => {
  const state = player(); const before = structuredClone(state);
  const html = render(state);
  assert.match(html, /🐲/); assert.match(html, /Legacy avatar Draco the Dragon/); assert.deepEqual(sources(html), []);
  assert.match(render({ ...state, cosmetics: undefined }), /🐲/);
  assert.deepEqual(state, before);
});
for (const gender of ['boy', 'girl'] as const) test(`${gender}: configured PlayerAvatar resolves the authoritative saved outfit`, () => {
  let state = configured(); state = changeAvatarGender(state, gender).state;
  const html = render(state), paths = sources(html);
  assert.ok(paths.includes(AVATAR_BODY_ASSETS[gender].src));
  for (const id of Object.values(state.cosmetics!.avatar.equipped).filter(Boolean)) {
    for (const layer of COSMETIC_CATALOG.find(x => x.id === id)!.assets[gender]!) assert.ok(paths.includes(layer.src));
  }
  assert.match(html, /data-player-avatar="layered"/); assert.doesNotMatch(html, /🐲/);
});
test('purchase and preview do not change global identity; equip and gender save do', () => {
  let state = configured(); const initial = sources(render(state)); const before = structuredClone(state);
  const tee = COSMETIC_CATALOG.find(x => x.id === 'top.sunshine-tee')!;
  const preview = previewStoreItem(state.cosmetics!.avatar, tee);
  assert.equal(preview.equipped.top, tee.id); assert.deepEqual(sources(render(state)), initial); assert.deepEqual(state, before);
  state = purchaseItem(state, tee.id).state;
  assert.deepEqual(sources(render(state)), initial);
  state = equipItem(state, tee.id).state;
  assert.notDeepEqual(sources(render(state)), initial);
  assert.ok(sources(render(state)).includes(tee.assets.boy![0].src));
  state = changeAvatarGender(state, 'girl').state;
  assert.ok(sources(render(state)).includes(AVATAR_BODY_ASSETS.girl.src));
  assert.equal(state.cosmetics!.avatar.equipped.top, tee.id);
});
test('invalid or missing equipment remains a complete visual fallback without mutating saved progress', () => {
  const state = configured(); state.cosmetics!.avatar.equipped.top = 'missing';
  const before = structuredClone(state); const html = render(state);
  assert.equal(sources(html).length, 5); assert.match(html, /starter fallback/);
  assert.deepEqual(state, before);
  const absent = { ...state, cosmetics: { ...state.cosmetics!, avatar: undefined } } as unknown as UserProgressState;
  assert.doesNotThrow(() => render(absent));
});
test('compact shared identity is a round head-and-shoulders portrait in a fixed 48px frame, hidden from screen readers', () => {
  const state = configured();
  const html = renderToStaticMarkup(<PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" variant="compact" decorative />);
  assert.match(html, /width:48px/); assert.match(html, /aspect-ratio:1/); assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /overflow:hidden/); assert.match(html, /data-avatar-portrait/); assert.match(html, /clip-path:circle\(50%\)/);
});
test('Navbar, Home and map keep accessible navigation and use the shared identity', () => {
  const html = renderToStaticMarkup(<GameProvider><Navbar /><HomeScreen /><AdventureMapScreen /></GameProvider>);
  assert.match(html, /aria-label="Open My Avatar"/); assert.match(html, /aria-label="Change avatar"/);
  assert.match(html, /Start · Bắt đầu/); assert.match(html, /Magic Grammar Gate/); assert.match(html, /data-current="true"/);
  assert.ok((html.match(/data-player-avatar="legacy"/g) ?? []).length >= 3);
});
test('completion result includes the saved hero and forwards exact existing XP/coin rewards', () => {
  const state = configured(); state.unitStageProgress['unit1-learn'] = true;
  const summary = applySessionCompletion(state, { sessionId: 'avatar-result-test', unitId: 1, stageId: 'practice', totalQuestions: 6, correctCount: 6, durationSeconds: 30 }, '2026-10-06T12:00:00Z', '2026-10-06').result;
  const element = SessionResult({ profile: state.profile, cosmetics: state.cosmetics, summary, correctCount: 6, totalQuestions: 6, stageId: 'practice', onNext: () => {}, onRestart: () => {} });
  const counters: number[] = [];
  function visit(node: React.ReactNode) {
    if (Array.isArray(node)) { node.forEach(visit); return; }
    if (!React.isValidElement<{ children?: React.ReactNode; to?: number }>(node)) return;
    if (node.type === AnimatedCounter) counters.push(node.props.to!);
    visit(node.props.children);
  }
  visit(element); assert.deepEqual(counters, [summary.xpEarned, summary.coinsEarned]);
  const html = renderToStaticMarkup(element);
  assert.match(html, /Perfect Round!/); assert.match(html, /data-player-avatar="layered"/); assert.match(html, /Continue Next Stage/);
});
