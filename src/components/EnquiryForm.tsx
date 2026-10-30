'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Clock,
  Sparkles,
  Shield,
  MessageCircle,
  Video,
  ExternalLink,
  RotateCcw,
  Check,
} from 'lucide-react';
import { InstagramIcon } from '@/components/Icons';
import { EnquiryFormData, EnquiryResponse } from '@/lib/types';
import PrivacyModal from './PrivacyModal';
import AatralLogo from './AatralLogo';

const websiteTypes = [
  'Business / Corporate Website',
  'E-Commerce Online Store',
  'SaaS & Web Application',
  'High-Converting Landing Page',
  'Website Redesign & Revamp',
  'Custom Bespoke Solution',
];

const budgetTiers = [
  '₹20,000 – ₹40,000',
  '₹40,000 – ₹70,000',
  '₹70,000 – ₹1,20,000',
  '₹1,20,000+ (Enterprise)',
];

const contactMethods: Array<{ id: 'email' | 'whatsapp' | 'phone' | 'video'; label: string; icon: React.ElementType }> = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Call', icon: Phone },
  { id: 'video', label: 'Video Call', icon: Video },
];

interface EnquiryFormProps {
  prefill?: {
    websiteType?: string;
    estimatedBudget?: string;
    summary?: string;
  };
}

