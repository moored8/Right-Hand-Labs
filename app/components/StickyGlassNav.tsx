'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface StickyGlassNavProps {
  onBookCall: () => void;
}

export default function StickyGlassNav({ onBookCall }: StickyGlassNavProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="nav-theme-aware fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-2 py-2.5 px-3 sm:py-4 sm:px-6 md:px-8 bg-neutral-950/70 backdrop-blur-xl border-b border-white/5 min-w-0 w-full"
    >
      <Link href="/" className="flex items-center min-w-0 shrink overflow-hidden" aria-label="Home">
        <Logo size="md" showText={false} className="flex-row gap-2 max-w-[120px] sm:max-w-none" />
      </Link>

      <div className="flex items-center gap-2 sm:gap-6 shrink-0">
        <Link
          href="/innovations"
          className="nav-link text-white/90 hover:text-amber-500 font-medium text-xs sm:text-base transition-colors py-2"
        >
          Innovations
        </Link>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookCall}
          className="schedule-call-btn shrink-0 whitespace-nowrap px-3 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-amber-500 text-neutral-950 font-bold text-xs sm:text-sm md:text-base rounded-lg shadow-lg shadow-amber-500/30 hover:bg-amber-400 min-h-[44px] sm:min-h-0"
        >
          Schedule Call
        </motion.button>
      </div>
    </motion.nav>
  );
}
