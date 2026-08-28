import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { getPathname, routing } from '@/i18n/routing';

/**
 * Every entry is derived from `routing.pathnames`, so localized FR slugs
 * never drift from what the app actually serves. Order drives priority.
 */
const ROUTES = Object.keys(routing.pathnames) as (keyof typeof routing.pathnames)[];

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((href, i) => {
    const urls = Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${SITE.url}${getPathname({ locale, href })}`.replace(/\/$/, '') || SITE.url,
      ])
    ) as Record<(typeof routing.locales)[number], string>;

    const priority = Math.max(0.5, 1 - i * 0.03);

    return routing.locales.map((locale) => ({
      url: urls[locale],
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: locale === routing.defaultLocale ? priority : priority - 0.05,
      alternates: { languages: urls },
    }));
  });
}
