'use client';

import React, { useState } from 'react';
import { Palette, Check, ShieldCheck, Sparkles, RefreshCw, Eye, ArrowRight } from 'lucide-react';

interface PaletteScheme {
  name: string;
  type: 'complementary' | 'analogous' | 'triadic' | 'monochromatic';
  colors: string[];
  description: string;
}

// Convert Hex to HSL and back for dynamic mathematical color wheel calculations
function hexToHsl(hex: string): [number, number, number] {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  let toHex = (n: number) => {
    let hx = Math.round((n + m) * 255).toString(16);
    return hx.length === 1 ? '0' + hx : hx;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Calculate relative luminance for WCAG contrast
function getLuminance(hex: string): number {
  let rgb = [parseInt(hex.slice(1, 3), 16) / 255, parseInt(hex.slice(3, 5), 16) / 255, parseInt(hex.slice(5, 7), 16) / 255];
  let a = rgb.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function getContrastRatio(hex1: string, hex2: string): number {
  let lum1 = getLuminance(hex1);
  let lum2 = getLuminance(hex2);
  let brightest = Math.max(lum1, lum2);
  let darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const presetHues = [
  { hex: '#2563EB', name: 'Royal Electric Blue', psychology: 'Trust, Reliability, Enterprise Authority' },
  { hex: '#84CC16', name: 'Neon Lime', psychology: 'Vitality, Breakthrough Growth, Modern Innovation' },
  { hex: '#7C3AED', name: 'Cyber Violet', psychology: 'Luxury, Creative Tech, Sovereign Distinction' },
  { hex: '#EA580C', name: 'Kinetic Orange', psychology: 'Urgency, High-Energy Action, Conversion Drive' },
  { hex: '#0EA5E9', name: 'Deep Cyan', psychology: 'Clarity, Precision, Futuristic Software' },
];

export default function ColourTheoryLab() {
  const [baseHex, setBaseHex] = useState('#2563EB');
  const [activeHarmonic, setActiveHarmonic] = useState<'complementary' | 'analogous' | 'triadic' | 'monochromatic'>('complementary');

  const [h, s, l] = hexToHsl(baseHex);

  // Generate dynamic harmonic palettes
  const compColor = hslToHex((h + 180) % 360, s, l);
  const ana1 = hslToHex((h + 30) % 360, s, l);
  const ana2 = hslToHex((h + 330) % 360, s, l);
  const tri1 = hslToHex((h + 120) % 360, s, l);
  const tri2 = hslToHex((h + 240) % 360, s, l);
  const mono1 = hslToHex(h, Math.max(10, s - 30), Math.min(90, l + 25));
  const mono2 = hslToHex(h, Math.min(100, s + 10), Math.max(15, l - 25));

  const schemes: { [key: string]: string[] } = {
    complementary: [baseHex, compColor, mono1, '#0B0D14'],
    analogous: [baseHex, ana1, ana2, '#0B0D14'],
    triadic: [baseHex, tri1, tri2, '#0B0D14'],
    monochromatic: [baseHex, mono1, mono2, '#0B0D14'],
  };

  const currentPalette = schemes[activeHarmonic];

  // Contrast Calculation vs White background and Dark background
  const contrastOnWhite = getContrastRatio(baseHex, '#FFFFFF').toFixed(1);
  const contrastOnDark = getContrastRatio(baseHex, '#07080B').toFixed(1);
  const isWcagPass = Number(contrastOnWhite) >= 4.5 || Number(contrastOnDark) >= 4.5;

  return (
    <section
      id="color-lab"
      className="light-contrast-section"
      style={{
        padding: '110px 0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
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
            <Palette size={14} />
            <span>Interactive Colour Engine</span>
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
            Mathematical Colour Theory in Action
          </h2>

          <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto' }}>
            Colors evoke chemical emotional responses in visitors. Pick any base hue to generate mathematically harmonic palettes and preview our live website mockup re-theme in real time.
          </p>
        </div>

        {/* Generator Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.4fr',
            gap: '36px',
            alignItems: 'start',
            marginBottom: '40px',
          }}
          className="brand-manifesto-grid"
        >
          {/* Left: Base Color & Harmonics Selector */}
          <div
            style={{
              padding: '36px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.06)',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#070913', marginBottom: '16px' }}>
              1. Select or Customize Base Hue
            </h4>

            {/* Quick Preset Buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {presetHues.map((p) => (
                <button
                  key={p.hex}
                  onClick={() => setBaseHex(p.hex)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: baseHex === p.hex ? `2px solid ${p.hex}` : '1px solid #CBD5E1',
                    background: baseHex === p.hex ? '#F8FAFC' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#070913',
                  }}
                >
                  <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: p.hex }} />
                  <span>{p.name}</span>
                </button>
              ))}

              {/* Native Color Picker */}
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#475569',
                }}
              >
                <span>Custom Hex:</span>
                <input
                  type="color"
                  value={baseHex}
                  onChange={(e) => setBaseHex(e.target.value)}
                  style={{ width: '22px', height: '22px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#2563EB' }}>{baseHex}</span>
              </label>
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#070913', marginBottom: '14px' }}>
              2. Mathematical Harmonic Rule
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '28px' }}>
              {[
                { id: 'complementary', label: 'Complementary (180°)', note: 'Maximum visual impact & tension' },
                { id: 'analogous', label: 'Analogous (30°)', note: 'Organic, calming, unified flow' },
                { id: 'triadic', label: 'Triadic (120°)', note: 'Vibrant, dynamic, multi-tier' },
                { id: 'monochromatic', label: 'Monochromatic', note: 'Minimalist, sleek, high-elegance' },
              ].map((hRule) => (
                <button
                  key={hRule.id}
                  onClick={() => setActiveHarmonic(hRule.id as any)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: activeHarmonic === hRule.id ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    background: activeHarmonic === hRule.id ? '#EFF6FF' : '#FFFFFF',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700, color: activeHarmonic === hRule.id ? '#2563EB' : '#070913' }}>
                    {hRule.label}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {hRule.note}
                  </div>
                </button>
              ))}
            </div>

            {/* WCAG Contrast Telemetry Bar */}
            <div
              style={{
                padding: '16px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#16A34A" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#070913' }}>
                    WCAG AA / AAA Accessibility
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Light: {contrastOnWhite}:1 | Dark: {contrastOnDark}:1
                  </div>
                </div>
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: isWcagPass ? '#F0FDF4' : '#FEF2F2',
                  color: isWcagPass ? '#16A34A' : '#DC2626',
                  border: isWcagPass ? '1px solid #BBF7D0' : '1px solid #FECACA',
                }}
              >
                {isWcagPass ? 'WCAG Verified' : 'Adjust Tone'}
              </span>
            </div>
          </div>

          {/* Right: Real-time Re-themed Live Website Mockup */}
          <div
            style={{
              padding: '24px',
              background: '#07080B',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Mockup Browser Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                marginBottom: '18px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              </div>

              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#64748B' }}>
                live-retheme-preview.aatralstudios.com
              </span>

              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>● Instant Sync</span>
            </div>

            {/* Embedded Live Re-themed Mini Mockup */}
            <div
              style={{
                padding: '30px 24px',
                background: currentPalette[3],
                borderRadius: '12px',
                border: `1px solid ${currentPalette[0]}40`,
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: '20px', background: `${currentPalette[0]}25`, color: currentPalette[0], fontSize: '11px', fontWeight: 700, marginBottom: '12px' }}>
                // Real-Time Theme Engine
              </div>

              <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2 }}>
                High-Converting <span style={{ color: currentPalette[0] }}>Digital Experience</span>
              </h4>

              <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '20px' }}>
                Notice how the primary CTA, highlights, and secondary accents dynamically synchronize with your mathematical palette choices.
              </p>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: currentPalette[0],
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: `0 4px 14px ${currentPalette[0]}40`,
                  }}
                >
                  Primary CTA
                </button>

                <button
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: `1px solid ${currentPalette[1]}`,
                    color: currentPalette[1],
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Secondary Accent
                </button>
              </div>

              {/* 4 Color Palette Swatches */}
              <div style={{ marginTop: '24px', display: 'flex', gap: '8px' }}>
                {currentPalette.map((col, idx) => (
                  <div key={idx} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: '32px', borderRadius: '6px', background: col, border: '1px solid rgba(255,255,255,0.2)' }} />
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#64748B', display: 'block', marginTop: '4px' }}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

