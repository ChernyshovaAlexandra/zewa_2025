import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGameTicker } from '../useGameTicker';
import { useGameModelStore } from '@/features/game/model/gameModelStore';

let tickCallback: (delta: number) => void = () => {};
vi.mock('@pixi/react', () => ({
  useTick: (fn: (d: number) => void) => {
    tickCallback = fn;
  },
}));

describe('useGameTicker', () => {
  const moveItems = vi.fn();
  const addItem = vi.fn();
  const spawnCoin = vi.fn();
  const pauseGame = vi.fn();
  const resumeGame = vi.fn();

  beforeEach(() => {
    useGameModelStore.setState({
      moveItems,
      addItem,
      spawnCoin,
      pauseGame,
      resumeGame,
      isPaused: false,
      isGameStarted: true,
    });
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('spawns item every 1600ms', () => {
    renderHook(() => useGameTicker(100, 200, () => {}));
    for (let i = 0; i < 96; i++) {
      tickCallback(1); // ~16.6ms each
    }
    expect(moveItems).toHaveBeenCalled();
    const spawns = addItem.mock.calls.length + spawnCoin.mock.calls.length;
    expect(spawns).toBeGreaterThan(0);
  });

  it('handles visibility change pause and resume', () => {
    renderHook(() => useGameTicker(100, 200, () => {}));

    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(pauseGame).toHaveBeenCalled();

    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(resumeGame).toHaveBeenCalled();
  });

  it('does not resume when already paused', () => {
    useGameModelStore.setState({ isPaused: true });
    renderHook(() => useGameTicker(100, 200, () => {}));

    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(resumeGame).not.toHaveBeenCalled();

    window.dispatchEvent(new Event('focus'));
    expect(resumeGame).not.toHaveBeenCalled();
  });
});
