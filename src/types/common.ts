import { Game } from './Game';

export interface Prize {
  name: string;
  description?: string;
  points: number;
  type: string;
  new: boolean;
  activated: boolean;
}
export interface Coupon {
  points: number;
  name: string;
  value: number;
  code?: string;
  barcode?: string;
  can_change?: boolean;
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
  coupons: Coupon[];
  prizes: Prize[];
  tg_referral_link: string;
  is_in_club: boolean;
  club_tasks?: Record<string, boolean>;
  memo_level?: number;
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
