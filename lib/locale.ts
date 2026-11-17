/**
 * Locale lookup tables.
 *
 * These used to be `locale === 'fr' ? … : …` ternaries scattered across the
 * date formatters and the metadata — fine for two locales, silently wrong
 * for a third. Adding a language now means adding a row here.
 */
export const DATE_LOCALE = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
} as const;

export const OG_LOCALE = {
  en: 'en_US',
  fr: 'fr_FR',
  de: 'de_DE',
} as const;

/** Language name as shown in the switcher, in its own language. */
export const LOCALE_LABEL = {
  en: 'EN',
  fr: 'FR',
  de: 'DE',
} as const;

type Known = keyof typeof DATE_LOCALE;

export function dateLocale(locale: string): string {
  return DATE_LOCALE[locale as Known] ?? DATE_LOCALE.en;
}

export function ogLocale(locale: string): string {
  return OG_LOCALE[locale as Known] ?? OG_LOCALE.en;
}
