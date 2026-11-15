'use client';

import React from 'react';
import {
  Compass,
  Palette,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

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
    headline: 'Aligning on business goals and project scope',
    description:
      'We understand your business goals, map out page structure, and agree on clear milestones before writing code.',
    deliverables: [
      'Timeline & milestone roadmap',
      'Page structure & sitemap',
      'Content & goal outline',
    ],
    clientMilestone: 'Milestone: Plan Approved',
  },
  {
    step: '02',
    name: 'Visual Design',
    icon: Palette,
    headline: 'Original layouts tailored to your unique brand',
    description:
      'We craft bespoke mobile and desktop layouts for your brand. You review and suggest edits until you are completely satisfied.',
    deliverables: [
      'Custom desktop & mobile designs',
      'Brand colors & typography',
      'Collaborative design revisions',
    ],
    clientMilestone: 'Milestone: Design Approved',
  },
  {
    step: '03',
    name: 'Build & Test',
    icon: ShieldCheck,
    headline: 'Fast, responsive engineering and thorough testing',
    description:
      'We build your site for high speed and test every form, button, and interaction across real phones, tablets, and laptops.',
    deliverables: [
      'Fast, responsive web build',
      'Working lead forms & WhatsApp chat',
      'Multi-device quality testing',
    ],
    clientMilestone: 'Milestone: Working Preview Approved',
  },
  {
    step: '04',
    name: 'Launch & Support',
    icon: Rocket,
    headline: 'Smooth domain rollout and 30-day post-launch care',
    description:
      'We connect your custom domain, set up free SSL security, and provide 30 days of dedicated support after launch.',
    deliverables: [
      'Domain setup & free SSL security',
      'Live launch & form verification',
      '30 days free technical support',
    ],
    clientMilestone: 'Milestone: Live on Your Domain',
  },
];

export default function ProcessTimeline() {
  return (
    <section
      id="process"
      className="process-section"
      style={{
        padding: '90px 0',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ maxWidth: '1160px' }}>
        {/* Section Header */}
        <div className="process-header" style={{ maxWidth: '720px', marginBottom: '56px', textAlign: 'left' }}>
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
            marginBottom: 0,
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
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .process-roadmap-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .process-section {
            padding: 48px 0 !important;
          }
          .process-header {
            margin-bottom: 24px !important;
          }
          .process-roadmap-grid {
            gap: 12px !important;
          }
          .process-step-card {
            padding: 18px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
