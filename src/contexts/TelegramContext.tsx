/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { telegramService, type TelegramWebApp } from '../services/TelegramService';
import { apiService } from '../services/ApiService';
import { useUserStore, useStartDataStore } from '../shared/model';

interface TelegramContextValue {
  service: typeof telegramService;
  isTelegramWebApp: boolean;
  isReady: boolean;
  safeAreaInsetTop: number;
}

const initialContext: TelegramContextValue = {
  service: telegramService,
  isTelegramWebApp: false,
  isReady: false,
  safeAreaInsetTop: 0,
};

export const TelegramContext = createContext<TelegramContextValue>(initialContext);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const setUser = useUserStore((s) => s.setUser);
  const setStartStoreData = useStartDataStore((s) => s.setStartData);
  const setUserData = useUserStore((s) => s.setUserData);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(initialContext.isTelegramWebApp);
  const [isReady, setIsReady] = useState(initialContext.isReady);
  const [safeAreaInsetTop, setSafeAreaInsetTop] = useState(initialContext.safeAreaInsetTop);
  const startRequestSentRef = useRef(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.documentElement.style.setProperty(
      '--twa-safe-area-top',
      `${Math.max(0, safeAreaInsetTop)}px`,
    );
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsTelegramWebApp(false);
      setIsReady(true);
      setSafeAreaInsetTop(0);

      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;
    let attempts = 0;
    const maxAttempts = 30; 
    let detachSafeAreaListener: (() => void) | null = null;

    const readCssSafeArea = (edge: 'top' | 'bottom') => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return 0;
      }

      try {
        const value = window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(`--tg-safe-area-inset-${edge}`);
        const parsed = Number.parseFloat(value);
        if (Number.isFinite(parsed)) {
          return Math.max(0, parsed);
        }
      } catch (err) {
        console.warn(`Failed to read CSS safe area inset (${edge}):`, err);
      }

      return 0;
    };

    const computeSafeAreaTop = (webApp?: TelegramWebApp | null) => {
      if (!webApp) return readCssSafeArea('top');

      const directValue = webApp.safeAreaInsetTop;
      if (typeof directValue === 'number' && Number.isFinite(directValue)) {
        return Math.max(0, directValue);
      }

      const safeAreaObjectTop = (
        webApp as TelegramWebApp & {
          safeArea?: { top?: number };
          safeAreaInsets?: { top?: number };
        }
      ).safeArea?.top;

      if (typeof safeAreaObjectTop === 'number' && Number.isFinite(safeAreaObjectTop)) {
        return Math.max(0, safeAreaObjectTop);
      }

      const safeAreaInsetsTop = (
        webApp as TelegramWebApp & {
          safeAreaInsets?: { top?: number };
        }
      ).safeAreaInsets?.top;
      if (typeof safeAreaInsetsTop === 'number' && Number.isFinite(safeAreaInsetsTop)) {
        return Math.max(0, safeAreaInsetsTop);
      }

      const cssValue = readCssSafeArea('top');
      if (cssValue > 0) {
        return cssValue;
      }

      if (
        typeof window !== 'undefined' &&
        typeof webApp.viewportStableHeight === 'number' &&
        Number.isFinite(webApp.viewportStableHeight) &&
        webApp.viewportStableHeight > 0
      ) {
        const diff = window.innerHeight - webApp.viewportStableHeight;
        if (diff > 0) {
          return diff;
        }
      }

      return 0;
    };

    const applySafeArea = (webAppInstance?: TelegramWebApp | null) => {
      if (cancelled) return;
      const webApp = webAppInstance ?? telegramService.getWebApp();
      const platform = webApp?.platform?.toLowerCase() ?? '';
      const isMobile = platform === 'ios' || platform === 'android';

      const top = computeSafeAreaTop(webApp);
      setSafeAreaInsetTop(top + (isMobile ? 20 : 0));
    };

    const complete = (value: boolean) => {
      if (cancelled) return;
      setIsTelegramWebApp(value);
      setIsReady(true);
      if (!value) {
        setSafeAreaInsetTop(0);
      }
    };

    const bootstrap = () => {
      if (cancelled) return;

      const webApp = window.Telegram?.WebApp;

      if (!webApp) {
        attempts += 1;

        if (attempts > maxAttempts) {
          complete(false);
          return;
        }

        timeoutId = window.setTimeout(bootstrap, 100);
        return;
      }

      const handleViewportChange = () => {
        if (cancelled) return;
        applySafeArea(telegramService.getWebApp());
      };

      telegramService.init();

      try {
        const webAppInstance = telegramService.getWebApp() ?? webApp;
        webAppInstance.ready();
        webAppInstance.expand();
        if (
          (webAppInstance.platform === 'ios' || webAppInstance.platform === 'android') &&
          !webAppInstance.isFullscreen &&
          typeof webAppInstance.requestFullscreen === 'function'
        ) {
          webAppInstance.requestFullscreen();
        }
        webAppInstance.disableVerticalSwipes?.();
      } catch (err) {
        console.warn('Failed to expand Telegram WebApp:', err);
      }

      complete(true);
      applySafeArea(webApp);

      try {
        webApp.onEvent('viewportChanged', handleViewportChange);
        detachSafeAreaListener = () => {
          try {
            webApp.offEvent?.('viewportChanged', handleViewportChange);
          } catch (offErr) {
            console.warn('Failed to detach viewportChanged listener:', offErr);
          }
        };
      } catch (eventErr) {
        console.warn('Failed to subscribe to viewport changes:', eventErr);
      }

      const user = telegramService.getUser();
      const webAppInstance = telegramService.getWebApp();

      if (!user || !webAppInstance) {
        console.warn('Telegram WebApp detected but user data is unavailable.');
        return;
      }

      setUser({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        photoUrl: user.photo_url,
      });

      const { hash = '', auth_date: authDateRaw = '' } = webAppInstance.initDataUnsafe ?? {};
      const authDate = Number.parseInt(authDateRaw, 10);

      apiService.setHash(
        user.id,
        hash,
        webAppInstance.initData,
        Number.isFinite(authDate) ? authDate : 0,
      );

      if (!startRequestSentRef.current) {
        startRequestSentRef.current = true;
        apiService
          .start({
            username: user.username ?? '',
          })
          .then((res) => {
            setStartStoreData(res.data.data);
            setUserData(res.data.data);
          })
          .catch((err) => {
            console.error('start error', err);
            startRequestSentRef.current = false;
          });
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      detachSafeAreaListener?.();
    };
  }, [setStartStoreData, setUser, setUserData]);

  return (
    <TelegramContext.Provider
      value={{
        service: telegramService,
        isTelegramWebApp,
        isReady,
        safeAreaInsetTop,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => useContext(TelegramContext);
export const useTelegramService = () => useContext(TelegramContext).service;
