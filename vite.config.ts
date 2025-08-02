import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig(() => {
  return {
    server: {
      host: '0.0.0.0',
      port: 5173,
      allowedHosts: ['.trycloudflare.com'],
    },
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
