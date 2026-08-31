'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { ACTIVITIES, type ActivitySlug } from '@/lib/data/activities';

const ACTIVITY_HREFS = {
  excursions: '/boat-excursions',
  fishing: '/big-game-fishing',
  transfers: '/boat-transfers',
  rental: '/boat-rental',
} as const;

const PRICE_UNIT: Record<ActivitySlug, string> = {
  excursions: 'perPersonHalf',
  fishing: 'perBoatHalf',
  transfers: 'perTransfer',
  rental: 'perBoatHalf',
};

const FEATURED: ActivitySlug = 'excursions';

export default function ActivitiesGrid() {
  const t = useTranslations('activities');
  const tCommon = useTranslations('common');

  return (
    <section id="activities" className="relative section bg-white">
      <div className="container-premium">
        {/* Title and lead sit side by side on a shared baseline — the other
            sections each open differently on purpose. */}
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-y-6 gap-x-16 items-end">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-wider3 text-sand-500">
              {t('sectionEyebrow')}
            </p>
            <h2 className="mt-6 font-serif text-display-lg text-deep-700 text-balance">
              {t('sectionTitle')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-ink-muted leading-relaxed lg:pb-2">
              {t('sectionLead')}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ACTIVITIES.map((activity, i) => {
            const key = activity.i18nKey;
            return (
              <Reveal
                key={activity.slug}
                delay={i * 0.08}
                direction="up"
                className={i === 0 || i === 3 ? 'md:col-span-1' : 'md:col-span-1'}
              >
                <Link
                  href={ACTIVITY_HREFS[activity.slug] as any}
                  className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[4/5] lg:aspect-[5/6]"
                >
                  <Image
                    src={activity.cardImage}
                    alt={t(`${key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover img-hover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 via-deep-900/20 to-transparent" />

                  {/* Featured badge */}
                  {activity.slug === FEATURED && (
                    <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-turquoise-500 text-white px-3 py-1 text-[0.65rem] uppercase tracking-wider2 font-medium shadow-premium">
                      ★ {t('mostBooked')}
                    </div>
                  )}

                  {/* Price chip */}
                  <div className="absolute top-5 right-5 flex flex-col items-end gap-0.5 rounded-2xl bg-white/95 backdrop-blur-md px-3.5 py-2 shadow-premium-sm">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[0.65rem] uppercase tracking-wider2 text-deep-400">
                        {tCommon('from')}
                      </span>
                      <span className="font-serif text-lg text-deep-700 leading-none">
                        {t(`${key}.fromPrice`)}
                      </span>
                    </div>
                    <span className="text-[0.6rem] text-deep-400 leading-none">
                      {t(PRICE_UNIT[activity.slug] as any, { n: activity.maxGuests })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                    <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200 font-medium">
                      {t(`${key}.tagline`)}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl lg:text-4xl text-white text-balance">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mt-3 text-white/80 text-[0.95rem] leading-relaxed line-clamp-2 max-w-md">
                      {t(`${key}.shortDescription`)}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-1.5 text-white text-sm font-medium">
                      <span className="link-underline">{tCommon('viewDetails')}</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
