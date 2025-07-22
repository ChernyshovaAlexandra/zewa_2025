import { Suspense, useEffect, useState } from 'react';
import { SplashScreen } from './features/splash/SplashScreen';
import { AppRouter } from './router';
import { ZewaModal } from './shared/ui';
import { AdaptivityProvider, AppRoot, ConfigProvider, SafeAreaInsets } from '@vkontakte/vkui';
import { GlobalProvider } from './contexts/GlobalProvider';
import { OnboardingScreen } from './features';

export default function App() {
  const [stage, setStage] = useState<'splash' | 'onboarding' | 'app'>('splash');

  useEffect(() => {
    const id = setTimeout(() => setStage('onboarding'), 1500);
    return () => clearTimeout(id);
  }, []);

  const insets: SafeAreaInsets = {
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
  };

  if (stage === 'splash') return <SplashScreen />;
  if (stage === 'onboarding') return <OnboardingScreen onFinish={() => setStage('app')} />;

  return (
    <GlobalProvider>
      <ConfigProvider
        isWebView={false}
        hasCustomPanelHeaderAfter={true}
        customPanelHeaderAfterMinWidth={50}
      >
        <AdaptivityProvider>
          <AppRoot mode="full" safeAreaInsets={insets} scroll={'contain'} userSelectMode="disabled">
            <Suspense fallback={<SplashScreen />}>
              <AppRouter />
            </Suspense>
            <ZewaModal />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </GlobalProvider>
  );
}
