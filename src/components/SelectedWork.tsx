'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Layers,
} from 'lucide-react';

interface PrototypeConcept {
  id: string;
  title: string;
  focus: string;
  category: string;
  archetype: string;
  summary: string;
  gradient: string;
  deliverables: string[];
  conceptGoal: string;
  engineeringHighlight: string;
}

const prototypes: PrototypeConcept[] = [
  {
    id: 'automotive-3d',
    title: 'Luxury Automotive Digital Showroom',
    focus: '3D Interaction & VIP Lead Capture',
    category: 'Interactive 3D Experience',
    archetype: 'Automotive & Luxury Brands',
    summary: 'An immersive digital showroom concept featuring real-time vehicle finishes, interior exploration, and seamless VIP inquiry routing.',
    gradient: 'linear-gradient(135deg, #18231E 0%, #2D5A43 60%, #1B3527 100%)',
    deliverables: ['Real-Time 3D Configurator', 'VIP Consultation Funnel', 'Mobile-Responsive Controls', 'High-Prestige Visuals'],
    conceptGoal: 'Designed to replace static brochure pages with an engaging interactive experience that commands attention.',
    engineeringHighlight: 'Engineered with smooth 60fps WebGL rendering, mobile-optimized asset compression, and instant form submission.',
  },
  {
    id: 'heritage-ecommerce',
    title: 'Heritage Retail & Fashion Storefront',
    focus: 'Mobile-First Speed & 1-Tap Checkout',
    category: 'E-Commerce Storefront',
    archetype: 'Fashion, Apparel & Luxury Retail',
    summary: 'High-speed fashion and apparel storefront concept featuring fast mobile browsing, multi-currency support, and WhatsApp order alerts.',
    gradient: 'linear-gradient(135deg, #241408 0%, #78350F 50%, #451A03 100%)',
    deliverables: ['Mobile-First Product Grid', '1-Tap Fast Checkout UI', 'Multi-Currency Selector', 'WhatsApp Order Updates'],
    conceptGoal: 'Optimized to eliminate mobile cart drop-offs with clean product storytelling and instant load times.',
    engineeringHighlight: 'Built with edge-cached image delivery, rapid product filtering, and lightweight checkout integration.',
  },
  {
    id: 'b2b-saas',
    title: 'Modern B2B Software Platform',
    focus: 'Clarity, Feature Demos & Free Trials',
    category: 'SaaS & Web Application',
    archetype: 'B2B Software & Tech Companies',
    summary: 'Clear, high-converting software website concept featuring interactive feature walkthroughs, pricing calculators, and fast signup onboarding.',
    gradient: 'linear-gradient(135deg, #18231E 0%, #1A365D 60%, #0F172A 100%)',
    deliverables: ['Interactive Feature Demos', 'Interactive Pricing Calculator', 'Frictionless Trial Flow', 'Crisp Typography System'],
    conceptGoal: 'Designed to communicate complex software features simply and convert visitors into trial users.',
    engineeringHighlight: 'Clean component structure, responsive data tables, and rapid form handling with zero bloat.',
  },
  {
    id: 'fitness-hardware',
    title: 'Smart Tech & Hardware Launch Page',
    focus: 'High-Impact Kinetic Product Storytelling',
    category: 'Product Launch Funnel',
    archetype: 'Consumer Electronics & Hardware',
    summary: 'High-converting launch campaign concept for innovative hardware featuring fluid product visual breakdowns and instant reservations.',
    gradient: 'linear-gradient(135deg, #2D5A43 0%, #D97746 100%)',
    deliverables: ['Cinematic Hero Composition', 'Product Feature Breakdown', 'VIP Reservation Funnel', 'Fast Email Lead Routing'],
    conceptGoal: 'Crafted to build anticipation and turn ad traffic into early reservations during product rollouts.',
    engineeringHighlight: 'Hardware-accelerated CSS animations that degrade gracefully on low-power mobile devices.',
  },
  {
    id: 'd2c-subscription',
    title: 'Direct-to-Consumer Subscription Portal',
    focus: 'Curated Onboarding & Member Retention',
    category: 'Subscription Commerce',
    archetype: 'Specialty Retail & Food/Beverage',
    summary: 'Custom subscription commerce concept with an intuitive taste quiz, automated recurring deliveries, and clean self-serve account control.',
    gradient: 'linear-gradient(135deg, #381E11 0%, #854D0E 60%, #18231E 100%)',
    deliverables: ['Step-by-Step Preference Quiz', 'Automated Recurring Delivery UI', 'Self-Serve Account Portal', 'Mobile Cart Integration'],
    conceptGoal: 'Removes the friction from recurring purchases by personalizing product recommendations.',
    engineeringHighlight: 'Modular multi-step wizard state management with instant client-side validation.',
  },
  {
    id: 'enterprise-corporate',
    title: 'Global Corporate Portal',
    focus: 'Authority, International Logistics & Quotes',
    category: 'Corporate Brand Portal',
    archetype: 'Logistics, Supply Chain & Enterprise',
    summary: 'Authoritative corporate website concept with instant quotation calculators, multi-regional contact routing, and modern corporate branding.',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #2D5A43 100%)',
    deliverables: ['Authoritative Visual Design', 'Instant Quote Calculator', 'Multi-Office Directory', 'Sub-Second Global Loading'],
    conceptGoal: 'Built to elevate commercial credibility when dealing with multinational corporate partners.',
    engineeringHighlight: 'Clean semantic structure, strict accessibility compliance, and enterprise-grade security headers.',
  },
];

