# Agentic Chat Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the RAG/Qdrant/Chainlit chatbot with a Gemini function-calling agent that reads markdown files directly, served by FastAPI with a native React chat component.

**Architecture:** FastAPI backend with three agent tools (list_topics, search_files, read_file) powered by Gemini manual function calling. Native React chat panel replaces Chainlit iframe. SQLite for FTS5 search index and conversation logging. Nginx reverse proxy (Saxamaphone pattern).

**Tech Stack:** Python 3.11, FastAPI, uvicorn, google-genai SDK, SQLite FTS5, React 18, TypeScript, Tailwind CSS, Framer Motion

**Design doc:** `docs/plans/2026-02-27-agentic-chat-redesign-design.md`

---

### Task 1: Backend Scaffolding

**Files:**
- Create: `backend/requirements.txt`
- Create: `backend/config.py`
- Create: `backend/main.py`

**Step 1: Create backend directory and requirements.txt**

```
backend/requirements.txt
```

```txt
fastapi>=0.115.0
uvicorn[standard]>=0.34.0
google-genai>=1.0.0
python-dotenv>=1.0.0
pyyaml>=6.0
```

**Step 2: Create config.py**

```python
# backend/config.py
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
KNOWLEDGE_BASE_PATH = Path(os.getenv(
    "KNOWLEDGE_BASE_PATH",
    str(Path(__file__).parent.parent / "knowledge")
))
MAX_TOOL_CALLS = int(os.getenv("MAX_TOOL_CALLS", "7"))
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://192.168.2.68").split(",")
```

**Step 3: Create main.py with health check**

```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import ALLOWED_ORIGINS

app = FastAPI(title="AI Resume Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}
```

**Step 4: Verify it runs**

Run: `cd backend && pip install -r requirements.txt && uvicorn main:app --port 8000`
Expected: Server starts, `curl http://localhost:8000/api/health` returns `{"status":"ok"}`

**Step 5: Commit**

```bash
git add backend/
git commit -m "feat: scaffold FastAPI backend with health check"
```

---

### Task 2: Path Containment Module

**Files:**
- Create: `backend/security.py`
- Create: `backend/tests/test_security.py`

**Step 1: Write the failing tests**

```python
# backend/tests/test_security.py
import pytest
from pathlib import Path
from security import safe_resolve_path

KB_ROOT = Path("/tmp/test_kb")

def test_valid_file():
    result = safe_resolve_path("career/career_chewy.md", KB_ROOT)
    assert result == KB_ROOT / "career" / "career_chewy.md"

def test_traversal_rejected():
    with pytest.raises(ValueError, match="outside knowledge base"):
        safe_resolve_path("../../etc/passwd", KB_ROOT)

def test_dot_dot_in_middle_rejected():
    with pytest.raises(ValueError, match="outside knowledge base"):
        safe_resolve_path("career/../../../etc/passwd", KB_ROOT)

def test_absolute_path_rejected():
    with pytest.raises(ValueError, match="outside knowledge base"):
        safe_resolve_path("/etc/passwd", KB_ROOT)

def test_non_md_rejected():
    with pytest.raises(ValueError, match="must be .md"):
        safe_resolve_path("career/notes.txt", KB_ROOT)

def test_empty_filename_rejected():
    with pytest.raises(ValueError):
        safe_resolve_path("", KB_ROOT)
```

**Step 2: Run tests to verify they fail**

Run: `cd backend && python -m pytest tests/test_security.py -v`
Expected: FAIL (ModuleNotFoundError: No module named 'security')

**Step 3: Implement security.py**

```python
# backend/security.py
from pathlib import Path

def safe_resolve_path(filename: str, kb_root: Path) -> Path:
    """Resolve a filename to an absolute path within kb_root. Raises ValueError if unsafe."""
    if not filename or not filename.strip():
        raise ValueError("Filename must not be empty")

    if not filename.endswith(".md"):
        raise ValueError("File must be .md")

    # Resolve to absolute, then check containment
    resolved = (kb_root / filename).resolve()
    kb_resolved = kb_root.resolve()

    if not str(resolved).startswith(str(kb_resolved) + "/") and resolved != kb_resolved:
        raise ValueError(f"Path resolves outside knowledge base: {filename}")

    return resolved
```

**Step 4: Run tests to verify they pass**

Run: `cd backend && python -m pytest tests/test_security.py -v`
Expected: All 6 tests PASS

**Step 5: Commit**

```bash
git add backend/security.py backend/tests/
git commit -m "feat: add path containment security for file access"
```

---

### Task 3: Knowledge Base Manifest

**Files:**
- Create: `backend/knowledge_base.py`
- Create: `backend/tests/test_knowledge_base.py`

**Step 1: Write the failing tests**

