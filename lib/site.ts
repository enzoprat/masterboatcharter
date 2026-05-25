export const SITE = {
  name: 'Master Boat Charter',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masterboatcharter.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nathanjosephin4@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+33 7 52 06 60 32',
  whatsappDigits: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+33752066032').replace(/\D/g, ''),
  base: 'La Digue, Seychelles',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
} as const;

export const whatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE.whatsappDigits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

/**
 * Form submission endpoint.
 *
 * Uses formsubmit.co — a free, no-signup service that forwards form
 * submissions as plain emails. On the very first submission, FormSubmit
 * sends a one-time activation link to the recipient address; once that
 * link is clicked, subsequent submissions go through automatically.
 *
 * To swap for a real backend later (Resend, SendGrid, etc.) just point
 * this constant at a `/api/...` route.
 */
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${SITE.email}`;
