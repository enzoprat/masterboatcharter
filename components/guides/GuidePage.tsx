'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import type { Guide } from '@/lib/data/guides';
import { DESTINATIONS, type DestinationSlug } from '@/lib/data/destinations';
import { GUIDES, type GuideSlug } from '@/lib/data/guides';

const DESTINATION_HREFS: Record<DestinationSlug, string> = {
  'curieuse-island': '/boat-excursions/curieuse-island',
  'coco-island': '/boat-excursions/coco-island',
  'la-digue-tour': '/boat-excursions/la-digue-tour',
  'sister-islands': '/boat-excursions/sister-islands',
  'anse-lazio': '/boat-excursions/anse-lazio',
  'st-pierre-islet': '/boat-excursions/st-pierre-islet',
  'sunset-cruise': '/boat-excursions/sunset-cruise',
};

export default function GuidePage({ guide }: { guide: Guide }) {
  const t = useTranslations(`guides.${guide.slug}`);
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');

  const sections = t.raw('sections') as { title: string; body: string }[];
  const faq = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60svh] min-h-[420px] bg-deep-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={guide.image}
            alt={t('imageAlt')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/55 via-deep-900/25 to-deep-900/85" />
        </motion.div>

        <div className="relative h-full container-narrow flex flex-col justify-end pb-14 pt-[140px]">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/70 text-xs mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {tNav('home')}
            </Link>
            <span>›</span>
            <span className="text-white/70">Guides</span>
            <span>›</span>
            <span className="text-white">{t('shortTitle')}</span>
          </nav>

          <Reveal>
            <span className="eyebrow-light">{t('eyebrow')}</span>
            <h1 className="mt-5 font-serif text-display-lg lg:text-display-xl text-white text-shadow leading-[0.95]">
              {t('title')}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-white/75 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t('updatedLabel')} {guide.dateModified}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t('readTime')}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lead */}
      <section className="py-14 lg:py-20 bg-sand-50">
        <div className="container-text">
          <Reveal>
            <p className="font-serif text-2xl lg:text-3xl text-deep-700 leading-snug text-balance">
              {t('lead')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Body sections */}
      <section className="py-14 lg:py-20 bg-white">
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

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-sand-50">
        <div className="container-text">
          <Reveal>
            <span className="eyebrow">{tCommon('learnMore')}</span>
            <h2 className="mt-4 font-serif text-display-sm text-deep-700">
              {t('faqTitle')}
            </h2>
          </Reveal>
          <div className="mt-8 divide-y divide-sand-200 border-y border-sand-200">
            {faq.map((it, i) => (
              <details
                key={i}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="font-serif text-lg text-deep-700 group-open:text-deep-800 transition-colors">
                    {it.q}
                  </h3>
                  <span className="shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full border border-sand-300 text-deep-600 transition-transform duration-300 group-open:rotate-45 group-open:bg-deep-700 group-open:text-white group-open:border-deep-700">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-muted leading-relaxed text-[0.98rem]">
                  {it.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container-premium">
          <Reveal className="mb-10">
            <span className="eyebrow">{t('relatedEyebrow')}</span>
            <h2 className="mt-4 font-serif text-display-sm text-deep-700">
              {t('relatedTitle')}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {guide.related.map((r, i) => (
              <RelatedCard
                key={`${r.type}-${r.slug}`}
                type={r.type}
                slug={r.slug}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-deep-900">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-display-sm text-white text-balance">
            {t('ctaTitle')}
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">{t('ctaLead')}</p>
          <Link
            href="/boat-excursions"
            className="btn-accent mt-7 inline-flex text-base px-7 py-3.5"
          >
            {t('ctaButton')}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  );
}

function RelatedCard({
  type,
  slug,
  delay,
}: {
  type: 'guide' | 'destination';
  slug: string;
  delay: number;
}) {
  const tCommon = useTranslations('common');

  if (type === 'destination') {
    const dest = DESTINATIONS[slug as DestinationSlug];
    const tDest = useTranslations(`destinations.${slug}`);
    if (!dest) return null;
    return (
      <Reveal delay={delay}>
        <Link
          href={DESTINATION_HREFS[slug as DestinationSlug] as any}
          className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[5/3]"
        >
          <Image
            src={dest.image}
            alt={tDest('imageAlt')}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover img-hover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200">
              Excursion
            </p>
            <h3 className="mt-1.5 font-serif text-xl text-white text-balance">
              {tDest('shortTitle')}
            </h3>
          </div>
        </Link>
      </Reveal>
    );
  }

  // Guide
  const tGuide = useTranslations(`guides.${slug}`);
  const g = GUIDES[slug as GuideSlug];
  if (!g) return null;
  return (
    <Reveal delay={delay}>
      <Link
        href={`/guides/${slug}` as any}
        className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[5/3]"
      >
        <Image
          src={g.image}
          alt={tGuide('imageAlt')}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover img-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200">
            Guide
          </p>
          <h3 className="mt-1.5 font-serif text-xl text-white text-balance">
            {tGuide('shortTitle')}
          </h3>
        </div>
      </Link>
    </Reveal>
  );
}
