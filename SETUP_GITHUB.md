# Quick GitHub Setup for Vercel Deployment

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `right-hand-labs`
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** check "Initialize with README"
5. Click **"Create repository"**

## Step 2: Connect Your Local Code to GitHub

After creating the repo, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/right-hand-labs.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import your `right-hand-labs` repository
5. Click **"Deploy"**

That's it! Your site will be live in ~2 minutes.
