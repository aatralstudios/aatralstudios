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
        <div style={{ maxWidth: '540px', textAlign: 'left' }}>
          {/* High-Impact Headline */}
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 2.9rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
              color: 'var(--text-primary)',
              marginBottom: '14px',
              textAlign: 'left',
              wordBreak: 'break-word',
            }}
          >
            Where creativity <br className="desktop-only" />
            <span className="gradient-accent" style={{ display: 'inline-block' }}>
              meets code.
            </span>{' '}
            <br className="desktop-only" />
            Where businesses <br className="desktop-only" />
            meet possibilities.
          </h1>

          {/* Short, Punchy, Professional Subheading */}
          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.15vw, 1.05rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              maxWidth: '480px',
              marginBottom: '20px',
              fontWeight: 400,
              textAlign: 'left',
            }}
          >
            Bespoke web design and development engineered to elevate your brand and turn visitors into clients.
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
        onClick={() => handleScrollTo('industries')}
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
        <span>Scroll to explore industries</span>
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
