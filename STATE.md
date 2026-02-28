# AI Resume State

## Current Focus
Agentic chat redesign complete. Ready for deployment to CT 202.

## Status

### Done
- React portfolio: Home, Work (6 featured projects), Resume (timeline), Contact
- Agentic AI chat: FastAPI + Gemini function calling + SQLite FTS5
- Native React chat panel (replaced Chainlit iframe)
- Three agent tools: list_topics, search_files, read_file
- Path containment security on file reads
- SSE streaming with agent activity indicator
- Conversation logging with agent traces
- Deployment config: systemd service, Nginx config, deploy script
- 21 backend tests passing

### Pending Deployment
- Deploy to CT 202 via deploy/deploy.sh
- Set GOOGLE_API_KEY in /opt/ai-resume/backend/.env (from Bitwarden)
- Qualitative validation with golden set of questions
- Decommission old stack (Chainlit, Qdrant, LM Studio embedding)

## Known Issues
- Legacy landing-page folder still in repo (deprecated)
- Porter stemmer limitation: "warehousing" does not stem to match "warehouse"

## Next Steps
- Deploy to CT 202
- Run qualitative validation (golden set of 20 questions)
- Decommission old services (Chainlit, Qdrant, Nomic embeddings)
- Update homelab documentation
- System prompt tuning based on validation results
