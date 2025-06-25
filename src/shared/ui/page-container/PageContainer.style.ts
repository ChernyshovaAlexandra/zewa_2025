import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  $fullscreen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./assets/images/bg.svg'), linear-gradient(180deg, #2d59df 0%, #1945cb 100%);

  ${({ $fullscreen }) =>
    $fullscreen &&
    css`
      height: 100dvh;
    `}
`;

export const ScrollArea = styled.div<{ $withPadding?: boolean }>`
  overflow-y: auto;
  color: white;
  font-size: 16px;
  line-height: 1.5;
  white-space: pre-wrap;
  width: 100%;
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
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 24px;
  line-height: 140%;

  ${({ $withPadding }) =>
    $withPadding &&
    css`
      padding-top: 24px;
    `}
`;
