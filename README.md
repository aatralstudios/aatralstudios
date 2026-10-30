# Aatral Studios (Aatral) — Production Website & Portfolio

> **"We design journeys, not just pages."**  
> A single-page, visually striking, production-quality digital experience engineered for **Aatral Studios**, a web design and creative development agency based in Chennai, India. The site itself is the ultimate portfolio piece: every section demonstrates the craft we sell, rather than merely describing it.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/) with React 19 & TypeScript
- **Styling**: Vanilla CSS Design Tokens with 8px spacing scale, 12-column grid, and responsive breakpoints
- **3D & Canvas**: [Three.js](https://threejs.org/) hardware-accelerated WebGL with mouse parallax, scroll reaction, and graceful low-power fallback
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) for 60fps momentum scrolling (respects `prefers-reduced-motion`)
- **Icons & Micro-interactions**: [Lucide React](https://lucide.dev/) + Custom SVG marks
- **Backend Email Intake**: Serverless API route (`/api/enquiry`) with Resend & Nodemailer, honeypot anti-spam, and IP sliding-window rate limiting
- **Confetti Celebration**: Canvas Confetti on successful lead submission

---

## 🗺️ Information Architecture (Attention → Interest → Desire → Action)

1. **Hero (Attention)**
   - Full-screen interactive Three.js 3D scene (faceted geometric icosahedron with orbital trajectory ring and ambient depth particles) reacting to cursor movement and vertical scroll.
   - Animated typewriter headline reveal: *"We design journeys, not just pages."*
   - Two high-conversion CTAs: *"Start a project"* & *"See our work"*, plus 1-tap WhatsApp direct chat.
2. **Proof Strip (Trust)**
   - Scroll-triggered animated counters (48+ Projects, 99% Satisfaction, 4+ Years, 6+ Countries).
   - Continuous infinite marquee of client brand credentials.
3. **Services (Interest)**
   - 6 Core Capabilities (Web Design, Web Development, UI/UX Architecture, Branding Systems, 3D & Creative Motion, SEO & Performance).
   - 3D hover elevation, icon badge transitions, tangible client deliverables, and outcome metrics.
4. **Design Principles Showcase (Interest — Light Mode Contrast Section)**
   - Interactive teaching suite demonstrating 8 core visual laws:
     1. *Hierarchy* (Visual weight before vs. after)
     2. *Contrast* (WCAG AA/AAA compliance toggle)
     3. *Balance* (Kinetic asymmetrical equilibrium)
     4. *Alignment* (12-column snapping vs. offset drift)
     5. *Proximity* (Gestalt grouping vs. scattered chaos)
     6. *Repetition* (Design token consistency)
     7. *Whitespace* (Breathing room vs. cramming)
     8. *Rhythm* (Cadence & spacing intervals)
5. **Colour Theory Lab (Desire — Light Mode Contrast Section)**
   - Mathematical color wheel generator with Complementary (180°), Analogous (30°), Triadic (120°), and Monochromatic harmonics.
   - **Live Re-themed Website Mockup**: Embedded preview that dynamically recolors its typography, buttons, and swatches in real time!
   - Real-time WCAG contrast calculation benchmark.
6. **Funnel in Action (Desire)**
   - Visual 5-stage conversion funnel diagram (Awareness → Interest → Consideration → Conversion → Retention).
   - Interactive stage inspector revealing architectural tactics and illustrative metric cards (+42% conversion, -38% bounce rate, 3.4x lead velocity).
7. **Animation & 3D Playground (Desire)**
   - 4 Interactive Demos:
     1. *Interactive 3D Object Viewer*: Real-time TorusKnot customizer with Material switcher (Glossy, Metallic, Wireframe), pigment picker, zoom, and auto-rotation toggle.
     2. *Tactile Micro-Interactions*: Magnetic button physics that pull toward cursor.
     3. *Parallax Depth Layers*: 3D optical tilt card.
     4. *Kinetic Typography*: Velocity text reveal.
8. **Selected Work (Desire)**
   - 6 Case Studies across luxury mobility, headless e-commerce, developer SaaS, fitness tech, subscription D2C, and enterprise supply chain.
   - Interactive *"View Case Study"* modal with challenge, solution, and production stack breakdown.
9. **Process (Trust)**
   - 6-Stage Timeline: Discover → Strategy → Design → Build → Launch → Grow with concrete client deliverables.
10. **Testimonials**
    - Smooth interactive carousel with star ratings, client outcomes, and clearly marked editable placeholders.
11. **Contact / Request a Project (Action)**
    - 3-Step Interactive Funnel Form with progress bar:
      - Step 1: Name, Email, Phone, Company
      - Step 2: Multi-select Service Chips, Budget Tier, Target Timeline
      - Step 3: Project Vision, Reference Links, File Upload Note
    - Real email delivery to `aatralstudios@gmail.com` + automatic client confirmation.
    - Direct verified contacts: Email, Instagram (`@aatralstudios`), WhatsApp (`+91 8220820236`), and 20-min call booking.
12. **Footer**
    - Official logo, studio coordinates, copyright "© 2026 Aatral Studios", and back-to-top button.

---

## 🚀 Quickstart & Local Installation

### Prerequisites
- Node.js 18+ (tested with Node 20 / 22 / 25)
- npm or pnpm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials in `.env.local`:
```env
# Email Provider: 'resend' or 'smtp' (Leave empty for local dev simulation mode)
EMAIL_PROVIDER=resend

# If using Resend (Recommended - https://resend.com)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev

# Agency Recipient
AGENCY_NOTIFICATION_EMAIL=aatralstudios@gmail.com

# If using SMTP (Gmail App Password or custom SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=aatralstudios@gmail.com
SMTP_PASS=your-16-char-gmail-app-password
```

> **Note on Local Simulation:** If you run the project without setting API keys, the form automatically falls back to **Local Simulation Mode**, logging full formatted emails to your terminal console with zero errors.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Production Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub or GitLab.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Under **Environment Variables**, add:
   - `EMAIL_PROVIDER`: `resend`
   - `RESEND_API_KEY`: `your_key`
   - `RESEND_FROM_EMAIL`: `your_verified_domain_email`
   - `AGENCY_NOTIFICATION_EMAIL`: `aatralstudios@gmail.com`
5. Click **Deploy**. Vercel will automatically build the static pages and serverless API routes.

### Deploying to Netlify
1. Connect repository in [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `.next`
4. Add environment variables under **Site Configuration &rarr; Environment variables**.
5. Deploy site.

---

## 📝 Where to Replace Placeholder Content

When updating with your live client assets and custom media:

| Content Element | File Location | What to Edit |
| :--- | :--- | :--- |
| **Case Studies & Projects** | `src/components/SelectedWork.tsx` | Edit `projects` array with your real client titles, descriptions, metrics, and live URLs |
| **Client Testimonials** | `src/components/Testimonials.tsx` | Edit `testimonials` array with real client quotes, names, roles, and company logos |
| **Services & Deliverables** | `src/components/Services.tsx` | Update `serviceList` array with specific agency packages and deliverables |
| **Brand Copy & Taglines** | `src/components/Hero.tsx` | Modify `fullHeadline` and value proposition copy |
| **Agency Coordinates** | `src/components/Footer.tsx`, `ContactFunnel.tsx` | Update phone (`+91 8220820236`), email (`aatralstudios@gmail.com`), or Instagram (`@aatralstudios`) |
| **Brand Logos** | `public/logo.png`, `public/logo-white.png`, `public/favicon.png` | Replace with new transparent PNG assets if visual identity evolves |
| **Pricing Config** | `src/data/pricing-config.ts` | Adjust base prices, add-on rates, and sprint timelines |

---

## 🛡️ Security & Performance Features

- **Honeypot Anti-Spam Defense**: Invisible form field traps automated bots without burdening real users with annoying image captchas.
- **Fast-Submission Check**: Submissions under 1.5 seconds are rejected as automated bots.
- **In-Memory Rate Limiting**: Max 5 requests per IP per minute on `/api/enquiry`.
- **Zero Secret Exposure**: All email credentials and API keys reside exclusively in server-side environment variables and are never bundled into frontend client chunks.
- **Hardware-Accelerated 60fps**: Three.js and custom cursor use passive listeners and `requestAnimationFrame`.
- **WCAG AA / AAA Contrast**: Every color pair adheres to strict accessibility guidelines.
