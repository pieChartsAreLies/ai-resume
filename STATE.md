# AI Resume State

## Current Focus
Portfolio and AI assistant operational in production. Knowledge base maintained with 15+ documents.

## Status

### Done
- React portfolio: Home, Work (6 featured projects), Resume (timeline), Contact
- Sliding AI chat panel (Chainlit iframe)
- Chainlit app with Gemini LLM + Qdrant RAG
- Job description matching with source attribution
- Knowledge base: career (Chewy, Babylist), philosophy, 15+ project case studies, skills
- Deployed to 192.168.2.68 (Chainlit on :8000)
- Portfolio redesigned with warm colors, single-scroll layout, STAR-format project content

### Production
- Chainlit: /opt/ai-resume-app/ on 192.168.2.68:8000
- Qdrant: 192.168.2.68:6333 (collection: gerstl_career)
- Embeddings: Nomic Embed Text on LM Studio (192.168.2.234:1234)
- PostgreSQL logging: 192.168.2.67:5432

## Known Issues
- Legacy landing-page folder still in repo (deprecated)

## Next Steps
- AI project showcase section
- Project filtering by category
- "Side Projects" tab
- Dark/light theme toggle
- PDF resume generation from content
- Analytics dashboard for chat interactions
