'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Calendar,
  ExternalLink,
  RotateCcw,
  Paperclip,
  ArrowRight,
} from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/Icons';

export default function ContactFunnel() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: '',
    budget: '',
    timeline: '',
    description: '',
    referenceLinks: '',
    fileNote: '',
    _hp: '', // Honeypot
    _loadedAt: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ enquiryId: string; devMode?: boolean } | null>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, _loadedAt: Date.now() }));
  }, []);

  const handleStep1Next = () => {
    setErrorMessage(null);
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid work or personal email address.');
      return;
    }
    setStep(2);
  };

  const handleStep2Next = () => {
    setErrorMessage(null);
    if (!formData.services.trim()) {
      setErrorMessage('Please specify the services or features you need.');
      return;
    }
    setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      setErrorMessage('Please provide a brief description of your project goals (at least 15 characters).');
      return;
    }

    setLoading(true);

    try {
      const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztYbcnWUVFZnYWjtZt8IRJoOC__XufTxHzClt7LgN6e9ILmsvX5ToXJVO8PtfNcJc/exec';
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL?.trim() || DEFAULT_GOOGLE_SCRIPT_URL;

      const payload = {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.company,
        websiteType: formData.services,
        estimatedBudget: `${formData.budget || 'Flexible / To be discussed'} (Timeline: ${formData.timeline || 'Flexible'})`,
        projectDescription: `${formData.description}\n\nReference Links: ${formData.referenceLinks || 'None'}\nFile Notes: ${formData.fileNote || 'None'}`,
        preferredContact: formData.phone ? 'whatsapp' : 'email',
        privacyConsent: true,
        _hp: formData._hp,
        _loadedAt: formData._loadedAt,
      };

      let response: Response;
      let data: any;

      try {
        // Attempt direct submission to Google Apps Script first
        response = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        data = await response.json();
      } catch (directErr) {
        // If direct fetch is blocked by CORS/browser extension, fallback to internal API proxy
        response = await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        data = await response.json();
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Failed to dispatch project enquiry.');
      }

      setSuccessResult({
        enquiryId: data.enquiryId || `AS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        devMode: data.devMode,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#84CC16', '#7C3AED', '#FFFFFF'],
        });
      } catch (err) {}
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please reach out via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setErrorMessage(null);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      services: '',
      budget: '',
      timeline: '',
      description: '',
      referenceLinks: '',
      fileNote: '',
      _hp: '',
      _loadedAt: Date.now(),
    });
  };

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        padding: '100px 0 110px 0',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(243, 236, 228, 0.75) 0%, rgba(250, 248, 245, 0.95) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Visual Section Divider Strip */}
      <div
        aria-hidden="true"
        className="contact-divider-pill"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '7px 20px',
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 2px 10px rgba(24, 35, 30, 0.06)',
          zIndex: 5,
          whiteSpace: 'nowrap',
          maxWidth: '92vw',
        }}
      >
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        <span
          className="contact-divider-text"
          style={{
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: 'var(--primary)',
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            flexWrap: 'nowrap',
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>Next Step</span>
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--primary)',
              opacity: 0.45,
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>Project Intake</span>
        </span>
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
      </div>

      <div className="container" style={{ maxWidth: '1120px' }}>
        {/* Section Header with Elevated Backdrop Highlight for Maximum Readability */}
        <div
          className="section-header contact-section-header"
          style={{
            position: 'relative',
            zIndex: 4,
            padding: '32px 36px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 8px 32px rgba(24, 35, 30, 0.05)',
            margin: '0 auto 36px auto',
            maxWidth: '100%',
            textAlign: 'center',
          }}
        >
          <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '14px' }}>
            <Send size={14} color="var(--primary)" />
            <span>Project Intake &amp; Consultation</span>
          </div>
          <h2
            className="section-title contact-headline"
            style={{
              fontSize: 'clamp(2.1rem, 3.6vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              letterSpacing: '-1.2px',
              marginBottom: '12px',
            }}
          >
            Start Your Project With Aatral
          </h2>
          <p
            className="section-subtitle"
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              fontWeight: 500,
              margin: '0 auto',
              maxWidth: '680px',
            }}
          >
            Tell us about your digital goals below. We review every project enquiry personally and respond with a clear proposal, timeline, and quote within 12–24 hours.
          </p>
        </div>

        {/* Form and Sidebar Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
            gap: '28px',
            alignItems: 'stretch',
          }}
          className="brand-manifesto-grid"
        >
          {/* Main 3-Step Multi-Stage Form */}
          <div
            className="glass-card contact-form-card"
            style={{
              padding: 'clamp(26px, 3.5vw, 42px)',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {successResult ? (
              /* Success View */
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: 'var(--primary-soft)',
                    border: '1px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle2 size={38} color="var(--primary)" />
                </div>

                <h3 className="font-display" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Project Brief Received!
                </h3>

                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. A confirmation has been sent to <strong>{formData.email}</strong>. Our team will review your requirements and respond within 12–24 hours.
                </p>

                {successResult.devMode && (
                  <div
                    style={{
                      background: 'var(--primary-soft)',
                      border: '1px dashed var(--primary)',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      marginBottom: '24px',
                      fontSize: '13px',
                      color: 'var(--primary)',
                      textAlign: 'left',
                    }}
                  >
                    💡 <strong>Enquiry Logged:</strong> Your message has been received. Our team will review your requirements and reach out via your preferred channel.
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/918220820236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow"
                    style={{ padding: '12px 24px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <WhatsAppIcon size={16} color="#FFFFFF" />
                    <span>Instant Chat on WhatsApp</span>
                  </a>

                  <button onClick={handleReset} className="btn-secondary" style={{ padding: '12px 20px', fontSize: '14px' }}>
                    <RotateCcw size={15} />
                    <span>Submit Another Project</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Multi-step Form */
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="_hp"
                  className="hp-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                />

                {/* Progress Bar (3 Steps) */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'var(--primary)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        {step}
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {step === 1 ? 'Step 1: Your Contact Coordinates' : step === 2 ? 'Step 2: Service & Scope' : 'Step 3: Project Vision'}
                      </span>
                    </div>

                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Step {step} of 3
                    </span>
                  </div>

                  {/* Visual Bar Track */}
                  <div style={{ height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${(step / 3) * 100}%`,
                        background: 'var(--gradient-accent)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#FEF2F2',
                      border: '1px solid #FCA5A5',
                      color: '#991B1B',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* STEP 1: CONTACT DETAILS */}
                {step === 1 && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">
                        Your Full Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">
                          Work or Personal Email <span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="ramesh@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp (Optional)</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+91 8220820236"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Company or Brand Name (Optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Veloce Motors / Personal Brand"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleStep1Next}
                      className="btn-glow"
                      style={{ width: '100%', padding: '14px', fontSize: '15px', marginTop: '12px' }}
                    >
                      <span>Continue to Service &amp; Budget</span>
                      <ArrowRight size={16} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '16px' }}>
                      <ShieldCheck size={15} color="var(--primary)" />
                      <span>100% Confidential • Privacy Protected • Mutual NDA Available</span>
                    </div>
                  </div>
                )}

                {/* STEP 2: SERVICES & BUDGET (MANUAL TEXT ENTRY) */}
                {step === 2 && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">
                        Services &amp; Requirements <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Website design, online store, redesign, mobile booking portal..."
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Estimated Budget (Optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ₹50,000, $2,000, or Flexible / To be discussed"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Target Launch Timeline (Optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Within 2 weeks, by next month, or Flexible"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }} className="form-action-row">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="btn-secondary"
                        style={{ padding: '14px 24px', fontSize: '14px' }}
                      >
                        &larr; Back
                      </button>

                      <button
                        type="button"
                        onClick={handleStep2Next}
                        className="btn-glow"
                        style={{ flex: 1, padding: '14px', fontSize: '15px' }}
                      >
                        <span>Continue to Project Vision</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '16px' }}>
                      <ShieldCheck size={15} color="var(--primary)" />
                      <span>100% Confidential • Privacy Protected • Mutual NDA Available</span>
                    </div>
                  </div>
                )}

                {/* STEP 3: PROJECT VISION & SUBMIT */}
                {step === 3 && (
                  <div>
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="form-label">
                          Project Description &amp; Vision <span className="req">*</span>
                        </label>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {formData.description.length}/4000
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Tell us about your target audience, core problems you need solved, essential features, and what an ideal outcome looks like..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        maxLength={4000}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Reference Websites or Design Inspiration (Optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. apple.com, linear.app, stripe.com/radar"
                        value={formData.referenceLinks}
                        onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Paperclip size={13} color="var(--primary)" />
                        <span>File Upload / Google Drive Link (Optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Paste link to Figma, brand assets, or brief PDF (Drive, Dropbox, Notion)"
                        value={formData.fileNote}
                        onChange={(e) => setFormData({ ...formData, fileNote: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }} className="form-action-row">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="btn-secondary"
                        style={{ padding: '14px 24px', fontSize: '14px' }}
                      >
                        &larr; Back
                      </button>

                      <button
                        type="submit"
                        className="btn-glow"
                        disabled={loading}
                        style={{ flex: 1, padding: '14px', fontSize: '15px' }}
                      >
                        {loading ? <span>Transmitting Project Brief...</span> : (
                          <>
                            <span>Submit Project Request</span>
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '16px' }}>
                      <ShieldCheck size={15} color="var(--primary)" />
                      <span>100% Confidential • Privacy Protected • Mutual NDA Available</span>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Column: Direct Contact Hub */}
          <div
            className="glass-card contact-sidebar-card"
            style={{
              padding: 'clamp(26px, 3.5vw, 42px)',
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Prefer Direct Communication?
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                Connect directly with our engineering and design desk in Chennai, India:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                {/* Email Direct */}
                <a
                  href="mailto:aatralstudios@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 15px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <Mail size={16} color="var(--primary)" />
                  <span style={{ flex: 1 }}>aatralstudios@gmail.com</span>
                  <ExternalLink size={12} color="var(--text-muted)" />
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 15px',
                    background: 'var(--primary-soft)',
                    border: '1px solid rgba(45, 90, 67, 0.25)',
                    borderRadius: '10px',
                    color: 'var(--primary)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}
                >
                  <WhatsAppIcon size={17} color="#25D366" />
                  <span style={{ flex: 1 }}>WhatsApp Direct: +91 8220820236</span>
                  <ExternalLink size={12} />
                </a>

                {/* Instagram Direct */}
                <a
                  href="https://instagram.com/aatralstudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 15px',
                    background: 'var(--accent-soft)',
                    border: '1px solid rgba(217, 119, 70, 0.25)',
                    borderRadius: '10px',
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <InstagramIcon size={16} />
                  <span style={{ flex: 1 }}>Instagram: @aatralstudios</span>
                  <ExternalLink size={12} />
                </a>

                {/* Book a Discovery Call */}
                <a
                  href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20schedule%20a%20discovery%20call%20for%20my%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '13px 15px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <Calendar size={16} color="var(--accent)" />
                  <span style={{ flex: 1 }}>Book a 20-Min Discovery Call</span>
                  <ExternalLink size={12} color="var(--text-muted)" />
                </a>
              </div>

              {/* Service Standards Trust Pill */}
              <div
                style={{
                  marginTop: '18px',
                  padding: '14px 16px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <WhatsAppIcon size={14} color="#25D366" />
                  <span>Direct WhatsApp channel with senior designer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="var(--primary)" />
                  <span>Clear milestone proposal within 24 hours</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <CheckCircle2 size={14} color="var(--primary)" />
                  <span>Mutual NDA protection for all project details</span>
                </div>
              </div>
            </div>

            {/* Turnaround Guarantee */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--text-secondary)',
                fontSize: '12px',
              }}
            >
              <Clock size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span>
                <strong>12–24h Turnaround:</strong> Every enquiry receives a thoughtful, direct response within 24 hours.
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 900px) {
          .brand-manifesto-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 768px) {
          .contact-section {
            padding: 70px 0 80px 0 !important;
          }
          .contact-section-header {
            padding: 24px 18px !important;
            margin-bottom: 24px !important;
          }
          .contact-form-card,
          .contact-sidebar-card {
            padding: 22px 18px !important;
            border-radius: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .contact-divider-pill {
            padding: 5px 12px !important;
            gap: 6px !important;
            white-space: nowrap !important;
          }
          .contact-divider-text {
            font-size: 9.5px !important;
            letter-spacing: 0.6px !important;
            gap: 5px !important;
            white-space: nowrap !important;
          }
          .contact-headline {
            font-size: clamp(1rem, 4.5vw, 1.65rem) !important;
            letter-spacing: -0.6px !important;
            white-space: nowrap !important;
            line-height: 1.2 !important;
          }
          .contact-section-header {
            padding: 20px 12px !important;
            margin-bottom: 20px !important;
          }
        }
        @media (max-width: 600px) {
          .form-action-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .form-action-row button {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
