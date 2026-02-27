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
4. Gemini reasons about what it needs and calls tools (max 7 tool calls per request)
5. Tool results returned to Gemini; it may call more tools or synthesize
6. Response streamed back to React frontend via SSE
7. Response includes which files the agent actually cited (not just consulted)

### Deployment

Same container (CT 202 on Freya, 192.168.2.68). Follows the Saxamaphone pattern (CT 220): Nginx serves static React build, proxies `/api/` to uvicorn. One systemd service for the FastAPI backend.

## Agent Tools

Three tools available to Gemini via function calling:

### `list_topics()`

Returns the knowledge base manifest: every file with its category, tags, and a one-line summary. The agent calls this to orient itself before searching. Manifest is generated on server startup by scanning the knowledge base directory, so it's always in sync.

### `search_files(query: str)`

Full-text search across all markdown files using SQLite FTS5 with stemming and BM25 ranking. Returns file names, match scores, and excerpts with highlighted terms. The FTS5 index is built on server startup from the knowledge base directory.

This avoids the brittleness of raw keyword grep: a search for "cloud data warehousing" will match documents containing "Snowflake" or "warehouse" through stemming and proximity scoring.

### `read_file(filename: str)`

Reads a markdown file and returns its contents. Strict path containment enforced: all filenames are resolved to absolute paths and rejected if they fall outside the knowledge base directory. Any path traversal (`../`) or non-.md extension is blocked. Returns a clear error message for invalid or non-existent files.

### Security: Path Containment

All file operations are sandboxed to the knowledge base directory:
- Resolve requested path to absolute
- Verify it starts with the knowledge base root
- Reject traversal patterns (`../`), symlinks outside the root, and non-.md files
- Return `{"error": "File not found"}` for any violation (no information leakage about directory structure)

### Agent Loop Limit

Hard cap of 7 tool calls per user request. If the agent reaches the limit without synthesizing an answer, it must return a best-effort response with whatever context it has gathered, plus a note that it could not fully resolve the query. This prevents runaway execution and unbounded latency.

### Error Handling

Each tool returns structured responses:
- Success: `{"result": "..."}`
- Failure: `{"error": "No files found matching your query."}` or `{"error": "File not found."}`

The system prompt instructs the agent:
- If `search_files` returns no results, rephrase with different keywords or consult `list_topics()` to find relevant files by category
- If `read_file` fails, do not retry with variations; inform the user the information is not available
- Never fabricate information that was not found in the knowledge base

### Typical Flow

Question: "Tell me about Michael's Snowflake experience"

1. Agent calls `search_files("Snowflake")`
2. FTS5 returns hits in `career_chewy.md`, `skills_data_platforms.md` (stemming catches variations)
3. Agent calls `read_file("career_chewy.md")` and `read_file("skills_data_platforms.md")`
4. Synthesizes answer citing only the files from which it drew specific facts

### Why This Beats RAG

The agent reads whole files, not 256-token chunks. It understands the question semantically and picks what to read, rather than relying on cosine similarity between embeddings. For a small knowledge base, this is both simpler and more accurate.

## Context Window Management

Target model: Gemini 1.5 Pro (1M token context window on free tier). With ~15 knowledge files at ~3K tokens average, reading 3-4 files per query uses ~12K tokens. Combined with system prompt (~2K), chat history, and tool call overhead, typical queries stay well under 50K tokens.

Safeguards:
- Agent loop limit (7 calls) naturally constrains how many files get read
- If the knowledge base grows significantly (50+ files, 200K+ words), revisit this approach and consider adding section-level extraction to `read_file`
- Monitor token usage in request logs to detect drift

## Frontend Chat Component

### UI

- Sliding panel from the right (same animation pattern as current `ChatPanel.tsx`)
- Message list with user/assistant bubbles
- Text input with send button
- Streaming responses (tokens appear as they arrive)
- Agent activity indicator: shows what the agent is doing ("Searching knowledge base...", "Reading career_chewy.md...") instead of a generic spinner. Turns latency into a feature.
- "Sources" footer on each assistant message showing only files the agent cited
- Loading indicator during agent search/read operations

### API Contract

**Success:**
- `POST /api/chat` with `{ message: string, history: [{role, content}] }`
- Response streamed via SSE
- Final event includes metadata: `{ files_cited: string[], tool_calls: [{tool, args, summary}] }`

**Errors:**
- `400 Bad Request` -- malformed input
- `500 Internal Server Error` -- `{"error": "An unexpected error occurred."}`
- `503 Service Unavailable` -- `{"error": "AI service temporarily unavailable."}` (Gemini API down)

## Knowledge Base

No changes to the markdown files. Same structure, same content, still gitignored. Accessed by reading from disk at query time instead of pre-embedding into vectors.

Manifest generated on FastAPI startup by scanning the knowledge base directory. For each `.md` file (excluding templates and meta files like `00_*`, `01_*`, `02_*`), the manifest stores:
- Filename
- Category (from directory name)
- Tags (from YAML frontmatter if present)
- One-line summary (first sentence after frontmatter, or first H2 content)

SQLite FTS5 index also built on startup from the same scan. Both are rebuilt if the server restarts, ensuring they never go stale.

## System Prompt

Engineered as a first-class artifact, not a simple carry-over. Key additions beyond the existing persona rules:

**ReAct-style reasoning:** The prompt instructs the agent to think step-by-step: (1) reason about what information is needed, (2) decide which tool to call, (3) observe the result, (4) decide if more information is needed or if it can answer.

**Tool-use strategy:**
- Start with `list_topics()` for broad/ambiguous questions to understand what's available
- Use `search_files()` for targeted queries where keywords are clear
- Use `read_file()` to get full context after identifying relevant files
- Do not read more than 3-4 files per query unless the question explicitly spans many topics

**Error recovery:**
- If search returns nothing, try synonyms or consult the topic list
- If a file doesn't exist, do not retry; inform the user
- If approaching the tool call limit, synthesize from what's been gathered

**Source attribution:**
- Only cite files from which specific facts were drawn
- Do not list files that were read but not used in the answer

**Persona rules carried forward:**
- Stoic, objective tone
- Servant leadership attribution (credit team for execution, Michael for strategy)
- NDA compliance (no exact financials, no names, no proprietary details)
- Transparency about confidence level

## Conversation Logging

Lightweight logging to SQLite on the same container (no external DB dependency):

- Timestamp, user message, assistant response
- Full agent trace: each tool call (name, arguments, result summary)
- Token usage per request
- Response latency

Purpose: debugging agent behavior, identifying knowledge gaps (questions that produce poor answers), and monitoring token consumption. Not exposed to users.

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

### Database

- Drop `gerstl_analytics` database on PostgreSQL CT 201 (replaced by local SQLite logging)

## Before/After Summary

| Aspect | Before | After |
|--------|--------|-------|
| LLM | Gemini via LlamaIndex | Gemini 1.5 Pro direct (function calling) |
| Retrieval | Qdrant vector similarity | Agent with FTS5 search + file reads |
| Chat UI | Chainlit iframe | Native React component |
| Backend | Chainlit Python app | FastAPI (single endpoint) |
| Embeddings | Gemini embedding-001 / Nomic | None |
| Vector DB | Qdrant | None |
| Search | Cosine similarity on vectors | SQLite FTS5 with stemming + BM25 |
| Deployment | nohup Chainlit | systemd + Nginx |
| Logging | PostgreSQL | Local SQLite |
| Security | None (open file access) | Path containment, loop limits |
| Backend code | ~170 lines + framework | ~150-200 lines |
