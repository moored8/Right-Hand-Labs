'use client';

import { useEffect } from 'react';

const VOICE_WIDGET_ID = '697d4567dad8afcffcf9ce36';

function findWidgetRoot(): Element | null {
  if (typeof document === 'undefined') return null;
  return (
    document.getElementById('chat-widget-container') ||
    document.querySelector('chat-widget') ||
    document.querySelector('[id*="chat-widget"]') ||
    document.querySelector('.lc_chat-widget-launcher') ||
    document.querySelector('[class*="lc_chat"]') ||
    document.querySelector('iframe[src*="leadconnector"]')?.parentElement ||
    null
  );
}

function moveWidgetIntoAnchor() {
  const anchor = document.getElementById('highlevel-widget-anchor');
  const widget = findWidgetRoot();
  if (anchor && widget && widget.parentElement !== anchor) {
    anchor.appendChild(widget);
    (widget as HTMLElement).style.pointerEvents = 'auto';
  }
}

/** Remove the floating "N" (HighLevel notification / extra launcher) in bottom-left.
 *  The N is often inside a cross-origin iframe — we can't touch iframe content, only hide the iframe or its container. */
function removeFloatingN() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const anchor = document.getElementById('highlevel-widget-anchor');
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Hide any LeadConnector iframe that's in the bottom-left (not our main widget in the anchor)
  document.querySelectorAll<HTMLIFrameElement>('iframe[src*="leadconnector"]').forEach((iframe) => {
    if (anchor?.contains(iframe)) return; // keep widget in our anchor (bottom-right)
    const rect = iframe.getBoundingClientRect();
    const inBottomLeft = rect.left < 280 && rect.top > vh - 280;
    if (inBottomLeft) {
      const parent = iframe.parentElement;
      if (parent) {
        parent.style.setProperty('display', 'none', 'important');
        parent.style.setProperty('visibility', 'hidden', 'important');
      }
    }
  });

  // Remove any non-iframe element that is fixed in the bottom-left quadrant (small launcher)
  const toRemove: HTMLElement[] = [];
  const walk = (root: ParentNode) => {
    root.childNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as HTMLElement;
      if (el.id === 'highlevel-widget-anchor' || el.id === 'voice-ai-orb') return; // never touch our UI
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const left = parseFloat(cs.left);
      const bottom = parseFloat(cs.bottom);
      const right = parseFloat(cs.right);
      const isFixedBottomLeft =
        cs.position === 'fixed' &&
        rect.left < 280 &&
        rect.bottom > vh - 280 &&
        (Number.isNaN(right) || right > vw - 200);
      if (isFixedBottomLeft && rect.width < 150 && rect.height < 150) {
        toRemove.push(el);
        return;
      }
      if (el.textContent?.trim() === 'N' && cs.position === 'fixed') {
        toRemove.push(el);
        return;
      }
      walk(el);
    });
  };
  walk(document.body);
  toRemove.forEach((el) => el.remove());
}

export default function HighLevelVoiceWidget() {
  useEffect(() => {
    // Create anchor only on client after mount to avoid hydration mismatch
    const anchor = document.createElement('div');
    anchor.id = 'highlevel-widget-anchor';
    anchor.className = 'highlevel-widget-anchor';
    anchor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(anchor);

    if (!document.querySelector(`script[data-widget-id="${VOICE_WIDGET_ID}"]`)) {
      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', VOICE_WIDGET_ID);
      script.async = true;
      document.body.appendChild(script);
    }

    const onLoaded = () => {
      setTimeout(moveWidgetIntoAnchor, 100);
      setTimeout(moveWidgetIntoAnchor, 500);
      setTimeout(moveWidgetIntoAnchor, 1500);
      removeFloatingN();
    };
    window.addEventListener('LC_chatWidgetLoaded', onLoaded);

    const observer = new MutationObserver(() => {
      moveWidgetIntoAnchor();
      removeFloatingN();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const t = setTimeout(moveWidgetIntoAnchor, 2000);

    // Aggressively remove the N after widget has had time to inject (often in iframe, injected late)
    const nRemoval = [500, 1500, 3000, 5000, 8000].map((ms) => setTimeout(removeFloatingN, ms));

    return () => {
      window.removeEventListener('LC_chatWidgetLoaded', onLoaded);
      observer.disconnect();
      clearTimeout(t);
      nRemoval.forEach(clearTimeout);
      anchor.remove();
    };
  }, []);

  return null;
}
