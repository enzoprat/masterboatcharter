import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        white: '#FFFFFF',
        turquoise: {
          DEFAULT: '#3ABEDB',
          50: '#EBF8FB',
          100: '#D2F0F6',
          200: '#A6E2EE',
          300: '#79D3E5',
          400: '#4DC5DC',
          500: '#3ABEDB',
          600: '#1E9DBC',
          700: '#177889',
          800: '#0F5260',
          900: '#082D34',
        },
        deep: {
          DEFAULT: '#155E75',
          50: '#E7F3F7',
          100: '#C5DFE8',
          200: '#8DC0D1',
          300: '#55A1BB',
          400: '#2E8AA8',
          500: '#1D7894',
          600: '#155E75',
          700: '#104B5D',
          800: '#0B3744',
          900: '#06232B',
        },
        sand: {
          DEFAULT: '#F7F3EB',
          50: '#FDFCFA',
          100: '#F7F3EB',
          200: '#EFE6D4',
          300: '#E5D6B8',
          400: '#D4BD8C',
          500: '#B89A66',
        },
        nature: {
          DEFAULT: '#8DAF91',
          50: '#F0F5F1',
          100: '#DCE8DD',
          200: '#BDD1BF',
          300: '#9EBAA1',
          400: '#8DAF91',
          500: '#6E967B',
          600: '#557963',
          700: '#3F5C4C',
        },
        ink: {
          DEFAULT: '#0A2A33',
          soft: '#1F3D45',
          muted: '#5A6F75',
          subtle: '#8A9BA0',
        },
        /**
         * La Digue granite — the one landform nobody else in this niche
         * designs with. Warm grey with a pink cast; used as paper, never
         * as an accent.
         */
        granite: {
          50: '#FAF8F6',
          100: '#F2EEEA',
          200: '#E4DDD6',
          300: '#CFC4BA',
          400: '#AC9E93',
          500: '#8A7C72',
          600: '#6B5F57',
          700: '#4E453F',
          800: '#332D29',
          900: '#1C1815',
        },
        /** Deep-water ground for full-bleed dark sections. */
        abyss: {
          DEFAULT: '#05191F',
          600: '#0A2830',
          700: '#072029',
          800: '#05191F',
          900: '#031015',
        },
      },
      fontFamily: {
        serif: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Premium fluid typography
        'display-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.625rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.2em' }],
        /** Oversized editorial numerals — timings, prices, counts. */
        'numeral': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.82', letterSpacing: '-0.04em' }],
        'numeral-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        wider2: '0.18em',
        wider3: '0.25em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'premium-sm': '0 2px 16px -4px rgba(10, 42, 51, 0.08)',
        'premium': '0 8px 32px -8px rgba(10, 42, 51, 0.12)',
        'premium-lg': '0 24px 64px -12px rgba(10, 42, 51, 0.18)',
        'glass': '0 4px 24px -2px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-overlay': 'linear-gradient(180deg, rgba(6, 35, 43, 0.35) 0%, rgba(6, 35, 43, 0.15) 35%, rgba(6, 35, 43, 0.65) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fadeDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-sm': 'floatSm 2s ease-in-out infinite',
        'hero-in': 'heroIn 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSm: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        /* Slow settle on the hero backdrop. Opacity starts at 1 so the
           largest paint is never gated on the animation. */
        heroIn: {
          from: { transform: 'scale(1.06)' },
          to: { transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'silk': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
