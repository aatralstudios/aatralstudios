'use client';

import React, { useState } from 'react';
import {
  Layers,
  Sliders,
  Check,
  X,
  Eye,
  Sparkles,
  ArrowRight,
  Maximize2,
  Grid,
} from 'lucide-react';

interface Principle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  beforeLabel: string;
  afterLabel: string;
}

const principles: Principle[] = [
  {
    id: 'hierarchy',
    name: 'Hierarchy',
    tagline: 'Directing the visitor’s eye through intentional visual weight.',
    description: 'Without hierarchy, every element screams with equal volume and nothing gets heard. We employ disciplined size scaling, optical weights, and color contrast to ensure the key message registers first.',
    beforeLabel: 'Flat / Unranked (Chaos)',
    afterLabel: 'Disciplined Hierarchy (Order)',
  },
  {
    id: 'contrast',
    name: 'Contrast',
    tagline: 'Distinguishing foreground from background for effortless legibility.',
    description: 'Contrast is not just about dark and light; it is about establishing focal points. We guarantee WCAG AA / AAA contrast ratios across all display brightness settings and lighting environments.',
    beforeLabel: 'Low Contrast (Strain)',
    afterLabel: 'High Contrast (Clarity)',
  },
  {
    id: 'balance',
    name: 'Balance',
    tagline: 'Equilibrium through symmetrical stability or dynamic asymmetry.',
    description: 'Visual weight must feel grounded. We use asymmetrical balance to inject kinetic energy into tech agency pages while maintaining rock-solid visual equilibrium.',
    beforeLabel: 'Unbalanced / Lopsided',
    afterLabel: 'Harmonic Equilibrium',
  },
  {
    id: 'alignment',
    name: 'Alignment',
    tagline: 'Invisible 12-column grid lines that establish subliminal order.',
    description: 'Every button, paragraph, and card aligns to an underlying mathematical grid. When visual edges snap together cleanly, users perceive the interface as authoritative and trustworthy.',
    beforeLabel: 'Offset / Disjointed',
    afterLabel: 'Mathematical 12-Col Grid',
  },
  {
    id: 'proximity',
    name: 'Proximity',
    tagline: 'Grouping related items together to eliminate cognitive load.',
    description: 'Gestalt principles dictate that elements placed close together are perceived as belonging to one conceptual unit. We group metadata, actions, and content into distinct cognitive zones.',
    beforeLabel: 'Scattered Elements',
    afterLabel: 'Gestalt Grouped Units',
  },
  {
    id: 'repetition',
    name: 'Repetition',
    tagline: 'Consistency across typography, corner radii, and color tokens.',
    description: 'Repeated visual motifs build pattern recognition. By locking corner radii (8px/14px/20px) and typography scales, visitors never have to relearn how to navigate your site.',
    beforeLabel: 'Inconsistent Tokens',
    afterLabel: 'Unified Design System',
  },
  {
    id: 'whitespace',
    name: 'Whitespace',
    tagline: 'Giving content breathing room to convey luxury and confidence.',
    description: 'Amateur design crams every available pixel. Luxury and authority are communicated by generous, deliberate whitespace that lets ideas expand and command attention.',
    beforeLabel: 'Cramped & Cluttered',
    afterLabel: 'Generous Breathing Room',
  },
  {
    id: 'rhythm',
    name: 'Rhythm',
    tagline: 'Cadence and flow that guides the reader seamlessly down the page.',
    description: 'Just like music, digital layouts have pacing. Alternating between dense data cards, immersive full-bleed visuals, and punchy pull-quotes keeps user attention hooked.',
    beforeLabel: 'Monotonous Cadence',
    afterLabel: 'Dynamic Pacing & Flow',
  },
];

