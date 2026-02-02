# HighLevel Voice AI Widget – Production (Vercel) Troubleshooting

If the orb opens the widget on your Vercel domain but **there’s no speech/voice**:

## 1. Load script on user click (already done)

The widget script is now loaded **only after the first orb click** (user gesture). That helps browsers allow microphone access in production. Redeploy and test again.

## 2. HighLevel dashboard checklist

- **Labs**  
  - **Settings → Labs → [your sub-account]**  
  - Turn **Voice AI Chat Widget** **ON**.

- **Widget type**  
  - **Sites → Chat Widgets** → open the widget with ID `697d4567dad8afcffcf9ce36`.  
  - Under **Agent** tab, confirm **Voice AI Agent** is selected (not “Live Chat” or “Conversation AI”).  
  - If it’s not a Voice AI widget, create a new Chat Widget and choose **Voice AI Agent**, then use that widget’s embed code/ID.

- **Voice AI agent**  
  - A **Voice AI agent** must exist and be linked to this widget.  
  - **Settings → Voice AI** (or equivalent) – create/configure an agent if needed.

- **Domain / embedding**  
  - In the Chat Widget settings, check for **Allowed domains** or **Embed / Install** and add your Vercel domain (e.g. `your-app.vercel.app` and any custom domain).

## 3. Browser behavior

- **Microphone permission**  
  - When the user taps the **microphone icon inside the chat widget**, the browser should ask for microphone access.  
  - If the user blocks it or previously chose “Block”, voice won’t work. They need to allow the site (and optionally the widget iframe) in browser settings and try again.

- **HTTPS**  
  - Voice/WebRTC requires a secure context. Vercel provides HTTPS, so this is usually fine.

- **First interaction**  
  - On the first visit, have the user:  
    1. Click the orb once (opens widget, loads in user gesture).  
    2. Inside the widget, click the **microphone** icon to start voice.  
    3. Allow microphone when the browser prompts.

## 4. If it still doesn’t work

- Open **Developer Tools (F12) → Console** on your Vercel URL and look for errors when:  
  - The page loads.  
  - You click the orb.  
  - You click the mic inside the widget.  
- Check **Application → Storage** for any blocked permissions for your domain and `leadconnectorhq.com`.
- Confirm with HighLevel support that:  
  - Voice AI Chat Widget is enabled for your sub-account.  
  - Your production domain is allowed for this widget.
