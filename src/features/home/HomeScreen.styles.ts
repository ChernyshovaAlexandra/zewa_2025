import styled from 'styled-components';

export const HomeWrapper = styled.div<{ $withImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--twa-safe-area-top, 0px) + 17px) 10px;
  background: url('./assets/images/Game-interface.webp') no-repeat bottom;
  min-height: 100vh;
  box-sizing: border-box;
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
`;
