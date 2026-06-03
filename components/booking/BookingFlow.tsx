'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Info, Minus, Plus, ShieldCheck, CalendarDays, Users, Clock } from 'lucide-react';
import {
  ACTIVITIES,
  getActivity,
  SLOTS,
  type ActivitySlug,
  type PriceOption,
} from '@/lib/data/activities';
import { cn, formatPrice } from '@/lib/utils';
import { FORM_ENDPOINT, WEB3FORMS_KEY, whatsappLink } from '@/lib/site';
import Calendar from './Calendar';
import SlotPicker from './SlotPicker';
import ReassuranceBar from '@/components/ui/ReassuranceBar';

type Step = 'datetime' | 'details' | 'review';

const STEPS: { key: Step; tKey: string }[] = [
  { key: 'datetime', tKey: 'stepDate' },
  { key: 'details', tKey: 'stepDetails' },
  { key: 'review', tKey: 'stepReview' },
];

export default function BookingFlow({ slug }: { slug: ActivitySlug }) {
  const t = useTranslations('booking');
  const tCommon = useTranslations('common');
  const tActivities = useTranslations('activities');
  const tRaw = useTranslations();
  const locale = useLocale();
  const search = useSearchParams();

  const activity = getActivity(slug);
  const allOptions: PriceOption[] = useMemo(() => {
    if (activity.pricing.type === 'circuits') {
      return activity.pricing.circuits.flatMap((c) => c.options);
    }
    return activity.pricing.options;
  }, [activity]);

  // Prefill from query (?option=)
  const initialOptionId = search.get('option') ?? allOptions[0]?.id;

  const [step, setStep] = useState<Step>('datetime');
  const [activitySlug, setActivitySlug] = useState<ActivitySlug>(slug);
  const [date, setDate] = useState<string | null>(null);
  const [option, setOption] = useState<PriceOption | undefined>(
    allOptions.find((o) => o.id === initialOptionId) ?? allOptions[0]
  );
  const [guests, setGuests] = useState<number>(2);
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    comments: '',
    agree: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // When activity changes (sidebar), refresh options
  useEffect(() => {
    const a = getActivity(activitySlug);
    const opts =
      a.pricing.type === 'circuits'
        ? a.pricing.circuits.flatMap((c) => c.options)
        : a.pricing.options;
    setOption(opts[0]);
  }, [activitySlug]);

  const currentActivity = getActivity(activitySlug);
  const currentOptions: PriceOption[] = useMemo(() => {
    if (currentActivity.pricing.type === 'circuits') {
      return currentActivity.pricing.circuits.flatMap((c) => c.options);
    }
    return currentActivity.pricing.options;
  }, [currentActivity]);

  const maxGuests = option?.maxGuests ?? currentActivity.maxGuests;
  const minGuests = option?.minGuests ?? 1;

  // Constrain guests
  useEffect(() => {
    if (guests < minGuests) setGuests(minGuests);
    if (guests > maxGuests) setGuests(maxGuests);
  }, [option, minGuests, maxGuests, guests]);

  const total = option
    ? option.onRequest
      ? null
      : option.perBoat
        ? option.price
        : option.price * guests
    : 0;

  const canContinueDate = !!(date && option);
  const canContinueDetails =
    details.name.length > 1 &&
    /^\S+@\S+\.\S+$/.test(details.email) &&
    details.phone.length > 4 &&
    details.agree;

  const goNext = () => {
    if (step === 'datetime' && canContinueDate) setStep('details');
    else if (step === 'details' && canContinueDetails) setStep('review');
  };

  const goBack = () => {
    if (step === 'details') setStep('datetime');
    else if (step === 'review') setStep('details');
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const summary = [
        `Activity: ${tActivities(`${currentActivity.i18nKey}.title`)}`,
        option ? `Option: ${tRaw(option.labelKey)} (${SLOTS[option.slot].start}–${SLOTS[option.slot].end})` : null,
        `Date: ${date}`,
        `Guests: ${guests}`,
        option
          ? `Estimated total: ${
              option.onRequest
                ? tRaw('pricing.onRequest')
                : formatPrice(option.perBoat ? option.price : option.price * guests)
            }`
          : null,
      ]
        .filter(Boolean)
        .join('\n');

      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `[Master Boat Charter] New booking request — ${tActivities(`${currentActivity.i18nKey}.title`)} · ${date}`,
          from_name: 'Master Boat Charter — Booking',
          name: details.name,
          email: details.email,
          phone: details.phone,
          activity: tActivities(`${currentActivity.i18nKey}.title`),
          option: option ? tRaw(option.labelKey) : '',
          date,
          slot: option ? `${SLOTS[option.slot].start}–${SLOTS[option.slot].end}` : '',
          guests,
          total: option
            ? option.onRequest
              ? 'On request'
              : formatPrice(option.perBoat ? option.price : option.price * guests)
            : '',
          comments: details.comments,
          message: summary,
        }),
      });
      const json = await res.json().catch(() => ({} as { success?: boolean }));
      if (!res.ok || !json.success) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch (e) {
      // WhatsApp fallback so the lead still reaches us (without exposing our inbox)
      const body = [
        `Hello, I would like to book a trip via your website.`,
        '',
        `Name: ${details.name}`,
        `Email: ${details.email}`,
        `Phone: ${details.phone}`,
        '',
        `Activity: ${tActivities(`${currentActivity.i18nKey}.title`)}`,
        option ? `Option: ${tRaw(option.labelKey)}` : '',
        `Date: ${date}`,
        option ? `Slot: ${SLOTS[option.slot].start}–${SLOTS[option.slot].end}` : '',
        `Guests: ${guests}`,
        '',
        details.comments ? `Comments: ${details.comments}` : '',
      ]
        .filter(Boolean)
        .join('\n');
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
      setError(t('errorBody'));
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80svh] flex items-center pt-[120px] pb-20">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-nature-100 text-nature-600 mb-8"
          >
            <Check className="h-9 w-9" strokeWidth={1.5} />
          </motion.div>
          <h1 className="font-serif text-display-md text-deep-700">
            {t('successTitle')}
          </h1>
          <p className="mt-5 text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
            {t('successBody')}
          </p>
          <Link href="/" className="btn-outline mt-10 inline-flex">
            ← {tRaw('nav.home')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[120px] lg:pt-[140px] pb-32 lg:pb-20 bg-sand-50 min-h-screen">
      <div className="container-premium">
        {/* Header */}
        <div className="max-w-3xl mb-10 lg:mb-14">
          <Link
            href={`/${slugToActivityRoute[slug]}` as any}
            className="btn-link group mb-5"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
            {tActivities(`${currentActivity.i18nKey}.title`)}
          </Link>
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="mt-5 font-serif text-display-lg text-deep-700">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-xl">
            {t('lead')}
          </p>

          {/* Deposit badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-turquoise-50 border border-turquoise-200 px-4 py-2 text-sm text-deep-700">
            <span className="font-serif text-base text-turquoise-700">20%</span>
            <span>{t('depositLabel')}</span>
          </div>

          {/* Trust strip */}
          <div className="mt-6 max-w-2xl">
            <ReassuranceBar />
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-10 lg:mb-14">
          <ol className="flex items-center gap-2 sm:gap-4 overflow-x-auto scrollbar-hide">
            {STEPS.map((s, i) => {
              const idx = STEPS.findIndex((x) => x.key === step);
              const isActive = i === idx;
              const isDone = i < idx;
              return (
                <li key={s.key} className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center h-8 w-8 rounded-full text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-deep-700 text-white'
                        : isDone
                          ? 'bg-nature-500 text-white'
                          : 'bg-white border border-sand-300 text-deep-400'
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      'text-sm hidden sm:inline',
                      isActive ? 'text-deep-700 font-medium' : 'text-deep-400'
                    )}
                  >
                    {t(s.tKey)}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="h-px w-6 sm:w-12 bg-sand-300" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* Main column */}
          <div>
            <AnimatePresence mode="wait">
              {step === 'datetime' && (
                <motion.div
                  key="datetime"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  {/* Activity switch */}
                  <div className="rounded-3xl bg-white border border-sand-200 p-5 sm:p-6">
                    <h2 className="font-serif text-xl text-deep-700 mb-4">
                      {t('stepActivity')}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {ACTIVITIES.map((a) => {
                        const active = a.slug === activitySlug;
                        return (
                          <button
                            key={a.slug}
                            type="button"
                            onClick={() => setActivitySlug(a.slug)}
                            className={cn(
                              'rounded-2xl border px-4 py-3.5 text-left transition-all duration-300',
                              active
                                ? 'border-deep-700 bg-deep-700 text-white'
                                : 'border-sand-200 bg-white text-deep-700 hover:border-deep-400'
                            )}
                          >
                            <p
                              className={cn(
                                'text-xs uppercase tracking-wider2',
                                active ? 'text-turquoise-200' : 'text-deep-400'
                              )}
                            >
                              {a.order < 10 ? `0${a.order}` : a.order}
                            </p>
                            <p className="mt-1.5 font-medium text-sm">
                              {tActivities(`${a.i18nKey}.shortTitle`)}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h2 className="font-serif text-xl text-deep-700">
                        {tCommon('selectDate')}
                      </h2>
                      <Calendar value={date ?? undefined} onChange={(d) => setDate(d)} />
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-serif text-xl text-deep-700">
                        {tCommon('selectTime')}
                      </h2>
                      <SlotPicker
                        date={date}
                        options={currentOptions}
                        selectedOptionId={option?.id}
                        onSelect={(o) => setOption(o)}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="rounded-3xl bg-white border border-sand-200 p-5 sm:p-6">
                    <h2 className="font-serif text-xl text-deep-700 mb-1">
                      {t('guestsCount')}
                    </h2>
                    <p className="text-sm text-deep-400 mb-5">
                      {minGuests}–{maxGuests} {tCommon('guests').toLowerCase()}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(minGuests, g - 1))}
                        className="h-12 w-12 rounded-full border border-sand-300 text-deep-700 hover:bg-sand-100 flex items-center justify-center transition-colors disabled:opacity-30"
                        disabled={guests <= minGuests}
                      >
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <div className="flex-1 text-center font-serif text-3xl text-deep-700">
                        {guests}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))}
                        className="h-12 w-12 rounded-full border border-sand-300 text-deep-700 hover:bg-sand-100 flex items-center justify-center transition-colors disabled:opacity-30"
                        disabled={guests >= maxGuests}
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rounded-3xl bg-white border border-sand-200 p-6 sm:p-8 space-y-5">
                    <h2 className="font-serif text-2xl text-deep-700 mb-2">
                      {t('stepDetails')}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label={t('fullName')}
                        value={details.name}
                        onChange={(v) => setDetails({ ...details, name: v })}
                        autoComplete="name"
                      />
                      <Input
                        label={t('email')}
                        type="email"
                        value={details.email}
                        onChange={(v) => setDetails({ ...details, email: v })}
                        autoComplete="email"
                      />
                    </div>
                    <Input
                      label={t('phone')}
                      type="tel"
                      value={details.phone}
                      onChange={(v) => setDetails({ ...details, phone: v })}
                      autoComplete="tel"
                    />
                    <label className="block">
                      <span className="block text-xs uppercase tracking-wider2 text-deep-500 font-medium mb-2">
                        {t('comments')}
                      </span>
                      <textarea
                        value={details.comments}
                        onChange={(e) =>
                          setDetails({ ...details, comments: e.target.value })
                        }
                        placeholder={t('commentsPlaceholder')}
                        rows={4}
                        className="w-full bg-white border border-sand-300 rounded-2xl px-4 py-3.5 text-deep-700 placeholder-deep-300 focus:border-deep-500 focus:ring-2 focus:ring-deep-200 outline-none transition-all duration-300 resize-y"
                      />
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={details.agree}
                        onChange={(e) =>
                          setDetails({ ...details, agree: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded border-sand-400 text-deep-700 focus:ring-deep-300"
                      />
                      <span className="text-sm text-ink-muted leading-relaxed group-hover:text-deep-700 transition-colors">
                        {t('agreeTerms')}
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rounded-3xl bg-white border border-sand-200 p-6 sm:p-8 space-y-5">
                    <h2 className="font-serif text-2xl text-deep-700">
                      {t('stepReview')}
                    </h2>
                    <ReviewRow label={t('stepActivity')} value={tActivities(`${currentActivity.i18nKey}.title`)} />
                    {option && (
                      <ReviewRow
                        label={tRaw(option.labelKey)}
                        value={`${SLOTS[option.slot].start}–${SLOTS[option.slot].end}`}
                      />
                    )}
                    {date && (
                      <ReviewRow
                        label={t('selectedDate')}
                        value={new Date(date + 'T00:00:00').toLocaleDateString(
                          locale === 'fr' ? 'fr-FR' : 'en-US',
                          { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                        )}
                      />
                    )}
                    <ReviewRow label={t('guestsCount')} value={`${guests}`} />
                    <ReviewRow label={t('fullName')} value={details.name} />
                    <ReviewRow label={t('email')} value={details.email} />
                    <ReviewRow label={t('phone')} value={details.phone} />
                    {details.comments && (
                      <ReviewRow label={t('comments')} value={details.comments} />
                    )}

                    {error && (
                      <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                        <strong>{t('errorTitle')}.</strong> {error}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 'datetime'}
                className="btn-outline disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                {tCommon('back')}
              </button>
              {step !== 'review' ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={step === 'datetime' ? !canContinueDate : !canContinueDetails}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {tCommon('next')}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-accent disabled:opacity-60"
                >
                  {submitting ? t('submitting') : t('submit')}
                  {!submitting && <ArrowRight className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              )}
            </div>
          </div>

          {/* Summary sidebar */}
          <aside className="lg:sticky lg:top-[110px]">
            <div className="rounded-3xl bg-deep-900 text-white overflow-hidden shadow-premium">
              <div className="relative h-44">
                <Image
                  src={currentActivity.cardImage}
                  alt={tActivities(`${currentActivity.i18nKey}.title`)}
                  fill
                  sizes="380px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-900 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-eyebrow uppercase tracking-wider2 text-turquoise-200">
                    {tActivities(`${currentActivity.i18nKey}.tagline`)}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-white">
                    {tActivities(`${currentActivity.i18nKey}.title`)}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <SummaryRow
                  icon={<CalendarDays className="h-4 w-4" strokeWidth={1.5} />}
                  label={t('selectedDate')}
                  value={
                    date
                      ? new Date(date + 'T00:00:00').toLocaleDateString(
                          locale === 'fr' ? 'fr-FR' : 'en-US',
                          { day: 'numeric', month: 'short', year: 'numeric' }
                        )
                      : '—'
                  }
                />
                <SummaryRow
                  icon={<Clock className="h-4 w-4" strokeWidth={1.5} />}
                  label={tCommon('selectTime')}
                  value={
                    option ? `${tRaw(option.labelKey)} · ${SLOTS[option.slot].start}` : '—'
                  }
                />
                <SummaryRow
                  icon={<Users className="h-4 w-4" strokeWidth={1.5} />}
                  label={tCommon('guests')}
                  value={`${guests}`}
                />

                <div className="h-px bg-white/10" />

                <div className="flex items-end justify-between">
                  <span className="text-white/70 text-sm">Total</span>
                  <div className="text-right">
                    <p className="font-serif text-4xl text-white leading-none">
                      {total === null ? tRaw('pricing.onRequest') : formatPrice(total ?? 0)}
                    </p>
                    {option && !option.perBoat && !option.onRequest && (
                      <p className="text-xs text-white/60 mt-1">
                        {formatPrice(option.price)} × {guests}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-deep-800/60 border-t border-white/10">
                <div className="flex items-start gap-3 text-xs text-white/70">
                  <Info className="h-4 w-4 text-turquoise-300 mt-px shrink-0" strokeWidth={1.5} />
                  <p>{t('policyBody')}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-nature-50 border border-nature-200/80 p-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-nature-600 mt-px shrink-0" strokeWidth={1.5} />
              <p className="text-xs text-nature-700 leading-relaxed">
                {t('policyTitle')}. {t('policyBody')}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky recap bar — visible only on small screens */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 mobile-safe-bottom pointer-events-none">
        <div className="m-3 rounded-2xl bg-deep-900/95 backdrop-blur-xl text-white shadow-premium-lg border border-white/10 flex items-center gap-3 px-4 py-3 pointer-events-auto">
          <div className="flex-1 min-w-0">
            <p className="text-[0.65rem] uppercase tracking-wider2 text-turquoise-200 leading-tight">
              {date
                ? new Date(date + 'T00:00:00').toLocaleDateString(
                    locale === 'fr' ? 'fr-FR' : 'en-US',
                    { day: 'numeric', month: 'short' }
                  )
                : tCommon('selectDate')}{' '}
              · {guests} {tCommon('guests').toLowerCase()}
            </p>
            <p className="font-serif text-xl text-white leading-tight truncate">
              {total === null ? tRaw('pricing.onRequest') : formatPrice(total ?? 0)}
            </p>
          </div>
          {step !== 'review' ? (
            <button
              type="button"
              onClick={goNext}
              disabled={step === 'datetime' ? !canContinueDate : !canContinueDetails}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-turquoise-500 hover:bg-turquoise-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm px-5 h-11 transition-colors"
            >
              {tCommon('next')}
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-turquoise-500 hover:bg-turquoise-600 disabled:opacity-60 text-white font-medium text-sm px-5 h-11 transition-colors"
            >
              {submitting ? t('submitting') : t('confirm')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const slugToActivityRoute: Record<ActivitySlug, string> = {
  excursions: 'boat-excursions',
  fishing: 'big-game-fishing',
  transfers: 'boat-transfers',
  rental: 'boat-rental',
};

function Input({
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider2 text-deep-500 font-medium mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full bg-white border border-sand-300 rounded-2xl px-4 py-3.5 text-deep-700 placeholder-deep-300 focus:border-deep-500 focus:ring-2 focus:ring-deep-200 outline-none transition-all duration-300"
      />
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-sand-200 last:border-b-0">
      <span className="text-xs uppercase tracking-wider2 text-deep-400 font-medium pt-1">
        {label}
      </span>
      <span className="text-deep-700 font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-white/65 text-sm">
        <span className="text-turquoise-300">{icon}</span>
        {label}
      </div>
      <span className="text-white font-medium text-sm text-right">{value}</span>
    </div>
  );
}
