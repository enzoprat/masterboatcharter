import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBookBar from '@/components/layout/MobileBookBar';
import JsonLdOrganization from '@/components/seo/JsonLdOrganization';
import { SITE } from '@/lib/site';
import { alternates } from '@/lib/seo';

/**
 * Display face. Cormorant Garamond is the default "luxury travel" serif —
 * every villa rental and yacht template uses it, so it reads as a genre
 * signal rather than an identity. Fraunces is a variable serif with an
 * optical-size axis: at display sizes it gets the warm, slightly hand-cut
 * quality of a painted boat name, which is what this business actually is.
 *
 * Body text uses the system stack (see globals.css) — real SF Pro on the
 * Apple devices most of this audience browses on, and one less font to
 * download.
 */
const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK', 'opsz'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: {
      default: t('defaultTitle'),
      // No brand suffix. It added 22 characters to every page title and
      // pushed 14 of 22 crawled pages past the ~60-character SERP cut —
      // so the brand was being truncated away anyway. Google appends the
      // site name itself when it helps. Measured 2026-09-05.
      template: '%s',
    },
    description: t('defaultDescription'),
    keywords: [
      'Seychelles boat excursions',
      'Big game fishing Seychelles',
      'Private boat transfer Seychelles',
      'Boat rental Seychelles',
      'Eco tourism Seychelles',
      'Boat tour Praslin',
      'La Digue boat',
      'Curieuse island tour',
    ],
    authors: [{ name: t('siteName') }],
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: locale === 'fr' ? `${SITE.url}/fr` : SITE.url,
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      siteName: t('siteName'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('defaultTitle'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      images: ['/og-image.jpg'],
      creator: '@masterboatcharter',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: alternates(locale, '/'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={display.variable}>
      <head>
        {/* Every Reveal renders at opacity 0 and waits for framer-motion to
            bring it in. With scripting off that leaves the entire page below
            the hero blank, so pin the end state. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <NextIntlClientProvider messages={messages}>
          <JsonLdOrganization />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBookBar />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
