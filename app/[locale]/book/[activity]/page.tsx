import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import BookingFlow from '@/components/booking/BookingFlow';
import type { ActivitySlug } from '@/lib/data/activities';

const VALID: ActivitySlug[] = ['excursions', 'fishing', 'transfers', 'rental'];

export function generateStaticParams() {
  return VALID.map((activity) => ({ activity }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; activity: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: t('title'),
    description: t('lead'),
    robots: { index: false, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; activity: string }>;
}) {
  const { locale, activity } = await params;
  setRequestLocale(locale);

  if (!VALID.includes(activity as ActivitySlug)) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-[140px] flex items-center justify-center text-deep-400">
          Loading…
        </div>
      }
    >
      <BookingFlow slug={activity as ActivitySlug} />
    </Suspense>
  );
}
