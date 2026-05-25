'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, MessageCircle, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE, whatsappLink } from '@/lib/site';
import Logo from '@/components/ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/boat-excursions', key: 'excursions' },
  { href: '/big-game-fishing', key: 'fishing' },
  { href: '/boat-transfers', key: 'transfers' },
  { href: '/boat-rental', key: 'rental' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Pages with a dark hero (transparent header until scroll)
  const hasDarkHero = pathname === '/' || pathname === '/about';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isTransparent = hasDarkHero && !scrolled;
  const textLight = isTransparent;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-premium',
          scrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-sand-200/60 shadow-premium-sm'
            : isTransparent
              ? 'bg-transparent'
              : 'bg-white border-b border-sand-200/60'
        )}
      >
        <div className="container-premium">
          <div className="flex items-center justify-between h-[72px] lg:h-[88px]">
            <Link
              href="/"
              aria-label="Master Boat Charter — Home"
              className="shrink-0"
            >
              <Logo variant={textLight && !scrolled ? 'light' : 'dark'} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className={cn(
                      'relative px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                      textLight && !scrolled
                        ? 'text-white/90 hover:text-white'
                        : 'text-ink-soft hover:text-deep-700',
                      active && (textLight && !scrolled ? 'text-white' : 'text-deep-700')
                    )}
                  >
                    {t(item.key as any)}
                    {active && (
                      <motion.span
                        layoutId="active-pill"
                        className={cn(
                          'absolute -bottom-px left-3.5 right-3.5 h-px',
                          textLight && !scrolled ? 'bg-white' : 'bg-deep-600'
                        )}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${SITE.whatsappDigits}`}
                aria-label={t('phone')}
                className={cn(
                  'hidden md:inline-flex items-center gap-2 px-3 h-10 rounded-full text-sm font-medium transition-all duration-300',
                  textLight && !scrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : 'text-deep-600 hover:bg-sand-100'
                )}
              >
                <Phone className="h-[16px] w-[16px]" strokeWidth={1.5} />
                <span className="tabular-nums">{SITE.whatsapp}</span>
              </a>
              <LocaleSwitcher light={textLight && !scrolled} />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={cn(
                  'hidden sm:inline-flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300',
                  textLight && !scrolled
                    ? 'text-white/90 hover:bg-white/10 hover:text-white'
                    : 'text-deep-600 hover:bg-sand-100'
                )}
              >
                <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </a>
              <Link
                href={'/book/excursions' as any}
                className={cn(
                  'hidden md:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-500 ease-premium',
                  textLight && !scrolled
                    ? 'bg-white text-deep-700 hover:bg-turquoise-50 hover:shadow-premium'
                    : 'bg-turquoise-500 text-white hover:bg-turquoise-600 hover:shadow-premium-lg hover:-translate-y-px'
                )}
              >
                {t('bookNow')}
              </Link>

              <button
                onClick={() => setOpen(true)}
                aria-label={t('menu')}
                className={cn(
                  'lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors',
                  textLight && !scrolled
                    ? 'text-white hover:bg-white/10'
                    : 'text-deep-700 hover:bg-sand-100'
                )}
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-deep-900/40 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-md bg-white shadow-premium-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-sand-200">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t('close')}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-full text-deep-700 hover:bg-sand-100"
                >
                  <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, duration: 0.4 }}
                    >
                      <Link
                        href={item.href as any}
                        className="block px-3 py-3 text-lg font-serif text-deep-700 hover:text-turquoise-600 transition-colors border-b border-sand-200/60"
                      >
                        {t(item.key as any)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="px-6 py-5 border-t border-sand-200 space-y-3">
                <Link
                  href={'/book/excursions' as any}
                  className="btn-accent w-full"
                  onClick={() => setOpen(false)}
                >
                  {t('bookNow')}
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  {t('whatsapp')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LocaleSwitcher({ light }: { light: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === 'en' ? 'fr' : 'en';

  return (
    <Link
      href={pathname as any}
      locale={other}
      aria-label={`Switch to ${other.toUpperCase()}`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 h-9 text-xs font-medium uppercase tracking-wider transition-colors',
        light
          ? 'text-white/85 hover:bg-white/10 hover:text-white'
          : 'text-ink-soft hover:bg-sand-100 hover:text-deep-700'
      )}
    >
      <Globe className="h-3.5 w-3.5" strokeWidth={1.5} />
      {other}
    </Link>
  );
}
