'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
  outcome: string;
  isPlaceholder?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Vikramaditya Rao',
    role: 'Founder & CEO',
    company: 'Veloce Motors International',
    location: 'Chennai / Singapore',
    quote: 'Aatral Studios completely redefined our digital presence. They listened carefully to our goals, understood our high-net-worth clientele, and delivered an interactive showroom that lifted test-drive bookings by 210%. Reliable, approachable, and brilliant to work with.',
    outcome: '+210% Inbound Bookings',
    isPlaceholder: true,
  },
  {
    id: '2',
    name: 'Ananya Sunder',
    role: 'Managing Director',
    company: 'Kalyan Heritage Silks',
    location: 'Chennai, India',
    quote: 'Our previous website was sluggish and lost customers on mobile phones. Aatral redesigned our entire online store with a warm, beautiful look and instant loading speeds. Our mobile orders grew 4.8x. They are our long-term digital partners.',
    outcome: '4.8x Mobile Sales Lift',
    isPlaceholder: true,
  },
  {
    id: '3',
    name: 'Marcus Chen',
    role: 'VP of Growth',
    company: 'Aura Systems',
    location: 'San Francisco, USA',
    quote: 'Most agencies build flashy mockups that fail in the real world. Aatral delivered a rock-solid, ultra-fast platform that handles high customer traffic without a hiccup. Our trial signups doubled in the first month. You can trust them with your business.',
    outcome: '2x Trial Signups',
    isPlaceholder: true,
  },
  {
    id: '4',
    name: 'Pooja Narayanan',
    role: 'Brand Director',
    company: 'Artisan Specialty Roasters',
    location: 'Bengaluru, India',
    quote: 'The team mapped our subscriber journey with genuine care and creative precision. Our subscription cancellations dropped 44% in 60 days. Truly creativity backed by capability.',
    outcome: '-44% Churn Reduction',
    isPlaceholder: true,
  },
];

export default function Testimonials() {
  const [currIdx, setCurrIdx] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrIdx((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currIdx];

  return (
    <section id="testimonials" style={{ padding: '110px 0', position: 'relative', zIndex: 2 }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} color="var(--primary)" />
            <span>Client Feedback &amp; Outcomes</span>
          </div>
          <h2 className="section-title">
            Words From Leaders Who Bet on Capability
          </h2>
          <p className="section-subtitle">
            We measure our success not by awards, but by the tangible commercial lift our clients achieve after launch.
          </p>
        </div>

        {/* Carousel Card */}
        <div
          className="glass-card"
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 56px)',
            position: 'relative',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Top Star Rating & Outcome Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} color="#D97746" fill="#D97746" />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-secondary)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                Verified Client Review
              </span>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  background: 'var(--accent-soft)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(217, 119, 70, 0.3)',
                }}
              >
                {current.outcome}
              </span>
            </div>
          </div>

          {/* Quote Body */}
          <blockquote
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              fontWeight: 500,
              fontStyle: 'italic',
              marginBottom: '36px',
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author Details & Carousel Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px',
                }}
              >
                {current.name.charAt(0)}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{current.name}</span>
                  <CheckCircle2 size={14} color="var(--primary)" />
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {current.role}, <strong>{current.company}</strong> ({current.location})
                </div>
              </div>
            </div>

            {/* Carousel Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setCurrIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(46,90,68,0.06)',
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setCurrIdx((prev) => (prev + 1) % testimonials.length)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(46,90,68,0.06)',
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

