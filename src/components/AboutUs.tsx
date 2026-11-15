'use client';

import React from 'react';
import {
  Users,
  MapPin,
  GraduationCap,
  Code2,
  Palette,
  CheckCircle2,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  education: string;
  city: string;
  photo: string;
  bio: string;
  expertise: string[];
  responsibilities: string[];
  icon: React.ElementType;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Vasanthabalan B',
    role: 'Co-Founder & Lead Full-Stack Engineer',
    education: 'B.E. Computer Science & Engineering (CSE)',
    city: 'Chennai',
    photo: '/images/team/vasanthabalan.jpg',
    bio: 'Systems engineer focused on high-performance web architecture, sub-second asset delivery, and interactive 3D WebGL experiences.',
    expertise: [
      'Next.js 15 & React 19 Architecture',
      'Performance & Google Lighthouse (95+)',
      'Interactive 3D / WebGL & Motion Design',
      'API Design, Cloud Deployment & Security',
    ],
    responsibilities: [
      'Architects end-to-end technical systems and data flows',
      'Optimizes load speed, SEO structure, and hosting infrastructure',
      'Builds interactive client features and custom integrations',
      'Oversees technical feasibility, code quality, and launch readiness',
    ],
    icon: Code2,
  },
  {
    name: 'Sudharshini NS',
    role: 'Co-Founder & Frontend / UI/UX Developer',
    education: 'B.E. Computer Science & Engineering (CSE)',
    city: 'Chengalpattu',
    photo: '/images/team/sudharshini.jpg',
    bio: 'Product developer dedicated to mobile-first interfaces, intuitive user flows, and turning complex business services into clear client experiences.',
    expertise: [
      'Modern Frontend (React.js & Tailwind CSS)',
      'Mobile-First Responsive Interface Craft',
      'User Flow Psychology & Conversion Funnels',
      'Cross-Device Visual Testing & Accessibility',
    ],
    responsibilities: [
      'Designs conversion-driven desktop and mobile layouts',
      'Develops clean, responsive frontend components with zero clutter',
      'Translates client business offerings into clear visual hierarchies',
      'Conducts milestone design walk-throughs and customer flow reviews',
    ],
    icon: Palette,
  },
];

export default function AboutUs() {
  return (
    <section
      id="about"
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
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
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
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="about-mission-card"
        >
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--accent-soft)',
              border: '1px solid rgba(217, 119, 70, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
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
                fontSize: '14px',
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

        {/* Team Grid (2 Focused Cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
            marginBottom: '36px',
          }}
          className="about-team-grid"
        >
          {teamMembers.map((member, idx) => {
            const MemberIcon = member.icon;
            return (
              <div
                key={idx}
                className="glass-card about-member-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '18px',
                  boxShadow: 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                {/* Member Header with Portrait */}
                <div style={{ padding: '24px 24px 18px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }} className="member-hero-row">
                    {/* Portrait Photo */}
                    <div
                      style={{
                        width: '92px',
                        height: '92px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '2px solid var(--border-subtle)',
                        background: 'var(--bg-secondary)',
                        boxShadow: '0 4px 12px rgba(24, 35, 30, 0.08)',
                      }}
                    >
                      <img
                        src={member.photo}
                        alt={`${member.name} - ${member.role}`}
                        width={184}
                        height={184}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 20%',
                          display: 'block',
                        }}
                        loading="lazy"
                      />
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
                          padding: '3px 9px',
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
                          fontSize: '20px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '4px',
                          lineHeight: 1.25,
                        }}
                      >
                        {member.name}
                      </h3>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          flexWrap: 'wrap',
                          fontSize: '12px',
                          color: 'var(--text-secondary)',
                          fontWeight: 500,
                        }}
                      >
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <GraduationCap size={13} color="var(--primary)" />
                          <span>{member.education}</span>
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} color="var(--accent)" />
                          <span>{member.city}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginTop: '16px',
                      marginBottom: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {/* Technical Expertise & Responsibilities Columns */}
                <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Technical Expertise */}
                  <div>
                    <h4
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        margin: 0,
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Zap size={12} color="var(--accent)" />
                      <span>Technical Expertise</span>
                    </h4>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {member.expertise.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Roles & Responsibilities */}
                  <div>
                    <h4
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        margin: 0,
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <ShieldCheck size={12} color="var(--primary)" />
                      <span>Roles &amp; Responsibilities</span>
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {member.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '7px',
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.45,
                          }}
                        >
                          <CheckCircle2
                            size={13}
                            color="var(--primary)"
                            style={{ flexShrink: 0, marginTop: '2px' }}
                          />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Team Connect Bar */}
        <div
          style={{
            padding: '20px 28px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
          className="about-connect-bar"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Ready to collaborate directly with our engineers? We personally review every project inquiry.
            </div>
          </div>

          <a
            href="#contact"
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
            <span>Start Your Project With Us</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .about-member-card:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
          box-shadow: 0 12px 28px -10px rgba(45, 90, 67, 0.12);
        }
        @media (max-width: 768px) {
          .about-mission-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 18px 20px !important;
          }
          .about-team-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .about-connect-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .about-connect-bar a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .member-hero-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
