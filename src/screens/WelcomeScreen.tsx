import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { AVATAR_PRESETS } from '../data/avatarsData';
import { Button } from '../components/common/Button';
import { Mascot } from '../components/common/Mascot';
import { WORLDS, ALL_WORLD_UNIT_IDS } from '../data/worlds';

const PROMISES = [
  { icon: '🎮', text: 'Học qua trò chơi' },
  { icon: '🗺️', text: `${WORLDS.length} thế giới, ${ALL_WORLD_UNIT_IDS.length} bài` },
  { icon: '🐉', text: 'Đánh bại trùm' },
] as const;

export const WelcomeScreen: React.FC = () => {
  const { createProfile } = useGame();
  const [step, setStep] = useState<'welcome' | 'profile'>('welcome');
  const [name, setName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('leo');

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(name, selectedAvatarId);
  };

  if (step === 'welcome') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5 py-10">
        <div className="flex w-full max-w-md flex-col items-center text-center animate-pop">
          <Mascot size={168} className="animate-float" wave />
          <h1 className="mt-4 font-display text-4xl font-black leading-none tracking-tight sm:text-5xl">
            <span className="text-go">english</span><span className="text-sky-brand">adventure</span>
          </h1>
          <p className="mt-3 text-lg font-extrabold text-ink-soft">Học tiếng Anh vui như chơi game!</p>
          <ul className="mt-6 grid w-full grid-cols-3 gap-2">
            {PROMISES.map(item => (
              <li key={item.text} className="card-3d px-2 py-3">
                <span aria-hidden="true" className="block text-3xl">{item.icon}</span>
                <span className="mt-1 block text-xs font-extrabold text-ink">{item.text}</span>
              </li>
            ))}
          </ul>
          <Button variant="success" size="xl" onClick={() => setStep('profile')} className="mt-8 w-full uppercase">
            Get started · Bắt đầu
          </Button>
          <p className="mt-3 text-xs font-bold text-ink-soft">Tiếng Anh A1 · dành cho học sinh lớp 6–9</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-5 py-6">
      <form onSubmit={handleCreateProfile} className="flex w-full max-w-xl flex-1 flex-col animate-pop">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setStep('welcome')} aria-label="Back"
            className="flex h-11 w-11 items-center justify-center rounded-xl text-ink-soft hover:bg-cloud cursor-pointer">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="h-4 flex-1 rounded-full bg-line"><div className="h-full w-1/2 rounded-full bg-go" /></div>
        </div>

        <div className="mt-6 flex items-end gap-3">
          <Mascot size={84} className="shrink-0" />
          <div className="card-3d relative mb-3 px-4 py-3">
            <span aria-hidden="true" className="absolute -left-2 bottom-4 h-4 w-4 rotate-45 border-b-2 border-l-2 border-line bg-white" />
            <h2 className="font-display text-xl font-black text-ink">What is your name?</h2>
            <p className="text-sm font-bold text-ink-soft">Bạn tên là gì? Chọn một nhân vật nhé!</p>
          </div>
        </div>

        <label htmlFor="hero-name" className="eyebrow mt-6 text-ink-soft">Your name · Tên của bạn</label>
        <input id="hero-name" type="text" required maxLength={20} value={name} onChange={e => setName(e.target.value)}
          placeholder="Linh, Nam, Alex…" autoFocus
          className="mt-2 w-full rounded-2xl border-2 border-line bg-cloud px-5 py-4 font-display text-xl font-black text-ink placeholder:text-ink-soft/50 focus:border-sky-brand focus:bg-white focus:outline-none" />

        <p id="avatar-label" className="eyebrow mt-6 text-ink-soft">Choose your hero · Chọn nhân vật</p>
        <div role="radiogroup" aria-labelledby="avatar-label" className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {AVATAR_PRESETS.map(preset => {
            const isSelected = selectedAvatarId === preset.id;
            return (
              <button key={preset.id} type="button" role="radio" aria-checked={isSelected} onClick={() => setSelectedAvatarId(preset.id)}
                className={`card-3d flex flex-col items-center gap-1 px-2 py-3 cursor-pointer ${isSelected ? '!border-sky-brand !bg-sky-50' : ''}`}>
                <span aria-hidden="true" className="text-4xl">{preset.icon}</span>
                <span className={`max-w-full truncate text-xs font-black ${isSelected ? 'text-sky-brand-dark' : 'text-ink-soft'}`}>{preset.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-8">
          <Button type="submit" variant="success" size="xl" disabled={!name.trim()} className="w-full uppercase">
            Let&apos;s go! · Bắt đầu nào!
          </Button>
        </div>
      </form>
    </div>
  );
};
