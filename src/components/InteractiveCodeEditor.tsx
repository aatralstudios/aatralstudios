'use client';

import React, { useState } from 'react';
import { Terminal, Code, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function InteractiveCodeEditor() {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('preview');
  const [accentColor, setAccentColor] = useState('#2563EB');
  const [borderRadius, setBorderRadius] = useState(12);

  const sampleCode = `// Aatral Studios Bespoke Architecture
import { HighConvertingEngine } from '@aatral/core';

export default function ClientExperience() {
  return (
    <HighConvertingEngine
      theme="ultra-clean"
      accentColor="${accentColor}"
      borderRadius="${borderRadius}px"
      performance={{ lcp: '0.4s', seo: 100 }}
      guaranteedSLA="12-24h"
    >
      <HeroHeadline>Your Business Deserves More Than A Template</HeroHeadline>
      <LeadGeneratorFunnel conversionRate="+240%" />
    </HighConvertingEngine>
  );
}`;

  return (
    <div className="container" style={{ marginBottom: '60px' }}>
      <div
        className="glass-card"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.08)',
        }}
      >
        {/* Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            background: '#F1F5F9',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#84CC16' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#475569', marginLeft: '6px', fontWeight: 600 }}>
              AatralLab.tsx — Interactive Architecture Demo
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px', background: '#E2E8F0', padding: '3px', borderRadius: '8px' }}>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'code' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'code' ? '#2563EB' : '#64748B',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: activeTab === 'code' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <Code size={13} />
              <span>Source</span>
            </button>

            <button
              onClick={() => setActiveTab('preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                background: activeTab === 'preview' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'preview' ? '#2563EB' : '#64748B',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: activeTab === 'preview' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              <Eye size={13} />
              <span>Rendered UI</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'code' ? (
          <div
            style={{
              padding: '24px',
              background: '#0B132B',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#E2E8F0',
              overflowX: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>
              <code>{sampleCode}</code>
            </pre>
          </div>
        ) : (
          <div style={{ padding: '28px', background: '#F8FAFC' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: `${borderRadius}px`,
                padding: '24px',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: accentColor,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  LIVE COMPONENT PREVIEW
                </span>
                <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700 }}>● 100/100 Core Web Vitals</span>
              </div>

              <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#0B132B', marginBottom: '8px' }}>
                Custom Business Website &amp; Digital Experience
              </h4>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                Engineered from first principles with responsive design, sub-second page loads, and conversion-focused CTAs.
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="#enquiry-section"
                  className="btn-glow"
                  style={{
                    background: accentColor,
                    padding: '10px 20px',
                    fontSize: '13px',
                    borderRadius: `${Math.max(6, borderRadius - 4)}px`,
                  }}
                >
                  <span>Request Custom Build</span>
                  <ArrowRight size={14} />
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <label style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Accent:</label>
                  {['#2563EB', '#1D4ED8', '#84CC16', '#0B132B'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setAccentColor(col)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: col,
                        border: accentColor === col ? '2px solid #000' : '1px solid #CBD5E1',
                        cursor: 'pointer',
                      }}
                      title={col}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
