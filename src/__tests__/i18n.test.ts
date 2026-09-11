import { describe, expect, it } from 'vitest';
import { defaultLocale, getSupportedLocales, t, translations } from '../i18n';

describe('i18n', () => {
  it('provides translations for all supported locales', () => {
    expect(getSupportedLocales()).toEqual(['en', 'fr', 'de']);
    expect(translations[defaultLocale]['hero.title.line1']).toBe('Where Time');
    expect(translations.fr['hero.title.line1']).toBe("Où le Temps");
    expect(translations.de['hero.title.line1']).toBe('Wo Zeit');
  });

  it('falls back to default locale for missing keys', () => {
    expect(t('missing.key')).toBe('missing.key');
  });
});