```python
# backend/tests/test_knowledge_base.py
import pytest
import tempfile
from pathlib import Path
from knowledge_base import build_manifest

@pytest.fixture
def sample_kb(tmp_path):
    """Create a minimal knowledge base structure."""
    career = tmp_path / "career"
    career.mkdir()
    (career / "career_chewy.md").write_text(
        "---\ncategory: career\ntags: [fortune-500, ipo]\n---\n"
        "# VP Leadership at Chewy\n\nMichael led analytics at Chewy for 6 years."
    )
    # Template file -- should be excluded
    templates = tmp_path / "_templates"
    templates.mkdir()
    (templates / "TEMPLATE_career.md").write_text("# Template")
    # Meta file -- should be excluded
    (tmp_path / "00_TAXONOMY.md").write_text("# Taxonomy")
    return tmp_path

def test_manifest_includes_content_files(sample_kb):
    manifest = build_manifest(sample_kb)
    filenames = [entry["filename"] for entry in manifest]
    assert "career/career_chewy.md" in filenames

def test_manifest_excludes_templates(sample_kb):
    manifest = build_manifest(sample_kb)
    filenames = [entry["filename"] for entry in manifest]
    assert not any("_templates" in f for f in filenames)

def test_manifest_excludes_meta_files(sample_kb):
    manifest = build_manifest(sample_kb)
    filenames = [entry["filename"] for entry in manifest]
    assert not any(f.startswith("00_") for f in filenames)

def test_manifest_entry_has_required_fields(sample_kb):
    manifest = build_manifest(sample_kb)
    entry = manifest[0]
    assert "filename" in entry
    assert "category" in entry
    assert "summary" in entry
```

**Step 2: Run tests to verify they fail**

Run: `cd backend && python -m pytest tests/test_knowledge_base.py -v`
Expected: FAIL (ModuleNotFoundError)

**Step 3: Implement knowledge_base.py (manifest builder)**

```python
# backend/knowledge_base.py
import re
import yaml
from pathlib import Path
from typing import Optional

# Files/dirs to exclude from the manifest
EXCLUDE_PREFIXES = ("00_", "01_", "02_")
EXCLUDE_DIRS = {"_templates"}

def build_manifest(kb_root: Path) -> list[dict]:
    """Scan knowledge base directory and build a manifest of content files."""
    manifest = []
    kb_resolved = kb_root.resolve()

    for md_file in sorted(kb_resolved.rglob("*.md")):
        rel_path = md_file.relative_to(kb_resolved)

        # Skip excluded directories
        if any(part in EXCLUDE_DIRS for part in rel_path.parts):
            continue
        # Skip meta/config files
        if rel_path.name.startswith(EXCLUDE_PREFIXES):
            continue
        # Skip root-level non-content files
        if rel_path.name in ("README.md", "ENV_SETUP.md"):
            continue

        text = md_file.read_text(encoding="utf-8")
        frontmatter = _parse_frontmatter(text)
        summary = _extract_summary(text)
        category = frontmatter.get("category", rel_path.parts[0] if len(rel_path.parts) > 1 else "general")
        tags = frontmatter.get("tags", [])

        manifest.append({
            "filename": str(rel_path),
            "category": category,
            "tags": tags,
            "summary": summary,
        })

    return manifest


def _parse_frontmatter(text: str) -> dict:
    """Extract YAML frontmatter from markdown text. Handles non-standard placement."""
    # Standard: starts at line 1
    match = re.match(r'^---\s*\n(.*?)\n---', text, re.DOTALL)
    if not match:
        # Non-standard: frontmatter after a heading
        match = re.search(r'\n---\s*\n(.*?)\n---', text, re.DOTALL)
    if match:
        try:
            return yaml.safe_load(match.group(1)) or {}
        except yaml.YAMLError:
            return {}
    return {}


def _extract_summary(text: str) -> str:
    """Extract a one-line summary from the first meaningful paragraph."""
    # Remove frontmatter
    cleaned = re.sub(r'---.*?---', '', text, count=1, flags=re.DOTALL).strip()
    # Remove headings to find first paragraph
    lines = cleaned.split('\n')
    for line in lines:
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('---'):
            # Return first sentence, max 150 chars
            sentence = line.split('.')[0].strip()
            return sentence[:150]
    return ""
```

**Step 4: Run tests to verify they pass**

Run: `cd backend && python -m pytest tests/test_knowledge_base.py -v`
Expected: All 4 tests PASS

**Step 5: Commit**

```bash
git add backend/knowledge_base.py backend/tests/test_knowledge_base.py
git commit -m "feat: add knowledge base manifest builder"
```

---

### Task 4: FTS5 Search Index

**Files:**
- Modify: `backend/knowledge_base.py`
- Create: `backend/tests/test_search.py`

**Step 1: Write the failing tests**

