'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizes = {
    sm: { height: 48, text: 'text-sm' },
    md: { height: 60, text: 'text-base' },
    lg: { height: 120, text: 'text-xl' },
    xl: { height: 240, text: 'text-2xl' },
    '2xl': { height: 360, text: 'text-3xl' }, // 50% larger than xl
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ background: 'transparent' }}>
      {/* Logo Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-shrink-0 relative flex items-center justify-center"
        style={{ height: `${currentSize.height}px`, width: 'auto', marginTop: '0', paddingTop: '0', background: 'transparent', border: 'none', boxShadow: 'none' }}
      >
        {imageError ? (
          <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 rounded-sm border-2 border-amber-500/50 shadow-lg">
            <div className="text-center">
              <span className="font-bold text-amber-500 text-lg md:text-xl block">RHL</span>
              <span className="text-amber-500/70 text-xs block mt-1">Right Hand Labs</span>
            </div>
          </div>
        ) : (
          <div className="logo-theme-aware relative logo-container flex items-center justify-center" style={{ height: `${currentSize.height}px`, width: 'auto', background: 'transparent', border: 'none', borderWidth: 0, outline: 'none', boxShadow: 'none' }}>
            <img
              src="/logo2.png"
              alt="Right Hand Labs Logo"
              className="logo-image object-contain"
              style={{ 
                height: '100%', 
                width: 'auto', 
                maxWidth: '100%', 
                objectFit: 'contain',
                background: 'transparent',
                backgroundColor: 'transparent',
                border: 'none',
                borderWidth: 0,
                borderStyle: 'none',
                borderColor: 'transparent',
                outline: 'none',
                outlineWidth: 0,
                outlineColor: 'transparent',
                boxShadow: 'none',
                margin: 0,
                padding: 0,
                display: 'block'
              }}
              onError={() => {
                console.log('Logo image failed to load, showing fallback');
                setImageError(true);
              }}
              onLoad={() => console.log('Logo image loaded successfully')}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
