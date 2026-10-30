/**
 * ==============================================================================
 * AATRAL STUDIOS — GMAIL INTAKE WEB APP (GOOGLE APPS SCRIPT)
 * ==============================================================================
 * Free, serverless email communication system powered by Google Apps Script
 * and Gmail MailApp service.
 *
 * Primary Recipient: aatralstudios@gmail.com
 * Supports: GitHub Pages, Vercel, Netlify, Next.js, and static websites.
 * ==============================================================================
 */

// Configuration
var CONFIG = {
  RECIPIENT_EMAIL: 'aatralstudios@gmail.com',
  BUSINESS_NAME: 'Aatral Studios',
  WEBSITE_URL: 'https://aatralstudios.com',
  PRIMARY_COLOR: '#2D5A43',
  ACCENT_COLOR: '#D97746',
  BG_COLOR: '#FAF8F5',
  SEND_CLIENT_CONFIRMATION: true, // Send automated acknowledgment to the client
};

/**
 * HTTP GET Handler — Test endpoint to verify the Web App deployment is online
 */
function doGet(e) {
  var response = {
    status: 'online',
    service: CONFIG.BUSINESS_NAME + ' Gmail Gateway',
    recipient: CONFIG.RECIPIENT_EMAIL,
    timestamp: new Date().toISOString(),
    documentation: 'Send an HTTP POST with JSON or form-encoded payload to submit enquiries.'
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTTP POST Handler — Receives, validates, and dispatches form submissions
 */
function doPost(e) {
  // Lock to handle concurrent submissions safely
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // 10s wait for lock
  } catch (lockError) {
    return createJsonResponse(false, 'Server is busy processing enquiries. Please retry in a few seconds.', 429);
  }

  try {
    // 1. Parse incoming payload (supports both JSON body and form parameters)
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        // Fallback to URL-encoded parameters
        data = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 2. Anti-spam honeypot detection
    // The honeypot field '_hp' must be empty; bots routinely fill it
    if (data._hp && String(data._hp).trim().length > 0) {
      Logger.log('[SPAM BLOCKED] Honeypot field triggered: ' + data._hp);
      // Return success to confuse bots without sending any email
      return createJsonResponse(true, 'Enquiry processed successfully.', 200, 'AS-SPAM-PREVENTED');
    }

    // 3. Bot fast-submission detection (minimum 1.5 seconds)
    if (data._loadedAt) {
      var elapsed = Date.now() - Number(data._loadedAt);
      if (elapsed > 0 && elapsed < 1500) {
        Logger.log('[BOT BLOCKED] Submitted too quickly: ' + elapsed + 'ms');
        return createJsonResponse(false, 'Suspiciously rapid submission detected. Please review your details and try again.', 400);
      }
    }

    // 4. Extract and normalize fields
    var fullName = String(data.fullName || data.name || '').trim();
    var email = String(data.email || '').trim().toLowerCase();
    var phone = String(data.phone || '').trim();
    var company = String(data.businessName || data.company || '').trim();
    var services = String(data.websiteType || data.services || data.subject || 'Custom Web Project').trim();
    var budget = String(data.estimatedBudget || data.budget || 'Flexible / To be discussed').trim();
    var timeline = String(data.timeline || 'Flexible').trim();
    var description = String(data.projectDescription || data.description || data.message || '').trim();
    var referenceLinks = String(data.referenceLinks || '').trim();
    var fileNote = String(data.fileNote || '').trim();

    // 5. Server-side validation
    if (!fullName || fullName.length < 2) {
      return createJsonResponse(false, 'Please provide your full name (at least 2 characters).', 400);
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return createJsonResponse(false, 'Please provide a valid email address.', 400);
    }

    if (!description || description.length < 10) {
      return createJsonResponse(false, 'Please describe your project or enquiry (at least 10 characters).', 400);
    }

    if (description.length > 5000) {
      return createJsonResponse(false, 'Project description exceeds 5,000 characters limit.', 400);
    }

    // 6. Generate human-readable Docket ID: AS-YEAR-RANDOM
    var year = new Date().getFullYear();
    var randomNum = Math.floor(1000 + Math.random() * 9000);
    var docketId = 'AS-' + year + '-' + randomNum;
    var submissionDate = new Date();
    var formattedDate = Utilities.formatDate(submissionDate, 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a') + ' IST';

    // 7. Build HTML Email for Aatral Studios Admin
    var adminEmailHtml = buildAdminEmailHtml({
      docketId: docketId,
      fullName: escapeHtml(fullName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      company: escapeHtml(company),
      services: escapeHtml(services),
      budget: escapeHtml(budget),
      timeline: escapeHtml(timeline),
      description: escapeHtml(description).replace(/\n/g, '<br/>'),
      referenceLinks: escapeHtml(referenceLinks),
      fileNote: escapeHtml(fileNote),
      formattedDate: formattedDate,
    });

    var adminEmailText = [
      '==============================================================',
      'NEW PROJECT ENQUIRY — ' + CONFIG.BUSINESS_NAME,
      'Docket ID: #' + docketId,
      'Date: ' + formattedDate,
      '==============================================================',
      '',
      'CLIENT COORDINATES:',
      '• Name: ' + fullName,
      '• Email: ' + email,
      '• Phone: ' + (phone || 'Not provided'),
      '• Company / Brand: ' + (company || 'Not provided'),
      '',
      'PROJECT SCOPE:',
      '• Services: ' + services,
      '• Budget: ' + budget,
      '• Timeline: ' + timeline,
      '',
      'PROJECT DESCRIPTION & GOALS:',
      description,
      '',
      'ADDITIONAL DETAILS:',
      '• Reference Links: ' + (referenceLinks || 'None provided'),
      '• File Upload / Drive: ' + (fileNote || 'None provided'),
      '',
      '==============================================================',
      'Reply directly to this email to reach ' + fullName + ' (' + email + ').'
    ].join('\n');

    // 8. Dispatch notification email to aatralstudios@gmail.com
    var subjectLine = '🚀 New Project Brief: ' + (company || fullName) + ' — ' + services + ' [#' + docketId + ']';

    MailApp.sendEmail({
      to: CONFIG.RECIPIENT_EMAIL,
      replyTo: email,
      subject: subjectLine,
      htmlBody: adminEmailHtml,
      body: adminEmailText,
      name: CONFIG.BUSINESS_NAME + ' Web Intake',
    });

    Logger.log('[SUCCESS] Notification sent to ' + CONFIG.RECIPIENT_EMAIL + ' for #' + docketId);

    // 9. Send automated confirmation acknowledgment to the client (optional)
    if (CONFIG.SEND_CLIENT_CONFIRMATION && email) {
      try {
        var clientEmailHtml = buildClientConfirmationHtml({
          docketId: docketId,
          fullName: escapeHtml(fullName),
          services: escapeHtml(services),
          formattedDate: formattedDate,
        });

        MailApp.sendEmail({
          to: email,
          replyTo: CONFIG.RECIPIENT_EMAIL,
          subject: "We've received your project enquiry — " + CONFIG.BUSINESS_NAME + " [#" + docketId + "]",
          htmlBody: clientEmailHtml,
          name: CONFIG.BUSINESS_NAME,
        });

        Logger.log('[SUCCESS] Client confirmation sent to ' + email);
      } catch (clientEmailErr) {
        // Non-blocking: log and continue even if client confirmation fails
        Logger.log('[WARN] Client confirmation skipped: ' + clientEmailErr.message);
      }
    }

    // 10. Return clean JSON response
    return createJsonResponse(true, 'Your project enquiry has been submitted! Our team will review your requirements and respond within 12–24 hours.', 200, docketId);

  } catch (error) {
    Logger.log('[ERROR in doPost]: ' + error.toString());
    return createJsonResponse(false, 'An unexpected error occurred while processing your enquiry: ' + error.message, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Creates structured JSON responses with CORS headers
 */
function createJsonResponse(success, message, statusCode, enquiryId) {
  var output = {
    success: success,
    message: message,
    status: statusCode || (success ? 200 : 400),
    enquiryId: enquiryId || null,
    timestamp: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Escapes HTML entities to prevent email body script/markup injection
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Builds the professional Agency Notification HTML email
 */
function buildAdminEmailHtml(p) {
  var cleanPhone = p.phone ? p.phone.replace(/[^0-9]/g, '') : '';
  var waLink = cleanPhone ? 'https://wa.me/' + cleanPhone : '';

  return '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>' +
    '<body style="margin:0;padding:24px 16px;background-color:#F5EFE6;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#18231E;">' +
      '<div style="max-width:620px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);border:1px solid #E8E1D5;">' +
        
        // Header
        '<div style="background:' + CONFIG.PRIMARY_COLOR + ';padding:28px 32px;color:#FFFFFF;">' +
          '<div style="display:inline-block;padding:3px 10px;background:rgba(255,255,255,0.18);border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;color:#FFFFFF;margin-bottom:8px;">' +
            'New Project Intake' +
          '</div>' +
          '<h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.4px;color:#FFFFFF;line-height:1.2;">' +
            p.fullName + ' — ' + (p.company ? p.company + ' &bull; ' : '') + p.services +
          '</h1>' +
          '<div style="margin-top:8px;font-size:12px;opacity:0.85;color:#E8E1D5;">' +
            'Docket <strong style="color:#FFFFFF;">#' + p.docketId + '</strong> &bull; ' + p.formattedDate +
          '</div>' +
        '</div>' +

        // Body Content
        '<div style="padding:28px 32px;">' +
          
          // Section: Client Coordinates
          '<h3 style="margin:0 0 12px 0;font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:' + CONFIG.ACCENT_COLOR + ';font-weight:800;">' +
            'Client Contact Details' +
          '</h3>' +
          '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13.5px;">' +
            '<tr><td style="padding:7px 0;color:#637069;width:130px;">Full Name:</td><td style="padding:7px 0;font-weight:700;color:#18231E;">' + p.fullName + '</td></tr>' +
            '<tr><td style="padding:7px 0;color:#637069;">Email Address:</td><td style="padding:7px 0;"><a href="mailto:' + p.email + '" style="color:' + CONFIG.PRIMARY_COLOR + ';font-weight:700;text-decoration:none;">' + p.email + '</a></td></tr>' +
            '<tr><td style="padding:7px 0;color:#637069;">Phone / WhatsApp:</td><td style="padding:7px 0;">' +
              (p.phone ? ('<strong>' + p.phone + '</strong>' + (waLink ? ' &bull; <a href="' + waLink + '" style="color:#25D366;text-decoration:none;font-weight:700;">Open WhatsApp &rarr;</a>' : '')) : '<span style="color:#9CA3AF;">Not provided</span>') +
            '</td></tr>' +
            '<tr><td style="padding:7px 0;color:#637069;">Company / Brand:</td><td style="padding:7px 0;color:#18231E;">' + (p.company || '<span style="color:#9CA3AF;">Not specified</span>') + '</td></tr>' +
          '</table>' +

          // Section: Project Parameters
          '<h3 style="margin:0 0 12px 0;font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:' + CONFIG.ACCENT_COLOR + ';font-weight:800;">' +
            'Project Scope &amp; Budget' +
          '</h3>' +
          '<div style="background:#FAF8F5;border:1px solid #E8E1D5;border-radius:12px;padding:16px;margin-bottom:24px;">' +
            '<div style="margin-bottom:8px;"><strong>Service Required:</strong> <span style="color:' + CONFIG.PRIMARY_COLOR + ';font-weight:700;">' + p.services + '</span></div>' +
            '<div style="margin-bottom:8px;"><strong>Estimated Budget:</strong> ' + p.budget + '</div>' +
            '<div><strong>Target Timeline:</strong> ' + p.timeline + '</div>' +
          '</div>' +

          // Section: Project Message / Vision
          '<h3 style="margin:0 0 12px 0;font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:' + CONFIG.ACCENT_COLOR + ';font-weight:800;">' +
            'Project Vision &amp; Requirements' +
          '</h3>' +
          '<div style="background:#FFFFFF;border:1px solid #E8E1D5;border-left:4px solid ' + CONFIG.PRIMARY_COLOR + ';border-radius:8px;padding:16px;font-size:14px;line-height:1.6;color:#18231E;margin-bottom:24px;">' +
            p.description +
          '</div>' +

          // Reference Links
          (p.referenceLinks ? (
            '<div style="margin-bottom:14px;font-size:13px;">' +
              '<strong>Reference / Inspiration Links:</strong> ' +
              '<span style="color:#4B5563;">' + p.referenceLinks + '</span>' +
            '</div>'
          ) : '') +

          // File note
          (p.fileNote ? (
            '<div style="margin-bottom:24px;font-size:13px;">' +
              '<strong>File Upload / Assets Link:</strong> ' +
              '<span style="color:#4B5563;">' + p.fileNote + '</span>' +
            '</div>'
          ) : '') +

          // Reply Action Button
          '<div style="text-align:center;padding-top:16px;border-top:1px solid #E8E1D5;">' +
            '<a href="mailto:' + p.email + '?subject=Re:%20Your%20Project%20Enquiry%20with%20Aatral%20Studios%20%5B%23' + p.docketId + '%5D" style="display:inline-block;padding:12px 28px;background:' + CONFIG.PRIMARY_COLOR + ';color:#FFFFFF;text-decoration:none;border-radius:30px;font-size:14px;font-weight:700;">' +
              'Reply to ' + p.fullName + ' &rarr;' +
            '</a>' +
          '</div>' +

        '</div>' +

        // Footer
        '<div style="background:#FAF8F5;padding:16px 32px;border-top:1px solid #E8E1D5;font-size:11.5px;color:#637069;text-align:center;">' +
          'This email was automatically generated by ' + CONFIG.BUSINESS_NAME + ' Web Intake Gateway.<br/>' +
          'Recipient: ' + CONFIG.RECIPIENT_EMAIL + ' &bull; Authenticated Gmail MailApp Delivery.' +
        '</div>' +

      '</div>' +
    '</body></html>';
}

/**
 * Builds the Client Confirmation HTML email
 */
function buildClientConfirmationHtml(p) {
  return '<!DOCTYPE html>' +
    '<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>' +
    '<body style="margin:0;padding:24px 16px;background-color:#F5EFE6;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#18231E;">' +
      '<div style="max-width:580px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.06);border:1px solid #E8E1D5;">' +
        
        '<div style="background:' + CONFIG.PRIMARY_COLOR + ';padding:28px 32px;color:#FFFFFF;text-align:center;">' +
          '<h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.3px;color:#FFFFFF;">' +
            CONFIG.BUSINESS_NAME +
          '</h1>' +
          '<div style="margin-top:6px;font-size:12px;color:#E8E1D5;">We design journeys, not just pages.</div>' +
        '</div>' +

        '<div style="padding:28px 32px;">' +
          '<h2 style="margin:0 0 12px 0;font-size:18px;font-weight:800;color:#18231E;">' +
            'Project Brief Received, ' + p.fullName + '!' +
          '</h2>' +
          '<p style="font-size:14px;color:#4B5563;line-height:1.6;margin:0 0 16px 0;">' +
            'Thank you for considering ' + CONFIG.BUSINESS_NAME + '. Your project brief has been logged under docket <strong style="color:' + CONFIG.ACCENT_COLOR + ';">#' + p.docketId + '</strong>.' +
          '</p>' +
          '<p style="font-size:14px;color:#4B5563;line-height:1.6;margin:0 0 20px 0;">' +
            'Our engineering and design desk is reviewing your requirements. You will receive a thoughtful response with estimated scope, timeline, and proposal within <strong>12–24 hours</strong>.' +
          '</p>' +

          '<div style="background:#FAF8F5;border:1px solid #E8E1D5;border-radius:12px;padding:16px;margin-bottom:24px;font-size:13px;">' +
            '<div><strong>Scope Topic:</strong> ' + p.services + '</div>' +
            '<div style="margin-top:4px;"><strong>Received:</strong> ' + p.formattedDate + '</div>' +
            '<div style="margin-top:4px;"><strong>Confidentiality:</strong> Covered by strict NDA &amp; client privacy policy.</div>' +
          '</div>' +

          '<div style="text-align:center;">' +
            '<p style="font-size:12.5px;color:#637069;margin-bottom:12px;">Need an urgent discussion?</p>' +
            '<a href="https://wa.me/918220820236?text=Hi%20Aatral%20Studios,%20I%20just%20submitted%20project%20brief%20%23' + p.docketId + '" style="display:inline-block;padding:10px 22px;background:#25D366;color:#FFFFFF;text-decoration:none;border-radius:30px;font-size:13px;font-weight:700;">' +
              'Instant Chat on WhatsApp &rarr;' +
            '</a>' +
          '</div>' +
        '</div>' +

        '<div style="background:#FAF8F5;padding:16px 32px;border-top:1px solid #E8E1D5;font-size:11.5px;color:#637069;text-align:center;">' +
          'Aatral Studios &bull; Chennai, Tamil Nadu, India &bull; ' + CONFIG.RECIPIENT_EMAIL +
        '</div>' +

      '</div>' +
    '</body></html>';
}

