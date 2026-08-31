'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { GALLERY } from '@/lib/data/gallery';

/**
 * Photographs read better on a dark ground — it stops the page reading as
 * one continuous white sheet, and it is the second of the two dark anchors
 * that give the homepage its rhythm.
 *
 * The heading sits to the right of the grid's first row rather than above
 * it, so this section does not open with the same eyebrow/title stack as
 * every other one.
 */
export default function Gallery() {
  const t = useTranslations('gallery');

  return (
    <section className="relative section bg-abyss-900 overflow-hidden">
      <div className="container-premium">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16">
          <Reveal>
            <h2 className="font-serif text-display-md text-white text-balance max-w-lg">
              {t('title')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[0.7rem] uppercase tracking-wider3 text-turquoise-300 sm:text-right">
              {t('eyebrow')}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense gap-2 sm:gap-3 lg:gap-4 auto-rows-[180px] md:auto-rows-[230px]">
          {GALLERY.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.06}
              direction="up"
              distance={20}
              className={`relative overflow-hidden rounded-sm bg-abyss-800 group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover img-hover"
              />
              {/* Lifts the photograph out of the dark ground on hover
                  instead of dimming it — the image is the content. */}
              <div className="absolute inset-0 bg-abyss-900/25 transition-opacity duration-700 ease-premium group-hover:opacity-0" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
