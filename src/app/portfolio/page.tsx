import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Client Portfolio & Live Deployments — Aatral Studios',
  description:
    'Explore live websites built by Aatral Studios, featuring RaRa Cafe. Sub-second performance, mobile-first ordering, Google Maps routing, and bespoke modern architecture.',
  alternates: {
    canonical: 'https://aatralstudios.com/portfolio',
  },
  openGraph: {
    title: 'Client Portfolio & Live Deployments | Aatral Studios',
    description:
      'Explore live websites engineered by Aatral Studios. Real client builds with sub-second performance, custom design, and high commercial conversions.',
    url: 'https://aatralstudios.com/portfolio',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios Client Portfolio & Live Deployments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Portfolio | Aatral Studios',
    description:
      'Explore live websites engineered by Aatral Studios. Mobile-first architecture, WhatsApp ordering, and sub-second load times.',
    images: ['/logo.png'],
  },
};

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Aatral Studios Client Portfolio',
  description: 'Showcase of live commercial websites engineered by Aatral Studios.',
  url: 'https://aatralstudios.com/portfolio',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Aatral Studios',
    url: 'https://aatralstudios.com',
    logo: 'https://aatralstudios.com/logo.png',
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'CreativeWork',
        position: 1,
        name: 'RaRa Cafe',
        headline: 'Artisanal Cafe, Coffee & Quick Bites Experience',
        url: 'https://aatralstudios.github.io/rara_cafe/',
        description:
          'A sensory web experience designed for an artisanal cafe in Chennai with mobile-first menu, 1-tap WhatsApp ordering, and sub-second performance.',
        creator: {
          '@type': 'ProfessionalService',
          name: 'Aatral Studios',
        },
      },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <PortfolioClient />
    </>
  );
}

