import { useTelegram } from '@/contexts/TelegramContext';
import React from 'react';

const useWindowSize = () => {
  const { service: telegram, isTelegramWebApp } = useTelegram();
  const webApp = telegram.getWebApp();
  const allowBrowserMode = import.meta.env.DEV || import.meta.env.VITE_ALLOW_BROWSER_MODE === 'true';

  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: !telegram.isDesktop(),
  });

  React.useEffect(() => {
    const canListenToResize =
      typeof window !== 'undefined' && ((isTelegramWebApp && webApp) || allowBrowserMode);
    if (!canListenToResize) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: !telegram.isDesktop(),
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [telegram, webApp, isTelegramWebApp, allowBrowserMode]);

  return windowSize;
};

export default useWindowSize;
