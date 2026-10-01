import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { AVATAR_PRESETS } from '../data/avatarsData';
import { Button } from '../components/common/Button';

export const WelcomeScreen: React.FC = () => {
  const { createProfile } = useGame();
  const [step, setStep] = useState<'welcome' | 'profile'>('welcome');
  const [name, setName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('leo');

  const handleStartAdventure = () => {
    setStep('profile');
  };

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(name, selectedAvatarId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100/60 via-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        {step === 'welcome' ? (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-amber-300 text-center space-y-8 animate-pop">
            {/* Visual Icon */}
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 flex items-center justify-center text-5xl shadow-md animate-float">
              🌟
            </div>

            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                CEFR A1 Learning Game
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-game leading-tight">
                WELCOME TO <br />
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  ENGLISH ADVENTURE
                </span>
              </h1>
              <p className="text-sm font-semibold text-amber-800">
                Hành Trình Chinh Phục Tiếng Anh
              </p>
            </div>

            {/* Inspiring motto */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm font-bold text-slate-700 space-y-1">
              <p>✨ Learn English.</p>
              <p>🎮 Play Fun Games.</p>
              <p>🗺️ Explore The Adventure Map.</p>
              <p>👑 Become A Champion!</p>
            </div>

            <Button
              variant="amber"
              size="xl"
              onClick={handleStartAdventure}
              className="w-full gap-2 text-slate-900 font-black shadow-amber-600"
            >
              <span>START ADVENTURE</span>
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleCreateProfile}
            className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-amber-300 space-y-6 animate-pop"
          >
            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-amber-700">
                Hero Setup
              </span>
              <h2 className="text-3xl font-black text-slate-900 font-game">
                Create Your Hero Profile
              </h2>
              <p className="text-xs text-slate-500">
                Choose your hero avatar and nickname to start exploring!
              </p>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="hero-name" className="text-xs font-extrabold text-slate-700 uppercase">
                What is your name?
              </label>
              <input
                id="hero-name"
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex, Linh, Ben..."
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:outline-none text-xl font-bold bg-amber-50/30 shadow-inner"
                autoFocus
              />
            </div>

            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-700 uppercase block">
                Choose Your Avatar:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {AVATAR_PRESETS.map(preset => {
                  const isSelected = selectedAvatarId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedAvatarId(preset.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300 scale-105 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-amber-200'
                      }`}
                    >
                      <span className="text-3xl">{preset.icon}</span>
                      <span className="text-[10px] font-bold text-slate-600 truncate max-w-full">
                        {preset.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="amber"
                size="lg"
                className="w-full font-black text-slate-900"
              >
                Let&apos;s Go! Bắt Đầu Nào!
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
