'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  ArrowRight,
  Sparkles,
  MapPin,
  GraduationCap,
  Code2,
  Palette,
} from 'lucide-react';

const founders = [
  {
    name: 'Vasanthabalan B',
    role: 'Co-Founder & Lead Full-Stack Engineer',
    education: 'B.E. Computer Science & Engineering (CSE)',
    city: 'Chennai',
    photo: '/images/team/vasanthabalan.jpg',
    photoWebp: '/images/team/vasanthabalan.webp',
    bio: 'Systems engineer focused on high-performance web architecture, sub-second asset delivery, and interactive 3D WebGL experiences.',
    icon: Code2,
  },
  {
    name: 'Sudharshini NS',
    role: 'Co-Founder & Frontend / UI/UX Developer',
    education: 'B.E. Computer Science & Engineering (CSE)',
    city: 'Chengalpattu',
    photo: '/images/team/sudharshini.jpg',
    photoWebp: '/images/team/sudharshini.webp',
    bio: 'Product developer dedicated to mobile-first interfaces, intuitive user flows, and turning complex business services into clear client experiences.',
    icon: Palette,
  },
];

export default function AboutPreview() {
  return (
    <section
      id="about"
      style={{
        padding: '90px 0',
        position: 'relative',
        zIndex: 2,
        background: '#FFFFFF',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container" style={{ maxWidth: '1120px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
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
            <Users size={13} color="var(--primary)" />
            <span>Meet The Team Behind Aatral</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.4vw, 2.85rem)',
              fontWeight: 800,
              marginBottom: '14px',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-0.8px',
            }}
          >
            A Small Team. <br />
            <span className="gradient-accent">Big Digital Ambitions.</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '14.5px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We are an agile engineering duo founded by computer science engineers from Chennai and Chengalpattu. We build websites directly with you—combining deep technical skill with personal commitment.
          </p>
        </div>

        {/* Our Mission Banner */}
        <div
          style={{
            padding: '24px 30px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
          className="about-preview-mission-card"
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--primary-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            <Target size={22} />
          </div>

          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '11.5px',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                margin: 0,
                marginBottom: '4px',
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                fontSize: '13.5px',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500,
              }}
            >
              To replace anonymous, cookie-cutter website builders with transparent, high-performance web craftsmanship. We believe every business deserves a digital presence engineered specifically for its customers, delivered on time, at fair and accessible pricing.
            </p>
          </div>
        </div>

        {/* 2 Founders Preview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          {founders.map((member, idx) => {
            const MemberIcon = member.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '18px',
                  boxShadow: 'var(--shadow-sm)',
                  padding: '24px',
                  display: 'flex',
                  gap: '18px',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Official Passport Frame */}
                <div
                  style={{
                    width: '94px',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(24, 35, 30, 0.16)',
                    background: '#FFFFFF',
                    padding: '3px',
                    boxShadow: '0 4px 14px rgba(24, 35, 30, 0.08)',
                  }}
                >
                  <picture>
                    <source srcSet={member.photoWebp} type="image/webp" />
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role} at Aatral Studios`}
                      width={188}
                      height={240}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        borderRadius: '6px',
                        display: 'block',
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: 'var(--primary)',
                      background: 'var(--primary-soft)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      marginBottom: '6px',
                    }}
                  >
                    <MemberIcon size={12} />
                    <span>{member.role}</span>
                  </div>

                  <h3
                    className="font-display"
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      marginBottom: '3px',
                    }}
                  >
                    <GraduationCap size={13} color="var(--primary)" />
                    <span>{member.education}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    <MapPin size={13} color="var(--accent)" />
                    <span>{member.city}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full About Us Page CTA Bar */}
        <div
          style={{
            padding: '20px 28px',
            background: 'var(--primary-soft)',
            border: '1px solid rgba(45, 90, 67, 0.18)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
          className="about-preview-cta-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
              Learn more about our technical stack, responsibilities, and how we collaborate directly.
            </div>
          </div>

          <Link
            href="/about"
            className="btn-glow"
            style={{
              padding: '10px 22px',
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span>Read Our Full Story &amp; Technical Roles</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-preview-mission-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .about-preview-cta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .about-preview-cta-bar a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
