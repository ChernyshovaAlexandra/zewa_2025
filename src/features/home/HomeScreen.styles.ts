import styled from 'styled-components';

export const HomeWrapper = styled.div<{ $withImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: url('./assets/images/bg.svg'), linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
  min-height: 100vh;
  position: relative;
  > * {
    position: relative;
  }
  /* &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('./assets/images/1.webp') no-repeat center top;
    background-size: cover;
    z-index: 0;
  } */
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
  gap: 16px;
  width: 100%;
  max-width: 320px;
`;

export const Navigation = styled.nav`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;
