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
  platform?: string;
  close: () => void;
  expand: () => void;
  disableVerticalSwipes?: () => void;
  ready: () => void;
  sendData: (data: string) => void;
  onEvent: (eventType: string, callback: (...args: unknown[]) => void) => void;
  showScanQrPopup?: (params: { text?: string }) => void;
  allowVerticalSwipe?: boolean;
  // openTelegramLink is available in Telegram Web App but missing in types
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string) => void;
}

export class TelegramService {
  private tg?: TelegramWebApp;
  private isScanPopupOpen = false;

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

  offEvent(eventType: string, callback: (...args: unknown[]) => void) {
    // @ts-expect-error – offEvent есть в TelegramMiniApp, но не в типах
    this.tg?.offEvent?.(eventType, callback);
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

  showScanQrPopup(text = 'Наведите камеру на QR-код'): boolean {

    if (!this.tg?.showScanQrPopup) {
      console.warn('showScanQrPopup недоступен');
      return false;
    }

    if (this.isScanPopupOpen) {
      return false;
    }

    try {
      this.tg.showScanQrPopup({ text });
      this.isScanPopupOpen = true;
      // сбрасываем флаг после закрытия
      this.tg.onEvent?.('scanQrPopupClosed', () => (this.isScanPopupOpen = false));
      this.tg.onEvent?.('qrCodeReceived', () => (this.isScanPopupOpen = false));
      this.tg.onEvent?.('onScanError', () => (this.isScanPopupOpen = false));
      return true;
    } catch (err) {
      // сюда попадёт WebAppScanQrPopupOpened и любые другие ошибки
      console.error('Failed to open QR popup:', err);
      return false;
    }
  }

  openTelegramLink(url: string) {
    try {
      this.tg?.openTelegramLink?.(url);
    } catch (err) {
      try {
        this.tg?.openLink?.(url);
      } catch (err2) {
        console.error('Failed to open Telegram link:', err2);
      }
    }
  }
}

export const telegramService = new TelegramService();
