import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useTelegram } from './hooks/useTelegram';
import {
  useUserStore,
  //  useUiStore
} from './stores';
import { SplashScreen } from './features/splash/SplashScreen';
import { router } from './router';
import { ZewaModal } from './components/ui';

export default function App() {
  const { tg, user: tgUser } = useTelegram();
  const setUser = useUserStore((s) => s.setUser);
  const loading = false; // useUiStore((s) => s.loading);

  useEffect(() => {
    if (!tg) return;
    tg.ready();
    if (tgUser) {
      setUser({
        id: tgUser.id,
        firstName: tgUser.first_name,
        lastName: tgUser.last_name,
        username: tgUser.username,
        photoUrl: tgUser.photo_url,
      });
    }
  }, [tg, tgUser, setUser]);

  if (loading) return <SplashScreen />;

  return (
    <>
      <RouterProvider router={router} />
      <ZewaModal />
    </>
  );
}
