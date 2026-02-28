# AI Resume State

## Current Focus
Agentic chat redesign deployed and live on CT 202. Old stack decommissioned.

## Status

### Done
- React portfolio: Home, Work (6 featured projects), Resume (timeline), Contact
- Agentic AI chat: FastAPI + Gemini 2.5 Flash function calling + SQLite FTS5
- Native React chat panel (replaced Chainlit iframe)
- Three agent tools: list_topics, search_files, read_file
- Path containment security on file reads
- SSE streaming with agent activity indicator
- Conversation logging with agent traces
- Deployment config: systemd service, Nginx config, deploy script
- 21 backend tests passing
- Deployed to CT 202 (2026-02-28)
- Old stack decommissioned: Chainlit killed, /opt/ai-resume-app removed, stale Nginx configs cleaned
- Uptime Kuma monitor updated (ID 38: "AI Resume", /api/health)
- Homelab documentation updated

## Known Issues
- Legacy landing-page folder still in repo (deprecated)
- Porter stemmer limitation: "warehousing" does not stem to match "warehouse"

## Next Steps
- Run qualitative validation (golden set of 20 questions)
- Tune system prompt based on validation results
- Stop Nomic Embed Text model in LM Studio on Legion (no longer needed)
