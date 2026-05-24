'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import type { Activity } from '@/lib/data/activities';

export default function Highlights({ activity }: { activity: Activity }) {
  const t = useTranslations(`activities.${activity.i18nKey}`);
  const tCommon = useTranslations('common');
  const items = t.raw('highlights') as string[];

  return (
    <section className="py-20 lg:py-28 bg-sand-100">
      <div className="container-premium grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <span className="eyebrow">{tCommon('highlights')}</span>
          <h2 className="mt-5 font-serif text-display-md text-deep-700 text-balance">
            {t('tagline')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-deep-700">
                <span className="shrink-0 inline-flex items-center justify-center h-7 w-7 rounded-full bg-nature-100 text-nature-600 mt-0.5">
                  <Check className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-[1.02rem] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
