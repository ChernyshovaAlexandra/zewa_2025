/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Sentry?: any;
  }
}

type Level = 'info' | 'warning' | 'error';

const env = import.meta.env.MODE;
const dsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const tracesSampleRate = Number(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE ?? '0.0');
const replaysSessionSampleRate = Number(
  import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? '0.0',
);
const replaysOnErrorSampleRate = Number(
  import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? '1.0',
);
const release = (import.meta.env.VITE_RELEASE as string | undefined) ?? undefined;
const environment = (import.meta.env.VITE_SENTRY_ENV as string | undefined) ?? env;

export function initSentry() {
  if (!dsn || !window.Sentry) return;
  try {
    const integrations: any[] = [];
    if (window.Sentry.BrowserTracing) integrations.push(new window.Sentry.BrowserTracing());
    if (window.Sentry.Replay) integrations.push(new window.Sentry.Replay());

    window.Sentry.init({
      dsn,
      release,
      environment,
      integrations,
      tracesSampleRate,
      replaysSessionSampleRate,
      replaysOnErrorSampleRate,
      ignoreErrors: [
        'Non-Error promise rejection captured',
        'ResizeObserver loop limit exceeded',
        'NetworkError when attempting to fetch resource',
      ],
    });
  } catch (err) {
    console.warn('Sentry init failed:', err);
  }
}

function withScope(extra?: Record<string, any>, fn?: () => void) {
  if (!window.Sentry) return fn?.();
  try {
    window.Sentry.withScope((scope: any) => {
      if (extra) scope.setContext('extra', extra);
      fn?.();
    });
  } catch {
    fn?.();
  }
}

function capture(level: Level, message: string, extra?: Record<string, any>) {
  if (!window.Sentry) {
    const prefix = level === 'error' ? '[ERROR]' : level === 'warning' ? '[WARN]' : '[INFO]';
    console.log(prefix, message, extra ?? {});
    return;
  }
  withScope(extra, () => window.Sentry.captureMessage(message, level));
}

export const logger = {
  info: (message: string, extra?: Record<string, any>) => capture('info', message, extra),
  warn: (message: string, extra?: Record<string, any>) => capture('warning', message, extra),
  error: (message: string, extra?: Record<string, any>) => capture('error', message, extra),
  exception: (err: any, extra?: Record<string, any>) => {
    if (!window.Sentry) {
      console.error('[EXCEPTION]', err, extra ?? {});
      return;
    }
    withScope(extra, () => window.Sentry.captureException(err));
  },
  breadcrumb: (message: string, data?: Record<string, any>, category = 'default') => {
    try {
      window.Sentry?.addBreadcrumb?.({ message, data, category });
    } catch {
      // ignore
    }
  },
};
