/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALLOW_BROWSER_MODE?: string;
  readonly VITE_TELEGRAM_BOT_USERNAME?: string;
  readonly VITE_TELEGRAM_STARTAPP_PARAM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
