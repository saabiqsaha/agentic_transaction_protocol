# Cowrie Landing Page

A beautiful, animated landing page for Cowrie built with Next.js and Tailwind CSS.

## Features

- 🎨 Beautiful editorial-style design with custom animations
- ☁️ Cloud background in hero section with smooth fade effects
- 🌾 Field background in footer with gradient transitions
- ✨ Scroll-triggered reveal animations
- 📱 Fully responsive design
- ⚡ Built with Next.js for optimal performance

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display (serif), Inter (sans-serif)
- **Animations**: CSS transitions with Intersection Observer API

## Project Structure

```
landing_page/
├── pages/
│   ├── _app.js          # App wrapper with global styles
│   ├── _document.js     # Custom document with font imports
│   └── index.js         # Main landing page
├── styles/
│   └── globals.css      # Global styles and animations
├── public/
│   └── assets/          # Images and logos
├── index.html           # Original HTML version (for reference)
└── package.json
```

## Animations

The page uses scroll-triggered animations powered by the Intersection Observer API:
- Elements fade in and blur out as they enter the viewport
- Yellow highlight effect on key phrases
- Smooth transitions throughout

## Deployment

This Next.js app can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

