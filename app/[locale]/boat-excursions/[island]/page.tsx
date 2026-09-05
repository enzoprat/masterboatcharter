import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import DestinationPage from '@/components/destinations/DestinationPage';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import JsonLdTouristTrip from '@/components/seo/JsonLdTouristTrip';
import JsonLdFaq from '@/components/seo/JsonLdFaq';
import {
  DESTINATION_SLUGS,
  getDestination,
} from '@/lib/data/destinations';
import { SITE } from '@/lib/site';
import { alternates } from '@/lib/seo';

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((island) => ({ island }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; island: string }>;
}): Promise<Metadata> {
  const { locale, island } = await params;
  const destination = getDestination(island);
  if (!destination) return {};

  const t = await getTranslations({
    locale,
    namespace: `destinations.${destination.slug}`,
  });

  const alts = alternates(locale, `/boat-excursions/${destination.slug}`);
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alts,
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: alts.canonical,
      images: [{ url: destination.image, width: 1600, height: 1067 }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [destination.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; island: string }>;
}) {
  const { locale, island } = await params;
  setRequestLocale(locale);

  const destination = getDestination(island);
  if (!destination) notFound();

  const t = await getTranslations({
    locale,
    namespace: `destinations.${destination.slug}`,
  });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const faqItems = t.raw('faq') as { q: string; a: string }[];
  // `route` stays logical (the breadcrumb resolves it itself); `absUrl` is
  // the localized absolute URL. Passing the EN path to JSON-LD put every FR
  // page in the EN hierarchy — measured in production 2026-09-05.
  const route = `/boat-excursions/${destination.slug}`;
  const absUrl = `${SITE.url}${alternates(locale, route).canonical}`;

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: tNav('excursions'), href: '/boat-excursions' },
          { name: t('shortTitle'), href: route },
        ]}
      />
      <JsonLdTouristTrip
        name={t('schemaName')}
        description={t('metaDescription')}
        url={absUrl}
        price={String(destination.priceFrom)}
        duration={destination.duration}
        itinerary={destination.itinerary}
        touristType={destination.touristType}
        image={destination.image}
      />
      <JsonLdFaq items={faqItems} />
      <DestinationPage destination={destination} />
    </>
  );
}
