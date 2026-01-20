# How to Deploy Your Next.js Site

## Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for deployment"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign up/Login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js - click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Set Environment Variables (if needed):**
   - In Vercel dashboard → Your Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_HIGHLEVEL_PHONE_NUMBER` (if you have a phone number)

## Option 2: Netlify

1. Push to GitHub (same as above)
2. Go to https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

## Option 3: Manual Build & Deploy

1. **Build locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Test locally:**
   ```bash
   npm start
   ```

3. **Deploy the `.next` folder** to any hosting service that supports Node.js

## Quick Deploy Commands

```bash
# Make sure you're in the project directory
cd /Users/danielmoore/right-hand-labs

# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

## Your Site is Ready!

Your Next.js app is production-ready. The easiest path is Vercel - it's made by the Next.js team and handles everything automatically.
