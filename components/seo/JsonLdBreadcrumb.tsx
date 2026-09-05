import { getLocale } from 'next-intl/server';
import { SITE } from '@/lib/site';
import { getPathname } from '@/i18n/routing';

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb structured data.
 *
 * `href` is a logical route ('/boat-transfers'), so it has to be resolved
 * through the routing table before it is absolute. Measured 2026-09-05:
 * /fr/transferts-en-bateau was declaring
 * `https://www.masterboatcharter.com/boat-transfers` as its parent — the
 * English URL — which puts every FR page in the EN hierarchy.
 */
export default async function JsonLdBreadcrumb({ items }: { items: Crumb[] }) {
  const locale = await getLocale();

  const absolute = (href: string) => {
    if (href.startsWith('http')) return href;
    try {
      return `${SITE.url}${getPathname({ locale, href: href as never })}`;
    } catch {
      // Route not in the pathnames table — fall back to the raw href.
      return `${SITE.url}${href}`;
    }
  };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absolute(item.href),
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
