# Push Your Code to GitHub

## Option 1: Use Personal Access Token (Easiest)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Vercel Deployment"
   - Check "repo" scope
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Push using the token:**
   ```bash
   git push -u origin main
   ```
   - Username: `moored8` (or your GitHub username)
   - Password: **Paste your token** (not your GitHub password)

## Option 2: Use GitHub CLI

```bash
brew install gh
gh auth login
git push -u origin main
```

## Option 3: Use SSH (More Secure)

1. Generate SSH key (if you don't have one)
2. Add it to GitHub
3. Change remote to SSH:
   ```bash
   git remote set-url origin git@github.com:moored8/right-hand-labs.git
   git push -u origin main
   ```

**Recommended: Use Option 1 (Personal Access Token) - it's the quickest!**
