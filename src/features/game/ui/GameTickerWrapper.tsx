/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGameTicker } from '@/features/game/lib/hooks/useGameTicker';

export const GameTickerWrapper = ({
  width,
  height,
  navigate,
}: {
  width: number;
  height: number;
  navigate: any;
}) => {
  useGameTicker(width, height, navigate);
  return null;
};
