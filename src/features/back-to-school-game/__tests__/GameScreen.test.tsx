import { render } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { GameScreen } from '../GameScreen';
import { useGameModelStore } from '../model/gameModelStore';

class RO {
  observe() {}
  disconnect() {}
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ResizeObserver = RO;

vi.mock('../lib', () => ({
  renderGameOverModal: vi.fn(),
  renderPauseModal: vi.fn(),
  useHowToPlayEntry: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

const { renderGameOverModal } = await import('../lib');

describe('GameScreen', () => {
  it('calls renderGameOverModal when game over', () => {
    useGameModelStore.setState({ isGameOver: true, score: 5 });
    render(<GameScreen />);
    expect(renderGameOverModal).toHaveBeenCalledWith(5, expect.any(Function));
  });
});
