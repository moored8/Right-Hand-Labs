'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Logo from './Logo';

export default function Friction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const glitchVariants = {
    normal: {
      x: 0,
      y: 0,
    },
    glitch: {
      x: [0, -2, 2, -1, 1, 0],
      y: [0, 1, -1, 2, -2, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      animate={{
        backgroundColor: isInView
          ? ['rgb(10, 10, 10)', 'rgb(20, 5, 5)', 'rgb(10, 10, 10)']
          : 'rgb(10, 10, 10)',
      }}
      transition={{
        duration: 2,
        repeat: isInView ? Infinity : 0,
        repeatType: 'reverse',
      }}
      className="friction-section relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-20 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 sm:space-y-8 max-w-[100vw] overflow-hidden"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter break-words">
          DIFFERENT INDUSTRIES.
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter break-words">
          ONE COMMON ENEMY.
        </h2>
        
        <motion.div
          variants={glitchVariants}
          animate={isInView ? 'glitch' : 'normal'}
          className="mt-8 sm:mt-12"
        >
          <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-amber-500 tracking-tighter break-words">
            FRICTION
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto space-y-4 sm:space-y-6 px-1"
        >
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/90 tracking-tight leading-relaxed break-words">
            TIRED OF BEING SOLD SOLUTIONS WHEN THEY DON'T EVEN KNOW YOUR PROBLEM.
          </p>
          <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-amber-500 tracking-tight leading-relaxed break-words">
            SHOW US THE FRICTION AND WE WILL SHOW YOU THE SOLUTION.
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
