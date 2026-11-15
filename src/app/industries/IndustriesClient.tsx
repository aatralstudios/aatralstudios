'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import ContactFunnel from '@/components/ContactFunnel';
import SmoothScroll from '@/components/SmoothScroll';
import { Sparkles, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

// Code-splitting heavy Three.js WebGL and deferred dock
const ScrollDesignCanvas = dynamic(() => import('@/components/ScrollDesignCanvas'), { ssr: false });
const FloatingLeadDock = dynamic(() => import('@/components/FloatingLeadDock'), { ssr: false });

export default function IndustriesClient() {
  return (
    <SmoothScroll>
      <Navbar />

      {/* Global Scroll-Driven 3D Canvas */}
      <ScrollDesignCanvas />

      <main id="main-content" className="page-main-container" tabIndex={-1} style={{ position: 'relative', zIndex: 2, paddingTop: '100px' }}>
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
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Industries We Serve</span>
          </div>
        </div>

        {/* Full Interactive Industries Showcase */}
        <IndustriesWeServe isPage={true} />

        {/* Direct Project Intake Form */}
        <ContactFunnel />
      </main>

      <Footer />
      <FloatingLeadDock />

      <style jsx>{`
        @media (max-width: 768px) {
          .page-main-container {
            padding-top: 75px !important;
          }
        }
      `}</style>
    </SmoothScroll>
  );
}
