import { Game } from './Game';

export interface Prize {
  name: string;
  description: string | null;
  points: number;
  type: string;
  new: boolean;
  activated: boolean;
}
export interface Coupon {
  points_cost: number;
  value: string | null;
  type: string;
  points: number;
}

export type DisplayCoupon = {
  points: number;
  value: string | null;
  type: string;
  name: string;
  activated?: boolean;
  new?: boolean;
};

export interface UserInfo {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

export interface UserInfoExpanded extends UserInfo {
  coins: number;
  points: number;
  new_coupons: Coupon[];
  activated_coupons: Coupon[];
  prizes: Prize[];
  tg_referral_link: string;
  this_period_activated_coupons: Coupon[];
  this_period_new_coupons: Coupon[];
}

export interface UserData {
  game_day: number;
  coupons: Coupon[];

  games: Game[];
  prizes: Prize[];

  user: UserInfoExpanded;

  user_can_play: {
    [gameId: number]: boolean;
  };
}
export interface StartResponse {
  success: true;
  message: string;
  data: UserData;
}
