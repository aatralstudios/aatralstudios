'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import ProcessTimeline from '@/components/ProcessTimeline';
import ContactFunnel from '@/components/ContactFunnel';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingLeadDock from '@/components/FloatingLeadDock';
import ScrollDesignCanvas from '@/components/ScrollDesignCanvas';

export default function HomePage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />

      {/* Global Scroll-Driven 3D Design Element that travels across all sections */}
      <ScrollDesignCanvas />
      
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* 1. Hero: Positioning & Immediate Value */}
        <Hero />

        {/* 2. Industries We Serve: Tailored Features for Real Estate, Healthcare, Dining, Retail & Corporate */}
        <IndustriesWeServe />

        {/* 3. 4-Stage Process: How We Work With You */}
        <ProcessTimeline />

        {/* 4. Contact Funnel: Direct Project Brief Intake */}
        <ContactFunnel />
      </main>

      {/* 5. Footer: Studio Coordinates & Direct Links */}
      <Footer />

      {/* Persistent Floating Lead Dock */}
      <FloatingLeadDock />
    </SmoothScroll>
  );
}
