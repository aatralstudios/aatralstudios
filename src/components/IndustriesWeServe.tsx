'use client';

import React, { useState } from 'react';
import {
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  Briefcase,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Calendar,
  ShoppingBag,
  MapPin,
  Clock,
  Layers,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

interface IndustrySector {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  tag: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  keyFeatures: string[];
  businessImpact: string;
  idealFor: string[];
}

const industries: IndustrySector[] = [
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    subtitle: 'Residential developments, brokerages & architecture studios',
    icon: Building2,
    accentColor: '#2D5A43',
    tag: 'High-Ticket Inquiries',
    imageUrl: '/images/industries/real-estate.webp',
    imageAlt: 'Modern luxury architectural villa with floor-to-ceiling glass and ambient exterior lighting',
    description:
      'We design authoritative, high-prestige real estate websites that showcase architectural developments with stunning visuals and convert property seekers into private site visits.',
    keyFeatures: [
      'Interactive Property & Floorplan Showcases',
      'Instant Site Visit & Viewing Booking',
      'Location & Neighborhood Map Integration',
      'High-Intent Buyer Inquiry & WhatsApp Routing',
      'Brochure PDF Download Gate',
    ],
    businessImpact: 'Transforms passive property browsers into qualified buyers and private viewing appointments.',
    idealFor: ['Property Developers', 'Real Estate Brokerages', 'Luxury Villa Rentals', 'Architectural Studios'],
  },
  {
    id: 'clinics',
    name: 'Clinics & Healthcare',
    subtitle: 'Dental, specialist clinics, veterinary & wellness centers',
    icon: Stethoscope,
    accentColor: '#2D5A43',
    tag: 'Patient Trust & Appointments',
    imageUrl: '/images/industries/healthcare.webp',
    imageAlt: 'Clean, modern medical clinic consultation room with calming warm interior aesthetics',
    description:
      'A welcoming, compassionate digital clinic that puts patients at ease. Clear practitioner credentials, transparent treatments, and effortless appointment booking with zero phone friction.',
    keyFeatures: [
      'Frictionless 1-Click Appointment Scheduling',
      'Doctor & Specialist Credentials & Bios',
      'Treatment Guides & Transparent Pricing Notes',
      '1-Tap Emergency Calling & Directions',
      'Strict Privacy & Patient Data Protection',
    ],
    businessImpact: 'Fills clinic schedules automatically while building deep patient confidence before they step through the door.',
    idealFor: ['Dental Clinics', 'Veterinary Practices', 'Specialist Doctors', 'Diagnostic Centers', 'Wellness Clinics'],
  },
  {
    id: 'restaurants',
    name: 'Restaurants, Cafes & Hospitality',
    subtitle: 'Fine dining, artisanal cafes, resorts & boutique hotels',
    icon: UtensilsCrossed,
    accentColor: '#D97746',
    tag: 'Table Reservations & Orders',
    imageUrl: '/images/industries/hospitality.webp',
    imageAlt: 'Upscale ambient restaurant dining room with warm golden lighting and curated table settings',
    description:
      'Sensory, appetite-inducing websites that highlight culinary craft, showcase interior ambiance, and make booking a table or ordering food seamless on mobile.',
    keyFeatures: [
      'Interactive Mobile Menus with Dietary Tags',
      'Direct Table Reservation & Party Booking',
      'Google Maps Directions & Opening Hours',
      'Private Dining & Event Catering Inquiries',
      'Direct WhatsApp Order & Chat Integration',
    ],
    businessImpact: 'Drives weeknight table bookings and captures high-margin private party catering requests.',
    idealFor: ['Fine Dining Restaurants', 'Artisanal Cafes & Bakeries', 'Cloud Kitchens', 'Boutique Resorts & Hotels'],
  },
  {
    id: 'textiles',
    name: 'Textiles, Fashion & Jewelry',
    subtitle: 'Silk emporiums, ethnic wear boutiques & jewelry brands',
    icon: Sparkles,
    accentColor: '#D97746',
    tag: 'Mobile E-Commerce Growth',
    imageUrl: '/images/industries/fashion.webp',
    imageAlt: 'Luxury boutique fashion fabrics and designer garments displayed in a high-end retail atelier',
    description:
      'Fast, mobile-first digital storefronts engineered for fashion and textiles. High-resolution fabric zoom, rapid filtering, 1-tap checkout, and instant customer service via WhatsApp.',
    keyFeatures: [
      'High-Definition Fabric & Jewelry Zoom',
      'Lightning-Fast 1-Tap Mobile Checkout',
      'Automated Multi-Currency Support (Global Orders)',
      'Instant WhatsApp Cart Help & Order Tracking',
      'Festive Collection Banners & Lookbooks',
    ],
    businessImpact: 'Eliminates mobile cart abandonment and opens global sales for domestic retail brands.',
    idealFor: ['Silk & Textile Showrooms', 'Ethnic Fashion Boutiques', 'Jewelry Ateliers', 'D2C Apparel Brands'],
  },
  {
    id: 'corporate',
    name: 'Corporate, Law & Professional Services',
    subtitle: 'Consultancies, law firms, financial advisors & B2B enterprises',
    icon: Briefcase,
    accentColor: '#2D5A43',
    tag: 'Executive Authority',
    imageUrl: '/images/industries/corporate.webp',
    imageAlt: 'Modern executive corporate boardroom with architectural glass walls and skyline views',
    description:
      'Clean, authoritative websites that communicate corporate prestige and reliability. Designed to win multimillion-dollar contracts and reassure enterprise partners of your competence.',
    keyFeatures: [
      'Executive Leadership & Partner Profiles',
      'Structured Practice Areas & Service Offerings',
      'Confidential Project / Proposal Intake Brief',
      'Authoritative Case Proof & Capability Briefs',
      'Enterprise-Grade Security & Fast Global Loading',
    ],
    businessImpact: 'Solidifies market authority and makes corporate RFPs and consultations effortless to submit.',
    idealFor: ['Law Practices', 'Auditing & Accounting Firms', 'Management Consultancies', 'Supply Chain & Logistics'],
  },
  {
    id: 'fitness',
    name: 'Fitness, Salons & Personal Care',
    subtitle: 'Gyms, yoga studios, luxury spas & personal care salons',
    icon: Dumbbell,
    accentColor: '#D97746',
    tag: 'Memberships & Bookings',
    imageUrl: '/images/industries/fitness.webp',
    imageAlt: 'Premium modern wellness studio with ambient cedar finishes, clean equipment, and natural light',
    description:
      'High-energy, welcoming websites that inspire action. Designed to showcase facility ambiance, highlight class schedules, and convert local visitors into active recurring members.',
    keyFeatures: [
      'Live Class Schedules & Trainer Bookings',
      'Membership Tier Packages & Online Signup',
      'Virtual Studio Tour & Facility Gallery',
      'Free Trial Session Lead Generator',
      'WhatsApp Direct Booking for Consultations',
    ],
    businessImpact: 'Consistently drives new walk-in trial sessions and recurring monthly membership subscriptions.',
    idealFor: ['Premium Fitness Clubs', 'Yoga & Pilates Studios', 'Luxury Salons & Spas', 'Personal Trainers & Coaches'],
  },
];

