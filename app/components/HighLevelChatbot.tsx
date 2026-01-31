'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    leadConnector?: { chatWidget?: { closeWidget: () => void } };
  }
}

export default function HighLevelChatbot() {
  useEffect(() => {
    function closeWidget() {
      try {
        if (typeof window !== 'undefined' && window.leadConnector?.chatWidget?.closeWidget) {
          window.leadConnector.chatWidget.closeWidget();
        }
      } catch {
        // ignore
      }
    }

    // Close as soon as widget reports loaded, then retry (widget sometimes opens after load)
    function onWidgetLoaded() {
      closeWidget();
      [100, 300, 600, 1000, 2000].forEach((ms) => setTimeout(closeWidget, ms));
    }

    window.addEventListener('LC_chatWidgetLoaded', onWidgetLoaded);

    if (!document.querySelector('script[data-widget-id="696e48d9b7a8e43accdc7f4c"]')) {
      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '696e48d9b7a8e43accdc7f4c');
      script.async = true;
      document.body.appendChild(script);
    } else {
      onWidgetLoaded();
    }

    return () => window.removeEventListener('LC_chatWidgetLoaded', onWidgetLoaded);
  }, []);

  return null;
}
git add .