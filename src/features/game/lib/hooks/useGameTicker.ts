import { useTick } from '@pixi/react';
import { useRef, useEffect } from 'react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

export const useGameTicker = (canvasWidth: number, canvasHeight: number) => {
  const moveItems = useGameModelStore((s) => s.moveItems);
  const isPaused = useGameModelStore((s) => s.isPaused);
  const addItem = useGameModelStore((s) => s.addItem);
  const spawnCoin = useGameModelStore((s) => s.spawnCoin);
  const coins = useGameModelStore((s) => s.coins);
  const coins_available = useGameModelStore((s) => s.coins_available);
  const isGameStarted = useGameModelStore((s) => s.isGameStarted);
  const pauseGame = useGameModelStore((s) => s.pauseGame);
  const resumeGame = useGameModelStore((s) => s.resumeGame);

  const timer = useRef(0);
  const ADD_INTERVAL = 1600;

  useEffect(() => {
    if (!isGameStarted) {
      timer.current = 0;
    }
  }, [isGameStarted]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) pauseGame();
      else resumeGame();
    };
    const handleBlur = () => pauseGame();
    const handleFocus = () => resumeGame();

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [pauseGame, resumeGame]);

  useTick((delta: number) => {
    if (!isGameStarted || isPaused) return;

    moveItems(canvasHeight);
    timer.current += delta * (1000 / 60);

    if (timer.current >= ADD_INTERVAL) {
      if (coins < coins_available) {
        const spawnChance = Math.random() < 0.2;
        if (spawnChance) {
          spawnCoin(canvasWidth);
        } else {
          addItem(canvasWidth);
        }
      } else {
        addItem(canvasWidth);
      }
      timer.current = 0;
    }
    useGameModelStore.getState().updateFlash(delta);
  });
};
