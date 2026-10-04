import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Zap,
  Sparkles,
  Trophy,
  ArrowRight,
  RotateCcw,
  Flame,
  ArrowLeft,
  ShieldAlert,
  HelpCircle,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getBossQuestions } from '../data/curriculum';
import { Question } from '../types';
import { Button } from '../components/common/Button';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { LevelUpModal } from '../components/common/LevelUpModal';
import { GrammarDragon } from '../components/boss/GrammarDragon';
import { BattleHero } from '../components/boss/BattleHero';
import { BossQuestionPanel } from '../components/boss/BossQuestionPanel';
import { soundService } from '../services/sound';
import { getBossPhase, createBossBattle, transitionBossBattle } from '../engine/bossLogic';

export const BossBattleScreen: React.FC = () => {
  const {
    state,
    navigateTo,
    recordBossVictory,
    recordQuestionResult,
    restoreHearts,
  } = useGame();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [battle, setBattle] = useState(() => createBossBattle());
  const battleRef = useRef(battle);
  const battleIdRef = useRef('');
  const { currentIndex, bossHp, comboCount, successfulHits, status: battleState } = battle;

  const [heroCasting, setHeroCasting] = useState(false);
  const [heroHurt, setHeroHurt] = useState(false);
  const [dragonHit, setDragonHit] = useState(false);
  const [dragonAttacking, setDragonAttacking] = useState(false);
  const [projectile, setProjectile] = useState<'hero' | 'dragon' | null>(null);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; type: 'hero' | 'dragon' } | null>(null);
  const [isActionLocked, setIsActionLocked] = useState(false);
  const actionLockedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [victoryRewards, setVictoryRewards] = useState<{
    xp: number; coins: number; isFirstVictory: boolean; newLevel: number;
  } | null>(null);
  const hasClaimedVictoryRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const initializeFreshBattle = useCallback((status: 'intro' | 'fighting' = 'intro') => {
    clearTimers();
    const fresh = createBossBattle(status);
    battleRef.current = fresh;
    setBattle(fresh);
    battleIdRef.current = crypto.randomUUID();
    restoreHearts();
    setQuestions(getBossQuestions(10));
    actionLockedRef.current = false;
    setIsActionLocked(false);
    setHeroCasting(false);
    setHeroHurt(false);
    setDragonHit(false);
    setDragonAttacking(false);
    setProjectile(null);
    setFloatingDamage(null);
    setShowLevelUp(false);
    setVictoryRewards(null);
    hasClaimedVictoryRef.current = false;
  }, [clearTimers, restoreHearts]);

  useEffect(() => {
    initializeFreshBattle();
    return clearTimers;
  }, [initializeFreshBattle, clearTimers]);

  const currentQuestion = questions[currentIndex];
  const phase = getBossPhase(bossHp);
  const updateBattle = (next: typeof battle) => {
    battleRef.current = next;
    setBattle(next);
  };
  const schedule = (callback: () => void, delay: number) => {
    timersRef.current.push(setTimeout(callback, delay));
  };

  const handleStartBattle = () => {
    updateBattle(transitionBossBattle(battleRef.current, { type: 'start' }));
    soundService.playBossHit();
  };

  // All gameplay changes happen synchronously here. Timer callbacks only animate.
  const handleAnswerResolved = (isCorrect: boolean, answer: string) => {
    if (actionLockedRef.current || !currentQuestion) return false;
    const previous = battleRef.current;
    const next = transitionBossBattle(previous, { type: 'answer', questionIndex: currentIndex, correct: isCorrect });
    if (next === previous) return false;
    updateBattle(next);
    if (next.resolution === 'retry') {
      soundService.playWrong();
      return true;
    }
    actionLockedRef.current = true;
    setIsActionLocked(true);
    recordQuestionResult(currentQuestion, isCorrect, !isCorrect, isCorrect ? undefined : answer);
    setHeroCasting(isCorrect);
    setDragonAttacking(!isCorrect);
    setProjectile(isCorrect ? 'hero' : 'dragon');
    if (isCorrect) soundService.playCorrect();
    else soundService.playWrong();
    schedule(() => {
      setHeroCasting(false);
      setDragonAttacking(false);
      setProjectile(null);
      setDragonHit(isCorrect);
      setHeroHurt(!isCorrect);
      setFloatingDamage({ text: isCorrect ? '-10 HP' : '-1 ❤️', type: isCorrect ? 'dragon' : 'hero' });
      if (isCorrect) soundService.playBossHit();
    }, 400);
    schedule(() => {
      setDragonHit(false);
      setHeroHurt(false);
      setFloatingDamage(null);
      actionLockedRef.current = false;
      setIsActionLocked(false);
    }, 950);
    return true;
  };

  const handleTryAgain = () => {
    if (actionLockedRef.current) return;
    updateBattle(transitionBossBattle(battleRef.current, { type: 'retry', questionIndex: currentIndex }));
  };

  const triggerBossVictory = () => {
    if (hasClaimedVictoryRef.current || battleRef.current.bossHp !== 0) return;
    hasClaimedVictoryRef.current = true;
    const result = recordBossVictory(battleIdRef.current);
    setVictoryRewards(result);
    soundService.playVictory();
    if (result.leveledUp) schedule(() => setShowLevelUp(true), 500);
    try {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    } catch { /* Celebration is optional. */ }
  };

  const handleNextQuestion = () => {
    if (actionLockedRef.current) return;
    const previous = battleRef.current;
    const next = transitionBossBattle(previous, { type: 'next', questionIndex: currentIndex });
    if (next === previous) return;
    updateBattle(next);
    if (next.status === 'victory') triggerBossVictory();
  };

  const handleRetryBattle = () => initializeFreshBattle('fighting');

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 text-white flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-slate-900">
      {/* Level Up Celebration Modal */}
      {showLevelUp && victoryRewards && (
        <LevelUpModal
          newLevel={victoryRewards.newLevel}
          levelTitle="Castle Champion"
          onContinue={() => setShowLevelUp(false)}
        />
      )}

      {/* ============================================================== */}
      {/* BATTLE ENVIRONMENT: MOON, STARS, CASTLE TOWERS, TORCHES (Rule 10) */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Full Moon Glow */}
        <div className="absolute top-4 right-10 w-16 h-16 rounded-full bg-amber-100 shadow-[0_0_45px_rgba(254,240,138,0.4)] opacity-90" />
        {/* Stars */}
        <div className="absolute top-8 left-12 text-amber-200 text-xs animate-pulse">✦</div>
        <div className="absolute top-14 right-40 text-cyan-200 text-xs animate-pulse">✧</div>
        <div className="absolute top-24 left-1/4 text-amber-100 text-xs animate-pulse">✦</div>
        <div className="absolute top-32 right-1/4 text-purple-200 text-xs animate-pulse">✧</div>

        {/* Distant Castle Battlements Silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-20 text-slate-950/80"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,45 L35,45 L35,60 L65,60 L65,45 L115,45 L115,60 L145,60 L145,45 L195,45 L195,120 Z"
            fill="currentColor"
          />
        </svg>

        {/* Ambient Torch Lights */}
        <div className="absolute top-1/3 left-6 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-6 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl" />
      </div>

      {/* ============================================================== */}
      {/* ZONE 1: TOP HUD (~48px) - Header, Hearts, Combo, Phase */}
      {/* ============================================================== */}
      <header className="relative z-10 max-w-4xl mx-auto w-full px-4 py-2 border-b border-indigo-900/60 flex items-center justify-between gap-2 min-h-14">
        <button
          type="button"
          onClick={() => navigateTo('map')}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 font-bold text-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Leave Castle</span>
        </button>

        {/* Center: Stage Step & Combo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block leading-tight">
              ⚔️ GRAMMAR CASTLE
            </span>
            <span className="text-xs font-bold text-slate-300">
              SPELL {Math.min(currentIndex + 1, 10)} / 10
            </span>
            <span className="text-[10px] text-slate-400 block">Successful Hits: {successfulHits}</span>
          </div>

          {comboCount >= 2 && (
            <div className="px-2 py-0.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[11px] shadow-sm animate-bounce flex items-center gap-1">
              <Flame className="w-3 h-3 fill-slate-950" />
              <span>{comboCount >= 3 ? 'SUPER SPELL!' : `COMBO x${comboCount}`}</span>
            </div>
          )}
        </div>

        {/* Phase Pill (Rule 4) */}
        <div className="flex items-center gap-2">
          {phase === 'defeated' ? (
            <span className="px-2 py-0.5 rounded-xl bg-emerald-700 text-white font-black text-[11px]">DEFEATED</span>
          ) : phase === 3 ? (
            <span className="px-2 py-0.5 rounded-xl bg-rose-600 text-white font-black text-[11px] border border-rose-400 animate-pulse">
              🔥 FINAL PHASE!
            </span>
          ) : phase === 2 ? (
            <span className="px-2 py-0.5 rounded-xl bg-amber-500 text-slate-950 font-black text-[11px] border border-amber-300">
              ⚡ PHASE 2
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-xl bg-indigo-900/80 text-indigo-200 font-bold text-[11px] border border-indigo-700">
              PHASE 1
            </span>
          )}
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-4 py-2 flex-1 flex flex-col justify-between">
        {/* ============================================================== */}
        {/* INTRO SCREEN */}
        {/* ============================================================== */}
        {battleState === 'intro' && (
          <div className="max-w-md mx-auto my-auto bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-amber-400/80 text-center space-y-4 shadow-2xl animate-pop">
            <div className="w-24 h-24 mx-auto flex items-center justify-center">
              <GrammarDragon hp={100} phase={1} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                Final Chapter Confrontation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-game text-amber-300">
                Lord Verbose Awaits!
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
                Lord Verbose guards Grammar Castle! Cast 10 accurate spells to claim the champion&apos;s trophy!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto bg-slate-950/70 p-3 rounded-2xl border border-slate-800 text-left text-xs">
              <div>
                <span className="text-slate-400 block font-bold text-[10px]">Boss Health</span>
                <span className="font-black text-violet-300 text-sm">100 HP</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[10px]">Player Lives</span>
                <span className="font-black text-rose-400 text-sm">5 Hearts</span>
              </div>
            </div>

            <Button
              variant="amber"
              size="lg"
              onClick={handleStartBattle}
              className="w-full text-slate-950 font-black shadow-amber-600 gap-2 text-lg py-3"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>ENTER THE ARENA</span>
            </Button>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACTIVE FIGHTING ARENA & QUESTION PANEL */}
        {/* ============================================================== */}
        {battleState === 'fighting' && (
          <div className="w-full flex-1 flex flex-col justify-between gap-3">
            {/* ZONE 2: MIDDLE ARENA (~240px - 280px compact) */}
            <div className="relative bg-gradient-to-b from-indigo-950/50 to-slate-950/70 rounded-3xl p-3 sm:p-5 border border-indigo-900/60 shadow-inner flex flex-col justify-between min-h-[210px] sm:min-h-[250px]">
              {/* Stone Battlements Floor Line */}
              <div className="absolute bottom-2 left-4 right-4 h-2.5 bg-slate-800 rounded-full border-t border-slate-700/80 shadow-md" />

              {/* Characters Grid */}
              <div className="relative flex items-center justify-between gap-2 py-1">
                {/* HERO ON LEFT */}
                <div className="relative z-10 flex flex-col items-center">
                  <BattleHero
                    avatarId={state.profile.avatarId}
                    name={state.profile.name}
                    title={state.profile.title}
                    hearts={battle.playerHearts}
                    maxHearts={5}
                    isCasting={heroCasting}
                    isHurt={heroHurt}
                  />
                  {floatingDamage && floatingDamage.type === 'hero' && (
                    <div className="absolute -top-5 text-rose-400 font-black text-lg animate-bounce drop-shadow-md">
                      {floatingDamage.text}
                    </div>
                  )}
                </div>

                {/* MID-FIELD: PROJECTILE FLIGHT & COMBAT STATUS */}
                <div className="flex-1 flex items-center justify-center relative min-h-[60px]">
                  {projectile === 'hero' && (
                    <div className="absolute left-6 animate-[spin_0.4s_linear_infinite] transition-all duration-300 w-8 h-8 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee] flex items-center justify-center text-lg translate-x-[140px] sm:translate-x-[220px]">
                      ⚡
                    </div>
                  )}

                  {projectile === 'dragon' && (
                    <div className="absolute right-6 animate-pulse transition-all duration-300 w-8 h-8 rounded-full bg-orange-500 shadow-[0_0_20px_#f97316] flex items-center justify-center text-lg -translate-x-[140px] sm:-translate-x-[220px]">
                      🔥
                    </div>
                  )}

                  {heroCasting && (
                    <span className="text-cyan-300 font-black text-xs uppercase tracking-wider drop-shadow-md animate-pulse">
                      {comboCount >= 3 ? '⚡ SUPER SPELL!' : '✨ Magic Attack!'}
                    </span>
                  )}
                  {dragonAttacking && (
                    <span className="text-orange-400 font-black text-xs uppercase tracking-wider drop-shadow-md animate-pulse">
                      🔥 Dragon Strikes!
                    </span>
                  )}
                </div>

                {/* DRAGON BOSS ON RIGHT */}
                <div className="relative z-10 flex flex-col items-center text-right">
                  <div className="space-y-0.5 text-center sm:text-right w-full mb-1">
                    <span className="text-[10px] font-black text-violet-300 uppercase tracking-wider block">
                      Lord Verbose
                    </span>
                    {/* Dragon HP Bar */}
                    <div className="w-28 sm:w-36 bg-slate-950 rounded-full h-3 p-0.5 border border-slate-700 shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-300 shadow-xs ${
                          phase === 3
                            ? 'bg-gradient-to-r from-rose-500 to-amber-500 animate-pulse'
                            : 'bg-gradient-to-r from-violet-500 to-indigo-400'
                        }`}
                        style={{ width: `${bossHp}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                      {bossHp} / 100 HP
                    </span>
                  </div>

                  <GrammarDragon
                    hp={bossHp}
                    phase={phase}
                    isHit={dragonHit}
                    isAttacking={dragonAttacking}
                    isDefeated={bossHp <= 0}
                  />

                  {floatingDamage && floatingDamage.type === 'dragon' && (
                    <div className="absolute top-1 right-2 text-amber-300 font-black text-xl animate-bounce drop-shadow-md">
                      {floatingDamage.text}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ZONE 3: MAGICAL SPELL QUESTION PANEL (HIGH CONTRAST & COMPACT) */}
            {currentQuestion && (
              <BossQuestionPanel
                key={`${battleIdRef.current}:${currentQuestion.id}`}
                question={currentQuestion}
                isActionLocked={isActionLocked}
                comboCount={comboCount}
                wrongAttempts={battle.wrongAttempts}
                resolution={battle.resolution}
                onTryAgain={handleTryAgain}
                onAnswerResolved={handleAnswerResolved}
                onNextQuestion={handleNextQuestion}
              />
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* STATE: VICTORY SEQUENCE (Rule 7) */}
        {/* ============================================================== */}
        {battleState === 'victory' && (
          <div className="max-w-md mx-auto my-auto bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-4 border-amber-400 text-center space-y-4 shadow-2xl animate-pop">
            <div className="w-20 h-20 mx-auto flex items-center justify-center">
              <GrammarDragon hp={0} phase="defeated" isDefeated={true} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
                🏆 VICTORY ACHIEVED!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-game text-amber-300">
                BOSS DEFEATED!
              </h2>
              <p className="text-xs font-bold text-slate-200">
                LORD VERBOSE HAS BEEN DEFEATED!
              </p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                With your English grammar mastery, Grammar Castle is now unlocked!
              </p>
            </div>

            {/* Animated Rewards */}
            <div className="grid grid-cols-2 gap-2.5 py-1">
              <div className="bg-indigo-950/80 p-3 rounded-2xl border border-indigo-700">
                <span className="text-[10px] font-bold text-indigo-300 block">XP Gained</span>
                <span className="text-xl font-black text-amber-300">
                  <AnimatedCounter from={0} to={victoryRewards?.xp ?? 0} prefix="+" suffix=" XP" />
                </span>
              </div>
              <div className="bg-amber-950/80 p-3 rounded-2xl border border-amber-700">
                <span className="text-[10px] font-bold text-amber-300 block">Gold Reward</span>
                <span className="text-xl font-black text-yellow-300">
                  <AnimatedCounter from={0} to={victoryRewards?.coins ?? 0} prefix="+" suffix=" 🪙" />
                </span>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/40 text-xs font-bold text-amber-300 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{victoryRewards?.isFirstVictory ? 'Achievement Unlocked: Grammar Castle Champion!' : 'Grammar Castle Champion!'}</span>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="amber"
                size="md"
                onClick={() => navigateTo('map')}
                className="w-full font-black text-slate-950 shadow-amber-600 gap-1.5"
              >
                <span>CONTINUE ADVENTURE</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={handleRetryBattle}
                className="w-full gap-1.5 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REVIEW BATTLE</span>
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STATE: THE DRAGON SURVIVED (Rule 7 - Boss HP > 0 after Question 10) */}
        {/* ============================================================== */}
        {battleState === 'survived' && (
          <div className="max-w-md mx-auto my-auto bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-indigo-400/80 text-center space-y-4 shadow-2xl animate-pop">
            <div className="w-20 h-20 mx-auto flex items-center justify-center">
              <GrammarDragon hp={bossHp} phase={phase} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-indigo-300">
                10 Spells Completed
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-game text-indigo-300">
                THE DRAGON SURVIVED!
              </h2>
              <p className="text-xs text-slate-300 font-semibold max-w-xs mx-auto">
                Lord Verbose still has <span className="text-violet-300 font-black">{bossHp} HP</span> left. Review your mistakes to defeat him next time!
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-950/70 border border-indigo-800 text-xs text-indigo-200">
              Practice your weak spots in Smart Review to prepare for the rematch!
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="amber"
                size="md"
                onClick={handleRetryBattle}
                className="w-full font-black text-slate-950 gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY BOSS AGAIN</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateTo('review')}
                className="w-full"
              >
                <span>REVIEW MISTAKES</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateTo('map')}
                className="w-full text-slate-400 hover:text-white text-xs"
              >
                <span>RETURN TO MAP</span>
              </Button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STATE: PLAYER DEFEAT (Hearts depleted) */}
        {/* ============================================================== */}
        {battleState === 'defeat' && (
          <div className="max-w-md mx-auto my-auto bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border-2 border-rose-500/80 text-center space-y-4 shadow-2xl animate-pop">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center text-3xl shadow-md">
              💔
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-rose-400">
                Hearts Depleted
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-game text-rose-400">
                SO CLOSE!
              </h2>
              <p className="text-xs font-semibold text-slate-300 max-w-xs mx-auto leading-relaxed">
                The Grammar Dragon is still guarding the castle. Review your weak questions and try again!
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="amber"
                size="md"
                onClick={handleRetryBattle}
                className="w-full font-black text-slate-950 gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY BOSS AGAIN</span>
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigateTo('review')}
                className="w-full"
              >
                <span>REVIEW MISTAKES</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateTo('map')}
                className="w-full text-slate-400 hover:text-white text-xs"
              >
                <span>RETURN TO MAP</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
