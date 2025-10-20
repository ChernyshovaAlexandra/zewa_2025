import { create } from 'zustand';
import type { MemoLevel } from '../types';
import { getWeeklyMemoImageSet } from '../config/memoLevelsConfig';

interface MemoGameState {
  selectedLevel: MemoLevel;
  lockedLevels: Record<MemoLevel, boolean>;
  currentImageSetId: string;
  setSelectedLevel: (level: MemoLevel) => void;
  setLevelLocked: (level: MemoLevel, locked: boolean) => void;
  setCurrentImageSetId: (id: string) => void;
  refreshImageSet: () => void;
}

const createDefaultLockedState = (): Record<MemoLevel, boolean> => ({
  1: false,
  2: false,
  3: false,
});

export const useMemoGameStore = create<MemoGameState>((set) => ({
  selectedLevel: 1,
  lockedLevels: createDefaultLockedState(),
  currentImageSetId: getWeeklyMemoImageSet().id,
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  setLevelLocked: (level, locked) =>
    set((state) => ({
      lockedLevels: {
        ...state.lockedLevels,
        [level]: locked,
      },
    })),
  setCurrentImageSetId: (id) => set({ currentImageSetId: id }),
  refreshImageSet: () => set({ currentImageSetId: getWeeklyMemoImageSet().id }),
}));
