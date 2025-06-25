import { useEffect, useMemo } from 'react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import styled from 'styled-components';
import { ForwardIcon, LeftIcon } from '@/shared/ui';
import { useCoinAnimationStore } from '@/features/game/model/coinAnimationStore';
import { useSwipe } from '@/hooks';
import { useModalStore } from '@/shared/model/modalStore';

export const BackpackControls = () => {
  const moveLeft = useGameModelStore((s) => s.moveLeft);
  const moveRight = useGameModelStore((s) => s.moveRight);
  const flyingCoins = useCoinAnimationStore((s) => s.flyingCoins);
  const isPaused = useGameModelStore((s) => s.isPaused);
  const isGameOver = useGameModelStore((s) => s.isGameOver);
  const isGameStarted = useGameModelStore((s) => s.isGameStarted);
  const isModalOpen = useModalStore((s) => s.isOpen);

  const canMove = useMemo(
    () => isGameStarted && !isPaused && !isGameOver && !isModalOpen,
    [isGameStarted, isPaused, isGameOver, isModalOpen],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!canMove || flyingCoins.length) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [canMove, flyingCoins.length, moveLeft, moveRight]);

  useSwipe({
    onSwipeLeft: () => {
      if (canMove) moveLeft();
    },
    onSwipeRight: () => {
      if (canMove) moveRight();
    },
  });

  return (
    <ControlsWrapper>
      <ArrowButton
        onClick={() => {
          if (canMove) moveLeft();
        }}
      >
        <LeftIcon />
      </ArrowButton>
      <ArrowButton
        onClick={() => {
          if (canMove) moveRight();
        }}
      >
        <ForwardIcon />
      </ArrowButton>
    </ControlsWrapper>
  );
};

const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
`;

const ArrowButton = styled.div`
  display: flex;
  width: 60px;
  height: 56px;
  padding-right: 2px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;
