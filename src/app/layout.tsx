import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://aatralstudios.com'),
  title: {
    default: 'Aatral Studios | We Build Websites That Help Businesses Grow',
    template: '%s | Aatral Studios',
  },
  description:
    'We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers. Fast 10-day turnaround, accessible pricing, and direct engineer communication.',
  keywords: [
    'Aatral Studios',
    'web design agency',
    'web development agency',
    'custom business websites',
    'affordable website development',
    'Next.js 15 web development',
    'high-converting landing pages',
    'Chennai web development',
    'Chengalpattu web design',
    'mobile responsive websites',
  ],
  authors: [
    { name: 'Vasanthabalan B', url: 'https://aatralstudios.com' },
    { name: 'Sudharshini NS', url: 'https://aatralstudios.com' },
  ],
  creator: 'Aatral Studios',
  publisher: 'Aatral Studios',
  alternates: {
    canonical: 'https://aatralstudios.com',
  },
  openGraph: {
    title: 'Aatral Studios | We Build Websites That Help Businesses Grow',
    description:
      'We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers. 10-day delivery, direct collaboration.',
    url: 'https://aatralstudios.com',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios — Websites Built Right',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aatral Studios | We Build Websites That Help Businesses Grow',
    description:
      'Modern, high-performing websites that help businesses connect with more customers. Fast 10-day turnaround, accessible pricing, and direct engineer communication.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  description:
    'A modern web design and engineering studio combining visual craft with high-performing code to help businesses establish their digital presence and connect with customers.',
  email: 'aatralstudios@gmail.com',
  telephone: '+918220820236',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  founder: [
    {
      '@type': 'Person',
      name: 'Vasanthabalan B',
      jobTitle: 'Co-Founder & Lead Full-Stack Engineer',
      homeLocation: 'Chennai, India',
    },
    {
      '@type': 'Person',
      name: 'Sudharshini NS',
      jobTitle: 'Co-Founder & Frontend / UI/UX Developer',
      homeLocation: 'Chengalpattu, India',
    },
  ],
  sameAs: ['https://instagram.com/aatralstudios', 'https://wa.me/918220820236'],
  priceRange: '₹₹',
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
