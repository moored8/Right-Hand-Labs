'use client';

import { useState } from 'react';
import MouseSpotlight from './components/MouseSpotlight';
import CircuitBackground from './components/CircuitBackground';
import StickyGlassNav from './components/StickyGlassNav';
import Hero from './components/Hero';
import Friction from './components/Friction';
import Arsenal from './components/Arsenal';
import CTA, { BookingModal } from './components/CTA';
import Logo from './components/Logo';
import HighLevelPhoneAgent from './components/HighLevelPhoneAgent';
import HighLevelChatbot from './components/HighLevelChatbot';
import Footer from './components/Footer';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white overflow-x-hidden" style={{ overflowY: 'auto' }}>
      {/* Dark Theme with CSS-Generated Circuit Board Pattern Background */}
      <CircuitBackground />
      
      {/* Grid Texture Overlay */}
      <div className="grid-texture" />
      
      {/* Mouse Spotlight Effect */}
      <MouseSpotlight />
      
      {/* Navigation */}
      <StickyGlassNav onBookCall={() => setIsModalOpen(true)} />
      
      {/* Hero Logo - Sticky */}
      <div 
        className="sticky z-[60] flex justify-center items-center w-full" 
        style={{ 
          top: '0',
          paddingTop: '5rem',
          paddingBottom: '12rem',
          position: 'sticky',
          willChange: 'transform',
          minHeight: '280px',
          overflow: 'visible',
          marginBottom: '0',
          background: 'transparent'
        }}
      >
        <div className="w-full max-w-6xl px-8 md:px-12 flex flex-col items-center justify-center" style={{ overflow: 'visible' }}>
          <Logo size="xl" showText={false} />
        </div>
      </div>
      
      {/* Content Sections */}
      <div className="relative z-10" style={{ marginTop: '-8rem' }}>
        <Hero />
        <Friction />
        {/* Honeycomb Grid Layout for Content Items */}
        <Arsenal onBookCall={() => setIsModalOpen(true)} />
        <CTA onBookCall={() => setIsModalOpen(true)} />
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* HighLevel Phone Agent Widget */}
      <HighLevelPhoneAgent 
        phoneNumber={process.env.NEXT_PUBLIC_HIGHLEVEL_PHONE_NUMBER || "YOUR_NUMBER_HERE"}
      />
      
      {/* HighLevel Chatbot Widget */}
      <HighLevelChatbot />
    </main>
  );
}
