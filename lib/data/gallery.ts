export type GalleryImage = {
  src: string;
  alt: string;
  /** Tailwind grid span classes for masonry */
  span: string;
};

export const GALLERY: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1600&q=80',
    alt: 'Turquoise lagoon and boat in Seychelles',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80',
    alt: 'Granite rocks of La Digue',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Coral reef and tropical fish snorkeling Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1600&q=80',
    alt: 'Sunset over Seychelles archipelago',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=1200&q=80',
    alt: 'Aerial view of Praslin lagoon',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Snorkeler exploring marine park',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=1600&q=80',
    alt: 'Empty white sand beach Seychelles',
    span: 'md:col-span-2 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Big game fishing rod on charter boat',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Couple enjoying boat sunset in Seychelles',
    span: 'md:col-span-1 md:row-span-1',
  },
];
