import type { Item } from './gameModelStore';
import { handleCaughtItem, handleMissedItem, getItemMeta, checkCollision, moveCaughtItem } from './gameLogicHelper';
import type { useGameModelStore } from './gameModelStore';

export function handleItemCatch(
  item: Item,
  backpack: { x: number; y: number; width: number; height: number },
  canvasHeight: number,
  state: ReturnType<typeof useGameModelStore.getState>,
): Item {
  const MISS_LINE_Y = canvasHeight - 10;

  if (item.caught) return moveCaughtItem(item);

  const meta = getItemMeta(item);
  const caught = checkCollision(item, backpack);

  if (!caught) {
    return handleMissedItem(item, meta, MISS_LINE_Y, state);
  }

  // Center the item horizontally inside the backpack
  const offsetX = 0;
  const caughtItem = handleCaughtItem(item, meta, offsetX, state, backpack);
  return { ...caughtItem, x: backpack.x };
}
