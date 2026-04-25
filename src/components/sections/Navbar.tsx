'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/primitives';

interface NavbarProps {
  onPreRegister: () => void;
  onPricing: () => void;
}

interface NavItem {
  label: string;
  action: 'link' | 'modal';
  href?: string;
  target?: '_blank';
}

const navItems: NavItem[] = [
  { label: 'About', action: 'link', href: 'https://www.lauft.work', target: '_blank' },
  { label: 'Pricing', action: 'modal' },
  { label: 'Blog', action: 'link', href: 'https://blog.lauft.work/dimensions', target: '_blank' },
];

export const Navbar = ({ onPreRegister, onPricing }: NavbarProps) => {
  const [hovItem, setHovItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-white py-5 px-4">
      <div className="mx-auto max-w-7xl border-t border-b border-l border-r border-[var(--lauft-darkest-grey)] border-l-white border-r-white rounded-none px-4 md:px-7 py-3.5 flex items-center justify-between bg-white">
        {/* Logo */}
        <a href="#top" className="inline-flex items-center flex-shrink-0">
          <Image
            src="/assets/logos/lauft_ondemand_standard.png"
            alt="LAUFT"
            width={120}
            height={30}
            priority
          />
        </a>

        {/* Desktop Nav items */}
        <div className="hidden md:flex gap-4 md:gap-6 lg:gap-10 items-center">
          {navItems.map((item) => {
            const handleClick = (e: React.MouseEvent) => {
              if (item.action === 'link' && item.href) {
                e.preventDefault();
                window.open(item.href, item.target);
              } else if (item.action === 'modal') {
                e.preventDefault();
                onPricing();
              }
            };

            if (item.action === 'link') {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHovItem(item.label)}
                  onMouseLeave={() => setHovItem(null)}
                  onClick={handleClick}
                  className={`
                    font-lato font-semibold text-sm text-[var(--lauft-darkest-grey)]
                    pb-0.5 border-b-2 transition-colors duration-200
                    ${hovItem === item.label ? 'border-[var(--lauft-azure)]' : 'border-transparent'}
                  `}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                onClick={handleClick}
                onMouseEnter={() => setHovItem(item.label)}
                onMouseLeave={() => setHovItem(null)}
                className={`
                  font-lato font-semibold text-sm text-[var(--lauft-darkest-grey)]
                  pb-0.5 border-b-2 transition-colors duration-200
                  ${hovItem === item.label ? 'border-[var(--lauft-azure)]' : 'border-transparent'}
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <Button variant="primary" size="small" onClick={onPreRegister} className="hidden sm:inline-flex">
          Pre-Register
        </Button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-[var(--lauft-darkest-grey)]" />
          <div className="w-6 h-0.5 bg-[var(--lauft-darkest-grey)]" />
          <div className="w-6 h-0.5 bg-[var(--lauft-darkest-grey)]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden w-full bg-white border-b border-[var(--lauft-darkest-grey)]">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              const handleClick = (e?: React.MouseEvent) => {
                if (e) e.preventDefault();
                if (item.action === 'link' && item.href) {
                  window.open(item.href, item.target);
                } else if (item.action === 'modal') {
                  onPricing();
                }
                setMenuOpen(false);
              };

              if (item.action === 'link') {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.target}
                    rel="noopener noreferrer"
                    className="font-lato font-semibold text-sm text-[var(--lauft-darkest-grey)] hover:text-[var(--lauft-azure)] transition-colors"
                    onClick={handleClick}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={handleClick}
                  className="text-left font-lato font-semibold text-sm text-[var(--lauft-darkest-grey)] hover:text-[var(--lauft-azure)] transition-colors"
                >
                  {item.label}
                </button>
              );
            })}
            <Button
              variant="primary"
              size="large"
              onClick={() => {
                onPreRegister();
                setMenuOpen(false);
              }}
              className="w-full"
            >
              Pre-Register
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
