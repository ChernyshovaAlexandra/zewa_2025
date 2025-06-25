import { useEffect } from 'react';
import { useGameProgressStore } from '@/features/game/model/useGameProgressStore';
import { renderHowToPlayModal } from './renderHowToPlayModal';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

export function useHowToPlayEntry() {
  const { hasPlayedEver, hasPlayedSession, hasHydrated, resetSession } = useGameProgressStore();
  const { resetGame } = useGameModelStore.getState();

  useEffect(() => {
    const cameFromRules = sessionStorage.getItem('cameFromRules') === 'true';
    if (!cameFromRules) {
      resetSession();
      resetGame();
    }
    sessionStorage.removeItem('cameFromRules');
  }, [resetGame, resetSession]);

  useEffect(() => {
    if (hasHydrated && !hasPlayedSession) {
      renderHowToPlayModal();
    }
  }, [hasHydrated, hasPlayedEver, hasPlayedSession]);
}
