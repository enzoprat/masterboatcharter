'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { GALLERY } from '@/lib/data/gallery';

export default function Gallery() {
  const t = useTranslations('gallery');

  return (
    <section className="relative py-24 lg:py-32 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 lg:mt-20 grid grid-cols-2 md:grid-cols-4 grid-flow-row-dense gap-3 sm:gap-4 lg:gap-5 auto-rows-[180px] md:auto-rows-[220px]">
          {GALLERY.map((img, i) => (
            <Reveal
              key={i}
              delay={(i % 4) * 0.06}
              direction="up"
              distance={20}
              className={`relative overflow-hidden rounded-2xl bg-sand-100 group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover img-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
