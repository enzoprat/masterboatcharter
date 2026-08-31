'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { MessageCircle, Languages, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { whatsappLink } from '@/lib/site';

export default function Captain() {
  const t = useTranslations('captain');

  return (
    <section className="relative section-tight bg-granite-50">
      <div className="container-premium">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-center">
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand-100">
              <Image
                src="/images/boat-marina.jpg"
                alt="Our Seychellois captain with the Master Boat at La Digue marina"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep-900/55 via-deep-900/15 to-transparent" />
            </div>
            {/* Decorative ribbon */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-44 rounded-2xl bg-white shadow-premium-lg p-5 border border-sand-200">
              <p className="text-eyebrow uppercase tracking-wider2 text-deep-400 font-medium">
                {t('languagesLabel')}
              </p>
              <p className="mt-1.5 text-deep-700 font-medium text-sm flex items-center gap-1.5">
                <Languages className="h-3.5 w-3.5 text-turquoise-500" strokeWidth={1.5} />
                {t('languages')}
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="mt-5 font-serif text-display-md text-deep-700 text-balance">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed">{t('lead')}</p>
            <p className="mt-5 text-ink-muted leading-relaxed">{t('bio')}</p>

            {/* Mobile-only languages */}
            <p className="lg:hidden mt-6 flex items-center gap-2 text-sm text-deep-500">
              <Languages className="h-4 w-4 text-turquoise-500" strokeWidth={1.5} />
              <span className="font-medium text-deep-700">{t('languagesLabel')}:</span> {t('languages')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsappLink('Hello captain, I have a question about your charter:')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-deep-700 hover:bg-deep-800 text-white px-6 py-3.5 text-sm font-medium transition-all duration-500 ease-premium hover:shadow-premium-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                {t('cta')}
              </a>
              <Link
                href={'/about/captain' as any}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-deep-700 hover:text-deep-800 group px-2"
              >
                <span className="link-underline">{t('moreLink')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
