import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_UNITS } from '../data/unitsMeta';
import { LEARN_CARDS_DATA, LearnCard } from '../data/learnContent';
import { PronounceButton } from '../components/common/PronounceButton';
import { Button } from '../components/common/Button';
import { WorldBackground } from '../components/common/WorldBackground';

export const LearnScreen: React.FC = () => {
  const { activeUnitId, navigateTo, state } = useGame();
  const [selectedUnitId, setSelectedUnitId] = useState<number>(activeUnitId || 1);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const currentUnit = ALL_UNITS.find(u => u.id === selectedUnitId) || ALL_UNITS[0];
  const unitCards: LearnCard[] = LEARN_CARDS_DATA[selectedUnitId] || LEARN_CARDS_DATA[1];
  const currentCard = unitCards[activeCardIndex] || unitCards[0];

  const handleUnitChange = (unitId: number) => {
    setSelectedUnitId(unitId);
    setActiveCardIndex(0);
  };

  const handleNextCard = () => {
    if (activeCardIndex + 1 < unitCards.length) {
      setActiveCardIndex(prev => prev + 1);
    } else {
      // Completed all cards in this unit's learn stage
      navigateTo('session', { unitId: selectedUnitId, stageId: 'practice' });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <WorldBackground unitId={selectedUnitId} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Unit Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-amber-100">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
            Step 1: Learning Academy · Góc Kiến Thức
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-game">
            Learn A1 English Concepts
          </h1>
        </div>

        {/* Unit tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-amber-100/60 rounded-2xl">
          {ALL_UNITS.map(u => {
            const isSelected = selectedUnitId === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => handleUnitChange(u.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Unit {u.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Unit Header Badge */}
      <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentUnit.icon}</span>
          <div>
            <h2 className="text-lg font-black text-slate-800 font-game">
              Unit {currentUnit.number}: {currentUnit.title}
            </h2>
            <p className="text-xs text-slate-500">{currentUnit.titleVi}</p>
          </div>
        </div>

        {/* Card Progress counter */}
        <div className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
          Card {activeCardIndex + 1} of {unitCards.length}
        </div>
      </div>

      {/* Main Learning Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200 space-y-6">
        {/* Card Title */}
        <div className="space-y-1 pb-4 border-b border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 font-game">
            {currentCard.title}
          </h3>
          {state.settings.showVietnameseHints && (
            <p className="text-sm font-semibold text-amber-700">
              {currentCard.titleVi}
            </p>
          )}
        </div>

        {/* Rule box */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Grammar & Vocabulary Rule</span>
          </div>
          <p className="text-base font-bold text-slate-800 leading-relaxed">
            {currentCard.ruleEn}
          </p>
          {state.settings.showVietnameseHints && (
            <p className="text-xs text-slate-600 italic">
              {currentCard.ruleVi}
            </p>
          )}
        </div>

        {/* Interactive Example Sentences */}
        <div className="space-y-3">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
            Listen & Learn Examples
          </span>

          <div className="grid grid-cols-1 gap-3">
            {currentCard.examples.map((eg, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="space-y-0.5">
                  <p className="text-lg font-bold text-slate-800 font-game">
                    {eg.en}
                  </p>
                  {state.settings.showVietnameseHints && (
                    <p className="text-xs text-slate-500 font-medium">{eg.vi}</p>
                  )}
                </div>

                <PronounceButton text={eg.en} label="Listen" />
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Box if available */}
        {currentCard.tip && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <span className="font-bold text-indigo-900 block">Helpful Tip</span>
              <p className="font-semibold text-indigo-800">{currentCard.tip.en}</p>
              {state.settings.showVietnameseHints && (
                <p className="text-indigo-600 italic">{currentCard.tip.vi}</p>
              )}
            </div>
          </div>
        )}

        {/* Card navigation bottom bar */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            disabled={activeCardIndex === 0}
            onClick={() => setActiveCardIndex(prev => Math.max(0, prev - 1))}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous Concept
          </button>

          <Button
            variant="amber"
            size="md"
            onClick={handleNextCard}
            className="gap-2 font-black"
          >
            <span>{activeCardIndex + 1 < unitCards.length ? 'Next Concept' : 'Start Practice!'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
};
