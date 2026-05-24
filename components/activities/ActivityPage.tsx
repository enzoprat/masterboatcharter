import { ACTIVITIES, getActivity, type ActivitySlug } from '@/lib/data/activities';
import ActivityHero from './ActivityHero';
import Highlights from './Highlights';
import Pricing from './Pricing';
import RelatedActivities from './RelatedActivities';
import FAQ from '@/components/home/FAQ';
import CTA from '@/components/home/CTA';

export default function ActivityPage({ slug }: { slug: ActivitySlug }) {
  const activity = getActivity(slug);

  return (
    <>
      <ActivityHero activity={activity} />
      <Highlights activity={activity} />
      <Pricing activity={activity} />
      <RelatedActivities exclude={slug} />
      <FAQ />
      <CTA />
    </>
  );
}
