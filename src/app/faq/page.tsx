import type { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description:
    'Answers to top questions for first-time website buyers: 10-day development timelines, domain & cloud hosting, mobile responsiveness, CMS updates, maintenance, and 30-day post-launch support.',
  alternates: {
    canonical: 'https://aatralstudios.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Aatral Studios',
    description:
      'Answers to top questions for first-time website buyers: 10-day turnaround, domain and hosting, mobile responsiveness, CMS admin panels, maintenance, and 30-day support.',
    url: 'https://aatralstudios.com/faq',
    siteName: 'Aatral Studios',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Aatral Studios FAQ — Clear Answers for First-Time Clients',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions (FAQ) | Aatral Studios',
    description:
      'Everything you need to know about website timelines, domain, hosting, mobile responsiveness, and 30-day support with Aatral Studios.',
    images: ['/logo.png'],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does website development take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the scope and complexity of your project, but most business websites and landing pages are designed, developed, and deployed within 10 days. For custom portals or complex multi-page applications, we provide exact milestone delivery dates before starting.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide domain and hosting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide domain setup and fast, secure cloud hosting. We configure your domain, DNS records, and automated SSL security certificates (HTTPS) so your website is completely ready for your visitors from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I update website content myself?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if your website includes an admin panel or Content Management System (CMS). For a regular static website, content updates require code changes unless you have technical knowledge in HTML/CSS. If you need to regularly update text, blogs, or products yourself, let us know and we will include an easy-to-use admin dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my website work on mobile devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely. All of our websites are 100% mobile-responsive and engineered to look and perform seamlessly across all smartphones, tablets, laptops, and desktop screens.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we provide ongoing maintenance and website health care, charged separately based on your requirements. Maintenance includes speed monitoring, security patches, regular backups, and content updates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you redesign my existing website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely. We can redesign and modernize your current website from the ground up, upgrading its visual appeal, user experience, mobile responsiveness, and page loading speed while preserving your existing branding and SEO rankings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide support after deployment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide 30 days of complimentary post-deployment support for every project to resolve any technical issues or bug fixes that may arise after launch.',
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQClient />
    </>
  );
}
