# Portfolio Site

Personal portfolio showcasing professional experience and side projects. Static React SPA deployed to Cloudflare Pages.

## Quick Start

```bash
cd "Portfolio Site"
npm install
npm run dev
```

Build for production:

```bash
npm run build
# Output in dist/ -- auto-deploys via Cloudflare Pages on push to master
```

## Stack

- **React 19** + TypeScript + Vite
- **Tailwind CSS v4** + Framer Motion
- **Cloudflare Pages** (auto-deploy from master)

## Structure

```
Portfolio Site/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Root component, tab navigation
│   │   └── components/
│   │       ├── Header.tsx             # Navigation bar
│   │       ├── Home.tsx               # Hero section
│   │       ├── Work.tsx               # Project grid + featured section
│   │       ├── WorkDetailPanel.tsx    # Project detail overlays
│   │       ├── GearSiftShowcase.tsx   # Full-page GearSift showcase (lazy-loaded)
│   │       ├── AIApproach.tsx         # "How I Work with AI" section
│   │       ├── Resume.tsx             # Experience timeline
│   │       └── Contact.tsx            # Contact info
│   ├── assets/
│   │   └── screenshots/              # Project screenshots (WebP)
│   └── styles/
│       ├── index.css                  # Import hub
│       ├── tailwind.css               # Tailwind config
│       ├── theme.css                  # Theme variables + custom scrollbar
│       └── fonts.css                  # Font imports
└── index.html
```

## Adding Projects

1. Add entry to `Work.tsx` projects array (with `id`, `title`, `description`, `company`, `metrics`, `tags`)
2. Add `ProjectType` to the union in `WorkDetailPanel.tsx`
3. Add content entry with challenge/approach/outcome/keyInsight/technologies
4. Optional: add `github` URL (public repos only), `screenshots` array, `architecture` section

## License

Personal portfolio. Not for commercial use or redistribution.
