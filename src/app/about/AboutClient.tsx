'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import ContactFunnel from '@/components/ContactFunnel';
import SmoothScroll from '@/components/SmoothScroll';
import { ArrowLeft } from 'lucide-react';

// Code-splitting heavy Three.js WebGL and deferred dock
const ScrollDesignCanvas = dynamic(() => import('@/components/ScrollDesignCanvas'), { ssr: false });
const FloatingLeadDock = dynamic(() => import('@/components/FloatingLeadDock'), { ssr: false });

export default function AboutClient() {
  return (
    <SmoothScroll>
      <Navbar />

      {/* Global Scroll-Driven 3D Canvas */}
      <ScrollDesignCanvas />

      <main id="main-content" tabIndex={-1} style={{ position: 'relative', zIndex: 2, paddingTop: '100px' }}>
        {/* Breadcrumb Header */}
        <div className="container" style={{ maxWidth: '1120px', paddingTop: '16px', marginBottom: '16px' }}>
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
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>About Us</span>
          </div>
        </div>

        {/* Full Team & Mission Section */}
        <AboutUs isPage={true} />

        {/* Direct Project Intake Form */}
        <ContactFunnel />
      </main>

      <Footer />
      <FloatingLeadDock />
    </SmoothScroll>
  );
}
