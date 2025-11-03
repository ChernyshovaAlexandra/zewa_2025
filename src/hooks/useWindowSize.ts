import { telegramService } from '@/services';
import React from 'react';

const useWindowSize = () => {
  const webApp = telegramService.getWebApp();

  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: !telegramService.isDesktop(),
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || !webApp) return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: !telegramService.isDesktop(),
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [webApp]);

  return windowSize;
};

export default useWindowSize;
