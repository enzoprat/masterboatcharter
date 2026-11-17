import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/boat-excursions': {
      en: '/boat-excursions',
      fr: '/excursions-en-bateau',
      de: '/bootsausfluege',
    },
    // Destination sub-pages. Declared slug by slug (rather than as a
    // `[island]` template) so plain string hrefs keep resolving.
    '/boat-excursions/curieuse-island': {
      en: '/boat-excursions/curieuse-island',
      fr: '/excursions-en-bateau/ile-curieuse',
      de: '/bootsausfluege/insel-curieuse',
    },
    '/boat-excursions/coco-island': {
      en: '/boat-excursions/coco-island',
      fr: '/excursions-en-bateau/ile-coco',
      de: '/bootsausfluege/coco-island',
    },
    '/boat-excursions/la-digue-tour': {
      en: '/boat-excursions/la-digue-tour',
      fr: '/excursions-en-bateau/tour-de-la-digue',
      de: '/bootsausfluege/la-digue-rundfahrt',
    },
    '/boat-excursions/sister-islands': {
      en: '/boat-excursions/sister-islands',
      fr: '/excursions-en-bateau/iles-soeurs',
      de: '/bootsausfluege/schwesterinseln',
    },
    '/boat-excursions/anse-lazio': {
      en: '/boat-excursions/anse-lazio',
      fr: '/excursions-en-bateau/anse-lazio',
      de: '/bootsausfluege/anse-lazio',
    },
    '/boat-excursions/st-pierre-islet': {
      en: '/boat-excursions/st-pierre-islet',
      fr: '/excursions-en-bateau/ilot-saint-pierre',
      de: '/bootsausfluege/st-pierre',
    },
    '/boat-excursions/sunset-cruise': {
      en: '/boat-excursions/sunset-cruise',
      fr: '/excursions-en-bateau/croisiere-coucher-de-soleil',
      de: '/bootsausfluege/sonnenuntergangsfahrt',
    },
    '/big-game-fishing': {
      en: '/big-game-fishing',
      fr: '/peche-au-gros',
      de: '/hochseefischen',
    },
    '/boat-transfers': {
      en: '/boat-transfers',
      fr: '/transferts-en-bateau',
      de: '/boots-transfers',
    },
    '/boat-rental': {
      en: '/boat-rental',
      fr: '/location-de-bateau',
      de: '/bootsvermietung',
    },
    '/about': {
      en: '/about',
      fr: '/a-propos',
      de: '/ueber-uns',
    },
    '/about/captain': {
      en: '/about/captain',
      fr: '/a-propos/capitaine',
      de: '/ueber-uns/kapitaen',
    },
    '/contact': {
      en: '/contact',
      fr: '/contact',
      de: '/kontakt',
    },
    '/faq': {
      en: '/faq',
      fr: '/faq',
      de: '/faq',
    },
    '/guides': {
      en: '/guides',
      fr: '/guides',
      de: '/reisetipps',
    },
    '/guides/whale-shark-season-seychelles': {
      en: '/guides/whale-shark-season-seychelles',
      fr: '/guides/saison-requin-baleine-seychelles',
      de: '/reisetipps/walhai-saison-seychellen',
    },
    '/guides/best-time-to-visit-seychelles': {
      en: '/guides/best-time-to-visit-seychelles',
      fr: '/guides/quand-partir-aux-seychelles',
      de: '/reisetipps/beste-reisezeit-seychellen',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
