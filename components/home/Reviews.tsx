'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { REVIEWS, AGGREGATE } from '@/lib/data/reviews';
import { SITE } from '@/lib/site';

/**
 * Social proof, set as an editorial pull-quote rather than three identical
 * quote cards.
 *
 * The lead review is set large in the display face — a real sentence from a
 * real guest is the strongest thing on the page, so it gets the typographic
 * weight normally spent on a marketing headline. The rest run as a ruled
 * list underneath.
 *
 * Renders nothing while `REVIEWS` is empty. See lib/data/reviews.ts.
 */
export default function Reviews() {
  const t = useTranslations('reviews');
  const locale = useLocale() as 'en' | 'fr';

  if (REVIEWS.length === 0) return null;

  const [lead, ...rest] = REVIEWS;

  return (
    <section className="relative section bg-granite-50 overflow-hidden">
      <div
        className="absolute inset-0 chart-contours-tight text-deep-700 pointer-events-none"
        aria-hidden
      />

      {AGGREGATE && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: SITE.name,
              url: SITE.url,
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: AGGREGATE.value,
                reviewCount: AGGREGATE.count,
                bestRating: 5,
              },
            }),
          }}
        />
      )}

      <div className="container-premium relative">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <p className="text-[0.7rem] uppercase tracking-wider3 text-sand-500">
            {t('eyebrow')}
          </p>
          {AGGREGATE && (
            <a
              href={AGGREGATE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-2.5 text-sm text-deep-600 hover:text-deep-800 transition-colors"
            >
              <Stars value={AGGREGATE.value} />
              <span className="font-serif text-xl text-deep-700 tnum leading-none">
                {AGGREGATE.value.toFixed(1)}
              </span>
              <span className="link-underline text-[0.8rem] text-ink-muted">
                {t('countLink', { n: AGGREGATE.count })}
              </span>
            </a>
          )}
        </div>

        {/* Lead quote, set at display size */}
        <Reveal className="mt-10 lg:mt-14 max-w-4xl">
          <blockquote>
            <p className="font-serif text-display-sm sm:text-display-md text-deep-700 text-balance leading-[1.15]">
              <span className="text-sand-500" aria-hidden>
                “
              </span>
              {lead.text[locale]}
              <span className="text-sand-500" aria-hidden>
                ”
              </span>
            </p>
            <footer className="mt-7 flex items-center gap-3 text-[0.72rem] uppercase tracking-wider2 text-ink-muted">
              <Stars value={lead.rating} />
              <span className="text-deep-700 font-medium">{lead.author}</span>
              {lead.country && (
                <>
                  <span className="h-3 w-px bg-granite-300" aria-hidden />
                  <span>{lead.country}</span>
                </>
              )}
            </footer>
          </blockquote>
        </Reveal>

        {rest.length > 0 && (
          <div className="mt-14 lg:mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {rest.slice(0, 6).map((r, i) => (
              <Reveal
                key={`${r.author}-${r.date}`}
                delay={i * 0.06}
                className="border-t border-granite-300/70 pt-6"
              >
                <Stars value={r.rating} />
                <p className="mt-4 text-ink-muted leading-relaxed text-[0.95rem]">
                  {r.text[locale]}
                </p>
                <p className="mt-4 text-[0.7rem] uppercase tracking-wider2 text-deep-600">
                  {r.author}
                  {r.country && (
                    <span className="text-ink-subtle"> · {r.country}</span>
                  )}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 shrink-0" aria-label={`${value}/5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={
            i < Math.round(value)
              ? 'h-3.5 w-3.5 fill-sand-500 text-sand-500'
              : 'h-3.5 w-3.5 text-granite-300'
          }
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
