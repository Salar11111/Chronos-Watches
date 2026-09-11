import { config } from '../config';

export function initErrorTracking(): void {
  if (!config.sentryDsn) return;

  const script = document.createElement('script');
  script.src = 'https://browser.sentry-cdn.com/8.0.0/bundle.tracing.replay.min.js';
  script.crossOrigin = 'anonymous';
  script.onload = () => {
    const Sentry = (window as unknown as { Sentry?: { init: (options: Record<string, unknown>) => void } }).Sentry;
    if (!Sentry) return;
    Sentry.init({
      dsn: config.sentryDsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
    });
  };
  document.head.appendChild(script);
}
