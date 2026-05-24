import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBookBar from '@/components/layout/MobileBookBar';
import JsonLdOrganization from '@/components/seo/JsonLdOrganization';
import { SITE } from '@/lib/site';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
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
      template: `%s — ${t('siteName')}`,
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
      url: SITE.url,
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
    alternates: {
      canonical: '/',
      languages: {
        en: '/',
        fr: '/fr',
      },
    },
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
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
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
