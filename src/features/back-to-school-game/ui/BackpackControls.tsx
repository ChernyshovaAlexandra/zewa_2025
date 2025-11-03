/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useMemo, useRef } from 'react';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';
import styled from 'styled-components';
import { ForwardIcon, LeftIcon } from '@/shared/ui';
import { useCoinAnimationStore } from '@/features/back-to-school-game/model/coinAnimationStore';
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
  const repeatRef = useRef<NodeJS.Timeout | null>(null);
  const REPEAT_DELAY = 300; // мс до старта авто-повтора
  const REPEAT_RATE = 60; // мс между повторами (~16 fps)

  const startHold = (dir: 'left' | 'right') => {
    stopHold();
    if (!canMove) return;

    dir === 'left' ? moveLeft() : moveRight();
    repeatRef.current = setTimeout(() => {
      repeatRef.current = setInterval(() => {
        dir === 'left' ? moveLeft() : moveRight();
      }, REPEAT_RATE);
    }, REPEAT_DELAY);
  };

  const stopHold = () => {
    if (repeatRef.current) {
      clearTimeout(repeatRef.current);
      clearInterval(repeatRef.current as NodeJS.Timeout); // если уже interval
      repeatRef.current = null;
    }
  };

  const canMove = useMemo(
    () => isGameStarted && !isPaused && !isGameOver && !isModalOpen,
    [isGameStarted, isPaused, isGameOver, isModalOpen],
  );

  useEffect(() => {
    const up = () => {
      stopHold();
      useGameModelStore.getState().setDragging(false);
    };
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  useEffect(() => {
    return () => stopHold();
  }, []);
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
        onPointerDown={(e) => {
          e.stopPropagation();
          startHold('left');
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          stopHold();
        }}
        onPointerLeave={stopHold}
        style={{ color: '#F23177' }}
        onClick={(e) => {
          e.stopPropagation();
          if (canMove) moveLeft();
        }}
      >
        <LeftIcon />
      </ArrowButton>
      <ArrowButton
        onPointerDown={(e) => {
          e.stopPropagation();
          startHold('right');
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          stopHold();
        }}
        onPointerLeave={stopHold}
        style={{ color: '#F23177' }}
        onClick={(e) => {
          e.stopPropagation();
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
