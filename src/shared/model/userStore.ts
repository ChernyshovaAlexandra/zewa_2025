import { create } from 'zustand';

interface User {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

interface UserStore {
  user: User | null;
  coins: number;
  /**
   * Data returned from `/api/start` endpoint.
   */
  startData: unknown | null;
  setUser: (user: User) => void;
  setStartData: (data: unknown) => void;
  addCoins: (amount: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  coins: 0,
  startData: null,
  setUser: (user) => set({ user }),
  setStartData: (data) => set({ startData: data }),
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  reset: () => set({ user: null, coins: 0, startData: null }),
}));
