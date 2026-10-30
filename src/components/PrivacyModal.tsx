'use client';

import React from 'react';
import { X, ShieldCheck, Lock, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Privacy &amp; Data Protection Notice
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              color: '#475569',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p>
            At <strong>Aatral Studios</strong>, we take your confidentiality and data privacy with utmost seriousness.
            When you submit a project enquiry through our platform, you are entrusting us with your business vision.
          </p>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563EB', fontWeight: 700, marginBottom: '8px' }}>
              <Lock size={16} />
              <span>How your information is used</span>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '13px' }}>
              <li>To evaluate your project requirements and prepare customized estimates.</li>
              <li>To contact you via your chosen communication channel (Email, WhatsApp, or Phone).</li>
              <li>To generate a formal non-disclosure agreement (NDA) if requested.</li>
            </ul>
          </div>

          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, marginBottom: '8px' }}>
              <EyeOff size={16} />
              <span>Our Commitments to You</span>
            </div>
            <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '13px' }}>
              <li><strong>Zero Spam:</strong> We never sell, lease, or distribute your email or phone number to marketing lists.</li>
              <li><strong>Secure Transmission:</strong> All data is transmitted over encrypted TLS connections directly to our secure inbox.</li>
              <li><strong>Data Erasure:</strong> You can request full erasure of your contact record at any time by emailing <code>aatralstudios@gmail.com</code>.</li>
            </ul>
          </div>

          <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
            Governed under Indian Information Technology Acts and international standard data security guidelines.
          </p>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-glow" onClick={onClose} style={{ padding: '10px 20px', fontSize: '13px' }}>
            I Understand &amp; Agree
          </button>
        </div>
      </div>
    </div>
  );
}
