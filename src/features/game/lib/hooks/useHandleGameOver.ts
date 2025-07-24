
import { useEffect } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { apiService } from '@/services';
import { useGameModelStore } from '../../model/gameModelStore';
import { renderGameOverModal } from '../renderGameOverModal';

export function useHandleGameOver(navigate: NavigateFunction) {
  const isGameOver = useGameModelStore((s) => s.isGameOver);

  useEffect(() => {
    if (!isGameOver) return;

    const submitResult = async () => {
      try {
        // берём score и coins из стора на момент финиша
        const { score, coins } = useGameModelStore.getState();
        await apiService.gameResult({
          game: 1,
          result: 1,
          points: score,
          coins,
        });
      } catch (error) {
        console.error('gameResult error', error);
      } finally {
        // рендерим модалку после следующего кадра
        requestAnimationFrame(() => {
          const { score } = useGameModelStore.getState();
          renderGameOverModal(score, navigate);
        });
      }
    };

    submitResult();
  }, [isGameOver, navigate]);
}
