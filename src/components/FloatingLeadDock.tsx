'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';

export default function FloatingLeadDock() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 350px
      if (window.scrollY > 350 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <aside
      className="floating-lead-dock"
      aria-label="Quick Lead Generator Dock"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '50px',
        padding: '8px 12px 8px 16px',
        boxShadow: '0 10px 30px rgba(24, 35, 30, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="dock-status" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 8px rgba(217, 119, 70, 0.4)',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }} className="desktop-nav">
          Start a project
        </span>
      </div>

      <a
        href="#contact"
        className="btn-glow dock-cta"
        style={{
          padding: '8px 16px',
          fontSize: '12px',
          borderRadius: '50px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
      >
        <span>Get Estimate</span>
        <ArrowRight size={13} />
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <a
          href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.4)',
            flexShrink: 0,
          }}
          title="WhatsApp Quick Chat"
          aria-label="WhatsApp Quick Chat"
        >
          <WhatsAppIcon size={18} color="#FFFFFF" />
        </a>

        <button
          onClick={() => setDismissed(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          title="Dismiss"
          aria-label="Dismiss quick dock"
        >
          <X size={15} />
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .floating-lead-dock {
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 24px) !important;
            max-width: 380px !important;
            bottom: max(12px, env(safe-area-inset-bottom)) !important;
            justify-content: space-between !important;
            padding: 6px 8px 6px 12px !important;
            gap: 8px !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .dock-cta {
            padding: 8px 14px !important;
            font-size: 11.5px !important;
            flex: 1 !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </aside>
  );
}
