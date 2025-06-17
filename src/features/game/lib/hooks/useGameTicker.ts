import { useTick } from '@pixi/react';
import { useRef, useEffect } from 'react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

export const useGameTicker = (canvasWidth: number, canvasHeight: number) => {
  const moveItems = useGameModelStore((s) => s.moveItems);
  const isPaused = useGameModelStore((s) => s.isPaused);
  const addItem = useGameModelStore((s) => s.addItem);
  const spawnCoin = useGameModelStore((s) => s.spawnCoin);
  const isGameStarted = useGameModelStore((s) => s.isGameStarted);

  const timer = useRef(0);
  const ADD_INTERVAL = 1600;

  useEffect(() => {
    timer.current = 0;
  }, [isGameStarted]);

  useTick((delta: number) => {
    if (!isGameStarted || isPaused) return;

    moveItems(canvasHeight);
    timer.current += delta * (1000 / 60);

    if (timer.current >= ADD_INTERVAL) {
      const shouldSpawnCoin = Math.random() < 0.2; // 20% шанс
      if (shouldSpawnCoin) {
        spawnCoin(canvasWidth);
      } else {
        addItem(canvasWidth);
      }
      timer.current = 0;
    }
  });
};