```python
# backend/tests/test_search.py
import pytest
from pathlib import Path
from knowledge_base import KnowledgeBase

@pytest.fixture
def populated_kb(tmp_path):
    """Create a knowledge base with searchable content."""
    career = tmp_path / "career"
    career.mkdir()
    (career / "career_chewy.md").write_text(
        "---\ncategory: career\ntags: [fortune-500]\n---\n"
        "# Chewy\n\nMichael led the Snowflake data warehouse migration at Chewy, "
        "reducing cloud costs by 30 percent."
    )
    skills = tmp_path / "skills"
    skills.mkdir()
    (skills / "skills_data_platforms.md").write_text(
        "---\ncategory: skills\n---\n"
        "# Data Platforms\n\nExpertise in Snowflake, Redshift, and BigQuery. "
        "Deep experience with data warehouse optimization."
    )
    return KnowledgeBase(tmp_path)

def test_search_finds_matching_files(populated_kb):
    results = populated_kb.search("Snowflake")
    filenames = [r["filename"] for r in results]
    assert "career/career_chewy.md" in filenames

def test_search_returns_excerpts(populated_kb):
    results = populated_kb.search("Snowflake")
    assert any("Snowflake" in r.get("excerpt", "") for r in results)

def test_search_stemming_works(populated_kb):
    """'warehousing' should match 'warehouse' via stemming."""
    results = populated_kb.search("warehousing")
    assert len(results) > 0

def test_search_no_results(populated_kb):
    results = populated_kb.search("blockchain")
    assert len(results) == 0
```

**Step 2: Run tests to verify they fail**

Run: `cd backend && python -m pytest tests/test_search.py -v`
Expected: FAIL (cannot import KnowledgeBase)

**Step 3: Add KnowledgeBase class with FTS5 to knowledge_base.py**

Add to `backend/knowledge_base.py`:

```python
import sqlite3

class KnowledgeBase:
    """Knowledge base with manifest and FTS5 search index."""

    def __init__(self, kb_root: Path):
        self.kb_root = kb_root.resolve()
        self.manifest = build_manifest(kb_root)
        self._db = sqlite3.connect(":memory:")
        self._build_fts_index()

    def _build_fts_index(self):
        """Build SQLite FTS5 index from knowledge base files."""
        self._db.execute(
            "CREATE VIRTUAL TABLE IF NOT EXISTS kb_search USING fts5(filename, content, tokenize='porter')"
        )
        for entry in self.manifest:
            filepath = self.kb_root / entry["filename"]
            if filepath.exists():
                content = filepath.read_text(encoding="utf-8")
                self._db.execute(
                    "INSERT INTO kb_search (filename, content) VALUES (?, ?)",
                    (entry["filename"], content)
                )
        self._db.commit()

    def search(self, query: str, limit: int = 5) -> list[dict]:
        """Full-text search with BM25 ranking."""
        if not query.strip():
            return []
        # Escape FTS5 special characters
        safe_query = query.replace('"', '""')
        try:
            rows = self._db.execute(
                'SELECT filename, snippet(kb_search, 1, "**", "**", "...", 40), '
                'bm25(kb_search) as rank '
                'FROM kb_search WHERE kb_search MATCH ? '
                'ORDER BY rank LIMIT ?',
                (f'"{safe_query}"', limit)
            ).fetchall()
        except sqlite3.OperationalError:
            # Fallback: try individual words OR'd together
            words = query.strip().split()
            fts_query = " OR ".join(f'"{w}"' for w in words if w)
            try:
                rows = self._db.execute(
                    'SELECT filename, snippet(kb_search, 1, "**", "**", "...", 40), '
                    'bm25(kb_search) as rank '
                    'FROM kb_search WHERE kb_search MATCH ? '
                    'ORDER BY rank LIMIT ?',
                    (fts_query, limit)
                ).fetchall()
            except sqlite3.OperationalError:
                return []

        return [
            {"filename": row[0], "excerpt": row[1], "score": row[2]}
            for row in rows
        ]

    def read_file(self, filename: str) -> str:
        """Read a knowledge base file with path containment."""
        from security import safe_resolve_path
        resolved = safe_resolve_path(filename, self.kb_root)
        if not resolved.exists():
            raise FileNotFoundError(f"File not found: {filename}")
        return resolved.read_text(encoding="utf-8")

    def list_topics(self) -> list[dict]:
        """Return the manifest."""
        return self.manifest
```

**Step 4: Run tests to verify they pass**

Run: `cd backend && python -m pytest tests/test_search.py -v`
Expected: All 4 tests PASS

**Step 5: Run all tests together**

Run: `cd backend && python -m pytest tests/ -v`
Expected: All 10 tests PASS

**Step 6: Commit**

```bash
git add backend/knowledge_base.py backend/tests/test_search.py
git commit -m "feat: add FTS5 search index with stemming and BM25 ranking"
```

---

### Task 5: System Prompt

**Files:**
- Create: `backend/system_prompt.py`

**Step 1: Create the system prompt**

