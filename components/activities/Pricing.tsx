'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Check, ArrowRight, Users } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import type { Activity, PriceOption, Circuit } from '@/lib/data/activities';
import { formatPrice } from '@/lib/utils';

export default function Pricing({ activity }: { activity: Activity }) {
  const tCommon = useTranslations('common');

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="container-premium">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">{tCommon('learnMore')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-deep-700">
            {tCommon('from')} <span className="italic font-light">·</span> {tCommon('bookExperience')}
          </h2>
        </Reveal>

        <div className="mt-14 lg:mt-20 space-y-10">
          {activity.pricing.type === 'circuits'
            ? activity.pricing.circuits.map((c, i) => (
                <CircuitCard key={c.id} circuit={c} delay={i * 0.08} activitySlug={activity.slug} />
              ))
            : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {activity.pricing.options.map((opt, i) => (
                  <OptionCard key={opt.id} option={opt} delay={i * 0.08} activitySlug={activity.slug} />
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

function CircuitCard({
  circuit,
  delay,
  activitySlug,
}: {
  circuit: Circuit;
  delay: number;
  activitySlug: string;
}) {
  const t = useTranslations();
  const tCommon = useTranslations('common');

  return (
    <Reveal delay={delay} className="rounded-3xl border border-sand-200 bg-sand-50 overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.6fr]">
        <div className="p-8 lg:p-10 bg-gradient-to-br from-deep-700 to-deep-800 text-white flex flex-col justify-between gap-6">
          <div>
            <span className="text-eyebrow uppercase tracking-wider2 text-turquoise-200 font-medium">
              Circuit
            </span>
            <h3 className="mt-3 font-serif text-2xl lg:text-3xl text-balance leading-tight">
              {t(circuit.titleKey)}
            </h3>
          </div>
          <ul className="space-y-1.5 text-white/80 text-sm">
            {circuit.islands.map((island) => (
              <li key={island} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-turquoise-300" />
                {island}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-sand-200">
          {circuit.options.map((opt) => (
            <div key={opt.id} className="p-7 lg:p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-eyebrow uppercase tracking-wider2 text-deep-400 font-medium">
                    {t(opt.labelKey)}
                  </p>
                  <p className="mt-3 font-serif text-3xl text-deep-700">
                    {formatPrice(opt.price)}
                    <span className="text-base text-ink-muted ml-1 font-sans">
                      {opt.perBoat ? '' : `${tCommon('perPerson')}`}
                    </span>
                  </p>
                </div>
              </div>
              {opt.includes && (
                <ul className="space-y-2 text-sm text-ink-muted flex-1">
                  {opt.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-nature-500 mt-0.5 shrink-0" strokeWidth={2} />
                      <span>{t(inc)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={`/book/${activitySlug}?option=${opt.id}` as any}
                className="mt-7 inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full bg-deep-700 text-white hover:bg-deep-800 transition-all duration-500 ease-premium hover:shadow-premium group"
              >
                <span className="font-medium text-sm">{tCommon('bookExperience')}</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function OptionCard({
  option,
  delay,
  activitySlug,
}: {
  option: PriceOption;
  delay: number;
  activitySlug: string;
}) {
  const t = useTranslations();
  const tCommon = useTranslations('common');

  return (
    <Reveal delay={delay} className="card-premium p-7 lg:p-8 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow uppercase tracking-wider2 text-deep-400 font-medium">
            {t(option.labelKey)}
          </p>
          <p className="mt-3 font-serif text-4xl text-deep-700 leading-none">
            {formatPrice(option.price)}
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {option.perBoat ? `${tCommon('capacity')} ${option.maxGuests}` : tCommon('perPerson')}
          </p>
        </div>
        {option.maxGuests && (
          <div className="inline-flex items-center gap-1 text-deep-400 text-xs bg-sand-100 px-2.5 py-1 rounded-full">
            <Users className="h-3 w-3" strokeWidth={1.5} />
            <span>{option.minGuests ?? 1}-{option.maxGuests}</span>
          </div>
        )}
      </div>
      {option.includes && (
        <ul className="mt-6 space-y-2 text-sm text-ink-muted flex-1">
          {option.includes.map((inc, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-nature-500 mt-0.5 shrink-0" strokeWidth={2} />
              <span>{t(inc)}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/book/${activitySlug}?option=${option.id}` as any}
        className="mt-7 inline-flex items-center justify-between gap-2 px-5 py-3 rounded-full bg-deep-700 text-white hover:bg-deep-800 transition-all duration-500 ease-premium hover:shadow-premium group"
      >
        <span className="font-medium text-sm">{tCommon('bookExperience')}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.5} />
      </Link>
    </Reveal>
  );
}
