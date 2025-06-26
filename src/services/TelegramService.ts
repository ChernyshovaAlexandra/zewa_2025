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
    hash?: string;
    auth_date?: string;
  };
  close: () => void;
  expand: () => void;
  disableVerticalSwipes?: () => void;
  ready: () => void;
  sendData: (data: string) => void;
  onEvent: (eventType: string, callback: (...args: unknown[]) => void) => void;
  showScanQrPopup?: () => void;
  allowVerticalSwipe?: boolean;
}

export class TelegramService {
  private tg?: TelegramWebApp;

  init() {
    this.tg = window?.Telegram?.WebApp;
    this.tg?.ready();

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      this.expand();
      this.disableVerticalSwipes();
    }
  }

  getUser() {
    return this.tg?.initDataUnsafe.user;
  }

  getWebApp() {
    return this.tg;
  }

  sendData(data: string) {
    this.tg?.sendData(data);
  }

  onEvent(eventType: string, callback: (...args: unknown[]) => void) {
    this.tg?.onEvent(eventType, callback);
  }

  expand() {
    this.tg?.expand?.();
  }

  close() {
    this.tg?.close?.();
  }

  disableVerticalSwipes() {
    if (!this.tg) return;
    try {
      this.tg.disableVerticalSwipes?.();
      if ('allowVerticalSwipe' in this.tg) {
        this.tg.allowVerticalSwipe = false;
      }
    } catch (err) {
      console.error('Failed to disable vertical swipes:', err);
    }
  }

  showScanQrPopup() {
    try {
      this.tg?.showScanQrPopup?.();
    } catch (err) {
      console.error('Failed to open QR popup:', err);
    }
  }
}

export const telegramService = new TelegramService();
