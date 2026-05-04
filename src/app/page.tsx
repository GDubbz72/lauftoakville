'use client';

import { useRef, useState } from 'react';
import {
  Navbar,
  Hero,
  OfficeAndContact,
  LocationMap,
  WhyOakville,
  VirtualTour,
  Roadmap,
  FinalCTA,
  Footer,
} from '@/components/sections';
import { BookTourModal } from '@/components/sections/BookTourModal';
import { PreRegisterModal } from '@/components/sections/PreRegisterModal';
import { PricingModal } from '@/components/sections/PricingModal';

export default function Home() {
  const registerRef = useRef<HTMLDivElement>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isPreRegisterModalOpen, setIsPreRegisterModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openTourModal = () => {
    setIsTourModalOpen(true);
  };

  const openPreRegisterModal = () => {
    setIsPreRegisterModalOpen(true);
  };

  const openPricingModal = () => {
    setIsPricingModalOpen(true);
  };

  return (
    <div className="w-full bg-white">
      <Navbar onPreRegister={openPreRegisterModal} onPricing={openPricingModal} />

      <main className="mx-auto max-w-7xl w-full">
        <div className="animate-fadeUp animation-delay-60">
          <Hero onRegister={openPreRegisterModal} />
        </div>
        <div className="animate-fadeUp animation-delay-140">
          <OfficeAndContact onBookTour={openTourModal} onContact={scrollToRegister} />
        </div>
        <LocationMap />
        <WhyOakville onRegister={openPreRegisterModal} />
        <VirtualTour onTour={scrollToRegister} />
        <Roadmap registrationRef={registerRef} />
        <FinalCTA onClaim={openPreRegisterModal} />
      </main>

      <Footer onPricing={openPricingModal} />

      <BookTourModal isOpen={isTourModalOpen} onClose={() => setIsTourModalOpen(false)} />
      <PreRegisterModal isOpen={isPreRegisterModalOpen} onClose={() => setIsPreRegisterModalOpen(false)} />
      <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} onOpenPreRegister={openPreRegisterModal} />
    </div>
  );
}
