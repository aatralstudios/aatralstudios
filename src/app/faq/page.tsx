import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Aatral Studios',
  description:
    'Clear, honest answers to common questions about website timelines, domain, hosting, mobile responsiveness, CMS updates, maintenance, and 30-day post-launch support.',
  openGraph: {
    title: 'FAQ | Aatral Studios',
    description:
      'Everything first-time website buyers need to know: timelines, domain, hosting, mobile responsiveness, maintenance, and support.',
    url: 'https://aatralstudios.com/faq',
    siteName: 'Aatral Studios',
    locale: 'en_US',
    type: 'website',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
