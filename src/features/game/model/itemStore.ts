import { create } from 'zustand';
import { type ItemKind } from '@/features/game/constants/items';
import { ItemSpawner, getBackpackRect, handleItemCatch } from '@/features/game/lib';

export type SpecialItemKind = 'coin';

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
export const MAX_COINS_PER_GAME = 10;

interface ItemState {
  items: Item[];
  addItem: (canvasWidth: number) => void;
  addCoin: (canvasWidth: number) => void;
  moveItems: (canvasHeight: number) => void;
  spawnCounts: Record<ItemKind, number>;
  markAsCaught: (id: string) => void;
  spawnedCoinsCount: number;
  reset: () => void;
}

export const useItemStore = create<ItemState>((set, get) => ({
  items: [],
  spawnCounts: {} as Record<ItemKind, number>,
  spawnedCoinsCount: 0,
  reset: () =>
    set({ items: [], spawnCounts: {} as Record<ItemKind, number>, spawnedCoinsCount: 0 }),
  addItem: (canvasWidth) => {
    const others = get().items.map(({ x, y, radius }) => ({ x, y, radius }));
    const spawnCounts = get().spawnCounts;

    const spawner = new ItemSpawner(canvasWidth, others, spawnCounts);
    const result = spawner.spawnItem();
    if (!result) return;

    const { item, kind } = result;
    set((s) => ({
      items: [...s.items, item],
      spawnCounts: {
        ...s.spawnCounts,
        [kind]: (s.spawnCounts[kind] || 0) + 1,
      },
    }));
  },
  addCoin: (canvasWidth) => {
    const { spawnedCoinsCount } = get();
    if (spawnedCoinsCount >= MAX_COINS_PER_GAME) return;

    const radius = 24;
    const x = Math.random() * (canvasWidth - radius * 2) + radius;
    const y = -radius;
    const speed = 2 + Math.random();

    const coinItem: Item = {
      id: `coin-${Date.now()}`,
      kind: 'coin',
      x,
      y,
      radius,
      speed,
      attachedOffsetX: null,
    };

    set((s) => ({
      items: [...s.items, coinItem],
      spawnedCoinsCount: s.spawnedCoinsCount + 1,
    }));
  },
  markAsCaught: (id: string) =>
    set((s) => ({
      items: s.items.map((item) => (item.id === id ? { ...item, caught: true } : item)),
    })),
  moveItems: (canvasHeight) => {
    const backpack = getBackpackRect(canvasHeight);

    set((s) => {
      const updated = s.items
        .map((item) => {
          if (item.attachedOffsetX !== null) {
            if (item.kind === 'coin') return null;

            return {
              ...item,
              x: backpack.x + item.attachedOffsetX,
              y: backpack.y - item.radius,
            };
          }

          return handleItemCatch(item, backpack, canvasHeight);
        })
        .filter(
          (item): item is Item =>
            !!item && (item.kind !== 'coin' || !item.caught) && item.y - item.radius < canvasHeight,
        );
      return { items: updated };
    });
  },
}));
