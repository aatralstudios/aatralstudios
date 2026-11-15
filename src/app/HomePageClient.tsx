'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProcessTimeline from '@/components/ProcessTimeline';
import WhyUs from '@/components/WhyUs';
import ContactFunnel from '@/components/ContactFunnel';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

// Code-splitting heavy Three.js 3D WebGL canvas out of critical initial JS bundle
const ScrollDesignCanvas = dynamic(() => import('@/components/ScrollDesignCanvas'), {
  ssr: false,
});

// Code-splitting client-only interactive visual enhancement
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

// Code-splitting scroll-triggered lead dock (only appears after 350px scroll)
const FloatingLeadDock = dynamic(() => import('@/components/FloatingLeadDock'), {
  ssr: false,
});

export default function HomePageClient() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      {/* Global Scroll-Driven 3D Design Element that travels across all sections */}
      <ScrollDesignCanvas />

      <main id="main-content" tabIndex={-1} style={{ position: 'relative', zIndex: 2 }}>
        {/* 1. Hero: Positioning & Immediate Value */}
        <Hero />

        {/* 2. 4-Stage Process: How We Work With You */}
        <ProcessTimeline />

        {/* 3. Why Choose Aatral Studios: Value & Commitments */}
        <WhyUs />

        {/* 6. Contact Funnel: Direct Project Brief Intake */}
        <ContactFunnel />
      </main>

      {/* Footer: Studio Coordinates & Direct Links */}
      <Footer />

      {/* Persistent Floating Lead Dock */}
      <FloatingLeadDock />
    </SmoothScroll>
  );
}
