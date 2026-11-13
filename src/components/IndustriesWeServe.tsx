'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Sparkles,
  Briefcase,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
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
  const [currentIndex, setCurrentIndex] = useState<number>(1); // Default to Clinics (index 1)
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);

  const selected = industries[currentIndex];
  const IconComponent = selected.icon;

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsTransitioning(false);
    }, 150);
  };

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
      setIsTransitioning(false);
    }, 150);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + industries.length) % industries.length);
      setIsTransitioning(false);
    }, 150);
  }, []);

  // Automatic Carousel Rotation (4.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section id="industries" style={{ padding: '80px 0', position: 'relative', zIndex: 2, background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1060px' }}>
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '720px', margin: '0 auto 32px auto', textAlign: 'center' }}>
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

        {/* Navigation Arrows & Carousel Slide Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
            width: '100%',
          }}
          className="industry-nav-wrapper"
        >
          {/* Previous Business Type Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Business Type"
            className="industry-arrow-btn"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0,
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronLeft size={19} />
          </button>

          {/* Carousel Slide Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            aria-label="Industry slide navigation"
          >
            {industries.map((ind, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={ind.id}
                  onClick={() => handleSelect(idx)}
                  aria-label={`Go to ${ind.name}`}
                  style={{
                    width: isSelected ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: isSelected ? 'var(--primary)' : 'rgba(24, 35, 30, 0.2)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  title={ind.name}
                />
              );
            })}
          </div>

          {/* Next Business Type Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Business Type"
            className="industry-arrow-btn"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)',
              flexShrink: 0,
              transition: 'all 0.18s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ChevronRight size={19} />
          </button>
        </div>

        {/* Featured Card with Smooth Carousel Transition */}
        <div
          className="glass-card industry-featured-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
            opacity: isTransitioning ? 0.4 : 1,
            transform: isTransitioning ? 'scale(0.995)' : 'scale(1)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
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

          {/* 60% Right Region: Clean, Open Content Hierarchy */}
          <div
            className="industry-card-body"
            style={{
              padding: '30px 34px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '18px',
            }}
          >
            {/* 1. Header Hierarchy: Title & Value Proposition */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: 'var(--primary)',
                  marginBottom: '8px',
                }}
              >
                <IconComponent size={13} />
                <span>Industry Architecture</span>
              </div>

              <h4
                className="font-display"
                style={{
                  fontSize: 'clamp(21px, 2vw, 25px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                  lineHeight: 1.25,
                  letterSpacing: '-0.3px',
                }}
              >
                Engineered for {selected.name}
              </h4>

              <p
                style={{
                  fontSize: '13.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {selected.description}
              </p>
            </div>

            {/* 2. Streamlined Commercial Outcome Banner */}
            <div
              style={{
                padding: '11px 16px',
                background: 'var(--accent-soft)',
                borderLeft: '3px solid var(--accent)',
                borderRadius: '0 8px 8px 0',
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  flexShrink: 0,
                }}
              >
                The Commercial Outcome:
              </span>
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.45,
                }}
              >
                {selected.businessImpact}
              </span>
            </div>

            {/* 3. Core Tailored Features (Clean 2x2 Grid, Zero Box Clutter) */}
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  marginBottom: '12px',
                }}
              >
                Tailored Features Included
              </div>

              <div
                className="industry-features-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '10px 22px',
                }}
              >
                {selected.keyFeatures.slice(0, 4).map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '12.5px',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      color="var(--primary)"
                      style={{ flexShrink: 0, marginTop: '2.5px' }}
                    />
                    <span style={{ fontWeight: 500, lineHeight: 1.4 }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                paddingTop: '4px',
              }}
              className="industry-cta-row"
            >
              <a
                href="#contact"
                className="btn-glow"
                style={{ padding: '11px 22px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '7px' }}
              >
                <span>Build For {selected.name}</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business!"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '11px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '7px' }}
              >
                <WhatsAppIcon size={16} color="#25D366" />
                <span>WhatsApp Quick Chat</span>
              </a>
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
        @media (max-width: 640px) {
          .industry-features-grid {
            grid-template-columns: 1fr !important;
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
