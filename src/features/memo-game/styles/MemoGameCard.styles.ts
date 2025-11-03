import styled, { css } from 'styled-components';

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
