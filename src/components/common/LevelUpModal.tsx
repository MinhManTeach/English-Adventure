import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { soundService } from '../../services/sound';

interface LevelUpModalProps {
  newLevel: number;
  levelTitle: string;
  onContinue: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  newLevel,
  levelTitle,
  onContinue,
}) => {
  React.useEffect(() => {
    soundService.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // Safe fallback
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-pop">
      <div className="max-w-md w-full bg-gradient-to-b from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-8 text-center text-white shadow-2xl border-4 border-amber-200 space-y-6">
        {/* Animated Trophy badge */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-white/20 border-2 border-white/50 flex items-center justify-center text-6xl shadow-lg animate-float">
          👑
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest bg-white/30 px-3 py-1 rounded-full text-white">
            Level Milestone Achieved!
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-game text-white drop-shadow-md">
            LEVEL UP!
          </h2>
          <div className="py-2">
            <span className="text-2xl sm:text-3xl font-black font-game bg-white text-slate-900 px-6 py-2 rounded-2xl shadow-md inline-block">
              Level {newLevel}
            </span>
          </div>
          <p className="text-base font-bold text-amber-100">
            {levelTitle}
          </p>
          <p className="text-xs text-amber-100/90 max-w-xs mx-auto">
            You are growing stronger every day! Keep exploring the world of English!
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={onContinue}
            className="w-full text-slate-900 font-black shadow-lg hover:bg-amber-50 text-xl py-4"
          >
            <span>Awesome! Tiếp Tục</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
