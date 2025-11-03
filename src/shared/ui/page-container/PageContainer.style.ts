import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  $fullscreen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('./assets/images/game-bg.webp');
  box-sizing: border-box;

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
  line-height: 140%;

  ${({ $withPadding }) =>
    $withPadding &&
    css`
      padding-top: 24px;
    `}
`;
