import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import ActivitiesGrid from '@/components/home/ActivitiesGrid';
import Commitments from '@/components/home/Commitments';
import Experience from '@/components/home/Experience';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
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
      <Commitments />
      <Experience />
      <Gallery />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
