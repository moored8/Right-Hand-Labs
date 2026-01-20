'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface CTAProps {
  onBookCall: () => void;
}

export default function CTA({ onBookCall }: CTAProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-12 max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-tight">
          YOUR RIGHT HAND
          <br />
          IN THE DIGITAL AGE.
        </h2>
        
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onBookCall}
          className="px-8 py-4 md:px-12 md:py-5 bg-amber-500 text-neutral-950 font-bold text-lg md:text-xl rounded-sm hover:bg-amber-400 transition-all duration-300"
        >
          Book Strategy Call
        </motion.button>
      </motion.div>
    </section>
  );
}

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-neutral-950 border border-white/10 rounded-sm p-8 md:p-12 max-w-2xl w-full mx-4"
          >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="space-y-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Book Your Strategy Call
          </h3>
          <p className="text-white/70 text-lg">
            Let's discuss how we can automate the mundane and eliminate friction in your business.
          </p>
          
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-amber-500 text-2xl mb-4">✓</div>
              <p className="text-white text-lg font-medium">Email sent successfully!</p>
              <p className="text-white/70 text-sm mt-2">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Tell us about your challenges..."
                />
              </div>
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Failed to send email. Please try again.</p>
              )}
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-amber-500 text-neutral-950 font-bold rounded-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Schedule Call'}
              </motion.button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
