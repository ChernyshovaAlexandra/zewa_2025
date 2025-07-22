import axios, { type AxiosInstance } from 'axios';

export interface StartRequest {
  telegram_id: number;
  username: string;
  ts: number;
  payload: string;
}

export type ApiData<T> =
  T extends Promise<infer R> ? (R extends { data: infer D } ? D : never) : never;
export interface HistoryRequest {
  telegram_id: number;
}

export type CouponType = 'barcode' | 'code';
export interface ActivateCouponRequest {
  telegram_id: number;
  type: CouponType;
  coupon_id: string | number;
}

export interface AddCheckRequest {
  telegram_id: number;
  img?: File;
  fn?: string;
  fd?: string;
  fp?: string;
  sum?: string;
  date?: string;
}

export interface GameStartRequest {
  telegram_id: number;
  ts: number;
  payload: string;
  game: number;
}

export interface GameResultRequest {
  telegram_id: number;
  ts: number;
  payload: string;
  game: number;
  result: number;
  points: number;
  coins: number;
}

export class ApiService {
  private axios: AxiosInstance;
  private hash = '';

  constructor(baseURL = import.meta.env.VITE_API_BASE_URL + 'api') {
    this.axios = axios.create({
      baseURL,
      timeout: 10000,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  setHash(hash: string) {
    this.hash = hash;
  }

  private withHash<T extends Record<string, unknown>>(data: T): T & { hash: string } {
    return { ...data, hash: this.hash };
  }

  start(data: Omit<StartRequest, 'hash'>) {
    return this.axios.post('/start', this.withHash(data));
  }

  history(data: Omit<HistoryRequest, 'hash'>) {
    return this.axios.post('/history', this.withHash(data));
  }

  activateCoupon(data: Omit<ActivateCouponRequest, 'hash'>) {
    return this.axios.post('/activate-coupon', this.withHash(data));
  }

  addCheck(data: Omit<AddCheckRequest, 'hash'>) {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.append(key, value as any);
      }
    });
    form.append('hash', this.hash);
    return this.axios.post('/add-check', form);
  }

  gameStart(data: Omit<GameStartRequest, 'hash'>) {
    return this.axios.post('/game/start', this.withHash(data));
  }

  gameResult(data: Omit<GameResultRequest, 'hash'>) {
    return this.axios.post('/game/result', this.withHash(data));
  }
}

export const apiService = new ApiService();
