'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { ThemeProvider } from './ThemeContext';
import StickyGlassNav from '../components/StickyGlassNav';
import { BookingModal } from '../components/CTA';
import VoiceOrb from '../components/VoiceOrb';
import HighLevelVoiceWidget from '../components/HighLevelVoiceWidget';

type BookingContextType = {
  openBookingModal: () => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) return { openBookingModal: () => {} };
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openBookingModal = useCallback(() => setIsModalOpen(true), []);

  return (
    <ThemeProvider>
      <BookingContext.Provider value={{ openBookingModal }}>
        <StickyGlassNav onBookCall={() => setIsModalOpen(true)} />
        {children}
        <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <HighLevelVoiceWidget />
        <VoiceOrb />
      </BookingContext.Provider>
    </ThemeProvider>
  );
}
