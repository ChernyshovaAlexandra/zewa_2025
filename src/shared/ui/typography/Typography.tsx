import { TextBase, HeadingBase } from './Typography.styles';
import type { TextProps, HeadingProps } from './Typography.types';

export function Text(props: TextProps) {
  return <TextBase {...props} />;
}

export function Heading(props: HeadingProps) {
  return <HeadingBase {...props} />;
}