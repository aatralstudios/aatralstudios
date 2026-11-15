'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IndustriesWeServe from '@/components/IndustriesWeServe';
import ProcessTimeline from '@/components/ProcessTimeline';
import Portfolio from '@/components/Portfolio';
import WhyUs from '@/components/WhyUs';
import AboutUs from '@/components/AboutUs';
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

        {/* 2. 4-Stage Process: How We Work With You */}
        <ProcessTimeline />

        {/* 3. Featured Portfolio Work: Live Client Deployments */}
        <Portfolio />

        {/* 4. Industries We Serve: Tailored Features for Real Estate, Healthcare, Dining, Retail & Corporate */}
        <IndustriesWeServe />

        {/* 5. Why Choose Aatral Studios: Value & Commitments */}
        <WhyUs />

        {/* 6. About Us: A Small Team. Big Digital Ambitions. */}
        <AboutUs />

        {/* 7. Contact Funnel: Direct Project Brief Intake */}
        <ContactFunnel />
      </main>

      {/* 5. Footer: Studio Coordinates & Direct Links */}
      <Footer />

      {/* Persistent Floating Lead Dock */}
      <FloatingLeadDock />
    </SmoothScroll>
  );
}
