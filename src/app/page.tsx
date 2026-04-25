'use client';

import { useRef, useState } from 'react';
import {
  Navbar,
  Hero,
  OfficeAndContact,
  WhyOakville,
  VirtualTour,
  Roadmap,
  FinalCTA,
  Footer,
} from '@/components/sections';
import { BookTourModal } from '@/components/sections/BookTourModal';
import { PreRegisterModal } from '@/components/sections/PreRegisterModal';

export default function Home() {
  const registerRef = useRef<HTMLDivElement>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openTourModal = () => {
    setIsTourModalOpen(true);
  };

  const openPreRegisterModal = () => {
    setIsPreRegisterModalOpen(true);
  };

  return (
    <div className="w-full bg-white">
      <Navbar onPreRegister={openPreRegisterModal} />

      <main className="mx-auto max-w-7xl w-full">
        <div className="animate-fadeUp animation-delay-60">
          <Hero onRegister={openPreRegisterModal} />
        </div>
        <div className="animate-fadeUp animation-delay-140">
          <OfficeAndContact onBookTour={openTourModal} onContact={scrollToRegister} />
        </div>
        <WhyOakville onRegister={openPreRegisterModal} />
        <VirtualTour onTour={scrollToRegister} />
        <Roadmap registrationRef={registerRef} />
        <FinalCTA onClaim={openPreRegisterModal} />
      </main>

      <Footer />

      <BookTourModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
      <PreRegisterModal isOpen={isPreRegisterModalOpen} onClose={() => setIsPreRegisterModalOpen(false)} />
    </div>
  );
}
