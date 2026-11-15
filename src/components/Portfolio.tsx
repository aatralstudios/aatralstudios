'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

export default function Portfolio() {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Device width constraints for the interactive simulator
  const deviceWidthMap = {
    desktop: '100%',
    tablet: '768px',
    mobile: '390px',
  };

  const project = {
    id: 'rara-cafe',
    title: 'RaRa Cafe',
    client: 'RaRa Cafe',
    location: 'Karappakkam, Rajiv Gandhi Salai (OMR), Chennai',
    category: 'Artisanal Cafe, Coffee & Quick Bites Experience',
    url: 'https://aatralstudios.github.io/rara_cafe/',
    displayUrl: 'aatralstudios.github.io/rara_cafe',
    tags: ['React 19', 'Tailwind CSS', 'Mobile-First Architecture', 'WhatsApp API', 'Google Maps Routing', 'SEO Schema'],
    metrics: '0.3s First Paint • 100% Mobile Responsive',
    lighthouse: { perf: 99, seo: 100, speed: '0.3s' },
    description:
      'A sensory, warm web experience designed for an artisanal cafe in Chennai. Engineered with mobile-first menu exploration, 1-tap WhatsApp table inquiries, direct GPS location routing, and vintage-modern typography.',
    highlights: [
      'Interactive Mobile Menu with Dietary Categorization',
      '1-Tap Direct WhatsApp Ordering & Inquiries',
      'Real-Time Google Maps Navigation & Operating Hours',
      'Sub-Second Asset Loading & Local SEO Structured Data',
    ],
  };

  return (
    <section
      id="portfolio"
      className="portfolio-section"
      style={{
        padding: '90px 0 100px 0',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ maxWidth: '1120px' }}>
        {/* Section Header */}
        <div className="portfolio-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 42px auto' }}>
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
            <span>Featured Client Work</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              marginBottom: '12px',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
            }}
          >
            Real Digital Experiences. <br />
            <span className="gradient-accent">Live and Proven.</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '14.5px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Explore live digital products designed and engineered by Aatral Studios. Test the interactive responsive viewport simulator below or launch the live production site directly.
          </p>
        </div>

        {/* Mobile-Only Direct Showcase Card (Replaces the broken iframe & device switcher on mobile) */}
        <div className="portfolio-mobile-preview" style={{ width: '100%', marginBottom: '20px' }}>
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Mobile Browser Address Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: '#FAF8F5',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0, flex: 1 }}>
                <Shield size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.displayUrl}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  background: 'var(--primary-soft)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
              >
                <Zap size={11} />
                <span>99/100</span>
              </div>
            </div>

            {/* Mobile Visual Showcase Banner */}
            <div
              style={{
                padding: '24px 18px',
                background: 'linear-gradient(135deg, rgba(45, 90, 67, 0.06) 0%, rgba(184, 83, 36, 0.08) 100%)',
                textAlign: 'center',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  marginBottom: '10px',
                }}
              >
                <UtensilsCrossed size={12} />
                <span>Live Client Deployment</span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                }}
              >
                {project.title}
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 auto 16px auto', maxWidth: '320px' }}>
                {project.description}
              </p>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                }}
              >
                <span>Open Live RaRa Cafe Website</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Device Viewport & Browser Shell */}
        <div
          className="portfolio-desktop-viewport"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '32px',
            width: '100%',
          }}
        >
          {/* Device Switcher Toolbar */}
          <div
            className="portfolio-device-switcher"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '18px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <button
              onClick={() => setDeviceMode('desktop')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: deviceMode === 'desktop' ? 'var(--primary)' : 'transparent',
                color: deviceMode === 'desktop' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: deviceMode === 'desktop' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <Monitor size={14} />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setDeviceMode('tablet')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: deviceMode === 'tablet' ? 'var(--primary)' : 'transparent',
                color: deviceMode === 'tablet' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: deviceMode === 'tablet' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <Tablet size={14} />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => setDeviceMode('mobile')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: deviceMode === 'mobile' ? 'var(--primary)' : 'transparent',
                color: deviceMode === 'mobile' ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: deviceMode === 'mobile' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              <Smartphone size={14} />
              <span>Mobile (390px)</span>
            </button>
          </div>

          {/* Browser Container Frame with Smooth Width Transition */}
          <div
            className="portfolio-iframe-wrapper"
            style={{
              width: '100%',
              maxWidth: deviceWidthMap[deviceMode],
              transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px -15px rgba(24, 35, 30, 0.12), 0 1px 3px rgba(0, 0, 0, 0.04)',
            }}
          >
            {/* Browser Top Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 16px',
                background: '#FAF8F5',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '12px',
              }}
            >
              {/* Window Controls */}
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E06C75' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#E5C07B' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#98C379' }} />
              </div>

              {/* URL Pill Bar */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open live site in new tab"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  maxWidth: '420px',
                  width: '100%',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'border-color 0.18s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
              >
                <Shield size={12} color="var(--primary)" />
                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{project.displayUrl}</span>
                <ExternalLink size={11} color="var(--text-muted)" />
              </a>

              {/* Performance Indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  background: 'var(--primary-soft)',
                  padding: '3px 9px',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
              >
                <Zap size={12} />
                <span>{project.lighthouse.perf}/100 Speed</span>
              </div>
            </div>

            {/* Live Interactive Iframe / Embedded Preview Surface */}
            <div
              style={{
                position: 'relative',
                height: deviceMode === 'mobile' ? '580px' : '520px',
                width: '100%',
                background: '#FAF8F5',
                overflow: 'hidden',
              }}
            >
              <iframe
                src={project.url}
                title="RaRa Cafe Live Client Preview"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>
          </div>
        </div>

        {/* Detailed Project Metrics Card Beneath */}
        <div
          className="glass-card portfolio-detail-grid"
          style={{
            padding: '28px 32px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
            gap: '28px',
            alignItems: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11.5px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 700,
                letterSpacing: '0.6px',
                marginBottom: '6px',
              }}
            >
              <UtensilsCrossed size={13} />
              <span>Live Client Deployment</span>
              <span>•</span>
              <MapPin size={12} />
              <span>{project.location}</span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: 'clamp(20px, 2vw, 24px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '10px',
                lineHeight: 1.25,
              }}
            >
              {project.title} — Digital Experience & Location Hub
            </h3>

            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {project.description}
            </p>

            {/* Highlights List */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '8px 16px',
                marginBottom: '18px',
              }}
            >
              {project.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '7px',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                  }}
                >
                  <CheckCircle2 size={13} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {project.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '4px 9px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '6px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '22px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  marginBottom: '10px',
                }}
              >
                Production Verification
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Google Lighthouse:</span>
                <strong style={{ color: 'var(--primary)' }}>{project.lighthouse.perf}/100 Performance</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>First Contentful Paint:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{project.lighthouse.speed}</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  padding: '7px 0',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Technical SEO:</span>
                <strong style={{ color: 'var(--accent)' }}>{project.lighthouse.seo}/100</strong>
              </div>
            </div>

            {/* Launch Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  width: '100%',
                  padding: '11px',
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  textDecoration: 'none',
                }}
              >
                <span>Visit Live Website</span>
                <ExternalLink size={14} />
              </a>

              <a
                href="#contact"
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '12.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none',
                }}
              >
                <span>Request a Similar Build</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-mobile-preview {
          display: none;
        }
        @media (max-width: 900px) {
          .portfolio-detail-grid {
            grid-template-columns: 1fr !important;
            padding: 22px 18px !important;
          }
        }
        @media (max-width: 768px) {
          .portfolio-section {
            padding: 48px 0 !important;
          }
          .portfolio-header {
            margin-bottom: 22px !important;
          }
          .portfolio-desktop-viewport {
            display: none !important;
          }
          .portfolio-device-switcher {
            display: none !important;
          }
          .portfolio-iframe-wrapper {
            display: none !important;
          }
          .portfolio-mobile-preview {
            display: block !important;
          }
          .portfolio-detail-grid {
            grid-template-columns: 1fr !important;
            padding: 18px 16px !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
