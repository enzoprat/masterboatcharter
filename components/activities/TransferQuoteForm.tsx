'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Send,
  Check,
  AlertCircle,
  MapPin,
  Users,
  Briefcase,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import ReassuranceBar from '@/components/ui/ReassuranceBar';
import { cn } from '@/lib/utils';
import { FORM_ENDPOINT, WEB3FORMS_KEY, whatsappLink } from '@/lib/site';

const ISLAND_KEYS = [
  'la-digue',
  'praslin',
  'mahe',
  'curieuse',
  'felicite',
  'grande-soeur',
  'petite-soeur',
] as const;

type IslandKey = (typeof ISLAND_KEYS)[number];

export default function TransferQuoteForm() {
  const t = useTranslations('transferQuote');
  const tCommon = useTranslations('common');

  const [from, setFrom] = useState<IslandKey | ''>('mahe');
  const [to, setTo] = useState<IslandKey | ''>('la-digue');
  const [isReturn, setIsReturn] = useState(true);
  const [guests, setGuests] = useState(2);
  const [bags, setBags] = useState(2);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const samePick = from && to && from === to;
  const canSubmit =
    !!from &&
    !!to &&
    !samePick &&
    guests >= 1 &&
    name.length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    phone.length > 4;

  const islandLabel = (k: IslandKey | '') =>
    k ? t(`islands.${k}` as any) : '';

  const submit = async () => {
    if (!canSubmit || !from || !to) return;
    setSubmitting(true);
    setError(null);

    const summary = [
      `Departure: ${islandLabel(from)}`,
      `Arrival: ${islandLabel(to)}`,
      `Return: ${isReturn ? 'Yes' : 'One-way'}`,
      `Travellers: ${guests}`,
      `Luggage pieces: ${bags}`,
      date ? `Preferred date: ${date}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Master Boat Charter] Transfer quote: ${islandLabel(from)} → ${islandLabel(to)}`,
          from_name: 'Master Boat Charter — Transfer quote',
          name,
          email,
          phone,
          departure: islandLabel(from),
          arrival: islandLabel(to),
          return_trip: isReturn ? 'Yes' : 'One-way',
          travellers: guests,
          luggage: bags,
          preferred_date: date,
          message: summary,
        }),
      });
      const json = await res.json().catch(() => ({} as { success?: boolean }));
      if (!res.ok || !json.success) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch (e) {
      const body = [
        `Hello, I'd like a transfer quote.`,
        '',
        summary,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
      ].join('\n');
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
      setError(t('errorBody'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-narrow text-center">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-nature-100 text-nature-600 mb-6">
            <Check className="h-7 w-7" strokeWidth={1.5} />
          </span>
          <h2 className="font-serif text-display-md text-deep-700">
            {t('successTitle')}
          </h2>
          <p className="mt-5 text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
            {t('successBody')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="container-premium">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-2">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h2 className="mt-5 font-serif text-display-lg text-deep-700">
              {t('title')}
            </h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed">
              {t('lead')}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:max-w-md w-full">
            <ReassuranceBar />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12 lg:mt-16">
          <div className="rounded-3xl bg-sand-50 border border-sand-200 p-6 sm:p-8 lg:p-10">
            {/* Route row */}
            <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <Field icon={<MapPin className="h-4 w-4" />} label={t('fromLabel')}>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value as IslandKey)}
                  className={selectCls}
                >
                  <option value="">{t('selectIsland')}</option>
                  {ISLAND_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {t(`islands.${k}` as any)}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="hidden sm:flex h-[58px] items-center justify-center text-deep-400">
                <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <Field icon={<MapPin className="h-4 w-4" />} label={t('toLabel')}>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value as IslandKey)}
                  className={selectCls}
                >
                  <option value="">{t('selectIsland')}</option>
                  {ISLAND_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {t(`islands.${k}` as any)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {samePick && (
              <p className="mt-3 text-xs text-red-600">{t('samePickError')}</p>
            )}

            {/* Return toggle */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider2 text-deep-500 font-medium mb-2">
                {t('returnLabel')}
              </p>
              <div className="inline-flex bg-white border border-sand-300 rounded-full p-1">
                <button
                  type="button"
                  onClick={() => setIsReturn(true)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-colors',
                    isReturn
                      ? 'bg-deep-700 text-white'
                      : 'text-deep-500 hover:text-deep-700'
                  )}
                >
                  {t('returnYes')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsReturn(false)}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-colors',
                    !isReturn
                      ? 'bg-deep-700 text-white'
                      : 'text-deep-500 hover:text-deep-700'
                  )}
                >
                  {t('returnNo')}
                </button>
              </div>
            </div>

            {/* Counters + date */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <Field
                icon={<Users className="h-4 w-4" />}
                label={t('guestsLabel')}
              >
                <Counter value={guests} onChange={setGuests} min={1} max={12} />
              </Field>
              <Field
                icon={<Briefcase className="h-4 w-4" />}
                label={t('bagsLabel')}
              >
                <Counter value={bags} onChange={setBags} min={0} max={24} />
              </Field>
              <Field
                icon={<CalendarDays className="h-4 w-4" />}
                label={t('dateLabel')}
              >
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={selectCls}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </Field>
            </div>

            {/* Contact */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <Field label={t('nameLabel')}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className={selectCls}
                />
              </Field>
              <Field label={t('emailLabel')}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className={selectCls}
                />
              </Field>
              <Field label={t('phoneLabel')}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className={selectCls}
                />
              </Field>
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={1.8} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit || submitting}
                className="btn-accent text-base px-7 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t('submitting') : t('submit')}
                {!submitting && <Send className="h-4 w-4" strokeWidth={1.5} />}
              </button>
              <p className="text-xs text-deep-400">
                {tCommon('from')} {islandLabel(from) || '...'} → {islandLabel(to) || '...'}
                {isReturn ? ' · return' : ' · one-way'} · {guests} {tCommon('guests').toLowerCase()}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider2 text-deep-500 font-medium mb-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function Counter({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex items-stretch border border-sand-300 rounded-2xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-12 text-lg text-deep-700 hover:bg-sand-100 disabled:opacity-30 transition-colors"
      >
        −
      </button>
      <div className="flex-1 text-center font-serif text-xl text-deep-700 self-center">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-12 text-lg text-deep-700 hover:bg-sand-100 disabled:opacity-30 transition-colors"
      >
        +
      </button>
    </div>
  );
}

const selectCls =
  'w-full bg-white border border-sand-300 rounded-2xl px-4 py-3.5 text-deep-700 placeholder-deep-300 focus:border-deep-500 focus:ring-2 focus:ring-deep-200 outline-none transition-all duration-300';
