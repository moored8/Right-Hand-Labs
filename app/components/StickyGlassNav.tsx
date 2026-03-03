'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface StickyGlassNavProps {
  onBookCall: () => void;
}

export default function StickyGlassNav({ onBookCall }: StickyGlassNavProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="nav-theme-aware fixed top-0 left-0 right-0 z-[100] flex items-center justify-end gap-2 px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 bg-neutral-950/70 backdrop-blur-xl border-b border-white/5 min-w-0 w-full"
    >
      <div className="flex items-center gap-2 sm:gap-6 shrink-0">
        <Link
          href="/innovations"
          className="nav-link text-white/90 hover:text-amber-500 font-medium text-xs sm:text-base transition-colors py-2"
        >
          Innovations
        </Link>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBookCall}
          className="schedule-call-btn shrink-0 whitespace-nowrap text-xs sm:text-sm md:text-base"
        >
          Schedule Call
        </motion.button>
      </div>
    </motion.nav>
  );
}
