'use client';

import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

/**
 * The commitments, set as a numbered editorial list rather than four icon
 * tiles.
 *
 * The previous version put a Lucide glyph in a tinted rounded square above
 * every item — the exact component-library tic that makes a page read as
 * assembled. A leaf does not explain "no anchoring on coral"; the sentence
 * does. Numerals give the same visual anchor while carrying real meaning
 * (there are four, they are ordered), and they let the type do the work.
 */
const ITEMS = ['eco', 'captains', 'comfort', 'limited'] as const;

export default function Commitments() {
  const t = useTranslations('commitments');

  return (
    <section className="relative section bg-granite-100 overflow-hidden">
      <div
        className="absolute inset-0 chart-contours-tight text-deep-700 pointer-events-none"
        aria-hidden
      />

      <div className="container-premium relative">
        {/* Intro sits inline with the first item rather than centred above
            everything — breaks the eyebrow/title/lead stack the other
            sections use. */}
        <div className="grid lg:grid-cols-[0.9fr_1.3fr] gap-y-12 gap-x-16 xl:gap-x-24">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-[0.7rem] uppercase tracking-wider3 text-sand-500">
              {t('eyebrow')}
            </p>
            <h2 className="mt-6 font-serif text-display-md text-deep-700 text-balance">
              {t('title')}
            </h2>
            <div className="rule-brass mt-8 max-w-[7rem]" />
            <p className="mt-8 text-ink-muted leading-relaxed max-w-sm">
              {t('lead')}
            </p>
          </Reveal>

          <ol className="lg:mt-2">
            {ITEMS.map((key, i) => (
              <Reveal
                key={key}
                as="li"
                delay={i * 0.07}
                className="group grid grid-cols-[2.75rem_1fr] sm:grid-cols-[4rem_1fr] gap-x-5 sm:gap-x-8 py-8 sm:py-10 border-t border-granite-300/60 last:border-b"
              >
                <span
                  className="font-serif text-2xl sm:text-3xl text-sand-500/70 tnum leading-none pt-1 transition-colors duration-500 group-hover:text-sand-500"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-deep-700 text-balance">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-ink-muted leading-relaxed max-w-lg">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
