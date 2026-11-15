'use client';

import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const navOffset = 70;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(92px, 11vh, 110px) 0 35px 0',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Warm Ambient Glows in Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '8%',
          width: '540px',
          height: '540px',
          background: 'radial-gradient(circle, rgba(217, 119, 70, 0.08) 0%, rgba(217, 119, 70, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(45, 90, 67, 0.07) 0%, rgba(45, 90, 67, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Content - Placed strictly on the Left with clear breathing room from the 3D model */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          paddingLeft: 'clamp(16px, 5.5vw, 80px)',
          paddingRight: 'clamp(16px, 5.5vw, 80px)',
        }}
      >
        <div style={{ maxWidth: '580px', textAlign: 'left' }}>
          {/* High-Impact Direct Headline */}
          <h1
            className="font-display hero-title"
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              textAlign: 'left',
              wordBreak: 'break-word',
            }}
          >
            We Build Websites That{' '}
            <span className="gradient-accent" style={{ display: 'inline-block' }}>
              Help Businesses Grow.
            </span>
          </h1>

          {/* Direct, Value-Focused Subheading */}
          <p
            className="hero-tagline"
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              marginBottom: '22px',
              fontWeight: 400,
              textAlign: 'left',
            }}
          >
            We design and develop modern, high-performing websites that help businesses establish their digital presence and connect with more customers.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '22px',
              justifyContent: 'flex-start',
            }}
            className="hero-cta-group"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('contact');
              }}
              className="btn-glow"
              style={{ padding: '11px 22px', fontSize: '13.5px' }}
            >
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </a>

            <a
              href="#industries"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('industries');
              }}
              className="btn-secondary"
              style={{ padding: '11px 20px', fontSize: '13.5px' }}
            >
              <span>Explore Industries ↓</span>
            </a>
          </div>

          {/* Real Studio Principles - Honest & Transparent */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              justifyContent: 'flex-start',
            }}
            className="hero-principles"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--primary)" />
              <span>100% Bespoke Original Design</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} color="var(--accent)" />
              <span>Mobile &amp; Desktop Optimized</span>
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--primary)" />
              <span>Direct Communication &amp; On-Time Delivery</span>
            </span>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Indicator */}
      <div
        onClick={() => handleScrollTo('process')}
        style={{
          position: 'absolute',
          bottom: '12px',
          left: 'clamp(16px, 5.5vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          fontSize: '11.5px',
          fontWeight: 600,
          zIndex: 3,
        }}
        className="desktop-only"
      >
        <span>Scroll to explore roadmap</span>
        <ChevronDown size={14} style={{ animation: 'bounceSlow 2s infinite' }} />
      </div>

      <style jsx>{`
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        @media (max-width: 768px) {
          .desktop-only {
            display: none !important;
          }
          .hero-title {
            font-size: clamp(1.95rem, 5.5vw, 2.35rem) !important;
            line-height: 1.18 !important;
          }
          .hero-tagline {
            font-size: clamp(1rem, 2.8vw, 1.08rem) !important;
            line-height: 1.58 !important;
          }
        }
        @media (max-width: 600px) {
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .hero-cta-group a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .hero-principles {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
