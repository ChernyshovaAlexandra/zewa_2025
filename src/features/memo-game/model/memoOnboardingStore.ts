import { create } from 'zustand';

interface MemoOnboardingState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export const useMemoOnboardingStore = create<MemoOnboardingState>((set) => ({
  isVisible: true,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));
