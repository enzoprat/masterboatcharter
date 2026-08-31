'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Three short guarantees. A credit-card glyph next to "no payment online"
 * says nothing the sentence does not; a small brass index mark keeps the
 * scannability without the component-library look.
 */
const ITEMS = ['noPayment', 'confirm', 'cancel'] as const;

export default function ReassuranceBar({
  variant = 'light',
  className,
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const t = useTranslations('reassurance');

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border',
        variant === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-sand-200/60 border-sand-200',
        className
      )}
    >
      {ITEMS.map((key) => (
        <div
          key={key}
          className={cn(
            'flex items-baseline gap-3 px-4 py-3.5',
            variant === 'dark' ? 'bg-deep-900/40 text-white/80' : 'bg-white text-deep-700'
          )}
        >
          <span
            className={cn(
              'shrink-0 h-1 w-1 rounded-full translate-y-[-0.2em]',
              variant === 'dark' ? 'bg-turquoise-300' : 'bg-sand-500'
            )}
            aria-hidden
          />
          <span className="text-xs sm:text-sm font-medium leading-tight">
            {t(key)}
          </span>
        </div>
      ))}
    </div>
  );
}
