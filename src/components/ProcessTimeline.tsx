'use client';

import React from 'react';
import {
  Compass,
  Palette,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

interface ProcessStep {
  step: string;
  name: string;
  icon: React.ElementType;
  headline: string;
  deliverables: string[];
  description: string;
  clientMilestone: string;
}

const steps: ProcessStep[] = [
  {
    step: '01',
    name: 'Discovery & Plan',
    icon: Compass,
    headline: 'Aligning on business goals, customer psychology & scope',
    description:
      'We start with an in-depth conversation to understand your business model, customer pain points, and commercial objectives. Zero guesswork—every page has a purpose before we begin designing.',
    deliverables: [
      'Scope & Milestone Timeline Agreement',
      'Site Architecture & Page Flow Structure',
      'Content Outline & Narrative Strategy',
      'Customer Profile Alignment',
    ],
    clientMilestone: 'Phase Sign-Off: Blueprint & Sitemap Approved',
  },
  {
    step: '02',
    name: 'Visual Design',
    icon: Palette,
    headline: 'Crafting bespoke visuals tailored to your unique brand',
    description:
      'We sculpt original, high-prestige layouts tailored specifically for your business—never generic templates. You review designs, request revisions, and approve before development begins.',
    deliverables: [
      'Original Desktop & Mobile Figma Layouts',
      'Brand Color Tokens & Typography Scale',
      'Interactive Prototypes & Motion States',
      'Collaborative Revision Rounds',
    ],
    clientMilestone: 'Phase Sign-Off: Visual Design Approved',
  },
  {
    step: '03',
    name: 'Build & Quality',
    icon: ShieldCheck,
    headline: 'Engineering a fast, responsive, and rock-solid website',
    description:
      'We bring designs to life with smooth animations and lightning-fast loading speeds. Every form, button, and layout is rigorously tested across real iPhones, Androids, tablets, and laptops.',
    deliverables: [
      'Tested Across iPhones, Androids & Desktops',
      'Working Lead Forms & WhatsApp Routing',
      'Ultra-Fast Loading & Google Performance',
      'Interactive Private Staging Review Link',
    ],
    clientMilestone: 'Phase Sign-Off: Working Preview Approved',
  },
  {
    step: '04',
    name: 'Launch & Support',
    icon: Rocket,
    headline: 'Smooth domain rollout, live verification & ongoing peace of mind',
    description:
      'We handle domain DNS routing and SSL security checklist smoothly. After launch, we stay by your side with 30 days of dedicated complimentary support to ensure flawless operation.',
    deliverables: [
      'Domain Setup & Free SSL Security',
      'Live Form & Lead Delivery Verification',
      'Video Walkthrough & Handover Guide',
      '30 Days Dedicated Hypercare Support',
    ],
    clientMilestone: 'Project Completion: Live Handover & 30-Day Support',
  },
];

export default function ProcessTimeline() {
  return (
    <section
      id="process"
      style={{
        padding: '90px 0',
        position: 'relative',
        zIndex: 2,
        background: 'transparent',
      }}
    >
      <div className="container" style={{ maxWidth: '1160px' }}>
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '56px', textAlign: 'left' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-soft)',
              color: 'var(--primary)',
              fontSize: '11.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              marginBottom: '14px',
            }}
          >
            <Clock size={13} color="var(--primary)" />
            <span>How We Work With You</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-1px',
              marginBottom: '12px',
            }}
          >
            A Clear, Predictable 4-Step Milestone Roadmap
          </h2>
          <p
            style={{
              fontSize: '14.5px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            No guesswork, no radio silence. See all 4 phases at a glance so you always know what is being crafted, what milestone comes next, and when your website goes live.
          </p>
        </div>

        {/* 4-Step Sequential Horizontal Journey Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
            position: 'relative',
          }}
          className="process-roadmap-grid"
        >
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={s.step}
                className="process-step-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: '24px 22px',
                  boxShadow: '0 4px 16px rgba(24, 35, 30, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(45, 90, 67, 0.12)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(24, 35, 30, 0.04)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div>
                  {/* Step Top Bar: Number + Timeline Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'var(--primary-soft)',
                        border: '1px solid rgba(45, 90, 67, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                        fontWeight: 800,
                        fontSize: '15px',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      {s.step}
                    </div>

                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: 'rgba(45, 90, 67, 0.06)',
                        border: '1px solid rgba(45, 90, 67, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                      }}
                    >
                      <Icon size={17} />
                    </div>
                  </div>

                  {/* Step Name & Headline */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    {s.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '18px',
                    }}
                  >
                    {s.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '7px',
                      marginBottom: '18px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        color: 'var(--text-muted)',
                        marginBottom: '2px',
                      }}
                    >
                      Key Deliverables:
                    </span>
                    {s.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          fontSize: '11.5px',
                          color: 'var(--text-primary)',
                          lineHeight: 1.35,
                        }}
                      >
                        <CheckCircle2
                          size={13}
                          color="var(--primary)"
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestone Pill at bottom */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Sparkles size={12} color="var(--accent)" />
                  <span>{s.clientMilestone}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <div
          className="process-guarantee-banner"
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
        >
          <div>
            <div
              style={{
                fontSize: '14.5px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '2px',
              }}
            >
              Zero Radio Silence Guarantee
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              You receive weekly progress video updates, clear Figma milestone links, and dedicated WhatsApp chat <WhatsAppIcon size={14} color="#25D366" style={{ display: 'inline', verticalAlign: '-2px', margin: '0 2px' }} /> directly with your designer.
            </div>
          </div>

          <a
            href="#contact"
            className="btn-glow"
            style={{ padding: '11px 22px', fontSize: '13px' }}
          >
            <span>Start Your Project With Us</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-roadmap-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .process-guarantee-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
            padding: 18px 16px !important;
          }
          .process-guarantee-banner a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
