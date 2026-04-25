'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button, Headline, Body } from '@/components/primitives';

const YOUTUBE_VIDEO_ID = 'AbsxVnzRDyo';

interface VirtualTourProps {
  onTour: () => void;
}

export const VirtualTour = ({ onTour }: VirtualTourProps) => {
  const [hovPlay, setHovPlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = () => {
    setIsModalOpen(true);
    onTour?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="px-4 py-8">
      {/* Background container */}
      <div className="relative rounded-[32px] overflow-hidden min-h-[420px] sm:min-h-[560px] lg:min-h-[700px] flex items-center bg-cover bg-center" style={{backgroundImage: 'url(/assets/imagery/virtual_tour.png)'}}>
        {/* Poster image as fallback */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <Image
            src="/assets/imagery/virtual_tour.png"
            alt="LAUFT Oakville Virtual Tour"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Content overlay */}
        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14 w-full">
          <div className="flex flex-col gap-6 max-w-sm">
            <Headline
              color="#fff"
              style={{ fontSize: 'clamp(36px, 8vw, 92px)', letterSpacing: '-0.02em' }}
            >
              Virtual<br />Tour<span style={{ color: '#00ABEA' }}>.</span>
            </Headline>

            <Body
              size={15}
              color="rgba(255,255,255,0.95)"
              weight={500}
            >
              Step inside LAUFT Oakville before opening day. Our immersive 📺 video tour walks
              you through every space — from SmartDesks to the SmartBoardroom — so you can
              picture exactly where you'll get your best work done.
            </Body>
            <div>
              <Button variant="primary" size="large" onClick={handlePlay}>
                Take a Virtual Tour
              </Button>
            </div>
          </div>

          {/* Center play button */}
          <div
            onClick={handlePlay}
            onMouseEnter={() => setHovPlay(true)}
            onMouseLeave={() => setHovPlay(false)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          >
            <div
              className="transition-transform duration-200"
              style={{
                transform: `scale(${hovPlay ? 1.1 : 1})`,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <path d="M9 6 L23 14 L9 22 Z" fill="#1D252C" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl aspect-video">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 p-2 text-white hover:text-gray-300 transition-colors min-w-[44px] min-h-[44px]"
              aria-label="Close modal"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* YouTube embed - full video */}
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=1`}
              title="LAUFT Oakville Virtual Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
