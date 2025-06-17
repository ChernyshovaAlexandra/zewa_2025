import { ITEM_CATALOG, type ItemMeta } from '@/features/game/constants/items';
import { useCoinAnimationStore } from '@/features/game/store/coinAnimationStore';
import type { useGameStateStore } from '@/features/game/store/gameStore';
import type { Item } from '@/features/game/store/itemStore';
import { isIntersecting } from './collision';
import { getPixiCoordsFromDOM } from './getPixiCoordsFromDOM';

export function moveCaughtItem(item: Item): Item {
  return { ...item, y: item.y + item.speed };
}

export function getItemMeta(item: Item): ItemMeta | undefined {
  return item.kind !== 'coin' ? ITEM_CATALOG[item.kind] : undefined;
}

export function checkCollision(
  item: Item,
  backpack: { x: number; y: number; width: number; height: number },
): boolean {
  return isIntersecting(
    item.x,
    item.y,
    item.radius,
    backpack.x,
    backpack.y,
    backpack.width,
    backpack.height,
  );
}

export function handleMissedItem(
  item: Item,
  meta: ItemMeta | undefined,
  MISS_LINE_Y: number,
  state: ReturnType<typeof useGameStateStore.getState>,
): Item {
  if (item.kind !== 'coin' && meta?.isGood && !item.missed && item.y - item.radius > MISS_LINE_Y) {
    applyLifeLoss(state);
    return { ...item, y: item.y + item.speed, missed: true };
  }

  return { ...item, y: item.y + item.speed };
}

export function handleCaughtItem(
  item: Item,
  meta: ItemMeta | undefined,
  offsetX: number,
  state: ReturnType<typeof useGameStateStore.getState>,
  backpack: { x: number; y: number; width: number; height: number },
): Item {
  const { addScore } = state;

  if (item.kind === 'coin') {
    processCoinCatch(item, state);
  } else if (meta?.isGood) {
    addScore();
  } else {
    applyLifeLoss(state);
  }

  return {
    ...item,
    y: backpack.y - 10,
    speed: 0,
    attachedOffsetX: offsetX,
    caught: true,
  };
}

export function processCoinCatch(
  item: Item,
  state: ReturnType<typeof useGameStateStore.getState>,
): void {
  state.addCoin();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetEl = (window as any).__coinTarget as HTMLElement | undefined;
  if (!targetEl) return;

  const from = { x: item.x, y: item.y };
  const to = getPixiCoordsFromDOM(targetEl);
  useCoinAnimationStore.getState().launchCoin(from, to);
}

export function applyLifeLoss(state: ReturnType<typeof useGameStateStore.getState>): void {
  const { lives, loseLife, stopGame, setGameOver } = state;
  if (lives <= 1) {
    loseLife();
    stopGame();
    requestAnimationFrame(() => setGameOver(true));
  } else {
    loseLife();
  }
}
