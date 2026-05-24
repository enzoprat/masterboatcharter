import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  variant?: 'dark' | 'light';
};

export default function Logo({ className, variant = 'dark' }: Props) {
  const color = variant === 'light' ? 'text-white' : 'text-deep-700';
  const accent = variant === 'light' ? 'text-turquoise-300' : 'text-turquoise-500';

  return (
    <div className={cn('flex items-center gap-2.5 leading-none', className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-8 w-8 shrink-0', color)}
        aria-hidden
      >
        {/* Stylised wave + sail */}
        <path
          d="M20 5 L31 26 H9 Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M2 30 C 7 27, 13 33, 20 30 S 33 27, 38 30 L 38 35 C 33 32, 27 38, 20 35 S 7 32, 2 35 Z"
          fill="currentColor"
          className={accent}
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={cn('font-serif text-[1.15rem] tracking-tight', color)}>
          Master Boat
        </span>
        <span
          className={cn(
            'text-[0.62rem] uppercase tracking-wider3 mt-0.5',
            variant === 'light' ? 'text-white/70' : 'text-deep-400'
          )}
        >
          Charter · Seychelles
        </span>
      </div>
    </div>
  );
}
