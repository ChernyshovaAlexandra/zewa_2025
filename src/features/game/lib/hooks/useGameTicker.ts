/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useTick } from '@pixi/react';
import { useRef, useEffect } from 'react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { renderPauseModal } from '../renderPauseModal';
const COIN_CHANCE = 0.2;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGameTicker = (canvasWidth: number, canvasHeight: number, navigate: any) => {
  const moveItems = useGameModelStore((s) => s.moveItems);
  const isPaused = useGameModelStore((s) => s.isPaused);
  const addItem = useGameModelStore((s) => s.addItem);
  const spawnCoin = useGameModelStore((s) => s.spawnCoin);
  const coins = useGameModelStore((s) => s.coins);
  const coins_available = useGameModelStore((s) => s.coins_available);
  const isGameStarted = useGameModelStore((s) => s.isGameStarted);
  const pauseGame = useGameModelStore((s) => s.pauseGame);
  const resumeGame = useGameModelStore((s) => s.resumeGame);

  const lastFrame = useRef(performance.now());
  const accSpawnMs = useRef(0);
  const justCoin = useRef(false);

  const BASE_HEIGHT = 667;
  const MAX_HEIGHT = 780;

  const ADD_INTERVAL = canvasHeight >= BASE_HEIGHT && canvasHeight < MAX_HEIGHT ? 2800 : 1800;

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        renderPauseModal(navigate);
      } else if (!useGameModelStore.getState().isPaused) {
        resumeGame();
      }
    };
    const handleBlur = () => renderPauseModal(navigate);
    const handleFocus = () => {
      if (!useGameModelStore.getState().isPaused) {
        resumeGame();
        lastFrame.current = performance.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [navigate, pauseGame, resumeGame]);

  useEffect(() => {
    if (isGameStarted) {
      accSpawnMs.current = 0;
      lastFrame.current = performance.now();
    }
  }, [isGameStarted]);

  useTick(() => {
    if (!isGameStarted || isPaused) return;

    const now = performance.now();
    const dtMs = Math.min(now - lastFrame.current, ADD_INTERVAL);
    lastFrame.current = now;

    moveItems(canvasHeight, dtMs);

    accSpawnMs.current += dtMs;
    if (accSpawnMs.current >= ADD_INTERVAL) {
      const canSpawnCoin =
        coins < coins_available && !justCoin.current && Math.random() < COIN_CHANCE; // шанс выпадения монеты
      if (canSpawnCoin) {
        spawnCoin(canvasWidth, canvasHeight, dtMs);
        justCoin.current = true;
      } else {
        addItem(canvasWidth, canvasHeight);
        justCoin.current = false;
      }

      accSpawnMs.current -= ADD_INTERVAL;
    }
    useGameModelStore.getState().updateFlash(dtMs);
  });
};
