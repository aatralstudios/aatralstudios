'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Zap,
  CheckCircle,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  url: string;
  tags: string[];
  metrics: string;
  lighthouse: { perf: number; seo: number; speed: string };
  description: string;
  previewGradient: string;
  previewHeroText: string;
  previewSubText: string;
  previewCtas: string[];
  stats: Array<{ label: string; value: string }>;
}

const projects: Project[] = [
  {
    id: 'veloce',
    title: 'Veloce Luxury Automotives',
    client: 'Veloce Motors International',
    category: 'Brand Experience & Interactive 3D Showroom',
    url: 'https://veloce.aatralstudios.com',
    tags: ['Next.js 15', 'Three.js / WebGL', 'Edge CDN', 'Lead Funnel'],
    metrics: '+210% Inbound Test-Drive Bookings',
    lighthouse: { perf: 99, seo: 100, speed: '0.4s' },
    description:
      'An immersive luxury showroom engineered with real-time 3D vehicle customizers, dynamic audio synthesis, and automated high-ticket quotation intake.',
    previewGradient: 'linear-gradient(135deg, #090d16 0%, #171d2c 50%, #1e1b4b 100%)',
    previewHeroText: 'Pure Automotive Sensation.',
    previewSubText: 'Experience the electric GT-90 with carbon-chassis telemetry and zero emission thrust.',
    previewCtas: ['Configure Build', 'Book Track Experience'],
    stats: [
      { label: 'Booking Conversion', value: '+210%' },
      { label: 'Asset Load Time', value: '420ms' },
      { label: 'Lighthouse Score', value: '99/100' },
    ],
  },
  {
    id: 'kalyan',
    title: 'Kalyan Silk Emporium',
    client: 'Kalyan Heritage Textiles',
    category: 'High-Capacity Headless E-Commerce Store',
    url: 'https://kalyan.aatralstudios.com',
    tags: ['Shopify Headless', 'Razorpay & Stripe', 'PWA Offline', 'WhatsApp Order Sync'],
    metrics: '4.8x Sales Surge in 60 Days',
    lighthouse: { perf: 98, seo: 100, speed: '0.5s' },
    description:
      'Omnichannel apparel marketplace with instant 1-tap checkout, dynamic multi-currency converter, real-time inventory synchronizer, and automated WhatsApp delivery tracking.',
    previewGradient: 'linear-gradient(135deg, #062820 0%, #064e3b 50%, #022c22 100%)',
    previewHeroText: 'Handwoven Royal Heritage.',
    previewSubText: 'Pure Kanchipuram silk sarees woven with certified gold zari and heritage loom craft.',
    previewCtas: ['Explore Festive Drop', 'View Live Catalog'],
    stats: [
      { label: 'Checkout Abandonment', value: '-38%' },
      { label: 'Mobile Revenue', value: '72%' },
      { label: 'Orders Processed', value: '45,000+' },
    ],
  },
  {
    id: 'aura',
    title: 'Aura Cloud Telemetry SaaS',
    client: 'Aura Systems Inc.',
    category: 'Real-Time SaaS Application & Team Console',
    url: 'https://aura.aatralstudios.com',
    tags: ['React 19', 'TypeScript', 'Node Microservices', 'Role-Based RBAC'],
    metrics: '99.99% Uptime with Sub-Second Latency',
    lighthouse: { perf: 100, seo: 98, speed: '0.3s' },
    description:
      'Enterprise telemetry platform analyzing 10M+ daily events. Includes dynamic multi-tenant org management, live webhook debuggers, and Stripe billing meters.',
    previewGradient: 'linear-gradient(135deg, #082f49 0%, #0369a1 50%, #0f172a 100%)',
    previewHeroText: 'Zero-Latency Cloud Telemetry.',
    previewSubText: 'Monitor microservices, detect anomaly spikes, and automate incident dispatch in real time.',
    previewCtas: ['Open Live Sandbox', 'Read API Docs'],
    stats: [
      { label: 'Query Throughput', value: '1.2M req/s' },
      { label: 'P99 Latency', value: '18ms' },
      { label: 'Enterprise SLA', value: '99.99%' },
    ],
  },
];

