'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import {
  DESTINATIONS,
  DESTINATION_SLUGS,
  type DestinationSlug,
} from '@/lib/data/destinations';
import { formatPrice } from '@/lib/utils';

const HREFS: Record<DestinationSlug, string> = {
  'curieuse-island': '/boat-excursions/curieuse-island',
  'coco-island': '/boat-excursions/coco-island',
  'la-digue-tour': '/boat-excursions/la-digue-tour',
  'sister-islands': '/boat-excursions/sister-islands',
  'anse-lazio': '/boat-excursions/anse-lazio',
  'st-pierre-islet': '/boat-excursions/st-pierre-islet',
  'sunset-cruise': '/boat-excursions/sunset-cruise',
};

export default function DestinationsGrid() {
  const t = useTranslations('activities');
  const tCommon = useTranslations('common');

  return (
    <section className="py-20 lg:py-28 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-12 lg:mb-16">
          <span className="eyebrow">{t('destinationsBlockEyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-md text-deep-700 text-balance">
            {t('destinationsBlockTitle')}
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            {t('destinationsBlockLead')}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {DESTINATION_SLUGS.map((slug, i) => (
            <Card key={slug} slug={slug} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ slug, delay }: { slug: DestinationSlug; delay: number }) {
  const t = useTranslations(`destinations.${slug}`);
  const tCommon = useTranslations('common');
  const dest = DESTINATIONS[slug];

  return (
    <Reveal delay={delay}>
      <Link
        href={HREFS[slug] as any}
        className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[4/5]"
      >
        <Image
          src={dest.image}
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover img-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 via-deep-900/15 to-transparent" />

        {/* Price chip */}
        <div className="absolute top-5 right-5 inline-flex items-baseline gap-1 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs">
          <span className="text-deep-400">{tCommon('from')}</span>
          <span className="font-serif text-base text-deep-700">
            {formatPrice(dest.priceFrom)}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200 font-medium">
            {t('tagline')}
          </p>
          <h3 className="mt-2 font-serif text-2xl text-white text-balance">
            {t('shortTitle')}
          </h3>
          <div className="mt-4 inline-flex items-center gap-1.5 text-white text-sm font-medium">
            <span className="link-underline">{tCommon('viewDetails')}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
