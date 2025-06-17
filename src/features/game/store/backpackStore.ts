import { create } from 'zustand';

interface BackpackState {
  x: number;
  targetX: number;
  canvasWidth: number;
  setCanvasWidth: (w: number) => void;
  moveLeft: () => void;
  moveRight: () => void;
  tick: () => void;
  reset: () => void;
}

export const MOVE_DISTANCE = 25;
export const BACKPACK_WIDTH = 134; //182;
export const BACKPACK_HEIGHT = 140; //190;

export const useBackpackStore = create<BackpackState>((set, get) => ({
  x: 0,
  targetX: 0,
  canvasWidth: 0,

  setCanvasWidth: (w) => set({ canvasWidth: w }),

  moveLeft: () => {
    const { targetX, canvasWidth } = get();
    const half = BACKPACK_WIDTH / 2;
    const margin = MOVE_DISTANCE;
    const next = targetX - MOVE_DISTANCE;
    set({ targetX: Math.max(next, -canvasWidth / 2 + half - margin) });
  },

  moveRight: () => {
    const { targetX, canvasWidth } = get();
    const half = BACKPACK_WIDTH / 2;
    const margin = MOVE_DISTANCE;
    const next = targetX + MOVE_DISTANCE;
    set({ targetX: Math.min(next, canvasWidth / 2 - half + margin) });
  },

  tick: () => {
    const { x, targetX } = get();
    const dx = targetX - x;
    const speed = 6;

    if (Math.abs(dx) < 1) {
      set({ x: targetX });
    } else {
      set({ x: x + dx / speed });
    }
  },
  reset: () => {
    set({ x: 0, targetX: 0, canvasWidth: 0 });
  },
}));
