import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameProgressState {
  hasPlayedEver: boolean;
  hasPlayedSession: boolean;
  hasHydrated: boolean;
  setHasPlayedEver: (v: boolean) => void;
  setHasPlayedSession: (v: boolean) => void;
  resetSession: () => void;
}

export const useGameProgressStore = create<GameProgressState>()(
  persist(
    (set) => ({
      hasPlayedEver: false,
      hasPlayedSession: false,
      hasHydrated: false,
      setHasPlayedEver: (v) => set({ hasPlayedEver: v }),
      setHasPlayedSession: (v) => set({ hasPlayedSession: v }),
      resetSession: () => set({ hasPlayedSession: false }),
    }),
    {
      name: 'zewa_game_progress',
      onRehydrateStorage: () => () => {
        setTimeout(() => {
          useGameProgressStore.setState({ hasHydrated: true });
        }, 0);
      },
      partialize: (state) => ({
        hasPlayedEver: state.hasPlayedEver,
      }),
    },
  ),
);
