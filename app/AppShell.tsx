'use client';

import { BookingProvider } from './context/BookingContext';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
