import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

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

export const router = createHashRouter([
  { path: '/', element: <HomeScreen /> },
  { path: '/upload', element: <UploadCheckScreen /> },
  { path: '/prizes', element: <PrizesScreen /> },
  { path: '/history', element: <HistoryScreen /> },
  { path: '/rules', element: <RulesScreen /> },
  { path: '/faq', element: <FaqScreen /> },
  { path: '/tournament', element: <TournamentScreen /> },
  { path: '/game/rules', element: <GameRulesScreen /> },
  { path: '/game', element: <GameScreen /> },
  { path: '/profile', element: <ProfileScreen /> },
]);
