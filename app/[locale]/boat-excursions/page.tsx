import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ActivityPage from '@/components/activities/ActivityPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities.excursions' });
  return {
    title: t('title'),
    description: t('shortDescription'),
    alternates: {
      canonical: '/boat-excursions',
      languages: { en: '/boat-excursions', fr: '/fr/excursions-en-bateau' },
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
  return <ActivityPage slug="excursions" />;
}
