import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Aatral Studios | We Build Websites That Help Businesses Grow',
  description:
    'We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers. Fast 10-day turnaround, accessible pricing, and direct engineer communication.',
  alternates: {
    canonical: 'https://aatralstudios.com',
  },
  openGraph: {
    title: 'Aatral Studios | We Build Websites That Help Businesses Grow',
    description:
      'We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers. Fast 10-day turnaround, direct engineer communication.',
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
      'We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers.',
    images: ['/logo.png'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
