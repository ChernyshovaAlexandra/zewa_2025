import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SplashScreen } from './features/splash/SplashScreen';

const HomeScreen = lazy(
  () => import('@/features/home/HomeScreen').then((m) => ({ default: m.HomeScreen })),
  // import('@/features/home/HomeScreenClosed').then((m) => ({ default: m.HomeScreenClosed })),
);
const UploadCheckScreen = lazy(() =>
  import('@/features/checks/UploadCheckScreen').then((m) => ({ default: m.UploadCheckScreen })),
);
const PrizesScreen = lazy(() =>
  import('@/features/prizes/PrizesScreen').then((m) => ({ default: m.PrizesScreen })),
);
const HistoryScreen = lazy(() =>
  import('@/features/history/HistoryScreen').then((m) => ({ default: m.HistoryScreen })),
);
const RulesScreen = lazy(() =>
  import('@/features/rules/RulesScreen').then((m) => ({ default: m.RulesScreen })),
);
const FaqScreen = lazy(() =>
  import('@/features/faq/FaqScreen').then((m) => ({ default: m.FaqScreen })),
);
const TournamentScreen = lazy(() =>
  import('@/features/tournament/TournamentScreen').then((m) => ({ default: m.TournamentScreen })),
);
const ClubScreen = lazy(() =>
  import('@/features/club/ClubScreen').then((m) => ({ default: m.ClubScreen })),
);

const BackToSchoolGameScreen = lazy(() =>
  import('@/features/back-to-school-game/GameScreen').then((m) => ({
    default: m.GameScreen,
  })),
);
const BackToSchoolGameRulesScreen = lazy(() =>
  import('@/features/back-to-school-game/GameRulesScreen').then((m) => ({
    default: m.GameRulesScreen,
  })),
);

const MemoGameScreen = lazy(() =>
  import('@/features/memo-game/MemoGameScreen').then((m) => ({ default: m.MemoGameScreen })),
);
const MemoGameLevelsScreen = lazy(() =>
  import('@/features/memo-game/MemoGameLevelsScreen').then((m) => ({
    default: m.MemoGameLevelsScreen,
  })),
);

const ProfileScreen = lazy(() =>
  import('@/features/profile/ProfileScreen').then((m) => ({ default: m.ProfileScreen })),
);

export function AppRouter() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<SplashScreen />}>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/prizes" element={<PrizesScreen />} />
          <Route path="/tournament" element={<TournamentScreen />} />
          <Route path="/upload" element={<UploadCheckScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/rules" element={<RulesScreen />} />
          <Route path="/faq" element={<FaqScreen />} />
          <Route path="/club" element={<ClubScreen />} />

          <Route path="/back-to-school-game" element={<BackToSchoolGameScreen />} />
          <Route path="/back-to-school-game/rules" element={<BackToSchoolGameRulesScreen />} />

          <Route path="/memo/levels" element={<Navigate to="/game/memo/levels" replace />} />
          <Route path="/game" element={<Navigate to="/game/memo" replace />} />
          <Route path="/game/memo/levels" element={<MemoGameLevelsScreen />} />
          <Route path="/game/memo" element={<MemoGameScreen />} />

          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
