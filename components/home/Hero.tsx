'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { ArrowDown, Star, Leaf, MapPin } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-deep-900">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/hero-boat-flag.jpg"
          alt="The Master Boat Charter boat at anchor with the Seychelles flag flying, La Digue"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-deep-900/15" />
      </motion.div>

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col container-premium pt-[140px] pb-16">
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow-light">
              {t('eyebrow')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-serif text-display-xl text-white text-shadow leading-[0.95]"
          >
            <span className="block">{t('title')}</span>
            <span className="block italic font-light text-turquoise-200">
              {t('titleAccent')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link href={'/book/excursions' as any} className="btn-accent text-base px-8 py-4 shadow-premium">
              {t('ctaPrimary')}
            </Link>
            <Link href="/boat-excursions" className="btn-ghost text-base px-8 py-4">
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md max-w-4xl"
        >
          <Stat
            icon={
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-turquoise-300 text-turquoise-300" />
                ))}
              </div>
            }
            label={t('stats.rating')}
          />
          <Stat label={t('stats.guests')} value="500+" />
          <Stat label={t('stats.local')} icon={<MapPin className="h-4 w-4 text-turquoise-300" strokeWidth={1.5} />} />
          <Stat label={t('stats.eco')} icon={<Leaf className="h-4 w-4 text-turquoise-300" strokeWidth={1.5} />} />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/60 text-[0.7rem] uppercase tracking-wider2"
        >
          <span>{t('scrollHint')}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-deep-900/50 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        {value && (
          <span className="font-serif text-2xl text-white">{value}</span>
        )}
      </div>
      <span className="text-[0.72rem] uppercase tracking-wider2 text-white/65 leading-tight">
        {label}
      </span>
    </div>
  );
}
