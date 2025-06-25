import { type JSX, type HTMLAttributes, type ReactNode } from 'react';

export interface TypographyCommonProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  align?: 'left' | 'center' | 'right';
  color?: string;
  weight?: 400 | 500 | 700 | 900;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export interface TextProps extends TypographyCommonProps {
  size?: 'p1' | 'p2' | 'p3' | 'p4';
  bold?: boolean;
}

export interface HeadingProps extends TypographyCommonProps {
  size?: 'h1' | 'h2' | 'h3' | 'h4';
}
