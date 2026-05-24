import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import Commitments from '@/components/home/Commitments';
import CTA from '@/components/home/CTA';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: '/about',
      languages: { en: '/about', fr: '/fr/a-propos' },
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

  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <Commitments />
      <CTA />
    </>
  );
}

function AboutHero() {
  const t = useTranslations('about');
  return (
    <section className="relative h-[78svh] min-h-[520px] bg-deep-900 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=2400&q=85"
        alt="Master Boat Charter — about"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900/55 via-deep-900/30 to-deep-900/85" />
      <div className="relative h-full container-premium flex flex-col justify-end pb-16 lg:pb-24 pt-[140px]">
        <Reveal className="max-w-3xl">
          <span className="eyebrow-light">{t('eyebrow')}</span>
          <h1 className="mt-6 font-serif text-display-xl text-white text-shadow leading-[0.95]">
            {t('title')}
          </h1>
          <p className="mt-7 max-w-2xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow">
            {t('lead')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  const t = useTranslations('about');
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-premium grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
        <Reveal direction="right" className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-sand-100">
          <Image
            src="https://images.unsplash.com/photo-1561489396-888724a1543d?auto=format&fit=crop&w=1600&q=85"
            alt="Local captain at the wheel"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-md text-deep-700 text-balance">
            {t('storyTitle')}
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            {t('story')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Values() {
  const t = useTranslations('about');
  const values = t.raw('values') as { title: string; description: string }[];
  return (
    <section className="py-24 lg:py-28 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-display-md text-deep-700">{t('valuesTitle')}</h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.08}
              className="rounded-3xl bg-white border border-sand-200 p-7 lg:p-8 hover:shadow-premium transition-shadow duration-500"
            >
              <div className="font-serif text-4xl text-turquoise-300 leading-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-6 font-serif text-2xl text-deep-700">{v.title}</h3>
              <p className="mt-3 text-ink-muted leading-relaxed text-[0.98rem]">{v.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
