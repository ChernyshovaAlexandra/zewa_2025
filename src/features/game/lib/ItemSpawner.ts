import { ITEM_CATALOG, type ItemKind } from '@/features/game/constants/items';
import type { Item } from '@/features/game/model/gameModelStore';

export class ItemSpawner {
  private canvasWidth: number;
  private existingItems: { x: number; y: number; radius: number }[];
  private spawnCounts: Record<ItemKind, number>;

  constructor(
    canvasWidth: number,
    existingItems: { x: number; y: number; radius: number }[],
    spawnCounts: Record<ItemKind, number>,
  ) {
    this.canvasWidth = canvasWidth;
    this.existingItems = existingItems;
    this.spawnCounts = spawnCounts;
  }

  private buildWeightedPool(): ItemKind[] {
    return (Object.keys(ITEM_CATALOG) as ItemKind[]).flatMap((kind) => {
      const meta = ITEM_CATALOG[kind];
      const count = this.spawnCounts[kind] || 0;
      if (meta.spawnLimit && count >= meta.spawnLimit) return [];
      const weight = meta.spawnWeight ?? 1;
      return Array(Math.floor(weight * 10)).fill(kind);
    });
  }

  private getRandomKind(pool: ItemKind[]): ItemKind | null {
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  public spawnItem(): { item: Item; kind: ItemKind } | null {
    const pool = this.buildWeightedPool();
    const kind = this.getRandomKind(pool);
    if (!kind) return null;

    const meta = ITEM_CATALOG[kind];
    const radius = meta.radius;
    const halfWidth = meta.width / 2;
    const SIDE_MARGIN = 5;
    const minX = SIDE_MARGIN + halfWidth;
    const maxX = this.canvasWidth - halfWidth - SIDE_MARGIN;

    for (let attempt = 0; attempt < 10; attempt++) {
      const x = minX + Math.random() * (maxX - minX);
      const y = -radius;

      const overlaps = this.existingItems.some((o) => {
        const dx = o.x - x;
        const dy = o.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < o.radius + radius + 10;
      });

      if (!overlaps) {
        return {
          kind,
          item: {
            id: `${Date.now()}-${Math.random()}`,
            kind,
            x,
            y,
            radius,
            speed: 3,
            attachedOffsetX: null,
          },
        };
      }
    }

    return null;
  }
}
