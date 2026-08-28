'use client';

import { BookingProvider } from './context/BookingContext';
import ChatBot from './components/ChatBot';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}<ChatBot /></BookingProvider>;
}
