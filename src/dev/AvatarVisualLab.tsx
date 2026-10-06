import React, { useState } from 'react';
import { AvatarRenderer } from '../components/avatar/AvatarRenderer';
import { AVATAR_BODY_ASSETS, STARTER_ASSET_PATHS } from '../data/avatarAssets';
import { STARTER_DEFAULTS } from '../data/cosmeticsCatalog';
import type { AvatarGender, AvatarState } from '../types';
import { AvatarEditor } from '../components/avatar/AvatarEditor';
import { createDefaultCosmetics } from '../engine/avatarCosmetics';
import { saveAvatarDraft } from '../engine/avatarCloset';
import { createDefaultState } from '../services/storage';
import { persistBeforePublish, runCosmeticAction } from '../services/durableState';
import { CatalogVisualLab } from './CatalogVisualLab';

export default function AvatarVisualLab() {
  const [mixed, setMixed] = useState(false);
  const [failure, setFailure] = useState('none');
  const [saveDiagnostic, setSaveDiagnostic] = useState('success');
  const [fixture, setFixture] = useState(createDefaultState);
  const [editorRevision, setEditorRevision] = useState(0);
  const avatar = (gender: AvatarGender): AvatarState => ({ gender, equipped: {
    ...STARTER_DEFAULTS[gender], accessory: null,
    ...(mixed ? STARTER_DEFAULTS[gender === 'boy' ? 'girl' : 'boy'] : {}),
    hair: STARTER_DEFAULTS[gender].hair,
  } });
  const unavailable = failure === 'clothing' ? [STARTER_ASSET_PATHS['top.starter-blue'], STARTER_ASSET_PATHS['top.starter-mint']] : [];
  const bodies = failure === 'body' ? { ...AVATAR_BODY_ASSETS, boy: { ...AVATAR_BODY_ASSETS.boy, src: '/avatars/v1/missing-test-body.webp' } } : AVATAR_BODY_ASSETS;
  return <main style={{ padding: 20, maxWidth: 1200, margin: 'auto', color: '#24374b' }}>
    <h1 style={{ fontSize: 28 }}>Starter avatar visual lab</h1>
    <p>Development only. These previews never read or write player progress.</p>
    <CatalogVisualLab />
    <button onClick={() => setMixed(value => !value)} aria-pressed={mixed} style={{ minHeight: 48, padding: 12, border: '2px solid #526a83', margin: '12px 12px 12px 0' }}>Swap starter clothes</button>
    <label style={{ display: 'inline-block', maxWidth: '100%' }}>Asset diagnostic <select value={failure} onChange={event => setFailure(event.target.value)} style={{ minHeight: 48, maxWidth: '100%', border: '2px solid #526a83', padding: 8 }}>
      <option value="none">All assets available</option><option value="body">Missing boy body (real image error)</option><option value="clothing">Missing required tops</option>
    </select></label>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 16 }}>
      {(['boy', 'girl'] as const).map(gender => <section key={gender} style={{ border: '1px solid #c5d4e4', borderRadius: 16, padding: 16, background: '#f3f7fb' }}>
        <h2 style={{ fontSize: 22 }}>{gender} starter</h2>
        <div style={{ display: 'flex', alignItems: 'end', gap: 16, flexWrap: 'wrap' }}>{(['small', 'medium', 'large', 'responsive'] as const).map(size => <figure key={size} style={{ margin: 0, maxWidth: '100%' }}>
          <AvatarRenderer key={`${size}:${failure}`} avatar={avatar(gender)} size={size} unavailableSources={unavailable} bodyAssets={bodies} />
          <figcaption>{size}</figcaption>
        </figure>)}</div>
        <h3>Neutral body only</h3><AvatarRenderer avatar={avatar(gender)} presentation="body-only" />
        <h3>Unknown equipment fallback</h3><AvatarRenderer avatar={{ ...avatar(gender), equipped: { ...avatar(gender).equipped, top: 'unknown', accessory: 'accessory.castle-crown' } }} />
      </section>)}
    </div>
    <section className="mt-8 space-y-4" aria-label="Creator save diagnostics">
      <h2 className="text-2xl font-bold">Creator save diagnostics (memory fixture only)</h2>
      <label>Save diagnostic <select value={saveDiagnostic} onChange={event => setSaveDiagnostic(event.target.value)} className="min-h-12 border-2 p-2 max-w-full">
        <option value="success">Successful save</option><option value="storage-failed">Storage failure</option><option value="read-only">Read-only tab</option>
      </select></label>
      <AvatarEditor key={editorRevision} cosmetics={fixture.cosmetics ?? createDefaultCosmetics()} canSave={true}
        onCancel={() => setEditorRevision(value => value + 1)} onSave={draft => {
          const writer = saveDiagnostic === 'read-only' ? 'read-only' : 'writable';
          return runCosmeticAction(state => saveAvatarDraft(state, draft), () => fixture, writer, true,
            next => persistBeforePublish(next, writer, () => saveDiagnostic !== 'storage-failed', setFixture));
        }} />
      <p role="status">Fixture setup completed: {fixture.cosmetics?.setupCompleted ? 'yes' : 'no'}</p>
    </section>
  </main>;
}
