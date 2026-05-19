import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artisan Coffee | Experience Excellence',
  description: 'Premium coffee experiences crafted to perfection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
