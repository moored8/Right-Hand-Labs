'use client';

import { useEffect } from 'react';

const VOICE_WIDGET_ID = '697d4567dad8afcffcf9ce36';

export default function HighLevelVoiceWidget() {
  useEffect(() => {
    if (document.querySelector(`script[data-widget-id="${VOICE_WIDGET_ID}"]`)) return;
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', VOICE_WIDGET_ID);
    script.async = true;
    document.body.appendChild(script);
  }, []);
  return null;
}
