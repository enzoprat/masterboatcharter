'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBlockedSlots, toISODate } from '@/lib/booking/availability';

type Props = {
  value?: string;
  onChange: (date: string) => void;
};

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({ value, onChange }: Props) {
  const locale = useLocale();
  const tCommon = useTranslations('common');
  const [cursor, setCursor] = useState<Date>(() => startOfMonth(new Date()));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthName = useMemo(
    () =>
      cursor.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
        month: 'long',
        year: 'numeric',
      }),
    [cursor, locale]
  );

  const weekDays = useMemo(() => {
    const base = new Date(2024, 0, 1); // a Monday
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      days.push(
        d
          .toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' })
          .slice(0, 2)
      );
    }
    return days;
  }, [locale]);

  // Build a 6-week grid starting Monday
  const grid = useMemo(() => {
    const first = startOfMonth(cursor);
    // shift so Monday is column 0
    const offset = (first.getDay() + 6) % 7;
    const start = new Date(first);
    start.setDate(first.getDate() - offset);
    const days: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  }, [cursor]);

  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  return (
    <div className="rounded-3xl bg-white border border-sand-200 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => setCursor((c) => addMonths(c, -1))}
          disabled={cursor.getMonth() === today.getMonth() && cursor.getFullYear() === today.getFullYear()}
          className="h-10 w-10 inline-flex items-center justify-center rounded-full text-deep-600 hover:bg-sand-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <h3 className="font-serif text-xl text-deep-700 capitalize">{monthName}</h3>
        <button
          type="button"
          onClick={() => setCursor((c) => addMonths(c, 1))}
          className="h-10 w-10 inline-flex items-center justify-center rounded-full text-deep-600 hover:bg-sand-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center text-[0.7rem] uppercase tracking-wider text-deep-400 font-medium"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((d) => {
          const inMonth = d.getMonth() === cursor.getMonth();
          const past = d < today;
          const iso = toISODate(d);
          const blocked = getBlockedSlots(iso);
          const fullyBlocked = blocked.size >= 4;
          const partiallyBlocked = blocked.size > 0 && !fullyBlocked;
          const disabled = past || !inMonth || fullyBlocked;
          const selected = selectedDate && isSameDay(d, selectedDate);
          const isToday = isSameDay(d, today);

          return (
            <button
              key={iso}
              type="button"
              onClick={() => !disabled && onChange(iso)}
              disabled={disabled}
              className={cn(
                'relative aspect-square rounded-xl text-sm font-medium transition-all duration-300',
                'flex flex-col items-center justify-center gap-0.5',
                !inMonth && 'opacity-0 pointer-events-none',
                past && 'text-deep-200 cursor-not-allowed',
                fullyBlocked && 'text-deep-200 cursor-not-allowed line-through',
                selected && 'bg-deep-700 text-white shadow-premium-sm',
                !selected && !disabled && 'text-deep-700 hover:bg-sand-100',
                isToday && !selected && 'ring-1 ring-turquoise-300'
              )}
              aria-label={iso}
            >
              {d.getDate()}
              {partiallyBlocked && !selected && (
                <span className="h-1 w-1 rounded-full bg-turquoise-400 absolute bottom-1.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-sand-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-deep-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-deep-700" /> {tCommon('selectDate')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-turquoise-400" /> Partial availability
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-px w-3 bg-deep-200" /> Past / full
        </span>
      </div>
    </div>
  );
}
