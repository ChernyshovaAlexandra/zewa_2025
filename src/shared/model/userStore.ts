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
  setUser: (user: User) => void;
  addCoins: (amount: number) => void;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  coins: 0,
  setUser: (user) => set({ user }),
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  reset: () => set({ user: null, coins: 0 }),
}));
