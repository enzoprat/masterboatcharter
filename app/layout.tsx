import './globals.css';
import type { Metadata, Viewport } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#06232B' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
