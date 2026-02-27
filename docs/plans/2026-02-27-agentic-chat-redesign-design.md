# AI Resume Chatbot Redesign: Agentic Search

**Date:** 2026-02-27
**Status:** Approved
**Goal:** Replace the RAG/vector pipeline with an agentic search approach that reads markdown files directly, improving answer quality and reducing infrastructure complexity.

## Context

The current chatbot uses a traditional RAG pipeline: markdown knowledge base -> Nomic Embed Text embeddings -> Qdrant vector DB -> LlamaIndex similarity search -> Gemini synthesis -> Chainlit UI (iframe). The chatbot failed basic questions ("Who is Michael?") because vector similarity over small document chunks loses context. The knowledge base is small enough (~15 files, ~50K words) that vector search adds complexity without proportional value.

## Design Decisions

- **Primary audience:** AI capability showcase (recruiter utility is secondary)
- **Full rebuild:** Replace Chainlit, LlamaIndex, Qdrant, and the iframe chat UI
- **LLM:** Keep Gemini (free tier, already working)
- **Frontend:** Native React chat component (no iframe)
- **Retrieval:** Agentic tool-calling, not vector similarity

## Architecture

```
Browser --> Nginx (:80/:443)
              |
              +--> /  --> Static React build (portfolio)
              |
              +--> /api/ --> uvicorn (:8000) --> FastAPI
                                                   |
                                              Gemini API (function calling)
                                                   |
                                              Knowledge base (markdown on disk)
```

### Query Flow

1. User types question in native React chat component
2. React calls `POST /api/chat` on FastAPI backend
3. FastAPI sends question to Gemini with system prompt + tool definitions
4. Gemini reasons about what it needs and calls tools
5. Tool results returned to Gemini; it may call more tools or synthesize
6. Response streamed back to React frontend
7. Response includes which files were consulted (transparency)

### Deployment

Same container (CT 202 on Freya, 192.168.2.68). Follows the Saxamaphone pattern (CT 220): Nginx serves static React build, proxies `/api/` to uvicorn. One systemd service for the FastAPI backend.

## Agent Tools

Three tools available to Gemini via function calling:

### `list_topics()`

Returns the knowledge base manifest: every file with its category, tags, and one-line summary. The agent calls this to orient itself before searching.

### `search_files(query: str)`

Full-text keyword search across all markdown files. Returns file names and matching excerpts. No embeddings, no vector math.

### `read_file(filename: str)`

Reads an entire markdown file and returns its contents. The agent calls this after identifying relevant files from search results or the topic list.

### Typical Flow

Question: "Tell me about Michael's Snowflake experience"

1. Agent calls `search_files("Snowflake")`
2. Gets hits in `career_chewy.md`, `skills_data_platforms.md`
3. Agent calls `read_file("career_chewy.md")` and `read_file("skills_data_platforms.md")`
4. Synthesizes answer from full file contents with source attribution

### Why This Beats RAG

The agent reads whole files, not 256-token chunks. It understands the question semantically and picks what to read, rather than relying on cosine similarity between embeddings. For a small knowledge base, this is both simpler and more accurate.

## Frontend Chat Component

### UI

- Sliding panel from the right (same animation pattern as current `ChatPanel.tsx`)
- Message list with user/assistant bubbles
- Text input with send button
- Streaming responses (tokens appear as they arrive)
- "Sources consulted" footer on each assistant message
- Loading indicator during agent search/read operations

### API Contract

- `POST /api/chat` with `{ message: string, history: [{role, content}] }`
- Streamed response (SSE)
- Each response includes metadata: `{ files_consulted: string[] }`

## Knowledge Base

No changes to the markdown files. Same structure, same content, still gitignored. Accessed by reading from disk at query time instead of pre-embedding into vectors.

One addition: a `manifest.json` auto-generated from the knowledge base directory. Maps each file to category, tags, and a one-line summary. This is what `list_topics()` returns.

## System Prompt

Carried forward from `02_SYSTEM_PROMPT_TEMPLATE.md` with minor updates:
- Remove references to similarity scores and retrieval thresholds
- Add tool-use instructions (when to search vs. read)
- Keep all persona rules: stoic tone, servant leadership attribution, NDA compliance, source transparency

## Decommission Plan

### Services to Stop

| Service | Location | Action |
|---------|----------|--------|
| Qdrant | CT 202 (port 6333) | Stop and remove. Delete `gerstl_career` collection. |
| Chainlit | CT 202 (port 8000, nohup) | Kill process. Remove `/opt/ai-resume-app/`. |
| LM Studio / Nomic Embed Text | Legion (192.168.2.234:1234) | Stop embedding model. No longer needed for this project. |

### Dependencies Removed

- `chainlit`
- `llama-index` (all packages)
- `qdrant-client`
- Nomic Embed Text embedding model

### Optional

- `gerstl_analytics` database on PostgreSQL CT 201: keep for new conversation logging or drop if not needed.

## Before/After Summary

| Aspect | Before | After |
|--------|--------|-------|
| LLM | Gemini via LlamaIndex | Gemini direct (function calling) |
| Retrieval | Qdrant vector similarity | Agent reads markdown files |
| Chat UI | Chainlit iframe | Native React component |
| Backend | Chainlit Python app | FastAPI (single endpoint) |
| Embeddings | Gemini embedding-001 / Nomic | None |
| Vector DB | Qdrant | None |
| Deployment | nohup Chainlit | systemd + Nginx |
| Backend code | ~170 lines + framework | ~100-150 lines |
