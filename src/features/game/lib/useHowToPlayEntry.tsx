import { useEffect } from 'react';
import { useGameProgressStore } from '@/features/game/model/useGameProgressStore';
import { renderHowToPlayModal } from './renderHowToPlayModal';
import { game_id, useGameModelStore } from '@/features/game/model/gameModelStore';
import { apiService } from '@/services';
import { useModalStore, useUserStore } from '@/shared/model';
import { Text } from '@/shared/ui';
import { applyNbsp } from '../../../utils/nbsp';
import { ButtonBackToMain } from './ButtonBackToMain';
import { NavigateFunction } from 'react-router-dom';


export function useHowToPlayEntry(navigate: NavigateFunction) {
  const { hasPlayedEver, hasPlayedSession, hasHydrated, resetSession } = useGameProgressStore();
  const { resetGame } = useGameModelStore.getState();
  const { user } = useUserStore.getState();
  const { setAvailableCoins } = useGameModelStore.getState();
  const { openModal } = useModalStore.getState();

  useEffect(() => {
    const cameFromRules = sessionStorage.getItem('cameFromRules') === 'true';
    if (!cameFromRules) {
      resetSession();
      resetGame();
    }
    sessionStorage.removeItem('cameFromRules');
  }, [resetGame, resetSession]);

  useEffect(() => {
    if (hasHydrated && !hasPlayedSession && user) {
      apiService
        .gameStart({ game: game_id })
        .then((res) => {
          if (res.data) {
            if (res.data.success) {
              const { game_coins, user_can_play } = res.data.data;
              setAvailableCoins(game_coins);
              if (user_can_play[game_id]) {
                renderHowToPlayModal(game_coins);
              }
            } else {
              openModal({
                title: 'Упс!',
                closable: false,
                content: (
                  <>
                    <Text style={{ textAlign: 'center' }}>
                      {applyNbsp(
                        `${res.data.message ?? `Эта игра сейчас недоступна. Возвращайся позже.`}`,
                      )}
                    </Text>
                    <ButtonBackToMain navigate={navigate} />
                  </>
                ),
              });
            }
          } else {
            openModal({
              title: 'Упс!',
              closable: false,
              content: (
                <>
                  <Text style={{ textAlign: 'center' }}>
                    Эта игра сейчас недоступна. Возвращайся позже.
                  </Text>
                  <ButtonBackToMain navigate={navigate} />
                </>
              ),
            });
          }
        })
        .catch((err) => {
          console.error('gameStart error', err);
          openModal({
            title: 'Упс!',
            closable: false,
            content: (
              <>
                <Text style={{ textAlign: 'center' }}>
                  Эта игра сейчас недоступна. Возвращайся позже.
                </Text>
                <ButtonBackToMain navigate={navigate} />
              </>
            ),
          });
        });
    }
  }, [hasHydrated, hasPlayedEver, hasPlayedSession, navigate, openModal, setAvailableCoins, user]);
}
