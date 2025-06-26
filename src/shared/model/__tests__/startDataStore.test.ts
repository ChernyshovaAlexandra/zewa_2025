import { beforeEach, describe, expect, it } from 'vitest';
import { useStartDataStore } from '../startDataStore';
import type { StartResponse } from '@/types';

const sampleData: StartResponse['data'] = {
  game_day: 2,
  coupons: ['c1'],
  games: [{ id: 1, type: 1, name: 'Game', cost: 1, max_points: 5 }],
  prizes: [
    { name: 'Prize', description: null, points: 10 },
  ],
  user: {
    coins: 0,
    points: 0,
    new_coupons: [],
    activated_coupons: [],
    prizes: [],
    tg_referral_link: '',
    this_period_activated_coupons: [],
    this_period_new_coupons: [],
  },
  user_can_play: { 1: true },
};

describe('useStartDataStore', () => {
  beforeEach(() => {
    useStartDataStore.getState().reset();
  });

  it('saves start data fields', () => {
    useStartDataStore.getState().setStartData(sampleData);
    const state = useStartDataStore.getState();
    expect(state.gameDay).toBe(2);
    expect(state.coupons).toEqual(['c1']);
    expect(state.games).toEqual(sampleData.games);
    expect(state.prizes).toEqual(sampleData.prizes);
    expect(state.userCanPlay).toEqual({ 1: true });
  });
});
