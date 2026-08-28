import { getPathname, routing } from '@/i18n/routing';

/**
 * Builds `alternates` for a page's metadata from a single logical route.
 *
 * The canonical must point at the *current* locale's URL — otherwise every
 * FR page declares its EN twin as canonical and Google drops it as a
 * duplicate. Paths are resolved through `routing.pathnames`, so localized
 * slugs (`/fr/excursions-en-bateau/ile-curieuse`) stay in sync automatically.
 */
export function alternates(locale: string, href: string) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: href as never })])
  ) as Record<(typeof routing.locales)[number], string>;

  return {
    canonical: languages[locale as keyof typeof languages] ?? languages.en,
    languages,
  };
}
