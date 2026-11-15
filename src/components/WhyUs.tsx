'use client';

import React from 'react';
import {
  Sparkles,
  Coins,
  MessagesSquare,
  Code2,
  Milestone,
  LifeBuoy,
  CheckCircle2,
  ArrowRight,
  Check,
} from 'lucide-react';

interface WhyUsItem {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  highlights: string[];
}

const reasons: WhyUsItem[] = [
  {
    number: '01',
    icon: Coins,
    title: 'Affordable Development',
    subtitle: 'Professional websites at accessible prices',
    description:
      'High-standard web engineering and modern visual design priced fairly for growing businesses. You get professional digital craftsmanship without bloated agency overheads.',
    tag: 'Accessible Pricing',
    highlights: ['Transparent Quotes', 'Zero Agency Markup', 'High ROI Delivery'],
  },
  {
    number: '02',
    icon: MessagesSquare,
    title: 'Direct Communication',
    subtitle: 'Work directly with the developers',
    description:
      'Collaborate 1-on-1 with the actual engineers and designers crafting your website. No account manager telephone games, no bureaucratic delays—just clear, direct communication.',
    tag: 'Direct 1-on-1 Chat',
    highlights: ['Direct WhatsApp', 'No Middlemen', 'Fast Turnaround'],
  },
  {
    number: '03',
    icon: Code2,
    title: 'Custom Development',
    subtitle: 'Solutions tailored to business requirements',
    description:
      'Every layout, interaction, and component is crafted specifically for your business goals and customer psychology. We write clean, modern code tailored to your exact needs.',
    tag: 'Bespoke Architecture',
    highlights: ['100% Bespoke Code', 'No Generic Themes'],
  },
  {
    number: '04',
    icon: Milestone,
    title: 'Transparent Process',
    subtitle: 'Clear milestones and project updates',
    description:
      'No guesswork or radio silence. You receive defined phase sign-offs, regular staging previews, and clear schedule updates so you always know when your site goes live.',
    tag: 'Defined Milestones',
    highlights: ['Milestone Sign-Offs', 'Live Staging Demos'],
  },
  {
    number: '05',
    icon: LifeBuoy,
    title: 'Post-Launch Support',
    subtitle: 'Assistance after deployment',
    description:
      'We stay by your side after your website is deployed to the live domain. You receive dedicated post-launch support and technical guidance to ensure everything operates smoothly.',
    tag: 'Dedicated Support',
    highlights: ['30-Day Hypercare', 'Technical Guidance'],
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      style={{
        padding: '90px 0',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ maxWidth: '1120px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
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
              marginBottom: '12px',
            }}
          >
            <Sparkles size={13} color="var(--primary)" />
            <span>Why Choose Aatral Studios</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              marginBottom: '12px',
              color: 'var(--text-primary)',
              lineHeight: 1.18,
              letterSpacing: '-0.8px',
            }}
          >
            Honest Craft. Direct Collaboration. <br />
            <span className="gradient-accent">Websites Built Right.</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '14.5px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We focus on what genuinely moves the needle for your business: clean modern code, accessible pricing, and reliable communication from start to finish.
          </p>
        </div>

        {/* Balanced Bento Grid: 2 Flagship Cards Top + 3 Pillar Cards Bottom */}
        <div className="why-us-bento-grid">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            const isTopRow = idx < 2;

            return (
              <div
                key={idx}
                className={`glass-card why-us-card ${isTopRow ? 'why-us-card-top' : 'why-us-card-bottom'}`}
                style={{
                  padding: isTopRow ? '32px 28px' : '26px 22px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Top Bar with Number, Icon and Tag */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: isTopRow ? '44px' : '40px',
                          height: isTopRow ? '44px' : '40px',
                          borderRadius: '10px',
                          background: 'var(--primary-soft)',
                          border: '1px solid rgba(45, 90, 67, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={isTopRow ? 22 : 19} />
                      </div>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.8px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {item.number}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        background: 'var(--accent-soft)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        letterSpacing: '0.4px',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: isTopRow ? '19px' : '16.5px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </h3>

                  <div
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: 'var(--primary)',
                      marginBottom: '12px',
                    }}
                  >
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                      marginBottom: '16px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Sub-Feature Highlights Pills */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(232, 225, 213, 0.45)',
                  }}
                >
                  {item.highlights.map((hl, hIdx) => (
                    <span
                      key={hIdx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-secondary)',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      <Check size={11} color="var(--primary)" />
                      <span>{hl}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout Bar */}
        <div
          style={{
            padding: '20px 28px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
          className="why-us-cta-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Looking for a dependable digital partner for your next project? Let’s review your requirements together.
            </div>
          </div>

          <a
            href="#contact"
            className="btn-glow"
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span>Start a Conversation</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .why-us-bento-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }
        .why-us-card-top {
          grid-column: span 3;
        }
        .why-us-card-bottom {
          grid-column: span 2;
        }
        .why-us-card:hover {
          transform: translateY(-3px);
          border-color: var(--primary);
          box-shadow: 0 12px 28px -10px rgba(45, 90, 67, 0.14);
        }
        @media (max-width: 960px) {
          .why-us-bento-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .why-us-card-top {
            grid-column: span 1 !important;
          }
          .why-us-card-bottom {
            grid-column: span 1 !important;
          }
          .why-us-card-bottom:last-child {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 640px) {
          .why-us-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .why-us-card-top,
          .why-us-card-bottom,
          .why-us-card-bottom:last-child {
            grid-column: span 1 !important;
          }
          .why-us-cta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .why-us-cta-bar a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
