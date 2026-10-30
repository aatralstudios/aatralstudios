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
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '70px 0 32px 0',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '36px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <AatralLogo size="md" variant="color" />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, maxWidth: '320px', marginBottom: '20px' }}>
              We design journeys, not just pages. A full-service web design and development studio combining visual craft with rock-solid engineering.
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

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Studio Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#hero" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Top &amp; Overview</a></li>
              <li><a href="#industries" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>Industries We Serve</a></li>
              <li><a href="#process" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px' }}>How We Work</a></li>
              <li><a href="#contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 700 }}>Start a Project &rarr;</a></li>
            </ul>
          </div>

          {/* What We Build */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              What We Build
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              <li>High-Converting Landing Pages</li>
              <li>Custom Business Websites</li>
              <li>Online Stores &amp; E-Commerce</li>
              <li>Interactive 3D Digital Showrooms</li>
              <li>Brand Identity &amp; UI/UX Systems</li>
              <li>Speed &amp; Search Engine Optimization</li>
            </ul>
          </div>

          {/* Direct Coordinates */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '16px' }}>
              Direct Coordinates
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              <div>Email: <a href="mailto:aatralstudios@gmail.com" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>aatralstudios@gmail.com</a></div>
              <div>Phone / WhatsApp: <a href="https://wa.me/918220820236" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '5px' }}><WhatsAppIcon size={14} color="#25D366" /> +91 8220820236</a></div>
              <div>Instagram: <a href="https://instagram.com/aatralstudios" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>@aatralstudios</a></div>
              <div>Primary Desk: Chennai, Tamil Nadu, India</div>
              <div>Service Area: Global (Remote-First Engineering)</div>
              <div>Guaranteed Turnaround: 12–24h SLA</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
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
    </footer>
  );
}
