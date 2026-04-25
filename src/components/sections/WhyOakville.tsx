'use client';

import { Button, SectionHeading, Body } from '@/components/primitives';

interface WhyOakvilleProps {
  onRegister: () => void;
}

const benefits = [
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <path d="M6 30 L18 18 L26 26 L38 14" stroke="#1D252C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 14 L38 14 L38 22" stroke="#1D252C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="30" r="2.5" fill="#00ABEA" />
      </svg>
    ),
    title: 'Skip the Commute',
    body: 'Cut out the morning crawl on the QEW. Book a desk minutes from home and reclaim two hours of your day.',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="8" y="14" width="28" height="18" rx="2" stroke="#1D252C" strokeWidth="2" />
        <path d="M14 14 V10 M30 14 V10" stroke="#1D252C" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 20 H36" stroke="#1D252C" strokeWidth="2" />
        <circle cx="22" cy="26" r="2.5" fill="#00ABEA" />
      </svg>
    ),
    title: 'Flexible Pricing',
    body: 'Book by the hour, day, or month. No contracts, no memberships — just space when you need it.',
  },
  {
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="14" stroke="#1D252C" strokeWidth="2" />
        <path d="M22 8 V36 M8 22 H36" stroke="#1D252C" strokeWidth="2" />
        <path d="M22 8 C 14 16, 14 28, 22 36 M22 8 C 30 16, 30 28, 22 36" stroke="#1D252C" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="3" fill="#00ABEA" />
      </svg>
    ),
    title: 'Amenity Rich Area',
    body: 'Surrounded by retail, dining, and parks. Step out for lunch or a meeting and right back to focus.',
  },
];

export const WhyOakville = ({ onRegister }: WhyOakvilleProps) => {
  return (
    <div className="px-4 py-22 lg:py-16">
      <SectionHeading
        size={36}
        align="center"
        weight={700}
        style={{ marginBottom: 56 }}
      >
        Why work in Oakville?
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-14 max-w-4xl mx-auto mb-14">
        {benefits.map((benefit, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center px-3"
          >
            <div className="mb-4">{benefit.icon}</div>
            <div className="font-lato font-black text-base text-[var(--lauft-azure)] mb-3 tracking-wider">
              {benefit.title}
            </div>
            <Body size={14} color="#1D252C" weight={500} style={{ maxWidth: 260 }}>
              {benefit.body}
            </Body>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="primary" size="large" onClick={onRegister}>
          Register Today
        </Button>
      </div>
    </div>
  );
};
