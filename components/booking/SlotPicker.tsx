'use client';

import { useTranslations } from 'next-intl';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SLOTS, type SlotKey, type PriceOption } from '@/lib/data/activities';
import { getBlockedSlots } from '@/lib/booking/availability';
import { formatPrice } from '@/lib/utils';

type Props = {
  date: string | null;
  options: PriceOption[];
  selectedOptionId?: string;
  onSelect: (option: PriceOption) => void;
};

const SLOT_LABEL_KEYS: Record<SlotKey, string> = {
  morning: 'common.morning',
  afternoon: 'common.afternoon',
  full: 'common.fullDay',
  sunset: 'common.sunset',
};

export default function SlotPicker({
  date,
  options,
  selectedOptionId,
  onSelect,
}: Props) {
  const t = useTranslations();

  const blocked = date ? getBlockedSlots(date) : new Set<SlotKey>();

  if (!date) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-sand-300 p-8 text-center text-ink-muted">
        <p className="text-sm">{t('common.selectDate')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const slotDef = SLOTS[opt.slot];
        const isBlocked = blocked.has(opt.slot);
        const isSelected = selectedOptionId === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => !isBlocked && onSelect(opt)}
            disabled={isBlocked}
            className={cn(
              'w-full text-left rounded-2xl border p-5 transition-all duration-500 ease-premium relative overflow-hidden group',
              isSelected
                ? 'border-deep-600 bg-deep-700 text-white shadow-premium'
                : isBlocked
                  ? 'border-sand-200 bg-sand-50 text-deep-300 cursor-not-allowed'
                  : 'border-sand-200 bg-white text-deep-700 hover:border-deep-400 hover:shadow-premium-sm'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <p
                    className={cn(
                      'text-xs uppercase tracking-wider2 font-medium',
                      isSelected ? 'text-turquoise-200' : 'text-deep-400'
                    )}
                  >
                    {t(SLOT_LABEL_KEYS[opt.slot])}
                  </p>
                  <span
                    className={cn(
                      'text-xs',
                      isSelected ? 'text-white/60' : 'text-deep-300'
                    )}
                  >
                    {slotDef.start}–{slotDef.end}
                  </span>
                </div>
                <p
                  className={cn(
                    'font-serif text-lg',
                    isSelected ? 'text-white' : 'text-deep-700'
                  )}
                >
                  {t(opt.labelKey)}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p
                  className={cn(
                    'font-serif text-2xl',
                    isSelected ? 'text-white' : 'text-deep-700'
                  )}
                >
                  {opt.onRequest ? t('pricing.onRequest') : formatPrice(opt.price)}
                </p>
                <p
                  className={cn(
                    'text-xs',
                    isSelected ? 'text-white/60' : 'text-deep-400'
                  )}
                >
                  {opt.perBoat ? t('common.guests') : t('common.perPerson')}
                </p>
              </div>
              <div
                className={cn(
                  'h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-full border-2 transition-all',
                  isSelected
                    ? 'bg-white text-deep-700 border-white'
                    : isBlocked
                      ? 'border-sand-300 text-deep-300'
                      : 'border-sand-300 text-deep-400 group-hover:border-deep-500'
                )}
              >
                {isBlocked ? (
                  <Lock className="h-4 w-4" strokeWidth={1.5} />
                ) : isSelected ? (
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                ) : null}
              </div>
            </div>
            {isBlocked && (
              <div className="mt-3 text-xs text-deep-400">
                {t('booking.unavailable')}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
