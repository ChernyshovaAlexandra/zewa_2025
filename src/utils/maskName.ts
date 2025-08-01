/**
 * Маскирует имя, оставляя в начале и в конце по несколько символов, а между — звёздочки.
 * - Для имён длиной ≤ visibleStart + visibleEnd возвращает само имя (без звёздочек).
 * - Иначе: показывает первые visibleStart и последние visibleEnd символы, между ними — звёздочки.
 */
export function maskName(name: string, visibleStart: number = 3, visibleEnd: number = 0): string {
  if (!name) return 'unknown';
  const len = name.length;

  // если имя слишком короткое — не маскируем
  if (len <= visibleStart + visibleEnd) {
    return name;
  }

  const start = name.slice(0, visibleStart);
  const end = visibleEnd > 0 ? name.slice(len - visibleEnd) : '';
  const maskedMiddle = '*'.repeat(len - visibleStart - visibleEnd);

  return `${start}${maskedMiddle}${end}`;
}

export function smartMaskName(name: string): string {
  const len = name.length;
  if (len <= 6) return maskName(name, 2, 0);
  return maskName(name, 4, 1);
}
