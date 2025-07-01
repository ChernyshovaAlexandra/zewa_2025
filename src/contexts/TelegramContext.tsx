/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { telegramService } from '../services/TelegramService';
import { apiService } from '../services/ApiService';
import { useUserStore, useStartDataStore } from '../shared/model';

export const TelegramContext = createContext(telegramService);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const setUser = useUserStore((s) => s.setUser);
  const setStartStoreData = useStartDataStore((s) => s.setStartData);
  const setUserData = useUserStore((s) => s.setUserData);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(interval);

        telegramService.init();
        telegramService.expand();
        telegramService.disableVerticalSwipes();

        const user = telegramService.getUser();
        const webApp = telegramService.getWebApp();
        if (user && webApp) {
          setUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url,
          });

          apiService.setHash(webApp.initDataUnsafe?.hash ?? '');
          apiService
            .start({
              telegram_id: user.id,
              username: user.username ?? '',
              ts: parseInt(webApp.initDataUnsafe?.auth_date ?? '0', 10),
              payload: webApp.initData,
            })
            .then((res) => {
              setStartStoreData(res.data.data);
              setUserData(res.data.data);
            })
            .catch((err) => {
              console.error('start error', err);
            });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [setUser, setUserData, setStartStoreData]);
  

  return <TelegramContext.Provider value={telegramService}>{children}</TelegramContext.Provider>;
}

export const useTelegram = () => useContext(TelegramContext);
