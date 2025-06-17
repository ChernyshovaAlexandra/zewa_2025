import { BACKPACK_HEIGHT, BACKPACK_WIDTH, useBackpackStore } from '@/features/game/store/backpackStore';

export function getBackpackRect(canvasHeight: number) {
  const offsetX = useBackpackStore.getState().x;
  const canvasWidth = useBackpackStore.getState().canvasWidth;

  const x = canvasWidth / 2 + offsetX;
  const y = canvasHeight - BACKPACK_HEIGHT / 2 - 20;

  return {
    x,
    y,
    width: BACKPACK_WIDTH,
    height: BACKPACK_HEIGHT,
  };
}
