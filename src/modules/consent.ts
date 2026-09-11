import { hasConsent, setConsent } from '../utils/consent';
import { initAnalytics } from '../utils/analytics';

export function initConsent(): void {
  const banner = document.getElementById('consentBanner');
  const acceptBtn = document.getElementById('consentAccept');
  const declineBtn = document.getElementById('consentDecline');
  if (!banner || !acceptBtn || !declineBtn) return;

  if (hasConsent()) {
    initAnalytics();
    return;
  }

  banner.hidden = false;
  const close = (analytics: boolean) => {
    setConsent({ analytics });
    banner.hidden = true;
    if (analytics) initAnalytics();
  };
  acceptBtn.addEventListener('click', () => close(true));
  declineBtn.addEventListener('click', () => close(false));
}
