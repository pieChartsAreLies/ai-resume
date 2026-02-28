# AI Resume

Personal portfolio site with an embedded RAG-powered AI career assistant. The portfolio showcases professional work; the AI assistant lets recruiters and hiring managers explore experience through conversational Q&A and job description matching.

## Goal

Present professional experience in two modes: a visual portfolio (projects, timeline resume, contact) and a conversational AI that answers career questions with source attribution, backed by a curated knowledge base of 15+ documents covering roles, projects, philosophy, and skills.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **AI Backend**: FastAPI (Python), Google Gemini 2.5 Flash (function calling), SQLite FTS5
- **Search**: Agentic tool-calling with 3 tools (list_topics, search_files, read_file)
- **Logging**: SQLite (conversation logging with agent traces)
- **Deployment**: CT 202 (192.168.2.68), Nginx + uvicorn (Saxamaphone pattern)

## Architecture

**Portfolio Site**: React SPA with tab navigation (Home, Work, Resume, Contact). Native sliding chat panel (no iframe). Built with Vite to `dist/`.

**AI Assistant**: FastAPI backend with Gemini function-calling agent. Three tools: `list_topics()` returns knowledge base manifest, `search_files(query)` does full-text search via SQLite FTS5 with BM25 ranking, `read_file(filename)` reads markdown with path containment security. Agent reads whole files (not chunks), max 7 tool calls per request. Responses streamed via SSE.

**Knowledge Base**: Gitignored markdown files organized by category (career/, philosophy/, projects/, skills/, perspectives/). Manifest auto-generated on startup. FTS5 index rebuilt on startup. NDA-compliant content only.

## Constraints

- Knowledge base must be gitignored (NDA compliance, sanitization checklist required)
- Portfolio is client-side only (Vite static build)
- Agent loop hard-capped at 7 tool calls per request
- Path containment enforced on all file reads (no traversal, .md only)
- No authentication on LAN

## Decisions Log

- 2026-01: Gemini over Claude API for cost (free tier vs prepaid credits)
- 2026-01: Qdrant for vector storage (already deployed on homelab for other projects)
- 2026-01: Chainlit for AI UI (rapid prototyping, built-in conversation management)
- 2026-01: Knowledge base gitignored with sanitization checklist for NDA compliance
- 2026-02: Portfolio redesigned with warm colors and single-scroll layout
- 2026-02-27: Replaced RAG/Qdrant/Chainlit with Gemini agentic search + FastAPI + native React chat. Simpler architecture, better answer quality for small knowledge base. Design: docs/plans/2026-02-27-agentic-chat-redesign-design.md
