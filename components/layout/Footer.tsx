import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Logo from '@/components/ui/Logo';
import { Mail, MessageCircle, MapPin, Instagram, Facebook, Anchor, Leaf } from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-deep-900 text-white/85 mt-24 lg:mt-32 overflow-hidden">
      {/* Decorative gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-turquoise-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-deep-500/30 blur-[100px]" />
      </div>

      {/* Long SEO description */}
      <div className="relative border-b border-white/10">
        <div className="container-premium py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <span className="eyebrow-light">{t('experienceResponsibly')}</span>
              <h2 className="mt-6 font-serif text-display-sm text-white">
                {t('longDescription.title')}
              </h2>
            </div>
            <div className="space-y-7 text-white/75 leading-relaxed">
              <p className="text-base lg:text-[1.05rem]">{t('longDescription.intro')}</p>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7 pt-2">
                <FooterFeature
                  icon={<Anchor className="h-5 w-5" strokeWidth={1.5} />}
                  title={t('longDescription.block1Title')}
                  body={t('longDescription.block1')}
                />
                <FooterFeature
                  icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />}
                  title={t('longDescription.block2Title')}
                  body={t('longDescription.block2')}
                />
                <FooterFeature
                  icon={<Leaf className="h-5 w-5" strokeWidth={1.5} />}
                  title={t('longDescription.block3Title')}
                  body={t('longDescription.block3')}
                />
                <FooterFeature
                  icon={<MessageCircle className="h-5 w-5" strokeWidth={1.5} />}
                  title={t('longDescription.block4Title')}
                  body={t('longDescription.block4')}
                />
              </div>

              <p className="pt-2 text-white/70">{t('longDescription.block5')}</p>
              <p className="pt-2 font-serif text-xl text-white">{t('longDescription.outro')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative">
        <div className="container-premium py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
            <div className="col-span-2 lg:col-span-2">
              <Logo variant="light" />
              <p className="mt-6 text-white/70 leading-relaxed max-w-sm">
                {t('tagline')}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white transition-all"
                >
                  <Facebook className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-turquoise-500 text-white hover:bg-turquoise-400 transition-all"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-eyebrow uppercase tracking-wider2 text-white/50 font-medium">
                {t('activities')}
              </h3>
              <ul className="mt-5 space-y-3">
                <FooterLink href="/boat-excursions">{tNav('excursions')}</FooterLink>
                <FooterLink href="/big-game-fishing">{tNav('fishing')}</FooterLink>
                <FooterLink href="/boat-transfers">{tNav('transfers')}</FooterLink>
                <FooterLink href="/boat-rental">{tNav('rental')}</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-eyebrow uppercase tracking-wider2 text-white/50 font-medium">
                {t('quickLinks')}
              </h3>
              <ul className="mt-5 space-y-3">
                <FooterLink href="/about">{tNav('about')}</FooterLink>
                <FooterLink href="/contact">{tNav('contact')}</FooterLink>
                <FooterLink href={'/book/excursions' as any}>{tNav('bookNow')}</FooterLink>
              </ul>
            </div>

            <div>
              <h3 className="text-eyebrow uppercase tracking-wider2 text-white/50 font-medium">
                {t('contact')}
              </h3>
              <ul className="mt-5 space-y-4">
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-white/75 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 mt-1 text-turquoise-300 shrink-0" strokeWidth={1.5} />
                    <span>{SITE.whatsapp}</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group flex items-start gap-3 text-white/75 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4 mt-1 text-turquoise-300 shrink-0" strokeWidth={1.5} />
                    <span>{tNav('contact')}</span>
                  </Link>
                </li>
                <li className="flex items-start gap-3 text-white/75">
                  <MapPin className="h-4 w-4 mt-1 text-turquoise-300 shrink-0" strokeWidth={1.5} />
                  <span>{tContact('baseValue')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-premium py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
            <p>
              © {year} {SITE.name}. {t('rights')}
            </p>
            <p className="font-serif italic text-white/65">
              {t('experienceResponsibly')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: any;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/75 hover:text-white transition-colors text-[0.95rem] link-underline"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterFeature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5 text-turquoise-300 mb-2">
        {icon}
        <h3 className="font-serif text-lg text-white">{title}</h3>
      </div>
      <p className="text-sm text-white/65 leading-relaxed">{body}</p>
    </div>
  );
}
