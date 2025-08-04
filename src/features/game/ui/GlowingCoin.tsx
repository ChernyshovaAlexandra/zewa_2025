import { AnimatedSprite, Container, Sprite, useTick } from '@pixi/react';
import { useMemo, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

export const GlowingCoin = ({ x, y, size = 36 }: { x: number; y: number; size?: number }) => {
  const raysRef = useRef<PIXI.Sprite>(null);
  const coinRef = useRef<PIXI.AnimatedSprite>(null);

  const [rotation, setRotation] = useState(0);
  const textures = useMemo(
    () =>
      [
        'coina3-1.png',
        'coina3-2.png',
        'coina3-3.png',
        'coina3-4.png',
        'coina3-5.png',
        'coina3-5.png',
        'coina3-5.png',
      ].map((p) => PIXI.Texture.from(`/assets/images/items/${p}`)),
    [],
  );

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
        image="/assets/images/coin-rays2.png"
        width={size * 2}
        height={size * 2}
        anchor={0.5}
      />

      {/* Монетка */}
      <AnimatedSprite
        ref={coinRef}
        textures={textures}
        width={size * 0.8}
        height={size * 0.8}
        anchor={0.5}
        isPlaying
        loop
        animationSpeed={0.5}
      />
    </Container>
  );
};
