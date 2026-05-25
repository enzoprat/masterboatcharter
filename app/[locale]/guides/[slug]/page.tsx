import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import GuidePage from '@/components/guides/GuidePage';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import JsonLdArticle from '@/components/seo/JsonLdArticle';
import JsonLdFaq from '@/components/seo/JsonLdFaq';
import { GUIDE_SLUGS, getGuide } from '@/lib/data/guides';
import { SITE } from '@/lib/site';

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const t = await getTranslations({
    locale,
    namespace: `guides.${guide.slug}`,
  });

  const url = `/guides/${guide.slug}`;
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: url,
      languages: { en: url, fr: `/fr${url}` },
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url,
      images: [{ url: guide.image }],
      type: 'article',
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: [guide.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const guide = getGuide(slug);
  if (!guide) notFound();

  const t = await getTranslations({
    locale,
    namespace: `guides.${guide.slug}`,
  });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const faqItems = t.raw('faq') as { q: string; a: string }[];
  const url = `/guides/${guide.slug}`;

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: 'Guides', href: '/guides' },
          { name: t('shortTitle'), href: url },
        ]}
      />
      <JsonLdArticle
        headline={t('title')}
        description={t('metaDescription')}
        url={`${SITE.url}${url}`}
        image={guide.image}
        datePublished={guide.datePublished}
        dateModified={guide.dateModified}
      />
      <JsonLdFaq items={faqItems} />
      <GuidePage guide={guide} />
    </>
  );
}
