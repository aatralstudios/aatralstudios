'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactFunnel from '@/components/ContactFunnel';
import SmoothScroll from '@/components/SmoothScroll';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

// Code-splitting heavy Three.js WebGL and lead dock
const ScrollDesignCanvas = dynamic(() => import('@/components/ScrollDesignCanvas'), { ssr: false });
const FloatingLeadDock = dynamic(() => import('@/components/FloatingLeadDock'), { ssr: false });

interface PricingPlan {
  id: string;
  number: string;
  name: string;
  tag: string;
  isPopular?: boolean;
  price: string;
  audience: string;
  delivery: string;
  features: string[];
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'landing-page',
    number: '01',
    name: 'Landing Page Website',
    tag: 'Entry-Level Package',
    price: '₹3,999 – ₹5,999',
    audience: 'For individuals, small businesses and promotional campaigns',
    delivery: '4–7 working days',
    features: [
      'Single-page website',
      'Hero section with strong value proposition',
      'About section introducing your brand',
      'Services / products overview',
      'Contact section with lead capture',
      'Direct WhatsApp chat integration',
      'Responsive design (mobile & desktop)',
      'Basic search engine optimization (SEO)',
      'Live deployment & hosting setup',
    ],
  },
  {
    id: 'starter-business',
    number: '02',
    name: 'Starter Business Website',
    tag: 'Best Entry-Level Business Package',
    price: '₹7,999 – ₹10,999',
    audience: 'For shops, freelancers, small businesses and service providers',
    delivery: '7–12 working days',
    features: [
      'Up to 5 pages (Home, About, Services, Gallery/Portfolio, Contact)',
      'Fully responsive mobile & tablet design',
      'Direct WhatsApp 1-tap ordering & chat',
      'Google Maps store location routing',
      'Interactive contact enquiry form',
      'Basic on-page SEO & meta tags',
      'Social media profile integration',
      'Clean modern layout tailored to brand',
      'Full deployment with SSL security',
    ],
  },
  {
    id: 'professional-business',
    number: '03',
    name: 'Professional Business Website',
    tag: 'Recommended Package',
    isPopular: true,
    price: '₹12,999 – ₹17,999',
    audience: 'For established businesses, clinics, agencies and institutions',
    delivery: '12–18 working days',
    features: [
      'Up to 8 custom pages',
      'Bespoke, original UI/UX design (never generic templates)',
      'Advanced responsive layouts for all viewports',
      'Interactive elements & micro-animations',
      'Multi-field enquiry forms & spam protection',
      'WhatsApp integration with custom greetings',
      'Interactive Google Maps routing',
      'Client testimonials & trust badges',
      'High-resolution portfolio gallery',
      'Google Analytics traffic integration',
      'Performance optimization (sub-second load)',
      'On-page SEO structure & schema setup',
      'Deployment with DNS & free SSL',
    ],
  },
  {
    id: 'premium-business',
    number: '04',
    name: 'Premium Business Website',
    tag: 'Custom Digital Experience',
    price: '₹19,999 – ₹29,999',
    audience: 'For brands that need a more customized digital experience',
    delivery: '3–4 weeks',
    features: [
      'Up to 12 bespoke pages',
      'Fully customized, high-prestige UI/UX design',
      'Advanced interactive components & WebGL motion',
      'Blog or dynamic content system (if scoped)',
      'Advanced multi-step enquiry & quote funnels',
      'Comprehensive SEO foundations & JSON-LD schema',
      'Advanced analytics & conversion event tracking',
      'Ultra-fast asset delivery & performance tuning',
      'Full deployment, domain routing & free SSL',
      'Tailored 3rd-party integrations as required',
      'Comprehensive video handover & admin guide',
    ],
  },
];

