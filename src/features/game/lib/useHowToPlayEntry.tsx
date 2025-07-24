import { useEffect } from 'react';
import { useGameProgressStore } from '@/features/game/model/useGameProgressStore';
import { renderHowToPlayModal } from './renderHowToPlayModal';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { apiService, telegramService } from '@/services';
import { useUserStore } from '@/shared/model';

const game_id = 1;

export function useHowToPlayEntry() {
  const { hasPlayedEver, hasPlayedSession, hasHydrated, resetSession } = useGameProgressStore();
  const { resetGame } = useGameModelStore.getState();
  const { user } = useUserStore.getState();
  const webApp = telegramService.getWebApp();
  const { setAvailableCoins } = useGameModelStore.getState();

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
      try {
        if (user && webApp) {
          apiService
            .gameStart({
              game: game_id,
            })
            .then((res) => {
              const { game_coins, user_can_play } = res.data.data;
              setAvailableCoins(game_coins);
              if (user_can_play[game_id]) renderHowToPlayModal(game_coins);
            });
        }
      } catch (err) {
        console.error('gameStart error', err);
      }
    }
  }, [hasHydrated, hasPlayedEver, hasPlayedSession, setAvailableCoins, user, webApp]);
}
