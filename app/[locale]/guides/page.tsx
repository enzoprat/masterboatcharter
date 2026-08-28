import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import { GUIDE_SLUGS, GUIDES } from '@/lib/data/guides';
import { alternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guidesIndex' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternates(locale, '/guides'),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: 'Guides', href: '/guides' },
        ]}
      />
      <GuidesIndex />
    </>
  );
}

function GuidesIndex() {
  const t = useTranslations('guidesIndex');

  return (
    <div className="pt-[140px] lg:pt-[180px] pb-20 lg:pb-28 bg-sand-50">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-14 lg:mb-20">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="mt-5 font-serif text-display-lg text-deep-700 text-balance">
            {t('title')}
          </h1>
          <p className="mt-6 text-lg text-ink-muted leading-relaxed">
            {t('lead')}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {GUIDE_SLUGS.map((slug, i) => (
            <GuideCard key={slug} slug={slug} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GuideCard({ slug, delay }: { slug: string; delay: number }) {
  const t = useTranslations(`guides.${slug}`);
  const guide = GUIDES[slug as keyof typeof GUIDES];

  return (
    <Reveal delay={delay}>
      <Link
        href={`/guides/${slug}` as any}
        className="group relative block overflow-hidden rounded-3xl bg-deep-900 aspect-[5/3]"
      >
        <Image
          src={guide.image}
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover img-hover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <div className="flex items-center gap-1.5 text-white/70 text-xs mb-3">
            <Calendar className="h-3 w-3" strokeWidth={1.5} />
            <span>{guide.dateModified}</span>
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl text-white text-balance leading-tight">
            {t('title')}
          </h2>
          <div className="mt-5 inline-flex items-center gap-1.5 text-white text-sm font-medium">
            <span className="link-underline">Read the guide</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
