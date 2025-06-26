import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SplashScreen } from './features/splash/SplashScreen';

const HomeScreen = lazy(() =>
  import('@/features/home/HomeScreen').then((m) => ({ default: m.HomeScreen })),
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
const GameRulesScreen = lazy(() =>
  import('@/features/game/GameRulesScreen').then((m) => ({ default: m.GameRulesScreen })),
);
const GameScreen = lazy(() =>
  import('@/features/game/GameScreen').then((m) => ({ default: m.GameScreen })),
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
          <Route path="/upload" element={<UploadCheckScreen />} />
          <Route path="/prizes" element={<PrizesScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/rules" element={<RulesScreen />} />
          <Route path="/faq" element={<FaqScreen />} />
          <Route path="/tournament" element={<TournamentScreen />} />
          <Route path="/game/rules" element={<GameRulesScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
        {/* <RouterView /> */}
      </Suspense>
    </BrowserRouter>
  );
}
