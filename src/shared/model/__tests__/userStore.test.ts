import { beforeEach, describe, expect, it } from 'vitest';
import { useUserStore } from '../userStore';
import type { StartResponse } from '@/types';

const sampleData: StartResponse['data'] = {
  game_day: 1,
  coupons: [],
  games: [],
  prizes: [],
  user: {
    coins: 5,
    points: 10,
    new_coupons: [],
    activated_coupons: [],
    prizes: [],
    tg_referral_link: '',
    this_period_activated_coupons: [],
    this_period_new_coupons: [],
  },
  user_can_play: {},
};

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().reset();
  });

  it('stores coins and points from start data', () => {
    useUserStore.getState().setStartData(sampleData);
    const state = useUserStore.getState();
    expect(state.coins).toBe(5);
    expect(state.points).toBe(10);
    expect(state.startData).toEqual(sampleData);
  });
});
