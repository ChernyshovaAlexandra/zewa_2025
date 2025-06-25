import type { TelegramWebApp } from '@/services/TelegramService';

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
export {};
