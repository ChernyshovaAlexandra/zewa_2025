import { create } from 'zustand';
import { BASE_SPEED, ItemSpawner } from '../lib/ItemSpawner';
import type { ItemKind } from '../constants/items';
export interface Item {
  id: string;
  kind: ItemKind | SpecialItemKind;
  x: number;
  y: number;
  radius: number;
  missed?: boolean;
  speed: number;
  attachedOffsetX: number | null;
  caught?: boolean;
}
import { handleItemCatch } from './itemLogic';
import { BACKPACK_HEIGHT, BACKPACK_WIDTH } from './backpack';
import { useGameProgressStore } from './useGameProgressStore';
import { useOnboardingStore } from './onboardingStore';
import { useCoinAnimationStore } from './coinAnimationStore';

export type SpecialItemKind = 'coin';

interface GameModelState {
  isGameStarted: boolean;
  score: number;
  coins_available: number;
  coins: number;
  lives: number;
  isGameOver: boolean;
  isPaused: boolean;
  wasNavigatedToRules: boolean;
  setX: (x: number) => void;
  dragging: boolean;
  setGameOver: (v: boolean) => void;
  setWasNavigatedToRules: (v: boolean) => void;
  startGame: () => void;
  stopGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  addScore: () => void;
  addCoin: () => void;
  loseLife: () => void;
  resetLives: () => void;
  resetScore: () => void;
  setAvailableCoins: (coins: number) => void;
  flashCount: number;
  flashOverlay: boolean;
  triggerFlash: (times?: number) => void;
  updateFlash: (delta: number) => void;

  items: Item[];
  spawnCounts: Record<ItemKind, number>;
  spawnedCoinsCount: number;
  addItem: (canvasWidth: number, canvasHeight: number) => void;
  spawnCoin: (canvasWidth: number, canvasHeight: number, dtMs: number) => void;
  moveItems: (canvasHeight: number, dtMs: number) => void;
  markAsCaught: (id: string) => void;
  resetItems: () => void;

  x: number;
  targetX: number;
  canvasWidth: number;
  setCanvasWidth: (w: number) => void;
  moveLeft: () => void;
  moveRight: () => void;
  tick: () => void;
  resetBackpack: () => void;
  resetGame: () => void;
  setDragging: (v: boolean) => void;
  setTargetX: (valueOrUpdater: number | ((prev: number) => number)) => void;
}
export const game_id = 'back_to_school';