```python
# backend/system_prompt.py

SYSTEM_PROMPT = """You are an AI assistant representing Michael Gerstl's professional career history. You answer questions about Michael's experience, skills, leadership philosophy, and accomplishments using tools to search and read his knowledge base.

# How to Answer Questions

Think step-by-step:
1. REASON about what information you need to answer the question
2. Decide which tool to call (list_topics, search_files, or read_file)
3. OBSERVE the tool result
4. Decide if you need more information or can answer now
5. Synthesize your answer from the information you gathered

# Tool Strategy

- For broad or ambiguous questions ("Tell me about Michael"), call list_topics() first to see what's available, then read the most relevant 2-3 files
- For specific questions ("Snowflake experience"), call search_files() with targeted keywords
- After search_files returns results, call read_file() on the most relevant files to get full context
- Do not read more than 3-4 files per question unless the question spans many topics
- If search returns no results, try different keywords or consult list_topics()

# Response Format

1. Direct Answer (2-4 sentences): State the answer clearly with quantified outcomes where available
2. Supporting Detail (3-5 sentences): Technologies, scale, timeframes, team dynamics
3. Sources: List ONLY the files from which you drew specific facts (not files you read but didn't use)

# Tone and Style

- Concise, professional, fact-based. No hyperbole.
- Credit the team for execution: "The team delivered X..."
- Credit Michael for strategy and enablement: "...which Michael enabled through Y"
- Acknowledge trade-offs and constraints honestly
- If information is not in the knowledge base, say so clearly. Never fabricate.

# Constraints

- Never disclose exact financial figures, vendor contract terms, or unreleased product details
- Never name specific employees, customers, or partners
- Use relative metrics (percentages, approximate ranges) not absolutes
- If asked about salary, availability, or personal matters: "That's best discussed directly with Michael."
- If asked for opinions beyond what's documented: provide objective trade-off analysis, not subjective preferences

# Error Recovery

- If search_files returns no results, try 1-2 alternative keyword searches before giving up
- If read_file fails, do not retry with path variations. Inform the user the information is not available.
- If you cannot find relevant information after searching, say: "I don't have specific information on that topic in Michael's knowledge base. Try asking about his experience at Chewy, Babylist, data platforms, team leadership, or specific projects."
"""
```

**Step 2: Commit**

```bash
git add backend/system_prompt.py
git commit -m "feat: add ReAct-style system prompt for agentic search"
```

---

### Task 6: Gemini Agent Loop

**Files:**
- Create: `backend/agent.py`
- Create: `backend/tests/test_agent.py`

**Step 1: Write the failing tests**

```python
# backend/tests/test_agent.py
import pytest
from unittest.mock import MagicMock, patch
from agent import AgentLoop

@pytest.fixture
def mock_kb(tmp_path):
    """Create a minimal KB for agent testing."""
    career = tmp_path / "career"
    career.mkdir()
    (career / "career_chewy.md").write_text(
        "---\ncategory: career\n---\n# Chewy\n\nMichael led analytics at Chewy."
    )
    from knowledge_base import KnowledgeBase
    return KnowledgeBase(tmp_path)

def test_tool_dispatch_list_topics(mock_kb):
    agent = AgentLoop(kb=mock_kb, api_key="fake")
    result = agent._execute_tool("list_topics", {})
    assert isinstance(result, list)
    assert any("career_chewy.md" in entry["filename"] for entry in result)

def test_tool_dispatch_search_files(mock_kb):
    agent = AgentLoop(kb=mock_kb, api_key="fake")
    result = agent._execute_tool("search_files", {"query": "Chewy"})
    assert isinstance(result, list)

def test_tool_dispatch_read_file(mock_kb):
    agent = AgentLoop(kb=mock_kb, api_key="fake")
    result = agent._execute_tool("read_file", {"filename": "career/career_chewy.md"})
    assert "Chewy" in result

def test_tool_dispatch_read_file_traversal(mock_kb):
    agent = AgentLoop(kb=mock_kb, api_key="fake")
    result = agent._execute_tool("read_file", {"filename": "../../etc/passwd"})
    assert "error" in result.lower()

def test_tool_dispatch_unknown_tool(mock_kb):
    agent = AgentLoop(kb=mock_kb, api_key="fake")
    result = agent._execute_tool("delete_files", {"path": "/"})
    assert "error" in result.lower() or "unknown" in result.lower()
```

**Step 2: Run tests to verify they fail**

Run: `cd backend && python -m pytest tests/test_agent.py -v`
Expected: FAIL (cannot import AgentLoop)

**Step 3: Implement agent.py**

