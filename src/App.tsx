import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Navbar, SideNav, BottomTabs } from './components/common/Navbar';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AdventureMapScreen } from './screens/AdventureMapScreen';
import { UnitScreen } from './screens/UnitScreen';
import { LearnScreen } from './screens/LearnScreen';
import { GameSessionScreen } from './screens/GameSessionScreen';
import { BossBattleScreen } from './screens/BossBattleScreen';
import { SmartReviewScreen } from './screens/SmartReviewScreen';
import { AchievementsScreen } from './screens/AchievementsScreen';
import { StoreScreen } from './screens/StoreScreen';
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
      case 'store':
        return <StoreScreen />;
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

  // Lessons and boss fights are full-screen, like a game level; they have their own Exit buttons.
  const showNavbar = currentScreen !== 'welcome' && currentScreen !== 'boss' && currentScreen !== 'session';

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col font-body selection:bg-sky-200">
      {showNavbar && <SideNav />}
      <div className={`flex min-h-screen flex-1 flex-col ${showNavbar ? 'pb-20 lg:pb-0 lg:pl-64' : ''}`}>
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
          <footer className="py-6 text-center text-xs font-bold text-ink-soft/70">
            English Adventure · Tiếng Anh A1 cho học sinh Việt Nam
          </footer>
        )}
      </div>
      {showNavbar && <BottomTabs />}
    </div>
  );
};

const AvatarVisualLab = import.meta.env.DEV ? React.lazy(() => import('./dev/AvatarVisualLab')) : null;

const StoreVisualLab = import.meta.env.DEV ? React.lazy(() => import('./dev/StoreVisualLab')) : null;

export default function App() {
  if (import.meta.env.DEV && StoreVisualLab && new URLSearchParams(window.location.search).has('storeLab')) {
    return <React.Suspense fallback={<p role="status">Loading store lab…</p>}><StoreVisualLab /></React.Suspense>;
  }
  if (import.meta.env.DEV && AvatarVisualLab && new URLSearchParams(window.location.search).has('avatarLab')) {
    return <React.Suspense fallback={<p role="status">Loading avatar lab…</p>}><AvatarVisualLab /></React.Suspense>;
  }
  return (
    <GameProvider>
      <MainAppContent />
    </GameProvider>
  );
}
