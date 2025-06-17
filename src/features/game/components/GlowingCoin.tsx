import { Container, Sprite, useTick } from '@pixi/react';
import { useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

export const GlowingCoin = ({ x, y, size = 64 }: { x: number; y: number; size?: number }) => {
  const glowRef = useRef<PIXI.Sprite>(null);
  const raysRef = useRef<PIXI.Sprite>(null);
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    setRotation((prev) => prev + 0.01 * delta);
    if (raysRef.current) {
      raysRef.current.rotation = rotation;
    }
  });

  return (
    <Container x={x} y={y} anchor={0.5}>
      {/* Лучи */}
      <Sprite
        ref={raysRef}
        image="/assets/images/coin-rays.png"
        width={size * 2}
        height={size * 2}
        anchor={0.5}
        alpha={0.4}
        blendMode={PIXI.BLEND_MODES.ADD}
      />
      {/* Свечение */}
      <Sprite
        ref={glowRef}
        image="/assets/images/coin-glow.png"
        width={size * 1.5}
        height={size * 1.5}
        anchor={0.5}
        alpha={0.6}
        blendMode={PIXI.BLEND_MODES.ADD}
      />
      {/* Монетка */}
      <Sprite image="/assets/images/items/coin.png" width={size} height={size} anchor={0.5} />
    </Container>
  );
};
