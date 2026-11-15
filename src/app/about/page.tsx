import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us — Meet the Founders Behind Aatral Studios',
  description:
    'Meet the engineering founders of Aatral Studios: Vasanthabalan B (Chennai) and Sudharshini NS (Chengalpattu). Direct developer collaboration, transparent pricing, and modern web craftsmanship.',
  alternates: {
    canonical: 'https://aatralstudios.com/about',
  },
  openGraph: {
    title: 'About Us | Aatral Studios',
    description:
      'Meet the team behind Aatral Studios: Vasanthabalan B & Sudharshini NS. Computer Science engineers building high-performance websites directly with clients.',
    url: 'https://aatralstudios.com/about',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/team/vasanthabalan.jpg',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios Founders — Vasanthabalan B & Sudharshini NS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Aatral Studios',
    description:
      'Meet the founders of Aatral Studios: Vasanthabalan B & Sudharshini NS. Modern web craftsmanship and direct collaboration.',
    images: ['/images/team/vasanthabalan.jpg'],
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'Aatral Studios',
    url: 'https://aatralstudios.com',
    logo: 'https://aatralstudios.com/logo.png',
    description:
      'Agile web engineering and modern digital design studio founded by Vasanthabalan B and Sudharshini NS.',
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
        alumniOf: 'Computer Science and Engineering (CSE)',
        homeLocation: 'Chennai, Tamil Nadu, India',
        image: 'https://aatralstudios.com/images/team/vasanthabalan.jpg',
      },
      {
        '@type': 'Person',
        name: 'Sudharshini NS',
        jobTitle: 'Co-Founder & Frontend / UI/UX Developer',
        alumniOf: 'Computer Science and Engineering (CSE)',
        homeLocation: 'Chengalpattu, Tamil Nadu, India',
        image: 'https://aatralstudios.com/images/team/sudharshini.jpg',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutClient />
    </>
  );
}