```python
# backend/agent.py
import json
from typing import AsyncIterator
from google import genai
from google.genai import types
from knowledge_base import KnowledgeBase
from system_prompt import SYSTEM_PROMPT
from config import MAX_TOOL_CALLS, GEMINI_MODEL

# Tool declarations for Gemini
TOOL_DECLARATIONS = [
    types.Tool(function_declarations=[
        types.FunctionDeclaration(
            name="list_topics",
            description="List all available knowledge base files with their category, tags, and summary. Call this first for broad or ambiguous questions.",
            parameters=types.Schema(type="OBJECT", properties={}),
        ),
        types.FunctionDeclaration(
            name="search_files",
            description="Full-text search across all knowledge base files. Returns matching filenames, excerpts, and relevance scores. Use targeted keywords.",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "query": types.Schema(type="STRING", description="Search query keywords"),
                },
                required=["query"],
            ),
        ),
        types.FunctionDeclaration(
            name="read_file",
            description="Read the full contents of a specific knowledge base file. Use after identifying relevant files via search or list_topics.",
            parameters=types.Schema(
                type="OBJECT",
                properties={
                    "filename": types.Schema(type="STRING", description="Relative path to the file, e.g. 'career/career_chewy.md'"),
                },
                required=["filename"],
            ),
        ),
    ])
]


class AgentLoop:
    """Gemini agent with manual function calling loop."""

    def __init__(self, kb: KnowledgeBase, api_key: str):
        self.kb = kb
        self.client = genai.Client(api_key=api_key)
        self.model = GEMINI_MODEL

    def _execute_tool(self, name: str, args: dict) -> str | list | dict:
        """Execute a tool call and return the result."""
        try:
            if name == "list_topics":
                return self.kb.list_topics()
            elif name == "search_files":
                return self.kb.search(args.get("query", ""))
            elif name == "read_file":
                return self.kb.read_file(args.get("filename", ""))
            else:
                return f"Error: Unknown tool '{name}'"
        except (ValueError, FileNotFoundError) as e:
            return f"Error: {str(e)}"
        except Exception as e:
            return f"Error: {str(e)}"

    async def run(self, message: str, history: list[dict] | None = None) -> AsyncIterator[dict]:
        """
        Run the agent loop. Yields events:
        - {"type": "tool_call", "tool": name, "args": args}
        - {"type": "text", "content": chunk}
        - {"type": "done", "files_cited": [...], "tool_calls": [...]}
        """
        # Build conversation contents
        contents = []
        if history:
            for msg in history:
                contents.append(types.Content(
                    role="user" if msg["role"] == "user" else "model",
                    parts=[types.Part.from_text(text=msg["content"])],
                ))
        contents.append(types.Content(
            role="user",
            parts=[types.Part.from_text(text=message)],
        ))

        tool_calls_log = []
        files_read = set()

        for turn in range(MAX_TOOL_CALLS):
            response = self.client.models.generate_content(
                model=self.model,
                contents=contents,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    tools=TOOL_DECLARATIONS,
                    automatic_function_calling=types.AutomaticFunctionCallingConfig(disable=True),
                ),
            )

            candidate = response.candidates[0]

            # Check for function calls
            function_calls = response.function_calls
            if function_calls:
                # Add model's response to conversation
                contents.append(candidate.content)

                # Execute each function call
                tool_parts = []
                for fc in function_calls:
                    args = dict(fc.args) if fc.args else {}

                    # Yield tool call event for UI
                    yield {"type": "tool_call", "tool": fc.name, "args": args}

                    result = self._execute_tool(fc.name, args)
                    tool_calls_log.append({"tool": fc.name, "args": args})

                    if fc.name == "read_file" and not str(result).startswith("Error"):
                        files_read.add(args.get("filename", ""))

                    # Serialize result for Gemini
                    if isinstance(result, (list, dict)):
                        result_str = json.dumps(result)
                    else:
                        result_str = str(result)

                    tool_parts.append(types.Part.from_function_response(
                        name=fc.name,
                        response={"result": result_str},
                    ))

                contents.append(types.Content(role="tool", parts=tool_parts))
                continue

            # No function calls -- this is the final text response
            if candidate.content and candidate.content.parts:
                for part in candidate.content.parts:
                    if part.text:
                        yield {"type": "text", "content": part.text}

            yield {
                "type": "done",
                "files_cited": sorted(files_read),
                "tool_calls": tool_calls_log,
            }
            return

        # Hit max tool calls -- return best effort
        yield {"type": "text", "content": "\n\n(Note: I reached my search limit for this question. The answer above is based on what I found so far.)"}
        yield {
            "type": "done",
            "files_cited": sorted(files_read),
            "tool_calls": tool_calls_log,
        }
```

**Step 4: Run tests to verify they pass**

