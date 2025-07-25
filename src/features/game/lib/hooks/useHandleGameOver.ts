
import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { apiService } from '@/services';
import { game_id, useGameModelStore } from '../../model/gameModelStore';
import { renderGameOverModal } from '../renderGameOverModal';

export function useHandleGameOver(navigate: NavigateFunction) {
  const isGameOver = useGameModelStore((s) => s.isGameOver);

  useEffect(() => {
    if (!isGameOver) return;

    const submitResult = async () => {
      try {
        const { score, coins } = useGameModelStore.getState();
        await apiService.gameResult({
          game: game_id,
          result: 1,
          points: score,
          coins,
        });
      } catch (error) {
        console.error('gameResult error', error);
      } finally {
        requestAnimationFrame(() => {
          const { score } = useGameModelStore.getState();
          renderGameOverModal(score, navigate);
        });
      }
    };

    submitResult();
  }, [isGameOver, navigate]);
}
