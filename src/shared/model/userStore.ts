import { UserData, UserInfo } from '@/types';
import { create } from 'zustand';
import type { StartResponse } from '@/types';

interface UserStore {
  user: UserInfo | null;
  coins: number;
  points: number;
  /**
   * Data returned from `/api/start` endpoint.
   */
  userData: UserData | null;
  setUser: (user: UserInfo) => void;
  setUserData: (data: UserData) => void;
  addCoins: (amount: number) => void;
  addPoints: (amount: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  coins: 0,
  points: 0,
  startData: null,
  setUser: (user) => set({ user }),

  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  reset: () => set({ user: null, coins: 0, points: 0 }),
  userData: null,
  setUserData: (data) => set({ userData: data }),
}));
