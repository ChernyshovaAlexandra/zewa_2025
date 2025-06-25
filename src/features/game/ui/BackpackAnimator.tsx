import { useTick } from '@pixi/react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { useModalStore } from '@/shared/model/modalStore';

export const BackpackAnimator = () => {
  const tick = useGameModelStore((s) => s.tick);
  const isPaused = useGameModelStore((s) => s.isPaused);
  const isGameOver = useGameModelStore((s) => s.isGameOver);
  const isGameStarted = useGameModelStore((s) => s.isGameStarted);
  const isModalOpen = useModalStore((s) => s.isOpen);

  useTick(() => {
    if (!isGameStarted || isPaused || isGameOver || isModalOpen) return;
    tick();
  });
  return null;
};