export default function Portfolio() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const project = projects[selectedIdx];

  // Device width constraints for the interactive simulator
  const deviceWidthMap = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <section id="portfolio" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 50px auto' }}>
          <div className="badge-pill" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} color="#4f46e5" />
            <span>Interactive Engineering Lab</span>
          </div>
          <h2
            className="font-display"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '16px', color: '#0f172a' }}
          >
            Creativity in Motion. <br />
            <span className="gradient-accent">Capability in Execution.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>
            Interact with live simulated previews of our client digital systems. Toggle between desktop, tablet,
            and mobile viewports to inspect responsive fluid architecture in real time.
          </p>
        </div>

        {/* Project Selector Chips */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}
        >
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedIdx(idx)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-full)',
                border: selectedIdx === idx ? '1px solid #4f46e5' : '1px solid #e2e8f0',
                background: selectedIdx === idx ? '#eef2ff' : '#ffffff',
                color: selectedIdx === idx ? '#4338ca' : '#475569',
                fontWeight: selectedIdx === idx ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedIdx === idx ? '0 4px 14px rgba(79, 70, 229, 0.15)' : 'none',
              }}
            >
              <span>{p.title}</span>
              {selectedIdx === idx && (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#84cc16',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Interactive Device Viewport & Browser Shell */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Device Switcher Toolbar */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              marginBottom: '16px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
            }}
          >
            <button
              onClick={() => setDeviceMode('desktop')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: deviceMode === 'desktop' ? '#f1f5f9' : 'transparent',
                color: deviceMode === 'desktop' ? '#0f172a' : '#64748b',
                fontWeight: deviceMode === 'desktop' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <Monitor size={15} color={deviceMode === 'desktop' ? '#2563EB' : 'currentColor'} />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: deviceMode === 'tablet' ? '#f1f5f9' : 'transparent',
                color: deviceMode === 'tablet' ? '#0f172a' : '#64748b',
                fontWeight: deviceMode === 'tablet' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <Tablet size={15} color={deviceMode === 'tablet' ? '#2563EB' : 'currentColor'} />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: deviceMode === 'mobile' ? '#f1f5f9' : 'transparent',
                color: deviceMode === 'mobile' ? '#0f172a' : '#64748b',
                fontWeight: deviceMode === 'mobile' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <Smartphone size={15} color={deviceMode === 'mobile' ? '#2563EB' : 'currentColor'} />
              <span>Mobile (375px)</span>
            </button>
          </div>

          {/* Browser Container Frame with Smooth Width Transition */}
          <div
            style={{
              width: '100%',
              maxWidth: deviceWidthMap[deviceMode],
              transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.12), 0 0 25px rgba(79, 70, 229, 0.08)',
            }}
          >
            {/* Browser Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              {/* Window Controls */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
              </div>

              {/* URL Pill Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '4px 14px',
                  fontSize: '12px',
                  color: '#475569',
                  maxWidth: '380px',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Shield size={12} color="#059669" />
                <span style={{ fontFamily: 'monospace' }}>{project.url}</span>
              </div>

              {/* Performance Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '3px 8px',
                  borderRadius: '6px',
                }}
              >
                <Zap size={12} />
                <span>{project.lighthouse.perf}/100</span>
              </div>
            </div>

            {/* Simulated Live Interface Surface */}
            <div
              style={{
                height: '420px',
                background: project.previewGradient,
                padding: 'clamp(20px, 4vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                color: '#ffffff',
                overflow: 'hidden',
              }}
            >
              {/* Watermark / Category Pill */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    padding: '4px 12px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    color: '#ffffff',
                  }}
                >
                  {project.category}
                </span>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircle size={14} />
                  <span>{project.metrics}</span>
                </span>
              </div>

              {/* Hero Callout inside the preview */}
              <div style={{ maxWidth: '480px' }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: deviceMode === 'mobile' ? '22px' : '32px',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    marginBottom: '12px',
                    color: '#ffffff',
                  }}
                >
                  {project.previewHeroText}
                </h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project.previewSubText}
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {project.previewCtas.map((cta, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '8px 16px',
                        background: i === 0 ? '#2563EB' : 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#ffffff',
                        border: i === 0 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {cta}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Telemetry Strip */}
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                  flexWrap: 'wrap',
                }}
              >
                {project.stats.map((s, idx) => (
                  <div key={idx}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {s.label}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Project Metrics Card Beneath */}
        <div
          className="glass-card portfolio-detail-grid"
          style={{
            padding: '32px',
            background: '#ffffff',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
            gap: '28px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '6px' }}>
              Client: {project.client}
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
              {project.description}
            </p>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 10px',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    color: '#334155',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '24px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                Engineering Benchmark
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Google Lighthouse:</span>
                <strong style={{ color: '#059669' }}>{project.lighthouse.perf}/100 Performance</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>First Contentful Paint:</span>
                <strong style={{ color: '#0f172a' }}>{project.lighthouse.speed}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0' }}>
                <span style={{ color: '#64748b' }}>Technical SEO:</span>
                <strong style={{ color: '#2563EB' }}>{project.lighthouse.seo}/100</strong>
              </div>
            </div>

            <a
              href="#enquiry-section"
              className="btn-glow"
              style={{ width: '100%', padding: '12px', fontSize: '13px', textAlign: 'center' }}
            >
              <span>Request a Similar Build</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
