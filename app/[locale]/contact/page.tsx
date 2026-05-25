import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { MessageCircle, MapPin } from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('lead'),
    alternates: {
      canonical: '/contact',
      languages: { en: '/contact', fr: '/fr/contact' },
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
  return <ContactPage />;
}

function ContactPage() {
  const t = useTranslations('contact');
  return (
    <>
      <section className="relative pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 bg-sand-50 overflow-hidden">
        <div className="container-premium grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-5 font-serif text-display-lg text-deep-700 text-balance">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg text-ink-muted leading-relaxed max-w-md">
              {t('lead')}
            </p>

            <div className="mt-10 space-y-6">
              <InfoRow
                icon={<MessageCircle className="h-5 w-5" strokeWidth={1.5} />}
                label={t('whatsappLabel')}
                value={SITE.whatsapp}
                href={whatsappLink()}
              />
              <InfoRow
                icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />}
                label={t('baseLabel')}
                value={t('baseValue')}
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl bg-white border border-sand-200 p-7 lg:p-10 shadow-premium-sm">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/images/excursions-hero.jpg"
          alt="Seychelles granite island and turquoise lagoon"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/60 to-transparent" />
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-deep-700 text-white shrink-0">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider2 text-deep-400 font-medium">{label}</p>
        <p className="mt-1 text-deep-700 font-medium">{value}</p>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block group hover:opacity-90 transition-opacity">
        {content}
      </a>
    );
  }
  return content;
}
