import { useTick } from '@pixi/react';
import { useBackpackStore } from '@/features/game/model/backpackStore';

export const BackpackAnimator = () => {
  const tick = useBackpackStore((s) => s.tick);
  useTick(() => {
    tick();
  });
  return null;
};
