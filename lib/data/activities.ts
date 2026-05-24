export type ActivitySlug =
  | 'excursions'
  | 'fishing'
  | 'transfers'
  | 'rental';

export type SlotKey = 'morning' | 'afternoon' | 'full' | 'sunset';

export type Slot = {
  key: SlotKey;
  /** 24h start time, e.g. "08:00" */
  start: string;
  end: string;
  /** Slots this slot blocks when booked (single boat). */
  blocks: SlotKey[];
};

export const SLOTS: Record<SlotKey, Slot> = {
  morning: {
    key: 'morning',
    start: '08:00',
    end: '12:00',
    blocks: ['morning', 'full'],
  },
  afternoon: {
    key: 'afternoon',
    start: '13:00',
    end: '17:00',
    blocks: ['afternoon', 'full', 'sunset'],
  },
  full: {
    key: 'full',
    start: '09:00',
    end: '17:00',
    blocks: ['morning', 'afternoon', 'full', 'sunset'],
  },
  sunset: {
    key: 'sunset',
    start: '17:00',
    end: '20:00',
    blocks: ['sunset', 'afternoon'],
  },
};

export type PriceOption = {
  id: string;
  /** Display label key (i18n) */
  labelKey: string;
  /** Slot this option occupies */
  slot: SlotKey;
  /** Per-person price in EUR, OR per-boat if perBoat is true */
  price: number;
  perBoat?: boolean;
  /** Min/max guests if specified */
  minGuests?: number;
  maxGuests?: number;
  /** Inclusions (i18n keys) */
  includes?: string[];
};

export type Circuit = {
  id: string;
  titleKey: string;
  islands: string[];
  options: PriceOption[];
};

export type Activity = {
  slug: ActivitySlug;
  /** i18n namespace under activities.{slug} */
  i18nKey: ActivitySlug;
  /** Hero image for the activity page */
  image: string;
  cardImage: string;
  /** Order in nav and grids */
  order: number;
  /** Pricing: either a flat options list or a list of circuits */
  pricing:
    | { type: 'options'; options: PriceOption[] }
    | { type: 'circuits'; circuits: Circuit[] };
  /** Default max guests for the form */
  maxGuests: number;
};

export const ACTIVITIES: Activity[] = [
  {
    slug: 'excursions',
    i18nKey: 'excursions',
    image:
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=2400&q=80',
    cardImage:
      'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1600&q=80',
    order: 1,
    maxGuests: 10,
    pricing: {
      type: 'circuits',
      circuits: [
        {
          id: 'circuit-1',
          titleKey: 'pricing.circuits.title1',
          islands: ['Grande Soeur', 'Petite Soeur', 'Félicité', 'Coco Island'],
          options: [
            {
              id: 'c1-half',
              labelKey: 'pricing.halfDay',
              slot: 'morning',
              price: 70,
              includes: [
                'pricing.drinksIncluded',
                'pricing.toiletOnboard',
                'pricing.marineParkFees',
              ],
            },
            {
              id: 'c1-full',
              labelKey: 'pricing.fullDay',
              slot: 'full',
              price: 130,
              includes: [
                'pricing.drinksIncluded',
                'pricing.barbecueIncluded',
                'pricing.toiletOnboard',
                'pricing.marineParkFees',
              ],
            },
          ],
        },
        {
          id: 'circuit-2',
          titleKey: 'pricing.circuits.title2',
          islands: ['Curieuse', 'Anse Lazio', 'Anse Georgette', 'St Pierre'],
          options: [
            {
              id: 'c2-full',
              labelKey: 'pricing.fullDay',
              slot: 'full',
              price: 175,
              includes: [
                'pricing.drinksIncluded',
                'pricing.barbecueIncluded',
                'pricing.toiletOnboard',
                'pricing.marineParkFees',
              ],
            },
          ],
        },
        {
          id: 'circuit-3',
          titleKey: 'pricing.circuits.title3',
          islands: ['La Digue', 'Anse Source d\'Argent'],
          options: [
            {
              id: 'c3-full',
              labelKey: 'pricing.fullDay8h',
              slot: 'full',
              price: 70,
              includes: [
                'pricing.drinksIncluded',
                'pricing.toiletOnboard',
              ],
            },
            {
              id: 'c3-sunset',
              labelKey: 'pricing.sunset',
              slot: 'sunset',
              price: 70,
              includes: [
                'pricing.drinksIncluded',
                'pricing.toiletOnboard',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: 'fishing',
    i18nKey: 'fishing',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=2400&q=80',
    cardImage:
      'https://images.unsplash.com/photo-1516571748831-5d81767b788d?auto=format&fit=crop&w=1600&q=80',
    order: 2,
    maxGuests: 4,
    pricing: {
      type: 'options',
      options: [
        {
          id: 'fish-half',
          labelKey: 'pricing.halfDay',
          slot: 'morning',
          price: 450,
          perBoat: true,
          minGuests: 1,
          maxGuests: 4,
          includes: ['pricing.snackIncluded', 'pricing.drinksIncluded'],
        },
        {
          id: 'fish-full',
          labelKey: 'pricing.fullDay8h',
          slot: 'full',
          price: 800,
          perBoat: true,
          minGuests: 1,
          maxGuests: 4,
          includes: ['pricing.snackIncluded', 'pricing.drinksIncluded'],
        },
        {
          id: 'fish-deep',
          labelKey: 'pricing.deepSea',
          slot: 'full',
          price: 950,
          perBoat: true,
          minGuests: 1,
          maxGuests: 4,
          includes: ['pricing.snackIncluded', 'pricing.drinksIncluded'],
        },
      ],
    },
  },
  {
    slug: 'transfers',
    i18nKey: 'transfers',
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2400&q=80',
    cardImage:
      'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=80',
    order: 3,
    maxGuests: 10,
    pricing: {
      type: 'options',
      options: [
        {
          id: 'trans-praslin',
          labelKey: 'pricing.praslinLaDigue',
          slot: 'morning',
          price: 150,
          perBoat: true,
          maxGuests: 10,
        },
        {
          id: 'trans-mahe',
          labelKey: 'pricing.praslinMahe',
          slot: 'full',
          price: 800,
          perBoat: true,
          maxGuests: 10,
        },
      ],
    },
  },
  {
    slug: 'rental',
    i18nKey: 'rental',
    image:
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2400&q=80',
    cardImage:
      'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?auto=format&fit=crop&w=1600&q=80',
    order: 4,
    maxGuests: 10,
    pricing: {
      type: 'options',
      options: [
        {
          id: 'rent-half',
          labelKey: 'pricing.halfDay',
          slot: 'morning',
          price: 400,
          perBoat: true,
          maxGuests: 10,
          includes: ['pricing.skipperIncluded'],
        },
        {
          id: 'rent-full',
          labelKey: 'pricing.fullDay8h',
          slot: 'full',
          price: 750,
          perBoat: true,
          maxGuests: 10,
          includes: ['pricing.skipperIncluded'],
        },
      ],
    },
  },
];

export function getActivity(slug: ActivitySlug): Activity {
  const a = ACTIVITIES.find((x) => x.slug === slug);
  if (!a) throw new Error(`Unknown activity ${slug}`);
  return a;
}
