import { useEffect, useState } from 'react';
import { SplashScreen } from './features/splash/SplashScreen';
import { AppRouter } from './router';
import { ZewaModal } from './shared/ui';
import { AdaptivityProvider, AppRoot, ConfigProvider, SafeAreaInsets } from '@vkontakte/vkui';
import { GlobalProvider } from './contexts/GlobalProvider';
import { OnboardingScreen } from './features';
import { useTelegram } from './contexts/TelegramContext';

type Stage = 'splash' | 'onboarding' | 'app';
const ONBOARDING_KEY = 'onboardingCompleted_christmas';

export default function App() {
  const [stage, setStage] = useState<Stage>('splash');
  const { isReady: isTelegramReady, isTelegramWebApp, safeAreaInsetTop } = useTelegram();

  useEffect(() => {
    const id = setTimeout(() => {
      const hasSeen = false; // localStorage.getItem(ONBOARDING_KEY) === 'true';
      setStage(hasSeen ? 'app' : 'onboarding');
    }, 1500);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (stage !== 'app' || typeof window === 'undefined') {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const imageAssets = [
        '/assets/images/Game-interface.webp',
        '/assets/images/lk.webp',
        '/assets/images/btn-bg.webp',
      ];

      imageAssets.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [stage]);

  const insets: SafeAreaInsets = {
    top: Math.max(0, safeAreaInsetTop),
    left: 0,
    right: 0,
  };

  const allowBrowserMode = false; //import.meta.env.VITE_ALLOW_BROWSER_MODE === 'true';
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  const startAppParam = import.meta.env.VITE_TELEGRAM_STARTAPP_PARAM;
  const telegramStartAppQuery =
    startAppParam != null && startAppParam.length > 0
      ? `startapp=${encodeURIComponent(startAppParam)}`
      : 'startapp';
  const telegramHttpsLink =
    botUsername != null ? `https://t.me/${botUsername}?${telegramStartAppQuery}` : undefined;
  const telegramDeepLink =
    botUsername != null ? `tg://resolve?domain=${botUsername}&${telegramStartAppQuery}` : undefined;
  const shouldShowSplash = stage === 'splash' || !isTelegramReady;

  useEffect(() => {
    if (!isTelegramReady || isTelegramWebApp || allowBrowserMode || !telegramDeepLink) {
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        window.location.href = telegramDeepLink;
      } catch {
        if (telegramHttpsLink) {
          window.location.href = telegramHttpsLink;
        }
      }
    }, 250000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [allowBrowserMode, isTelegramReady, isTelegramWebApp, telegramDeepLink, telegramHttpsLink]);

  if (shouldShowSplash) {
    return <SplashScreen />;
  }

  if (!isTelegramWebApp && !allowBrowserMode) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          textAlign: 'center',
          gap: '16px',
          background: '#f7f7f7',
          color: '#1c1c1c',
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
          Откройте мини-приложение в Telegram
        </h1>
        <p style={{ fontSize: '16px', margin: 0 }}>
          Похоже, что вы запускаете проект в обычном браузере. Чтобы продолжить, откройте бота из
          Telegram, нажмите кнопку с типом <code>web_app</code> и авторизуйтесь во встроенном
          webview.
        </p>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Если вы настраиваете проект локально, включите режим отладки в браузере с помощью
          переменной <code>VITE_ALLOW_BROWSER_MODE=true</code>.
        </p>
        {telegramHttpsLink ? (
          <a
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 20px',
              borderRadius: '9999px',
              background: '#229ED9',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
            }}
            href={telegramHttpsLink}
          >
            Открыть в Telegram
          </a>
        ) : null}
      </div>
    );
  }

  if (stage === 'onboarding') {
    return (
      <OnboardingScreen
        onFinish={() => {
          localStorage.setItem(ONBOARDING_KEY, 'true');
          setStage('app');
        }}
      />
    );
  }

  return (
    <GlobalProvider>
      <ConfigProvider
        isWebView={true}
        hasCustomPanelHeaderAfter={true}
        customPanelHeaderAfterMinWidth={50}
        colorScheme="light"
      >
        <AdaptivityProvider>
          <AppRoot
            mode="full"
            safeAreaInsets={insets}
            scroll="contain"
            userSelectMode="disabled"
            style={{ backgroundColor: '#182F5D' }}
          >
            <div
              style={{
                width: '100%',
                margin: '0 auto',
                height: '100dvh',
              }}
            >
              <AppRouter />
              <ZewaModal />
            </div>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </GlobalProvider>
  );
}
