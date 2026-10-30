'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Award, CheckCircle, Globe2, Sparkles, Star, Users, Zap } from 'lucide-react';

interface MetricItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sub: string;
}

const metrics: MetricItem[] = [
  { id: 'projects', target: 48, suffix: '+', label: 'Projects Delivered', sub: 'E-Commerce, corporate websites & brand platforms' },
  { id: 'clients', target: 99, suffix: '%', label: 'Client Satisfaction', sub: 'Clear milestone sign-offs with zero hidden costs' },
  { id: 'years', target: 4, suffix: '+', label: 'Years of Craft', sub: 'Dedicated design & development experience' },
  { id: 'countries', target: 6, suffix: '+', label: 'Countries Served', sub: 'Clients in India, Singapore, UAE, UK, US & Australia' },
];

const clientLogos = [
  { name: 'Veloce Automotive', tag: 'Luxury Mobility' },
  { name: 'Kalyan Heritage', tag: 'Retail & Fashion' },
  { name: 'Aura Cloud SaaS', tag: 'B2B Software' },
  { name: 'PulseFit Pro', tag: 'Health & Wellness' },
  { name: 'ArtisanRoast', tag: 'Direct-to-Consumer' },
  { name: 'Zenith Logistics', tag: 'Enterprise Supply Chain' },
  { name: 'HyperScale AI', tag: 'Artificial Intelligence' },
  { name: 'Novus FinTech', tag: 'Banking & Payments' },
];

export default function ProofStrip() {
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    projects: 0,
    clients: 0,
    years: 0,
    countries: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          metrics.forEach((m) => {
            let start = 0;
            const end = m.target;
            const duration = 1600;
            const stepTime = Math.max(16, duration / end);

            const timer = setInterval(() => {
              start += Math.ceil(end / 40);
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setCounts((prev) => ({ ...prev, [m.id]: start }));
            }, stepTime);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '50px 0 60px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ marginBottom: '40px' }}>
        {/* Animated Counter Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.id}
              className="glass-card"
              style={{
                padding: '28px 24px',
                textAlign: 'left',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                className="font-display"
                style={{
                  fontSize: 'clamp(2.4rem, 3.8vw, 3.2rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                }}
              >
                <span className="gradient-accent">{counts[m.id]}</span>
                <span style={{ color: 'var(--primary)', fontSize: '0.7em' }}>{m.suffix}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {m.label}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '11.5px',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            fontWeight: 700,
            color: 'var(--text-muted)',
          }}
        >
          Trusted by Ambitious Founders &amp; Growing Businesses
        </span>
      </div>

      {/* Client Logos Marquee */}
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
        <div className="animate-marquee">
          {[...clientLogos, ...clientLogos].map((c, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                margin: '0 10px',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 2px 8px rgba(24, 35, 30, 0.04)',
              }}
            >
              <Star size={14} color="var(--accent)" fill="var(--accent)" />
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {c.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'var(--bg-secondary)', padding: '2px 8px', borderRadius: '4px' }}>
                {c.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

