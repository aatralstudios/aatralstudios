'use client';

import React, { useState } from 'react';
import { Sparkles, Layers, Terminal, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { AatralIconMark } from './AatralLogo';

const pillars = [
  {
    id: 'visual-craft',
    icon: Sparkles,
    title: 'Visual Craft',
    subtitle: 'Arresting Aesthetics, Not Generic Templates',
    description:
      'We treat every interface as digital architecture. From bespoke typography pairings to fluid motion systems, we craft bespoke brand worlds that command respect and establish immediate authority.',
    highlights: ['Bespoke Design Systems', 'Kinetic Micro-Interactions', 'Immersive Brand Storytelling', 'Accessible & Device-Fluid'],
  },
  {
    id: 'technical-execution',
    icon: Terminal,
    title: 'Technical Execution',
    subtitle: 'Zero Compromise Production Engineering',
    description:
      'Beautiful designs mean nothing if they buckle under traffic or lag on mobile. We engineer sub-second load times, headless architectures, airtight API boundaries, and rock-solid reliability.',
    highlights: ['Next.js & Edge Compute', '95+ Lighthouse Performance', 'Zero Secret-Exposure Security', 'Strict Modular TypeScript'],
  },
  {
    id: 'commercial-impact',
    icon: TrendingUp,
    title: 'Commercial Impact',
    subtitle: 'Engineered to Convert Ambition into Revenue',
    description:
      'We build websites that solve genuine commercial problems. From frictionless enquiry funnels to high-velocity e-commerce checkouts, capability is measured by your balance sheet.',
    highlights: ['High-Conversion Information Flow', 'Rapid Time-to-Market', 'Data-Backed UX Decisions', '12–24h Turnaround SLA'],
  },
];

export default function BrandStory() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = pillars[activeTab];
  const PillarIcon = activePillar.icon;

  return (
    <section id="brand-story" style={{ padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* Brand Foundation Heading */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              background: '#eef2ff',
              border: '1px solid #c7d2fe',
              borderRadius: 'var(--radius-full)',
              marginBottom: '18px',
            }}
          >
            <AatralIconMark size={16} />
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#4338ca', letterSpacing: '0.4px' }}>
              ஆற்றல் • The Doctrine of Capability
            </span>
          </div>

          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '20px', color: '#0f172a', lineHeight: 1.15 }}
          >
            Crafted with Creativity. <br />
            <span className="gradient-accent">Built with Capability.</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7 }}>
            In classical Tamil, <strong>Aatral (ஆற்றல்)</strong> embodies raw capability, profound strength, and the
            capacity to execute with decisive power. Most agencies force you to choose between visual beauty or technical rigor.
            <strong> Aatral Studios exists to unite both.</strong>
          </p>
        </div>

        {/* Interactive Visual Manifesto Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="brand-manifesto-grid"
        >
          {/* Left Column: The 6-Block Visual Motif Breakdown */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(24px, 4vw, 40px)',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <AatralIconMark size={36} />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    The Geometry of Capability
                  </h3>
                  <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>
                    Structure • Progression • Breakthrough
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                Our symbol is not arbitrary decoration. It depicts structured digital blocks ascending from foundational
                stability (five deep royal blue foundation blocks) culminating in a lime-green pinnacle block.
              </p>

              {/* 3 Step Concept Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>Connection &amp; Structure:</strong>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                      Architectural foundations that ensure zero technical debt and clean maintainable code.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#2563eb', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#0f172a' }}>Steadfast Execution:</strong>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                      Formidable frontend engineering that transforms elaborate designs into responsive, 60fps reality.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '12px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#84cc16', marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#166534' }}>The Breakthrough Summit:</strong>
                    <p style={{ fontSize: '12px', color: '#15803d', margin: '2px 0 0 0', lineHeight: 1.5 }}>
                      The pivotal leap when creative vision and technical capability combine to give your brand unfair market advantage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Brand Positioning Principle #1</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB' }}>Creativity Backed by Capability</span>
            </div>
          </div>

          {/* Right Column: Interactive Capability Pillars */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(24px, 4vw, 40px)',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Tab Selector Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  background: '#f1f5f9',
                  padding: '5px',
                  borderRadius: '12px',
                  marginBottom: '28px',
                }}
              >
                {pillars.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(idx)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === idx ? '#ffffff' : 'transparent',
                      color: activeTab === idx ? '#2563EB' : '#64748b',
                      fontWeight: activeTab === idx ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: activeTab === idx ? '0 2px 8px rgba(15, 23, 42, 0.08)' : 'none',
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: '#eef2ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2563EB',
                    }}
                  >
                    <PillarIcon size={18} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {activePillar.title}
                  </h3>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB', marginBottom: '12px' }}>
                  {activePillar.subtitle}
                </div>

                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                  {activePillar.description}
                </p>

                {/* Highlights Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {activePillar.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#334155',
                        fontWeight: 500,
                      }}
                    >
                      <CheckCircle size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <a
                href="#enquiry-section"
                className="btn-glow"
                style={{ width: '100%', padding: '12px', fontSize: '14px' }}
              >
                <span>Harness Aatral for Your Project</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
