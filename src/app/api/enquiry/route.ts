import { NextRequest, NextResponse } from 'next/server';
import { EnquiryFormData, EnquiryResponse } from '@/lib/types';
import { processAndSendEnquiry } from '@/lib/mailer';

// Simple in-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 5; // max 5 submissions per minute per IP

  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return false;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // 1. Rate limiting check
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: 'Too many requests. Please wait a moment before sending another enquiry.',
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as EnquiryFormData;

    // 2. Anti-spam honeypot check (field that should remain empty)
    if (body._hp && body._hp.trim().length > 0) {
      console.warn(`[SPAM DETECTED] Honeypot triggered from IP ${clientIp}`);
      // Return 200 to deceive the bot without actually sending emails
      return NextResponse.json<EnquiryResponse>({
        success: true,
        message: 'Enquiry received successfully!',
      });
    }

    // 3. Time-to-submit bot check (minimum 1.5 seconds)
    if (body._loadedAt && typeof body._loadedAt === 'number') {
      const elapsedMs = Date.now() - body._loadedAt;
      if (elapsedMs < 1500) {
        console.warn(`[BOT DETECTED] Submitted too rapidly (${elapsedMs}ms) from IP ${clientIp}`);
        return NextResponse.json<EnquiryResponse>(
          {
            success: false,
            message: 'Suspiciously fast submission detected. Please review and try again.',
          },
          { status: 400 }
        );
      }
    }

    // 4. Strict Field Validation
    const errors: string[] = [];

    if (!body.fullName || body.fullName.trim().length < 2) {
      errors.push('Please enter your full name (at least 2 characters).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email.trim())) {
      errors.push('Please provide a valid email address.');
    }

    const cleanPhone = body.phone ? body.phone.replace(/[^0-9]/g, '') : '';
    if (body.phone && body.phone.trim().length > 0 && cleanPhone.length < 8) {
      errors.push('Please provide a valid phone number (at least 8 digits).');
    }

    if (!body.websiteType || body.websiteType.trim().length === 0) {
      errors.push('Please select the type of website required.');
    }

    if (!body.estimatedBudget || body.estimatedBudget.trim().length === 0) {
      errors.push('Please select an estimated budget tier.');
    }

    if (!body.projectDescription || body.projectDescription.trim().length < 10) {
      errors.push('Please provide a brief description of your project (at least 10 characters).');
    }

    if (body.projectDescription && body.projectDescription.length > 4000) {
      errors.push('Project description cannot exceed 4000 characters.');
    }

    if (!body.privacyConsent) {
      errors.push('You must agree to the privacy policy to submit your enquiry.');
    }

    if (errors.length > 0) {
      return NextResponse.json<EnquiryResponse>(
        {
          success: false,
          message: errors[0],
        },
        { status: 400 }
      );
    }

    // 5. Sanitization
    const sanitizedData: EnquiryFormData = {
      fullName: body.fullName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: (body.phone || '').trim(),
      businessName: (body.businessName || '').trim(),
      websiteType: body.websiteType.trim(),
      estimatedBudget: body.estimatedBudget.trim(),
      projectDescription: body.projectDescription.trim(),
      preferredContact: body.preferredContact || 'email',
      privacyConsent: true,
    };

    // 6. Process and Dispatch via Google Apps Script (Free Gmail Gateway)
    const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztYbcnWUVFZnYWjtZt8IRJoOC__XufTxHzClt7LgN6e9ILmsvX5ToXJVO8PtfNcJc/exec';
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || DEFAULT_GOOGLE_SCRIPT_URL;

    if (googleScriptUrl && googleScriptUrl.startsWith('https://script.google.com')) {
      try {
        const gasResponse = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            ...sanitizedData,
            _hp: body._hp,
            _loadedAt: body._loadedAt,
          }),
        });

        const gasData = await gasResponse.json();

        if (gasData.success === false) {
          return NextResponse.json<EnquiryResponse>(
            {
              success: false,
              message: gasData.message || 'Google Apps Script validation failed.',
            },
            { status: 400 }
          );
        }

        return NextResponse.json<EnquiryResponse>({
          success: true,
          message: gasData.message || 'Your project brief has been sent to our Gmail inbox! We will respond within 12–24 hours.',
          enquiryId: gasData.enquiryId || `AS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        });
      } catch (gasErr: unknown) {
        console.error('[Google Apps Script Bridge Error]:', gasErr);
        // Fall through to standard mailer fallback if GAS request failed
      }
    }

    // 7. Fallback to local mailer
    const result = await processAndSendEnquiry(sanitizedData, clientIp);

    if (!result.success) {
      return NextResponse.json<EnquiryResponse>(result, { status: 500 });
    }

    return NextResponse.json<EnquiryResponse>(result, { status: 200 });
  } catch (error: unknown) {
    console.error('[API /api/enquiry Error]:', error);
    const errMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json<EnquiryResponse>(
      {
        success: false,
        message: 'An unexpected error occurred while processing your request. Please try again.',
        error: errMessage,
      },
      { status: 500 }
    );
  }
}
