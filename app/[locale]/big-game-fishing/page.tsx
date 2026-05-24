import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ActivityPage from '@/components/activities/ActivityPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities.fishing' });
  return {
    title: t('title'),
    description: t('shortDescription'),
    alternates: {
      canonical: '/big-game-fishing',
      languages: { en: '/big-game-fishing', fr: '/fr/peche-au-gros' },
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
  return <ActivityPage slug="fishing" />;
}
