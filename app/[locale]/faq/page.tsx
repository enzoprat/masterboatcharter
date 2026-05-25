import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import JsonLdFaq from '@/components/seo/JsonLdFaq';

type Section = {
  title: string;
  items: { q: string; a: string }[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: '/faq',
      languages: { en: '/faq', fr: '/fr/faq' },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faqPage' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const sections = t.raw('sections') as Section[];

  // Flatten all Q/A for FAQPage Schema
  const allItems = sections.flatMap((s) => s.items);

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: 'FAQ', href: '/faq' },
        ]}
      />
      <JsonLdFaq items={allItems} />
      <FaqContent />
    </>
  );
}

function FaqContent() {
  const t = useTranslations('faqPage');
  const sections = t.raw('sections') as Section[];

  return (
    <div className="pt-[140px] lg:pt-[180px] pb-20 lg:pb-28 bg-sand-50">
      <div className="container-narrow">
        <Reveal>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="mt-5 font-serif text-display-lg text-deep-700 text-balance">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-xl">
            {t('lead')}
          </p>
        </Reveal>

        <div className="mt-14 lg:mt-20 space-y-14 lg:space-y-20">
          {sections.map((section, si) => (
            <Reveal key={section.title} delay={si * 0.05}>
              <h2 className="font-serif text-display-sm text-deep-700">
                {section.title}
              </h2>
              <div className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
                {section.items.map((it, i) => (
                  <details
                    key={i}
                    className="group py-6 [&_summary::-webkit-details-marker]:hidden"
                    open={si === 0 && i === 0}
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <h3 className="font-serif text-lg lg:text-xl text-deep-700 group-open:text-deep-800 transition-colors">
                        {it.q}
                      </h3>
                      <span className="shrink-0 inline-flex items-center justify-center h-9 w-9 rounded-full border border-sand-300 text-deep-600 transition-transform duration-300 group-open:rotate-45 group-open:bg-deep-700 group-open:text-white group-open:border-deep-700">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-ink-muted leading-relaxed text-[1rem]">
                      {it.a}
                    </p>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
