import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeScreen } from '@/features/home/HomeScreen';
import { UploadCheckScreen } from '@/features/checks/UploadCheckScreen';
import { PrizesScreen } from '@/features/prizes/PrizesScreen';
import { HistoryScreen } from '@/features/history/HistoryScreen';
import { RulesScreen } from '@/features/rules/RulesScreen';
import { FaqScreen } from '@/features/faq/FaqScreen';
import { TournamentScreen } from '@/features/tournament/TournamentScreen';
import { ClubScreen } from '@/features/club/ClubScreen';
import { ClubOnboardingScreen } from '@/features/club/ClubOnboardingScreen';
import { MemoGameScreen } from '@/features/memo-game/MemoGameScreen';
import { MemoGameLevelsScreen } from '@/features/memo-game/MemoGameLevelsScreen';
import { ProfileScreen } from '@/features/profile/ProfileScreen';
import { MemoGameRulesScreen } from '@/features/memo-game/MemoGameRulesScreen';
import { useTelegramBackButton } from '@/hooks/useTelegramBackButton';

function TelegramBackButtonGuard() {
  useTelegramBackButton();
  return null;
}

export function AppRouter() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
  return (
    <BrowserRouter basename={basename}>
      <TelegramBackButtonGuard />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/prizes" element={<PrizesScreen />} />
        <Route path="/tournament" element={<TournamentScreen />} />
        <Route path="/upload" element={<UploadCheckScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/rules" element={<RulesScreen />} />
        <Route path="/faq" element={<FaqScreen />} />
        <Route path="/club/onboarding" element={<ClubOnboardingScreen />} />
        <Route path="/club" element={<ClubScreen />} />
        <Route path="/memo/levels" element={<Navigate to="/game/memo/levels" replace />} />
        <Route path="/game" element={<Navigate to="/game/memo" replace />} />
        <Route path="/game/memo/levels" element={<MemoGameLevelsScreen />} />
        <Route path="/game/memo" element={<MemoGameScreen />}>
          <Route path="rules" element={<MemoGameRulesScreen />} />
        </Route>
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
