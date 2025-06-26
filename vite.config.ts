import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

const repoName = 'zewa_2025';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['.trycloudflare.com'],
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
