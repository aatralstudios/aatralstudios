'use client';

import React from 'react';
import { Search, Compass, Code2, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Discovery & Strategic Blueprint',
    description: 'We dissect your brand positioning, target audience, conversion goals, and technical specifications to build a clear project scope.',
  },
  {
    icon: Compass,
    step: '02',
    title: 'High-Fidelity UI/UX Prototyping',
    description: 'Interactive Figma prototypes that look and feel like the finished product. We iterate rapidly until you are 100% satisfied.',
  },
  {
    icon: Code2,
    step: '03',
    title: 'Clean Modern Engineering',
    description: 'Production code using clean component architecture, lightning asset loading, mobile optimization, and zero technical debt.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Security Hardening',
    description: 'Pre-flight checklist covering technical SEO, SSL security headers, cross-browser compatibility, and CDN edge caching.',
  },
  {
    icon: LifeBuoy,
    step: '05',
    title: 'Hypercare & Maintenance',
    description: '30-day post-launch warranty with dedicated monitoring, speed tuning, and proactive support as your traffic scales.',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" style={{ padding: '80px 0', borderTop: '1px solid #e2e8f0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 50px auto' }}>
          <div className="badge-pill" style={{ marginBottom: '14px' }}>
            <span>Our Proven Workflow</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}
          >
            Predictable Timelines. <br />
            <span className="gradient-accent">Zero Surprises.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            From the moment your enquiry lands in our inbox to production deployment, our disciplined sprint model ensures complete transparency.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  background: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(79, 70, 229, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4f46e5',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#cbd5e1',
                    }}
                  >
                    {item.step}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
