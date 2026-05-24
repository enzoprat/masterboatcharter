'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Activity } from '@/lib/data/activities';

type Props = {
  activity: Activity;
};

export default function ActivityHero({ activity }: Props) {
  const t = useTranslations(`activities.${activity.i18nKey}`);
  const tCommon = useTranslations('common');

  return (
    <section className="relative h-[80svh] min-h-[560px] bg-deep-900 overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={activity.image}
          alt={t('title')}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-900/60 via-deep-900/30 to-deep-900/85" />
      </motion.div>

      <div className="relative h-full container-premium flex flex-col justify-end pb-16 lg:pb-24 pt-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <span className="eyebrow-light">{t('tagline')}</span>
          <h1 className="mt-6 font-serif text-display-xl text-white text-shadow leading-[0.95]">
            {t('title')}
          </h1>
          <p className="mt-7 max-w-xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow">
            {t('description')}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href={`/book/${activity.slug}` as any}
              className="btn-accent text-base px-8 py-4 shadow-premium"
            >
              {tCommon('bookExperience')}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <a href="#pricing" className="btn-ghost text-base px-7 py-4">
              {tCommon('viewDetails')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
