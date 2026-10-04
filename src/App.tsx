import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar } from './components/common/Navbar';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AdventureMapScreen } from './screens/AdventureMapScreen';
import { UnitScreen } from './screens/UnitScreen';
import { LearnScreen } from './screens/LearnScreen';
import { GameSessionScreen } from './screens/GameSessionScreen';
import { BossBattleScreen } from './screens/BossBattleScreen';
import { SmartReviewScreen } from './screens/SmartReviewScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { AvatarScreen } from './screens/AvatarScreen';
import { MyProgressScreen } from './screens/MyProgressScreen';
import { ParentDashboardScreen } from './screens/ParentDashboardScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const MainAppContent: React.FC = () => {
  const { currentScreen, writerStatus, storageStatus, saveStatus } = useGame();

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <AdventureMapScreen />;
      case 'unit':
        return <UnitScreen />;
      case 'learn':
        return <LearnScreen />;
      case 'session':
        return <GameSessionScreen />;
      case 'boss':
        return <BossBattleScreen />;
      case 'review':
        return <SmartReviewScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'avatar':
        return <AvatarScreen />;
      case 'progress':
        return <MyProgressScreen />;
      case 'parent':
        return <ParentDashboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showNavbar = currentScreen !== 'welcome' && currentScreen !== 'boss';

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {showNavbar && <Navbar />}
      {(writerStatus !== 'writable' || storageStatus !== 'ready' || saveStatus === 'storage-failed') && (
        <div role="status" className="bg-amber-100 px-4 py-3 text-sm text-amber-950">
          {storageStatus === 'invalid-save' ? 'Your saved data could not be read. The original save is preserved; changes are disabled.'
            : storageStatus !== 'ready' || saveStatus === 'storage-failed' ? 'Progress could not be saved. Changes are not applied; check browser storage and retry.'
            : writerStatus === 'starting' ? 'Preparing safe saving…'
            : writerStatus === 'unsupported' || writerStatus === 'unavailable' ? 'Safe saving is unavailable in this browser. This tab is read-only.'
            : 'This tab is read-only while another tab is active. Close the active tab to continue here.'}
        </div>
      )}

      <main className="flex-1 w-full">{renderScreen()}</main>

      {showNavbar && (
        <footer className="border-t border-amber-100/80 bg-white/60 py-6 mt-12 text-center text-xs text-slate-500">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-medium">
              English Adventure · Hành Trình Chinh Phục Tiếng Anh (CEFR A1)
            </p>
            <p className="text-[11px] text-slate-400">
              Interactive Educational Game Engine · Designed for Vietnamese Learners
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainAppContent />
    </GameProvider>
  );
}
