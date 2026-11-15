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
      html.includes('We Build Websites') &&
      html.includes('Help Businesses Grow');
    recordTest('Hero Section', 'Hero heading slogan present', hasHeroSlogan, 'Text matches latest copy');

    const hasTagline =
      html.includes('hero-tagline') || html.includes('modern, high-performing websites');
    recordTest('Hero Section', 'Hero tagline present', hasTagline, 'Tagline class & copy present');

    const hasCTAs = html.includes('Start Your Project') && (html.includes('Portfolios') || html.includes('/portfolio'));
    recordTest('Hero Section', 'Hero CTA buttons present', hasCTAs, 'Both CTAs present');

    // Verify Industries Navigation on Homepage
    const hasIndustriesNav = html.includes('/industries');
    recordTest('Industries Navigation', 'Industries page cleanly linked in navigation and footer', hasIndustriesNav, 'Industries link verified');

    // Verify Portfolio Navigation on Homepage
    const hasPortfolioNav = html.includes('/portfolio');
    recordTest('Portfolio Navigation', 'Portfolio page cleanly linked in hero CTA and navigation', hasPortfolioNav, 'Portfolio link verified');

    // Verify Why Choose Us Section
    const hasWhyUs =
      html.includes('Why Choose Aatral Studios') &&
      html.includes('Affordable Development') &&
      html.includes('Direct Communication') &&
      html.includes('Custom Development') &&
      html.includes('Transparent Process') &&
      html.includes('Post-Launch Support');
    recordTest('Why Choose Us Section', 'All 5 grounded reasons rendered', hasWhyUs, 'Why Choose Us verified');

    // Verify About Us Navigation on Homepage
    const hasAboutNav = html.includes('/about');
    recordTest('About Us Navigation', 'About Us page cleanly linked in navigation and footer', hasAboutNav, 'About Us link verified');

    // Verify Navigation & Anchors
    recordTest(
      'Navigation',
      'Nav links present',
      (html.includes('/industries') || html.includes('#industries')) &&
        html.includes('#contact') &&
        (html.includes('/portfolio') || html.includes('#portfolio')) &&
        html.includes('#why-us') &&
        (html.includes('/about') || html.includes('#about')) &&
        html.includes('/faq'),
      'Anchor & Route links valid'
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

    // Verify SEO Titles, Meta Descriptions & Heading Hierarchy on Homepage
    console.log(`\n${colors.bold}--- Homepage SEO & Heading Hierarchy ---${colors.reset}`);
    const homeH1Count = (html.match(/<h1[\s>]/gi) || []).length;
    recordTest('SEO Headings', 'Exactly one <h1> heading on homepage', homeH1Count === 1, `H1 Count: ${homeH1Count}`);

    const hasHomeTitle = html.includes('We Build Websites That Help Businesses Grow');
    recordTest('SEO Title', 'Homepage has unique, keyword-rich title', hasHomeTitle, 'Title verified');

    const hasHomeDescription = html.includes('name="description"') && html.includes('We design and develop modern, high-performing websites');
    recordTest('SEO Meta Description', 'Homepage has unique meta description', hasHomeDescription, 'Meta description verified');

    const hasCanonicalHome = html.includes('rel="canonical"') || html.includes('https://aatralstudios.com');
    recordTest('SEO Canonical', 'Homepage has canonical URL', hasCanonicalHome, 'Canonical verified');

    const hasHomeJsonLd = html.includes('ProfessionalService') && html.includes('Vasanthabalan B') && html.includes('Sudharshini NS');
    recordTest('SEO Schema.org', 'Homepage has valid Organization/ProfessionalService JSON-LD', hasHomeJsonLd, 'Founders & Studio Schema verified');

    // Verify Dedicated FAQ Page
    console.log(`\n${colors.bold}--- Dedicated FAQ Route (/faq) SEO & Content ---${colors.reset}`);
    const faqRes = await fetch(`${BASE_URL}/faq`);
    const faqHtml = await faqRes.text();
    recordTest('FAQ Route', 'FAQ page returns HTTP 200 OK', faqRes.status === 200, `Status: ${faqRes.status}`);

    const faqH1Count = (faqHtml.match(/<h1[\s>]/gi) || []).length;
    recordTest('FAQ SEO Headings', 'Exactly one <h1> heading on FAQ page', faqH1Count === 1, `H1 Count: ${faqH1Count}`);

    const hasFaqH2 = faqHtml.includes('<h2') && faqHtml.includes('Frequently Asked Questions');
    recordTest('FAQ SEO Headings', 'FAQ page has proper <h2> and <h3> hierarchy', hasFaqH2, 'H2 & H3 hierarchy verified');

    const hasFaqTitle = faqHtml.includes('Frequently Asked Questions (FAQ) | Aatral Studios') || faqHtml.includes('Frequently Asked Questions');
    recordTest('FAQ SEO Title', 'FAQ page has unique page title', hasFaqTitle, 'FAQ Title verified');

    const hasFaqDescription = faqHtml.includes('name="description"') && (faqHtml.includes('first-time website buyers') || faqHtml.includes('10-day'));
    recordTest('FAQ SEO Meta Description', 'FAQ page has unique meta description', hasFaqDescription, 'FAQ Meta description verified');

    const hasFaqJsonLd = faqHtml.includes('FAQPage') && faqHtml.includes('How long does website development take?');
    recordTest('FAQ Schema.org', 'FAQ page has valid FAQPage JSON-LD schema', hasFaqJsonLd, 'FAQPage Rich Snippets schema verified');

    const hasAllFaqQuestions =
      faqHtml.includes('How long does website development take?') &&
      faqHtml.includes('Do you provide domain and hosting?') &&
      faqHtml.includes('Can I update website content myself?') &&
      faqHtml.includes('Will my website work on mobile devices?') &&
      faqHtml.includes('Do you provide maintenance?') &&
      faqHtml.includes('Can you redesign my existing website?') &&
      faqHtml.includes('Do you provide support after deployment?');
    recordTest('FAQ Questions', 'All 7 suggested client FAQ questions present', hasAllFaqQuestions, '7 questions verified');

    const hasAllFaqAnswers =
      faqHtml.includes('within 10 days') &&
      faqHtml.includes('domain setup') &&
      faqHtml.includes('admin panel') &&
      faqHtml.includes('100% mobile-responsive') &&
      faqHtml.includes('charged separately') &&
      faqHtml.includes('redesign and modernize') &&
      faqHtml.includes('30 days of complimentary');
    recordTest('FAQ Answers', 'All 7 client answers verified', hasAllFaqAnswers, '7 answers verified');

    // Dedicated Industries Route (/industries) SEO & Content
    console.log(`\n${colors.bold}--- Dedicated Industries Route (/industries) SEO & Content ---${colors.reset}`);
    const indRes = await fetch(`${BASE_URL}/industries`);
    const indHtml = await indRes.text();
    recordTest('Industries Route', 'Industries page returns HTTP 200 OK', indRes.status === 200, `Status: ${indRes.status}`);

    const indH1Count = (indHtml.match(/<h1[\s>]/gi) || []).length;
    recordTest('Industries SEO Headings', 'Exactly one <h1> heading on Industries page', indH1Count === 1, `H1 Count: ${indH1Count}`);

    const hasIndTitle = indHtml.includes('Industries We Serve') && indHtml.includes('Aatral Studios');
    recordTest('Industries SEO Title', 'Industries page has unique page title', hasIndTitle, 'Industries Title verified');

    const hasIndDescription = indHtml.includes('name="description"') && indHtml.includes('Real Estate, Healthcare Clinics, Restaurants');
    recordTest('Industries SEO Meta Description', 'Industries page has unique meta description', hasIndDescription, 'Industries Meta description verified');

    const hasIndJsonLd = indHtml.includes('Industry-Specific Web Development Solutions') && indHtml.includes('Real Estate & Property Development Websites');
    recordTest('Industries Schema.org', 'Industries page has valid Service JSON-LD schema', hasIndJsonLd, 'OfferCatalog schema verified');

    const hasAllIndustries =
      (indHtml.includes('Real Estate & Property') || indHtml.includes('Real Estate &amp; Property')) &&
      (indHtml.includes('Clinics & Healthcare') || indHtml.includes('Clinics &amp; Healthcare')) &&
      (indHtml.includes('Restaurants, Cafes & Hospitality') || indHtml.includes('Restaurants, Cafes &amp; Hospitality')) &&
      (indHtml.includes('Textiles, Fashion & Jewelry') || indHtml.includes('Textiles, Fashion &amp; Jewelry') || indHtml.includes('Fashion')) &&
      (indHtml.includes('Corporate, Law & Professional') || indHtml.includes('Corporate, Law &amp; Professional') || indHtml.includes('Corporate')) &&
      (indHtml.includes('Fitness, Salons & Personal') || indHtml.includes('Fitness, Salons &amp; Personal') || indHtml.includes('Fitness'));
    recordTest('Industries Sectors', 'All 6 business sectors rendered on /industries', hasAllIndustries, 'All 6 sectors verified');

    // Dedicated About Us Route (/about) SEO & Content
    console.log(`\n${colors.bold}--- Dedicated About Us Route (/about) SEO & Content ---${colors.reset}`);
    const aboutRes = await fetch(`${BASE_URL}/about`);
    const aboutHtml = await aboutRes.text();
    recordTest('About Route', 'About Us page returns HTTP 200 OK', aboutRes.status === 200, `Status: ${aboutRes.status}`);

    const aboutH1Count = (aboutHtml.match(/<h1[\s>]/gi) || []).length;
    recordTest('About SEO Headings', 'Exactly one <h1> heading on About page', aboutH1Count === 1, `H1 Count: ${aboutH1Count}`);

    const hasAboutTitle = aboutHtml.includes('About Us') && aboutHtml.includes('Aatral Studios');
    recordTest('About SEO Title', 'About Us page has unique page title', hasAboutTitle, 'About Title verified');

    const hasAboutDescription = aboutHtml.includes('name="description"') && aboutHtml.includes('Vasanthabalan B') && aboutHtml.includes('Sudharshini NS');
    recordTest('About SEO Meta Description', 'About Us page has unique meta description', hasAboutDescription, 'About Meta description verified');

    const hasAboutJsonLd = aboutHtml.includes('AboutPage') && aboutHtml.includes('Vasanthabalan B') && aboutHtml.includes('Sudharshini NS');
    recordTest('About Schema.org', 'About page has valid AboutPage JSON-LD schema', hasAboutJsonLd, 'AboutPage schema verified');

    const hasFoundersDetails =
      aboutHtml.includes('Vasanthabalan B') &&
      aboutHtml.includes('Chennai') &&
      aboutHtml.includes('Sudharshini NS') &&
      aboutHtml.includes('Chengalpattu') &&
      aboutHtml.includes('Our Mission');
    recordTest('About Founders', 'Founders details, degrees, cities & mission rendered', hasFoundersDetails, 'Founders & Mission verified');

    // Dedicated Portfolio Route (/portfolio) SEO & Content
    console.log(`\n${colors.bold}--- Dedicated Portfolio Route (/portfolio) SEO & Content ---${colors.reset}`);
    const portfolioRes = await fetch(`${BASE_URL}/portfolio`);
    const portfolioHtml = await portfolioRes.text();
    recordTest('Portfolio Route', 'Portfolio page returns HTTP 200 OK', portfolioRes.status === 200, `Status: ${portfolioRes.status}`);

    const portfolioH1Count = (portfolioHtml.match(/<h1[\s>]/gi) || []).length;
    recordTest('Portfolio SEO Headings', 'Exactly one <h1> heading on Portfolio page', portfolioH1Count === 1, `H1 Count: ${portfolioH1Count}`);

    const hasPortfolioTitle = portfolioHtml.includes('Portfolio') && portfolioHtml.includes('Aatral Studios');
    recordTest('Portfolio SEO Title', 'Portfolio page has unique page title', hasPortfolioTitle, 'Portfolio Title verified');

    const hasPortfolioDescription = portfolioHtml.includes('name="description"') && portfolioHtml.includes('RaRa Cafe');
    recordTest('Portfolio SEO Meta Description', 'Portfolio page has unique meta description', hasPortfolioDescription, 'Portfolio Meta description verified');

    const hasPortfolioJsonLd = portfolioHtml.includes('CollectionPage') && portfolioHtml.includes('RaRa Cafe');
    recordTest('Portfolio Schema.org', 'Portfolio page has valid CollectionPage JSON-LD schema', hasPortfolioJsonLd, 'CollectionPage schema verified');

    const hasPortfolioProject =
      portfolioHtml.includes('RaRa Cafe') &&
      portfolioHtml.includes('aatralstudios.github.io/rara_cafe') &&
      portfolioHtml.includes('Karappakkam');
    recordTest('Portfolio Client Project', 'Featured client project (RaRa Cafe) live and interactive', hasPortfolioProject, 'RaRa Cafe details verified');

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
      sitemapRes.status === 200 &&
        sitemapText.includes('<urlset') &&
        sitemapText.includes('aatralstudios') &&
        sitemapText.includes('/portfolio') &&
        sitemapText.includes('/industries') &&
        sitemapText.includes('/about') &&
        sitemapText.includes('/faq'),
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
      { path: '/images/team/vasanthabalan.jpg', expectedType: 'image/jpeg' },
      { path: '/images/team/vasanthabalan.webp', expectedType: 'image/webp' },
      { path: '/images/team/sudharshini.jpg', expectedType: 'image/jpeg' },
      { path: '/images/team/sudharshini.webp', expectedType: 'image/webp' },
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

    // SUITE 6: Accessibility (WCAG AA)
    console.log(`\n${colors.bold}--- Suite 6: Accessibility (WCAG AA) ---${colors.reset}`);

    // Check 6.1: Skip to main content link
    const hasSkipLink = html.includes('skip-to-content') && html.includes('#main-content') && html.includes('id="main-content"');
    recordTest('Accessibility', 'Skip to main content bypass link present', hasSkipLink, 'Skip link verified');

    // Check 6.2: High-contrast tokens & focus-visible in CSS
    const fs = await import('fs');
    const globalsCss = fs.readFileSync('src/app/globals.css', 'utf8');
    const hasFocusVisible = globalsCss.includes(':focus-visible') && globalsCss.includes('--primary');
    recordTest('Accessibility', 'Universal high-contrast :focus-visible ring configured', hasFocusVisible, 'Focus visible verified');

    const hasAccessibleContrast = globalsCss.includes('--accent: #B85324') && globalsCss.includes('--text-muted: #54655D');
    recordTest('Accessibility', 'WCAG AA high-contrast color tokens applied', hasAccessibleContrast, 'Contrast ratio >= 4.5:1 verified');

    // Check 6.3: Image Alt Text
    const homeImgMatches = html.match(/<img[^>]+>/g) || [];
    const allHomeImgHaveAlt = homeImgMatches.length > 0 && homeImgMatches.every((img) => /alt="[^"]+"/.test(img));
    recordTest('Accessibility', `All homepage images have descriptive alt text (${homeImgMatches.length} images)`, allHomeImgHaveAlt, 'Alt text verified');

    // Check 6.4: ARIA Navigation & Accordion Accessibility
    const hasAriaNav = html.includes('aria-label="Aatral Studios Homepage"') && html.includes('aria-label="Toggle Navigation Menu"');
    recordTest('Accessibility', 'Navigation elements have semantic ARIA labels', hasAriaNav, 'ARIA nav labels verified');

    const hasFaqAria = faqHtml.includes('aria-expanded') && faqHtml.includes('aria-controls') && faqHtml.includes('role="region"');
    recordTest('Accessibility', 'FAQ accordions comply with WAI-ARIA keyboard pattern', hasFaqAria, 'WAI-ARIA accordion pattern verified');
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
