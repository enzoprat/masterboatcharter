'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const BLOCKS = [
  {
    key: 'block1',
    image:
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=2000&q=85',
    align: 'right',
  },
  {
    key: 'block2',
    image:
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=2000&q=85',
    align: 'left',
  },
  {
    key: 'block3',
    image:
      'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=2000&q=85',
    align: 'right',
  },
] as const;

export default function Experience() {
  const t = useTranslations('experience');

  return (
    <section className="relative py-24 lg:py-36 bg-white">
      <div className="container-premium">
        <Reveal className="max-w-2xl mb-20 lg:mb-28">
          <span className="eyebrow">{t('eyebrow')}</span>
        </Reveal>

        <div className="space-y-24 lg:space-y-40">
          {BLOCKS.map((block, i) => (
            <Block
              key={block.key}
              image={block.image}
              align={block.align}
              title={t(`${block.key}.title`)}
              body={t(`${block.key}.body`)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Block({
  image,
  align,
  title,
  body,
  index,
}: {
  image: string;
  align: 'left' | 'right';
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={ref}
      className={cn(
        'grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center',
        align === 'left' && 'lg:[direction:rtl]'
      )}
    >
      <Reveal
        direction={align === 'right' ? 'right' : 'left'}
        className={cn(
          'relative aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-3xl bg-sand-100',
          align === 'left' && 'lg:[direction:ltr]'
        )}
      >
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </Reveal>

      <Reveal
        direction={align === 'right' ? 'left' : 'right'}
        delay={0.1}
        className={cn('max-w-xl', align === 'left' && 'lg:[direction:ltr]')}
      >
        <span className="font-serif text-7xl text-turquoise-200 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-5 font-serif text-display-md text-deep-700 text-balance">
          {title}
        </h3>
        <p className="mt-6 text-lg text-ink-muted leading-relaxed">{body}</p>
      </Reveal>
    </div>
  );
}
