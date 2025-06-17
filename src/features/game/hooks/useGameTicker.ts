import { useTick } from '@pixi/react';
import { useRef } from 'react';
import { useItemStore } from '../store/itemStore';
import { useGameStateStore } from '../store/gameStore';

export const useGameTicker = (canvasWidth: number, canvasHeight: number) => {
  const moveItems = useItemStore((s) => s.moveItems);
  const isPaused = useGameStateStore((s) => s.isPaused);
  const addItem = useItemStore((s) => s.addItem);
  const addCoin = useItemStore((s) => s.addCoin);
  const isGameStarted = useGameStateStore((s) => s.isGameStarted);

  const timer = useRef(0);
  const ADD_INTERVAL = 1600;

  useTick((delta: number) => {
    if (!isGameStarted || isPaused) return;

    moveItems(canvasHeight);
    timer.current += delta * (1000 / 60);

    if (timer.current >= ADD_INTERVAL) {
      const shouldSpawnCoin = Math.random() < 0.2; // 20% шанс
      if (shouldSpawnCoin) {
        addCoin(canvasWidth);
      } else {
        addItem(canvasWidth);
      }
      timer.current = 0;
    }
  });
};
