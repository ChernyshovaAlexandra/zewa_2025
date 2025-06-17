import { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HeartIcon } from '@/shared/ui';

interface HeartProps {
  filled: boolean;
  breaking: boolean;
}

const breakAnim = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); }
  100% { transform: scale(0) rotate(45deg); opacity: 0; }
`;

const Wrapper = styled.div<{ $breaking: boolean }>`
  display: inline-block;
  transform: scale(1) rotate(0deg);
  opacity: 1;
  ${(p) =>
    p.$breaking &&
    css`
      animation: ${breakAnim} 0.5s forwards;
    `}
`;

export const Heart = ({ filled, breaking }: HeartProps) => {
  const [showBroken, setShowBroken] = useState(false);

  useEffect(() => {
    if (breaking) {
      setShowBroken(true);
      const t = setTimeout(() => setShowBroken(false), 500);
      return () => clearTimeout(t);
    }
  }, [breaking]);

  return (
    <Wrapper $breaking={showBroken}>
      <HeartIcon fill={filled ? '#F23177' : 'none'} stroke="#F23177" />
    </Wrapper>
  );
};
