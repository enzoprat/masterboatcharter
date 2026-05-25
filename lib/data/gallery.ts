export type GalleryImage = {
  src: string;
  alt: string;
  /** Tailwind grid span classes for masonry */
  span: string;
};

export const GALLERY: GalleryImage[] = [
  {
    src: '/images/hero-boat-flag.jpg',
    alt: 'The boat anchored in a Seychelles cove with the national flag flying',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/lagoon-swim.jpg',
    alt: 'Granite rocks and turquoise lagoon in Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/beach-palms.jpg',
    alt: 'Coconut palms and pink granite rocks over a turquoise lagoon',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/whale-shark.jpg',
    alt: 'Snorkeling with a whale shark in Seychelles waters',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: '/images/cliff-jump.jpg',
    alt: 'Cliff jumping into the turquoise sea',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-crew.jpg',
    alt: 'Local crew and guests with the day’s catch',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-dock.jpg',
    alt: 'Big game fishing dock scene with sailfish and our boat',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: '/images/fishing-gear.jpg',
    alt: 'Big game fishing rods and a sailfish on the dock',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: '/images/fishing-angler.jpg',
    alt: 'Angler with red snapper and grouper after a fishing trip',
    span: 'md:col-span-1 md:row-span-1',
  },
];
