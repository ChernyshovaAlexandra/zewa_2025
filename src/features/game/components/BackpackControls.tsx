import { useEffect, useRef } from 'react';
import { useBackpackStore } from '../store/backpackStore';
import styled from 'styled-components';
import { ForwardIcon, LeftIcon } from '../../../components/ui';
import { useCoinAnimationStore } from '../store/coinAnimationStore';

export const BackpackControls = () => {
  const moveLeft = useBackpackStore((s) => s.moveLeft);
  const moveRight = useBackpackStore((s) => s.moveRight);
  const flyingCoins = useCoinAnimationStore((s) => s.flyingCoins);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (flyingCoins.length) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flyingCoins.length, moveLeft, moveRight]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (deltaX > 30) moveRight();
      if (deltaX < -30) moveLeft();
      touchStartX.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [moveLeft, moveRight]);

  return (
    <ControlsWrapper>
      <ArrowButton onClick={moveLeft}>
        <LeftIcon />
      </ArrowButton>
      <ArrowButton onClick={moveRight}>
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
