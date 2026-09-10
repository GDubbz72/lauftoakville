'use client';

import Image from 'next/image';

const logos = [
  { src: '/assets/imagery/grey/algonquin.png', alt: 'Algonquin' },
  { src: '/assets/imagery/grey/bbm.png', alt: 'BBM' },
  { src: '/assets/imagery/grey/mainst_local.png', alt: 'Main St Local' },
  { src: '/assets/imagery/grey/nutty.png', alt: 'Nutty' },
  { src: '/assets/imagery/grey/otd.png', alt: 'OTD' },
  { src: '/assets/imagery/grey/pharmasave.png', alt: 'Pharma Save' },
  { src: '/assets/imagery/grey/the_hudson.png', alt: 'The Hudson' },
  { src: '/assets/imagery/grey/threshhold.png', alt: 'Threshold' },
];

export const ClientLogos = () => {
  return (
    <div className="px-4 py-6 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="font-lato font-black text-base text-[var(--lauft-azure)] tracking-wider uppercase">
            Meet Our Neighbours
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
          {logos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={366}
                height={244}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
