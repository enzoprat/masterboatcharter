/**
 * SEO guide articles.
 *
 * Each guide becomes a page at /guides/[slug]. Translatable copy lives
 * in messages/{locale}.json under `guides.{slug}`. Keep this file
 * structural — slug, hero image, related cross-links.
 */

export type GuideSlug =
  | 'whale-shark-season-seychelles'
  | 'best-time-to-visit-seychelles';

export type Guide = {
  slug: GuideSlug;
  image: string;
  /** ISO date the guide was last updated (shown in UI + Schema). */
  datePublished: string;
  dateModified: string;
  /** Related guide or destination slugs to cross-link */
  related: { type: 'guide' | 'destination'; slug: string }[];
};

export const GUIDES: Record<GuideSlug, Guide> = {
  'whale-shark-season-seychelles': {
    slug: 'whale-shark-season-seychelles',
    image: '/images/whale-shark.jpg',
    datePublished: '2026-05-01',
    dateModified: '2026-05-25',
    related: [
      { type: 'destination', slug: 'coco-island' },
      { type: 'destination', slug: 'st-pierre-islet' },
    ],
  },
  'best-time-to-visit-seychelles': {
    slug: 'best-time-to-visit-seychelles',
    image: '/images/hero-boat-flag.jpg',
    datePublished: '2026-05-01',
    dateModified: '2026-05-25',
    related: [
      { type: 'destination', slug: 'curieuse-island' },
      { type: 'guide', slug: 'whale-shark-season-seychelles' },
    ],
  },
};

export const GUIDE_SLUGS = Object.keys(GUIDES) as GuideSlug[];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES[slug as GuideSlug];
}
