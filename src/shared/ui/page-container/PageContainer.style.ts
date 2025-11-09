import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  $fullscreen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url('/assets/images/game-bg.webp');
  box-sizing: border-box;
  padding-inline: 10px;
  padding-top: calc(
    10px + var(--twa-safe-area-top, 0px) + (min(var(--twa-safe-area-top, 0px), 1px) * 30)
  );

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
  line-height: 140%;

  ${({ $withPadding }) =>
    $withPadding &&
    css`
      padding-top: 24px;
    `}
`;
