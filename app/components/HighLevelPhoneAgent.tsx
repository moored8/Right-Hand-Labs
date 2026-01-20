'use client';

import { Phone } from 'lucide-react';

interface HighLevelPhoneAgentProps {
  phoneNumber?: string;
}

export default function HighLevelPhoneAgent({ 
  phoneNumber = 'YOUR_NUMBER_HERE'
}: HighLevelPhoneAgentProps) {
  return (
    <>
      {/* Call Button with Pulse Animation */}
      <a
        href={`tel:${phoneNumber}`}
        className="phone-call-button fixed bottom-6 left-6 z-[100] w-16 h-16 bg-amber-500 text-neutral-950 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Call us"
        title="Speak with our AI Agent"
      >
        <Phone className="w-7 h-7 group-hover:scale-110 transition-transform relative z-10" />
        {/* Pulse animation rings */}
        <span className="phone-pulse-ring" />
        <span className="phone-pulse-ring phone-pulse-ring-delay" />
      </a>
    </>
  );
}
