import { Suspense, useEffect, useState } from 'react';
import { SplashScreen } from './features/splash/SplashScreen';
import { AppRouter } from './router';
import { ZewaModal } from './shared/ui';
import { AdaptivityProvider, AppRoot, ConfigProvider, SafeAreaInsets } from '@vkontakte/vkui';
import { GlobalProvider } from './contexts/GlobalProvider';
import { OnboardingScreen } from './features';

type Stage = 'splash' | 'onboarding' | 'app';
const ONBOARDING_KEY = 'onboardingCompleted';

export default function App() {
  const [stage, setStage] = useState<Stage>('splash');

  useEffect(() => {
    const id = setTimeout(() => {
      const hasSeen = true; // localStorage.getItem(ONBOARDING_KEY) === 'true';
      setStage(hasSeen ? 'app' : 'onboarding');
    }, 1500);

    return () => clearTimeout(id);
  }, []);

  const insets: SafeAreaInsets = {
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
  };

  if (stage === 'splash') {
    return <SplashScreen />;
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
          <AppRoot mode="full" safeAreaInsets={insets} scroll="contain" userSelectMode="disabled">
            <div
              style={{
                width: '100%',
                margin: '0 auto',
                height: '100vh',
              }}
            >
              <Suspense fallback={<SplashScreen />}>
                <AppRouter />
              </Suspense>
              <ZewaModal />
            </div>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </GlobalProvider>
  );
}
