import { useGameTicker } from '@/features/game/hooks/useGameTicker';

export const GameTickerWrapper = ({ width, height }: { width: number, height: number }) => {
  useGameTicker(width, height);
  return null;
};