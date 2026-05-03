'use client';

import Image from 'next/image';
import { Button, Headline, Body } from '@/components/primitives';

interface OfficeAndContactProps {
  onBookTour: () => void;
  onContact: () => void;
}

export const OfficeAndContact = ({ onBookTour, onContact }: OfficeAndContactProps) => {
  return (
    <div className="px-4 pt-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-0 lg:gap-12">
      {/* Left: Office Space */}
      <div className="px-2 pt-2 lg:px-0 lg:pt-0 lg:border-r lg:border-[var(--lauft-azure)] lg:pr-12">
        <Headline
          color="#1D252C"
          style={{ fontSize: 'clamp(28px, 7vw, 56px)', marginBottom: 20, letterSpacing: '-0.02em' }}
        >
          Office Space<br />Available to Rent.
        </Headline>
        <Body
          size={16}
          color="#1D252C"
          weight={500}
          style={{ maxWidth: 460, marginBottom: 28 }}
        >
          Welcome to a remote work experience that isn't your couch or dining table.
          Whether you're flying solo or rolling 12-deep for a boardroom workshop,
          you only pay for what you use. <strong>Find it. Book it. Get to work.</strong>
        </Body>
        <Button variant="primary" size="small" onClick={onBookTour} className="sm:px-9 sm:py-4.5 sm:text-sm">
          Book a Tour
        </Button>
      </div>

      {/* Right: Mel Contact Card */}
      <div className="pt-2 lg:pt-0 lg:pl-12">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-7 lg:gap-12">
          {/* Left: Photo + Info (centered) */}
          <div className="flex flex-col items-center text-center">
            {/* Mel's photo */}
            <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mb-4">
              <Image
                src="/assets/imagery/mel_schembri.jpg"
                alt="Mel Schembri - Location Lead"
                fill
                className="object-cover"
              />
            </div>

            {/* Name and title */}
            <div className="mb-4">
              <div className="font-lato font-black text-base text-[var(--lauft-darkest-grey)] uppercase tracking-wide">
                Mel Schembri
              </div>
              <div className="font-lato font-semibold text-xs text-[var(--lauft-mid-grey)] uppercase tracking-widest mt-0.5">
                Brand Lead, Oakville
              </div>
            </div>

            {/* LinkedIn button */}
            <a
              href="https://ca.linkedin.com/in/mel-schembri-b727a625"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" size="small" className="sm:px-9 sm:py-4.5 sm:text-sm">
                LinkedIn
              </Button>
            </a>
          </div>

          {/* Right: Copy text + buttons */}
          <div className="flex flex-col">
            <Body
              size={15}
              color="#1D252C"
              weight={500}
              style={{ marginBottom: 28 }}
            >
              Want to bring your team to LAUFT Oakville? Our location lead Mel has the
              answers — pricing, walkthroughs, and team plans, on your timeline.
            </Body>

            {/* Action buttons - stacked vertically */}
            <div className="flex flex-col gap-2.5">
              <Button variant="primary" size="small" onClick={onBookTour}>
                Book a Tour
              </Button>
              <Button variant="outline" size="small" onClick={onContact}>
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
