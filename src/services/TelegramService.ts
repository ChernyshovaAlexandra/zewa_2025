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
    query_id?: string;
  };
  platform?: string;
  isFullscreen?: boolean;
  requestFullscreen?: () => void;
  close: () => void;
  expand: () => void;
  disableVerticalSwipes?: () => void;
  ready: () => void;
  closeScanQrPopup: () => void;
  sendData: (data: string) => void;
  onEvent: (eventType: string, callback: (...args: any[]) => void) => void;
  offEvent: (eventType: string, callback: (...args: any[]) => void) => void;
  showScanQrPopup?: (params: { text?: string }) => void;
  allowVerticalSwipe?: boolean;
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string) => void;
}

type Events = { qrText: string };

const ALLOW_BROWSER_MODE = import.meta.env.VITE_ALLOW_BROWSER_MODE === 'true';
const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
const TELEGRAM_STARTAPP_PARAM = import.meta.env.VITE_TELEGRAM_STARTAPP_PARAM ?? '';

export class TelegramService {
  private tg?: TelegramWebApp;
  private isScanPopupOpen = false;
  private listeners = new Map<keyof Events, Set<(p: any) => void>>();
  private readonly desktopPlatforms = [
    'macos',
    'tdesktop',
    'weba',
    'desktop',
    'linux',
    'windows',
    'web',
  ];
  private hasAttemptedLaunchRedirect = false;

  private emit<K extends keyof Events>(name: K, payload: Events[K]) {
    this.listeners.get(name)?.forEach((h) => h(payload));
  }
  init() {
    this.tg = window?.Telegram?.WebApp;
    this.tg?.ready();

    this.maybeExpandToFullscreen();
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

  maybeExpandToFullscreen() {
    if (!this.tg) {
      return;
    }

    this.expand();
    this.disableVerticalSwipes();
    this.redirectToLaunchAppIfNeeded();
  }

  isDesktop() {
    const platform = this.tg?.platform?.toLowerCase();
    if (platform) {
      return this.desktopPlatforms.some((token) => platform.includes(token));
    }

    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent.toLowerCase();
      const isMobile = /android|iphone|ipad|ipod/i.test(ua);
      return !isMobile;
    }

    return false;
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
    const tg = this.tg;
    if (!tg || !tg.showScanQrPopup || this.isScanPopupOpen)
      return Promise.reject(new Error('scanner-busy'));

    return new Promise((resolve, reject) => {
      const cleanup = () => {
        this.isScanPopupOpen = false;
        tg.offEvent('qrTextReceived', onQr);
        tg.offEvent('scanQrPopupClosed', onClose);
      };

      const onQr = (raw: { data: string }) => {
        tg.closeScanQrPopup();
        cleanup();
        resolve(raw);
      };

      const onClose = () => {
        cleanup();
        reject(new Error('popup-closed'));
      };

      tg.onEvent('qrTextReceived', onQr);
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

  private redirectToLaunchAppIfNeeded() {
    if (this.hasAttemptedLaunchRedirect || !this.tg || ALLOW_BROWSER_MODE) {
      return;
    }

    const isInlineWebView = Boolean(
      (this.tg.initDataUnsafe as { query_id?: string } | undefined)?.query_id,
    );
    if (!isInlineWebView || !TELEGRAM_BOT_USERNAME) {
      return;
    }

    this.hasAttemptedLaunchRedirect = true;

    const startAppParam = encodeURIComponent(TELEGRAM_STARTAPP_PARAM);
    const startAppQuery = TELEGRAM_STARTAPP_PARAM ? `startapp=${startAppParam}` : 'startapp';
    const deepLink = `tg://resolve?domain=${TELEGRAM_BOT_USERNAME}&${startAppQuery}`;
    const httpsLink = `https://t.me/${TELEGRAM_BOT_USERNAME}?${startAppQuery}`;

    const tryOpen = (url: string) => {
      const tg = this.tg;
      if (tg?.openTelegramLink) {
        try {
          tg.openTelegramLink(url);
          return true;
        } catch (err) {
          console.error('openTelegramLink failed', err);
        }
      }
      if (tg?.openLink) {
        try {
          tg.openLink(url);
          return true;
        } catch (err) {
          console.error('openLink failed', err);
        }
      }
      if (typeof window !== 'undefined') {
        window.location.href = url;
        return true;
      }
      return false;
    };

    if (!tryOpen(deepLink)) {
      tryOpen(httpsLink);
    }

    window.setTimeout(() => {
      try {
        this.close();
      } catch (closeErr) {
        console.error('Failed to close inline webview after redirect', closeErr);
      }
    }, 300);
  }
}

export const telegramService = new TelegramService();
