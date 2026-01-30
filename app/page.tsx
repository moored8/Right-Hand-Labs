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
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* Dark Theme with CSS-Generated Circuit Board Pattern Background */}
      <CircuitBackground />
      
      {/* Grid Texture Overlay */}
      <div className="grid-texture" />
      
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />
      
      {/* Hero Logo - scrolls with page */}
      <div
        className="relative z-[40] flex justify-center items-center w-full"
        style={{
          paddingTop: '5rem',
          paddingBottom: '12rem',
          minHeight: '280px',
          background: 'transparent',
        }}
      >
        <div className="w-full max-w-6xl px-8 md:px-12 flex flex-col items-center justify-center">
          <Logo size="xl" showText={false} />
        </div>
      </div>

      {/* Content Sections */}
      <div className="relative z-10" style={{ marginTop: '-8rem' }}>
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
