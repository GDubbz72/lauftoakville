'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Headline, Body } from '@/components/primitives';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pricingTiers = [
  {
    name: 'Hourly',
    description: 'Perfect for quick work sessions',
    price: '$15',
    unit: '/hour',
    features: ['Access to all spaces', 'High-speed WiFi', 'Complimentary coffee'],
  },
  {
    name: 'Daily',
    description: 'Ideal for flexible schedules',
    price: '$49',
    unit: '/day',
    features: ['Access to all spaces', 'High-speed WiFi', 'All amenities', 'Phone booths'],
  },
  {
    name: 'Monthly',
    description: 'Best for regular users',
    price: '$349',
    unit: '/month',
    features: ['Dedicated desk', 'Unlimited access', 'Premium WiFi', 'All amenities', 'Priority booking'],
    highlighted: true,
  },
];

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
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
            size={14}
            color="#5B6771"
            weight={500}
            style={{ marginBottom: 28 }}
          >
            Choose the plan that works best for you. No contracts, no hidden fees.
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-[var(--lauft-azure)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
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
                  <span className="text-4xl font-black text-[var(--lauft-darkest-grey)]">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[var(--lauft-mid-grey)]">{tier.unit}</span>
                </div>
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

              <Button variant="primary" size="small" fullWidth className="sm:px-9 sm:py-4.5 sm:text-sm">
                {tier.name === 'Monthly' ? 'Get Started' : `Book ${tier.name}`}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <Body size={13} color="#5B6771" weight={500}>
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
