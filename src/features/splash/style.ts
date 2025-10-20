import styled, { keyframes } from 'styled-components';

export const fill = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;
// fin
export const Wrapper = styled.div`
  height: 100vh;
  background: url('./assets/images/bg.svg'), linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  padding-top: 3rem;
  position: relative;
`;

export const Logo = styled.img`
  width: 130px;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
`;

export const ProgressContainer = styled.div`
  width: 80%;
  max-width: 320px;
  height: 25px;
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  overflow: hidden;
  border-radius: 28px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 28px;
  background: linear-gradient(180deg, #f55496 0%, #e22c6e 100%);
  box-shadow:
    0px 1px 2px 0px rgba(231, 235, 240, 0.4) inset,
    0px -2px 3px 0px #ae2260 inset,
    0px 2px 3px 0px #f88ab2 inset;
  animation: ${fill} 1.5s ease forwards;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 5px;
    width: 21px;
    height: 21px;
    background: url('/assets/images/snowflake.png') no-repeat center;
  }
`;

export const Label = styled.div`
  margin-top: 10px;
  position: relative;
  z-index: 2;
  font-weight: 500;
  color: #ebf9ff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

export const BottomImage = styled.img`
  position: absolute;
  top: 0;
  width: auto;
  min-width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
`;
