import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { EnquiryFormData } from './types';
import { getAgencyNotificationEmail, getClientConfirmationEmail } from './email-templates';

interface SendEnquiryResult {
  success: boolean;
  message: string;
  devMode?: boolean;
  enquiryId: string;
  error?: string;
}

export async function processAndSendEnquiry(
  data: EnquiryFormData,
  clientIp: string = '127.0.0.1'
): Promise<SendEnquiryResult> {
  // Generate unique human-readable enquiry ID: AS-YEAR-RANDOM
  const enquiryId = `AS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const agencyEmail = process.env.AGENCY_NOTIFICATION_EMAIL || 'aatralstudios@gmail.com';
  const provider = (process.env.EMAIL_PROVIDER || 'resend').toLowerCase();
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  // Generate templates
  const agencyContent = getAgencyNotificationEmail(data, enquiryId, clientIp);
  const clientContent = getClientConfirmationEmail(data, enquiryId);

  // Check if credentials exist
  const hasResend = provider === 'resend' && resendApiKey && resendApiKey !== 're_your_api_key_here';
  const hasSmtp = provider === 'smtp' && smtpUser && smtpPass && smtpPass !== 'your_16_char_gmail_app_password';

  // DEV / SIMULATION FALLBACK: If credentials aren't set up yet, simulate delivery and log nicely
  if (!hasResend && !hasSmtp) {
    console.log('\n===============================================================');
    console.log(`[AATRAL STUDIOS] EMAIL SYSTEM (LOCAL DEV MODE / CREDENTIALS UNSET)`);
    console.log(`Enquiry ID: #${enquiryId}`);
    console.log(`From: ${data.fullName} <${data.email}> | Phone: ${data.phone}`);
    console.log(`Website Type: ${data.websiteType} | Budget: ${data.estimatedBudget}`);
    console.log(`1. [Agency Email Notification] -> Would send to: ${agencyEmail}`);
    console.log(`2. [Client Confirmation Email] -> Would send to: ${data.email}`);
    console.log(`Note: To send live emails, set RESEND_API_KEY or SMTP_USER & SMTP_PASS in .env.local`);
    console.log('===============================================================\n');

    return {
      success: true,
      message: 'Enquiry received successfully! (Simulated locally - credentials not set yet)',
      devMode: true,
      enquiryId,
    };
  }

  // 1. Send via Resend
  if (provider === 'resend' && hasResend) {
    const resend = new Resend(resendApiKey);
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Aatral Studios <onboarding@resend.dev>';

    try {
      // Send notification to Agency
      const agencyPromise = resend.emails.send({
        from: fromAddress,
        to: [agencyEmail],
        replyTo: data.email,
        subject: `🚀 New Project Enquiry: ${data.businessName || data.fullName} - ${data.websiteType} [#${enquiryId}]`,
        html: agencyContent.html,
        text: agencyContent.text,
      });

      // Send confirmation to Client
      const clientPromise = resend.emails.send({
        from: fromAddress,
        to: [data.email],
        subject: `We've received your project enquiry — Aatral Studios [#${enquiryId}]`,
        html: clientContent.html,
        text: clientContent.text,
      });

      const [agencyRes, clientRes] = await Promise.allSettled([agencyPromise, clientPromise]);

      if (agencyRes.status === 'rejected') {
        console.error('[Resend Error - Agency Notification]:', agencyRes.reason);
        throw new Error(`Failed to deliver to agency: ${agencyRes.reason?.message || 'Unknown error'}`);
      }

      if (clientRes.status === 'rejected') {
        console.warn('[Resend Warning - Client Confirmation failed]:', clientRes.reason);
      }

      return {
        success: true,
        message: 'Your project enquiry has been submitted! Check your inbox for confirmation.',
        devMode: false,
        enquiryId,
      };
    } catch (err: unknown) {
      console.error('[Resend Dispatch Failure]:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown email service error';
      return {
        success: false,
        message: 'Email service error. Please contact us directly at aatralstudios@gmail.com or WhatsApp +91 8220820236.',
        error: errorMessage,
        enquiryId,
      };
    }
  }

  // 2. Send via SMTP (Gmail, Brevo, AWS SES, Custom SMTP)
  if (provider === 'smtp' || hasSmtp) {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const fromAddress = process.env.SMTP_FROM_EMAIL || `"Aatral Studios" <${smtpUser}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    try {
      // Send notification to Agency
      await transporter.sendMail({
        from: fromAddress,
        to: agencyEmail,
        replyTo: `${data.fullName} <${data.email}>`,
        subject: `🚀 New Project Enquiry: ${data.businessName || data.fullName} - ${data.websiteType} [#${enquiryId}]`,
        html: agencyContent.html,
        text: agencyContent.text,
      });

      // Send confirmation to Client
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: data.email,
          subject: `We've received your project enquiry — Aatral Studios [#${enquiryId}]`,
          html: clientContent.html,
          text: clientContent.text,
        });
      } catch (clientErr) {
        console.warn('[SMTP Warning - Client Confirmation failed]:', clientErr);
      }

      return {
        success: true,
        message: 'Your project enquiry has been submitted! Check your inbox for confirmation.',
        devMode: false,
        enquiryId,
      };
    } catch (err: unknown) {
      console.error('[SMTP Dispatch Failure]:', err);
      const errorMessage = err instanceof Error ? err.message : 'SMTP delivery error';
      return {
        success: false,
        message: 'Unable to deliver message right now. Please write directly to aatralstudios@gmail.com.',
        error: errorMessage,
        enquiryId,
      };
    }
  }

  return {
    success: false,
    message: 'No valid email configuration found.',
    enquiryId,
  };
}
