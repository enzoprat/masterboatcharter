'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { motion } from 'framer-motion';

export default function MobileBookBar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  // Hide on booking page itself
  if (pathname.startsWith('/book')) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 mobile-safe-bottom pointer-events-none"
    >
      <div className="m-3 rounded-full bg-white/95 backdrop-blur-xl shadow-premium-lg border border-sand-200 flex items-center gap-1.5 p-1.5 pointer-events-auto">
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="h-12 w-12 shrink-0 inline-flex items-center justify-center rounded-full bg-sand-100 text-deep-700 hover:bg-sand-200 transition-colors"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
        </a>
        <Link
          href={'/book/excursions' as any}
          className="flex-1 h-12 inline-flex items-center justify-center gap-1.5 rounded-full bg-turquoise-500 hover:bg-turquoise-600 text-white font-medium text-[0.95rem] transition-colors"
        >
          {t('bookNow')}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>
    </motion.div>
  );
}
