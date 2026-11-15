import type { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Website Development Pricing & Packages — Aatral Studios',
  description:
    'Transparent introductory website development pricing for small businesses, shops, clinics, and brands. Packages from ₹3,999 to ₹29,999 with responsive design, WhatsApp chat, and 4–18 day delivery.',
  alternates: {
    canonical: 'https://aatralstudios.com/pricing',
  },
  openGraph: {
    title: 'Website Development Pricing & Packages | Aatral Studios',
    description:
      'Clear, honest website development pricing for Indian businesses. Packages from ₹3,999 to ₹29,999 with bespoke design, WhatsApp integration, and fast delivery.',
    url: 'https://aatralstudios.com/pricing',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios Website Pricing & Packages',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Pricing & Packages | Aatral Studios',
    description:
      'Transparent website pricing from ₹3,999 to ₹29,999. Landing pages, starter business sites, professional portals, and premium brand builds.',
    images: ['/logo.png'],
  },
};

const pricingJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Aatral Studios Website Development Pricing',
  description: 'Detailed introductory pricing packages for custom web design and development.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Aatral Studios',
    url: 'https://aatralstudios.com',
    logo: 'https://aatralstudios.com/logo.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website Development Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        name: '01. Landing Page Website',
        description: 'Single-page website for individuals, small businesses and promotional campaigns.',
        priceCurrency: 'INR',
        minPrice: '3999',
        maxPrice: '5999',
        price: '3999',
      },
      {
        '@type': 'Offer',
        name: '02. Starter Business Website',
        description: 'Up to 5 pages for shops, freelancers, small businesses and service providers.',
        priceCurrency: 'INR',
        minPrice: '7999',
        maxPrice: '10999',
        price: '7999',
      },
      {
        '@type': 'Offer',
        name: '03. Professional Business Website',
        description: 'Up to 8 pages for established businesses, clinics, agencies and institutions.',
        priceCurrency: 'INR',
        minPrice: '12999',
        maxPrice: '17999',
        price: '12999',
      },
      {
        '@type': 'Offer',
        name: '04. Premium Business Website',
        description: 'Up to 12 pages for brands needing a customized digital experience and advanced animations.',
        priceCurrency: 'INR',
        minPrice: '19999',
        maxPrice: '29999',
        price: '19999',
      },
    ],
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingJsonLd) }}
      />
      <PricingClient />
    </>
  );
}

