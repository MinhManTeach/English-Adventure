import React, { useState } from 'react';
import { Sparkles, Check, Coins, User } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { AVATAR_PRESETS, AvatarPreset } from '../data/avatarsData';
import { Button } from '../components/common/Button';
import { soundService } from '../services/sound';

const TITLES = [
  'Brave Explorer',
  'Grammar Sage',
  'Cosmic Champion',
  'Dragon Knight',
  'Word Master',
  'Adventure Captain',
];

export const AvatarScreen: React.FC = () => {
  const { state, updateAvatar } = useGame();
  const [selectedAvatarId, setSelectedAvatarId] = useState(state.profile.avatarId);
  const [selectedTitle, setSelectedTitle] = useState(state.profile.title || 'Brave Explorer');
  const [isSaved, setIsSaved] = useState(false);

  const activePreset =
    AVATAR_PRESETS.find(a => a.id === selectedAvatarId) || AVATAR_PRESETS[0];

  const handleSave = () => {
    updateAvatar(selectedAvatarId, selectedTitle);
    soundService.playCorrect();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="pb-2 border-b border-amber-100">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
          Customization Hub · Thay Đổi Nhân Vật
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
          My Hero Avatar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Active Hero Preview Card */}
        <div className="md:col-span-1 bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm text-center space-y-4">
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-7xl shadow-md animate-float">
            {activePreset.icon}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 font-game">
              {state.profile.name || 'Hero'}
            </h2>
            <span className="inline-block text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              {selectedTitle}
            </span>
          </div>

          <p className="text-xs text-slate-500 italic">
            &ldquo;{activePreset.tagline}&rdquo;
          </p>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-black text-amber-900">
              {state.coins} Coins
            </span>
          </div>

          <Button
            variant="amber"
            size="md"
            onClick={handleSave}
            className="w-full font-black text-slate-900"
          >
            {isSaved ? 'Saved! Đã Lưu' : 'Save Changes'}
          </Button>
        </div>

        {/* Right: Avatar Picker & Titles */}
        <div className="md:col-span-2 space-y-6">
          {/* Avatar Choices */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-3">
            <h3 className="text-lg font-black text-slate-800 font-game">
              Choose Avatar Character
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATAR_PRESETS.map(preset => {
                const isSelected = selectedAvatarId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedAvatarId(preset.id);
                      soundService.playCoin();
                    }}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-amber-200'
                    }`}
                  >
                    <span className="text-4xl">{preset.icon}</span>
                    <span className="text-xs font-bold text-slate-800">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title Badges */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-3">
            <h3 className="text-lg font-black text-slate-800 font-game">
              Equip Hero Title
            </h3>

            <div className="flex flex-wrap gap-2">
              {TITLES.map(title => {
                const isSelected = selectedTitle === title;
                return (
                  <button
                    key={title}
                    type="button"
                    onClick={() => {
                      setSelectedTitle(title);
                      soundService.playCoin();
                    }}
                    className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
