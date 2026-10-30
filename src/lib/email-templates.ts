import { EnquiryFormData } from './types';

const AGENCY_NAME = 'Aatral Studios';
const AGENCY_EMAIL = 'aatralstudios@gmail.com';
const AGENCY_PHONE = '+91 8220820236';
const AGENCY_PHONE_CLEAN = '918220820236';
const AGENCY_INSTAGRAM = 'https://instagram.com/aatralstudios';

export function getAgencyNotificationEmail(data: EnquiryFormData, enquiryId: string, clientIp: string) {
  const formattedDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const cleanPhone = data.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Enquiry - ${AGENCY_NAME}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d13; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 620px; margin: 0 auto; background: #121622; border: 1px solid #232b3e; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 32px 28px; text-align: left; border-bottom: 1px solid #3730a3; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(99, 102, 241, 0.25); border: 1px solid #818cf8; color: #c7d2fe; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 20px; margin-bottom: 12px; }
    .title { color: #ffffff; font-size: 24px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.5px; }
    .subtitle { color: #a5b4fc; font-size: 14px; margin: 0; }
    .content { padding: 30px 28px; }
    .info-card { background: #181f30; border: 1px solid #252f47; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .grid { width: 100%; border-collapse: collapse; }
    .grid td { padding: 10px 0; vertical-align: top; border-bottom: 1px solid #232d44; }
    .grid tr:last-child td { border-bottom: none; }
    .label { color: #94a3b8; font-size: 13px; font-weight: 600; width: 38%; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #f8fafc; font-size: 15px; font-weight: 500; }
    .highlight { color: #818cf8; font-weight: 700; }
    .description-box { background: #0c101a; border: 1px solid #222c42; border-left: 4px solid #6366f1; border-radius: 8px; padding: 16px; margin: 16px 0 24px 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; }
    .btn-group { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 24px; }
    .btn { display: inline-block; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; text-align: center; }
    .btn-primary { background: #4f46e5; color: #ffffff !important; }
    .btn-whatsapp { background: #10b981; color: #ffffff !important; }
    .btn-secondary { background: #232c40; color: #cbd5e1 !important; border: 1px solid #334155; }
    .footer { background: #0c101a; padding: 20px 28px; text-align: center; border-top: 1px solid #1f273b; font-size: 12px; color: #64748b; }
    .meta-tag { display: inline-block; background: #172033; padding: 3px 8px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #94a3b8; margin: 2px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">🔥 High-Priority Lead</span>
      <h1 class="title">New Project Enquiry</h1>
      <p class="subtitle">Reference ID: <strong>#${enquiryId}</strong> • Received on ${formattedDate} (IST)</p>
    </div>
    
    <div class="content">
      <div class="info-card">
        <table class="grid">
          <tr>
            <td class="label">Client Name</td>
            <td class="value"><strong>${data.fullName}</strong></td>
          </tr>
          <tr>
            <td class="label">Business / Brand</td>
            <td class="value">${data.businessName || '<em>Not provided (Individual)</em>'}</td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="value"><a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: underline;">${data.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone / Mobile</td>
            <td class="value"><a href="tel:${data.phone}" style="color: #60a5fa; text-decoration: underline;">${data.phone}</a></td>
          </tr>
          <tr>
            <td class="label">Required Website</td>
            <td class="value"><span class="highlight">${data.websiteType}</span></td>
          </tr>
          <tr>
            <td class="label">Estimated Budget</td>
            <td class="value" style="color: #34d399; font-weight: 700;">${data.estimatedBudget}</td>
          </tr>
          <tr>
            <td class="label">Preferred Contact</td>
            <td class="value" style="text-transform: capitalize;">${data.preferredContact}</td>
          </tr>
        </table>
      </div>

      <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: #a5b4fc; letter-spacing: 0.5px; margin-bottom: 8px;">
        📝 Project Scope & Requirements
      </div>
      <div class="description-box">${data.projectDescription}</div>

      <div class="btn-group">
        <a href="mailto:${data.email}?subject=Regarding%20Your%20Project%20Enquiry%20-%20Aatral%20Studios" class="btn btn-primary">✉️ Reply via Email</a>
        <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp">💬 Open WhatsApp</a>
        <a href="tel:${data.phone}" class="btn btn-secondary">📞 Call Client</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 8px 0;">Captured securely by <strong>${AGENCY_NAME} Lead Intake Engine</strong></p>
      <div>
        <span class="meta-tag">IP: ${clientIp}</span>
        <span class="meta-tag">ID: ${enquiryId}</span>
        <span class="meta-tag">Security: Honeypot Passed</span>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
NEW PROJECT ENQUIRY - ${AGENCY_NAME}
Ref ID: #${enquiryId}
Date: ${formattedDate}

CLIENT DETAILS:
- Name: ${data.fullName}
- Business: ${data.businessName || 'N/A'}
- Email: ${data.email}
- Phone: ${data.phone}
- Preferred Contact: ${data.preferredContact}

PROJECT DETAILS:
- Website Type: ${data.websiteType}
- Estimated Budget: ${data.estimatedBudget}

PROJECT DESCRIPTION:
${data.projectDescription}

Quick Links:
- Reply Email: mailto:${data.email}
- WhatsApp: ${whatsappUrl}
- Call: tel:${data.phone}
  `.trim();

  return { html, text };
}

export function getClientConfirmationEmail(data: EnquiryFormData, enquiryId: string) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting ${AGENCY_NAME}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090e; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #0f131d; border: 1px solid #1e2638; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.6); }
    .header { background: radial-gradient(circle at top right, #312e81 0%, #111827 70%); padding: 36px 32px; border-bottom: 1px solid #232c40; }
    .brand-logo { font-size: 24px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: uppercase; margin-bottom: 8px; display: inline-flex; align-items: center; gap: 8px; }
    .brand-accent { color: #6366f1; }
    .header-tagline { color: #94a3b8; font-size: 14px; margin: 0; }
    .content { padding: 32px; }
    .greeting { font-size: 20px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 16px; }
    .intro { font-size: 15px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px; }
    
    .timeline { background: #141a27; border: 1px solid #202a3d; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .timeline-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #818cf8; margin-bottom: 14px; }
    .step { display: flex; margin-bottom: 12px; }
    .step:last-child { margin-bottom: 0; }
    .step-num { width: 24px; height: 24px; border-radius: 50%; background: #4f46e5; color: #ffffff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; }
    .step-text { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
    .step-text strong { color: #ffffff; }

    .summary-card { background: #0c101a; border: 1px solid #1a2233; border-radius: 10px; padding: 18px; margin: 24px 0; }
    .summary-header { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
    .summary-row { font-size: 13px; padding: 6px 0; border-bottom: 1px solid #151d2d; display: flex; justify-content: space-between; }
    .summary-row:last-child { border-bottom: none; }
    .summary-k { color: #64748b; }
    .summary-v { color: #e2e8f0; font-weight: 600; text-align: right; }

    .contact-box { background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%); border: 1px solid #312e81; border-radius: 12px; padding: 20px; margin-top: 28px; text-align: center; }
    .contact-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 6px; }
    .contact-sub { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .contact-links { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
    .contact-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #818cf8; text-decoration: none; padding: 8px 14px; background: #171d2c; border: 1px solid #28334b; border-radius: 6px; }
    
    .footer { background: #07090e; padding: 24px 32px; text-align: center; border-top: 1px solid #161c29; font-size: 12px; color: #64748b; }
    .social-links { margin: 12px 0; }
    .social-links a { color: #818cf8; text-decoration: none; margin: 0 8px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
        <tr>
          <!-- 6-block step logo mark -->
          <td style="padding-right: 14px; vertical-align: middle;">
            <table cellpadding="0" cellspacing="2" border="0">
              <tr>
                <td style="width: 8px; height: 8px;"></td>
                <td style="width: 8px; height: 8px;"></td>
                <td style="width: 8px; height: 8px; background: #84cc16; border-radius: 2px;"></td>
              </tr>
              <tr>
                <td style="width: 8px; height: 8px;"></td>
                <td style="width: 8px; height: 8px; background: #2563eb; border-radius: 2px;"></td>
                <td style="width: 8px; height: 8px; background: #2563eb; border-radius: 2px;"></td>
              </tr>
              <tr>
                <td style="width: 8px; height: 8px; background: #2563eb; border-radius: 2px;"></td>
                <td style="width: 8px; height: 8px; background: #2563eb; border-radius: 2px;"></td>
                <td style="width: 8px; height: 8px; background: #2563eb; border-radius: 2px;"></td>
              </tr>
            </table>
          </td>
          <td style="vertical-align: middle;">
            <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff; text-transform: lowercase; line-height: 1;">
              aatral
            </div>
            <div style="font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-top: 3px;">
              S T U D I O S
            </div>
          </td>
        </tr>
      </table>
      <p class="header-tagline">Web Design &amp; Digital Engineering Excellence</p>
    </div>

    <div class="content">
      <h2 class="greeting">Hi ${data.fullName},</h2>
      <p class="intro">
        Thank you for reaching out to <strong>${AGENCY_NAME}</strong>! We have received your project enquiry and are excited to explore how we can bring your vision to life.
      </p>

      <div class="timeline">
        <div class="timeline-title">🚀 What happens next?</div>
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-text"><strong>Requirement Review:</strong> Our technical &amp; design leads are reviewing your project scope.</div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-text"><strong>Quick Discovery:</strong> We will reach out within <strong>12 to 24 hours</strong> via your preferred channel (<strong>${data.preferredContact}</strong>).</div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-text"><strong>Roadmap &amp; Estimate:</strong> We'll provide a crystal-clear roadmap, wireframe concept, and customized proposal.</div>
        </div>
      </div>

      <div class="summary-card">
        <div class="summary-header">Enquiry Summary (Ref #${enquiryId})</div>
        <div class="summary-row">
          <span class="summary-k">Website Type</span>
          <span class="summary-v">${data.websiteType}</span>
        </div>
        <div class="summary-row">
          <span class="summary-k">Estimated Budget</span>
          <span class="summary-v">${data.estimatedBudget}</span>
        </div>
        <div class="summary-row">
          <span class="summary-k">Business / Brand</span>
          <span class="summary-v">${data.businessName || 'Personal Project'}</span>
        </div>
        <div class="summary-row">
          <span class="summary-k">Contact Channel</span>
          <span class="summary-v" style="text-transform: capitalize;">${data.preferredContact}</span>
        </div>
      </div>

      <div class="contact-box">
        <div class="contact-title">Need immediate assistance or have urgent timelines?</div>
        <div class="contact-sub">You can connect with our direct design desk anytime:</div>
        <div class="contact-links">
          <a href="https://wa.me/${AGENCY_PHONE_CLEAN}" class="contact-link" target="_blank">💬 WhatsApp Direct</a>
          <a href="tel:${AGENCY_PHONE}" class="contact-link">📞 ${AGENCY_PHONE}</a>
          <a href="${AGENCY_INSTAGRAM}" class="contact-link" target="_blank">📸 @aatralstudios</a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;"><strong>${AGENCY_NAME}</strong> • Modern Web &amp; Digital Solutions</p>
      <div class="social-links">
        <a href="mailto:${AGENCY_EMAIL}">${AGENCY_EMAIL}</a> •
        <a href="tel:${AGENCY_PHONE}">${AGENCY_PHONE}</a> •
        <a href="${AGENCY_INSTAGRAM}">Instagram: @aatralstudios</a>
      </div>
      <p style="margin: 8px 0 0 0; color: #475569; font-size: 11px;">
        You received this email because you submitted an enquiry at Aatral Studios. If this wasn't you, please disregard this email.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hi ${data.fullName},

Thank you for reaching out to ${AGENCY_NAME}! We have received your project enquiry (Ref: #${enquiryId}).

WHAT HAPPENS NEXT:
1. Requirement Review: Our technical & design leads are reviewing your project scope.
2. Quick Discovery: We will reach out within 12 to 24 hours via your preferred contact channel (${data.preferredContact}).
3. Roadmap & Estimate: We'll provide a crystal-clear proposal and technical breakdown.

YOUR ENQUIRY DETAILS:
- Website Type: ${data.websiteType}
- Estimated Budget: ${data.estimatedBudget}
- Business: ${data.businessName || 'Personal Project'}
- Preferred Contact: ${data.preferredContact}

NEED IMMEDIATE ASSISTANCE?
- Direct WhatsApp / Phone: ${AGENCY_PHONE}
- Email: ${AGENCY_EMAIL}
- Instagram: @aatralstudios

Warm regards,
Team Aatral Studios
Web Design & Digital Engineering Excellence
  `.trim();

  return { html, text };
}
