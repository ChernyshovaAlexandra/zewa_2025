import { create } from 'zustand';

const MEMO_ONBOARDING_KEY = 'memoOnboardingSeen';

const hasSeenOnboarding = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(MEMO_ONBOARDING_KEY) === 'true';
  } catch {
    return false;
  }
};

const markOnboardingSeen = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(MEMO_ONBOARDING_KEY, 'true');
  } catch {
    // ignore storage errors
  }
};

interface MemoOnboardingState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  complete: () => void;
}

export const useMemoOnboardingStore = create<MemoOnboardingState>((set) => ({
  isVisible: !hasSeenOnboarding(),
  show: () =>
    set(() => ({
      isVisible: !hasSeenOnboarding(),
    })),
  hide: () => set({ isVisible: false }),
  complete: () => {
    markOnboardingSeen();
    set({ isVisible: false });
  },
}));
