# Deployment Guide

## Dependencies

All dependencies are listed in `package.json`. This is a Next.js project, so you don't need a `requirements.txt` file.

### Production Dependencies:
- next: 16.1.3
- react: 19.2.3
- react-dom: 19.2.3
- framer-motion: ^12.27.0
- lucide-react: ^0.562.0
- nodemailer: ^7.0.12

### Development Dependencies:
- typescript: ^5
- tailwindcss: ^4
- eslint: ^9
- @types/node, @types/react, @types/react-dom, @types/nodemailer

## Deployment Steps

### For Vercel (Recommended for Next.js):
1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure everything
4. Add environment variables if needed (e.g., `NEXT_PUBLIC_HIGHLEVEL_PHONE_NUMBER`)

### For Other Platforms:
1. Run `npm install` to install dependencies
2. Run `npm run build` to create production build
3. Run `npm start` to start production server

## Environment Variables

Make sure to set these environment variables in your deployment platform:
- `NEXT_PUBLIC_HIGHLEVEL_PHONE_NUMBER` (optional, for phone agent widget)

## Build Command
```bash
npm run build
```

## Start Command
```bash
npm start
```
