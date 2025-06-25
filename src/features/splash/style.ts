import styled, { keyframes } from 'styled-components';

export const fill = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

export const Wrapper = styled.div`
  height: 100vh;
  background: url('./assets/images/bg.svg'), linear-gradient(180deg, #2d59df 0%, #1945cb 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  padding-top: 9rem;
  position: relative;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 30px;
`;

export const ProgressContainer = styled.div`
  width: 80%;
  max-width: 320px;
  height: 25px;

  border-radius: 8px;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.5);
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(180deg, #f55496 0%, #e22c6e 100%);
  box-shadow:
    0px 1px 2px 0px rgba(231, 235, 240, 0.4) inset,
    0px -2px 3px 0px #ae2260 inset,
    0px 2px 3px 0px #f88ab2 inset;
  border-radius: 8px;
  animation: ${fill} 1.5s ease forwards;
`;

export const Label = styled.div`
  margin-top: 10px;

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
  bottom: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
`;
