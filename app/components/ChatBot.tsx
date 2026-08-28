'use client';

import { useEffect } from 'react';

export default function ChatBot() {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[data-widget-id="6a91b4fb3cbef685c57e6bde"]')) {      return;
      return;
    }

    // Create and inject the HighLevel chatbot script
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '6a91b4fb3cbef685c57e6bde');
    script.async = true;
    
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[data-widget-id="6a91b4fb3cbef685c57e6bde"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
