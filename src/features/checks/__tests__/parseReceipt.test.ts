import { describe, it, expect } from 'vitest';
import { parseReceipt } from '../lib/parseReceipt';

describe('parseReceipt', () => {
  it('parses valid receipt', () => {
    const raw = '{"date":"2025-06-18","totalSum":123,"shopId":"123456"}';
    expect(parseReceipt(raw)).toEqual({ date: '2025-06-18', totalSum: 123, shopId: '123456' });
  });

  it('throws on invalid json', () => {
    expect(() => parseReceipt('not-json')).toThrow();
  });

  it('throws on missing fields', () => {
    expect(() => parseReceipt('{"date":"2025-06-18"}')).toThrow();
  });

  it('throws on invalid shopId', () => {
    const raw = '{"date":"2025-06-18","totalSum":123,"shopId":"abc"}';
    expect(() => parseReceipt(raw)).toThrow();
  });
});
