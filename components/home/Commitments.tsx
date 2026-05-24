'use client';

import { useTranslations } from 'next-intl';
import { Leaf, Anchor, Ship, CalendarCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const ITEMS = [
  { key: 'eco', icon: Leaf },
  { key: 'captains', icon: Anchor },
  { key: 'comfort', icon: Ship },
  { key: 'limited', icon: CalendarCheck },
] as const;

export default function Commitments() {
  const t = useTranslations('commitments');

  return (
    <section className="relative py-24 lg:py-32 bg-sand-100">
      {/* Soft texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#FFFFFF_0%,transparent_50%)]" />

      <div className="container-premium relative">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="mt-5 font-serif text-display-lg text-deep-700">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">
              {t('lead')}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-px bg-sand-300/40 rounded-3xl overflow-hidden border border-sand-300/50">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.key}
                  delay={0.1 + i * 0.08}
                  className="bg-sand-50 p-8 lg:p-10 transition-colors duration-500 hover:bg-white"
                >
                  <div className="flex flex-col gap-5">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-nature-100 text-nature-600">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-deep-700 text-balance">
                        {t(`items.${item.key}.title`)}
                      </h3>
                      <p className="mt-3 text-ink-muted leading-relaxed">
                        {t(`items.${item.key}.description`)}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
