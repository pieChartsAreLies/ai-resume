# Portfolio Site State

## Current Focus
Phase 2 complete. Site live at michaelgerstl.com.

## Status

### Done (Phase 2, 2026-03-26)
- Removed AI chatbot backend (backend/, app/, deploy/, scripts/, landing-page/ deleted)
- Added 5 new projects: GearSift, JobKit, Reflection, HOA Dashboard, Tautulli Pipeline
- Removed 2 projects: AI Career Assistant, Voice Clone
- Rewrote NanoClaw content (Claude assistant, WhatsApp/Discord I/O)
- GearSift full-page showcase (lazy-loaded, ~13KB gzip)
- Featured project section with gold-bordered card
- GitHub links for public repos only (JobKit, HOA Dashboard, WhisperNotes)
- Tabbed screenshot galleries: Reflection (record/tags), HOA Dashboard (analytics/leaderboards)
- Resume expanded with LinkedIn-synced quantified bullets
- "How I Work with AI" section (AIApproach.tsx)
- Custom scrollbar CSS for rounded-corner overlays
- Deployed to Cloudflare Pages (auto-deploy from master)

## Known Issues
- GearSift screenshots from Playwright are of the public site only (admin behind homelab network)
- HOA Dashboard map screenshot is blank (Mapbox WebGL doesn't render in headless Chromium)

## Next Steps
- None planned. Site is current.
