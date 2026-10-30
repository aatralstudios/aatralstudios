'use client';

import React, { useState } from 'react';
import {
  Palette,
  Code2,
  Layout,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ElementType;
  title: string;
  category: string;
  headline: string;
  description: string;
  deliverables: string[];
  metric: string;
}

const serviceList: ServiceItem[] = [
  {
    id: 'web-design',
    icon: Palette,
    title: 'Web Design',
    category: 'Visual Craft',
    headline: 'Bespoke interfaces that arrest attention and elevate brand prestige.',
    description: 'We do not touch off-the-shelf templates. Every layout, color palette, and component is bespoke-crafted in Figma to reflect your brand identity and commercial goals.',
    deliverables: ['Custom Figma source files', 'Responsive layout system', 'Design tokens & typography', 'Kinetic micro-interaction prototypes'],
    metric: '100% Unique Architecture',
  },
  {
    id: 'web-dev',
    icon: Code2,
    title: 'Web Development',
    category: 'Full-Stack Engineering',
    headline: 'Sub-second performance powered by Next.js 15, React 19 & TypeScript.',
    description: 'Rock-solid frontend engineering with clean, modular code. Zero bloated dependencies, instant serverless execution, and smooth 60fps animations.',
    deliverables: ['Next.js App Router codebase', 'TypeScript end-to-end typing', 'Edge API routes & webhooks', 'Automated CI/CD deployment'],
    metric: '0.4s First Contentful Paint',
  },
  {
    id: 'ui-ux',
    icon: Layout,
    title: 'UI/UX Architecture',
    category: 'Conversion Psychology',
    headline: 'User journeys mapped to remove friction and drive visitor conversion.',
    description: 'We structure the narrative flow before touching aesthetics. Strategic visual hierarchy, intuitive navigation, and high-velocity lead capture funnels.',
    deliverables: ['Information architecture mapping', 'Wireframes & user flow tests', 'Checkout & form optimization', 'Accessibility (WCAG AA) pass'],
    metric: '+40% Avg Conversion Lift',
  },
  {
    id: 'branding',
    icon: Sparkles,
    title: 'Branding Systems',
    category: 'Identity & Story',
    headline: 'Memorable brand assets, geometric logomarks, and visual guidelines.',
    description: 'Give your agency or business a cohesive voice. From distinctive geometric logos to comprehensive brand books and social presence kits.',
    deliverables: ['Vector logomark & wordmark', 'Color theory palette definitions', 'Typography hierarchy rules', 'Complete brand style guide'],
    metric: 'Built to Scale',
  },
  {
    id: '3d-motion',
    icon: Layers,
    title: '3D & Creative Motion',
    category: 'Creative Tech',
    headline: 'WebGL Three.js scenes and kinetic animations that set you apart.',
    description: 'Immersive 3D product viewports, particle systems, and scroll-pinned storytelling that turn ordinary web pages into memorable digital worlds.',
    deliverables: ['Three.js interactive canvasing', 'Hardware-accelerated shaders', 'Scroll-driven GSAP sequences', 'Graceful low-power fallbacks'],
    metric: '60 FPS Guaranteed',
  },
  {
    id: 'seo-perf',
    icon: Zap,
    title: 'SEO & Performance',
    category: 'Growth Engine',
    headline: '95+ Lighthouse scores, technical schema, and organic search dominance.',
    description: 'Speed is not a luxury; it is your primary conversion factor. We optimize Core Web Vitals, implement rich JSON-LD schema, and configure global edge caching.',
    deliverables: ['95+ Core Web Vitals score', 'JSON-LD structured schema', 'OpenGraph social preview cards', 'Automated sitemaps & robots.txt'],
    metric: 'Top 5% Lighthouse Rank',
  },
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services" style={{ padding: '100px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Zap size={14} color="var(--primary)" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineering Craft for Ambitious Brands
          </h2>
          <p className="section-subtitle">
            Every service is tailored to deliver measurable business outcomes. We do not write throwaway code or deliver static templates; we build digital assets that compound in value.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {serviceList.map((service) => {
            const Icon = service.icon;
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="glass-card"
                style={{
                  padding: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: isHovered ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
                  borderColor: isHovered ? 'var(--primary)' : 'var(--border-subtle)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top Bar with Icon & Category */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: isHovered ? 'var(--gradient-accent)' : 'rgba(37, 99, 235, 0.12)',
                        border: '1px solid rgba(37, 99, 235, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isHovered ? '#FFFFFF' : 'var(--primary)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--accent)',
                        background: 'rgba(132, 204, 22, 0.1)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(132, 204, 22, 0.2)',
                      }}
                    >
                      {service.metric}
                    </span>
                  </div>

                  <h3
                    className="font-display"
                    style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}
                  >
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>
                    {service.headline}
                  </p>

                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                    {service.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--text-muted)',
                      marginBottom: '12px',
                    }}
                  >
                    Tangible Deliverables
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} color="var(--primary)" style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: isHovered ? 'var(--accent)' : 'var(--primary)',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                  >
                    <span>Request {service.title} proposal</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout Bar */}
        <div
          className="glass-card"
          style={{
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(124, 58, 237, 0.08) 100%)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
          }}
        >
          <div>
            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
              Have a multi-disciplinary project scope?
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
              We assemble customized sprint roadmaps combining design, 3D, and full-stack development into one unified timeline.
            </p>
          </div>

          <a href="#contact" className="btn-glow" style={{ padding: '14px 28px' }}>
            <span>Book a Discovery Consultation</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
