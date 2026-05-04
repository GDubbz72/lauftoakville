'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Body } from '@/components/primitives';

interface FooterLink {
  label: string;
  action?: 'link' | 'modal';
  href?: string;
  target?: '_blank';
}

interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

const footerLinks: FooterLinkGroup[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'About', action: 'link', href: 'https://www.lauft.work', target: '_blank' },
      { label: 'Pricing', action: 'modal' },
      { label: 'Locations', action: 'link', href: 'https://www.lauft.work', target: '_blank' },
      { label: 'Blog', action: 'link', href: 'https://blog.lauft.work/dimensions', target: '_blank' },
      { label: 'Contact', action: 'link', href: 'https://lauft.work/contact', target: '_blank' },
    ],
  },
  {
    heading: 'Locations',
    links: [
      { label: 'Burlington Centre', action: 'link', href: 'https://lauft.work/locations/burlingtoncentre', target: '_blank' },
      { label: 'EVNT by LAUFT', action: 'link', href: 'https://lauft.work/locations/evntbylauft', target: '_blank' },
      { label: 'King East', action: 'link', href: 'https://lauft.work/locations/kingeast', target: '_blank' },
      { label: 'Oakville', action: 'link', href: 'https://lauft.work/locations/oakville', target: '_blank' },
      { label: 'Prime Storage Ajax', action: 'link', href: 'https://lauft.work/locations/primestorageajax', target: '_blank' },
      { label: 'Prime Storage Castlefield', action: 'link', href: 'https://lauft.work/locations/primestoragecastlefield', target: '_blank' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram', action: 'link', href: 'https://www.instagram.com/lauftworkspace', target: '_blank' },
      { label: 'LinkedIn', action: 'link', href: 'https://www.linkedin.com/company/lauft-flexible-workspace-network', target: '_blank' },
      { label: 'X', action: 'link', href: 'https://x.com/LAUFTworkspace', target: '_blank' },
      { label: 'YouTube', action: 'link', href: 'https://www.youtube.com/channel/UC0SoH8KGB4_oggG4FO9Metw', target: '_blank' },
      { label: 'TikTok', action: 'link', href: 'https://www.tiktok.com/@lauftworkspace', target: '_blank' },
    ],
  },
];

const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

interface FooterProps {
  onPricing?: () => void;
}

export const Footer = ({ onPricing }: FooterProps) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeError('');

    if (!emailInput.trim()) {
      setSubscribeError('Please enter your email');
      return;
    }

    if (!validateEmail(emailInput)) {
      setSubscribeError('Please enter a valid email');
      return;
    }

    setSubscribeLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubscribeError(data.error || 'Failed to subscribe. Try again.');
        setSubscribeLoading(false);
        return;
      }

      setSubscribeSuccess(true);
      setEmailInput('');

      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 3000);
    } catch {
      setSubscribeError('An error occurred');
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <div className="px-4 pb-4">
      <div className="bg-[var(--lauft-darkest-grey)] rounded-[32px] text-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-14 mb-10">
          {/* Left: Logo + newsletter */}
          <div>
            <Image
              src="/assets/logos/lauft_reverse.png"
              alt="LAUFT"
              width={140}
              height={28}
              className="mb-6"
            />
            <Body
              size={13}
              color="rgba(255,255,255,0.7)"
              weight={500}
              style={{ maxWidth: 320, marginBottom: 24 }}
            >
              On-demand network of flexible workspaces. The third option between home and the office.
            </Body>

            {/* Newsletter signup */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  disabled={subscribeLoading || subscribeSuccess}
                  className={`
                    flex-1 px-4 py-2.5 rounded-full border bg-transparent text-white font-lato text-sm outline-none placeholder-white placeholder-opacity-50 transition-colors duration-200
                    ${
                      subscribeError
                        ? 'border-[var(--lauft-bright-berry)] border-opacity-100'
                        : 'border-white border-opacity-30 focus:border-opacity-100'
                    }
                    ${subscribeSuccess ? 'opacity-60' : ''}
                  `}
                />
                <Button
                  variant="primary"
                  size="small"
                  type="submit"
                  disabled={subscribeLoading || subscribeSuccess}
                >
                  {subscribeLoading ? '...' : subscribeSuccess ? '✓' : 'Subscribe'}
                </Button>
              </div>
              {subscribeError && (
                <span className="text-xs text-[var(--lauft-bright-berry)]">{subscribeError}</span>
              )}
              {subscribeSuccess && (
                <span className="text-xs text-[var(--lauft-light-sky)]">Thanks for subscribing!</span>
              )}
            </form>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <div className="font-lato font-bold uppercase text-xs tracking-widest text-[var(--lauft-azure)] mb-4.5">
                {col.heading}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <FooterLink key={link.label} link={link} onPricing={onPricing} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white border-opacity-12 pt-5 flex flex-col lg:flex-row justify-between items-center gap-4 font-lato text-xs text-white text-opacity-55">
          <span>© 2026 LAUFT. Make Smart Work.™</span>
          <div className="flex gap-6">
            <FooterLink small>Privacy</FooterLink>
            <FooterLink small>Terms</FooterLink>
            <FooterLink small>Cookies</FooterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FooterLinkProps {
  link?: FooterLink;
  children?: React.ReactNode;
  small?: boolean;
  onPricing?: () => void;
}

function FooterLink({ link, children, small, onPricing }: FooterLinkProps) {
  const [hov, setHov] = useState(false);

  if (link) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault();
      if (link.action === 'modal' && onPricing) {
        onPricing();
      } else if (link.action === 'link' && link.href && link.href !== '#') {
        window.open(link.href, link.target);
      }
    };

    if (link.action === 'modal') {
      return (
        <button
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          onClick={handleClick}
          className={`
            font-lato font-medium transition-colors duration-180 text-decoration-none
            text-left text-sm text-white text-opacity-85 hover:text-[var(--lauft-azure)]
          `}
          style={{
            color: hov ? '#00ABEA' : 'rgba(255,255,255,0.85)',
          }}
        >
          {link.label}
        </button>
      );
    }

    return (
      <a
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        href={link.href}
        target={link.target}
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`
          font-lato font-medium transition-colors duration-180 text-decoration-none
          ${small ? 'text-xs text-white text-opacity-55 hover:text-opacity-100' : 'text-sm text-white text-opacity-85 hover:text-[var(--lauft-azure)]'}
        `}
        style={{
          color: hov ? '#00ABEA' : small ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)',
        }}
      >
        {link.label}
      </a>
    );
  }

  return (
    <a
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      href="#"
      className={`
        font-lato font-medium transition-colors duration-180 text-decoration-none
        ${small ? 'text-xs text-white text-opacity-55 hover:text-opacity-100' : 'text-sm text-white text-opacity-85 hover:text-[var(--lauft-azure)]'}
      `}
      style={{
        color: hov ? '#00ABEA' : small ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)',
      }}
    >
      {children}
    </a>
  );
}
