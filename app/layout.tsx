import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.srikrishienterprises.com'),
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Sri Krishi Enterprises — Premium Coconut Shell Activated Carbon',
    description:
      'High-quality coconut shell-based activated carbon for global industries. Supplier & Exporter from Tamil Nadu, India.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sri Krishi Enterprises',
    images: [
      {
        url: '/og-logo.png',
        width: 512,
        height: 512,
        alt: 'Sri Krishi Enterprises Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Sri Krishi Enterprises — Premium Coconut Shell Activated Carbon',
    description:
      'High-quality coconut shell-based activated carbon for global industries. Supplier & Exporter from Tamil Nadu, India.',
    images: ['/og-logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}

        {/* ── Google Translate: hidden mount point ── */}
        <div id="google_translate_element" aria-hidden="true" />

        {/* ── Google Translate: widget init ── */}
        <Script id="gt-init" strategy="afterInteractive">{`
          window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
              { pageLanguage: 'en', autoDisplay: false },
              'google_translate_element'
            );
          };
        `}</Script>

        {/* ── Google Translate: widget script ── */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

