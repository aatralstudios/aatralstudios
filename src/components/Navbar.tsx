'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import AatralLogo from './AatralLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const navOffset = 70;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.25s ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : 'rgba(250, 248, 245, 0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid rgba(232, 225, 213, 0.5)',
        boxShadow: scrolled ? '0 4px 20px rgba(24, 35, 30, 0.05)' : 'none',
        padding: scrolled ? '8px 0' : '11px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavJump(e, 'hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <AatralLogo size="sm" variant="color" />
        </a>

        {/* Essential Trust-Building Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          <a
            href="#process"
            onClick={(e) => handleNavJump(e, 'process')}
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            How We Work
          </a>
          <a
            href="#industries"
            onClick={(e) => handleNavJump(e, 'industries')}
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Industries We Serve
          </a>
        </nav>

        {/* Right Conversion Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Direct WhatsApp Pill */}
          <a
            href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-nav"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-soft)',
              border: '1px solid rgba(45, 90, 67, 0.2)',
              color: 'var(--primary)',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.18s ease',
            }}
          >
            <WhatsAppIcon size={14} color="#25D366" />
            <span>WhatsApp</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavJump(e, 'contact')}
            className="btn-glow nav-cta-btn"
            style={{
              padding: '7px 16px',
              fontSize: '12.5px',
              borderRadius: 'var(--radius-full)',
            }}
          >
            <span>Start a Project</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'var(--primary-soft)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
            className="mobile-hamburger"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 16px 36px rgba(24, 35, 30, 0.08)',
          }}
        >
          <a
            href="#process"
            onClick={(e) => handleNavJump(e, 'process')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}
          >
            How We Work
          </a>
          <a
            href="#industries"
            onClick={(e) => handleNavJump(e, 'industries')}
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600 }}
          >
            Industries We Serve
          </a>
          <a
            href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'var(--primary-soft)',
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <WhatsAppIcon size={16} color="#25D366" />
            <span>Chat on WhatsApp (+91 8220820236)</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavJump(e, 'contact')}
            className="btn-glow"
            style={{ textAlign: 'center', marginTop: '4px' }}
          >
            Start a Project
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
        }
        @media (max-width: 600px) {
          .nav-cta-btn {
            padding: 7px 13px !important;
            font-size: 11.5px !important;
          }
        }
        @media (max-width: 380px) {
          .nav-cta-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