export const useGameModelStore = create<GameModelState>((set, get) => ({
  isGameStarted: false,
  score: 0,
  coins: 0,
  coins_available: 0,
  lives: 3,
  dragging: false,
  isGameOver: false,
  isPaused: false,
  wasNavigatedToRules: false,
  flashCount: 0,
  flashOverlay: false,
  setX: (newX: number) => set({ x: newX }),
  setTargetX: (valueOrUpdater: number | ((prev: number) => number)) =>
    set((state) => {
      const prev = state.targetX;
      const raw =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: number) => number)(prev)
          : (valueOrUpdater as number);

      const half = BACKPACK_WIDTH / 2;
      const min = -state.canvasWidth / 2 + half;
      const max = state.canvasWidth / 2 - half;
      const targetX = Math.max(min, Math.min(raw, max));

      return { targetX };
    }),
  setGameOver: (v) => set({ isGameOver: v }),
  setWasNavigatedToRules: (v) => set({ wasNavigatedToRules: v }),
  startGame: () => set({ isGameStarted: true }),
  stopGame: () => set({ isGameStarted: false }),
  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  addScore: () => set((s) => ({ score: s.score + 1 })),
  addCoin: () => set((s) => ({ coins: s.coins + 1 })),
  loseLife: () => set((s) => ({ lives: Math.max(0, s.lives - 1) })),
  resetScore: () => set({ score: 0 }),
  resetLives: () => set({ lives: 3 }),
  setAvailableCoins: (coins: number) => set({ coins_available: coins }),

  items: [],
  spawnCounts: {} as Record<ItemKind, number>,
  spawnedCoinsCount: 0,
  resetItems: () =>
    set({
      items: [],
      spawnCounts: {} as Record<ItemKind, number>,
      spawnedCoinsCount: 0,
      flashOverlay: false,
      flashCount: 0,
    }),
  addItem: (canvasWidth, canvasHeight) => {
    const others = get().items.map(({ x, y, radius }) => ({ x, y, radius }));
    const spawnCounts = get().spawnCounts;
    const spawner = new ItemSpawner(canvasHeight, canvasWidth, others, spawnCounts);
    const result = spawner.spawnItem();
    if (!result) return;
    const { item, kind } = result;
    set((s) => ({
      items: [...s.items, item],
      spawnCounts: { ...s.spawnCounts, [kind]: (s.spawnCounts[kind] || 0) + 1 },
    }));
  },
  moveItems: (canvasHeight, dtMs) => {
    const { x, canvasWidth } = get();
    const speedCoef = dtMs / 18;
    const backpack = {
      x: canvasWidth / 2 + x,
      y: canvasHeight - BACKPACK_HEIGHT / 2 - 20,
      width: BACKPACK_WIDTH,
      height: BACKPACK_HEIGHT,
    };
    const state = get();
    set((s) => {
      const updated = s.items
        .map((item) => {
          if (item.attachedOffsetX !== null) {
            if (item.kind === 'coin') return null;
            return { ...item, x: backpack.x + item.attachedOffsetX, y: backpack.y - item.radius };
          }
          const falling = { ...item, y: item.y + item.speed * speedCoef };
          return handleItemCatch(falling, backpack, canvasHeight, state);
        })
        .filter(
          (item): item is Item =>
            !!item && (item.kind !== 'coin' || !item.caught) && item.y - item.radius < canvasHeight,
        );
      return { items: updated };
    });
  },
  spawnCoin: (canvasWidth, canvasHeight, dtMs) => {
    const { spawnedCoinsCount, coins_available } = get();
    if (spawnedCoinsCount >= coins_available) return;
    const radius = 24;
    const x = Math.random() * (canvasWidth - radius * 2) + radius;
    const y = -radius;
    const speedCoef = dtMs / 18;
    const speed = BASE_SPEED * canvasHeight * speedCoef;
    const coinItem: Item = {
      id: `coin-${Date.now()}`,
      kind: 'coin',
      x,
      y,
      radius,
      speed,
      attachedOffsetX: null,
    };
    set((s) => ({ items: [...s.items, coinItem], spawnedCoinsCount: s.spawnedCoinsCount + 1 }));
  },
  markAsCaught: (id) =>
    set((s) => ({
      items: s.items.map((item) => (item.id === id ? { ...item, caught: true } : item)),
    })),
<<<<<<< HEAD

=======
>>>>>>> develop
  setDragging: (v: boolean) => set({ dragging: v }),
  x: 0,
  targetX: 0,
  canvasWidth: 0,
  setCanvasWidth: (w) => set({ canvasWidth: w }),
  moveLeft: () => {
    const { targetX, canvasWidth } = get();
    const half = BACKPACK_WIDTH / 2;
    const margin = 25;
    const next = targetX - 25;
    set({ targetX: Math.max(next, -canvasWidth / 2 + half - margin), dragging: false });
  },
  moveRight: () => {
    const { targetX, canvasWidth } = get();
    const half = BACKPACK_WIDTH / 2;
    const margin = 25;
    const next = targetX + 25;
    set({ targetX: Math.min(next, canvasWidth / 2 - half + margin), dragging: false });
  },
  tick: () => {
    const { x, targetX, dragging } = get();
    const dx = targetX - x;
    const speed = dragging ? 1 : 6;

    if (Math.abs(dx) < 1) {
      set({ x: targetX });
    } else {
      set({ x: x + dx / speed });
    }
  },
  resetBackpack: () => {
    const width = get().canvasWidth;
    set({ x: 0, targetX: 0, canvasWidth: width, dragging: false });
  },

  resetGame: () => {
    get().resetItems();
    get().resetBackpack();
    useOnboardingStore.getState().reset();
    useCoinAnimationStore.getState().reset();
    useGameProgressStore.getState().resetSession();
    sessionStorage.removeItem('cameFromRules');
    set(() => ({
      score: 0,
      coins: 0,
      lives: 3,
      isGameOver: false,
      isGameStarted: false,
      isPaused: false,
      wasNavigatedToRules: false,
    }));
  },
  triggerFlash: (times = 3) =>
    set({
      flashCount: times * 2,
      flashOverlay: true,
    }),

  updateFlash: (dtMs) =>
    set((state) => {
      const FRAME_INTERVAL_MS = 80;
      if (state.flashCount <= 0) return {};

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let timer = (state as any)._flashTimer || 0;
      timer += dtMs;
      if (timer >= FRAME_INTERVAL_MS) {
        const nextCount = state.flashCount - 1;
        return {
          flashCount: nextCount,
          flashOverlay: nextCount > 0 ? !state.flashOverlay : false,
          _flashTimer: timer - FRAME_INTERVAL_MS,
        };
      }
      return { _flashTimer: timer };
    }),
}));
