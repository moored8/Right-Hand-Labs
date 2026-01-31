'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TRACK_WIDTH = 56;
const TRACK_HEIGHT = 28;
const THUMB_SIZE = 22;
const PADDING = 3;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="shrink-0 flex items-center justify-center rounded-full outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-2"
      style={{
        width: TRACK_WIDTH,
        height: TRACK_HEIGHT,
        background: isDark ? '#5D7DF6' : '#dbe1e8',
        border: `2px solid ${isDark ? '#3A4B8F' : '#c5cdd6'}`,
        borderRadius: TRACK_HEIGHT / 2,
      }}
    >
      <div className="relative w-full h-full flex items-center" style={{ padding: PADDING }}>
        {/* Sun (light) - left */}
        <div
          className="absolute left-0.5 flex items-center justify-center z-0"
          style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
        >
          <Sun className="w-3.5 h-3.5 text-amber-400" strokeWidth={2} />
        </div>
        {/* Moon (dark) - right */}
        <div
          className="absolute right-0.5 flex items-center justify-center z-0"
          style={{ width: THUMB_SIZE, height: THUMB_SIZE }}
        >
          <Moon
            className="w-3.5 h-3.5"
            style={{ color: isDark ? 'rgba(255,255,255,0.9)' : '#9ca3af' }}
            strokeWidth={2}
          />
        </div>
        {/* White thumb */}
        <motion.span
          className="absolute z-10 rounded-full bg-white shadow-md"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: PADDING,
            top: '50%',
            marginTop: -THUMB_SIZE / 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
          animate={{
            left: isDark ? TRACK_WIDTH - THUMB_SIZE - PADDING * 2 : PADDING,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </button>
  );
}
