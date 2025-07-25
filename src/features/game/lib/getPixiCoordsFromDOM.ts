export function getPixiCoordsFromDOM(el: HTMLElement): { x: number; y: number } {
  const bounds = el.getBoundingClientRect();
  const canvas = document.querySelector('canvas');

  if (!canvas) return { x: 0, y: 0 };

  const canvasBounds = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio;

  const localX = bounds.left + bounds.width / 2 - canvasBounds.left;
  const localY = bounds.top + bounds.height / 2 - canvasBounds.top;

  return {
    x: localX,
    y: localY,
  };
}
