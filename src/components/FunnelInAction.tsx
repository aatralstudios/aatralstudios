'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MousePointerClick,
  MailCheck,
  ShieldCheck,
  Users,
} from 'lucide-react';

interface FunnelStage {
  id: string;
  number: string;
  name: string;
  widthPercent: number;
  color: string;
  goal: string;
  tactics: string[];
  metricGain: string;
  metricLabel: string;
}

const funnelStages: FunnelStage[] = [
  {
    id: 'awareness',
    number: '01',
    name: 'Awareness',
    widthPercent: 100,
    color: '#2563EB',
    goal: 'First 3 Seconds: Capture visitor attention before bounce instinct activates.',
    tactics: [
      'Sub-500ms First Contentful Paint (edge CDN caching)',
      'High-contrast, zero-fluff headline revealing exact business value',
      'Interactive 3D ambient physics that signal premium engineering prestige',
      'Accessible mobile viewport that renders flawlessly on cellular networks',
    ],
    metricGain: '-38%',
    metricLabel: 'Bounce Rate Reduction',
  },
  {
    id: 'interest',
    number: '02',
    name: 'Interest',
    widthPercent: 82,
    color: '#3B82F6',
    goal: 'Seconds 4–15: Demonstrate concrete craft and technical authority.',
    tactics: [
      'Interactive service breakdown with tangible deliverable lists',
      'Design principle live demonstrations that educate and build trust',
      'Real-time proof tickers (48+ projects, 99% client satisfaction)',
      'Subtle kinetic micro-interactions that reward scrolling and exploration',
    ],
    metricGain: '+64%',
    metricLabel: 'Time On Page Lift',
  },
  {
    id: 'consideration',
    number: '03',
    name: 'Consideration',
    widthPercent: 66,
    color: '#7C3AED',
    goal: 'Seconds 16–45: Validate capability through case studies & transparent numbers.',
    tactics: [
      'Interactive Project Estimator allowing visitors to calculate ballpark scopes',
      'Verified performance telemetry (99/100 Google Lighthouse scores)',
      'Authentic case study walkthroughs with live production metrics',
      'Clear, predictable 6-stage assembly timeline with guaranteed milestone dates',
    ],
    metricGain: '+42%',
    metricLabel: 'Engagement Depth',
  },
  {
    id: 'conversion',
    number: '04',
    name: 'Conversion',
    widthPercent: 50,
    color: '#84CC16',
    goal: 'Decision: Remove every barrier between intention and enquiry.',
    tactics: [
      'Frictionless 3-step progressive lead form with zero unnecessary fields',
      'Honeypot anti-spam defense eliminating captchas that frustrate human users',
      'Instant 1-tap WhatsApp direct chat link for real-time consultation',
      'Guaranteed 12–24h response SLA with NDA commitment',
    ],
    metricGain: '3.4x',
    metricLabel: 'Qualified Lead Velocity',
  },
  {
    id: 'retention',
    number: '05',
    name: 'Retention & Growth',
    widthPercent: 36,
    color: '#10B981',
    goal: 'Post-Launch: Continuous performance, hypercare retainers, and referrals.',
    tactics: [
      'Automated email confirmation acknowledging project scope to client inbox',
      '30-day post-launch warranty with scheduled performance tuning',
      'Clean modular Next.js architecture allowing internal teams to scale',
      'Monthly maintenance SLA ensuring zero downtime and continuous speed',
    ],
    metricGain: '+88%',
    metricLabel: 'Repeat Retainer Rate',
  },
];

export default function FunnelInAction() {
  const [activeStageId, setActiveStageId] = useState('conversion');

  const activeStage = funnelStages.find((s) => s.id === activeStageId) || funnelStages[3];

  return (
    <section id="funnel" style={{ padding: '110px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Filter size={14} color="var(--primary)" />
            <span>Conversion Architecture</span>
          </div>
          <h2 className="section-title">
            The Science of the High-Converting Funnel
          </h2>
          <p className="section-subtitle">
            Websites that look pretty but don&apos;t convert are expensive digital brochures. Here is how we engineer every stage from initial impression to completed client contract.
          </p>
        </div>

        {/* Funnel Visual Diagram + Tactics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.4fr)',
            gap: '36px',
            alignItems: 'center',
          }}
          className="brand-manifesto-grid"
        >
          {/* Left: Interactive Visual Funnel Taper */}
          <div
            className="glass-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'rgba(18, 21, 30, 0.8)',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              // CLICK ANY STAGE TO INSPECT ARCHITECTURAL TACTICS
            </div>

            {funnelStages.map((stage) => {
              const isSelected = activeStageId === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  style={{
                    width: `${stage.widthPercent}%`,
                    margin: '0 auto',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: isSelected
                      ? `linear-gradient(90deg, ${stage.color}25 0%, ${stage.color}50 100%)`
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? `2px solid ${stage.color}` : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? `0 0 25px ${stage.color}35` : 'none',
                    transform: isSelected ? 'scale(1.02)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: stage.color,
                        background: 'rgba(0,0,0,0.4)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {stage.number}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                      {stage.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: stage.color,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {stage.metricGain}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Tactics Inspector & Illustrative Outcome */}
          <div
            className="glass-card"
            style={{
              padding: '40px',
              border: `1px solid ${activeStage.color}60`,
              boxShadow: `0 20px 50px -10px ${activeStage.color}20`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: activeStage.color,
                    letterSpacing: '1px',
                  }}
                >
                  STAGE {activeStage.number} // {activeStage.name.toUpperCase()} TACTICS
                </span>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Illustrative Benchmark
                </span>
              </div>

              <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', marginBottom: '12px' }}>
                {activeStage.goal}
              </h3>

              {/* Tactics Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '24px 0' }}>
                {activeStage.tactics.map((tactic, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                    }}
                  >
                    <CheckCircle2 size={16} color={activeStage.color} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{tactic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative Metric Outcome Banner */}
            <div
              style={{
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: `1px solid ${activeStage.color}40`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Illustrative Measured Lift:
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {activeStage.metricLabel}
                </div>
              </div>

              <div
                className="font-display"
                style={{ fontSize: '28px', fontWeight: 800, color: activeStage.color }}
              >
                {activeStage.metricGain}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

