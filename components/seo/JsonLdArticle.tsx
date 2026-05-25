import { SITE } from '@/lib/site';

type Props = {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
};

export default function JsonLdArticle({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: Props) {
  const fullUrl = url.startsWith('http') ? url : `${SITE.url}${url}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image: image.startsWith('http') ? image : `${SITE.url}${image}`,
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    author: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/icon.svg`,
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
