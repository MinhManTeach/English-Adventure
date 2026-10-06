import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { PlayerAvatar } from './PlayerAvatar';
import { AVATAR_PRESETS } from '../../data/avatarsData';
import { Button } from '../common/Button';

const TITLES = ['Brave Explorer', 'Grammar Sage', 'Cosmic Champion', 'Dragon Knight', 'Word Master', 'Adventure Captain'];
export function LegacyAvatarProfile() {
  const { state, updateAvatar, writerStatus, storageStatus } = useGame();
  const [avatarId, setAvatarId] = useState(state.profile.avatarId);
  const [title, setTitle] = useState(state.profile.title || 'Brave Explorer');
  const [feedback, setFeedback] = useState('');
  const preset = AVATAR_PRESETS.find(item => item.id === state.profile.avatarId) ?? AVATAR_PRESETS[0];
  return <section className="rounded-3xl bg-white p-4 sm:p-6 border border-amber-100 space-y-4" aria-labelledby="profile-heading">
    <div className="flex items-center gap-4"><PlayerAvatar profile={state.profile} cosmetics={state.cosmetics} size="small" />
      <div className="min-w-0 break-words"><h2 id="profile-heading" className="font-game text-xl font-black text-slate-900">{state.profile.name || 'Hero'}</h2>
        <p className="text-sm font-bold text-amber-900">{state.profile.title || 'Brave Explorer'}</p></div></div>
    <details><summary className="min-h-12 py-3 font-bold cursor-pointer text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300">Classic avatar & hero title</summary>
      <div className="space-y-4 pt-4">
        <div role="group" aria-label="Classic avatar choices" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {AVATAR_PRESETS.map(item => <button key={item.id} type="button" aria-pressed={avatarId === item.id}
            onClick={() => { setAvatarId(item.id); setFeedback(''); }} className={`min-h-12 p-3 rounded-2xl border-2 text-slate-800 font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${avatarId === item.id ? 'border-amber-600 bg-amber-50' : 'border-slate-200'}`}>
            <span aria-hidden="true" className="block text-3xl">{item.icon}</span>{item.name}{avatarId === item.id ? ' ✓' : ''}</button>)}
        </div>
        <h3 className="font-game text-lg font-black text-slate-900">Hero title</h3>
        <div role="group" aria-label="Hero titles" className="flex flex-wrap gap-2">{TITLES.map(item => <button key={item} type="button" aria-pressed={title === item}
          onClick={() => { setTitle(item); setFeedback(''); }} className={`min-h-12 px-4 py-2 rounded-2xl border-2 font-bold text-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${title === item ? 'border-amber-600 bg-amber-100' : 'border-slate-200'}`}>{item}{title === item ? ' ✓' : ''}</button>)}</div>
        <Button size="lg" variant="secondary" className="whitespace-normal! motion-reduce:transition-none motion-reduce:active:translate-y-0" disabled={writerStatus !== 'writable' || storageStatus !== 'ready'}
          onClick={() => setFeedback(updateAvatar(avatarId, title) ? 'Profile saved! Đã lưu.' : 'Your profile could not be saved. Please try again.')}>Save classic avatar & title</Button>
        <p role="status" className="text-sm font-bold text-slate-700">{feedback}</p>
      </div>
    </details>
  </section>;
}
