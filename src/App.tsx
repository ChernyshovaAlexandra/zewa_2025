import { Suspense } from 'react';

import {
  //  useUiStore
} from './shared/model';
import { SplashScreen } from './features/splash/SplashScreen';
import { AppRouter } from './router';
import { ZewaModal } from './shared/ui';

export default function App() {
  const loading = false; // useUiStore((s) => s.loading);

  if (loading) return <SplashScreen />;

  return (
    <>
      <Suspense fallback={<SplashScreen />}>
        <AppRouter />
      </Suspense>
      <ZewaModal />
    </>
  );
}
