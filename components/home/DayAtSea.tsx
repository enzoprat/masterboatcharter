'use client';

import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

type Step = { time: string; title: string; body: string };

export default function DayAtSea() {
  const t = useTranslations('day');
  const tCommon = useTranslations('common');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-14 lg:mb-20">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700 text-balance">
            {t('title')}
          </h2>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>

        <div className="relative">
          {/* Vertical rail (desktop) / left rail (mobile) */}
          <div
            className="absolute left-[20px] sm:left-[28px] md:left-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-turquoise-300 to-transparent md:-translate-x-1/2"
            aria-hidden
          />

          <ol className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Reveal
                  key={step.time}
                  delay={i * 0.06}
                  direction="up"
                  className="relative"
                >
                  <li
                    className={`relative grid md:grid-cols-2 md:gap-12 items-center ${
                      isLeft ? '' : 'md:[direction:rtl]'
                    }`}
                  >
                    {/* Time dot */}
                    <div className="absolute left-[20px] sm:left-[28px] md:left-1/2 -translate-x-1/2 z-10">
                      <div className="h-3 w-3 rounded-full bg-turquoise-500 ring-4 ring-white shadow-premium-sm" />
                    </div>

                    {/* Time block — left or right alternating on desktop */}
                    <div
                      className={`hidden md:block ${isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:[direction:ltr]'}`}
                    >
                      <p className="font-serif text-5xl lg:text-6xl text-turquoise-400 leading-none">
                        {step.time}
                      </p>
                    </div>

                    {/* Content block */}
                    <div
                      className={`pl-12 sm:pl-16 md:pl-0 ${isLeft ? 'md:pl-12' : 'md:pr-12 md:[direction:ltr]'}`}
                    >
                      <p className="md:hidden font-serif text-3xl text-turquoise-500 leading-none mb-2">
                        {step.time}
                      </p>
                      <h3 className="font-serif text-2xl text-deep-700 text-balance">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-ink-muted leading-relaxed max-w-md">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-16 lg:mt-20 text-center">
          <Link
            href="/boat-excursions"
            className="inline-flex items-center gap-2 text-deep-700 hover:text-deep-800 font-medium text-base group"
          >
            {tCommon('viewDetails')}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
