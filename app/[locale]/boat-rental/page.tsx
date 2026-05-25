import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ActivityPage from '@/components/activities/ActivityPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities.rental' });
  return {
    title: t('title'),
    description: t('shortDescription'),
    alternates: {
      canonical: '/boat-rental',
      languages: { en: '/boat-rental', fr: '/fr/location-de-bateau' },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ActivityPage slug="rental" locale={locale} />;
}
