'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Code-splitting heavy Three.js WebGL and deferred dock
const ScrollDesignCanvas = dynamic(() => import('@/components/ScrollDesignCanvas'), { ssr: false });
const FloatingLeadDock = dynamic(() => import('@/components/FloatingLeadDock'), { ssr: false });
import {
  HelpCircle,
  Clock,
  Globe,
  FileEdit,
  Smartphone,
  Wrench,
  RefreshCw,
  ShieldCheck,
  ChevronDown,
  Search,
  ArrowRight,
  Sparkles,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

interface FAQItem {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  tag: string;
  icon: React.ElementType;
}

const faqList: FAQItem[] = [
  {
    id: 'timeline',
    question: 'How long does website development take?',
    shortAnswer: 'Most projects are completed within 10 days.',
    detailedAnswer:
      'It depends on the scope and complexity of your project, but most business websites and landing pages are designed, developed, and deployed within 10 days. For custom portals or complex multi-page applications, we provide exact milestone delivery dates before starting.',
    tag: 'Turnaround Time',
    icon: Clock,
  },
  {
    id: 'domain-hosting',
    question: 'Do you provide domain and hosting?',
    shortAnswer: 'Yes, we provide domain and hosting setup.',
    detailedAnswer:
      'Yes, we provide domain setup and fast, secure cloud hosting. We configure your domain, DNS records, and automated SSL security certificates (HTTPS) so your website is completely ready for your visitors from day one.',
    tag: 'Domain & Hosting',
    icon: Globe,
  },
  {
    id: 'content-updates',
    question: 'Can I update website content myself?',
    shortAnswer: 'Yes, if your website includes an admin panel or CMS.',
    detailedAnswer:
      'Yes, if your website includes an admin panel or Content Management System (CMS). For a regular static website, content updates require code changes unless you have technical knowledge in HTML/CSS. If you need to regularly update text, blogs, or products yourself, let us know and we will include an easy-to-use admin dashboard.',
    tag: 'Content Updates & CMS',
    icon: FileEdit,
  },
  {
    id: 'mobile',
    question: 'Will my website work on mobile devices?',
    shortAnswer: 'Yes, all websites are 100% responsive.',
    detailedAnswer:
      'Yes, absolutely. All of our websites are 100% mobile-responsive and engineered to look and perform seamlessly across all smartphones, tablets, laptops, and desktop screens.',
    tag: 'Mobile Responsive',
    icon: Smartphone,
  },
  {
    id: 'maintenance',
    question: 'Do you provide maintenance?',
    shortAnswer: 'Yes, available and charged separately.',
    detailedAnswer:
      'Yes, we provide ongoing maintenance and website health care, charged separately based on your requirements. Maintenance includes speed monitoring, security patches, regular backups, and content updates.',
    tag: 'Maintenance & Care',
    icon: Wrench,
  },
  {
    id: 'redesign',
    question: 'Can you redesign my existing website?',
    shortAnswer: 'Yes, absolutely.',
    detailedAnswer:
      'Yes, absolutely. We can redesign and modernize your current website from the ground up, upgrading its visual appeal, user experience, mobile responsiveness, and page loading speed while preserving your existing branding and SEO rankings.',
    tag: 'Website Redesign',
    icon: RefreshCw,
  },
  {
    id: 'post-launch-support',
    question: 'Do you provide support after deployment?',
    shortAnswer: 'Yes, 30 days of complimentary technical support.',
    detailedAnswer:
      'Yes. We provide 30 days of complimentary post-deployment support for every project to resolve any technical issues or bug fixes that may arise after launch.',
    tag: 'Post-Launch Support',
    icon: ShieldCheck,
  },
];

export default function FAQClient() {
  const [openIds, setOpenIds] = useState<string[]>(['timeline', 'domain-hosting']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(faqList.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return faqList;
    return faqList.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.shortAnswer.toLowerCase().includes(q) ||
        f.detailedAnswer.toLowerCase().includes(q) ||
        f.tag.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <ScrollDesignCanvas />

      <main
        id="main-content"
        tabIndex={-1}
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '130px',
          paddingBottom: '100px',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Top Breadcrumb & Badge */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                fontSize: '11.5px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginBottom: '14px',
              }}
            >
              <Sparkles size={13} color="var(--primary)" />
              <span>Frequently Asked Questions</span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                letterSpacing: '-0.8px',
                marginBottom: '16px',
              }}
            >
              Clear Answers for Your <br />
              <span className="gradient-accent">First Website Project.</span>
            </h1>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: 1.6,
                maxWidth: '680px',
                margin: '0 auto',
              }}
            >
              Never purchased website development before? We keep things simple, transparent, and direct—no hidden fees, no confusing technical jargon, and no guesswork.
            </p>
          </div>

          {/* Interactive Search & Controls Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '28px',
              padding: '8px',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: '1 1 280px',
                padding: '4px 12px',
              }}
            >
              <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} aria-hidden="true" />
              <label htmlFor="faq-search-input" className="sr-only">
                Search frequently asked questions
              </label>
              <input
                id="faq-search-input"
                type="search"
                placeholder="Search questions (e.g., domain, 10 days, mobile, CMS)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13.5px',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '2px 6px',
                  }}
                  aria-label="Clear Search"
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={expandAll}
                style={{
                  background: 'var(--primary-soft)',
                  border: '1px solid rgba(45, 90, 67, 0.15)',
                  color: 'var(--primary)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* FAQ Accordion List with Semantic H2 */}
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Frequently Asked Questions &amp; Answers
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Showing {filteredFaqs.length} of {faqList.length} topics
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '48px' }}>
            {filteredFaqs.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '48px 24px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <HelpCircle size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  No matching questions found
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Have a specific question not covered here? Speak with our team directly.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-glow"
                  style={{ padding: '8px 18px', fontSize: '12.5px' }}
                >
                  View All Questions
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);
                const Icon = faq.icon;

                return (
                  <div
                    key={faq.id}
                    className="faq-card"
                    style={{
                      background: '#FFFFFF',
                      borderRadius: '14px',
                      border: isOpen ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isOpen ? '0 10px 24px -10px rgba(45, 90, 67, 0.12)' : 'var(--shadow-sm)',
                      overflow: 'hidden',
                      transition: 'all 0.22s ease',
                    }}
                  >
                    <button
                      id={`faq-q-${faq.id}`}
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${faq.id}`}
                      style={{
                        width: '100%',
                        padding: '20px 24px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: isOpen ? 'var(--primary-soft)' : 'var(--bg-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isOpen ? 'var(--primary)' : 'var(--text-secondary)',
                            flexShrink: 0,
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Icon size={19} />
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                            <span
                              style={{
                                fontSize: '10.5px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                color: 'var(--accent)',
                                background: 'var(--accent-soft)',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-full)',
                              }}
                            >
                              {faq.tag}
                            </span>
                          </div>

                          <h3
                            className="font-display"
                            style={{
                              fontSize: '16px',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              margin: 0,
                              lineHeight: 1.35,
                            }}
                          >
                            {faq.question}
                          </h3>
                        </div>
                      </div>

                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: isOpen ? 'var(--primary-soft)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isOpen ? 'var(--primary)' : 'var(--text-muted)',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.22s ease, background 0.22s ease',
                          flexShrink: 0,
                        }}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <div
                      id={`faq-a-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-q-${faq.id}`}
                      style={{
                        display: isOpen ? 'block' : 'none',
                        padding: '0 24px 22px 76px',
                        borderTop: '1px solid rgba(232, 225, 213, 0.4)',
                        marginTop: '4px',
                        paddingTop: '16px',
                      }}
                      className="faq-answer-body"
                    >
                      {/* Quick Highlight Pill */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--primary-soft)',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          color: 'var(--primary)',
                          fontSize: '12px',
                          fontWeight: 700,
                          marginBottom: '10px',
                        }}
                      >
                        <CheckCircle2 size={13} color="var(--primary)" />
                        <span>Quick Summary: {faq.shortAnswer}</span>
                      </div>

                      <p
                        style={{
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {faq.detailedAnswer}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Founder Assistance Card */}
          <div
            style={{
              padding: '32px 36px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: '18px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
            className="faq-cta-card"
          >
            <div style={{ maxWidth: '520px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  marginBottom: '8px',
                }}
              >
                <MessageCircle size={14} color="var(--accent)" />
                <span>Direct Founder Consultation</span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  lineHeight: 1.3,
                }}
              >
                Have a question specific to your business?
              </h2>
              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Speak directly with our engineering founders (Vasanthabalan & Sudharshini). We are happy to review your ideas, answer any questions, and explain your options with zero sales pressure.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '280px' }}>
              <a
                href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I%20have%20a%20few%20questions%20about%20building%20a%20website!"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  borderRadius: 'var(--radius-full)',
                  background: '#25D366',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px -4px rgba(37, 211, 102, 0.35)',
                  transition: 'transform 0.18s ease',
                }}
              >
                <WhatsAppIcon size={16} color="#FFFFFF" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="/#contact"
                className="btn-glow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  fontSize: '13px',
                  textDecoration: 'none',
                }}
              >
                <span>Start Your Project Brief</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingLeadDock />

      <style jsx>{`
        .faq-card:hover {
          border-color: rgba(45, 90, 67, 0.4);
        }
        @media (max-width: 768px) {
          .faq-answer-body {
            padding-left: 24px !important;
          }
          .faq-cta-card {
            padding: 24px 20px !important;
            flex-direction: column !important;
          }
          .faq-cta-card > div:last-child {
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
