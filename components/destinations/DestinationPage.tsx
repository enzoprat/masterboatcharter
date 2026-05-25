'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Anchor,
  Clock,
  Users,
  MapPin,
  Sparkles,
  Check,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ReassuranceBar from '@/components/ui/ReassuranceBar';
import { formatPrice } from '@/lib/utils';
import {
  type Destination,
  DESTINATIONS,
  type DestinationSlug,
} from '@/lib/data/destinations';

const DESTINATION_HREFS: Record<DestinationSlug, string> = {
  'curieuse-island': '/boat-excursions/curieuse-island',
  'coco-island': '/boat-excursions/coco-island',
  'la-digue-tour': '/boat-excursions/la-digue-tour',
};

export default function DestinationPage({
  destination,
}: {
  destination: Destination;
}) {
  const t = useTranslations(`destinations.${destination.slug}`);
  const tCommon = useTranslations('common');
  const tNav = useTranslations('nav');

  const highlights = t.raw('highlights') as string[];
  const sections = t.raw('sections') as { title: string; body: string }[];
  const faq = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70svh] min-h-[480px] bg-deep-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={destination.image}
            alt={t('imageAlt')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/55 via-deep-900/25 to-deep-900/85" />
        </motion.div>

        <div className="relative h-full container-premium flex flex-col justify-end pb-14 lg:pb-20 pt-[140px]">
          {/* Breadcrumb (visible) */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/70 text-xs mb-6 flex-wrap"
          >
            <Link href="/" className="hover:text-white transition-colors">
              {tNav('home')}
            </Link>
            <span>›</span>
            <Link
              href="/boat-excursions"
              className="hover:text-white transition-colors"
            >
              {tNav('excursions')}
            </Link>
            <span>›</span>
            <span className="text-white">{t('shortTitle')}</span>
          </nav>

          <Reveal className="max-w-3xl">
            <span className="eyebrow-light">{t('tagline')}</span>
            <h1 className="mt-5 font-serif text-display-xl text-white text-shadow leading-[0.95]">
              {t('title')}
            </h1>
            <p className="mt-6 max-w-xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow">
              {t('lead')}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href={`/book/excursions?destination=${destination.slug}` as any}
                className="btn-accent text-base px-8 py-4 shadow-premium"
              >
                {tCommon('bookExperience')}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <span className="text-white/85 text-sm">
                {tCommon('from')}{' '}
                <span className="font-serif text-lg text-white">
                  {formatPrice(destination.priceFrom)}
                </span>{' '}
                / {tCommon('perPerson').replace('/', '').trim()}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trip facts strip */}
      <section className="py-10 bg-sand-50 border-y border-sand-200">
        <div className="container-premium grid grid-cols-2 lg:grid-cols-4 gap-px bg-sand-200/60 rounded-2xl overflow-hidden border border-sand-200">
          <Fact
            icon={<Clock className="h-4 w-4 text-turquoise-600" strokeWidth={1.5} />}
            label={tCommon('duration')}
            value={t('factDuration')}
          />
          <Fact
            icon={<Users className="h-4 w-4 text-turquoise-600" strokeWidth={1.5} />}
            label={tCommon('capacity')}
            value={t('factCapacity')}
          />
          <Fact
            icon={<MapPin className="h-4 w-4 text-turquoise-600" strokeWidth={1.5} />}
            label={t('factDepartureLabel')}
            value={t('factDeparture')}
          />
          <Fact
            icon={<Anchor className="h-4 w-4 text-turquoise-600" strokeWidth={1.5} />}
            label={t('factSeasonLabel')}
            value={t('factSeason')}
          />
        </div>
      </section>

      {/* Body: alternating sections */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-narrow space-y-12 lg:space-y-16">
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

      {/* Highlights + reassurance */}
      <section className="py-20 lg:py-24 bg-sand-50">
        <div className="container-premium grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <Reveal>
            <span className="eyebrow">{tCommon('highlights')}</span>
            <h2 className="mt-5 font-serif text-display-md text-deep-700">
              {t('highlightsTitle')}
            </h2>
            <ReassuranceBar className="mt-8" />
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-deep-700">
                  <span className="shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full bg-nature-100 text-nature-600 mt-0.5">
                    <Check className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-[1rem] leading-snug">{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-narrow">
          <Reveal>
            <span className="eyebrow">{t('itineraryEyebrow')}</span>
            <h2 className="mt-5 font-serif text-display-md text-deep-700">
              {t('itineraryTitle')}
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-5">
            {destination.itinerary.map((stop, i) => (
              <Reveal
                key={stop}
                delay={i * 0.05}
                className="flex items-start gap-4 rounded-2xl bg-sand-50 border border-sand-200 px-5 py-4"
              >
                <span className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-full bg-deep-700 text-white font-serif text-base">
                  {i + 1}
                </span>
                <span className="text-deep-700 font-medium pt-2 leading-tight">
                  {stop}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ specific to this destination */}
      <section className="py-20 lg:py-24 bg-sand-50">
        <div className="container-narrow">
          <Reveal>
            <span className="eyebrow">{tCommon('learnMore')}</span>
            <h2 className="mt-5 font-serif text-display-md text-deep-700">
              {t('faqTitle')}
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-sand-200 border-y border-sand-200">
            {faq.map((it, i) => (
              <details
                key={i}
                className="group py-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <h3 className="font-serif text-lg lg:text-xl text-deep-700 group-open:text-deep-800 transition-colors">
                    {it.q}
                  </h3>
                  <span className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full border border-sand-300 text-deep-600 transition-transform duration-300 group-open:rotate-45 group-open:bg-deep-700 group-open:text-white group-open:border-deep-700">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink-muted leading-relaxed text-[0.98rem]">
                  {it.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links to related destinations */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-premium">
          <Reveal className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="eyebrow">{t('relatedEyebrow')}</span>
              <h2 className="mt-4 font-serif text-display-md text-deep-700">
                {t('relatedTitle')}
              </h2>
            </div>
            <Link
              href="/boat-excursions"
              className="btn-link group"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                strokeWidth={1.5}
              />
              {t('backToPillar')}
            </Link>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {destination.related.map((relSlug, i) => {
              const rel = DESTINATIONS[relSlug];
              return (
                <RelatedCard key={relSlug} slug={relSlug} image={rel.image} delay={i * 0.08} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-deep-900">
        <div className="container-narrow text-center">
          <Sparkles
            className="h-6 w-6 text-turquoise-300 mx-auto"
            strokeWidth={1.5}
          />
          <h2 className="mt-5 font-serif text-display-md text-white text-balance">
            {t('ctaTitle')}
          </h2>
          <Link
            href={`/book/excursions?destination=${destination.slug}` as any}
            className="btn-accent mt-8 inline-flex text-base px-8 py-4"
          >
            {tCommon('bookExperience')}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-4 lg:p-5 flex items-center gap-3">
      <span className="shrink-0">{icon}</span>
      <div>
        <p className="text-[0.65rem] uppercase tracking-wider2 text-deep-400 font-medium">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-deep-700">{value}</p>
      </div>
    </div>
  );
}

function RelatedCard({
  slug,
  image,
  delay,
}: {
  slug: DestinationSlug;
  image: string;
  delay: number;
}) {
  const t = useTranslations(`destinations.${slug}`);
  const tCommon = useTranslations('common');
  return (
    <Reveal delay={delay}>
      <Link
        href={DESTINATION_HREFS[slug] as any}
        className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[5/3]"
      >
        <Image
          src={image}
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover img-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200">
            {t('tagline')}
          </p>
          <h3 className="mt-1.5 font-serif text-2xl text-white text-balance">
            {t('shortTitle')}
          </h3>
          <p className="mt-3 inline-flex items-center gap-1.5 text-white text-sm font-medium link-underline">
            {tCommon('viewDetails')} →
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
