'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

type Review = {
  name: string;
  origin: string;
  text: string;
};

const REVIEWS_EN: Review[] = [
  {
    name: 'Sophie & Marc',
    origin: 'Paris, France',
    text: 'The most magical day of our honeymoon. The captain knew every reef and every cove. We saw turtles, snorkeled in protected lagoons and had a private beach barbecue. Worth every euro.',
  },
  {
    name: 'James W.',
    origin: 'London, UK',
    text: 'Big game fishing done right. Caught a sailfish, tagged and released. Crew was knowledgeable and respectful of the sea. Will be back next season.',
  },
  {
    name: 'Anya & Family',
    origin: 'Berlin, Germany',
    text: 'Travelled with three kids and the team made everything feel effortless. Shade, snacks, life jackets in every size, calm captain. The boat was ours for the day — that changes everything.',
  },
  {
    name: 'Daniela R.',
    origin: 'Milan, Italy',
    text: 'Booked the sunset cruise from La Digue. Watching the granite rocks turn gold from the water — absolutely unforgettable. Not a single other boat in sight.',
  },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="relative py-24 lg:py-32 bg-deep-700 text-white overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full bg-turquoise-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 -right-20 h-[420px] w-[420px] rounded-full bg-nature-400/15 blur-[120px]" />
      </div>

      <div className="container-premium relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow-light">{t('eyebrow')}</span>
          <h2 className="mt-5 font-serif text-display-lg text-white">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 lg:mt-20 grid sm:grid-cols-2 gap-5 lg:gap-6">
          {REVIEWS_EN.map((r, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              direction="up"
              className="relative rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 p-8 lg:p-10 hover:bg-white/[0.07] transition-colors duration-500"
            >
              <div className="flex items-center gap-0.5 text-turquoise-300 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-white/90 text-lg leading-relaxed font-serif italic">
                “{r.text}”
              </p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="font-medium text-white">{r.name}</p>
                <p className="text-white/55 text-sm mt-0.5">{r.origin}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
