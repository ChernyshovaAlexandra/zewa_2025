import { create } from 'zustand';
import type { StartResponse } from '@/types';

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
  points: number;
  /**
   * Data returned from `/api/start` endpoint.
   */
  startData: StartResponse['data'] | null;
  setUser: (user: User) => void;
  setStartData: (data: StartResponse['data']) => void;
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
  setStartData: (data) =>
    set({
      startData: data,
      coins: data.user.coins,
      points: data.user.points,
    }),
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  reset: () => set({ user: null, coins: 0, points: 0, startData: null }),
}));
