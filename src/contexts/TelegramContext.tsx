/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { telegramService } from '../services/TelegramService';
import { apiService } from '../services/ApiService';
import { useUserStore, useStartDataStore } from '../shared/model';

interface TelegramContextValue {
  service: typeof telegramService;
  isTelegramWebApp: boolean;
  isReady: boolean;
}

const initialContext: TelegramContextValue = {
  service: telegramService,
  isTelegramWebApp: false,
  isReady: false,
};

export const TelegramContext = createContext<TelegramContextValue>(initialContext);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const setUser = useUserStore((s) => s.setUser);
  const setStartStoreData = useStartDataStore((s) => s.setStartData);
  const setUserData = useUserStore((s) => s.setUserData);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(initialContext.isTelegramWebApp);
  const [isReady, setIsReady] = useState(initialContext.isReady);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsTelegramWebApp(false);
      setIsReady(true);
      return;
    }

    let cancelled = false;
    let timeoutId: number | null = null;
    let attempts = 0;
    const maxAttempts = 30; // ~3 seconds timeout

    const complete = (value: boolean) => {
      if (cancelled) return;
      setIsTelegramWebApp(value);
      setIsReady(true);
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

      // Инициализация Telegram WebApp API
      telegramService.init();

      try {
        // Разворачиваем во весь экран
        webApp.ready();
        webApp.expand();
        if (
          (webApp.platform === 'ios' || webApp.platform === 'android') &&
          !webApp.isFullscreen &&
          typeof webApp.requestFullscreen === 'function'
        ) {
          webApp.requestFullscreen();
        }
        webApp.disableVerticalSwipes?.();
      } catch (err) {
        console.warn('Failed to expand Telegram WebApp:', err);
      }

      complete(true);

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
        });
    };

    bootstrap();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [setStartStoreData, setUser, setUserData]);

  return (
    <TelegramContext.Provider
      value={{
        service: telegramService,
        isTelegramWebApp,
        isReady,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export const useTelegram = () => useContext(TelegramContext);
export const useTelegramService = () => useContext(TelegramContext).service;
