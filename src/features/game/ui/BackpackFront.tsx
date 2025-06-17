import { Container, Sprite } from '@pixi/react';

export const BackpackFront = ({
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
    <Container x={x} y={y}>
      <Sprite
        image="./assets/images/backpack-front.png"
        width={width}
        height={height}
        anchor={0.5}
        y={-10}
      />
    </Container>
  );
};
