import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, MessageCircle, Languages, Award } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import JsonLdPerson from '@/components/seo/JsonLdPerson';
import { whatsappLink } from '@/lib/site';
import { alternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'captainPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternates(locale, '/about/captain'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['/images/boat-marina.jpg'],
      type: 'profile',
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

  const t = await getTranslations({ locale, namespace: 'captainPage' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const languages = t.raw('languages') as string[];
  const knowsAbout = t.raw('knowsAbout') as string[];

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: tNav('about'), href: '/about' },
          { name: t('title'), href: '/about/captain' },
        ]}
      />
      <JsonLdPerson
        name="Master Boat Charter Captain"
        jobTitle="Captain & Founder"
        description={t('lead')}
        url="/about/captain"
        image="/images/boat-marina.jpg"
        knowsLanguage={languages.map((l) => l.split(' ')[0])}
        knowsAbout={knowsAbout}
        nationality="Seychellois"
      />
      <CaptainContent />
    </>
  );
}

function CaptainContent() {
  const t = useTranslations('captainPage');
  const tNav = useTranslations('nav');
  const sections = t.raw('sections') as { title: string; body: string }[];
  const languages = t.raw('languages') as string[];
  const knowsAbout = t.raw('knowsAbout') as string[];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] bg-deep-900 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/boat-marina.jpg"
            alt={t('imageAlt')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/55 via-deep-900/25 to-deep-900/85" />
        </div>

        <div className="relative h-full container-premium flex flex-col justify-end pb-14 lg:pb-20 pt-[140px]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/70 text-xs mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {tNav('home')}
            </Link>
            <span>›</span>
            <Link href="/about" className="hover:text-white transition-colors">
              {tNav('about')}
            </Link>
            <span>›</span>
            <span className="text-white">{t('eyebrow')}</span>
          </nav>

          <Reveal className="max-w-3xl">
            <span className="eyebrow-light">{t('eyebrow')}</span>
            <h1 className="mt-5 font-serif text-display-xl text-white text-shadow leading-[0.95]">
              {t('title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow">
              {t('lead')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bio sections */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-text space-y-12 lg:space-y-16">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <h2 className="font-serif text-display-sm text-deep-700 text-balance">
                {s.title}
              </h2>
              <p
                className="mt-5 text-ink-muted text-[1.05rem] leading-[1.75] whitespace-pre-line"
                style={{ textWrap: 'pretty' }}
              >
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Languages & specialisations */}
      <section className="py-16 lg:py-20 bg-sand-50">
        <div className="container-narrow grid sm:grid-cols-2 gap-8">
          <Reveal>
            <div className="flex items-center gap-2.5 text-turquoise-600 mb-4">
              <Languages className="h-5 w-5" strokeWidth={1.5} />
              <h2 className="font-serif text-xl text-deep-700">
                {t('languagesLabel')}
              </h2>
            </div>
            <ul className="space-y-2">
              {languages.map((l, i) => (
                <li key={i} className="text-ink-muted">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="flex items-center gap-2.5 text-turquoise-600 mb-4">
              <Award className="h-5 w-5" strokeWidth={1.5} />
              <h2 className="font-serif text-xl text-deep-700">
                {t('knowsAboutLabel')}
              </h2>
            </div>
            <ul className="space-y-2">
              {knowsAbout.map((k, i) => (
                <li key={i} className="text-ink-muted">
                  {k}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-16 bg-deep-900">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-display-sm text-white text-balance">
            {t('ctaTitle')}
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/boat-excursions"
              className="btn-accent text-base px-7 py-3.5"
            >
              {t('ctaButton')}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a
              href={whatsappLink('Hello captain, I have a question about your charter:')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-7 py-3.5"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              {t('whatsappCta')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
