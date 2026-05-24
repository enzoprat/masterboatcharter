'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { ACTIVITIES } from '@/lib/data/activities';

const ACTIVITY_HREFS = {
  excursions: '/boat-excursions',
  fishing: '/big-game-fishing',
  transfers: '/boat-transfers',
  rental: '/boat-rental',
} as const;

export default function ActivitiesGrid() {
  const t = useTranslations('activities');
  const tCommon = useTranslations('common');

  return (
    <section id="activities" className="relative py-24 lg:py-36 bg-white">
      <div className="container-premium">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">{t('sectionEyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700">
            {t('sectionTitle')}
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-2xl">
            {t('sectionLead')}
          </p>
        </Reveal>

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

                  {/* Price chip */}
                  <div className="absolute top-5 right-5 flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-deep-700">
                    <span className="text-deep-400 mr-0.5">{tCommon('from')}</span>
                    {t(`${key}.fromPrice`)}
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
