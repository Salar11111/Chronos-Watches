export type TranslationDict = Record<string, string>;

export const translations: Record<string, TranslationDict> = {
  en: {
    'nav.home': 'Home',
    'nav.craft': 'Craft',
    'nav.collection': 'Collection',
    'nav.heritage': 'Heritage',
    'nav.voices': 'Voices',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'EST. 1974 — GENÈVE, SUISSE',
    'hero.title.line1': 'Where Time',
    'hero.title.line2a': 'Becomes',
    'hero.title.line2b': 'Art',
    'hero.sub': "The world's most coveted automatic timepieces — hand-assembled in Geneva, finished in 18k gold, and built to outlast generations.",
    'hero.cta.primary': 'Explore Collection',
    'hero.cta.secondary': 'Our Craft',
    'hero.rating': 'from',
    'hero.collectors': 'collectors worldwide',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.craft': 'Savoir-faire',
    'nav.collection': 'Collection',
    'nav.heritage': 'Héritage',
    'nav.voices': 'Témoignages',
    'nav.contact': 'Contact',
    'hero.eyebrow': 'EST. 1974 — GENÈVE, SUISSE',
    'hero.title.line1': 'Où le Temps',
    'hero.title.line2a': 'Devient',
    'hero.title.line2b': 'Art',
    'hero.sub': 'Les timepieces automatiques les plus convoités au monde — assemblés à la main à Genève, finis en or 18k, et conçus pour survivre aux générations.',
    'hero.cta.primary': 'Explorer la Collection',
    'hero.cta.secondary': 'Notre Savoir-faire',
    'hero.rating': 'de',
    'hero.collectors': 'collectionneurs dans le monde entier',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.craft': 'Handwerk',
    'nav.collection': 'Kollektion',
    'nav.heritage': 'Erbe',
    'nav.voices': 'Stimmen',
    'nav.contact': 'Kontakt',
    'hero.eyebrow': 'EST. 1974 — GENÈVE, SUISSE',
    'hero.title.line1': 'Wo Zeit',
    'hero.title.line2a': 'Zu',
    'hero.title.line2b': 'Kunst',
    'hero.sub': 'Die begehrtesten automatischen Zeitmesser der Welt — von Hand in Genf zusammengebaut, mit 18k Gold veredelt und gebaut, um Generationen zu überdauern.',
    'hero.cta.primary': 'Kollektion Entdecken',
    'hero.cta.secondary': 'Unser Handwerk',
    'hero.rating': 'von',
    'hero.collectors': 'Sammlern weltweit',
  },
};

export type Locale = keyof typeof translations;

export const defaultLocale: Locale = 'en';

export function getSupportedLocales(): Locale[] {
  return Object.keys(translations) as Locale[];
}

export function setLocale(locale: Locale): void {
  if (!translations[locale]) return;
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale;
  }
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('chronos-locale', locale);
    }
  } catch {
    return;
  }
  applyTranslations();
}

export function getLocale(): Locale {
  let stored: string | null = null;
  try {
    stored = typeof window !== 'undefined' ? window.localStorage.getItem('chronos-locale') : null;
  } catch {
    stored = null;
  }
  if (stored && translations[stored]) return stored as Locale;
  const browser = typeof window !== 'undefined' ? window.navigator.language.split('-')[0] : defaultLocale;
  return translations[browser] ? (browser as Locale) : defaultLocale;
}

export function applyTranslations(): void {
  if (typeof document === 'undefined') return;
  const locale = getLocale();
  const dict = translations[locale];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = (el as HTMLElement).dataset.i18n;
    if (key && dict[key]) el.textContent = dict[key];
  });
}

export function t(key: string): string {
  const locale = getLocale();
  return translations[locale]?.[key] ?? translations[defaultLocale]?.[key] ?? key;
}
