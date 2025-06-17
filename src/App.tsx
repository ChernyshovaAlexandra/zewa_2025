import { RouterProvider } from 'react-router-dom';

import {
  //  useUiStore
} from './stores';
import { SplashScreen } from './features/splash/SplashScreen';
import { router } from './router';
import { ZewaModal } from './components/ui';

export default function App() {
  const loading = false; // useUiStore((s) => s.loading);

  if (loading) return <SplashScreen />;

  return (
    <>
      <RouterProvider router={router} />
      <ZewaModal />
    </>
  );
}