Run: `cd backend && python -m pytest tests/test_agent.py -v`
Expected: All 5 tests PASS (tool dispatch tests don't call Gemini API)

**Step 5: Commit**

```bash
git add backend/agent.py backend/tests/test_agent.py
git commit -m "feat: add Gemini agent loop with manual function calling"
```

---

### Task 7: Chat API Endpoint with SSE Streaming

**Files:**
- Modify: `backend/main.py`

**Step 1: Add the chat endpoint**

Add to `backend/main.py`:

```python
import json
from fastapi import Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from config import GOOGLE_API_KEY, KNOWLEDGE_BASE_PATH
from knowledge_base import KnowledgeBase
from agent import AgentLoop

# Initialize on startup
kb = KnowledgeBase(KNOWLEDGE_BASE_PATH)

class ChatRequest(BaseModel):
    message: str
    history: list[dict] | None = None

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not GOOGLE_API_KEY:
        return StreamingResponse(
            iter(["data: " + json.dumps({"type": "error", "content": "AI service not configured"}) + "\n\n"]),
            media_type="text/event-stream",
            status_code=503,
        )

    agent = AgentLoop(kb=kb, api_key=GOOGLE_API_KEY)

    async def event_stream():
        try:
            async for event in agent.run(request.message, request.history):
                yield f"data: {json.dumps(event)}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'type': 'error', 'content': 'An unexpected error occurred.'})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")
```

**Step 2: Test manually with curl**

Run: `cd backend && uvicorn main:app --port 8000 --reload`

Test: `curl -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message": "Who is Michael?"}' -N`
Expected: SSE events stream back with tool_call and text events

**Step 3: Commit**

```bash
git add backend/main.py
git commit -m "feat: add /api/chat endpoint with SSE streaming"
```

---

### Task 8: Conversation Logging

**Files:**
- Create: `backend/logging_db.py`
- Create: `backend/tests/test_logging.py`

**Step 1: Write the failing test**

```python
# backend/tests/test_logging.py
import pytest
import tempfile
from pathlib import Path
from logging_db import ConversationLogger

@pytest.fixture
def logger(tmp_path):
    return ConversationLogger(tmp_path / "test.db")

def test_log_and_retrieve(logger):
    logger.log(
        user_message="Who is Michael?",
        assistant_response="Michael is a data leader.",
        tool_calls=[{"tool": "search_files", "args": {"query": "Michael"}}],
        files_cited=["career/career_chewy.md"],
        latency_ms=1500,
    )
    logs = logger.recent(limit=1)
    assert len(logs) == 1
    assert logs[0]["user_message"] == "Who is Michael?"
```

**Step 2: Run test to verify it fails**

Run: `cd backend && python -m pytest tests/test_logging.py -v`
Expected: FAIL

**Step 3: Implement logging_db.py**

```python
# backend/logging_db.py
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

class ConversationLogger:
    def __init__(self, db_path: Path):
        self.db_path = db_path
        self._conn = sqlite3.connect(str(db_path))
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                user_message TEXT NOT NULL,
                assistant_response TEXT NOT NULL,
                tool_calls TEXT,
                files_cited TEXT,
                latency_ms INTEGER
            )
        """)
        self._conn.commit()

    def log(self, user_message: str, assistant_response: str,
            tool_calls: list | None = None, files_cited: list | None = None,
            latency_ms: int | None = None):
        self._conn.execute(
            "INSERT INTO conversations (timestamp, user_message, assistant_response, tool_calls, files_cited, latency_ms) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (
                datetime.now(timezone.utc).isoformat(),
                user_message,
                assistant_response,
                json.dumps(tool_calls) if tool_calls else None,
                json.dumps(files_cited) if files_cited else None,
                latency_ms,
            )
        )
        self._conn.commit()

    def recent(self, limit: int = 20) -> list[dict]:
        rows = self._conn.execute(
            "SELECT * FROM conversations ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
        return [dict(row) for row in rows]
```

**Step 4: Run test to verify it passes**

Run: `cd backend && python -m pytest tests/test_logging.py -v`
Expected: PASS

**Step 5: Wire logging into main.py chat endpoint**

Update the `chat` function in `main.py` to log after the stream completes. Add logger initialization at module level:

```python
from logging_db import ConversationLogger
logger = ConversationLogger(Path("data/conversations.db"))
```

Update the `event_stream()` generator to accumulate the response and log it after the `done` event.

**Step 6: Commit**

```bash
git add backend/logging_db.py backend/tests/test_logging.py backend/main.py
git commit -m "feat: add SQLite conversation logging"
```

---

### Task 9: Native React Chat Component

**Files:**
- Create: `Portfolio Site/src/app/components/ChatMessage.tsx`
- Create: `Portfolio Site/src/app/components/ChatInput.tsx`
- Modify: `Portfolio Site/src/app/components/ChatPanel.tsx`

**Step 1: Create ChatMessage component**

```tsx
// Portfolio Site/src/app/components/ChatMessage.tsx
import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  filesCited?: string[];
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, filesCited, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-[#C4785C] text-white'
          : 'bg-[#4A4440] text-[#FAF7F2]'
      }`}>
        <div className="font-['Montserrat',sans-serif] text-[14px] leading-relaxed whitespace-pre-wrap">
          {content}
          {isStreaming && <span className="animate-pulse">|</span>}
        </div>
        {filesCited && filesCited.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/10">
            <span className="text-[11px] opacity-60 font-['Montserrat',sans-serif]">
              Sources: {filesCited.map(f => f.replace('.md', '').split('/').pop()).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Create ChatInput component**

```tsx
// Portfolio Site/src/app/components/ChatInput.tsx
import React, { useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-t border-[#FAF7F2]/10 bg-[#3D3632]">
      <textarea
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Michael's experience..."
        disabled={disabled}
        rows={1}
        className="flex-1 bg-[#4A4440] text-[#FAF7F2] rounded-xl px-4 py-3 resize-none font-['Montserrat',sans-serif] text-[14px] placeholder:text-[#FAF7F2]/30 focus:outline-none focus:ring-1 focus:ring-[#C4785C]/50 disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        className="bg-[#C4785C] text-white rounded-xl px-4 py-3 font-['Montserrat',sans-serif] font-medium text-[14px] hover:bg-[#B06A50] transition-colors disabled:opacity-30"
      >
        Send
      </button>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add "Portfolio Site/src/app/components/ChatMessage.tsx" "Portfolio Site/src/app/components/ChatInput.tsx"
git commit -m "feat: add ChatMessage and ChatInput React components"
```

---

### Task 10: Rewrite ChatPanel with SSE Integration

**Files:**
- Modify: `Portfolio Site/src/app/components/ChatPanel.tsx`

**Step 1: Replace ChatPanel.tsx contents**

Replace the entire file. The new component:
- Manages message history as React state
- Sends POST to `/api/chat` and reads the SSE stream
- Shows agent activity ("Searching...", "Reading...") during tool calls
- Renders messages with ChatMessage, input with ChatInput
- Keeps the same sliding panel animation

Key implementation details:
- Use `fetch()` with `response.body.getReader()` for SSE parsing
- Parse `data: {...}\n\n` lines from the stream
- Accumulate text events into the current assistant message
- Show tool_call events as activity indicators
- On `done` event, attach files_cited to the message
- API base URL from `import.meta.env.VITE_API_URL || ""` (empty string = same origin when behind Nginx)

**Step 2: Remove iframe, VITE_CHAINLIT_URL references**

The new ChatPanel has no iframe. Remove the `VITE_CHAINLIT_URL` env var from any `.env` or `.env.example` files.

**Step 3: Test locally**

Run backend: `cd backend && uvicorn main:app --port 8000 --reload`
Run frontend: `cd "Portfolio Site" && npm run dev`
Open browser, click "ASK MY AI", type a question, verify streaming response.

**Step 4: Commit**

```bash
git add "Portfolio Site/src/app/components/ChatPanel.tsx"
git commit -m "feat: replace Chainlit iframe with native SSE chat component"
```

---

### Task 11: Backend .env and Startup

**Files:**
- Create: `backend/.env.example`
- Modify: `backend/main.py` (add startup event to log manifest stats)

**Step 1: Create .env.example**

```
GOOGLE_API_KEY=<from Bitwarden>
GEMINI_MODEL=gemini-2.5-flash
KNOWLEDGE_BASE_PATH=../knowledge
MAX_TOOL_CALLS=7
ALLOWED_ORIGINS=http://localhost:5173,http://192.168.2.68
```

**Step 2: Add startup logging to main.py**

```python
@app.on_event("startup")
async def startup():
    print(f"Knowledge base loaded: {len(kb.manifest)} files indexed")
    print(f"FTS5 search ready")
```

**Step 3: Commit**

```bash
git add backend/.env.example backend/main.py
git commit -m "feat: add env example and startup logging"
```

---

### Task 12: Deployment Configuration

**Files:**
- Create: `deploy/ai-resume-api.service`
- Create: `deploy/nginx-ai-resume.conf`
- Create: `deploy/deploy.sh`

**Step 1: Create systemd service file**

```ini
# deploy/ai-resume-api.service
[Unit]
Description=AI Resume FastAPI Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/ai-resume/backend
ExecStart=/opt/ai-resume/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=on-failure
RestartSec=5
EnvironmentFile=/opt/ai-resume/backend/.env

[Install]
WantedBy=multi-user.target
```

**Step 2: Create Nginx config**

```nginx
# deploy/nginx-ai-resume.conf
server {
    listen 80;
    server_name 192.168.2.68;

    root /var/www/ai-resume;
    index index.html;

    # Static portfolio site
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy to FastAPI
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        chunked_transfer_encoding off;
    }
}
```

**Step 3: Create deployment script**

```bash
#!/bin/bash
# deploy/deploy.sh
# Run from development machine. Deploys to CT 202 via Freya.
set -e

PROXMOX_HOST="root@192.168.2.13"
CT=202

echo "=== Building frontend ==="
cd "Portfolio Site" && npm run build && cd ..

echo "=== Packaging backend ==="
tar czf /tmp/ai-resume-backend.tar.gz --exclude='__pycache__' --exclude='.pytest_cache' --exclude='data' backend/

echo "=== Packaging frontend ==="
tar czf /tmp/ai-resume-frontend.tar.gz -C "Portfolio Site/dist" .

echo "=== Uploading to CT $CT ==="
scp /tmp/ai-resume-backend.tar.gz /tmp/ai-resume-frontend.tar.gz "$PROXMOX_HOST:/tmp/"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-backend.tar.gz /tmp/ai-resume-backend.tar.gz"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-frontend.tar.gz /tmp/ai-resume-frontend.tar.gz"

echo "=== Deploying backend ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'mkdir -p /opt/ai-resume && cd /opt/ai-resume && tar xzf /tmp/ai-resume-backend.tar.gz'"
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'cd /opt/ai-resume && python3 -m venv venv && source venv/bin/activate && pip install -r backend/requirements.txt'"

echo "=== Deploying frontend ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'mkdir -p /var/www/ai-resume && cd /var/www/ai-resume && rm -rf * && tar xzf /tmp/ai-resume-frontend.tar.gz'"

echo "=== Installing services ==="
scp deploy/ai-resume-api.service "$PROXMOX_HOST:/tmp/"
scp deploy/nginx-ai-resume.conf "$PROXMOX_HOST:/tmp/"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/ai-resume-api.service /etc/systemd/system/ai-resume-api.service"
ssh "$PROXMOX_HOST" "pct push $CT /tmp/nginx-ai-resume.conf /etc/nginx/sites-available/ai-resume"

echo "=== Starting services ==="
ssh "$PROXMOX_HOST" "pct exec $CT -- bash -c 'ln -sf /etc/nginx/sites-available/ai-resume /etc/nginx/sites-enabled/ai-resume && systemctl daemon-reload && systemctl enable ai-resume-api && systemctl restart ai-resume-api && systemctl restart nginx'"

echo "=== Done! Test at http://192.168.2.68 ==="
```

**Step 4: Commit**

```bash
git add deploy/
git commit -m "feat: add deployment config (systemd, nginx, deploy script)"
```

---

### Task 13: Decommission Old Stack

**This task requires user confirmation before each step.**

**Step 1: Stop Chainlit on CT 202**

```bash
ssh root@192.168.2.13 "pct exec 202 -- bash -c 'pkill -f chainlit || true'"
ssh root@192.168.2.13 "pct exec 202 -- bash -c 'rm -rf /opt/ai-resume-app'"
```

**Step 2: Stop and remove Qdrant on CT 202**

```bash
ssh root@192.168.2.13 "pct exec 202 -- bash -c 'systemctl stop qdrant || pkill -f qdrant || true'"
# Remove Qdrant data
ssh root@192.168.2.13 "pct exec 202 -- bash -c 'rm -rf /var/lib/qdrant'"
```

**Step 3: Remove old Python dependencies**

```bash
ssh root@192.168.2.13 "pct exec 202 -- bash -c 'pip uninstall -y chainlit llama-index qdrant-client || true'"
```

**Step 4: Stop LM Studio Nomic model on Legion**

Note to user: manually stop the Nomic Embed Text model in LM Studio on 192.168.2.234 if it's still running. It's no longer needed for this project.

**Step 5: Drop gerstl_analytics database (optional, confirm with user)**

```bash
ssh root@192.168.2.13 "pct exec 201 -- bash -c \"psql -U postgres -c 'DROP DATABASE IF EXISTS gerstl_analytics;'\""
```

**Step 6: Commit note**

No code to commit for this task -- it's infrastructure cleanup.

---

### Task 14: Update Documentation

**Files:**
- Modify: `PROJECT.md`
- Modify: `STATE.md`
- Modify: `/Users/llama/Development/homelab-docs/docs/services/ai-resume.md`
- Modify: `/Users/llama/Development/homelab-docs/docs/services/containers.md`
- Modify: `/Users/llama/Development/homelab-docs/docs/operations/changelog.md`

**Step 1: Update PROJECT.md**

Update Tech Stack, Architecture, Constraints, and add a Decisions Log entry:
- `2026-02-27: Replaced RAG/Qdrant/Chainlit with Gemini agentic search + FastAPI + native React chat. Simpler architecture, better answer quality for small knowledge base.`

**Step 2: Update STATE.md**

Update Current Focus, Status (Done list, Production section), Known Issues, Next Steps.

**Step 3: Update homelab-docs ai-resume.md**

Rewrite to reflect new architecture: FastAPI + Gemini function calling, no Qdrant/Chainlit/LM Studio. Update architecture diagram, deployment section, dependencies, environment variables.

**Step 4: Update homelab-docs containers.md**

Update CT 202 entry to reflect new stack description.

**Step 5: Update changelog.md**

Add entry: `| 2026-02-27 | AI Resume: replaced RAG pipeline with agentic search | Removed Qdrant, Chainlit, LlamaIndex, LM Studio embeddings. New stack: FastAPI + Gemini function calling + SQLite FTS5 + native React chat. See [service page](../services/ai-resume.md). |`

**Step 6: Commit homelab-docs**

```bash
cd /Users/llama/Development/homelab-docs
git add docs/services/ai-resume.md docs/services/containers.md docs/operations/changelog.md
git commit -m "docs: update AI Resume to reflect agentic search redesign"
git push origin main
```

**Step 7: Commit ai-resume repo**

```bash
cd /Users/llama/Development/ai-resume
git add PROJECT.md STATE.md
git commit -m "docs: update project and state docs for agentic chat redesign"
```
