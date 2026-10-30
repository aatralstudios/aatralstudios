'use client';

import React, { useState } from 'react';
import { Layers, Terminal, Database, Cloud, CheckCircle, RotateCcw, Cpu } from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tooling';
  role: string;
  architectureFit: string;
  whyChosen: string;
  badge: string;
}

const technologies: TechItem[] = [
  // Frontend
  {
    id: 'nextjs',
    name: 'Next.js 15 & React 19',
    category: 'frontend',
    role: 'Core Frontend & Edge Rendering Framework',
    architectureFit: 'Server Components, Hybrid Static/Dynamic Routing, and API boundaries',
    whyChosen: 'Sub-second initial paint, flawless SEO indexing, and enterprise scalability.',
    badge: 'Primary Stack',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    role: 'Type-Safe System Engineering',
    architectureFit: 'End-to-end type contracts between UI components and backend handlers',
    whyChosen: 'Eliminates runtime crashes, guarantees code maintainability, and prevents bugs.',
    badge: 'Standard',
  },
  {
    id: 'threejs',
    name: 'Three.js / WebGL',
    category: 'frontend',
    role: 'Interactive 3D Visuals & Shaders',
    architectureFit: 'Procedural 3D hero workstations, dynamic canvasing, and GPU shaders',
    whyChosen: 'Creates unforgettable digital experiences that set brands miles ahead of competitors.',
    badge: 'Creative Tech',
  },
  {
    id: 'css',
    name: 'Vanilla CSS & Design Tokens',
    category: 'frontend',
    role: 'Hardware-Accelerated Fluid Styling',
    architectureFit: 'CSS Custom Properties, Glassmorphism, and 60fps transform layers',
    whyChosen: 'Zero framework lock-in, zero CSS payload bloat, and total design freedom.',
    badge: 'Performance',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js & Edge Runtime',
    category: 'backend',
    role: 'Serverless APIs & Lead Engines',
    architectureFit: 'Low-latency API route handlers, form dispatch, and webhook processors',
    whyChosen: 'Rapid execution, global CDN distribution, and instant response times.',
    badge: 'Engine',
  },
  {
    id: 'resend',
    name: 'Resend & Nodemailer',
    category: 'backend',
    role: 'Transactional Client & Agency Mailers',
    architectureFit: 'Secure server-side email dispatch with DKIM/SPF verification',
    whyChosen: 'Guaranteed inbox delivery to aatralstudios@gmail.com with zero spam bounce.',
    badge: 'Email Engine',
  },

  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL & Supabase',
    category: 'database',
    role: 'Relational Data & Lead Storage',
    architectureFit: 'Row-level security (RLS), schema migrations, and encrypted backups',
    whyChosen: 'ACID compliance, rock-solid stability, and zero data loss guarantee.',
    badge: 'Storage',
  },
  {
    id: 'redis',
    name: 'Upstash Redis',
    category: 'database',
    role: 'Rate Limiting & Session Cache',
    architectureFit: 'Sliding-window IP rate limiter on /api/enquiry endpoints',
    whyChosen: 'Protects the studio against DDoS attacks, automated bots, and abuse.',
    badge: 'Security',
  },

  // Tooling
  {
    id: 'vercel',
    name: 'Vercel Edge Platform',
    category: 'tooling',
    role: 'Global Edge CDN & Automated Deployments',
    architectureFit: 'Automatic preview branches, instant rollbacks, and SSL automation',
    whyChosen: 'Zero-maintenance serverless infrastructure with 99.99% uptime.',
    badge: 'Cloud Host',
  },
  {
    id: 'git',
    name: 'Git & GitHub Actions',
    category: 'tooling',
    role: 'Version Control & Automated CI/CD',
    architectureFit: 'Pull request automated linting, type verification, and production builds',
    whyChosen: 'Complete transparency and continuous integration on every release.',
    badge: 'DevOps',
  },
];

export default function TechnologyStack() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'database' | 'tooling'>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem>(technologies[0]);

  const filteredTech =
    activeCategory === 'all'
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="tech-stack" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Engineering Foundation</span>
          <h2 className="section-title">
            The Modern Creative Technology Stack
          </h2>
          <p className="section-subtitle">
            We use modern, battle-tested tools to deliver hyper-fast, secure, and maintainable digital experiences.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend & 3D' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'database', label: 'Data & Security' },
            { id: 'tooling', label: 'Cloud & DevOps' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: activeCategory === cat.id ? '#2563EB' : '#CBD5E1',
                background: activeCategory === cat.id ? '#EFF6FF' : '#FFFFFF',
                color: activeCategory === cat.id ? '#2563EB' : '#475569',
                fontSize: '13px',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: activeCategory === cat.id ? '0 2px 8px rgba(37, 99, 235, 0.15)' : 'var(--shadow-sm)',
              }}
            >
              {cat.label}
            </button>
          ))}

          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: 'transparent',
                color: '#64748B',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Interactive Architecture Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '32px',
            alignItems: 'start',
          }}
          className="brand-manifesto-grid"
        >
          {/* Tech Grid Nodes */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}
          >
            {filteredTech.map((tech) => {
              const isSelected = selectedTech.id === tech.id;
              return (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className="glass-card"
                  style={{
                    padding: '20px',
                    cursor: 'pointer',
                    background: isSelected ? '#EFF6FF' : '#FFFFFF',
                    borderColor: isSelected ? '#2563EB' : '#CBD5E1',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    boxShadow: isSelected ? '0 10px 25px rgba(37, 99, 235, 0.15), 0 0 0 1px #2563EB' : 'var(--shadow-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          color: isSelected ? '#2563EB' : '#64748B',
                        }}
                      >
                        {tech.category}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: isSelected ? '#DBEAFE' : '#F1F5F9',
                          color: isSelected ? '#1E40AF' : '#475569',
                          fontWeight: 600,
                        }}
                      >
                        {tech.badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0B132B', marginBottom: '6px' }}>
                      {tech.name}
                    </h4>

                    <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.5 }}>
                      {tech.role}
                    </p>
                  </div>

                  <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#2563EB', fontWeight: 700 }}>
                    <span>Inspect Specs</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Architecture Inspector Panel */}
          <div
            className="glass-card"
            style={{
              padding: '32px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '16px',
              position: 'sticky',
              top: '100px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} color="#2563EB" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#2563EB',
                    letterSpacing: '0.5px',
                  }}
                >
                  SYSTEM INSPECTOR // {selectedTech.category.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>Active in Core Engine</span>
            </div>

            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B132B', marginBottom: '8px' }}>
              {selectedTech.name}
            </h3>

            <div style={{ fontSize: '13px', color: '#2563EB', fontWeight: 600, marginBottom: '20px' }}>
              {selectedTech.role}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                  Architecture Placement
                </div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                  {selectedTech.architectureFit}
                </div>
              </div>

              <div style={{ padding: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                  Why We Chose This For Clients
                </div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                  {selectedTech.whyChosen}
                </div>
              </div>
            </div>

            <a
              href="#enquiry-section"
              className="btn-glow"
              style={{ width: '100%', padding: '12px', fontSize: '13px', textAlign: 'center' }}
            >
              <span>Build With This Stack</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
