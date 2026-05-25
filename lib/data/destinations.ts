/**
 * Boat excursion destinations.
 *
 * Each destination becomes a sub-page at /boat-excursions/[slug].
 * Content (intro, sections, FAQ) lives in messages/{locale}.json under
 * the `destinations.{slug}` namespace. Keep this file structural —
 * never put translatable copy here.
 */

export type DestinationSlug =
  | 'curieuse-island'
  | 'coco-island'
  | 'la-digue-tour';

export type Destination = {
  slug: DestinationSlug;
  /** Hero / SEO image, served from /public/images/ */
  image: string;
  /** Approx GPS for Schema.org Place */
  geo: { lat: number; lng: number };
  /** Direct fare for full-day private trip to this destination, in EUR */
  priceFrom: number;
  /** ISO 8601 duration for Schema.org */
  duration: string;
  /** Places visited (for TouristTrip itinerary) */
  itinerary: string[];
  /** Visitor types (for TouristTrip touristType) */
  touristType: string[];
  /** Nearby destinations to cross-link */
  related: DestinationSlug[];
};

export const DESTINATIONS: Record<DestinationSlug, Destination> = {
  'curieuse-island': {
    slug: 'curieuse-island',
    image: '/images/lagoon-swim.jpg',
    geo: { lat: -4.282, lng: 55.732 },
    priceFrom: 175,
    duration: 'PT8H',
    itinerary: [
      'La Digue marina',
      'Curieuse Island — Anse Saint-Joseph',
      'Curieuse Island — Aldabra Tortoise sanctuary',
      'Curieuse Island — Anse Papaie BBQ stop',
      'St-Pierre Islet — coral reef snorkeling',
    ],
    touristType: ['Family', 'Couple', 'Snorkeler', 'Nature lover'],
    related: ['coco-island', 'la-digue-tour'],
  },
  'coco-island': {
    slug: 'coco-island',
    image: '/images/beach-palms.jpg',
    geo: { lat: -4.303, lng: 55.851 },
    priceFrom: 130,
    duration: 'PT8H',
    itinerary: [
      'La Digue marina',
      'Coco Island Marine Park — main reef',
      'Félicité Island',
      'Grande Soeur — beach stop',
      'Petite Soeur',
    ],
    touristType: ['Family', 'Couple', 'Snorkeler', 'Photographer'],
    related: ['curieuse-island', 'la-digue-tour'],
  },
  'la-digue-tour': {
    slug: 'la-digue-tour',
    image: '/images/hero-boat-flag.jpg',
    geo: { lat: -4.3596, lng: 55.8395 },
    priceFrom: 70,
    duration: 'PT8H',
    itinerary: [
      'La Digue marina',
      'Anse Source d’Argent (from sea)',
      'Anse Cocos',
      'Grande Anse',
      'Petite Anse',
    ],
    touristType: ['Couple', 'Photographer', 'Honeymooners', 'Sunset cruiser'],
    related: ['coco-island', 'curieuse-island'],
  },
};

export const DESTINATION_SLUGS = Object.keys(DESTINATIONS) as DestinationSlug[];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS[slug as DestinationSlug];
}
