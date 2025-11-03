import { useEffect, useRef, useState } from 'react';
import { Container, Sprite } from '@pixi/react';

export const AnimatedFlyingCoin = ({
  from,
  to,
  onComplete,
}: {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  onComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const duration = 500;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) {
        ref.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    ref.current = requestAnimationFrame(animate);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
  }, [onComplete]);

  const arcY = -100;
  const x = from.x + (to.x - from.x) * progress;
  const y = from.y + (to.y - from.y) * progress + arcY * Math.sin(Math.PI * progress);
  const scale = 1 - 0.5 * progress;
  const alpha = 1 - progress;
  const rotation = Math.PI * 2 * progress;

  return (
    <Container x={x} y={y} scale={scale} alpha={alpha} rotation={rotation} anchor={0.5}>
      <Sprite image="./assets/images/items/coin3.png" width={40} height={40} anchor={0.5} />
    </Container>
  );
};
