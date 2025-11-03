import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach, expect, type Mock } from 'vitest';

import { BackpackControls } from '../BackpackControls';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';
import { useCoinAnimationStore } from '@/features/back-to-school-game/model/coinAnimationStore';

vi.mock('@/features/back-to-school-game/model/coinAnimationStore', () => ({
  useCoinAnimationStore: vi.fn(() => ({ flyingCoins: [] })),
}));

describe('BackpackControls', () => {
  const moveLeft = vi.fn();
  const moveRight = vi.fn();

  beforeEach(() => {
    moveLeft.mockClear();
    moveRight.mockClear();
    useGameModelStore.setState({
      moveLeft,
      moveRight,
      isGameStarted: true,
    });
    (useCoinAnimationStore as unknown as Mock).mockReturnValue({ flyingCoins: [] });
  });

  it('calls move actions on buttons click', async () => {
    const { container } = render(<BackpackControls />);
    const buttons = container.querySelectorAll('div');
    await userEvent.click(buttons[1]);
    expect(moveLeft).toHaveBeenCalled();
    await userEvent.click(buttons[2]);
    expect(moveRight).toHaveBeenCalled();
  });
});
