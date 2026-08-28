import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/boat-excursions': {
      en: '/boat-excursions',
      fr: '/excursions-en-bateau',
    },
    // Destination sub-pages. Declared slug by slug (rather than as a
    // `[island]` template) so plain string hrefs keep resolving.
    '/boat-excursions/curieuse-island': {
      en: '/boat-excursions/curieuse-island',
      fr: '/excursions-en-bateau/ile-curieuse',
    },
    '/boat-excursions/coco-island': {
      en: '/boat-excursions/coco-island',
      fr: '/excursions-en-bateau/ile-coco',
    },
    '/boat-excursions/la-digue-tour': {
      en: '/boat-excursions/la-digue-tour',
      fr: '/excursions-en-bateau/tour-de-la-digue',
    },
    '/boat-excursions/sister-islands': {
      en: '/boat-excursions/sister-islands',
      fr: '/excursions-en-bateau/iles-soeurs',
    },
    '/boat-excursions/anse-lazio': {
      en: '/boat-excursions/anse-lazio',
      fr: '/excursions-en-bateau/anse-lazio',
    },
    '/boat-excursions/st-pierre-islet': {
      en: '/boat-excursions/st-pierre-islet',
      fr: '/excursions-en-bateau/ilot-saint-pierre',
    },
    '/boat-excursions/sunset-cruise': {
      en: '/boat-excursions/sunset-cruise',
      fr: '/excursions-en-bateau/croisiere-coucher-de-soleil',
    },
    '/big-game-fishing': {
      en: '/big-game-fishing',
      fr: '/peche-au-gros',
    },
    '/boat-transfers': {
      en: '/boat-transfers',
      fr: '/transferts-en-bateau',
    },
    '/boat-rental': {
      en: '/boat-rental',
      fr: '/location-de-bateau',
    },
    '/about': {
      en: '/about',
      fr: '/a-propos',
    },
    '/about/captain': {
      en: '/about/captain',
      fr: '/a-propos/capitaine',
    },
    '/contact': {
      en: '/contact',
      fr: '/contact',
    },
    '/faq': {
      en: '/faq',
      fr: '/faq',
    },
    '/guides': {
      en: '/guides',
      fr: '/guides',
    },
    '/guides/whale-shark-season-seychelles': {
      en: '/guides/whale-shark-season-seychelles',
      fr: '/guides/saison-requin-baleine-seychelles',
    },
    '/guides/best-time-to-visit-seychelles': {
      en: '/guides/best-time-to-visit-seychelles',
      fr: '/guides/quand-partir-aux-seychelles',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
