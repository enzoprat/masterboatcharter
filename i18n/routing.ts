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
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
