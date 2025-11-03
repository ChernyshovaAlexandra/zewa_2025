/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGameTicker } from "../lib";

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
