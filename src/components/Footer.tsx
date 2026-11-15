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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            marginBottom: '36px',
            alignItems: 'start',
          }}
        >
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div style={{ marginBottom: '14px' }}>
              <AatralLogo size="md" variant="color" />
            </div>
            <p className="footer-tagline" style={{ color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: 1.55, maxWidth: '340px', marginBottom: '16px' }}>
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
              <div>Service Area: Global (Remote-First Engineering)</div>
              <div>Guaranteed Turnaround: 12–24h Feasibility SLA</div>
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
        @media (max-width: 640px) {
          .footer-section {
            padding: 36px 0 20px 0 !important;
          }
          .footer-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 22px !important;
            margin-bottom: 24px !important;
          }
          .footer-tagline {
            display: none !important;
          }
          .footer-col-title {
            margin-bottom: 10px !important;
            font-size: 11.5px !important;
          }
          .footer-coords-grid {
            gap: 7px !important;
            font-size: 12.5px !important;
          }
          .footer-bottom-bar {
            padding-top: 16px !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </footer>
  );
}
