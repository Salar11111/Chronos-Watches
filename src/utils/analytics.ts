import { config } from '../config';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initAnalytics(): void {
  if (!config.gaId) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', config.gaId);

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaId}`;
  script.async = true;
  document.head.appendChild(script);
}

export function trackEvent(eventName: string, eventData?: Record<string, unknown>): void {
  if (!config.gaId || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, eventData);
}
