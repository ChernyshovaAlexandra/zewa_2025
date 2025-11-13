import type { CSSProperties } from 'react';

export interface MemoCardImageLayout {
  widthPercent?: number;
  heightPercent?: number;
  offsetXPercent?: number;
  offsetYPercent?: number;
  rotationDeg?: number;
  scale?: number;
}

const DEFAULT_LAYOUT: Required<Pick<MemoCardImageLayout, 'widthPercent' | 'heightPercent'>> = {
  widthPercent: 99,
  heightPercent: 99,
};

const MEMO_CARD_IMAGE_LAYOUTS: Record<number, MemoCardImageLayout> = {
  1: { widthPercent: 99, offsetYPercent: 4 },
  2: { widthPercent: 99, offsetYPercent: -6 },
  3: { widthPercent: 99, offsetXPercent: -2 },
  4: { widthPercent: 99, offsetXPercent: 2, offsetYPercent: 2 },
  5: { widthPercent: 99, offsetYPercent: -4 },
  6: { widthPercent: 99, offsetYPercent: 5 },
  7: { widthPercent: 99, offsetYPercent: -3 },
  8: { widthPercent: 99, offsetXPercent: 1 },
  9: { widthPercent: 99, offsetYPercent: -2 },
  10: { widthPercent: 99, offsetYPercent: 1 },
  11: { widthPercent: 99, offsetYPercent: 2 },
  12: { widthPercent: 99, offsetYPercent: -5 },
  13: { widthPercent: 99, offsetXPercent: -3 },
  14: { widthPercent: 99, offsetYPercent: 3 },
  15: { widthPercent: 99, offsetXPercent: 2 },
  16: { widthPercent: 99, offsetYPercent: -1 },
  17: { widthPercent: 99, offsetXPercent: -2, offsetYPercent: -4 },
  18: { widthPercent: 99, offsetYPercent: 6 },
  19: { widthPercent: 99, offsetYPercent: -3 },
  20: { widthPercent: 99, offsetXPercent: 3 },
  21: { widthPercent: 99, offsetXPercent: -1, offsetYPercent: 1 },
  22: { widthPercent: 99, offsetYPercent: -2 },
  23: { widthPercent: 99, offsetYPercent: 4 },
  24: { widthPercent: 99, offsetXPercent: 1, offsetYPercent: 2 },
  25: { widthPercent: 99, offsetYPercent: -5 },
};

export function getMemoCardImageStyle(imageId: number): CSSProperties {
  const layout = MEMO_CARD_IMAGE_LAYOUTS[imageId] ?? {};
  const widthPercent = layout.widthPercent ?? DEFAULT_LAYOUT.widthPercent;
  const heightPercent = layout.heightPercent ?? DEFAULT_LAYOUT.heightPercent;

  const transforms: string[] = [];

  if (layout.scale != null) {
    transforms.push(`scale(${layout.scale})`);
  }

  if (layout.offsetXPercent != null || layout.offsetYPercent != null) {
    const x = layout.offsetXPercent ?? 0;
    const y = layout.offsetYPercent ?? 0;
    transforms.push(`translate(${x}%, ${y}%)`);
  }

  if (layout.rotationDeg != null) {
    transforms.push(`rotate(${layout.rotationDeg}deg)`);
  }

  const style: CSSProperties = {
    width: `${widthPercent}%`,
    height: `${heightPercent}%`,
  };

  if (transforms.length > 0) {
    style.transform = transforms.join(' ');
  }

  return style;
}
