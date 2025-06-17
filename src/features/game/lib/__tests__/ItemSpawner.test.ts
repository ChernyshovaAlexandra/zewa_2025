import { describe, it, expect, vi } from 'vitest';

vi.mock('../../constants/items', () => {
  const catalog = {
    a: { kind: 'a', texture: '', radius: 5, width: 10, height: 10, isGood: true, spawnWeight: 1 },
    b: { kind: 'b', texture: '', radius: 5, width: 10, height: 10, isGood: true, spawnWeight: 1, spawnLimit: 1 },
  } as const;
  type Keys = keyof typeof catalog;
  return { ITEM_CATALOG: catalog, type: {} as { ItemKind: Keys } };
});

import { ItemSpawner } from '../ItemSpawner';

describe('ItemSpawner', () => {
  it('respects spawn weights', () => {
    const spawner = new ItemSpawner(100, [], { a: 0, b: 0 });
    const item = spawner.spawnItem();
    expect(item?.kind).toBeDefined();
    expect(['a', 'b']).toContain(item!.kind);
  });

  it('respects spawn limits', () => {
    const spawner = new ItemSpawner(100, [], { b: 1 });
    const result = spawner.spawnItem();
    // only a should be spawned because b reached limit
    expect(result?.kind).toBe('a');
  });
});
