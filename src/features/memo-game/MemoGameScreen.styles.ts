import styled, { css } from 'styled-components';

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  max-width: 100%;
  padding: 0 12px 24px;
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
`;

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const infoBlockStyles = css`
  border-radius: var(--10, 10px);
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0px 1px 2px 0px rgba(255, 255, 255, 0.6) inset,
    0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.3);
  height: 50px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--main-blue);
  font-family:
    'Foco Trial',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  font-size: 19px;
  font-style: normal;
  font-weight: 900;
  line-height: 1.1;

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`;

export const InfoBlock = styled.div`
  ${infoBlockStyles};
  min-width: 0;
  text-align: center;
  white-space: nowrap;
`;

export const PauseButton = styled.button`
  ${infoBlockStyles};
  width: 50px;
  min-width: 50px;
  padding: 0;
  border: none;
  cursor: pointer;
  justify-content: center;
  color: var(--main-blue);

  &:focus-visible {
    outline: 2px solid #5d79c1;
    outline-offset: 2px;
  }
`;

export const TimerValue = styled.span`
  color: #193f74;
  font-family: 'Foco Trial';
  font-size: 18px;
  font-style: normal;
  font-weight: 900;
  line-height: 100%;
`;

export const SnowflakeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: center;
  color: var(--main-blue);
`;

export const SnowflakeCount = styled(TimerValue)``;

export const CardsGrid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(60px, 1fr));
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
  transition: transform 0.2s ease;

  &:focus-visible {
    outline: 2px solid #5d79c1;
    outline-offset: 3px;
  }

  &[disabled] {
    cursor: default;
  }

  @supports not (aspect-ratio: 1) {
    &:before {
      content: '';
      display: block;
      padding-top: calc((110 / 80) * 100%);
    }
  }
`;

export const CardInner = styled.div<{ $flipped: boolean; $matched: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 6px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  box-shadow: 0px 8px 24px rgba(31, 37, 50, 0.08);
  will-change: transform;

  ${({ $matched }) =>
    $matched &&
    css`
      box-shadow:
        0 0 0 2px rgba(63, 191, 138, 0.85),
        0px 8px 28px rgba(63, 191, 138, 0.35);
    `}

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
  background: linear-gradient(180deg, #dbe4ff 0%, #a0b6ff 100%);
  background-image: url('/assets/images/memo/back.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const CardFront = styled(CardFace)<{ $matched: boolean }>`
  transform: rotateY(180deg);
  background: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;

  ${({ $matched }) =>
    $matched &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(63, 191, 138, 0.24);
        border: 2px solid rgba(63, 191, 138, 0.9);
        border-radius: 6px;
        box-shadow: inset 0 0 12px rgba(63, 191, 138, 0.35);
      }
    `}
`;

export const CardFrontImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  position: relative;
  z-index: 1;
`;
export const GameTitle = styled.h1`
  color: #eefaff;
  text-align: center;
  font-family: 'Foco Trial';
  font-weight: 900;
  text-transform: uppercase;
  font-size: 40px;
  line-height: 110%;
  letter-spacing: 0.02em;

  /* Контур и тень как в макете */
  -webkit-text-stroke-width: 1.8px;
  -webkit-text-stroke-color: #10366e;
  paint-order: stroke fill;
  text-shadow:
    0 1px 0 #10366e,
    0 2px 4px rgba(16, 54, 110, 0.4);

  font-feature-settings:
    'liga' off,
    'clig' off;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
`;
