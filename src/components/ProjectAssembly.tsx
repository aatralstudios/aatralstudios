'use client';

import React, { useState } from 'react';
import {
  FileText,
  Layout,
  Palette,
  Code2,
  CheckCircle2,
  Rocket,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface Stage {
  step: string;
  title: string;
  deliverable: string;
  duration: string;
  description: string;
  visualPreview: {
    type: 'brief' | 'wireframe' | 'design' | 'code' | 'qa' | 'launch';
    headline: string;
    subline: string;
    bullets: string[];
  };
}

const stages: Stage[] = [
  {
    step: '01',
    title: 'Discovery & Requirements',
    deliverable: 'Comprehensive Project Scope & Information Architecture',
    duration: 'Sprint Days 1–3',
    description:
      'We dissect your business model, customer psychology, conversion triggers, and competitive landscape. No assumptions; only crystal-clear specifications.',
    visualPreview: {
      type: 'brief',
      headline: 'PROJECT BLUEPRINT: INITIALIZED',
      subline: 'Client Brief & Technical Target Matrix',
      bullets: ['Target Audience Personas', 'Core Conversion Funnels', 'Sitemap & Content Inventory', '12–24h Feasibility Signoff'],
    },
  },
  {
    step: '02',
    title: 'Wireframing & UI/UX Design',
    deliverable: 'Low-Fidelity Interactive Wireframe Prototype',
    duration: 'Sprint Days 4–7',
    description:
      'We structure the narrative flow before touching aesthetics. Every section has a singular conversion goal, guiding the user toward your primary CTA.',
    visualPreview: {
      type: 'wireframe',
      headline: 'LOW-FIDELITY WIREFRAME ARCHITECTURE',
      subline: 'Structural Information Hierarchy',
      bullets: ['User Journey Heatmapping', 'Mobile Breakpoint Blueprints', 'Key Form Interaction Flow', 'Figma Clickable Prototype'],
    },
  },
  {
    step: '03',
    title: 'Visual Design & Prototyping',
    deliverable: 'High-Fidelity Figma Design System & Tokens',
    duration: 'Sprint Days 8–14',
    description:
      'We develop your custom design tokens: typography scales, color contrast hierarchies, elevation cards, and fluid motion choreography.',
    visualPreview: {
      type: 'design',
      headline: 'HIGH-FIDELITY VISUAL DESIGN SYSTEM',
      subline: 'Custom Design Tokens & Bespoke Craft',
      bullets: ['Distinctive Typographic Scale', 'Custom Vector & 3D Assets', 'Component States (Hover/Active)', 'Client Approval Milestone'],
    },
  },
  {
    step: '04',
    title: 'Development & Integration',
    deliverable: 'Clean Modular Next.js & TypeScript Codebase',
    duration: 'Sprint Days 15–24',
    description:
      'We write production-grade code using modular React components, serverless backend APIs, zero-leakage email integration, and sub-second asset loaders.',
    visualPreview: {
      type: 'code',
      headline: 'PRODUCTION ENGINEERING SPRINT',
      subline: 'Next.js 15 • TypeScript • Serverless APIs',
      bullets: ['Modular React Primitives', 'Honeypot Anti-Spam Security', 'Dual Transactional Email Handlers', 'Strict Type Checking'],
    },
  },
  {
    step: '05',
    title: 'Testing & Quality Assurance',
    deliverable: '95+ Lighthouse Score & Cross-Device Audit Report',
    duration: 'Sprint Days 25–27',
    description:
      'Rigorous stress testing across real Android devices, iPhones, iPads, Safari, Chrome, and Firefox. Every form, link, and transition is audited.',
    visualPreview: {
      type: 'qa',
      headline: 'PERFORMANCE & SECURITY AUDIT',
      subline: 'Zero Defect Pre-Flight Certification',
      bullets: ['Lighthouse 99/100 Verified', 'SSL & HTTPS Encryption Check', 'Cross-Device Breakpoint Audit', 'Form Validation & Edge Cases'],
    },
  },
  {
    step: '06',
    title: 'Deployment & Maintenance',
    deliverable: 'Live Production URL, Global CDN, SSL & Handover Guide',
    duration: 'Day 28 & Ongoing',
    description:
      'Live deployment to ultra-fast edge CDN servers, domain mapping, search engine indexing, and 30-day post-launch hypercare.',
    visualPreview: {
      type: 'launch',
      headline: 'DEPLOYED TO PRODUCTION GLOBAL EDGE',
      subline: '100% Availability • Verified Live System',
      bullets: ['Custom Domain & SSL Automated', 'Sitemap Submitted to Google', 'Real-Time Email Intake Active', '30-Day Hypercare Guaranteed'],
    },
  },
];

export default function ProjectAssembly() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = stages[activeStageIdx];

  return (
    <section id="process" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Interactive Workflow</span>
          <h2 className="section-title">
            From Idea to Launch in 6 Precision Sprints
          </h2>
          <p className="section-subtitle">
            A transparent, predictable sequence with tangible client deliverables at every milestone. No guesswork, no ghosting.
          </p>
        </div>

        {/* Sprint Steps Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '40px',
            overflowX: 'auto',
            paddingBottom: '12px',
          }}
        >
          {stages.map((stage, idx) => (
            <button
              key={stage.step}
              onClick={() => setActiveStageIdx(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 18px',
                background: activeStageIdx === idx ? '#EFF6FF' : '#FFFFFF',
                border: '1px solid',
                borderColor: activeStageIdx === idx ? '#2563EB' : '#CBD5E1',
                borderRadius: '12px',
                color: activeStageIdx === idx ? '#2563EB' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                boxShadow: activeStageIdx === idx ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'var(--shadow-sm)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 7px',
                  borderRadius: '6px',
                  background: activeStageIdx === idx ? '#2563EB' : '#F1F5F9',
                  color: activeStageIdx === idx ? '#FFFFFF' : '#64748B',
                }}
              >
                {stage.step}
              </span>
              <span style={{ fontSize: '13px', fontWeight: activeStageIdx === idx ? 700 : 600 }}>
                {stage.title}
              </span>
            </button>
          ))}
        </div>

        {/* Transformation Stage Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.4fr',
            gap: '32px',
            alignItems: 'stretch',
          }}
          className="brand-manifesto-grid"
        >
          {/* Left: Stage Information */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#FFFFFF',
              borderColor: '#CBD5E1',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2563EB',
                  }}
                >
                  STAGE {activeStage.step} // 06
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: '#F7FEE7',
                    border: '1px solid #D9F99D',
                    color: '#16A34A',
                    fontWeight: 700,
                  }}
                >
                  {activeStage.duration}
                </span>
              </div>

              <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0B132B', marginBottom: '12px' }}>
                {activeStage.title}
              </h3>

              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                {activeStage.description}
              </p>

              {/* Tangible Deliverable Callout */}
              <div
                style={{
                  padding: '16px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #2563EB',
                  borderRadius: '8px',
                }}
              >
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '4px' }}>
                  Client Deliverable
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0B132B' }}>
                  {activeStage.deliverable}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                disabled={activeStageIdx === 0}
                onClick={() => setActiveStageIdx(activeStageIdx - 1)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: activeStageIdx === 0 ? '#F1F5F9' : '#FFFFFF',
                  color: activeStageIdx === 0 ? '#94A3B8' : '#0F172A',
                  cursor: activeStageIdx === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                &larr; Previous Stage
              </button>

              <button
                disabled={activeStageIdx === stages.length - 1}
                onClick={() => setActiveStageIdx(activeStageIdx + 1)}
                className="btn-glow"
                style={{
                  padding: '10px 20px',
                  fontSize: '13px',
                  opacity: activeStageIdx === stages.length - 1 ? 0.6 : 1,
                  cursor: activeStageIdx === stages.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                <span>Next Stage &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right: Stage Visual Simulator */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              background: '#0B132B',
              border: '1px solid #1E293B',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(11, 19, 43, 0.25)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: '#84CC16',
                    letterSpacing: '1px',
                    fontWeight: 700,
                  }}
                >
                  // SIMULATION ENGINE: {activeStage.visualPreview.type.toUpperCase()}
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Milestone Verified</span>
              </div>

              <h4
                className="font-display"
                style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}
              >
                {activeStage.visualPreview.headline}
              </h4>

              <div style={{ fontSize: '13px', color: '#38BDF8', marginBottom: '24px', fontWeight: 600 }}>
                {activeStage.visualPreview.subline}
              </div>

              {/* Dynamic preview list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeStage.visualPreview.bullets.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#E2E8F0',
                    }}
                  >
                    <CheckCircle2 size={16} color="#84CC16" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: '30px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Ready to launch your product?</div>
              <a
                href="#enquiry-section"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#38BDF8',
                  fontSize: '13px',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <span>Book Discovery Call</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
