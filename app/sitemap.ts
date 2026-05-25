import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { DESTINATION_SLUGS } from '@/lib/data/destinations';

/** Pages with a localized FR path different from EN. */
const LOCALIZED = [
  { en: '/boat-excursions', fr: '/excursions-en-bateau' },
  { en: '/big-game-fishing', fr: '/peche-au-gros' },
  { en: '/boat-transfers', fr: '/transferts-en-bateau' },
  { en: '/boat-rental', fr: '/location-de-bateau' },
  { en: '/about', fr: '/a-propos' },
  { en: '/contact', fr: '/contact' },
  { en: '/faq', fr: '/faq' },
];

/** Pages that share the same path across locales (e.g. /boat-excursions/[island]). */
const SHARED_PATHS = DESTINATION_SLUGS.map((slug) => `/boat-excursions/${slug}`);

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: { en: SITE.url, fr: `${SITE.url}/fr` },
      },
    },
  ];

  const localized: MetadataRoute.Sitemap = LOCALIZED.flatMap((p, i) => [
    {
      url: `${SITE.url}${p.en}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85 - i * 0.03,
      alternates: {
        languages: {
          en: `${SITE.url}${p.en}`,
          fr: `${SITE.url}/fr${p.fr}`,
        },
      },
    },
    {
      url: `${SITE.url}/fr${p.fr}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8 - i * 0.03,
      alternates: {
        languages: {
          en: `${SITE.url}${p.en}`,
          fr: `${SITE.url}/fr${p.fr}`,
        },
      },
    },
  ]);

  const shared: MetadataRoute.Sitemap = SHARED_PATHS.flatMap((path) => [
    {
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
      alternates: {
        languages: {
          en: `${SITE.url}${path}`,
          fr: `${SITE.url}/fr${path}`,
        },
      },
    },
    {
      url: `${SITE.url}/fr${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${SITE.url}${path}`,
          fr: `${SITE.url}/fr${path}`,
        },
      },
    },
  ]);

  return [...home, ...localized, ...shared];
}
