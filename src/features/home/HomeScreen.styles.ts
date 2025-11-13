import styled, { keyframes } from 'styled-components';

const fall = keyframes`
  0% {
    transform: translateY(0) translateX(0);
  }
  100% {
    transform: translateY(110vh) translateX(var(--drift));
  }
`;

export const HomeWrapper = styled.div<{ $withImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--twa-safe-area-top, 0px) + 17px) 10px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: linear-gradient(180deg, #0c2c58 0%, #093f70 100%);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 270px;
    background: url('/assets/images/main/after.webp') no-repeat top;
    background-size: 105%;
    bottom: 0;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 300px;
    background: url('/assets/images/main/houses.webp') no-repeat bottom;
    background-size: 120%;
    bottom: 0;
  }
`;

export const BackpackContainer = styled.div`
  position: relative;

  button {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
  }
`;

export const Backpack = styled.img`
  width: 100%;
  max-width: 250px;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 277px;
`;

export const Navigation = styled.nav`
  display: block;
  width: 100%;
  margin-bottom: 16px;
  position: relative;
  z-index: 1000;
`;

export const Snow = styled.div`
  pointer-events: none;
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 0;

  .snowflake {
    position: absolute;
    top: -10px;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    opacity: 0.9;
    filter: blur(1px);

    animation: ${fall} var(--duration) linear infinite;
    left: var(--x);
  }
`;
