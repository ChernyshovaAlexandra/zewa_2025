import { Container, Sprite } from '@pixi/react';

export const BackpackBack = ({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  return (
    <Container x={x} y={y + 10}>
      <Sprite image="./assets/images/backpack-back.png" width={width} height={height} anchor={0.5} />
    </Container>
  );
};
