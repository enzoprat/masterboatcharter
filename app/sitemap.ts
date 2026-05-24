import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

const PATHS_EN = [
  '/',
  '/boat-excursions',
  '/big-game-fishing',
  '/boat-transfers',
  '/boat-rental',
  '/about',
  '/contact',
];

const PATHS_FR = [
  '/fr',
  '/fr/excursions-en-bateau',
  '/fr/peche-au-gros',
  '/fr/transferts-en-bateau',
  '/fr/location-de-bateau',
  '/fr/a-propos',
  '/fr/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const en = PATHS_EN.map((p, i) => ({
    url: `${SITE.url}${p === '/' ? '' : p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/' ? 1 : 0.8 - i * 0.05,
  }));
  const fr = PATHS_FR.map((p, i) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '/fr' ? 0.95 : 0.75 - i * 0.05,
  }));
  return [...en, ...fr];
}
