/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, type AxiosInstance, type AxiosRequestConfig } from 'axios';

export interface StartRequest {
  username: string;
}

export type ApiData<T> =
  T extends Promise<infer R> ? (R extends { data: infer D } ? D : never) : never;
export interface HistoryRequest {
  telegram_id: number;
}
export interface AddCheckResponse {
  success: boolean;
  message?: string;
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
  game: number;
}

export interface GameResultRequest {
  game: number;
  result: number;
  points: number;
  coins: number;
}

export class ApiService {
  private axios: AxiosInstance;
  private hash = '';
  private payload = '';
  private ts = 0;
  private telegram_id = 0;

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

  setHash(telegram_id: number, hash: string, payload: string, ts: number) {
    this.hash = hash;
    this.payload = payload;
    this.ts = ts;
    this.telegram_id = telegram_id;
  }

  private withHash<T extends Record<string, unknown>>(
    data: T,
  ): T & { hash: string; payload: string; ts: number } {
    return {
      ...data,
      telegram_id: this.telegram_id,
      hash: this.hash,
      payload: this.payload,
      ts: this.ts,
    };
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

  addCheck(
    data: Omit<AddCheckRequest, 'hash'>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<AddCheckResponse>> {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value != null) {
        form.append(key, value as any);
      }
    });
    form.append('hash', this.hash);
    form.append('payload', this.payload);

    return this.axios.post<AddCheckResponse>('/add-check', form, config);
  }

  addCheckImageManual(data: {
    telegram_id: number;
    img: string;
  }): Promise<{ data: AddCheckResponse }> {
    return this.axios.post('/add-check', this.withHash(data));
  }

  gameStart(data: Omit<GameStartRequest, 'hash'>) {
    return this.axios.post('/game/start', this.withHash(data));
  }

  gameResult(data: Omit<GameResultRequest, 'hash'>) {
    return this.axios.post('/game/result', this.withHash(data));
  }
}

export const apiService = new ApiService();
