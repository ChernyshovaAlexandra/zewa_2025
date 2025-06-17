import { useGameStateStore } from '@/features/game/model/gameStore';
import { type Item } from '@/features/game/model/itemStore';
import {
  checkCollision,
  getItemMeta,
  handleCaughtItem,
  handleMissedItem,
  moveCaughtItem,
} from './gameLogicHelper';

export function handleItemCatch(
  item: Item,
  backpack: { x: number; y: number; width: number; height: number },
  canvasHeight: number,
): Item {
  const MISS_LINE_Y = canvasHeight - 10;
  const state = useGameStateStore.getState();

  // 1) Если уже пойман — просто двигаем вместе с рюкзаком
  if (item.caught) return moveCaughtItem(item);

  // 2) Получаем метаданные и проверяем столкновение
  const meta = getItemMeta(item);
  const caught = checkCollision(item, backpack);

  // 3) Если не пойман — обрабатываем промах
  if (!caught) {
    return handleMissedItem(item, meta, MISS_LINE_Y, state);
  }

  // 4) Если пойман — обрабатываем по типу
  const offsetX = item.x - backpack.x;
  return handleCaughtItem(item, meta, offsetX, state, backpack);
}
