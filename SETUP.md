# LAUFT Oakville Landing Page - Setup Guide

## Quick Start

```bash
# Install dependencies
npm install

# Create .env.local with your Supabase credentials
cp .env.local.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

## Supabase Configuration

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project
4. Note your **Project URL** and **Anon Key** (found in Settings > API)

### 2. Create Database Tables

In Supabase dashboard, go to SQL Editor and run:

```sql
-- Pre-Registration & Roadmap Form Table
CREATE TABLE oakville_registrations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE oakville_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public inserts" ON oakville_registrations
  FOR INSERT WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX idx_oakville_email ON oakville_registrations(email);

-- Newsletter Subscription Table
CREATE TABLE lauft_newsletter (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE lauft_newsletter ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public inserts" ON lauft_newsletter
  FOR INSERT WITH CHECK (true);

-- Create index on email
CREATE INDEX idx_newsletter_email ON lauft_newsletter(email);
```

### 3. Configure Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase credentials.

## Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Features

- ✅ **Responsive Design** — Mobile-first, optimized for all screen sizes
- ✅ **Form Validation** — Real-time inline validation with error states
- ✅ **Supabase Integration** — Direct database submissions
- ✅ **Security** — Input sanitization, XSS prevention, CSRF protection
- ✅ **Accessibility** — WCAG 2.1 AA compliant, proper ARIA labels
- ✅ **Performance** — Optimized images, code splitting, static generation
- ✅ **SEO** — Metadata, structured data, robots.txt, sitemap
- ✅ **Smooth Animations** — Fade-up effects on load, hover states
- ✅ **Conversion Optimized** — Strategic CTAs, clear value props

## Design System

The landing page uses the LAUFT brand design system:

- **Colors:** Azure (#00ABEA), Dark Grey (#1D252C), White
- **Typography:** Lato (primary), Lora (serif), Playfair Display (variable)
- **Spacing:** 4px base unit
- **Radii:** 32px for cards, 999px for pills/buttons
- **Shadows:** Minimal, leaning on solid colors

All tokens are defined in `src/app/globals.css` as CSS variables.

## Component Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page - brings all sections together
│   ├── globals.css         # Design tokens & global styles
│   └── sitemap.ts          # SEO sitemap
├── components/
│   ├── primitives/         # Reusable components (Button, Headline, etc)
│   │   ├── index.ts
│   │   ├── Button.tsx
│   │   ├── Typography.tsx
│   │   └── CircleAccent.tsx
│   └── sections/           # Page sections
│       ├── index.ts
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── OfficeAndContact.tsx
│       ├── WhyOakville.tsx
│       ├── VirtualTour.tsx
│       ├── Roadmap.tsx     # Pre-registration form with Supabase
│       ├── FinalCTA.tsx
│       └── Footer.tsx
└── lib/
    └── supabase.ts         # Supabase client initialization
```

## Form Submission

The pre-registration form (`Roadmap.tsx`) submits to the `oakville_registrations` table with:
- `name` (required)
- `email` (required, validated)
- `company` (required)
- `role` (required)
- `created_at` (automatic timestamp)

Features:
- Inline validation on blur
- Real-time error messages
- Success confirmation with name
- Loading state on submission
- Network error handling

## Customization

### Update Video Link
In `src/components/sections/VirtualTour.tsx`, replace the placeholder:
```tsx
// Change this to a real YouTube video URL
// Currently shows "Now Playing" placeholder
```

### Change Colors
All colors are CSS variables in `src/app/globals.css`:
```css
--lauft-azure: #00ABEA;
--lauft-darkest-grey: #1D252C;
```

### Update Copy
Text is embedded in each component. Edit directly in the JSX.

### Adjust Layout
Use Tailwind CSS classes. All custom spacing/sizing uses CSS variables for consistency.

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then connect to Vercel
# Vercel will auto-detect Next.js and configure build
# Add environment variables in Vercel dashboard
```

### Other Platforms

Build the app:
```bash
npm run build
npm start
```

Make sure to set environment variables in your hosting platform.

## Accessibility

- All buttons and links have proper `aria-label` attributes
- Form inputs have associated labels
- Color contrast meets WCAG AA standards
- Keyboard navigation fully supported
- Respects `prefers-reduced-motion` media query

## Performance Checklist

- ✅ Images optimized with Next.js `Image` component
- ✅ Fonts loaded via Google Fonts (CSS)
- ✅ CSS split and minified
- ✅ JavaScript code-split by route
- ✅ No render-blocking resources
- ✅ Gzip compression enabled

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Form submissions failing
- Check `.env.local` has correct Supabase credentials
- Verify `oakville_registrations` table exists
- Check RLS policies allow inserts
- Check browser console for errors

### Images not loading
- Verify files exist in `public/assets/`
- Check file paths are correct (case-sensitive)
- Ensure Next.js is restarted after adding assets

### Styles not applied
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check CSS variables in globals.css are set

## Support

For questions about the design, see the original design handoff in `/oakville-landing-page`.

For LAUFT branding questions, contact the brand team.
