'use client';

import { useState, useRef, useEffect } from 'react';

declare global {
  interface Window {
    leadConnector?: { chatWidget?: { openWidget: () => void; isActive: () => boolean } };
  }
}

export type OrbState = 'idle' | 'speaking';

export default function VoiceOrb() {
  const [state, setState] = useState<OrbState>('idle');
  const activePoll = useRef<ReturnType<typeof setInterval> | null>(null);
  const pendingOpen = useRef(false);

  // When speaking, poll widget isActive(); when closed, return to idle
  useEffect(() => {
    if (state !== 'speaking') return;
    activePoll.current = setInterval(() => {
      try {
        if (typeof window !== 'undefined' && !window.leadConnector?.chatWidget?.isActive?.()) {
          setState('idle');
        }
      } catch {
        // ignore
      }
    }, 400);
    return () => {
      if (activePoll.current) clearInterval(activePoll.current);
      activePoll.current = null;
    };
  }, [state]);

  // Open widget when it becomes ready if user clicked before load
  useEffect(() => {
    const onLoaded = () => {
      try {
        if (pendingOpen.current && window.leadConnector?.chatWidget?.openWidget) {
          window.leadConnector.chatWidget.openWidget();
          setState('speaking');
          pendingOpen.current = false;
        }
      } catch {
        pendingOpen.current = false;
      }
    };
    window.addEventListener('LC_chatWidgetLoaded', onLoaded);
    return () => window.removeEventListener('LC_chatWidgetLoaded', onLoaded);
  }, []);

  const handleClick = () => {
    if (state !== 'idle') return;
    try {
      if (window.leadConnector?.chatWidget?.openWidget) {
        window.leadConnector.chatWidget.openWidget();
        setState('speaking');
      } else {
        pendingOpen.current = true;
      }
    } catch {
      pendingOpen.current = true;
    }
  };

  return (
    <div
      id="voice-ai-orb"
      role="button"
      tabIndex={0}
      aria-label="Start voice conversation"
      className={`voice-orb-container ${state === 'speaking' ? 'is-active' : ''}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <span id="orb-status-text" className="orb-text">VOICE AI</span>
    </div>
  );
}