export default function IndustriesWeServe() {
  const [activeTab, setActiveTab] = useState<string>('clinics');

  const selected = industries.find((i) => i.id === activeTab) || industries[0];
  const IconComponent = selected.icon;

  return (
    <section id="industries" style={{ padding: '80px 0', position: 'relative', zIndex: 2, background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1060px' }}>
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '720px', margin: '0 auto 36px auto', textAlign: 'center' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Layers size={13} color="var(--primary)" />
            <span>Tailored Industry Solutions</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', marginBottom: '10px' }}>
            Bespoke Websites for Every Business Sector
          </h2>
          <p className="section-subtitle" style={{ fontSize: '14px', lineHeight: 1.55 }}>
            Every industry has unique customer psychology. We design customized digital experiences with the exact features and aesthetics your clients expect.
          </p>
        </div>

        {/* 6 Industry Selector Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '30px',
          }}
          className="industry-chips-container"
        >
          {industries.map((ind) => {
            const isSelected = ind.id === activeTab;
            const IndIcon = ind.icon;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--primary)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 3px 10px rgba(45, 90, 67, 0.2)' : 'var(--shadow-sm)',
                  transition: 'all 0.18s ease',
                }}
              >
                <IndIcon size={14} color={isSelected ? '#FFFFFF' : ind.accentColor} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Card with 40/60 Split on Desktop */}
        <div
          className="glass-card industry-featured-card"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px -10px rgba(24, 35, 30, 0.08), 0 1px 3px rgba(0,0,0,0.02)',
            overflow: 'hidden',
            marginBottom: '36px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 4fr) minmax(0, 6fr)',
            alignItems: 'stretch',
          }}
        >
          {/* 40% Left Region: Image & Short Words */}
          <div
            className="industry-banner-box"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '100%',
              overflow: 'hidden',
              backgroundColor: '#18231E',
            }}
          >
            <img
              src={selected.imageUrl}
              alt={selected.imageAlt}
              width={900}
              height={340}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              loading="lazy"
              decoding="async"
            />
            {/* Cinematic Gradient Overlay with Short Words */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                height: '100%',
                minHeight: '260px',
                background: 'linear-gradient(180deg, rgba(24, 35, 30, 0.25) 0%, rgba(24, 35, 30, 0.82) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px 22px',
              }}
            >
              {/* Top Tag */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  <Sparkles size={12} color="var(--accent)" />
                  <span>{selected.tag}</span>
                </div>
              </div>

              {/* Bottom Short Words: Industry Focus Badge & Subtitle */}
              <div className="industry-banner-content">
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    color: '#FFFFFF',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backdropFilter: 'blur(6px)',
                    marginBottom: '6px',
                  }}
                >
                  Industry Focus • {selected.name}
                </span>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    margin: 0,
                    lineHeight: 1.3,
                    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  }}
                >
                  {selected.subtitle}
                </h3>
              </div>
            </div>
          </div>

          {/* 60% Right Region: Title, Description, Outcome, Features & Actions */}
          <div
            className="industry-card-body"
            style={{
              padding: '26px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '18px',
            }}
          >
            {/* Header: Title & Description */}
            <div>
              <h4 className="font-display" style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.25 }}>
                Engineered for {selected.name}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                {selected.description}
              </p>
            </div>

            {/* Sub-grid: Commercial Outcome + Buttons & Features + Ideal For */}
            <div
              className="industry-content-subgrid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
                gap: '20px',
                alignItems: 'start',
              }}
            >
              {/* Left Column: Commercial Outcome & Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
                    The Commercial Outcome
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                    {selected.businessImpact}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }} className="industry-cta-row">
                  <a
                    href="#contact"
                    className="btn-glow"
                    style={{ padding: '10px 18px', fontSize: '12.5px' }}
                  >
                    <span>Build For {selected.name}</span>
                    <ArrowRight size={13} />
                  </a>

                  <a
                    href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ padding: '10px 14px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <WhatsAppIcon size={15} color="#25D366" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Tailored Features & Ideal For Tags */}
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '7px',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <IconComponent size={14} />
                  </div>
                  <div>
                    <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      Tailored Features Included
                    </h5>
                    <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      Bespoke architecture
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '14px' }}>
                  {selected.keyFeatures.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', fontSize: '12px', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={13} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontWeight: 500, lineHeight: 1.35 }}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal For Badges */}
                <div style={{ paddingTop: '10px', borderTop: '1px solid rgba(232, 225, 213, 0.8)' }}>
                  <span style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '5px' }}>
                    Ideal For:
                  </span>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {selected.idealFor.map((item, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 600,
                          color: 'var(--primary)',
                          background: '#FFFFFF',
                          border: '1px solid var(--border-subtle)',
                          padding: '2px 7px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom Banner: "Don't see your industry?" */}
        <div
          className="industry-bottom-banner"
          style={{
            padding: '18px 24px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
              Don’t see your exact business industry listed here?
            </h4>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: 0 }}>
              We build 100% custom websites from scratch for any ambitious business—from legal practices and manufacturing to automotive and creative studios.
            </p>
          </div>

          <a href="#contact" className="btn-glow" style={{ padding: '10px 20px', fontSize: '12.5px' }}>
            <span>Tell Us About Your Business</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .industry-featured-card {
            display: block !important;
          }
          .industry-banner-box {
            height: auto !important;
            min-height: 190px !important;
          }
          .industry-banner-box img {
            position: absolute !important;
          }
          .industry-banner-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .industry-content-subgrid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .industry-card-body {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 768px) {
          .industry-chips-container {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            padding: 4px 16px 12px 16px !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .industry-chips-container::-webkit-scrollbar {
            display: none;
          }
          .industry-chips-container button {
            flex-shrink: 0 !important;
          }
          .industry-banner-box {
            height: auto !important;
            min-height: 190px !important;
          }
          .industry-banner-content {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .industry-card-body {
            padding: 20px 16px !important;
          }
          .industry-bottom-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
          .industry-bottom-banner a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 600px) {
          .industry-cta-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          .industry-cta-row a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
