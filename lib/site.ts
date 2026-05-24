export const SITE = {
  name: 'Master Boat Charter',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masterboatcharter.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@masterboatcharter.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+248 2 512 345',
  whatsappDigits: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+2482512345').replace(/\D/g, ''),
  base: 'Praslin, Seychelles',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
} as const;

export const whatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE.whatsappDigits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
