'use client';

import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { PRICING_CONFIG, WebsiteTypeOption, DesignComplexityOption, AddonOption } from '@/data/pricing-config';

interface PricingEstimatorProps {
  onSelectEstimate?: (estimateData: {
    websiteType: string;
    estimatedBudget: string;
    pages: number;
    addons: string[];
    summary: string;
  }) => void;
}

export default function PricingEstimator({ onSelectEstimate }: PricingEstimatorProps) {
  const [selectedType, setSelectedType] = useState<WebsiteTypeOption>(PRICING_CONFIG.websiteTypes[1]); // Default Business
  const [pageCount, setPageCount] = useState<number>(5);
  const [complexity, setComplexity] = useState<DesignComplexityOption>(PRICING_CONFIG.designComplexities[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['advanced-seo']);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Calculate pricing
  const basePrice = selectedType.basePriceINR;
  const extraPages = Math.max(0, pageCount - selectedType.defaultPages);
  const pagesCost = extraPages * PRICING_CONFIG.pageCostINR;
  const subtotalBeforeComplexity = basePrice + pagesCost;
  const withComplexity = subtotalBeforeComplexity * complexity.multiplier;

  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = PRICING_CONFIG.addons.find((a) => a.id === id);
    return acc + (addon ? addon.priceINR : 0);
  }, 0);

  const calculatedTotal = Math.round((withComplexity + addonsTotal) / 1000) * 1000;
  const lowRange = Math.round((calculatedTotal * 0.9) / 1000) * 1000;
  const highRange = Math.round((calculatedTotal * 1.1) / 1000) * 1000;

  const formattedLow = `₹${lowRange.toLocaleString('en-IN')}`;
  const formattedHigh = `₹${highRange.toLocaleString('en-IN')}`;
  const budgetBand = `${formattedLow} – ${formattedHigh}`;

  const handleDiscussProject = () => {
    const summary = `Estimated: ${selectedType.name} (${pageCount} pages, ${complexity.name} tier, Addons: ${
      selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None'
    }) -> Range ${budgetBand}`;

    if (onSelectEstimate) {
      onSelectEstimate({
        websiteType: selectedType.name,
        estimatedBudget: budgetBand,
        pages: pageCount,
        addons: selectedAddons,
        summary,
      });
    }

    const target = document.querySelector('#enquiry-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="estimator" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-pill" style={{ marginBottom: '14px' }}>
            <Calculator size={14} color="#2563EB" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="section-title">
            Transparent Pricing. Zero Hidden Surprises.
          </h2>
          <p className="section-subtitle">
            Configure scope, page requirements, and complexity below to get an instant indicative budget bracket.
            Prefill your project brief with a single click.
          </p>
        </div>

        {/* Estimator Configuration Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '32px',
            alignItems: 'start',
          }}
          className="brand-manifesto-grid"
        >
          {/* Controls Column */}
          <div className="glass-card" style={{ padding: 'clamp(24px, 4vw, 36px)', background: '#FFFFFF', borderColor: '#CBD5E1' }}>
            {/* Step 1: Website Type */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0B132B', marginBottom: '12px' }}>
                1. Select Website Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                {PRICING_CONFIG.websiteTypes.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        setPageCount(type.defaultPages);
                      }}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        color: isSelected ? '#2563EB' : '#475569',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#2563EB' : '#0B132B', marginBottom: '2px' }}>
                        {type.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>
                        Base ~₹{type.basePriceINR.toLocaleString('en-IN')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Page Count Slider */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: 700, color: '#0B132B' }}>
                  2. Approximate Page Count: <span style={{ color: '#2563EB' }}>{pageCount} Pages</span>
                </label>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  {pageCount <= selectedType.defaultPages ? 'Included in base tier' : `+₹${((pageCount - selectedType.defaultPages) * PRICING_CONFIG.pageCostINR).toLocaleString('en-IN')} extra`}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                <span>1 Page (Landing)</span>
                <span>5 Pages (Standard)</span>
                <span>15+ Pages (Multi-category)</span>
                <span>25 Pages</span>
              </div>
            </div>

            {/* Step 3: Design Complexity */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0B132B', marginBottom: '12px' }}>
                3. Design &amp; Motion Complexity
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                {PRICING_CONFIG.designComplexities.map((tier) => {
                  const isSelected = complexity.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setComplexity(tier)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #2563EB' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        color: isSelected ? '#2563EB' : '#475569',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 700, color: isSelected ? '#2563EB' : '#0B132B', marginBottom: '4px' }}>
                        {tier.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.4 }}>
                        {tier.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Addons */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#0B132B', marginBottom: '12px' }}>
                4. Strategic Add-ons &amp; Integrations
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {PRICING_CONFIG.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '12px',
                        borderRadius: '8px',
                        border: isChecked ? '1.5px solid #2563EB' : '1px solid #CBD5E1',
                        background: isChecked ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '4px',
                          border: isChecked ? 'none' : '1.5px solid #94A3B8',
                          background: isChecked ? '#2563EB' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {isChecked && <Check size={12} color="#ffffff" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: isChecked ? '#2563EB' : '#0B132B' }}>
                          {addon.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>
                          +₹{addon.priceINR.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Summary Card */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(24px, 4vw, 36px)',
              background: '#FFFFFF',
              border: '2px solid #BFDBFE',
              boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.15)',
              position: 'sticky',
              top: '100px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={16} color="#2563EB" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                REAL-TIME ESTIMATE SUMMARY
              </span>
            </div>

            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Estimated Project Range (INR):</div>
            <div
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                fontWeight: 800,
                color: '#0B132B',
                letterSpacing: '-1px',
                marginBottom: '16px',
              }}
            >
              {budgetBand}
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: '24px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0B132B', marginBottom: '8px', textTransform: 'uppercase' }}>
                Included in this Configuration:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#16A34A" />
                  <span><strong>{selectedType.name}</strong> (~{pageCount} custom pages)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#16A34A" />
                  <span><strong>{complexity.name}</strong> motion &amp; visual execution</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#16A34A" />
                  <span>Sub-second Lighthouse speed &amp; responsive layout</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} color="#16A34A" />
                  <span>Turnaround estimate: <strong>{selectedType.turnaroundDays} Days</strong></span>
                </li>
              </ul>
            </div>

            {/* Conversion Action */}
            <button
              onClick={handleDiscussProject}
              className="btn-glow"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '15px',
                borderRadius: '10px',
                justifyContent: 'center',
                marginBottom: '14px',
              }}
            >
              <span>Lock In Estimate &amp; Prefill Brief</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748B', lineHeight: 1.5 }}>
              <ShieldCheck size={14} color="#16A34A" style={{ flexShrink: 0 }} />
              <span>Indicative estimate based on standard scope. Non-binding quotation confirmed within 12–24h.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
