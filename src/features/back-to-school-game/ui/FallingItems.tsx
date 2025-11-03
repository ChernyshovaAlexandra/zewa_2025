import { Sprite } from '@pixi/react';
import { GlowFilter } from '@pixi/filter-glow';
import { coinMeta, ITEM_CATALOG } from '@/features/back-to-school-game/constants/items';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';
import { GlowingCoin } from './GlowingCoin';

export const FallingItems = () => {
  const items = useGameModelStore((s) => s.items);

  return (
    <>
      {items.map((item) => {
        const meta = item.kind === 'coin' ? coinMeta : ITEM_CATALOG[item.kind];
        if (item.kind === 'coin') {
          return <GlowingCoin key={item.id} x={item.x} y={item.y} size={item.radius * 2} />;
        }
        const filters = !meta.isGood
          ? [
              new GlowFilter({
                color: 0xf23177,
                distance: 20,
                outerStrength: 1,
                innerStrength: 0,
                alpha: 0.9,
              }),
            ]
          : [];

        return (
          <Sprite
            key={item.id}
            image={meta.texture}
            x={item.x}
            y={item.y}
            anchor={0.5}
            width={meta.width}
            height={meta.height}
            filters={filters}
          />
        );
      })}
    </>
  );
};
