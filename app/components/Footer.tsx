'use client';

import Logo from './Logo';
import { useBooking } from '../context/BookingContext';
import { Facebook, Mail } from 'lucide-react';

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61586903937860';

export default function Footer() {
  const { openBookingModal } = useBooking();

  return (
    <>
      {/* Logo above footer - same size as hero */}
      <div className="relative z-10 flex justify-center items-center w-full py-12 md:py-16">
        <Logo size="2xl" showText={false} />
      </div>
      <footer className="relative z-10 w-full bg-neutral-950/80 backdrop-blur-sm border-t border-white/5 flex flex-col items-center justify-center px-6 md:px-12 py-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Icons + Send Feedback button (below logo, above copyright) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Right Hand Labs on Facebook"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-amber-500 hover:bg-white/5 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={openBookingModal}
              aria-label="Open contact form"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/70 hover:text-amber-500 hover:bg-white/5 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={openBookingModal}
              className="px-6 py-2.5 border border-amber-500 bg-transparent text-amber-500 font-medium text-sm rounded-sm hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
            >
              Send Feedback
            </button>
          </div>
          <p className="text-white/60 text-sm">
            © 2026 Right Hand Labs. All rights reserved.
          </p>
          <p className="text-white/60 text-sm mt-1">
            Right Hand Labs™ is a trademark of Right Hand Labs.
          </p>
        </div>
      </footer>
    </>
  );
}
