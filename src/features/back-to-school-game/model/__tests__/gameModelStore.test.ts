import { describe, it, beforeEach, expect } from 'vitest';
import { useGameModelStore } from '../gameModelStore';

beforeEach(() => {
  useGameModelStore.getState().resetGame();
});

describe('useGameModelStore', () => {
  it('initializes default values', () => {
    const state = useGameModelStore.getState();
    expect(state.score).toBe(0);
    expect(state.coins).toBe(0);
    expect(state.lives).toBe(3);
  });

  it('updates score and coins', () => {
    const { addScore, addCoin } = useGameModelStore.getState();
    addScore();
    addScore();
    addCoin();
    expect(useGameModelStore.getState().score).toBe(2);
    expect(useGameModelStore.getState().coins).toBe(1);
  });

  it('handles life decrement and game over', () => {
    const { loseLife } = useGameModelStore.getState();
    loseLife();
    loseLife();
    loseLife();
    expect(useGameModelStore.getState().lives).toBe(0);
  });
});
