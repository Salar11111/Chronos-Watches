const CONSENT_KEY = 'chronos-consent';

export type ConsentState = {
  analytics: boolean;
};

export function getConsent(): ConsentState {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored) return JSON.parse(stored) as ConsentState;
  } catch {
    return { analytics: false };
  }
  return { analytics: false };
}

export function setConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    return;
  }
}

export function hasConsent(): boolean {
  return getConsent().analytics;
}
