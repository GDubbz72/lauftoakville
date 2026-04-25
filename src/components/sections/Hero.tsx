'use client';

import Image from 'next/image';
import { Button, Headline, Eyebrow, CircleAccent } from '@/components/primitives';

interface HeroProps {
  onRegister?: () => void;
}

export const Hero = ({ onRegister }: HeroProps) => {
  return (
    <div className="px-4 pb-4">
      <div
        className="relative w-full min-h-[400px] sm:min-h-[520px] lg:min-h-[620px] rounded-[32px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url(/assets/imagery/hero_oakville.png) center / cover no-repeat',
        }}
      >
        <Image
          src="/assets/imagery/hero_oakville.png"
          alt="Oakville workspace"
          fill
          className="absolute inset-0 object-cover -z-10"
          priority
        />

        <div className="relative h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
          {/* Eyebrow */}
          <div>
            <Eyebrow color="#00ABEA">Coming Soon</Eyebrow>
          </div>

          {/* Headline + CTA */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-end sm:gap-12 mt-auto">
            <div className="max-w-[980px] w-full">
              <Headline color="#fff" style={{ fontSize: 'clamp(44px, 10vw, 104px)', marginBottom: 6 }}>
                Oakville…
              </Headline>
              <Headline color="#fff" style={{ fontSize: 'clamp(44px, 10vw, 104px)', marginBottom: 6 }}>
                Your New Commute
              </Headline>
              <Headline color="#fff" style={{ fontSize: 'clamp(44px, 10vw, 104px)' }}>
                <span>Starts </span>
                <span className="relative inline-block px-4.5 pb-2">
                  <CircleAccent color="#00ABEA" stroke={5} />
                  <span className="relative">Here</span>
                </span>
                <span>.</span>
              </Headline>
            </div>
            <div className="pb-2 flex-shrink-0">
              <Button variant="primary" size="xlarge" onClick={onRegister}>
                Pre-Register Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
