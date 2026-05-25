export type GalleryImage = {
  src: string;
  alt: string;
  /** Tailwind grid span classes for masonry */
  span: string;
};

export const GALLERY: GalleryImage[] = [
  {
    src: '/images/hero-boat-flag.jpg',
    alt: 'Private boat charter at anchor in a La Digue cove, Seychelles flag flying',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/lagoon-swim.jpg',
    alt: 'Granite rocks and turquoise lagoon of Anse Lazio, Praslin, Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/beach-palms.jpg',
    alt: 'Coconut palms and pink granite over a deserted Seychelles beach',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/whale-shark.jpg',
    alt: 'Snorkeling with a whale shark on a Master Boat Charter excursion',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: '/images/cliff-jump.jpg',
    alt: 'Cliff jumping into the turquoise inner-island sea, Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-crew.jpg',
    alt: 'Local Seychellois crew with the day’s catch after a deep-sea fishing trip',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-dock.jpg',
    alt: 'Big game fishing — sailfish landed at the La Digue dock with the Master boat',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: '/images/fishing-gear.jpg',
    alt: 'Big game fishing rods, reels and a sailfish on the dock — Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-angler.jpg',
    alt: 'Angler holding a red snapper and grouper after a charter fishing day in Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
];
