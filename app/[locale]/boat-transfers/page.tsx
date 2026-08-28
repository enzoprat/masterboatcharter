import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ActivityPage from '@/components/activities/ActivityPage';
import { alternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'activities.transfers' });
  return {
    title: t('title'),
    description: t('shortDescription'),
    alternates: alternates(locale, '/boat-transfers'),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ActivityPage slug="transfers" locale={locale} />;
}
