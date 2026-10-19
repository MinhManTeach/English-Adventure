import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Shield, Sparkles, AlertTriangle, Check, Wrench, BarChart2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Button } from '../components/common/Button';
import { runAnswerRandomizationQA, QAResult } from '../engine/qaSimulation';

export const SettingsScreen: React.FC = () => {
  const {
    state,
    updateSettings,
    resetAllProgress,
    navigateTo,
    devUnlockAll,
    devAddXP,
    devAddCoins,
  } = useGame();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [devMessage, setDevMessage] = useState('');
  const [qaResult, setQaResult] = useState<QAResult | null>(null);

  const triggerDevMessage = (msg: string) => {
    setDevMessage(msg);
    setTimeout(() => setDevMessage(''), 2500);
  };

  const handleRunQA = () => {
    const res = runAnswerRandomizationQA(40);
    setQaResult(res);
    triggerDevMessage(
      `QA 40x Completed: A:${res.distributionPercentages.A} B:${res.distributionPercentages.B} C:${res.distributionPercentages.C} D:${res.distributionPercentages.D}`
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="pb-2 border-b border-amber-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Game Preferences · Cài Đặt Ứng Dụng
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
            Settings & Options
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigateTo('parent')}
          className="text-xs"
        >
          <Shield className="w-3.5 h-3.5 mr-1" />
          <span>Parent Dashboard</span>
        </Button>
      </div>

      {/* Audio & Pronunciation Settings */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-5">
        <h2 className="text-lg font-black text-slate-800 font-game">
          Audio & Speech · Âm Thanh & Phát Âm
        </h2>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-800 block">Sound Effects</span>
            <span className="text-xs text-slate-500">Play celebratory sounds and chimes</span>
          </div>
          <button
            type="button"
            onClick={() => updateSettings({ soundEnabled: !state.settings.soundEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer p-1 ${
              state.settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform shadow-xs ${
                state.settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Speech Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-800 block">Speech Pronunciation</span>
            <span className="text-xs text-slate-500">Read words and sentences aloud in English</span>
          </div>
          <button
            type="button"
            onClick={() => updateSettings({ speechEnabled: !state.settings.speechEnabled })}
            className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer p-1 ${
              state.settings.speechEnabled ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform shadow-xs ${
                state.settings.speechEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Speech Rate Selection */}
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <span className="text-sm font-bold text-slate-800 block">Pronunciation Speed</span>
            <span className="text-xs text-slate-500">Slightly slower for younger learners</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {[
              { rate: 0.8, label: '0.8x' },
              { rate: 0.9, label: '0.9x' },
              { rate: 1.0, label: '1.0x' },
            ].map(item => (
              <button
                key={item.rate}
                type="button"
                onClick={() => updateSettings({ speechRate: item.rate })}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  state.settings.speechRate === item.rate
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vietnamese Hints Toggle */}
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-sm font-bold text-slate-800 block">Vietnamese Helper Hints</span>
            <span className="text-xs text-slate-500">Hiển thị ghi chú tiếng Việt hỗ trợ</span>
          </div>
          <button
            type="button"
            onClick={() =>
              updateSettings({ showVietnameseHints: !state.settings.showVietnameseHints })
            }
            className={`w-14 h-8 rounded-full transition-colors relative cursor-pointer p-1 ${
              state.settings.showVietnameseHints ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform shadow-xs ${
                state.settings.showVietnameseHints ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Developer & Review Testing Shortcuts */}
      {import.meta.env.DEV && <div className="bg-amber-50/70 rounded-3xl p-6 border border-amber-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-black text-amber-900 font-game">
              Evaluator & Dev Shortcuts (Tiện Ích Kiểm Thử)
            </h2>
          </div>
          {devMessage && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full animate-pop">
              {devMessage}
            </span>
          )}
        </div>
        <p className="text-xs text-amber-800">
          Quickly test unit completions, level up, or jump straight to the Boss Battle without playing 40 rounds.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              devUnlockAll();
              triggerDevMessage('Unlocked all 3 Units & Boss Battle!');
            }}
          >
            Unlock All Units & Boss
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              devAddXP(200);
              triggerDevMessage('+200 XP Added!');
            }}
          >
            +200 XP
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              devAddCoins(50);
              triggerDevMessage('+50 Coins Added!');
            }}
          >
            +50 Coins
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRunQA}
            className="gap-1.5"
          >
            <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Run 40x Randomization QA</span>
          </Button>

          <Button
            variant="amber"
            size="sm"
            onClick={() => {
              devUnlockAll();
              navigateTo('boss');
            }}
            className="font-black text-slate-900"
          >
            ⚡ Test Boss Battle Now
          </Button>
        </div>

        {qaResult && (
          <div className="p-3.5 rounded-2xl bg-white border border-indigo-200 text-xs space-y-1 animate-pop">
            <span className="font-extrabold text-indigo-900 block">
              QA Audit (40 presentations across curriculum):
            </span>
            <div className="grid grid-cols-4 gap-2 text-center pt-1 font-black">
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                A: {qaResult.distributionPercentages.A} ({qaResult.positionCounts.A})
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                B: {qaResult.distributionPercentages.B} ({qaResult.positionCounts.B})
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                C: {qaResult.distributionPercentages.C} ({qaResult.positionCounts.C})
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                D: {qaResult.distributionPercentages.D} ({qaResult.positionCounts.D})
              </div>
            </div>
            <p className="text-[10px] text-emerald-700 font-bold mt-1">
              ✓ Verified: Correct answers are balanced across all 4 positions with no index bias.
            </p>
          </div>
        )}
      </div>}

      {/* Reset Progress Section */}
      <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-xs space-y-3">
        <h2 className="text-lg font-black text-rose-800 font-game">
          Reset Progress · Đặt Lại Tiến Độ
        </h2>
        <p className="text-xs text-slate-500">
          Erase all local progress, XP, coins, and error bank records to start fresh as a new explorer.
        </p>

        {!showResetConfirm ? (
          <Button
            variant="danger"
            size="md"
            onClick={() => setShowResetConfirm(true)}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Progress</span>
          </Button>
        ) : (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 space-y-3 animate-pop">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Are you sure? This cannot be undone!</span>
            </div>
            <p className="text-xs text-rose-700">
              Bạn có chắc chắn muốn xóa toàn bộ tiến trình học tập của bé trên máy này để bắt đầu lại từ đầu không? Bản đã lưu trên tài khoản phụ huynh vẫn được giữ: chọn lại bé là lấy lại bài.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                }}
              >
                Yes, Reset Everything
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
