import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MemoGameProgressState {
  hasHydrated: boolean;
  hasSeenHowToPlay: boolean;
  hasCompletedOnboarding: boolean;
  isOnboardingVisible: boolean;
  markHowToPlaySeen: () => void;
  resetHowToPlay: () => void;
  startOnboarding: () => void;
  finishOnboarding: () => void;
}

export const useMemoGameProgressStore = create<MemoGameProgressState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      hasSeenHowToPlay: false,
      hasCompletedOnboarding: false,
      isOnboardingVisible: false,
      markHowToPlaySeen: () => set({ hasSeenHowToPlay: true }),
      resetHowToPlay: () => set({ hasSeenHowToPlay: false }),
      startOnboarding: () => set({ isOnboardingVisible: true }),
      finishOnboarding: () =>
        set({ isOnboardingVisible: false, hasCompletedOnboarding: true }),
    }),
    {
      name: 'zewa_memo_game_progress',
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          useMemoGameProgressStore.setState({ hasHydrated: true });
        }, 0);
      },
    },
  ),
);
