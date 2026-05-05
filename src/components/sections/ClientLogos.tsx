'use client';

import Image from 'next/image';

const logos = [
  { src: '/assets/imagery/grey/carnatic.png', alt: 'Carnatic' },
  { src: '/assets/imagery/grey/chalu.png', alt: 'Chalu' },
  { src: '/assets/imagery/grey/coco.png', alt: 'Coco' },
  { src: '/assets/imagery/grey/dearcroft.png', alt: 'Dearcroft' },
  { src: '/assets/imagery/grey/funhq.png', alt: 'FunHQ' },
  { src: '/assets/imagery/grey/kiwi.png', alt: 'Kiwi' },
  { src: '/assets/imagery/grey/pizzanova.png', alt: 'Pizzanova' },
  { src: '/assets/imagery/grey/strong.png', alt: 'Strong' },
  { src: '/assets/imagery/grey/sarang.png', alt: 'Sarang' },
  { src: '/assets/imagery/grey/keg.png', alt: 'Keg' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[10px]">
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
