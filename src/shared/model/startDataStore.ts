import { create } from 'zustand';
import type { StartResponse } from '@/types';

interface StartDataState {
  gameDay: number | null;
  coupons: unknown[];
  games: StartResponse['data']['games'];
  prizes: StartResponse['data']['prizes'];
  userCanPlay: StartResponse['data']['user_can_play'];
  setStartData: (data: StartResponse['data']) => void;
  reset: () => void;
}

export const useStartDataStore = create<StartDataState>((set) => ({
  gameDay: null,
  coupons: [],
  games: [],
  prizes: [],
  userCanPlay: {},
  setStartData: (data) =>
    set({
      gameDay: data.game_day,
      coupons: data.coupons,
      games: data.games,
      prizes: data.prizes,
      userCanPlay: data.user_can_play,
    }),
  reset: () =>
    set({ gameDay: null, coupons: [], games: [], prizes: [], userCanPlay: {} }),
}));
