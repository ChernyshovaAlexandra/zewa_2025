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
  widthPercent: 70,
  heightPercent: 70,
};

const MEMO_CARD_IMAGE_LAYOUTS: Record<number, MemoCardImageLayout> = {
  1: { widthPercent: 78, offsetYPercent: 4 },
  2: { widthPercent: 68, offsetYPercent: -6 },
  3: { widthPercent: 74, offsetXPercent: -2 },
  4: { widthPercent: 72, offsetXPercent: 2, offsetYPercent: 2 },
  5: { widthPercent: 66, offsetYPercent: -4 },
  6: { widthPercent: 80, offsetYPercent: 5 },
  7: { widthPercent: 62, offsetYPercent: -3 },
  8: { widthPercent: 76, offsetXPercent: 1 },
  9: { widthPercent: 70, offsetYPercent: -2 },
  10: { widthPercent: 64, offsetYPercent: 1 },
  11: { widthPercent: 73, offsetYPercent: 2 },
  12: { widthPercent: 71, offsetYPercent: -5 },
  13: { widthPercent: 68, offsetXPercent: -3 },
  14: { widthPercent: 77, offsetYPercent: 3 },
  15: { widthPercent: 69, offsetXPercent: 2 },
  16: { widthPercent: 75, offsetYPercent: -1 },
  17: { widthPercent: 67, offsetXPercent: -2, offsetYPercent: -4 },
  18: { widthPercent: 81, offsetYPercent: 6 },
  19: { widthPercent: 65, offsetYPercent: -3 },
  20: { widthPercent: 72, offsetXPercent: 3 },
  21: { widthPercent: 70, offsetXPercent: -1, offsetYPercent: 1 },
  22: { widthPercent: 74, offsetYPercent: -2 },
  23: { widthPercent: 69, offsetYPercent: 4 },
  24: { widthPercent: 78, offsetXPercent: 1, offsetYPercent: 2 },
  25: { widthPercent: 66, offsetYPercent: -5 },
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
