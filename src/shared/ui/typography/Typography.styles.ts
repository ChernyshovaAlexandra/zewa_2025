import styled, { css } from 'styled-components';
import type { TextProps, HeadingProps, TypographyCommonProps } from './Typography.types';

const baseStyle = css<TypographyCommonProps>`
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  color: ${({ color }) => color || '#1D2023'};
  text-align: ${({ align }) => align || 'left'};
`;

const headingStyles = {
  h1: css`
    font-size: 30px;
    font-weight: 900;
    line-height: 110%;
  `,
  h2: css`
    font-size: 24px;
    font-weight: 900;
    line-height: 110%;
  `,
  h3: css`
    font-size: 22px;
    font-weight: 700;
    line-height: 110%;
  `,
  h4: css`
    font-size: 20px;
    font-weight: 700;
    line-height: 120%;
  `,
};

export const HeadingBase = styled.h2<HeadingProps>`
  ${baseStyle}

  ${({ size = 'h2' }) => headingStyles[size]}
`;

const textStyles = {
  p1: css`
    font-size: 24px;
    line-height: 120%;
  `,
  p2: css`
    font-size: 20px;
    line-height: 120%;
  `,
  p3: css`
    font-size: 17px;
    line-height: 130%;
  `,
  p4: css`
    font-size: 16px;
    line-height: 150%;
  `,
};

export const TextBase = styled.p<TextProps>`
  ${baseStyle}
  font-weight: ${({ weight = 400 }) => weight};
  ${({ size = 'p3' }) => textStyles[size]}
`;
