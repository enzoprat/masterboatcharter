import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ActivitiesGrid from '@/components/home/ActivitiesGrid';
import Boat from '@/components/home/Boat';
import Captain from '@/components/home/Captain';
import DayAtSea from '@/components/home/DayAtSea';
import Commitments from '@/components/home/Commitments';
import Gallery from '@/components/home/Gallery';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ActivitiesGrid />
      <Boat />
      <Captain />
      <DayAtSea />
      <Commitments />
      <Gallery />
      <FAQ />
      <CTA />
    </>
  );
}
