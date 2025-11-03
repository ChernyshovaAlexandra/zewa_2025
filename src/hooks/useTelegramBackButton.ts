import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { useTelegram } from '@/contexts/TelegramContext';

export function useTelegramBackButton() {
  const { service, isTelegramWebApp } = useTelegram();
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!isTelegramWebApp) {
      return;
    }

    const webApp = service.getWebApp();
    const backButton = webApp?.BackButton;

    if (!backButton) {
      return;
    }

    const isHomeRoute = location.pathname === '/';

    const handleBack = () => {
      if (isHomeRoute) {
        webApp?.close?.();
        return;
      }

      if (navigationType === 'PUSH') {
        navigate(-1);
        return;
      }

      navigate('/');
    };

    backButton.offClick?.(handleBack);

    if (isHomeRoute) {
      backButton.hide?.();
      return;
    }

    backButton.show?.();
    backButton.onClick?.(handleBack);

    return () => {
      backButton.offClick?.(handleBack);
    };
  }, [isTelegramWebApp, location.pathname, navigate, navigationType, service]);
}
