'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/site';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileBookBar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Hide on booking page itself
  const onBookingPage = pathname.startsWith('/book');

  if (onBookingPage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 240 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 mobile-safe-bottom"
        >
          <div className="m-3 rounded-full bg-white/95 backdrop-blur-xl shadow-premium-lg border border-sand-200 flex items-center gap-2 p-1.5">
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
              className="flex-1 h-12 inline-flex items-center justify-center rounded-full bg-deep-700 text-white font-medium text-[0.95rem] hover:bg-deep-800 transition-colors"
            >
              {t('bookNow')}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
