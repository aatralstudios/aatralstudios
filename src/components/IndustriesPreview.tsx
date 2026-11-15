'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  Briefcase,
  Dumbbell,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

const previewSectors = [
  {
    name: 'Real Estate & Property',
    icon: Building2,
    outcome: 'High-Ticket Inquiries & Site Visits',
    highlight: 'Interactive floorplans & buyer intake',
  },
  {
    name: 'Clinics & Healthcare',
    icon: Stethoscope,
    outcome: 'Patient Trust & 1-Click Booking',
    highlight: 'Specialist credentials & zero-friction booking',
  },
  {
    name: 'Restaurants & Hospitality',
    icon: UtensilsCrossed,
    outcome: 'Table Reservations & Orders',
    highlight: 'Interactive mobile menus & dining booking',
  },
  {
    name: 'Fashion & Boutiques',
    icon: ShoppingBag,
    outcome: 'Lookbooks & Social Conversions',
    highlight: 'Curated seasonal drops & WhatsApp orders',
  },
  {
    name: 'Corporate & Services',
    icon: Briefcase,
    outcome: 'B2B Authority & Qualified Leads',
    highlight: 'Executive case studies & discovery funnels',
  },
  {
    name: 'Fitness & Wellness',
    icon: Dumbbell,
    outcome: 'Class Bookings & Memberships',
    highlight: 'Schedule management & trainer profiles',
  },
];

export default function IndustriesPreview() {
  return (
    <section
      id="industries"
      style={{
        padding: '90px 0',
        position: 'relative',
        zIndex: 2,
        background: '#FAF8F5',
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
            <Sparkles size={13} color="var(--primary)" />
            <span>Industries We Serve</span>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
              fontWeight: 800,
              marginBottom: '12px',
              color: 'var(--text-primary)',
              lineHeight: 1.18,
              letterSpacing: '-0.8px',
            }}
          >
            Bespoke Websites for <br />
            <span className="gradient-accent">Every Business Sector.</span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '14.5px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We engineer industry-tailored websites designed specifically around your target customer psychology, regulatory requirements, and revenue conversion funnels.
          </p>
        </div>

        {/* 6 Sectors Overview Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '18px',
            marginBottom: '32px',
          }}
        >
          {previewSectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '20px 22px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'var(--primary-soft)',
                    border: '1px solid rgba(45, 90, 67, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3
                    style={{
                      fontSize: '14.5px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      margin: '0 0 3px 0',
                    }}
                  >
                    {sector.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      marginBottom: '2px',
                    }}
                  >
                    {sector.outcome}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                    {sector.highlight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner with Commercial Outcome & Tailored Features */}
        <div
          style={{
            padding: '22px 28px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '18px',
          }}
          className="industries-preview-cta-bar"
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                The Commercial Outcome
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Every industry layout is crafted with Tailored Features Included—converting casual browsers into paying clients through deliberate UX.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href="/industries"
              className="btn-glow"
              style={{
                padding: '11px 22px',
                fontSize: '13.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
              }}
            >
              <span>Explore All 6 Industries In Full Detail</span>
              <ArrowRight size={14} />
            </Link>

            <a
              href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20industry!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                padding: '11px 18px',
                fontSize: '13.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
              }}
            >
              <WhatsAppIcon size={16} color="#25D366" />
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .industries-preview-cta-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .industries-preview-cta-bar div:last-child {
            width: 100% !important;
            flex-direction: column !important;
          }
          .industries-preview-cta-bar a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
