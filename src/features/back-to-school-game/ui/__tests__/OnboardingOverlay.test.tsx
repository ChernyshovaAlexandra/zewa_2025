import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, beforeEach } from 'vitest';
import { OnboardingOverlay } from '../OnboardingOverlay';
import { useOnboardingStore } from '@/features/back-to-school-game/model/onboardingStore';
import { useGameModelStore } from '@/features/back-to-school-game/model/gameModelStore';

const startGame = vi.fn();

beforeEach(() => {
  useGameModelStore.setState({ startGame });
});

describe('OnboardingOverlay', () => {
  it('does not render when hidden', () => {
    useOnboardingStore.setState({ isVisible: false, step: 0 });
    const { container } = render(<OnboardingOverlay />);
    expect(container.firstChild).toBeNull();
  });

  it('shows last screen and starts game on click', async () => {
    useOnboardingStore.setState({ isVisible: true, step: 3 });
    const { container } = render(<OnboardingOverlay />);
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(startGame).toHaveBeenCalled();
    expect(useOnboardingStore.getState().isVisible).toBe(false);
  });
});
