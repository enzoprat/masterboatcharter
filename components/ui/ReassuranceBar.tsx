'use client';

import { useTranslations } from 'next-intl';
import { CreditCard, Clock, RotateCcw, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { key: 'noPayment', icon: CreditCard },
  { key: 'confirm', icon: Clock },
  { key: 'cancel', icon: RotateCcw },
  { key: 'oneGroup', icon: Users },
] as const;

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
        'grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border',
        variant === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-sand-200/60 border-sand-200',
        className
      )}
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.key}
            className={cn(
              'flex items-center gap-3 px-4 py-3.5',
              variant === 'dark' ? 'bg-deep-900/40 text-white/80' : 'bg-white text-deep-700'
            )}
          >
            <Icon
              className={cn(
                'h-4 w-4 shrink-0',
                variant === 'dark' ? 'text-turquoise-300' : 'text-turquoise-500'
              )}
              strokeWidth={1.6}
            />
            <span className="text-xs sm:text-sm font-medium leading-tight">
              {t(item.key)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
