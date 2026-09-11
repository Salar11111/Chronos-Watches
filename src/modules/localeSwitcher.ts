import { applyTranslations, getLocale, setLocale } from '../i18n';
import type { Locale } from '../i18n';

export function initLocaleSwitcher(): void {
  const switcher = document.getElementById('localeSwitcher') as HTMLSelectElement | null;
  if (!switcher) return;

  switcher.value = getLocale();
  switcher.addEventListener('change', () => {
    setLocale(switcher.value as Locale);
    applyTranslations();
  });
}
