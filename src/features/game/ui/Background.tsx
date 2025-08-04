import { Sprite } from '@pixi/react';

export const Background = ({ width, height }: { width: number; height: number }) => {
  return (
    <Sprite image={'./assets/images/game-bg.webp'} x={0} y={0} width={width} height={height} />
  );
};
