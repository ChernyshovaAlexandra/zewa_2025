import styled, { css } from 'styled-components';

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 12px 24px;
  min-height: 100%;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;

  h2,
  h3 {
    color: #eaf6ff; /* светло-голубой как на макете */
  text-align: center;
  font-family: 'Foco Trial', sans-serif;
  font-weight: 900;
  font-size: 40px;
  line-height: 110%;
  text-transform: uppercase;

  /* Контур */
  -webkit-text-stroke: 3px #193f74;

  /* Подсветка и глубина */
  text-shadow:
    0 2px 6px rgba(25, 63, 116, 0.8),
    0 4px 14px rgba(25, 63, 116, 0.6);

  font-feature-settings: 'liga' off, 'clig' off;
  }
`;


export const CardsGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(80px, 1fr));
  gap: 10px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
`;

export const Card = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 80 / 110;
  border-radius: 8px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  perspective: 1000px;
  transform-style: preserve-3d;

  &:focus-visible {
    outline: 2px solid #5d79c1;
    outline-offset: 3px;
  }

  @supports not (aspect-ratio: 1) {
    &:before {
      content: '';
      display: block;
      padding-top: calc((110 / 80) * 100%);
    }
  }
`;

export const CardInner = styled.div<{ $flipped: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 6px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  box-shadow: 0px 8px 24px rgba(31, 37, 50, 0.08);
  will-change: transform;
  ${({ $flipped }) =>
    $flipped
      ? css`
          transform: rotateY(180deg);
        `
      : css`
          transform: rotateY(0deg);
        `};
`;

const faceStyles = css`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardFace = styled.div`
  ${faceStyles}
`;

export const CardBack = styled(CardFace)`
  background: url(/assets/images/memo/back.webp) no-repeat center;
  background-size: cover;
`;

export const CardFront = styled(CardFace)`
  transform: rotateY(180deg);
  background: #ffffff;
`;

export const CardFrontImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: cover;
  pointer-events: none;
`;

export const CardBackImage = styled.img`
  width: 70%;
  height: auto;
  object-fit: contain;
  pointer-events: none;
`;
