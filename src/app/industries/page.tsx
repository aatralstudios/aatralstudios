import type { Metadata } from 'next';
import IndustriesClient from './IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve — Bespoke Websites for Every Sector',
  description:
    'Tailored web design and development for Real Estate, Healthcare Clinics, Restaurants & Cafes, Fashion Boutiques, Corporate Firms, and Fitness Studios. High conversion and sub-second performance.',
  alternates: {
    canonical: 'https://aatralstudios.com/industries',
  },
  openGraph: {
    title: 'Industries We Serve | Aatral Studios',
    description:
      'Tailored websites for Real Estate, Healthcare, Restaurants, Retail, Corporate & Fitness. High-performance engineering engineered for business growth.',
    url: 'https://aatralstudios.com/industries',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/industries/hospitality.webp',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios — Tailored Websites for Every Business Sector',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | Aatral Studios',
    description:
      'Tailored web design and development for Real Estate, Healthcare, Restaurants, Fashion, Corporate, and Fitness.',
    images: ['/images/industries/hospitality.webp'],
  },
};

const industriesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Bespoke Web Design & Development',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Aatral Studios',
    url: 'https://aatralstudios.com',
    logo: 'https://aatralstudios.com/logo.png',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industry-Specific Web Development Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate & Property Development Websites',
          description: 'High-ticket architectural showcases, interactive floorplans, and private viewing booking.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Clinics & Healthcare Web Portals',
          description: 'Patient appointment scheduling, specialist credentials, and high-trust medical design.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurants, Cafes & Hospitality Websites',
          description: 'Interactive mobile menus, direct table reservations, and appetizing food photography.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fashion & Boutique Brand Showcases',
          description: 'Editorial lookbooks, curated seasonal drops, and seamless social shopping integration.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate & Professional Service Platforms',
          description: 'B2B lead generation, case study showcases, and executive client authority.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fitness & Wellness Studio Websites',
          description: 'Class schedule booking, trainer bios, and effortless membership conversions.',
        },
      },
    ],
  },
};

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesJsonLd) }}
      />
      <IndustriesClient />
    </>
  );
}
