import { useEffect } from 'react';
import { useGameProgressStore } from '../store/useGameProgressStore';
import { renderHowToPlayModal } from './renderHowToPlayModal';
import { useGameStateStore } from '../store/gameStore';

export function useHowToPlayEntry() {
  const { hasPlayedEver, hasPlayedSession, hasHydrated, resetSession } = useGameProgressStore();
  const { resetGame } = useGameStateStore.getState();

  useEffect(() => {
    const cameFromRules = sessionStorage.getItem('cameFromRules') === 'true';
    if (!cameFromRules) resetSession();
    resetGame();
    sessionStorage.removeItem('cameFromRules');
  }, [resetGame, resetSession]);

  useEffect(() => {
    if (hasHydrated && !hasPlayedSession) {
      renderHowToPlayModal();
    }
  }, [hasHydrated, hasPlayedEver, hasPlayedSession]);
}
