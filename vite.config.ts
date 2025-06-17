import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

const repoName = 'zewa_2025';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    base: isProd
      ? `/${repoName}/` // для GitHub Pages
      : '/', // для npm run dev
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
