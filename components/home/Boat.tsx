'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

/**
 * The boat, presented the way a yacht brochure presents a hull: one large
 * photograph and a typographic spec sheet.
 *
 * The previous version put six Lucide icons in six identical rounded boxes.
 * Icons carried no information the label did not already carry — they were
 * decoration standing in for hierarchy. A ruled spec list reads faster and
 * looks like it came from the trade rather than from a component library.
 */
const SPECS = ['capacity', 'length', 'engines', 'shade', 'toilet', 'safety'] as const;

/** Specs worth setting large — the two a chartering guest actually compares. */
const HEADLINE_SPECS = ['capacity', 'length'] as const;

export default function Boat() {
  const t = useTranslations('boat');

  return (
    <section className="relative section-loose bg-abyss-800 text-white overflow-hidden">
      {/* Bathymetric contours — the identity motif, not a decorative blob */}
      <div
        className="absolute inset-0 chart-contours text-turquoise-200 pointer-events-none"
        aria-hidden
      />

      <div className="container-premium relative">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-y-14 gap-x-16 xl:gap-x-24 items-end">
          {/* Photograph, bled to the section edge on large screens */}
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-sm bg-abyss-900">
              <Image
                src="/images/hero-boat-lagoon.jpg"
                alt="The Master boat at anchor over a turquoise lagoon, La Digue, Seychelles"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 flex items-baseline gap-3 text-[0.7rem] uppercase tracking-wider2 text-white/45">
              <span className="text-turquoise-300">Master</span>
              <span className="h-px flex-1 bg-white/15" />
              <span>La Digue · Seychelles</span>
            </p>
          </Reveal>

          {/* Spec sheet */}
          <div>
            <Reveal direction="left">
              <p className="text-[0.7rem] uppercase tracking-wider3 text-turquoise-300">
                {t('eyebrow')}
              </p>
              <h2 className="mt-6 font-serif text-display-md text-white text-balance">
                {t('title')}
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed max-w-md">
                {t('lead')}
              </p>
            </Reveal>

            {/* Two headline numbers, set large */}
            <Reveal delay={0.08} className="mt-12 grid grid-cols-2 gap-8">
              {HEADLINE_SPECS.map((key) => (
                <div key={key}>
                  <p className="font-serif text-numeral-sm text-white tnum">
                    {t(`specs.${key}.figure`)}
                  </p>
                  <p className="mt-2 text-[0.7rem] uppercase tracking-wider2 text-white/45">
                    {t(`specs.${key}.unit`)}
                  </p>
                </div>
              ))}
            </Reveal>

            {/* The rest as a ruled list */}
            <Reveal delay={0.14} as="dl" className="mt-12 border-t border-white/10">
              {SPECS.filter(
                (k) => !HEADLINE_SPECS.includes(k as (typeof HEADLINE_SPECS)[number])
              ).map((key) => (
                <div
                  key={key}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 border-b border-white/10"
                >
                  <dt className="text-[0.7rem] uppercase tracking-wider2 text-white/40 pt-1">
                    {t(`specs.${key}.label`)}
                  </dt>
                  <dd className="text-[0.95rem] text-white/85 leading-snug">
                    {t(`specs.${key}.value`)}
                  </dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
