import { create } from 'zustand';

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
  skip: () => set({ isVisible: false }),
  reset: () => set({ step: 0, isVisible: false }),
}));
