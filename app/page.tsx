'use client';

import { useBooking } from './context/BookingContext';
import MouseSpotlight from './components/MouseSpotlight';
import CircuitBackground from './components/CircuitBackground';
import Hero from './components/Hero';
import Friction from './components/Friction';
import Arsenal from './components/Arsenal';
import CTA from './components/CTA';
import Logo from './components/Logo';
import Footer from './components/Footer';

export default function Home() {
  const { openBookingModal } = useBooking();
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-x-hidden overflow-y-visible w-full min-w-0">
      {/* Dark Theme with CSS-Generated Circuit Board Pattern Background */}
      <CircuitBackground />
      
      {/* Grid Texture Overlay */}
      <div className="grid-texture" />
      
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />
      
      {/* Hero Logo - scrolls with page, fits mobile */}
      <div className="relative z-[40] flex justify-center items-center w-full pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-[12rem] min-h-[280px] sm:min-h-[360px] md:min-h-[440px] bg-transparent px-4 overflow-visible">
        <div className="w-full max-w-[min(100%,90vw)] flex flex-col items-center justify-center overflow-visible">
          <div className="logo-hero-footer-size w-full flex justify-center max-w-full overflow-visible">
            <Logo size="2xl" showText={false} />
          </div>
        </div>
      </div>

      {/* Content Sections - single column flow on mobile */}
      <div className="relative z-10 w-full min-w-0">
        <Hero />
        <Friction />
        {/* Honeycomb Grid Layout for Content Items */}
        <Arsenal onBookCall={openBookingModal} />
        <CTA onBookCall={openBookingModal} />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
