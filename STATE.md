# AI Resume State

## Current Focus
Portfolio projects updated. AI Career Assistant reflects new agentic architecture, Bob (NanoClaw) added, Obsidian RAG removed.

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
- Cloudflare Tunnel reconfigured: chat.michaelgerstl.com -> localhost:8000
- Cloudflare Pages frontend updated (VITE_API_URL, removed Chainlit refs)
- Knowledge base re-deployed to /opt/ai-resume/knowledge (macOS ._ files cleaned)
- Portfolio projects updated (2026-03-01): AI Career Assistant rewritten for agentic architecture, Bob (NanoClaw) added, Obsidian RAG removed
- Knowledge base updated: project_ai_career_assistant.md rewritten, project_nanoclaw_bob.md created, project_obsidian_rag.md deleted
- Tags cleaned: removed RAG, Qdrant, n8n; added FastAPI, Telegram

## Known Issues
- Legacy landing-page folder still in repo (deprecated)
- Porter stemmer limitation: "warehousing" does not stem to match "warehouse"
- Knowledge base is gitignored (NDA); must be manually deployed/updated on CT 202
- CT 202 hostname still shows "analytics-platform" (cosmetic)

## Next Steps
- Run qualitative validation (golden set of 20 questions)
- Tune system prompt based on validation results
- Stop Nomic Embed Text model in LM Studio on Legion (no longer needed)