export default function SelectedWork() {
  const [selectedConcept, setSelectedConcept] = useState<PrototypeConcept | null>(null);

  return (
    <section id="work" style={{ padding: '100px 0', position: 'relative', zIndex: 2, background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Section Header - Honest & Authentic */}
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} color="var(--primary)" />
            <span>Studio Prototypes &amp; Craft</span>
          </div>
          <h2 className="section-title">
            Design Concepts &amp; Capabilities
          </h2>
          <p className="section-subtitle">
            As an emerging independent studio, we lead with raw craft. Explore our interactive production prototypes demonstrating the caliber of design and performance we deliver for your business.
          </p>
        </div>

        {/* 6 Prototype Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
            marginBottom: '48px',
          }}
        >
          {prototypes.map((item) => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Visual Banner Preview */}
              <div
                style={{
                  height: '210px',
                  background: item.gradient,
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      background: 'rgba(0,0,0,0.35)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {item.category}
                  </span>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      background: 'rgba(0,0,0,0.5)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Studio Concept
                  </span>
                </div>

                <div>
                  <h3
                    className="font-display"
                    style={{ fontSize: '21px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px', lineHeight: 1.25 }}
                  >
                    {item.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    Built for: {item.archetype}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {item.summary}
                  </p>

                  {/* Key Deliverables Chips */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {item.deliverables.map((deliv, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'var(--primary)',
                          background: 'var(--primary-soft)',
                          border: '1px solid rgba(45, 90, 67, 0.15)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Key Focus:</span>
                    <strong style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontWeight: 700 }}>{item.focus}</strong>
                  </div>

                  <button
                    onClick={() => setSelectedConcept(item)}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    <span>View Concept</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
            Need a bespoke website tailored to your brand’s specific vision?
          </p>
          <a href="#contact" className="btn-glow" style={{ padding: '15px 34px' }}>
            <span>Discuss Your Project With Us</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Concept Detail Modal */}
      {selectedConcept && (
        <div className="modal-overlay" onClick={() => setSelectedConcept(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11.5px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  {selectedConcept.category}
                </span>
                <h3 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {selectedConcept.title}
                </h3>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Application Archetype: {selectedConcept.archetype}
                </span>
              </div>

              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  padding: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Highlight Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  background: 'var(--primary-soft)',
                  border: '1px solid rgba(45, 90, 67, 0.2)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Primary Objective
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedConcept.focus}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Design Goal</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedConcept.conceptGoal}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>Technical &amp; UX Highlight</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{selectedConcept.engineeringHighlight}</p>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>What We Build in This Scope</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedConcept.deliverables.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '5px 12px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <a
                href="#contact"
                onClick={() => setSelectedConcept(null)}
                className="btn-glow"
                style={{ padding: '12px 24px', fontSize: '13.5px' }}
              >
                <span>Commission Similar Build</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
