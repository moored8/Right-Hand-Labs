'use client';

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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 bg-neutral-950/70 backdrop-blur-xl border-b border-white/5"
      style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
    >
      <div style={{ paddingLeft: '1rem' }} className="flex items-center gap-3">
        <Logo size="md" showText={false} className="flex-row gap-2" />
        <span className="text-white font-semibold text-sm md:text-base tracking-tight">
          RIGHT HAND LABS
        </span>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBookCall}
        className="px-6 py-2.5 md:px-8 md:py-3 border border-amber-500 bg-transparent text-amber-500 font-medium text-sm md:text-base rounded-sm hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
        style={{ marginRight: '2rem' }}
      >
        Book Strategy Call
      </motion.button>
    </motion.nav>
  );
}
