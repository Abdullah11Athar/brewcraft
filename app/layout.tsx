import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrewCraft | Artisan Coffee Experience',
  description: 'Premium coffee experiences crafted to perfection. Every sip defies gravity.',
  metadataBase: new URL('https://brewcraft.shop'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'BrewCraft',
    'BrewCraft Coffee',
    'brewcraft coffee',
    'brew craft coffee',
    'brewcraft.shop',
    'brew-craft-coffee',
    'artisan coffee',
    'specialty coffee shop',
    'best coffee',
    'cappuccino',
    'latte',
    'mocha',
    'coffee shop Karachi',
    'Pakistan specialty coffee',
    'espresso bar',
    'premium coffee beans'
  ],
  openGraph: {
    title: 'BrewCraft | Artisan Coffee Experience',
    description: 'Premium coffee experiences crafted to perfection. Every sip defies gravity.',
    url: 'https://brewcraft.shop',
    siteName: 'BrewCraft',
    images: [
      {
        url: '/coffee/latte.jpg',
        width: 800,
        height: 600,
        alt: 'BrewCraft Specialty Coffee Latte Art',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrewCraft | Artisan Coffee Experience',
    description: 'Premium coffee experiences crafted to perfection. Every sip defies gravity.',
    images: ['/coffee/latte.jpg'],
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
