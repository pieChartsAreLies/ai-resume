# Portfolio Site

Personal portfolio showcasing professional experience and side projects.

## Goal

Present work history, project portfolio, and technical philosophy in a polished static site. No backend, no AI chatbot. Deploys automatically to Cloudflare Pages on push.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion
- **Hosting**: Cloudflare Pages (auto-deploy from GitHub master)
- **Assets**: WebP screenshots via Playwright, portrait image

## Architecture

Static React SPA. Four tabs: Work (projects grid with detail overlays), Resume (experience timeline), AI Approach (philosophy), Contact.

GearSift project opens a full-page showcase component (lazy-loaded, ~13KB gzip). All other projects open a standard detail panel with challenge/approach/outcome format.

GitHub links rendered only for public repos (JobKit, HOA Dashboard, WhisperNotes).

## Decisions Log

- 2026-01: Gemini over Claude API for chatbot (free tier)
- 2026-02: Portfolio redesigned with warm color palette
- 2026-02: Agentic search replaced RAG/Qdrant/Chainlit
- 2026-03: Phase 1: Removed chatbot UI, added "How I Work with AI" section
- 2026-03-26: Phase 2: Removed chatbot backend entirely. Added 5 new projects, GearSift showcase, Playwright screenshots, resume sync. Old backend/app/deploy/scripts/landing-page directories deleted.
