'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import StickyGlassNav from '../components/StickyGlassNav';
import { BookingModal } from '../components/CTA';
import VoiceOrb from '../components/VoiceOrb';

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
    <BookingContext.Provider value={{ openBookingModal }}>
      <StickyGlassNav onBookCall={() => setIsModalOpen(true)} />
      {children}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <VoiceOrb />
    </BookingContext.Provider>
  );
}
