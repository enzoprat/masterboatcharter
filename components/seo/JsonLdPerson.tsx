import { SITE } from '@/lib/site';

type Props = {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  knowsLanguage: string[];
  knowsAbout: string[];
  nationality?: string;
};

export default function JsonLdPerson({
  name,
  jobTitle,
  description,
  url,
  image,
  knowsLanguage,
  knowsAbout,
  nationality,
}: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url: url.startsWith('http') ? url : `${SITE.url}${url}`,
    image: image.startsWith('http') ? image : `${SITE.url}${image}`,
    worksFor: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    knowsLanguage,
    knowsAbout,
    ...(nationality && { nationality }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
