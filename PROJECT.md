# AI Resume

Personal portfolio site with an embedded RAG-powered AI career assistant. The portfolio showcases professional work; the AI assistant lets recruiters and hiring managers explore experience through conversational Q&A and job description matching.

## Goal

Present professional experience in two modes: a visual portfolio (projects, timeline resume, contact) and a conversational AI that answers career questions with source attribution, backed by a curated knowledge base of 15+ documents covering roles, projects, philosophy, and skills.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **AI Backend**: Chainlit (Python), Google Gemini (LLM), Nomic Embed Text (embeddings via LM Studio on Legion)
- **Vector DB**: Qdrant (192.168.2.68:6333)
- **Logging**: PostgreSQL (192.168.2.67:5432)
- **Deployment**: Homelab server at 192.168.2.68 (Chainlit on :8000, portfolio static build)

## Architecture

**Portfolio Site**: React SPA with tab navigation (Home, Work, Resume, Contact). Sliding AI chat panel embeds Chainlit via iframe. Built with Vite to `dist/`.

**AI Assistant**: Chainlit app ingests markdown knowledge base into Qdrant vectors. Two modes: general Q&A (similarity search + Gemini synthesis) and job description matching (keyword detection triggers match scoring with alignment analysis). Source attribution with similarity threshold >= 0.70.

**Knowledge Base**: Gitignored markdown files organized by category (career/, philosophy/, projects/, skills/, perspectives/). Templates ensure consistent structure. NDA-compliant content only.

## Constraints

- Knowledge base must be gitignored (NDA compliance, sanitization checklist required)
- Portfolio is client-side only (Vite static build)
- Chainlit runs on separate server process
- Frontend communicates with AI via iframe (not API)
- No authentication on LAN

## Decisions Log

- 2026-01: Gemini over Claude API for cost (free tier vs prepaid credits)
- 2026-01: Qdrant for vector storage (already deployed on homelab for other projects)
- 2026-01: Chainlit for AI UI (rapid prototyping, built-in conversation management)
- 2026-01: Knowledge base gitignored with sanitization checklist for NDA compliance
- 2026-02: Portfolio redesigned with warm colors and single-scroll layout
