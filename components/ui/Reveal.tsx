'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  amount?: number;
  as?: 'div' | 'span' | 'section' | 'article' | 'li' | 'header';
};

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  distance = 28,
  once = true,
  amount = 0.2,
  as = 'div',
}: Props) {
  const reduced = useReducedMotion();

  const offset = (() => {
    if (reduced || direction === 'none') return { x: 0, y: 0 };
    switch (direction) {
      case 'up': return { x: 0, y: distance };
      case 'down': return { x: 0, y: -distance };
      case 'left': return { x: distance, y: 0 };
      case 'right': return { x: -distance, y: 0 };
    }
  })();

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const Comp = motion[as] as any;

  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
