import { vi, describe, it, expect, beforeEach } from 'vitest';
import { scheduleGameOverModal } from './scheduleGameOverModal';
import { GAME_OVER_DELAY_MS } from '../constants/gameSettings';
import { renderGameOverModal } from './renderGameOverModal';

vi.mock('./renderGameOverModal');

describe('scheduleGameOverModal', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
  });

  it('calls renderGameOverModal after delay', () => {
    const navigate = vi.fn();
    scheduleGameOverModal(42, navigate);

    vi.advanceTimersByTime(GAME_OVER_DELAY_MS - 1);
    expect(renderGameOverModal).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(renderGameOverModal).toHaveBeenCalledWith(42, navigate);
  });
});
