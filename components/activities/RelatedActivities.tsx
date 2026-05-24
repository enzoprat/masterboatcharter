'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { ACTIVITIES, type ActivitySlug } from '@/lib/data/activities';

const HREFS = {
  excursions: '/boat-excursions',
  fishing: '/big-game-fishing',
  transfers: '/boat-transfers',
  rental: '/boat-rental',
} as const;

export default function RelatedActivities({ exclude }: { exclude: ActivitySlug }) {
  const t = useTranslations('activities');
  const tCommon = useTranslations('common');
  const others = ACTIVITIES.filter((a) => a.slug !== exclude).slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-14">
          <span className="eyebrow">{t('sectionEyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-md text-deep-700">
            {t('sectionTitle')}
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {others.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link
                href={HREFS[a.slug] as any}
                className="group relative block overflow-hidden rounded-3xl bg-sand-100 aspect-[4/5]"
              >
                <Image
                  src={a.cardImage}
                  alt={t(`${a.i18nKey}.title`)}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover img-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-900/85 via-deep-900/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200 font-medium">
                    {t(`${a.i18nKey}.tagline`)}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {t(`${a.i18nKey}.title`)}
                  </h3>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-white text-sm font-medium">
                    <span className="link-underline">{tCommon('viewDetails')}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
