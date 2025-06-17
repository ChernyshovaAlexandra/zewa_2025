import { useTick } from '@pixi/react';
import { useBackpackStore } from '../store/backpackStore';

export const BackpackAnimator = () => {
  const tick = useBackpackStore((s) => s.tick);
  useTick(() => {
    tick();
  });
  return null;
};
