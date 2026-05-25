'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Users, Ruler, Zap, Umbrella, Briefcase, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const SPECS = [
  { key: 'capacity', icon: Users },
  { key: 'length', icon: Ruler },
  { key: 'engines', icon: Zap },
  { key: 'shade', icon: Umbrella },
  { key: 'toilet', icon: Briefcase },
  { key: 'safety', icon: ShieldCheck },
] as const;

export default function Boat() {
  const t = useTranslations('boat');

  return (
    <section className="relative py-24 lg:py-32 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-12 lg:mb-16">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700 text-balance">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-xl">
            {t('lead')}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10 items-stretch">
            {/* Boat hero image */}
            <div className="relative aspect-[5/4] lg:aspect-auto rounded-3xl overflow-hidden bg-deep-900">
              <Image
                src="/images/rental-card.jpg"
                alt="The Master Boat moored at La Digue marina, Seychelles"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-deep-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200 font-medium">
                  Master
                </p>
                <p className="mt-1 font-serif text-xl">La Digue · Seychelles</p>
              </div>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px bg-sand-200/70 rounded-3xl overflow-hidden border border-sand-200">
              {SPECS.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.key}
                    className="bg-white p-5 lg:p-6 flex flex-col gap-3"
                  >
                    <Icon
                      className="h-5 w-5 text-turquoise-600"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-wider2 text-deep-400 font-medium">
                        {t(`specs.${spec.key}.label`)}
                      </p>
                      <p className="mt-1.5 font-serif text-base text-deep-700 leading-tight">
                        {t(`specs.${spec.key}.value`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