export default function EnquiryForm({ prefill }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    websiteType: websiteTypes[0],
    estimatedBudget: budgetTiers[1],
    projectDescription: '',
    preferredContact: 'whatsapp',
    privacyConsent: false,
    _hp: '',
    _loadedAt: 0,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<EnquiryResponse | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [funnelStep, setFunnelStep] = useState<1 | 2>(1);
  const [hasPrefill, setHasPrefill] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, _loadedAt: Date.now() }));
  }, []);

  useEffect(() => {
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        websiteType: prefill.websiteType || prev.websiteType,
        estimatedBudget: prefill.estimatedBudget || prev.estimatedBudget,
        projectDescription: prefill.summary
          ? `[Configuration Summary]: ${prefill.summary}\n\nAdditional Details:\n`
          : prev.projectDescription,
      }));
      setHasPrefill(true);
      setFunnelStep(1);
    }
  }, [prefill]);

  const handleStep1Next = () => {
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid work or personal email address.');
      return;
    }
    setErrorMsg(null);
    setFunnelStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      setFunnelStep(1);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      setFunnelStep(1);
      return;
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
      setErrorMsg('Please provide a short description of your project requirements (at least 15 characters).');
      setFunnelStep(2);
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMsg('Please accept our privacy policy to proceed.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: EnquiryResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry. Please try again.');
      }

      setSuccessResult(data);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#84CC16', '#3B82F6', '#0B132B'],
        });
      } catch (err) {
        // Safe confetti fallback
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setErrorMsg(null);
    setFunnelStep(1);
    setHasPrefill(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      businessName: '',
      websiteType: websiteTypes[0],
      estimatedBudget: budgetTiers[1],
      projectDescription: '',
      preferredContact: 'whatsapp',
      privacyConsent: false,
      _hp: '',
      _loadedAt: Date.now(),
    });
  };

  return (
    <section id="enquiry-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <div className="badge-pill" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} color="#2563EB" />
            <span>High-Velocity Lead Engine</span>
          </div>
          <h2 className="section-title">
            Have an Idea? Let&apos;s Build It.
          </h2>
          <p className="section-subtitle">
            Tell us about your requirements below. Our technical director reviews every project brief and provides a tailored
            blueprint and fixed quotation within 12–24 hours.
          </p>
        </div>

        {/* Form & Sidebar Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '36px',
            alignItems: 'start',
          }}
          className="enquiry-layout-grid"
        >
          {/* Main Enquiry Form Card */}
          <div
            className="glass-card"
            style={{
              padding: 'clamp(24px, 4vw, 44px)',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
            }}
            ref={formRef}
          >
            {successResult ? (
              /* Success Confirmation View */
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px auto',
                  }}
                >
                  <CheckCircle size={38} color="#10B981" />
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: '26px', fontWeight: 800, color: '#0B132B', marginBottom: '10px' }}
                >
                  Enquiry Logged Successfully!
                </h3>
                <p style={{ color: '#475569', fontSize: '15px', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your project brief has been logged under{' '}
                  <span style={{ color: '#2563EB', fontWeight: 700 }}>#{successResult.enquiryId}</span>. A confirmation
                  email has been dispatched to <strong>{formData.email}</strong>.
                </p>

                {successResult.devMode && (
                  <div
                    style={{
                      background: '#EFF6FF',
                      border: '1px dashed #BFDBFE',
                      borderRadius: '10px',
                      padding: '14px 18px',
                      marginBottom: '24px',
                      fontSize: '13px',
                      color: '#1E40AF',
                      textAlign: 'left',
                    }}
                  >
                    <strong>💡 Local Simulation Mode:</strong> Enquiry logged locally. To deliver live emails to <code>aatralstudios@gmail.com</code> and the client, add your <code>RESEND_API_KEY</code> in <code>.env.local</code>.
                  </div>
                )}

                <div
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'left',
                    marginBottom: '32px',
                  }}
                >
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748B', fontWeight: 700, marginBottom: '12px' }}>
                    Summary of Submitted Request
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Website Type:</span>
                      <div style={{ color: '#0B132B', fontWeight: 600 }}>{formData.websiteType}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Budget Tier:</span>
                      <div style={{ color: '#16A34A', fontWeight: 700 }}>{formData.estimatedBudget}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Business Name:</span>
                      <div style={{ color: '#0B132B', fontWeight: 600 }}>{formData.businessName || 'Personal'}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Preferred Channel:</span>
                      <div style={{ color: '#0B132B', fontWeight: 600, textTransform: 'capitalize' }}>{formData.preferredContact}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/918220820236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: '12px 24px', fontSize: '14px' }}
                  >
                    <MessageCircle size={18} />
                    <span>Instant Chat on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="btn-secondary"
                    style={{ padding: '12px 20px', fontSize: '14px' }}
                  >
                    <RotateCcw size={16} />
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Lead Form */
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot Spam Guard */}
                <input
                  type="text"
                  name="_hp"
                  className="hp-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._hp}
                  onChange={(e) => setFormData({ ...formData, _hp: e.target.value })}
                />

                {/* Funnel Step Tabs Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #E2E8F0',
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setFunnelStep(1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: funnelStep === 1 ? '#2563EB' : '#64748B',
                        fontWeight: funnelStep === 1 ? 700 : 500,
                        fontSize: '13px',
                      }}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: funnelStep === 1 ? '#2563EB' : '#E2E8F0',
                          color: funnelStep === 1 ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        1
                      </span>
                      <span>Contact Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStep1Next()}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        color: funnelStep === 2 ? '#2563EB' : '#64748B',
                        fontWeight: funnelStep === 2 ? 700 : 500,
                        fontSize: '13px',
                      }}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: funnelStep === 2 ? '#2563EB' : '#E2E8F0',
                          color: funnelStep === 2 ? '#FFFFFF' : '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        2
                      </span>
                      <span>Project Scope &amp; Budget</span>
                    </button>
                  </div>

                  <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>
                    ● 12–24h Turnaround SLA
                  </span>
                </div>

                {/* Estimate Applied Banner */}
                {hasPrefill && (
                  <div
                    style={{
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '13px',
                      color: '#1E40AF',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Sparkles size={16} color="#2563EB" />
                    <span>Configured from Interactive Estimator. Feel free to refine below!</span>
                  </div>
                )}

                {/* Error Banner */}
                {errorMsg && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#DC2626',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      fontSize: '13px',
                    }}
                  >
                    <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>{errorMsg}</div>
                  </div>
                )}

                {/* STEP 1: Personal & Contact Coordinates */}
                {funnelStep === 1 && (
                  <div>
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label">
                        Your Full Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Ramesh Kumar"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid-2">
                      <div className="form-group">
                        <label className="form-label">
                          Work or Personal Email <span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="ramesh@company.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Business Name */}
                    <div className="form-group">
                      <label className="form-label">
                        Company or Startup Name (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Aatral Technologies Pvt Ltd"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="form-group">
                      <label className="form-label">
                        How should we reach you with your proposal?
                      </label>
                      <div className="channel-selector">
                        {contactMethods.map((m) => {
                          const Icon = m.icon;
                          const isActive = formData.preferredContact === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, preferredContact: m.id })}
                              className={`channel-btn ${isActive ? 'active' : ''}`}
                            >
                              <Icon size={16} />
                              <span>{m.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 1 Next Button */}
                    <button
                      type="button"
                      onClick={handleStep1Next}
                      className="btn-glow"
                      style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        marginTop: '10px',
                      }}
                    >
                      <span>Continue to Project Scope</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                )}

                {/* STEP 2: Project Scope & Description */}
                {funnelStep === 2 && (
                  <div>
                    {/* Website Type */}
                    <div className="form-group">
                      <label className="form-label">
                        What type of digital product do you need? <span className="req">*</span>
                      </label>
                      <div className="chip-grid">
                        {websiteTypes.map((type) => (
                          <label key={type} className="chip-option">
                            <input
                              type="radio"
                              name="websiteType"
                              value={type}
                              checked={formData.websiteType === type}
                              onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                            />
                            <div className="chip-box">{type}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Approximate Budget */}
                    <div className="form-group">
                      <label className="form-label">
                        Approximate Budget Tier (INR) <span className="req">*</span>
                      </label>
                      <div className="chip-grid">
                        {budgetTiers.map((tier) => (
                          <label key={tier} className="chip-option">
                            <input
                              type="radio"
                              name="estimatedBudget"
                              value={tier}
                              checked={formData.estimatedBudget === tier}
                              onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                            />
                            <div className="chip-box">{tier}</div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="form-label">
                          Project Description &amp; Scope <span className="req">*</span>
                        </label>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {formData.projectDescription.length}/4000 characters
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Tell us about your target audience, key problems to solve, desired features, reference websites you admire, and completion deadlines..."
                        required
                        maxLength={4000}
                        value={formData.projectDescription}
                        onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      />
                    </div>

                    {/* Privacy Policy Consent */}
                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={formData.privacyConsent}
                          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        />
                        <span>
                          I agree to the confidential processing of my enquiry per the{' '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsPrivacyOpen(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#2563EB',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              padding: 0,
                              fontWeight: 600,
                              font: 'inherit',
                            }}
                          >
                            Aatral Studios Privacy Notice
                          </button>
                          . We never sell or share your data.
                        </span>
                      </label>
                    </div>

                    {/* Submit Actions */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                      <button
                        type="button"
                        onClick={() => setFunnelStep(1)}
                        className="btn-secondary"
                        style={{ padding: '14px 20px', fontSize: '14px' }}
                      >
                        &larr; Back
                      </button>

                      <button
                        type="submit"
                        className="btn-glow"
                        disabled={loading}
                        style={{
                          flex: 1,
                          padding: '14px',
                          fontSize: '15px',
                          opacity: loading ? 0.7 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? (
                          <>
                            <span>Transmitting Brief Securely...</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Submit Project Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p
                      style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#64748B',
                        marginTop: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Shield size={13} color="#16A34A" />
                      <span>Encrypted SSL • Zero Credential Exposure • Protected by Honeypot</span>
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Agency Details & Direct Contact Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Business Contact Card */}
            <div className="glass-card" style={{ padding: '32px 28px', background: '#FFFFFF', borderColor: '#CBD5E1' }}>
              <div style={{ marginBottom: '20px' }}>
                <AatralLogo size="md" variant="color" />
                <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '10px' }}>
                  A Digital Creative Lab Where Ideas Become Websites
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                Prefer direct communication? Connect directly with our engineering desk:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Email */}
                <a
                  href="mailto:aatralstudios@gmail.com"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#0B132B',
                    textDecoration: 'none',
                    padding: '12px 14px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Mail size={16} color="#2563EB" />
                  <span style={{ flex: 1, wordBreak: 'break-all' }}>aatralstudios@gmail.com</span>
                  <ExternalLink size={12} color="#94A3B8" />
                </a>

                {/* Phone */}
                <a
                  href="tel:+918220820236"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#0B132B',
                    textDecoration: 'none',
                    padding: '12px 14px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Phone size={16} color="#2563EB" />
                  <span style={{ flex: 1 }}>+91 8220820236</span>
                  <ExternalLink size={12} color="#94A3B8" />
                </a>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I'd%20like%20to%20discuss%20a%20website%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                  }}
                >
                  <MessageCircle size={16} color="#ffffff" />
                  <span style={{ flex: 1 }}>Direct WhatsApp Chat</span>
                  <ExternalLink size={12} color="#ffffff" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aatralstudios/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#0B132B',
                    textDecoration: 'none',
                    padding: '12px 14px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <InstagramIcon size={16} color="#ec4899" />
                  <span style={{ flex: 1 }}>@aatralstudios</span>
                  <ExternalLink size={12} color="#94A3B8" />
                </a>
              </div>

              {/* Response Time SLA */}
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#475569',
                  fontSize: '12px',
                }}
              >
                <Clock size={16} color="#2563EB" />
                <span>
                  <strong>12–24h Turnaround SLA:</strong> All client enquiries are reviewed promptly by our technical director.
                </span>
              </div>
            </div>

            {/* Chennai Local Business Commitment */}
            <div
              className="glass-card"
              style={{
                padding: '24px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                <Shield size={16} />
                <span>Chennai &amp; Global Standards</span>
              </div>
              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                Based in Chennai, India. We empower ambitious local businesses, startups, and international brands with
                world-class web engineering. We sign mutual NDAs upon request.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </section>
  );
}
