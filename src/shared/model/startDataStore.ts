import { create } from 'zustand';
import type { StartResponse } from '@/types';

interface StartDataState {
  gameDay: number | null;
  coupons: unknown[];
  games: StartResponse['data']['games'];
  prizes: StartResponse['data']['prizes'];
  userCanPlay: StartResponse['data']['user_can_play'];
  tg_referral_link: string;
  setStartData: (data: StartResponse['data']) => void;
  reset: () => void;
}

export const useStartDataStore = create<StartDataState>((set) => ({
  gameDay: null,
  coupons: [],
  games: [],
  prizes: [],
  userCanPlay: {},
  tg_referral_link: '',
  setStartData: (data) =>
    set({
      gameDay: data.game_day,
      coupons: data.coupons,
      games: data.games,
      prizes: data.prizes,
      userCanPlay: data.user_can_play,
      tg_referral_link: data.user.tg_referral_link
    }),
  reset: () =>
    set({ gameDay: null, coupons: [], games: [], prizes: [], userCanPlay: {} }),
}));
