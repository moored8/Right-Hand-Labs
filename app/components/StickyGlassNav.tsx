'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

interface StickyGlassNavProps {
  onBookCall: () => void;
}

export default function StickyGlassNav({ onBookCall }: StickyGlassNavProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="nav-theme-aware fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-4 bg-neutral-950/70 backdrop-blur-xl border-b border-white/5"
      style={{ paddingLeft: '2rem', paddingRight: '2rem', position: 'fixed' }}
    >
      <Link href="/" style={{ paddingLeft: '1rem' }} className="flex items-center">
        <Logo size="md" showText={false} className="flex-row gap-2" />
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/innovations"
          className="nav-link text-white/90 hover:text-amber-500 font-medium text-sm md:text-base transition-colors"
        >
          Innovations
        </Link>
        <ThemeToggle />
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBookCall}
        className="shrink-0 whitespace-nowrap px-6 py-2.5 md:px-8 md:py-3 bg-amber-500 text-neutral-950 font-bold text-sm md:text-base rounded-lg shadow-lg shadow-amber-500/30 hover:bg-amber-400 hover:shadow-amber-500/50 transition-all duration-200 min-w-[140px] md:min-w-[160px]"
        style={{ marginRight: '2rem' }}
      >
        Schedule Call
      </motion.button>
      </div>
    </motion.nav>
  );
}
