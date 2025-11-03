import { Container, Graphics, Stage } from '@pixi/react';
import { useContainerSize } from '@/hooks';
import { FallingItems } from './FallingItems';
import { GameTickerWrapper } from './GameTickerWrapper';
import { BackpackBack } from './BackpackBack';
import { BackpackFront } from './BackpackFront';

import { Background } from './Background';
import { useEffect, useRef } from 'react';
import { BackpackAnimator } from './BackpackAnimator';
import { CoinAnimationsLayer } from './CoinAnimationsLayer';
import * as PIXI from 'pixi.js';
import { useNavigate } from 'react-router-dom';
import { useGameModelStore } from '../model/gameModelStore';
import { BACKPACK_HEIGHT, BACKPACK_WIDTH } from '../model/backpack';

export const GameCanvas = () => {
  const { ref, width, height } = useContainerSize();
  const bottomY = height - BACKPACK_HEIGHT / 2 - 20;
  const x = useGameModelStore((s) => s.x);
  const navigate = useNavigate();
  const dragData = useRef<{
    dragging: boolean;
    lastX: number;
  }>({ dragging: false, lastX: 0 });

  const onDragStart = (e: PIXI.FederatedPointerEvent) => {
    dragData.current.dragging = true;
    dragData.current.lastX = e.clientX;
    useGameModelStore.getState().setDragging(true);
  };

  const onDragMove = (e: PIXI.FederatedPointerEvent) => {
    if (!dragData.current.dragging) return;

    const delta = e.clientX; // - dragData.current.lastX;
    dragData.current.lastX = e.clientX;

    useGameModelStore.getState().setTargetX((prev) => prev + delta);
  };

  const onDragEnd = () => {
    dragData.current.dragging = false;
    useGameModelStore.getState().setDragging(false);
  };

  const flashOverlay = useGameModelStore((s) => s.flashOverlay);
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
          <Container
            interactive
            hitArea={new PIXI.Rectangle(0, 0, width, height)}
            pointerdown={onDragStart}
            pointermove={onDragMove}
            pointerup={onDragEnd}
            pointerupoutside={onDragEnd}
          >
            <Background width={width} height={height} />
            <BackpackBack x={centerX} y={bottomY} width={BACKPACK_WIDTH} height={BACKPACK_HEIGHT} />
            <BackpackAnimator />
            <GameTickerWrapper width={width} height={height} navigate={navigate} />
            <FallingItems />
            <CoinAnimationsLayer />
            <BackpackFront
              x={centerX}
              y={bottomY}
              width={BACKPACK_WIDTH}
              height={BACKPACK_HEIGHT}
            />
            {flashOverlay && (
              <Graphics
                draw={(g) => {
                  g.clear();
                  g.beginFill(0xff0000, 0.5);
                  g.drawRect(0, 0, width, height);
                  g.endFill();
                }}
              />
            )}
          </Container>
        </Stage>
      )}
    </div>
  );
};
