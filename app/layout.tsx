import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewCraft | Artisan Coffee Experience',
  description: 'Premium coffee experiences crafted to perfection. Every sip defies gravity.',
  metadataBase: new URL('https://brewcraft.shop'),
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

import { SpeedInsights } from '@vercel/speed-insights/next';
import SEOJSONLD from '@/components/SEOJSONLD';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SEOJSONLD />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
