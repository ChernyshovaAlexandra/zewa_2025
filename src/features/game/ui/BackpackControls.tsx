import { useEffect } from 'react';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import styled from 'styled-components';
import { ForwardIcon, LeftIcon } from '@/shared/ui';
import { useCoinAnimationStore } from '@/features/game/model/coinAnimationStore';
import { useSwipe } from '@/hooks';

export const BackpackControls = () => {
  const moveLeft = useGameModelStore((s) => s.moveLeft);
  const moveRight = useGameModelStore((s) => s.moveRight);
  const flyingCoins = useCoinAnimationStore((s) => s.flyingCoins);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (flyingCoins.length) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flyingCoins.length, moveLeft, moveRight]);

  useSwipe({ onSwipeLeft: moveLeft, onSwipeRight: moveRight });

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
