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
    /**
     * La Digue, not Praslin. Every page, the meta description and
     * SITE.base say the boat is based at La Digue; only this block said
     * Praslin, with Praslin's coordinates (-4.3186, 55.7307). A local
     * business that contradicts itself on its own locality gives Google
     * nothing to anchor. Coordinates below are La Digue jetty.
     */
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'La Digue',
      addressCountry: 'SC',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -4.3556,
      longitude: 55.8264,
    },
    areaServed: [
      { '@type': 'Place', name: 'La Digue' },
      { '@type': 'Place', name: 'Praslin' },
      { '@type': 'Place', name: 'Mahé' },
      { '@type': 'Place', name: 'Curieuse' },
      { '@type': 'Place', name: 'Coco Island' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
