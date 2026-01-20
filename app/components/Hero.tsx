'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Logo from './Logo';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const text = 'AUTOMATING THE MUNDANE.';
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-0 flex items-start justify-center overflow-visible pt-48 pb-8"
    >
      {/* Parallax Grid Background */}
      <motion.div
        style={{ y: gridY, opacity }}
        className="absolute inset-0 opacity-20"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(1000px) rotateX(60deg)',
            transformOrigin: 'center center',
          }}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 px-6 md:px-12 text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-amber-500 tracking-tighter leading-tight">
          {words.map((word, wordIndex) => (
            <div key={wordIndex} className="block mb-1 md:mb-2">
              {word.split('').map((letter, letterIndex) => (
                <motion.span
                  key={letterIndex}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 md:mt-6 text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          Focus on what matters: your clients, your creativity, and your objectives.
        </motion.p>
      </motion.div>
    </section>
  );
}
