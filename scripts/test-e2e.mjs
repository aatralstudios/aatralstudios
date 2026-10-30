import { spawn, execSync } from 'node:child_process';

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const results = [];

function recordTest(suite, name, passed, detail = '') {
  results.push({ suite, name, passed, detail });
  const icon = passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
  console.log(`  ${icon} [${suite}] ${name} ${detail ? `(${detail})` : ''}`);
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

function killProcess(child) {
  if (!child || !child.pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${child.pid} /t /f`, { stdio: 'ignore' });
    } else {
      child.kill('SIGTERM');
    }
  } catch {
    // Already terminated
  }
}

async function run() {
  console.log(`\n${colors.bold}${colors.cyan}==============================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}  Aatral Studios — End-to-End Test Suite      ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}==============================================${colors.reset}\n`);

  // Step 1: Type check
  console.log(`${colors.bold}1. Checking TypeScript Types...${colors.reset}`);
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    recordTest('Type Safety', 'TypeScript compilation', true, '0 errors');
  } catch (err) {
    recordTest('Type Safety', 'TypeScript compilation', false, err.message);
    process.exit(1);
  }

  // Step 2: Ensure Production Build exists
  console.log(`\n${colors.bold}2. Verifying Production Build...${colors.reset}`);
  try {
    execSync('npm run build', { stdio: 'inherit' });
    recordTest('Production Build', 'Next.js production build', true, 'All routes compiled');
  } catch (err) {
    recordTest('Production Build', 'Next.js production build', false, err.message);
    process.exit(1);
  }

  // Step 3: Start Server
  console.log(`\n${colors.bold}3. Starting Production Server on port ${PORT}...${colors.reset}`);
  const server = spawn('npx next start -p ' + PORT, {
    shell: true,
    stdio: 'pipe',
  });

  server.stderr.on('data', (d) => {
    const msg = d.toString();
    if (!msg.includes('ExperimentalWarning')) {
      // ignore warnings
    }
  });

  const isReady = await waitForServer(`${BASE_URL}/`);
  if (!isReady) {
    killProcess(server);
    console.error(`${colors.red}Server failed to start on port ${PORT}.${colors.reset}`);
    process.exit(1);
  }
  console.log(`${colors.green}Server is live at ${BASE_URL}${colors.reset}\n`);

  try {
    // SUITE 1: Home Page & Visual Components
    console.log(`${colors.bold}--- Suite 1: Home Page & Visual Components ---${colors.reset}`);
    const homeRes = await fetch(`${BASE_URL}/`);
    recordTest('Homepage', 'HTTP 200 OK Status', homeRes.status === 200, `Status: ${homeRes.status}`);

    const html = await homeRes.text();

    // Verify Title & Meta
    recordTest('Homepage', 'Page title exists', html.includes('Aatral Studios'), 'Title rendered');
    recordTest('Homepage', 'Viewport meta for responsiveness', html.includes('viewport'), 'Viewport tag present');

    // Verify Hero Slogan and Tagline
    const hasHeroSlogan =
      html.includes('Where creativity') &&
      html.includes('meets code') &&
      html.includes('Where businesses') &&
      html.includes('possibilities');
    recordTest('Hero Section', 'Hero heading slogan present', hasHeroSlogan, 'Text matches latest copy');

    const hasTagline =
      html.includes('hero-tagline') || html.includes('Bespoke web design and development engineered');
    recordTest('Hero Section', 'Hero tagline present', hasTagline, 'Tagline class & copy present');

    const hasCTAs = html.includes('Start Your Project') && html.includes('Explore Industries');
    recordTest('Hero Section', 'Hero CTA buttons present', hasCTAs, 'Both CTAs present');

    // Verify Industries We Serve Section
    const hasIndustries =
      html.includes('Industries We Serve') || html.includes('Bespoke Websites for Every Business Sector');
    recordTest('Industries Section', 'Industries section rendered', hasIndustries, 'Section exists');

    const hasOutcome = html.includes('The Commercial Outcome');
    recordTest('Industries Section', 'Commercial Outcome element present', hasOutcome, 'Outcome banner verified');

    const hasFeatures = html.includes('Tailored Features Included');
    recordTest('Industries Section', 'Tailored Features checklist element present', hasFeatures, 'Features box verified');

    const hasWhatsApp = html.includes('WhatsApp Quick Chat') || html.includes('wa.me/918220820236');
    recordTest('Industries Section', 'WhatsApp quick chat button present', hasWhatsApp, 'Direct WhatsApp link verified');

    // Verify Navigation & Anchors
    recordTest(
      'Navigation',
      'Nav links present',
      html.includes('#industries') && html.includes('#contact'),
      'Anchor links valid'
    );
    recordTest(
      'Contact Funnel',
      'Enquiry form rendered',
      html.includes('enquiry') || html.includes('Start a Project'),
      'Form present'
    );
    recordTest(
      'Footer',
      'Footer rendered',
      html.includes('aatralstudios@gmail.com') || html.includes('+91 8220820236'),
      'Contact info present'
    );

    // SUITE 2: SEO, Sitemap & Robots
    console.log(`\n${colors.bold}--- Suite 2: SEO, Sitemap & Robots ---${colors.reset}`);
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsText = await robotsRes.text();
    recordTest(
      'SEO',
      'robots.txt returns 200 OK & user-agent rule',
      robotsRes.status === 200 && robotsText.toLowerCase().includes('user-agent'),
      `Status: ${robotsRes.status}`
    );

    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapText = await sitemapRes.text();
    recordTest(
      'SEO',
      'sitemap.xml returns 200 OK & valid XML',
      sitemapRes.status === 200 && sitemapText.includes('<urlset') && sitemapText.includes('aatralstudios'),
      `Status: ${sitemapRes.status}`
    );

    // SUITE 3: 404 Error Handling
    console.log(`\n${colors.bold}--- Suite 3: 404 Handling ---${colors.reset}`);
    const notFoundRes = await fetch(`${BASE_URL}/some-unknown-non-existent-page-test`);
    recordTest(
      'Error Handling',
      'Non-existent route returns 404',
      notFoundRes.status === 404,
      `Status: ${notFoundRes.status}`
    );

    // SUITE 4: Static Media Assets Integrity
    console.log(`\n${colors.bold}--- Suite 4: Static Media Assets ---${colors.reset}`);
    const assets = [
      { path: '/logo.png', expectedType: 'image/png' },
      { path: '/logo-white.png', expectedType: 'image/png' },
      { path: '/favicon.png', expectedType: 'image/png' },
      { path: '/images/industries/real-estate.webp', expectedType: 'image/webp' },
      { path: '/images/industries/healthcare.webp', expectedType: 'image/webp' },
      { path: '/images/industries/hospitality.webp', expectedType: 'image/webp' },
      { path: '/images/industries/fashion.webp', expectedType: 'image/webp' },
      { path: '/images/industries/corporate.webp', expectedType: 'image/webp' },
      { path: '/images/industries/fitness.webp', expectedType: 'image/webp' },
    ];

    for (const asset of assets) {
      const res = await fetch(`${BASE_URL}${asset.path}`);
      const cType = res.headers.get('content-type') || '';
      const cLen = parseInt(res.headers.get('content-length') || '0', 10);
      const ok = res.status === 200 && cLen > 0;
      recordTest('Assets', `Asset ${asset.path}`, ok, `Status: ${res.status}, Size: ${cLen}B, Type: ${cType}`);
    }

    // SUITE 5: API Enquiry Validation & Lead Flow
    console.log(`\n${colors.bold}--- Suite 5: Enquiry API Validation & Security ---${colors.reset}`);

    // Case 5.1: Missing required fields
    const emptyPost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.1' },
      body: JSON.stringify({}),
    });
    recordTest(
      'API Enquiry',
      'Empty payload rejected with 400',
      emptyPost.status === 400,
      `Status: ${emptyPost.status}`
    );

    // Case 5.2: Invalid email address
    const invalidEmailPost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.2' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'invalid-email-address',
        websiteType: 'Custom Business Website',
        estimatedBudget: '₹40,000 - ₹75,000',
        projectDescription: 'This is a test project enquiry description.',
        privacyConsent: true,
      }),
    });
    recordTest(
      'API Enquiry',
      'Malformed email rejected with 400',
      invalidEmailPost.status === 400,
      `Status: ${invalidEmailPost.status}`
    );

    // Case 5.3: Invalid short phone number
    const invalidPhonePost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.3' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@aatralstudios.com',
        phone: '123',
        websiteType: 'Custom Business Website',
        estimatedBudget: '₹40,000 - ₹75,000',
        projectDescription: 'This is a test project enquiry description.',
        privacyConsent: true,
      }),
    });
    recordTest(
      'API Enquiry',
      'Invalid short phone rejected with 400',
      invalidPhonePost.status === 400,
      `Status: ${invalidPhonePost.status}`
    );

    // Case 5.4: Missing privacy consent
    const noConsentPost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.4' },
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'test@aatralstudios.com',
        websiteType: 'Custom Business Website',
        estimatedBudget: '₹40,000 - ₹75,000',
        projectDescription: 'This is a test project enquiry description.',
        privacyConsent: false,
      }),
    });
    recordTest(
      'API Enquiry',
      'Missing privacy consent rejected with 400',
      noConsentPost.status === 400,
      `Status: ${noConsentPost.status}`
    );

    // Case 5.5: Bot honeypot trap
    const honeypotPost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.5' },
      body: JSON.stringify({
        fullName: 'Bot User',
        email: 'bot@example.com',
        _hp: 'spam-bot-value',
      }),
    });
    recordTest(
      'API Enquiry',
      'Honeypot trap absorbs spam with 200 deception',
      honeypotPost.status === 200,
      `Status: ${honeypotPost.status}`
    );

    // Case 5.6: Rate limiting verification (5 allowed, 6th returns 429)
    const rateLimitIp = '192.168.10.99';
    let hitRateLimit = false;
    for (let i = 0; i < 6; i++) {
      const rlRes = await fetch(`${BASE_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-forwarded-for': rateLimitIp },
        body: JSON.stringify({}),
      });
      if (rlRes.status === 429) {
        hitRateLimit = true;
        break;
      }
    }
    recordTest(
      'API Security',
      'Rate limiter blocks spam attacks (> 5 req/min with 429)',
      hitRateLimit,
      '429 Too Many Requests verified'
    );

    // Case 5.7: Valid Enquiry Submission
    const validLeadPost = await fetch(`${BASE_URL}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '192.168.1.50' },
      body: JSON.stringify({
        fullName: 'E2E Test Lead',
        email: 'test-lead@aatralstudios.com',
        phone: '+919876543210',
        businessName: 'Aatral Test Co',
        websiteType: 'High-Converting Business Website',
        estimatedBudget: '₹40,000 - ₹75,000',
        projectDescription: 'End-to-end automated verification test lead submission.',
        preferredContact: 'email',
        privacyConsent: true,
        _loadedAt: Date.now() - 3000,
      }),
    });
    const validJson = await validLeadPost.json();
    recordTest(
      'API Enquiry',
      'Valid lead accepted with 200 OK',
      validLeadPost.status === 200 && validJson.success === true,
      `Status: ${validLeadPost.status}, Success: ${validJson.success}`
    );
  } finally {
    // Teardown
    console.log(`\n${colors.bold}Stopping test server...${colors.reset}`);
    killProcess(server);
  }

  // Summary
  console.log(`\n${colors.bold}${colors.cyan}==============================================${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}                TEST SUMMARY                  ${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}==============================================${colors.reset}`);
  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Tests Run : ${colors.bold}${total}${colors.reset}`);
  console.log(`Passed          : ${colors.bold}${colors.green}${passed}${colors.reset}`);
  console.log(`Failed          : ${colors.bold}${failed > 0 ? colors.red : colors.green}${failed}${colors.reset}`);

  if (failed > 0) {
    console.log(`\n${colors.red}${colors.bold}Failed Tests:${colors.reset}`);
    results
      .filter((r) => !r.passed)
      .forEach((r) => console.log(`  - [${r.suite}] ${r.name}: ${r.detail}`));
    process.exit(1);
  } else {
    console.log(`\n${colors.green}${colors.bold}All End-to-End tests passed successfully! (100% PASS)${colors.reset}\n`);
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('Fatal error during test run:', err);
  process.exit(1);
});
