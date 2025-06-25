import { Container, Stage } from '@pixi/react';
import { useContainerSize } from '@/hooks';
import { FallingItems } from './FallingItems';
import { GameTickerWrapper } from './GameTickerWrapper';
import { BackpackBack } from './BackpackBack';
import { BackpackFront } from './BackpackFront';
import { BACKPACK_HEIGHT, BACKPACK_WIDTH } from '@/features/game/model/backpack';
import { useGameModelStore } from '@/features/game/model/gameModelStore';
import { Background } from './Background';
import { useEffect } from 'react';
import { BackpackAnimator } from './BackpackAnimator';
import { CoinAnimationsLayer } from './CoinAnimationsLayer';

export const GameCanvas = () => {
  const { ref, width, height } = useContainerSize();
  const bottomY = height - BACKPACK_HEIGHT / 2 - 20;
  const x = useGameModelStore((s) => s.x);
  const setCanvasWidth = useGameModelStore((s) => s.setCanvasWidth);
  const centerX = width / 2 + x;

  useEffect(() => {
    setCanvasWidth(width);
  }, [setCanvasWidth, width]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'absolute' }}>
      {width > 0 && height > 0 && (
        <Stage
          width={width}
          height={height}
          options={{
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio,
            autoDensity: true,
          }}
        >
          <Container>
            <Background width={width} height={height} />
            <BackpackBack x={centerX} y={bottomY} width={BACKPACK_WIDTH} height={BACKPACK_HEIGHT} />
            <BackpackAnimator />
            <GameTickerWrapper width={width} height={height} />
            <FallingItems />
            <CoinAnimationsLayer />
            <BackpackFront
              x={centerX}
              y={bottomY}
              width={BACKPACK_WIDTH}
              height={BACKPACK_HEIGHT}
            />
          </Container>
        </Stage>
      )}
    </div>
  );
};
