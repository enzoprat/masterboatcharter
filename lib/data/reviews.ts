/**
 * Guest reviews.
 *
 * DELIBERATELY EMPTY. Handing a stranger your family for eight hours on open
 * water is a high-trust purchase, and this is the biggest conversion gap on
 * the site — but invented testimonials are fabricated records, so the section
 * renders nothing until real ones are pasted in here.
 *
 * To switch it on: copy real reviews from the Google Business Profile (or
 * TripAdvisor), fill `AGGREGATE` from the same source, and the section plus
 * its aggregateRating structured data appear on their own.
 *
 * Keep `text.fr` as the guest actually wrote it when they wrote in French;
 * translate only when the original is in another language.
 */
export type Review = {
  /** First name + last initial is enough, and is what Google shows. */
  author: string;
  /** ISO 3166-1 alpha-2, e.g. 'DE' — rendered as a small dateline. */
  country?: string;
  /** YYYY-MM-DD */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: { en: string; fr: string };
  source: 'google' | 'tripadvisor' | 'direct';
};

export const REVIEWS: Review[] = [];

/**
 * Aggregate shown next to the reviews and emitted as schema.org
 * aggregateRating. Must mirror the real profile — leave null until then.
 */
export const AGGREGATE: {
  value: number;
  count: number;
  /** Link to the public profile so the claim is checkable. */
  url: string;
} | null = null;
