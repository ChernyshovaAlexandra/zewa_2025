import { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';

const HomeScreen = lazy(() => import('@/features/home/HomeScreen'));
const UploadCheckScreen = lazy(() => import('@/features/checks/UploadCheckScreen'));
const PrizesScreen = lazy(() => import('@/features/prizes/PrizesScreen'));
const HistoryScreen = lazy(() => import('@/features/history/HistoryScreen'));
const RulesScreen = lazy(() => import('@/features/rules/RulesScreen'));
const FaqScreen = lazy(() => import('@/features/faq/FaqScreen'));
const TournamentScreen = lazy(() => import('@/features/tournament/TournamentScreen'));
const GameRulesScreen = lazy(() => import('@/features/game/GameRulesScreen'));
// const GamePlayScreen = lazy(() => import('@/features/game/GamePlayScreen'));
const GameScreen = lazy(() => import('@/features/game/GameScreen'));

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
]);
