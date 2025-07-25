/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGameTicker } from '../lib/hooks/useGameTicker';
import { useGameModelStore } from '../model/gameModelStore';

let tickCallback: (delta: number) => void = () => {};
vi.mock('@pixi/react', () => ({
  useTick: (fn: (d: number) => void) => {
    tickCallback = fn;
  },
}));

const isIntersectingMock = vi.fn();
vi.mock('../lib/collision', () => ({
  isIntersecting: (...args: any[]) => isIntersectingMock(...args),
}));

const ADD_STEPS = 97; // ~1600ms

const createItem = (y: number) => ({
  id: `item${spawnCount}`,
  kind: 'ball' as const,
  x: 50,
  y,
  radius: 10,
  speed: 0,
  attachedOffsetX: null,
});

let spawnCount = 0;
const addItem = vi.fn(() => {
  const y = spawnCount === 0 ? 50 : 201;
  const item = createItem(y);
  useGameModelStore.setState((s) => ({ items: [...s.items, item] }));
  spawnCount += 1;
});

const spawnCoin = vi.fn();

describe('game restart flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    spawnCount = 0;
    useGameModelStore.getState().resetGame();
    useGameModelStore.setState({
      addItem,
      spawnCoin,
      canvasWidth: 100,
      isPaused: false,
      isGameStarted: true,
    });
    isIntersectingMock.mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('spawns items and applies logic after reset', () => {
    renderHook(() => useGameTicker(100, 200));
    for (let i = 0; i < ADD_STEPS; i++) {
      tickCallback(1);
    }
    expect(useGameModelStore.getState().score).toBe(1);

    useGameModelStore.getState().stopGame();
    useGameModelStore.getState().resetGame();
    useGameModelStore.setState({ addItem, spawnCoin, isPaused: false });
    isIntersectingMock.mockReturnValue(false);
    useGameModelStore.getState().startGame();

    for (let i = 0; i < ADD_STEPS; i++) {
      tickCallback(1);
    }
    expect(useGameModelStore.getState().lives).toBe(2);
  });
});
