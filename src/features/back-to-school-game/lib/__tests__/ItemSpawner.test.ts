// tests/ItemSpawner.spec.ts

import { describe, it, expect, vi } from 'vitest';
import type { ItemKind, ItemMeta } from '../../constants/items';
import { ItemSpawner } from '../ItemSpawner';

// Мокаем модуль с ITEM_CATALOG, используя реальные ключи из ItemKind
vi.mock('../../constants/items', () => {
  const catalog = {
    apple: {
      kind: 'apple',
      texture: '',
      radius: 5,
      scale: 1,
      width: 10,
      height: 10,
      isGood: true,
      spawnWeight: 1,
    },
    ball: {
      kind: 'ball',
      texture: '',
      radius: 5,
      scale: 1,
      width: 10,
      height: 10,
      isGood: true,
      spawnWeight: 1,
      spawnLimit: 1,
    },
  } as const; // 'apple' | 'ball'
  return {
    ITEM_CATALOG: catalog as unknown as Record<ItemKind, ItemMeta>,
  };
});

describe('ItemSpawner', () => {
  it('учитывает веса спавна', () => {
    // оба элемента могут заспавниться
    const limits = { pen: 0, ball: 0 } as Record<ItemKind, number>;
    const spawner = new ItemSpawner(100, 100, [], limits);

    const item = spawner.spawnItem();
    expect(item).toBeDefined();
    expect(['apple', 'ball']).toContain(item!.kind);
  });

  it('не спавнит элемент, если достигнут его лимит', () => {
    // лимит для ball = 1, значит только apple
    const limits = { pen: 0, ball: 1 } as Record<ItemKind, number>;
    const spawner = new ItemSpawner(100, 100, [], limits);

    const result = spawner.spawnItem();
    expect(result).toBeDefined();
    expect(result!.kind).toBe('apple');
  });
});
