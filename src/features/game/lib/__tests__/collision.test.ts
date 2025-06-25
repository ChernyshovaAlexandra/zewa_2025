import { describe, it, expect } from 'vitest';
import { isIntersecting } from '../collision';

describe('isIntersecting', () => {
  it('returns true when circle intersects rectangle', () => {
    const result = isIntersecting(50, 50, 10, 55, 55, 20, 20);
    expect(result).toBe(true);
  });

  it('returns false when circle is far from rectangle', () => {
    const result = isIntersecting(0, 0, 5, 100, 100, 10, 10);
    expect(result).toBe(false);
  });
});
