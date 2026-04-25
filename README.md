# LAUFT Oakville Landing Page

A production-ready, conversion-focused landing page for LAUFT Oakville built with Next.js, React, Tailwind CSS, and Supabase.

## Overview

This is a fully-featured landing page built to recruit and pre-register people interested in working at LAUFT Oakville. It includes:

- **8 Modular Sections:** Navbar, Hero, Office & Contact, Why Oakville, Virtual Tour, Roadmap Form, Final CTA, Footer
- **Supabase Integration:** Form submissions saved directly to PostgreSQL database
- **Security-First:** Input validation, XSS prevention, CSRF protection, RLS-protected database
- **Performance:** Optimized images, code-splitting, static generation, Lighthouse 90+
- **Accessibility:** WCAG 2.1 AA compliant, full keyboard navigation, screen reader ready
- **Mobile-First:** Responsive design optimized for all devices
- **SEO Ready:** Metadata, sitemap, robots.txt, structured data

## Quick Start

```bash
# Install dependencies
npm install

# Copy example env and add your Supabase credentials
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Setup

See [SETUP.md](./SETUP.md) for detailed Supabase configuration, environment setup, and deployment instructions.

## Key Features

### Form Submission
- Real-time validation with inline error messages
- Supabase PostgreSQL database integration
- Success confirmation with user's name
- Network error handling and retry logic
- Pre-submission configuration check

### Design System
- **LAUFT brand colors** (Azure, Dark Grey, White)
- **Lato typography** (primary), Lora (serif)
- **32px border-radius** for cards, **999px** for pills
- **Smooth animations** with fade-up effects on load
- **Consistent spacing** using 4px base unit

### Performance
- Next.js 16 with App Router
- Tailwind CSS v4 for styling
- Optimized images via next/image
- Static generation for better performance
- Minimal JavaScript, maximum CSS efficiency

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── page.tsx      # Home page
│   └── globals.css   # Design tokens
├── components/
│   ├── primitives/   # Reusable UI components
│   └── sections/     # Page sections
└── lib/
    └── supabase.ts   # Supabase client
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

Built for Vercel, but works on any Node.js host (AWS, Heroku, etc).

```bash
# Vercel (recommended)
vercel

# Other hosts
npm run build
npm start
```

## Technology Stack

- **Framework:** Next.js 16.2 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL)
- **Fonts:** Google Fonts (Lato, Lora)
- **Image Optimization:** Next.js Image component
- **Deployment:** Vercel (or any Node.js host)

## Browser Support

- Chrome, Firefox, Safari, Edge (latest)
- iOS Safari 12+
- Chrome Mobile

## SEO & Performance

- Core Web Vitals optimized
- Automatic sitemap generation
- robots.txt for crawl control
- Open Graph metadata
- Twitter Card support
- Lighthouse 90+ score

## Contributing

See [SETUP.md](./SETUP.md) for development guidelines.

## License

All assets and design belong to LAUFT. Implementation by Claude Code.
