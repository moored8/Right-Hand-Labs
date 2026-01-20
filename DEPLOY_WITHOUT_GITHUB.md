# Deploy to Vercel Without GitHub

## Option 1: Use Vercel Web Dashboard (Easiest)

1. **Go to https://vercel.com** and sign up/login
2. Click **"Add New Project"**
3. Click **"Browse"** or drag your project folder
4. Vercel will detect Next.js automatically
5. Click **"Deploy"**
6. Done! Your site is live in ~2 minutes

## Option 2: Use Vercel CLI (Command Line)

1. **Login:**
   ```bash
   npx vercel login
   ```
   - Visit the URL it shows
   - Sign in and authorize
   - Return to terminal

2. **Deploy:**
   ```bash
   npx vercel
   ```
   - Answer the prompts
   - Your site deploys!

## Option 3: Install Vercel CLI Globally (if you have permissions)

```bash
sudo npm install -g vercel
vercel login
vercel
```

**Recommended: Use Option 1 (Web Dashboard) - it's the easiest!**
