import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

const repoName = 'zewa_2025';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    server: {
      host: true,
      port: 5173,
      allowedHosts: ['sat5w8-95-25-160-154.ru.tuna.am'],
      hmr: {
        host: 'sat5w8-95-25-160-154.ru.tuna.am',
        protocol: 'wss',
      },
    },
    base: isProd ? `/${repoName}/` : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