export default function PricingClient() {
  const handleScrollToContact = (planName: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <Navbar />

      {/* Global Scroll-Driven 3D Canvas */}
      <ScrollDesignCanvas />

      <main
        id="main-content"
        className="page-main-container"
        tabIndex={-1}
        style={{ position: 'relative', zIndex: 2, paddingTop: '100px' }}
      >
        {/* Breadcrumb Header */}
        <div className="container" style={{ maxWidth: '1160px', paddingTop: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={14} />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Pricing &amp; Packages</span>
          </div>
        </div>

        {/* Section Hero Header */}
        <div className="container" style={{ maxWidth: '1160px', marginBottom: '44px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
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
                marginBottom: '14px',
              }}
            >
              <Sparkles size={13} color="var(--primary)" />
              <span>Transparent Introductory Pricing</span>
            </div>

            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                letterSpacing: '-1px',
                marginBottom: '16px',
              }}
            >
              Detailed Pricing List. <br />
              <span className="gradient-accent">Websites Built Right.</span>
            </h1>

            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              These are suggested introductory prices for our initial client batches—not bloated agency retainers.
              You collaborate 1-on-1 with the actual engineers building your site with zero guesswork and structured milestone sign-offs.
            </p>
          </div>
        </div>

        {/* 2-in-a-Row Pricing Grid (Exactly 2 Cards Per Row) */}
        <div className="container" style={{ maxWidth: '1020px', marginBottom: '56px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '32px',
              alignItems: 'stretch',
              maxWidth: '980px',
              margin: '0 auto',
            }}
            className="pricing-cards-grid"
          >
            {pricingPlans.map((plan) => {
              const whatsappUrl = `https://wa.me/918220820236?text=${encodeURIComponent(
                `Hi Aatral Studios, I am interested in the ${plan.name} (${plan.price}). I'd like to discuss my project requirements!`
              )}`;

              return (
                <div
                  key={plan.id}
                  className={`pricing-card ${plan.isPopular ? 'popular-card' : ''}`}
                  style={{
                    background: '#FFFFFF',
                    border: plan.isPopular
                      ? '2px solid var(--primary)'
                      : '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    padding: '30px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: plan.isPopular
                      ? '0 16px 36px rgba(45, 90, 67, 0.12)'
                      : '0 4px 18px rgba(24, 35, 30, 0.04)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {/* Popular Banner */}
                  {plan.isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-13px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--primary)',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        padding: '4px 14px',
                        borderRadius: 'var(--radius-full)',
                        boxShadow: '0 4px 12px rgba(45, 90, 67, 0.3)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Top Tag & Number */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          color: plan.isPopular ? 'var(--primary)' : 'var(--accent)',
                          background: plan.isPopular ? 'var(--primary-soft)' : 'var(--accent-soft)',
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {plan.tag}
                      </span>

                      <span
                        style={{
                          fontSize: '13px',
                          fontWeight: 800,
                          color: 'var(--text-muted)',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {plan.number}
                      </span>
                    </div>

                    {/* Plan Name */}
                    <h3
                      className="font-display"
                      style={{
                        fontSize: '20px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginBottom: '8px',
                        lineHeight: 1.2,
                      }}
                    >
                      {plan.name}
                    </h3>

                    {/* Audience Subtitle */}
                    <p
                      style={{
                        fontSize: '12.5px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45,
                        marginBottom: '18px',
                        minHeight: '36px',
                      }}
                    >
                      {plan.audience}
                    </p>

                    {/* Price Block */}
                    <div
                      style={{
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: plan.isPopular ? 'rgba(45, 90, 67, 0.05)' : 'var(--bg-secondary)',
                        border: '1px solid var(--border-subtle)',
                        marginBottom: '18px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)',
                          fontWeight: 800,
                          color: plan.isPopular ? 'var(--primary)' : 'var(--text-primary)',
                          lineHeight: 1.1,
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {plan.price}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--text-muted)',
                          fontWeight: 600,
                          marginTop: '4px',
                        }}
                      >
                        Suggested introductory price
                      </div>
                    </div>

                    {/* Delivery Timeline Pill */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        background: 'rgba(217, 119, 70, 0.08)',
                        color: 'var(--accent)',
                        fontSize: '12px',
                        fontWeight: 700,
                        marginBottom: '20px',
                      }}
                    >
                      <Clock size={13} color="var(--accent)" />
                      <span>Delivery: {plan.delivery}</span>
                    </div>

                    {/* Features Checklist */}
                    <div style={{ marginBottom: '24px' }}>
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.6px',
                          color: 'var(--text-muted)',
                          marginBottom: '10px',
                        }}
                      >
                        What’s Included:
                      </div>

                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                        }}
                      >
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                              fontSize: '12.5px',
                              color: 'var(--text-primary)',
                              lineHeight: 1.4,
                            }}
                          >
                            <CheckCircle2
                              size={14}
                              color="var(--primary)"
                              style={{ flexShrink: 0, marginTop: '2px' }}
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions: Start on WhatsApp + Enquire */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={plan.isPopular ? 'btn-glow' : 'btn-secondary'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '11px 16px',
                        fontSize: '13px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <WhatsAppIcon size={15} color={plan.isPopular ? '#FFFFFF' : '#25D366'} />
                      <span>Book on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleScrollToContact(plan.name)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Or request project estimate</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Universal Studio Inclusions Banner */}
        <div className="container" style={{ maxWidth: '1160px', marginBottom: '56px' }}>
          <div
            style={{
              padding: '32px 36px',
              borderRadius: '20px',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="inclusions-banner"
          >
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 28px auto' }}>
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                Included in Every Single Package
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', margin: 0 }}>
                We believe core quality should never be an upsell. Every client receives these studio guarantees.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
              className="inclusions-grid"
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={18} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    100% Responsive Design
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Tested across iPhones, Androids, tablets, and high-res laptops.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={18} color="var(--accent)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Direct Engineer Contact
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Speak directly with the developers creating your code—no bureaucratic delays.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={18} color="var(--primary)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    30 Days Free Support
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    Dedicated post-launch technical assistance for complete peace of mind.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={18} color="var(--accent)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Milestone-Based Signoffs
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    You review and approve each phase before moving forward. Zero surprises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Project Brief Intake Form */}
        <ContactFunnel />
      </main>

      <Footer />
      <FloatingLeadDock />

      <style jsx>{`
        .pricing-cards-grid {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 32px !important;
          max-width: 980px !important;
          margin: 0 auto !important;
        }
        .pricing-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(45, 90, 67, 0.12) !important;
        }
        @media (max-width: 860px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 768px) {
          .page-main-container {
            padding-top: 75px !important;
          }
          .inclusions-banner {
            padding: 24px 20px !important;
          }
          .inclusions-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </SmoothScroll>
  );
}

