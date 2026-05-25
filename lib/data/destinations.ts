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
  | 'la-digue-tour'
  | 'sister-islands'
  | 'anse-lazio'
  | 'st-pierre-islet'
  | 'sunset-cruise';

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
    related: ['st-pierre-islet', 'coco-island'],
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
    related: ['sister-islands', 'curieuse-island'],
  },
  'la-digue-tour': {
    slug: 'la-digue-tour',
    image: '/images/hero-boat-flag.jpg',
    geo: { lat: -4.3596, lng: 55.8395 },
    priceFrom: 70,
    duration: 'PT8H',
    itinerary: [
      'La Digue marina',
      "Anse Source d’Argent (from sea)",
      'Anse Cocos',
      'Grande Anse',
      'Petite Anse',
    ],
    touristType: ['Couple', 'Photographer', 'Honeymooners', 'Sunset cruiser'],
    related: ['sunset-cruise', 'coco-island'],
  },
  'sister-islands': {
    slug: 'sister-islands',
    image: '/images/beach-palms.jpg',
    geo: { lat: -4.297, lng: 55.85 },
    priceFrom: 130,
    duration: 'PT8H',
    itinerary: [
      'La Digue marina',
      'Grande Soeur — east beach',
      'Grande Soeur — west bay (BBQ stop)',
      'Petite Soeur',
      'Félicité (from sea)',
    ],
    touristType: ['Couple', 'Family', 'Snorkeler', 'Photographer'],
    related: ['coco-island', 'curieuse-island'],
  },
  'anse-lazio': {
    slug: 'anse-lazio',
    image: '/images/lagoon-swim.jpg',
    geo: { lat: -4.299, lng: 55.703 },
    priceFrom: 130,
    duration: 'PT6H',
    itinerary: [
      'La Digue marina',
      'Anse Lazio — anchorage',
      'Anse Lazio — north reef snorkeling',
      'Anse Georgette (from sea)',
    ],
    touristType: ['Couple', 'Honeymooners', 'Photographer', 'Swimmer'],
    related: ['la-digue-tour', 'sunset-cruise'],
  },
  'st-pierre-islet': {
    slug: 'st-pierre-islet',
    image: '/images/lagoon-swim.jpg',
    geo: { lat: -4.314, lng: 55.733 },
    priceFrom: 70,
    duration: 'PT4H',
    itinerary: [
      'La Digue marina',
      'St-Pierre Islet — south face',
      'St-Pierre Islet — north drift',
      'Anse Volbert (Praslin) — beach swim',
    ],
    touristType: ['Snorkeler', 'Family', 'Photographer'],
    related: ['curieuse-island', 'coco-island'],
  },
  'sunset-cruise': {
    slug: 'sunset-cruise',
    image: '/images/hero-boat-flag.jpg',
    geo: { lat: -4.359, lng: 55.832 },
    priceFrom: 70,
    duration: 'PT3H',
    itinerary: [
      'La Digue marina (16:30 boarding)',
      'East coast cruise',
      "Anse Source d’Argent at golden hour",
      'Return to marina (after sunset)',
    ],
    touristType: ['Couple', 'Honeymooners', 'Photographer'],
    related: ['la-digue-tour', 'anse-lazio'],
  },
};

export const DESTINATION_SLUGS = Object.keys(DESTINATIONS) as DestinationSlug[];

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS[slug as DestinationSlug];
}
