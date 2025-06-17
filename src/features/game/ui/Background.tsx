import { Sprite } from '@pixi/react';
import { GlowingCoin } from './GlowingCoin';

export const Background = ({ width, height }: { width: number; height: number }) => {
  return (
    <>
      <GlowingCoin x={50} y={50} />
      <Sprite image={'./assets/images/game-bg.jpg'} x={0} y={0} width={width} height={height} />
    </>
  );
};
