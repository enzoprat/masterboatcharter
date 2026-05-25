import { SITE } from '@/lib/site';

export default function JsonLdOrganization() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristAttraction'],
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/og-image.jpg`,
    logo: `${SITE.url}/logo.png`,
    description:
      'Premium eco-conscious boat experiences in Seychelles: excursions, big game fishing, transfers and rentals from La Digue.',
    telephone: SITE.whatsapp,
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Praslin',
      addressCountry: 'SC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -4.3186,
      longitude: 55.7307,
    },
    sameAs: [SITE.social.instagram, SITE.social.facebook],
    areaServed: [
      { '@type': 'Place', name: 'Praslin' },
      { '@type': 'Place', name: 'La Digue' },
      { '@type': 'Place', name: 'Mahé' },
      { '@type': 'Place', name: 'Curieuse' },
      { '@type': 'Place', name: 'Coco Island' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '500',
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
