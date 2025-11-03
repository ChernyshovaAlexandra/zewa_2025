export const isIntersecting = (
  itemX: number,
  itemY: number,
  itemR: number,
  backpackX: number,
  backpackY: number,
  backpackWidth: number,
  backpackHeight: number,
): boolean => {
  const dx = Math.abs(itemX - backpackX);
  const dy = Math.abs(itemY - backpackY);
  return dx < backpackWidth / 2 + itemR && dy < backpackHeight / 2 + itemR;
};
