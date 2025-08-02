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
    hash?: string;
    auth_date?: string;
  };
  platform?: string;
  close: () => void;
  expand: () => void;
  disableVerticalSwipes?: () => void;
  ready: () => void;
  closeScanQrPopup: () => void;
  sendData: (data: string) => void;
  onEvent: (eventType: string, callback: (...args: any) => void) => void;
  offEvent: (eventType: string, callback: (...args: any) => void) => void;
  showScanQrPopup?: (params: { text?: string }) => void;
  allowVerticalSwipe?: boolean;
  // openTelegramLink is available in Telegram Web App but missing in types
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string) => void;
}

type Events = { qrText: string };

export class TelegramService {
  private tg?: TelegramWebApp;
  private isScanPopupOpen = false;
  private listeners = new Map<keyof Events, Set<(p: any) => void>>();
  private emit<K extends keyof Events>(name: K, payload: Events[K]) {
    this.listeners.get(name)?.forEach((h) => h(payload));
  }
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

  onEvent(eventType: string, callback: (...args: any) => void) {
    this.tg?.onEvent(eventType, callback);
  }

  offEvent(eventType: string, callback: (...args: any) => void) {
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
  closeScanQrPopup() {}

  showScanQrPopup(text = 'Наведите камеру на QR-код'): Promise<{ data: string }> {
    const tg = this.tg; // 🔒 сузили тип
    if (!tg || !tg.showScanQrPopup || this.isScanPopupOpen)
      return Promise.reject(new Error('scanner-busy'));

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.isScanPopupOpen = false;
        tg.offEvent('qrTextReceived', onQr);
        tg.offEvent('scanQrPopupClosed', onClose);
      };

      const onQr = (raw: { data: string }) => {
        // ← строка!
        tg.closeScanQrPopup(); // закрываем нативное окно
        cleanup();
        resolve(raw);
      };

      const onClose = () => {
        cleanup();
        reject(new Error('popup-closed'));
      };

      tg.onEvent('qrTextReceived', onQr); // подписка ДО вызова
      tg.onEvent('scanQrPopupClosed', onClose);

      try {
        this.isScanPopupOpen = true;
        tg.showScanQrPopup?.({ text });
      } catch (err) {
        cleanup();
        reject(err);
      }
    });
  }

  openTelegramLink(url: string) {
    try {
      this.tg?.openTelegramLink?.(url);
    } catch {
      try {
        this.tg?.openLink?.(url);
      } catch (err2) {
        console.error('Failed to open Telegram link:', err2);
      }
    }
  }
}

export const telegramService = new TelegramService();
