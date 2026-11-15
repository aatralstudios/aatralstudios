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

  // Keyboard navigation: Escape key closes open mobile menu (WCAG 2.1.1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
    } else {
      window.location.href = id === 'hero' ? '/' : `/#${id}`;
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
      {/* Skip to Main Content Link for Keyboard Users (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavJump(e, 'hero')}
          aria-label="Aatral Studios Homepage"
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
            gap: '20px',
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
            href="/portfolio"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Portfolio
          </a>
          <a
            href="/industries"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Industries
          </a>
          <a
            href="/pricing"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Pricing
          </a>
          <a
            href="/about"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13.5px', fontWeight: 600, transition: 'color 0.18s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            About Us
          </a>
          <a
            href="/faq"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600,
              transition: 'all 0.18s ease',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              background: 'rgba(255, 255, 255, 0.6)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--primary)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            FAQ
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
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '16px 20px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            boxShadow: '0 16px 36px rgba(24, 35, 30, 0.12)',
            maxHeight: 'calc(100vh - 65px)',
            overflowY: 'auto',
          }}
        >
          <a
            href="#process"
            onClick={(e) => handleNavJump(e, 'process')}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            How We Work
          </a>
          <a
            href="/portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            Portfolio
          </a>
          <a
            href="/industries"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            Industries We Serve
          </a>
          <a
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            Pricing
          </a>
          <a
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            About Us
          </a>
          <a
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-item"
            style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '15px', fontWeight: 600, padding: '10px 4px', borderBottom: '1px solid rgba(232, 225, 213, 0.4)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
          >
            FAQ
          </a>
          <a
            href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'var(--primary-soft)',
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '13.5px',
              fontWeight: 600,
              marginTop: '10px',
              minHeight: '44px',
            }}
          >
            <WhatsAppIcon size={16} color="#25D366" />
            <span>Chat on WhatsApp (+91 8220820236)</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavJump(e, 'contact')}
            className="btn-glow"
            style={{ textAlign: 'center', marginTop: '8px', padding: '12px', minHeight: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
