import styled from 'styled-components';

export const WrapperInner = styled.div`
  padding: 24px 16px;
  padding-top: calc(var(--twa-safe-area-top, 0px) + 24px);
  padding-bottom: calc(var(--twa-safe-area-bottom, 0px) + 24px);
  box-sizing: border-box;
`;

export const Wrapper = styled.div`
  background: linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ScrollArea = styled.div`
  overflow-y: auto;
  color: white;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  flex-grow: 1;

  color: #fff;
  font-feature-settings:
    'liga' off,
    'clig' off;

  /* P4 Regular Text */
  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
