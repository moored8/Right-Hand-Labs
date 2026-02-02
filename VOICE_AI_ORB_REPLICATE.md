# Voice AI Orb – Code to Replicate in Another App

Copy these pieces into your other Cursor/Next.js app. Replace `YOUR_WIDGET_ID` with your HighLevel Voice AI Chat Widget ID (from HighLevel → Sites → Chat Widgets → Get Code).

---

## 1. Component: `HighLevelVoiceWidget.tsx`

Create `components/HighLevelVoiceWidget.tsx` (or equivalent path):

```tsx
'use client';

import { useEffect } from 'react';

// Replace with your widget ID from HighLevel Chat Widget → Get Code
const VOICE_WIDGET_ID = 'YOUR_WIDGET_ID';

function loadVoiceWidgetScript() {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`script[data-widget-id="${VOICE_WIDGET_ID}"]`)) return;
  const script = document.createElement('script');
  script.src = 'https://widgets.leadconnectorhq.com/loader.js';
  script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
  script.setAttribute('data-widget-id', VOICE_WIDGET_ID);
  script.async = true;
  document.body.appendChild(script);
}

export default function HighLevelVoiceWidget() {
  useEffect(() => {
    const onRequest = () => loadVoiceWidgetScript();
    window.addEventListener('request-voice-widget-load', onRequest);
    return () => window.removeEventListener('request-voice-widget-load', onRequest);
  }, []);
  return null;
}
```

---

## 2. Component: `VoiceOrb.tsx`

Create `components/VoiceOrb.tsx`:

```tsx
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
    window.dispatchEvent(new CustomEvent('request-voice-widget-load'));
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
```

---

## 3. CSS – add to your global styles (e.g. `globals.css`)

```css
/* Hide default HighLevel chat launcher so only your orb shows */
#chat-widget-container,
.lc_chat-widget-launcher {
  display: none !important;
}

/* Voice orb container */
.voice-orb-container {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 210, 255, 0.3) 0%, rgba(0, 210, 255, 0.1) 100%);
  border: 2px solid rgba(0, 210, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  z-index: 9999;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 20px rgba(0, 210, 255, 0.5), inset 0 0 15px rgba(0, 210, 255, 0.5);
  animation: orb-breathing 3s ease-in-out infinite;
}

.voice-orb-container.is-active {
  border-color: #00ff88;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.8), inset 0 0 15px rgba(0, 255, 136, 0.5);
  animation: orb-active-pulse 1.5s infinite;
}

.voice-orb-container.is-active .orb-text {
  color: #00ff88;
  text-shadow: 0 0 15px rgba(0, 255, 136, 1);
}

@keyframes orb-active-pulse {
  0%, 100% { transform: scale(1.05); }
  50% { transform: scale(1.15); }
}

.orb-text {
  color: #ffffff;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 210, 255, 1);
  pointer-events: none;
}

@keyframes orb-breathing {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(0, 210, 255, 0.5), inset 0 0 15px rgba(0, 210, 255, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(0, 210, 255, 0.8), inset 0 0 15px rgba(0, 210, 255, 0.5);
  }
}
```

---

## 4. Usage in your app

- Render **both** components somewhere that’s always mounted (e.g. root layout or a global shell):

```tsx
import HighLevelVoiceWidget from '@/components/HighLevelVoiceWidget';
import VoiceOrb from '@/components/VoiceOrb';

// In your layout or shell:
<>
  <HighLevelVoiceWidget />
  <VoiceOrb />
</>
```

- In **HighLevelVoiceWidget.tsx**, set `VOICE_WIDGET_ID` to your widget ID (from HighLevel → Sites → Chat Widgets → your Voice AI widget → Get Code; the ID is in the script tag `data-widget-id="..."`).

- No API key or env var is required; the widget runs as an embed.

- For voice to work in production (e.g. Vercel), the script is loaded on the **first orb click** (user gesture). User flow: click orb → widget opens → click the **microphone icon inside the widget** → allow mic when prompted.
