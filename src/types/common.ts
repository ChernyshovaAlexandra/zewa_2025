import { Game } from "./Game";

export interface Prize {
  name: string;
  description: string | null;
  points: number;
}

export interface UserInfo {
  coins: number;
  points: number;
  new_coupons: unknown[];
  activated_coupons: unknown[];
  prizes: unknown[];
  tg_referral_link: string;
  this_period_activated_coupons: unknown[];
  this_period_new_coupons: unknown[];
}

export interface StartResponse {
  success: true;
  message: string;
  data: {
    game_day: number;
    coupons: unknown[];

    games: Game[];
    prizes: Prize[];

    user: UserInfo;

    user_can_play: {
      [gameId: number]: boolean;
    };
  };
}