export default function DesignPrinciples() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAfter, setIsAfter] = useState(true);

  const activePrinciple = principles[activeIdx];

  return (
    <section
      id="principles"
      className="light-contrast-section"
      style={{
        padding: '110px 0',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: 'var(--radius-full)',
              color: '#2563EB',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              marginBottom: '16px',
            }}
          >
            <Layers size={14} />
            <span>Interactive Craft Showcase</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
              fontWeight: 800,
              color: '#070913',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            The 8 Laws of Visual Architecture
          </h2>

          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
            We do not guess; we engineer perception. Explore how subtle adjustments to contrast, hierarchy, and rhythm transform confusion into conversion.
          </p>
        </div>

        {/* 8 Principles Pill Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {principles.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setIsAfter(true);
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                  background: isSelected ? '#2563EB' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#334155',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.25)' : 'none',
                }}
              >
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Interactive Before / After Laboratory */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1.4fr)',
            gap: '36px',
            alignItems: 'stretch',
          }}
          className="brand-manifesto-grid"
        >
          {/* Left Column: Principle Explanation & Theory */}
          <div
            style={{
              padding: '40px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    color: '#2563EB',
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  PRINCIPLE 0{activeIdx + 1} // 08
                </span>

                <span
                  style={{
                    fontSize: '11px',
                    background: '#F1F5F9',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    color: '#64748B',
                    fontWeight: 600,
                  }}
                >
                  Live Interactive Demo
                </span>
              </div>

              <h3
                className="font-display"
                style={{ fontSize: '28px', fontWeight: 800, color: '#070913', marginBottom: '12px' }}
              >
                {activePrinciple.name}
              </h3>

              <div style={{ fontSize: '16px', fontWeight: 700, color: '#2563EB', marginBottom: '16px', lineHeight: 1.4 }}>
                {activePrinciple.tagline}
              </div>

              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
                {activePrinciple.description}
              </p>
            </div>

            {/* Interactive Toggle Control */}
            <div
              style={{
                padding: '20px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Interactive State Toggle:
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setIsAfter(false)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: !isAfter ? '2px solid #EF4444' : '1px solid #CBD5E1',
                    background: !isAfter ? '#FEF2F2' : '#FFFFFF',
                    color: !isAfter ? '#DC2626' : '#64748B',
                    fontSize: '13px',
                    fontWeight: !isAfter ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <X size={14} />
                  <span>Before (Flawed)</span>
                </button>

                <button
                  onClick={() => setIsAfter(true)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: isAfter ? '2px solid #16A34A' : '1px solid #CBD5E1',
                    background: isAfter ? '#F0FDF4' : '#FFFFFF',
                    color: isAfter ? '#16A34A' : '#64748B',
                    fontSize: '13px',
                    fontWeight: isAfter ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={14} />
                  <span>After (Aatral Standard)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Visual Layout Simulator */}
          <div
            style={{
              padding: '36px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '440px',
            }}
          >
            {/* Simulation Canvas Top Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: 700,
                color: isAfter ? '#16A34A' : '#DC2626',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isAfter ? '#16A34A' : '#DC2626',
                }}
              />
              <span>{isAfter ? activePrinciple.afterLabel : activePrinciple.beforeLabel}</span>
            </div>

            {/* DYNAMIC DEMO RENDERING PER PRINCIPLE */}
            {activePrinciple.id === 'hierarchy' && (
              <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
                {isAfter ? (
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Primary Eyebrow
                    </span>
                    <h4 style={{ fontSize: '32px', fontWeight: 800, color: '#070913', margin: '8px 0', lineHeight: 1.15 }}>
                      Design That Commands Authority
                    </h4>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                      The eye is naturally channeled from the category tag to the primary headline, then to this supporting context.
                    </p>
                    <button className="btn-glow" style={{ padding: '12px 24px', fontSize: '14px' }}>
                      Primary Action Button
                    </button>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '14px', color: '#334155' }}>Primary Eyebrow</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 400, color: '#334155', margin: '12px 0' }}>
                      Design That Commands Authority
                    </h4>
                    <p style={{ fontSize: '14px', color: '#334155', marginBottom: '16px' }}>
                      The eye has no focal anchor. Everything looks like a standard sentence with zero visual priority.
                    </p>
                    <button style={{ padding: '8px 14px', background: '#E2E8F0', border: 'none', color: '#334155', fontSize: '14px' }}>
                      Primary Action Button
                    </button>
                  </div>
                )}
              </div>
            )}

            {activePrinciple.id === 'contrast' && (
              <div
                style={{
                  padding: '30px',
                  borderRadius: '16px',
                  background: isAfter ? '#070913' : '#F1F5F9',
                  color: isAfter ? '#FFFFFF' : '#94A3B8',
                  maxWidth: '440px',
                  margin: '0 auto',
                  width: '100%',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: isAfter ? '#84CC16' : '#CBD5E1', fontWeight: 700, marginBottom: '8px' }}>
                  Contrast Benchmark: {isAfter ? '14.8:1 (WCAG AAA Pass)' : '2.1:1 (WCAG Fail)'}
                </div>
                <h4 style={{ fontSize: '24px', fontWeight: 800, color: isAfter ? '#FFFFFF' : '#A0AEC0', marginBottom: '10px' }}>
                  Ultra-Legible In Direct Sunlight
                </h4>
                <p style={{ fontSize: '14px', color: isAfter ? '#CBD5E1' : '#B8C2CC', lineHeight: 1.6, marginBottom: '20px' }}>
                  High contrast ensures every client prospect can read your value proposition without squinting or straining.
                </p>
                <button
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: isAfter ? '#2563EB' : '#D1D5DB',
                    color: isAfter ? '#FFFFFF' : '#9CA3AF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '13px',
                  }}
                >
                  Clear Action
                </button>
              </div>
            )}

            {activePrinciple.id === 'balance' && (
              <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
                {isAfter ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', alignItems: 'center' }}>
                    <div style={{ padding: '24px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px' }}>
                      <h5 style={{ fontSize: '18px', fontWeight: 800, color: '#070913', marginBottom: '6px' }}>Kinetic Mass</h5>
                      <p style={{ fontSize: '13px', color: '#64748B' }}>Primary content anchor providing stability on the left flank.</p>
                    </div>
                    <div style={{ padding: '24px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '32px', fontWeight: 800, color: '#2563EB' }}>+48%</span>
                      <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600 }}>Visual Counterweight</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', width: '50%' }}>
                    <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', width: '100%' }}>
                      Heavy cluster
                    </div>
                    <div style={{ padding: '16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', width: '80%' }}>
                      Lopsided weight
                    </div>
                  </div>
                )}
              </div>
            )}

            {activePrinciple.id === 'alignment' && (
              <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[1, 2, 3].map((num) => (
                    <div
                      key={num}
                      style={{
                        padding: '14px 20px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        marginLeft: isAfter ? '0px' : `${(num - 1) * 32}px`,
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#070913' }}>
                        Aligned Grid Node #{num}
                      </span>
                      <span style={{ fontSize: '11px', color: isAfter ? '#16A34A' : '#EF4444', fontWeight: 600 }}>
                        {isAfter ? '0px Offset (Snapped)' : `+${(num - 1) * 32}px Drifting`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePrinciple.id === 'proximity' && (
              <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
                {isAfter ? (
                  <div style={{ padding: '24px', background: '#F8FAFC', border: '1px solid #BFDBFE', borderRadius: '16px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700 }}>Service Tier</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#070913', margin: '4px 0 12px 0' }}>Complete Studio Build</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ fontSize: '12px', background: '#EFF6FF', padding: '4px 8px', borderRadius: '6px', color: '#1E40AF', fontWeight: 600 }}>Design</span>
                      <span style={{ fontSize: '12px', background: '#EFF6FF', padding: '4px 8px', borderRadius: '6px', color: '#1E40AF', fontWeight: 600 }}>Next.js 15</span>
                      <span style={{ fontSize: '12px', background: '#EFF6FF', padding: '4px 8px', borderRadius: '6px', color: '#1E40AF', fontWeight: 600 }}>SEO</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Service Tier (Orphaned label)</div>
                    <div style={{ fontSize: '20px', color: '#334155' }}>Complete Studio Build</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>Random tags floating without card enclosure</div>
                  </div>
                )}
              </div>
            )}

            {activePrinciple.id === 'repetition' && (
              <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        background: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: isAfter ? '12px' : i === 1 ? '4px' : i === 2 ? '24px' : '0px',
                        fontFamily: isAfter ? 'var(--font-sans)' : i === 1 ? 'serif' : i === 2 ? 'monospace' : 'sans-serif',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#070913' }}>Card {i}</div>
                      <div style={{ fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
                        {isAfter ? 'Radius: 12px' : `Radius: ${i === 1 ? '4px' : i === 2 ? '24px' : '0px'}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePrinciple.id === 'whitespace' && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '440px',
                  margin: '0 auto',
                  padding: isAfter ? '40px' : '8px',
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: '16px',
                  transition: 'padding 0.3s ease',
                }}
              >
                <h5 style={{ fontSize: '20px', fontWeight: 800, color: '#070913', marginBottom: isAfter ? '12px' : '2px' }}>
                  Breathing Room
                </h5>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                  Whitespace is active space. It organizes thoughts, frames content, and projects uncompromising confidence.
                </p>
              </div>
            )}

            {activePrinciple.id === 'rhythm' && (
              <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isAfter ? '16px' : '3px' }}>
                  {[1, 2, 3].map((r) => (
                    <div
                      key={r}
                      style={{
                        padding: '12px 18px',
                        background: isAfter ? '#F8FAFC' : '#E2E8F0',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#070913',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Beat {r} • {isAfter ? 'Consistent 16px Interval' : 'Compressed 3px Jitter'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

