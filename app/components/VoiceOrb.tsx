'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';

const ORB_SIZE = 64;
const GLOW_IDLE = '0 0 56px 20px rgba(59, 130, 246, 0.55), 0 0 28px 8px rgba(96, 165, 250, 0.4)';
const GLOW_LISTENING = '0 0 56px 20px rgba(168, 85, 247, 0.6), 0 0 28px 10px rgba(239, 68, 68, 0.35)';
const GLOW_THINKING = '0 0 52px 18px rgba(139, 92, 246, 0.5)';
const GLOW_SPEAKING = '0 0 60px 22px rgba(59, 130, 246, 0.55)';

export default function VoiceOrb() {
  const [state, setState] = useState<OrbState>('idle');
  const [volume, setVolume] = useState(0);
  const volumeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulated volume for speaking state (replace with real audio level later)
  useEffect(() => {
    if (state !== 'speaking') {
      if (volumeInterval.current) {
        clearInterval(volumeInterval.current);
        volumeInterval.current = null;
      }
      setVolume(0);
      return;
    }
    let phase = 0;
    volumeInterval.current = setInterval(() => {
      phase += 0.15;
      setVolume(0.3 + 0.5 * Math.abs(Math.sin(phase)));
    }, 80);
    return () => {
      if (volumeInterval.current) clearInterval(volumeInterval.current);
    };
  }, [state]);

  const handleClick = () => {
    if (state === 'idle') {
      setState('listening');
      // Simulate flow: listening -> thinking -> speaking -> idle (for demo)
      setTimeout(() => setState('thinking'), 2000);
      setTimeout(() => setState('speaking'), 4000);
      setTimeout(() => setState('idle'), 8000);
    }
  };

  const glow =
    state === 'listening'
      ? GLOW_LISTENING
      : state === 'thinking'
        ? GLOW_THINKING
        : state === 'speaking'
          ? GLOW_SPEAKING
          : GLOW_IDLE;

  const scaleSpeaking = 0.92 + volume * 0.2;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-center justify-center gap-3">
      <motion.button
        type="button"
        aria-label="Start voice conversation"
        onClick={handleClick}
        className="relative rounded-full outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ring-2 ring-blue-400/50 ring-offset-2 ring-offset-neutral-950"
        style={{ width: ORB_SIZE, height: ORB_SIZE }}
        animate={{
          scale: state === 'speaking' ? scaleSpeaking : 1,
          boxShadow: glow,
          rotate: state === 'thinking' ? [0, 360] : 0,
        }}
        transition={{
          scale: state === 'speaking' ? { type: 'spring', stiffness: 300, damping: 20 } : { duration: 0.3 },
          boxShadow: { duration: 0.35 },
          rotate:
            state === 'thinking'
              ? { repeat: Infinity, duration: 5, ease: 'linear' }
              : { duration: 0.4 },
        }}
      >
        {/* Glassmorphism orb */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/20 backdrop-blur-xl"
          style={{
            background:
              state === 'listening'
                ? 'radial-gradient(140% 140% at 50% 50%, rgba(168, 85, 247, 0.35), rgba(239, 68, 68, 0.2))'
                : state === 'thinking'
                  ? 'radial-gradient(140% 140% at 50% 50%, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.15))'
                  : state === 'speaking'
                    ? 'radial-gradient(140% 140% at 50% 50%, rgba(59, 130, 246, 0.4), rgba(30, 64, 175, 0.2))'
                    : 'radial-gradient(140% 140% at 50% 50%, rgba(59, 130, 246, 0.25), rgba(30, 64, 175, 0.15))',
          }}
          animate={{
            opacity: state === 'thinking' ? [1, 0.85, 1] : 1,
          }}
          transition={{
            opacity: state === 'thinking' ? { repeat: Infinity, duration: 1.2 } : { duration: 0.2 },
          }}
        />
        {/* Idle: slow breathing */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12), transparent 70%)',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.06)',
          }}
          animate={
            state === 'idle'
              ? { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }
              : state === 'listening'
                ? { scale: [1, 1.15, 1], opacity: [0.9, 1, 0.9] }
                : {}
          }
          transition={{
            scale: state === 'idle' ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : { repeat: Infinity, duration: 0.6 },
            opacity: state === 'idle' ? { repeat: Infinity, duration: 2.5 } : { repeat: Infinity, duration: 0.6 },
          }}
        />
        {/* Thinking: shimmer */}
        <AnimatePresence>
          {state === 'thinking' && (
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.25) 45%, transparent 55%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Inner highlight */}
        <div
          className="absolute inset-[20%] rounded-full bg-white/25"
          style={{ top: '18%', left: '22%', width: '35%', height: '35%' }}
        />
      </motion.button>
      <p className="text-center text-sm font-medium text-white/90 tracking-wide">
        This Site Can Talk to You
      </p>
    </div>
  );
}
