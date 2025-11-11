import type { MemoLevel } from '../types';

export interface MemoLevelConfig {
  level: MemoLevel;
  rows: number;
  columns: number;
  pairs: number;
  timeLimitSeconds: number;
}

export const MEMO_LEVEL_CONFIG: Record<MemoLevel, MemoLevelConfig> = {
  1: { level: 1, rows: 3, columns: 4, pairs: 6, timeLimitSeconds: 30 },
  2: { level: 2, rows: 4, columns: 5, pairs: 10, timeLimitSeconds: 70 },
  3: { level: 3, rows: 5, columns: 6, pairs: 15, timeLimitSeconds: 135 },
};

export interface MemoImageSet {
  id: string;
  label: string;
  assetFolder: string;
  preview?: string;
}

export const MEMO_IMAGE_SETS: MemoImageSet[] = [
  {
    id: 'classic',
    label: 'Классический набор',
    assetFolder: '/assets/images/memo/classic',
    preview: '/assets/images/memo/back.webp',
  },
  {
    id: 'school',
    label: 'Школа',
    assetFolder: '/assets/images/memo/school',
    preview: '/assets/images/memo/back.webp',
  },
  {
    id: 'winter',
    label: 'Зима',
    assetFolder: '/assets/images/memo/winter',
    preview: '/assets/images/memo/back.webp',
  },
];

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function getWeeklyMemoImageSet(date: Date = new Date()): MemoImageSet {
  if (!MEMO_IMAGE_SETS.length) {
    throw new Error('MEMO_IMAGE_SETS list is empty.');
  }

  const weeksSinceEpoch = Math.floor(date.getTime() / WEEK_IN_MS);
  const index = weeksSinceEpoch % MEMO_IMAGE_SETS.length;
  return MEMO_IMAGE_SETS[index];
}

export function getMemoLevelConfig(level: MemoLevel): MemoLevelConfig {
  return MEMO_LEVEL_CONFIG[level];
}
