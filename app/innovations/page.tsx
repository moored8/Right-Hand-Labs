'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Radio, Home, Contact, Bot } from 'lucide-react';

const products = [
  {
    slug: 'firstring',
    title: 'First Ring',
    badge: 'Live',
    description: 'Voice AI that works for your business.',
    href: '/innovations/firstring',
    comingSoon: false,
    icon: Radio,
  },
  {
    slug: 'realtor-listing-agent',
    title: 'Realtor Listing Agent',
    badge: 'Coming soon',
    description: 'AI-powered listing and lead management for realtors.',
    href: null,
    comingSoon: true,
    icon: Home,
  },
  {
    slug: 'digitell',
    title: 'DigiTell Digital Business Cards',
    badge: 'Coming soon',
    description: 'Smart digital business cards that connect and convert.',
    href: null,
    comingSoon: true,
    icon: Contact,
  },
  {
    slug: 'hellosite',
    title: 'HelloSite',
    badge: 'Live',
    description: 'Smart and talking web agents that capture more leads.',
    href: '/innovations/hellosite',
    comingSoon: false,
    icon: Bot,
  },
];

function ProductHexagon({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = product.icon;

  const inner = (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-[280px] mx-auto space-y-3">
      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-amber-500/10 rounded-full flex items-center justify-center border-2 border-amber-500/30 group-hover:border-amber-500/60 group-hover:bg-amber-500/20 transition-all duration-300">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
        {product.title}
      </h3>
      <span
        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
          product.comingSoon
            ? 'bg-white/10 text-white/80'
            : 'bg-amber-500/20 text-amber-400'
        }`}
      >
        {product.badge}
      </span>
      <p className="text-white/80 text-sm md:text-base leading-relaxed">
        {product.description}
      </p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="hexagon-card innovations-hexagon"
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 360 415.69"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <polygon
          points="180,0 360,103.92 360,311.77 180,415.69 0,311.77 0,103.92"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          className={isInView ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''}
        />
      </svg>
      <div className="hexagon-content relative bg-white/5 backdrop-blur-sm group">
        <div className="flex flex-col items-center justify-center h-full w-full px-6 py-8 md:px-8 md:py-10 box-border text-center">
          {product.href ? (
            <Link
              href={product.href}
              className="flex flex-col items-center h-full w-full justify-center no-underline text-inherit hover:no-underline cursor-pointer"
            >
              {inner}
            </Link>
          ) : (
            <div className="flex flex-col items-center h-full w-full justify-center cursor-default">
              {inner}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function InnovationsPage() {
  return (
    <main className="relative z-10 min-h-screen pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
            Innovations
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Products from Right Hand Labs. Built to automate the mundane.
          </p>
        </motion.div>

        <motion.div
          className="honeycomb-grid innovations-honeycomb justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
            >
              <ProductHexagon product={product} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
