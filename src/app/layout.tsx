import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aatral Studios | We design journeys, not just pages.',
  description:
    'A design and development studio that combines visual craft with technical execution. Bespoke websites, high-converting landing funnels, and 3D WebGL experiences.',
  keywords: [
    'Aatral Studios',
    'Aatral',
    'web design agency',
    'web development',
    'Three.js agency',
    'Next.js 15 agency',
    'UI/UX design',
    'high-converting landing pages',
    'Chennai web development',
    'creative technology studio',
  ],
  authors: [{ name: 'Aatral Studios', url: 'https://instagram.com/aatralstudios' }],
  creator: 'Aatral Studios',
  openGraph: {
    title: 'Aatral Studios | We design journeys, not just pages.',
    description:
      'A design and development studio combining visual craft with technical execution for ambitious brands.',
    url: 'https://aatralstudios.com',
    siteName: 'Aatral Studios',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Aatral Studios',
  alternateName: 'Aatral',
  url: 'https://aatralstudios.com',
  logo: 'https://aatralstudios.com/logo.png',
  image: 'https://aatralstudios.com/logo.png',
  description: 'A design and development studio that combines visual craft with technical execution.',
  email: 'aatralstudios@gmail.com',
  telephone: '+918220820236',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: ['https://instagram.com/aatralstudios', 'https://wa.me/918220820236'],
  priceRange: '₹₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '20:00',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#07080B" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Analytics Placeholder (Plausible / GA4 Event Dispatcher) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.aatralAnalytics = function(event, payload) {
                if (typeof window !== 'undefined' && window.dataLayer) {
                  window.dataLayer.push({ event, ...payload });
                }
                console.log('[Aatral Analytics]:', event, payload || {});
              };
            `,
          }}
        />
      </head>
      <body>
        <div className="bg-grain" aria-hidden="true" />
        <div className="bg-ambient" aria-hidden="true" />
        <div className="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
