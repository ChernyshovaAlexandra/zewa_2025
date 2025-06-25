/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { telegramService } from '../services/TelegramService';
import { useUserStore } from '../shared/model';

export const TelegramContext = createContext(telegramService);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(interval);

        telegramService.init();
        telegramService.expand();
        telegramService.disableVerticalSwipes();

        const user = telegramService.getUser();
        if (user) {
          setUser({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            photoUrl: user.photo_url,
          });
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [setUser]);

  return <TelegramContext.Provider value={telegramService}>{children}</TelegramContext.Provider>;
}

export const useTelegram = () => useContext(TelegramContext);
