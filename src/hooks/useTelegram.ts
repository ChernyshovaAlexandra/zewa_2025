interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      photo_url?: string;
    };
  };
  close: () => void;
  expand: () => void;
  ready: () => void;
  sendData: (data: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEvent: (eventType: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegram = () => {
  const tg = window?.Telegram?.WebApp;

  return {
    tg,
    user: tg?.initDataUnsafe.user,
    initData: tg?.initData,
    close: tg?.close,
    expand: tg?.expand,
    sendData: tg?.sendData,
    onEvent: tg?.onEvent,
  };
};
