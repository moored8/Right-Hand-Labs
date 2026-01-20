'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Zap, Cog, Briefcase, ChevronDown, Brain, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Code,
    title: 'Custom Software Solutions',
    description: 'Rapid Prototyping & Commercial Deployment.',
    expandedDescription: "The world of AI makes customization very attainable. You may even build software you can sell to others with your problem.",
  },
  {
    icon: Zap,
    title: 'Efficiency Expertise',
    description: 'Scale Without the Headcount.',
    expandedDescription: "You cannot know if you are efficient without measuring what you currently do. It's more surprising than you think.",
  },
  {
    icon: Cog,
    title: 'Automation Protocols',
    description: 'Set It and Forget It.',
    expandedDescription: "Pre-made protocols help you launch quickly. Or build you one of a kind custom system.",
  },
  {
    icon: Briefcase,
    title: 'Business AI Readiness',
    description: 'Strategy Before Code.',
    expandedDescription: "We CAN show you where AI can help and we CAN alleviate the stress of your employees regarding AI and we will find opportunities to let every employee maximize their potential.",
  },
  {
    icon: Brain,
    title: 'AI Strategy',
    titleLine2: 'Execution',
    description: 'Intelligent Solutions.',
    expandedDescription: "We develop comprehensive AI strategies tailored to your business needs and execute them with precision to drive real results and competitive advantage.",
  },
  {
    icon: Sparkles,
    title: 'And More',
    titleLine2: 'coming soon...',
    description: 'Stay tuned for updates.',
    expandedDescription: "We're constantly developing new solutions and services. Check back soon for more innovative offerings.",
  },
];

interface ArsenalProps {
  onBookCall?: () => void;
}

export default function Arsenal({ onBookCall }: ArsenalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter mb-8">
            THE ARSENAL
          </h2>
          
          {/* Progress Bar */}
          <div className="relative w-full max-w-2xl mx-auto h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ 
                scaleX: progress,
                transformOrigin: 'left',
              }}
              className="absolute top-0 left-0 h-full w-full bg-amber-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Honeycomb Grid */}
        <div className="w-full flex justify-start">
          <motion.div 
            className="honeycomb-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
          >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              total={services.length}
              onBookCall={onBookCall}
            />
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  total,
  onBookCall,
}: {
  service: typeof services[0];
  index: number;
  total: number;
  onBookCall?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.6 }}
      className="hexagon-card"
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      {/* SVG Hexagon Border - Drawn with colored line */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 360 415.69"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <polygon
          points="180,0 360,103.92 360,311.77 180,415.69 0,311.77 0,103.92"
          fill="none"
          stroke={isExpanded ? '#fbbf24' : '#f59e0b'}
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          className={`transition-all duration-500 ${
            isInView ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : ''
          } ${isExpanded ? 'drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]' : ''}`}
        />
      </svg>
      
      {/* Inner content hexagon */}
      <div className={`hexagon-content relative bg-white/5 backdrop-blur-sm transition-all duration-500 cursor-pointer group ${
        isExpanded ? 'bg-white/8' : ''
      }`}>
        <div className="flex flex-col items-center justify-center h-full w-full px-6 py-8 md:px-8 md:py-10 box-border overflow-y-auto text-center">
          {/* Icon - Just above text */}
          <div className="flex-shrink-0 mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-500/10 rounded-full flex items-center justify-center border-2 border-amber-500/30 group-hover:border-amber-500/60 group-hover:bg-amber-500/20 transition-all duration-300 mx-auto">
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>

          {/* Title & Description - Right below icon */}
          <div className="flex-shrink-0 flex flex-col space-y-3 w-full px-2">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight text-center">
              {service.title}
              {(service as any).titleLine2 && (
                <>
                  <br />
                  {(service as any).titleLine2}
                </>
              )}
            </h3>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed text-center">
              {service.description}
            </p>
          </div>
          
          {/* Bottom Section - Expanded Content & Chevron */}
          <div className="flex-shrink-0 mt-6 w-full px-2">
            {/* Expanded Description */}
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
                marginTop: isExpanded ? 16 : 0,
              }}
              transition={{ 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3, delay: isExpanded ? 0.1 : 0 },
              }}
              className="overflow-hidden w-full"
            >
              <div className="space-y-4 pt-2">
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ 
                    y: isExpanded ? 0 : -10,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ delay: isExpanded ? 0.2 : 0 }}
                  className="text-white/90 text-sm md:text-base leading-relaxed text-center"
                >
                  {service.expandedDescription}
                </motion.p>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookCall?.();
                  }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ 
                    y: isExpanded ? 0 : -10,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ delay: isExpanded ? 0.3 : 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-amber-500 text-neutral-950 font-bold text-sm md:text-base rounded-sm hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20"
                >
                  Set Up A Call
                </motion.button>
              </div>
            </motion.div>
            
            {/* Chevron indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="mt-4 flex justify-center"
            >
              <ChevronDown className="w-5 h-5 text-amber-500/60 group-hover:text-amber-500 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
