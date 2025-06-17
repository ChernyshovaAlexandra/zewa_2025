import { useTick } from '@pixi/react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

export const BackpackAnimator = () => {
  const tick = useGameModelStore((s) => s.tick);
  useTick(() => {
    tick();
  });
  return null;
};
