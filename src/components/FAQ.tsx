'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How much does a website typically cost?',
    answer:
      'Our projects typically range from ₹20,000 for focused, high-converting landing pages up to ₹95,000+ for enterprise SaaS web applications and headless e-commerce stores. You can use our Interactive Estimator above to get an instant scope-based breakdown.',
  },
  {
    question: 'How long does development take?',
    answer:
      'A focused landing page takes 5 to 7 business days. Standard multi-page corporate websites take 2 to 3 weeks. Complex SaaS applications or custom portals take 4 to 6 weeks. We provide clear milestone sprint dates upfront and guarantee our timelines.',
  },
  {
    question: 'Do you provide custom website designs or pre-made templates?',
    answer:
      'Every single website we build is 100% custom-crafted. We do not use bloated pre-purchased themes. We design bespoke visual tokens in Figma and code clean, hardware-accelerated frontend components tailored specifically to your brand.',
  },
  {
    question: 'Can you redesign our existing website without losing our current SEO ranking?',
    answer:
      'Yes, absolutely. In our redesign process, we preserve your existing URL slugs, implement clean 301 redirects where needed, and enhance your technical meta schema. Clients typically experience an SEO boost due to faster sub-second load times and mobile optimization.',
  },
  {
    question: 'Is domain registration included?',
    answer:
      'We assist you in selecting and purchasing your domain directly in your name (via Namecheap, GoDaddy, or Cloudflare) so that you retain 100% legal ownership of your digital property. We handle all DNS and SSL configuration free of charge.',
  },
  {
    question: 'Is hosting included, and where will our website live?',
    answer:
      'We configure production deployment on modern global edge CDNs such as Vercel, Cloudflare, or AWS. For standard sites, edge hosting includes free automated SSL certificates, DDoS mitigation, and global caching with minimal or zero ongoing server fees.',
  },
  {
    question: 'Do you provide ongoing maintenance and technical support?',
    answer:
      'Yes! Every project includes a 30-day post-launch warranty with active monitoring and bug fixes. We also offer optional monthly Hypercare retainer tiers for scheduled speed tuning, automated backups, and prioritized feature updates.',
  },
  {
    question: 'Can our internal team update content, text, and images later?',
    answer:
      'Yes. Depending on your team workflow, we integrate headless content management systems (like Sanity, Strapi, or markdown CMS) so your marketing team can update blogs, services, team members, and testimonials without writing a line of code.',
  },
  {
    question: 'How can I start a project with Aatral Studios?',
    answer:
      'Simply fill out our project enquiry form below or message us directly on WhatsApp at +91 8220820236. We will review your requirements and provide a structured proposal and timeline within 12 to 24 hours.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill" style={{ marginBottom: '14px' }}>
            <HelpCircle size={14} color="#2563EB" />
            <span>Clear Answers</span>
          </div>
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Direct, transparent information about pricing, development cycles, ownership, and client collaboration.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  background: '#FFFFFF',
                  borderColor: isOpen ? '#2563EB' : '#CBD5E1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  boxShadow: isOpen ? '0 8px 24px rgba(37, 99, 235, 0.08), 0 0 0 1px #2563EB' : 'var(--shadow-sm)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    color: isOpen ? '#2563EB' : '#0B132B',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 700,
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: isOpen ? '#2563EB' : '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: 1.7,
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
