import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Sri Krishi Enterprises — Premium Coconut Shell Activated Carbon | Supplier & Exporter',
  description:
    'Sri Krishi Enterprises is a Tamil Nadu, India based supplier and exporter of premium coconut shell activated carbon with controlled iodine value, CTC, mesh size for water treatment, air purification and industrial applications.',
  keywords: [
    'coconut shell activated carbon',
    'activated carbon supplier India',
    'activated carbon exporter',
    'granular activated carbon',
    'water treatment carbon',
    'coconut shell carbon manufacturer',
    'Sri Krishi Enterprises',
  ],
  openGraph: {
    title: 'Sri Krishi Enterprises — Premium Coconut Shell Activated Carbon',
    description:
      'High-quality coconut shell-based activated carbon for global industries. Supplier & Exporter from Tamil Nadu, India.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
