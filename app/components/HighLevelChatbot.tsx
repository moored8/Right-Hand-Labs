'use client';

import { useEffect } from 'react';

export default function HighLevelChatbot() {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[data-widget-id="696e48d9b7a8e43accdc7f4c"]')) {
      return;
    }

    // Create and inject the HighLevel chatbot script
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '696e48d9b7a8e43accdc7f4c');
    script.async = true;
    
    document.body.appendChild(script);
  }, []);

  return null;
}
