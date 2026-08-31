'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);

  // iOS Safari sometimes refuses autoplay unless we kick it explicitly.
  // Also resumes playback when the page becomes visible again.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => {
        /* swallow — iOS low-power mode etc. The poster + fallback covers this. */
      });
    };
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    // First user gesture (mobile low-power mode workaround)
    const onFirstTouch = () => {
      tryPlay();
      window.removeEventListener('touchstart', onFirstTouch);
      window.removeEventListener('click', onFirstTouch);
    };
    window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
    window.addEventListener('click', onFirstTouch, { once: true });
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('touchstart', onFirstTouch);
      window.removeEventListener('click', onFirstTouch);
    };
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-deep-900">
      {/* Background video */}
      {/* CSS, not framer-motion: this is the LCP element. Anything that
          starts at opacity 0 and waits for JS to reveal it is one failed
          hydration away from a blank hero, and it delays the largest paint
          on every visit. */}
      <div className="absolute inset-0 animate-hero-in [animation-fill-mode:both]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-underwater-poster.jpg"
          disablePictureInPicture
          controls={false}
          aria-hidden
          {...({ 'webkit-playsinline': 'true', 'x5-playsinline': 'true', 'x5-video-player-type': 'h5' } as Record<string, string>)}
        >
          {/* MP4 first: better universal mobile support (iOS Safari prefers H.264) */}
          <source src="/videos/hero-underwater.mp4" type="video/mp4" />
          <source src="/videos/hero-underwater.webm" type="video/webm" />
        </video>
        {/* Static fallback image (shown if video disabled) */}
        <Image
          src="/images/hero-underwater-poster.jpg"
          alt="Diver gliding over a colorful coral reef in Seychelles waters"
          fill
          priority
          sizes="100vw"
          className="object-cover -z-10"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-deep-900/25" />
      </div>

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
          <div className="animate-fade-up [animation-fill-mode:both]" style={{ animationDelay: '120ms' }}>
            <span className="eyebrow-light">{t('eyebrow')}</span>
          </div>

          <h1
            className="mt-6 font-serif text-display-xl text-white text-shadow leading-[0.95] animate-fade-up [animation-fill-mode:both]"
            style={{ animationDelay: '200ms' }}
          >
            <span className="block">{t('title')}</span>
            <span className="block italic font-light text-turquoise-200">
              {t('titleAccent')}
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-lg lg:text-xl text-white/85 leading-relaxed text-shadow animate-fade-up [animation-fill-mode:both]"
            style={{ animationDelay: '320ms' }}
          >
            {t('subtitle')}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up [animation-fill-mode:both]"
            style={{ animationDelay: '420ms' }}
          >
            <Link href={'/book/excursions' as any} className="btn-accent text-base px-8 py-4 shadow-premium">
              {t('ctaPrimary')}
            </Link>
            <Link href="/boat-excursions" className="btn-ghost text-base px-8 py-4">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Manifest line */}
        <div
          className="border-t border-white/20 pt-5 animate-fade-up [animation-fill-mode:both]"
          style={{ animationDelay: '540ms' }}
        >
          {/* A manifest line, not four glass tiles with decorative icons.
              An anchor glyph adds nothing to "1 boat · 12 guests max" — the
              words already say it. Rules and spacing carry the structure. */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 sm:gap-x-9 text-[0.7rem] sm:text-[0.74rem] uppercase tracking-wider2 text-white/70">
            {(['boat', 'since', 'local', 'eco'] as const).map((key, i) => (
              <li key={key} className="flex items-center gap-6 sm:gap-9">
                {i > 0 && (
                  <span className="hidden sm:block h-3 w-px bg-white/25" aria-hidden />
                )}
                <span className="leading-tight">{t(`stats.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}

