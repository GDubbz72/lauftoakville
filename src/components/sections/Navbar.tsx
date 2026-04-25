'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/primitives';

interface NavbarProps {
  onPreRegister: () => void;
}

export const Navbar = ({ onPreRegister }: NavbarProps) => {
  const [hovItem, setHovItem] = useState<string | null>(null);
  const navItems = ['About', 'Pricing', 'Blog'];

  return (
    <div className="sticky top-0 z-50 w-full bg-white py-5 px-4">
      <div className="mx-auto max-w-7xl border-t border-b border-l border-r border-[var(--lauft-darkest-grey)] border-l-white border-r-white rounded-none px-7 py-3.5 flex items-center justify-between bg-white">
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

        {/* Nav items + email */}
        <div className="flex gap-10 items-center">
          {navItems.map((item) => (
            <span
              key={item}
              onMouseEnter={() => setHovItem(item)}
              onMouseLeave={() => setHovItem(null)}
              className={`
                font-lato font-semibold text-sm text-[var(--lauft-darkest-grey)]
                cursor-pointer pb-0.5 border-b-2 transition-colors duration-200
                ${hovItem === item ? 'border-[var(--lauft-azure)]' : 'border-transparent'}
              `}
            >
              {item}
            </span>
          ))}
          {/*<a
            href="mailto:info@lauft.work"
            onMouseEnter={() => setHovItem('email')}
            onMouseLeave={() => setHovItem(null)}
            className={`
              font-lato font-semibold text-sm transition-colors duration-180
              ${hovItem === 'email' ? 'text-[var(--lauft-bold-blue)]' : 'text-[var(--lauft-darkest-grey)]'}
            `}
          >
            info@lauft.work
          </a>*/}
        </div>

        {/* CTA Button */}
        <Button variant="primary" size="small" onClick={onPreRegister}>
          Pre-Register
        </Button>
      </div>
    </div>
  );
};
