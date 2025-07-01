import { useTelegram } from '@/contexts/TelegramContext';
import React from 'react';

const useWindowSize = () => {
  const webApp = useTelegram().getWebApp();

  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: webApp && webApp.platform === 'weba' ? false : true,
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || !webApp) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: webApp.platform === 'weba' ? false : true,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [webApp]);

  return windowSize;
};

export default useWindowSize;
