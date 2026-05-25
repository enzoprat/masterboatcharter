import { SITE } from '@/lib/site';

type Props = {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  duration?: string; // ISO 8601 duration e.g. PT8H
  itinerary?: string[];
  touristType?: string[];
  image?: string;
};

export default function JsonLdTouristTrip({
  name,
  description,
  url,
  price,
  priceCurrency = 'EUR',
  duration,
  itinerary,
  touristType,
  image,
}: Props) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE.url}${url}`,
    provider: {
      '@type': 'LocalBusiness',
      name: SITE.name,
      url: SITE.url,
    },
  };

  if (image) data.image = image.startsWith('http') ? image : `${SITE.url}${image}`;
  if (touristType) data.touristType = touristType;
  if (duration) data.duration = duration;
  if (itinerary) {
    data.itinerary = {
      '@type': 'ItemList',
      itemListElement: itinerary.map((place, i) => ({
        '@type': 'Place',
        name: place,
        position: i + 1,
      })),
    };
  }
  if (price) {
    data.offers = {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: 'https://schema.org/InStock',
      url: data.url,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
