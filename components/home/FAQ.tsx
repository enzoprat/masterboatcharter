'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  // JSON-LD schema for FAQ
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container-narrow">
        <Reveal className="max-w-2xl text-center mx-auto">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700">
            {t('title')}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 lg:mt-16 divide-y divide-sand-200 border-y border-sand-200">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-7 lg:py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3
                    className={cn(
                      'font-serif text-xl lg:text-2xl transition-colors duration-300',
                      isOpen ? 'text-deep-700' : 'text-deep-600 group-hover:text-deep-700'
                    )}
                  >
                    {item.q}
                  </h3>
                  <span
                    className={cn(
                      'shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full border transition-all duration-500 ease-premium',
                      isOpen
                        ? 'bg-deep-700 text-white border-deep-700 rotate-45'
                        : 'border-sand-300 text-deep-600 group-hover:border-deep-400'
                    )}
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 max-w-2xl text-ink-muted leading-relaxed text-[1.02rem]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
