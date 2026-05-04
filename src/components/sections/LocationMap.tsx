'use client';

import { Body } from '@/components/primitives';

export const LocationMap = () => {
  return (
    <div className="px-4 py-[38px] lg:py-[51px]">
      <div className="mx-auto max-w-5xl">
        {/* Address and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 lg:gap-12">
          {/* Left: Address */}
          <div>
            <div className="mb-6">
              <div className="font-lato font-bold text-sm text-[var(--lauft-azure)] uppercase tracking-wider mb-3">
                Location
              </div>
              <div className="font-lato font-black text-lg text-[var(--lauft-darkest-grey)] mb-3">
                LAUFT Oakville
              </div>
              <Body size={15} color="#1D252C" weight={500} style={{ lineHeight: '1.6' }}>
                297 Oak Walk Drive<br />
                Oakville, ON L6H 3R6<br />
                Canada
              </Body>
            </div>

            {/* Hours or additional info */}
            <div>
              <div className="font-lato font-bold text-sm text-[var(--lauft-azure)] uppercase tracking-wider mb-3">
                Hours
              </div>
              <Body size={14} color="#5B6771" weight={500}>
                Coming Soon
              </Body>
            </div>
          </div>

          {/* Right: Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8243179999997!2d-79.2638!3d43.4516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b7b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s297%20Oak%20Walk%20Dr%2C%20Oakville%2C%20ON%20L6H%203R6!5e0!3m2!1sen!2sca!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
