'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Headline, Body } from '@/components/primitives';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  unit: string;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
  showAppButtons?: boolean;
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPreRegister?: () => void;
}

const pricingTiers = [
  {
    name: 'Mail Service',
    description: 'Best for local businesses.',
    price: '$40',
    unit: '/month',
    priceNote: 'plus set-up fee',
    features: [
      'Professional Address',
      'Secure Handling',
      'App Integrated',
      'Member Discount',
    ],
  },
  {
    name: 'On-Demand',
    description: 'Perfect for quick sessions.',
    price: '$5 to $79',
    unit: '/hour',
    priceNote: 'Daily Rates Available',
    features: [
      'Instant Access',
      'Pay-As-You-Go',
      'Ready to Work',
      'Amenities',
    ],
    showAppButtons: true,
  },
  {
    name: 'Term Rental',
    description: 'Best for regular users.',
    price: 'From $650',
    unit: '/month',
    priceNote: 'Individual and Team options available',
    features: [
      'Dedicated Desk',
      'Unlimited Access',
      'Premium WiFi',
      'On-Demand Network Discount',
    ],
    highlighted: true,
  },
];

export const PricingModal = ({ isOpen, onClose, onOpenPreRegister }: PricingModalProps) => {
  const handleTermRentalClick = () => {
    onOpenPreRegister?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-[32px] p-8 lg:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 min-w-[44px] min-h-[44px] text-[var(--lauft-mid-grey)] hover:text-[var(--lauft-darkest-grey)] transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="mb-8">
          <Headline
            size={40}
            color="#1D252C"
            style={{ marginBottom: 16, letterSpacing: '-0.01em' }}
          >
            LAUFT Oakville Pricing
          </Headline>

          <Body
            size={20}
            color="#5B6771"
            weight={500}
            style={{ marginBottom: 28 }}
          >
            Make Smart Work in Your Neighbourhood
          </Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`
                flex flex-col p-6 lg:p-8 rounded-2xl border-2 transition-all
                ${
                  tier.highlighted
                    ? 'border-[var(--lauft-azure)] bg-blue-50 relative md:scale-105'
                    : 'border-[var(--lauft-darkest-grey)] border-opacity-20 bg-white'
                }
              `}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-[var(--lauft-darkest-grey)] text-white text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <div className="font-lato font-bold text-lg text-[var(--lauft-darkest-grey)] mb-1">
                  {tier.name}
                </div>
                <Body size={13} color="#5B6771" weight={500}>
                  {tier.description}
                </Body>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {tier.price.includes('to') ? (
                    <span className="text-4xl font-black text-[var(--lauft-darkest-grey)] whitespace-nowrap">
                      $5 <span className="text-lg">to</span> $79
                    </span>
                  ) : tier.price.includes('From') ? (
                    <span className="text-4xl font-black text-[var(--lauft-darkest-grey)] whitespace-nowrap">
                      <span className="text-xs">From</span> $650
                    </span>
                  ) : (
                    <span className="text-4xl font-black text-[var(--lauft-darkest-grey)]">
                      {tier.price}
                    </span>
                  )}
                  <span className="text-sm text-[var(--lauft-mid-grey)]">{tier.unit}</span>
                </div>
                {tier.priceNote && (
                  <Body size={12} color="#5B6771" weight={500} style={{ marginTop: 4 }}>
                    {tier.priceNote}
                  </Body>
                )}
              </div>

              <div className="mb-6 flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="flex-shrink-0 mt-0.5"
                      >
                        <circle cx="10" cy="10" r="8" fill="none" stroke="#00ABEA" strokeWidth="2" />
                        <path
                          d="M6 10 L9 13 L14 7"
                          stroke="#00ABEA"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-[var(--lauft-darkest-grey)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.showAppButtons ? (
                <div className="flex gap-4">
                  <a
                    href="https://apps.apple.com/us/app/lauft-flexible-workspace/id1221998693"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                    style={{ width: '70px', height: '70px' }}
                    aria-label="Download LAUFT on Apple App Store"
                  >
                    <Image
                      src="/assets/apple.png"
                      alt="Apple App Store"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.lauft_mobile&hl=en_CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center flex-shrink-0 hover:opacity-80 transition-opacity"
                    style={{ width: '70px', height: '70px' }}
                    aria-label="Download LAUFT on Google Play"
                  >
                    <Image
                      src="/assets/android.png"
                      alt="Google Play Store"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </a>
                </div>
              ) : tier.name === 'Mail Service' ? (
                <a
                  href="https://lauft.work/mail-service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="primary" size="small" fullWidth className="sm:px-9 sm:py-4.5 sm:text-sm">
                    Select Plan
                  </Button>
                </a>
              ) : tier.name === 'Term Rental' ? (
                <Button
                  variant="primary"
                  size="small"
                  fullWidth
                  className="sm:px-9 sm:py-4.5 sm:text-sm"
                  onClick={handleTermRentalClick}
                >
                  Get Started
                </Button>
              ) : (
                <Button variant="primary" size="small" fullWidth className="sm:px-9 sm:py-4.5 sm:text-sm">
                  Select Plan
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <Body size={15} color="#5B6771" weight={500}>
            <strong>Need something custom?</strong> Contact our team at{' '}
            <a
              href="mailto:hello@lauft.work"
              className="text-[var(--lauft-azure)] hover:underline"
            >
              hello@lauft.work
            </a>{' '}
            for enterprise solutions.
          </Body>
        </div>
      </div>
    </div>
  );
};
