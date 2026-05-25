import { getActivity, type ActivitySlug } from '@/lib/data/activities';
import { getTranslations } from 'next-intl/server';
import ActivityHero from './ActivityHero';
import Highlights from './Highlights';
import Pricing from './Pricing';
import RelatedActivities from './RelatedActivities';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';
import DestinationsGrid from '@/components/destinations/DestinationsGrid';
import JsonLdBreadcrumb from '@/components/seo/JsonLdBreadcrumb';
import JsonLdTouristTrip from '@/components/seo/JsonLdTouristTrip';

const PILLAR_PATHS: Record<ActivitySlug, string> = {
  excursions: '/boat-excursions',
  fishing: '/big-game-fishing',
  transfers: '/boat-transfers',
  rental: '/boat-rental',
};

export default async function ActivityPage({
  slug,
  locale,
}: {
  slug: ActivitySlug;
  locale: string;
}) {
  const activity = getActivity(slug);
  const tActivities = await getTranslations({
    locale,
    namespace: `activities.${activity.i18nKey}`,
  });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  // Compute a representative "from" price for the Schema offer
  const flatOptions =
    activity.pricing.type === 'circuits'
      ? activity.pricing.circuits.flatMap((c) => c.options)
      : activity.pricing.options;
  const cheapest = flatOptions
    .filter((o) => !o.onRequest)
    .reduce<number | null>(
      (acc, o) => (acc === null || o.price < acc ? o.price : acc),
      null
    );

  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: tNav('home'), href: '/' },
          { name: tActivities('title'), href: PILLAR_PATHS[slug] },
        ]}
      />
      <JsonLdTouristTrip
        name={tActivities('title')}
        description={tActivities('description')}
        url={PILLAR_PATHS[slug]}
        price={cheapest ? String(cheapest) : undefined}
        image={activity.cardImage}
      />
      <ActivityHero activity={activity} />
      <Highlights activity={activity} />
      {/* Pillar-only: expose the per-destination sub-pages just before pricing */}
      {slug === 'excursions' && <DestinationsGrid />}
      <Pricing activity={activity} />
      <RelatedActivities exclude={slug} />
      <FAQ />
      <CTA />
    </>
  );
}
