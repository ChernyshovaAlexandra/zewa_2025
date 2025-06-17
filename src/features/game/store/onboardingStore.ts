import { create } from 'zustand';
import { useGameStateStore } from './gameStore';

interface OnboardingState {
  step: number;
  isVisible: boolean;
  start: () => void;
  next: () => void;
  skip: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  step: 0,
  isVisible: false,
  start: () => set({ isVisible: true, step: 0 }),
  next: () => set((s) => ({ step: s.step + 1 })),
  skip: () => {
    const startGame = useGameStateStore.getState().startGame;
    set({
      isVisible: false,
    });
    startGame();
  },
  reset: () => set({ step: 0, isVisible: false }),
}));
