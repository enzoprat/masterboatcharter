export const SITE = {
  name: 'Master Boat Charter',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masterboatcharter.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nathanjosephin4@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+33 7 52 06 60 32',
  whatsappDigits: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+33752066032').replace(/\D/g, ''),
  base: 'La Digue, Seychelles',
  /**
   * Social URLs. Set to `null` while accounts are not live — UI will
   * hide the icons entirely. Replace with real handles when ready.
   */
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },
} as const;

export const whatsappLink = (text?: string) => {
  const base = `https://wa.me/${SITE.whatsappDigits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};

/**
 * Form submission endpoint — Web3Forms.
 *
 * Web3Forms forwards form submissions as emails to the address tied to
 * the access key. The key is safe to expose client-side: it only allows
 * sending to that one inbox, not arbitrary destinations.
 *
 * To swap for a real backend later (Resend, SendGrid, etc.) just point
 * this constant at a `/api/...` route and stop sending `access_key`.
 */
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'fceb7d62-794d-467e-b9c9-5ee86394900b';
