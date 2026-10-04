import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../../services/audio';
import { useGame } from '../../context/GameContext';

interface PronounceButtonProps {
  text: string;
  disabled?: boolean;
  label?: string;
  variant?: 'compact' | 'full';
  className?: string;
}

export const PronounceButton: React.FC<PronounceButtonProps> = ({
  text,
  disabled = false,
  label = 'Listen',
  variant = 'compact',
  className = '',
}) => {
  const { state } = useGame();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || !state.settings.speechEnabled) return;

    setIsPlaying(true);
    audioService.speak(text, {
      rate: state.settings.speechRate,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  if (disabled || !state.settings.speechEnabled) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleSpeak}
        title={`Listen to: "${text}"`}
        aria-label={`Listen to ${text}`}
        className={`inline-flex items-center justify-center p-2 rounded-xl bg-amber-100 text-amber-800 hover:bg-amber-200 active:scale-95 transition-all shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
          isPlaying ? 'ring-2 ring-amber-400 bg-amber-200' : ''
        } ${className}`}
      >
        <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse text-amber-900' : ''}`} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Listen to: "${text}"`}
      aria-label={`Listen to ${text}`}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 text-amber-900 hover:bg-amber-200 active:translate-y-0.5 border border-amber-200 shadow-xs font-bold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer ${
        isPlaying ? 'ring-2 ring-amber-400 bg-amber-200' : ''
      } ${className}`}
    >
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse text-amber-700' : ''}`} />
      <span>{isPlaying ? 'Listening...' : label}</span>
    </button>
  );
};
