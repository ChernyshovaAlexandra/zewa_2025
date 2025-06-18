/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
  };
  close: () => void;
  expand: () => void;
  /** Disable vertical swipe gestures that close or minimize the Mini App */
  disableVerticalSwipes?: () => void;
  ready: () => void;
  sendData: (data: string) => void;
  onEvent: (...args: any[]) => void;
  showScanQrPopup: () => void;
}

export class TelegramService {
  private tg?: TelegramWebApp;

  init() {
    this.tg = window?.Telegram?.WebApp;
    this.tg?.ready();

    // Expand the Web App to full screen on mobile devices
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      this.tg?.expand?.();
      this.tg?.disableVerticalSwipes?.();
    }
  }

  onEvent(eventType: string, callback: (...args: unknown[]) => void) {
    this.tg?.onEvent(eventType, callback);
  }

  getUser() {
    return this.tg?.initDataUnsafe.user;
  }

  sendData(data: string) {
    this.tg?.sendData(data);
  }

  expand() {
    this.tg?.expand();
  }

  close() {
    this.tg?.close();
  }

  showScanQrPopup() {
    (this.tg as any)?.showScanQrPopup();
  }
}

export const telegramService = new TelegramService();
