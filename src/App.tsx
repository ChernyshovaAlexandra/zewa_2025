import { Suspense } from 'react';
import { SplashScreen } from './features/splash/SplashScreen';
import { AppRouter } from './router';
import { ZewaModal } from './shared/ui';
import { AdaptivityProvider, AppRoot, ConfigProvider, SafeAreaInsets } from '@vkontakte/vkui';
import { GlobalProvider } from './contexts/GlobalProvider';

export default function App() {
  const loading = false; // useUiStore((s) => s.loading);

  const insets: SafeAreaInsets = {
    top: 20,
    bottom: 0,
    left: 0,
    right: 0,
  };

  if (loading) return <SplashScreen />;

  return (
    <GlobalProvider>
      <ConfigProvider
        isWebView={false}
        hasCustomPanelHeaderAfter={true}
        customPanelHeaderAfterMinWidth={50}
        appearance="light"
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
