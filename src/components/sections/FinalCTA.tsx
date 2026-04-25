'use client';

import Image from 'next/image';
import { Button, Headline, Body } from '@/components/primitives';

interface FinalCTAProps {
  onClaim: () => void;
}

export const FinalCTA = ({ onClaim }: FinalCTAProps) => {
  return (
    <div className="px-4 py-8">
      <div className="bg-[var(--lauft-darkest-grey)] rounded-[32px] px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16 text-white text-center relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-7">
          <Headline
            color="#fff"
            align="center"
            style={{ fontSize: 'clamp(28px, 7vw, 64px)', letterSpacing: '-0.02em', margin: 0 }}
          >
            Seize
          </Headline>
          <div className="w-24 h-14 rounded-full border-4 border-[var(--lauft-azure)] overflow-hidden bg-gray-700 flex-shrink-0">
            <Image
              src="/assets/imagery/workspace_modern.jpg"
              alt="Modern workspace"
              width={96}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <Headline
            color="#fff"
            align="center"
            style={{ fontSize: 'clamp(28px, 7vw, 64px)', letterSpacing: '-0.02em', margin: 0 }}
          >
            The Moment
          </Headline>
        </div>

        <Headline
          color="#fff"
          align="center"
          style={{ fontSize: 'clamp(28px, 7vw, 64px)', letterSpacing: '-0.02em', marginBottom: 28 }}
        >
          Join LAUFT <span style={{ color: '#00ABEA' }}>Today!</span>
        </Headline>

        <Body
          size={15}
          color="rgba(255,255,255,0.85)"
          weight={500}
          style={{ maxWidth: 620, margin: '0 auto 36px' }}
        >
          Convenient. Consistent. Professional. Pre-register now to lock in founding-member
          pricing and be first through the doors at LAUFT Oakville.
        </Body>

        <Button variant="primary" size="large" onClick={onClaim}>
          Claim Your Spot
        </Button>
      </div>
    </div>
  );
};
