import { createHashRouter } from 'react-router-dom';
import {
  HomeScreen,
  UploadCheckScreen,
  PrizesScreen,
  HistoryScreen,
  RulesScreen,
  FaqScreen,
  TournamentScreen,
  GameRulesScreen,
  // GamePlayScreen,
  GameScreen,
} from './features';

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
