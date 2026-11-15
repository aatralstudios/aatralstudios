'use client';

import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, ExternalLink } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/Icons';
import PrivacyModal from './PrivacyModal';
import AatralLogo from './AatralLogo';

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="footer-section"
      style={{
        background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '70px 0 32px 0',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '14px' }}>
              <AatralLogo size="md" variant="color" />
            </div>
            <p className="footer-tagline" style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.55, maxWidth: '320px', marginBottom: '16px' }}>
              We design journeys, not just pages. High-craft, high-performance web engineering for growing businesses.
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="https://instagram.com/aatralstudios"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--primary-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                }}
                title="Instagram @aatralstudios"
              >
                <InstagramIcon size={16} />
              </a>

              <a
                href="mailto:aatralstudios@gmail.com"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--primary-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                }}
                title="Email Agency"
              >
                <Mail size={16} />
              </a>

              <a
                href="https://wa.me/918220820236"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--primary-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25D366',
                  textDecoration: 'none',
                }}
                title="WhatsApp Direct: +91 8220820236"
              >
                <WhatsAppIcon size={18} color="#25D366" />
              </a>

              <a
                href="tel:+918220820236"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'var(--primary-soft)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  textDecoration: 'none',
                }}
                title="Phone Call"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* 2-Column Links Row on Mobile (Studio Navigation & What We Build) */}
          <div className="footer-links-row">
            {/* Quick Links */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
                Studio Navigation
              </h4>
              <ul className="footer-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><a href="/#hero" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Top &amp; Overview</a></li>
                <li><a href="/#process" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>How We Work</a></li>
                <li><a href="/portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Portfolio (RaRa Cafe)</a></li>
                <li><a href="/industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Industries We Serve</a></li>
                <li><a href="/#why-us" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Why Choose Us</a></li>
                <li><a href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>About Us (Our Team)</a></li>
                <li><a href="/faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Frequently Asked Questions (FAQ)</a></li>
                <li><a href="/#contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 700 }}>Start a Project &rarr;</a></li>
              </ul>
            </div>

            {/* What We Build */}
            <div className="footer-build-col">
              <h4 className="footer-col-title" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
                What We Build
              </h4>
              <ul className="footer-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                <li>Landing Pages</li>
                <li>Business Websites</li>
                <li>E-Commerce Stores</li>
                <li>3D Web Experiences</li>
                <li>UI/UX Design Systems</li>
                <li>SEO &amp; Performance</li>
              </ul>
            </div>
          </div>

          {/* Direct Coordinates */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title" style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Direct Coordinates
            </h4>
            <div className="footer-coords-grid" style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              <div>Email: <a href="mailto:aatralstudios@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>aatralstudios@gmail.com</a></div>
              <div>Phone / WhatsApp: <a href="https://wa.me/918220820236" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><WhatsAppIcon size={14} color="#25D366" /> +91 8220820236</a></div>
              <div>Instagram: <a href="https://instagram.com/aatralstudios" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>@aatralstudios</a></div>
              <div>Primary Desk: Chennai, Tamil Nadu, India</div>
              <div>Service Area: Global (Remote-First)</div>
              <div>Turnaround: 12–24h Feasibility SLA</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '12.5px',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © 2026 <strong>Aatral Studios</strong>. We design journeys, not just pages. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '12.5px',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Privacy &amp; NDA Notice
            </button>

            <button
              onClick={scrollToTop}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

      <style jsx>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-section {
            padding: 32px 0 20px 0 !important;
          }
          .footer-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 18px !important;
            margin-bottom: 20px !important;
          }
          .footer-tagline {
            display: none !important;
          }
          .footer-links-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
            padding: 12px 0 !important;
            border-top: 1px solid var(--border-subtle) !important;
            border-bottom: 1px solid var(--border-subtle) !important;
          }
          .footer-col-title {
            margin-bottom: 10px !important;
            font-size: 11.5px !important;
          }
          .footer-list {
            gap: 5px !important;
          }
          .footer-list li a,
          .footer-list li {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }
          .footer-contact-col {
            padding-top: 2px !important;
          }
          .footer-coords-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 6px !important;
            font-size: 12px !important;
          }
          .footer-bottom-bar {
            padding-top: 16px !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </footer>
  );
}
