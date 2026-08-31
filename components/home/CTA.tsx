'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/site';

export default function CTA() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');

  return (
    <section className="relative section bg-granite-50">
      <div className="container-premium">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-deep-900 min-h-[440px] lg:min-h-[520px] flex items-center">
          <Image
            src="/images/beach-palms.jpg"
            alt="Seychelles coastline"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-deep-900 via-deep-900/85 to-deep-900/30" />

          <Reveal className="relative container-premium py-16 lg:py-24 max-w-3xl">
            <span className="eyebrow-light">{t('eyebrow')}</span>
            <h2 className="mt-6 font-serif text-display-lg text-white text-balance">
              {t('title')}{' '}
              <span className="italic font-light text-turquoise-200">
                {t('titleAccent')}
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href={'/book/excursions' as any} className="btn-accent text-base px-8 py-4">
                {t('ctaPrimary')}
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-base px-7 py-4"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                {tNav('whatsapp')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
