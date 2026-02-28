import json
import time
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from config import ALLOWED_ORIGINS, GOOGLE_API_KEY, KNOWLEDGE_BASE_PATH
from knowledge_base import KnowledgeBase
from agent import AgentLoop
from logging_db import ConversationLogger

app = FastAPI(title="AI Resume Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Initialize on startup
kb = KnowledgeBase(KNOWLEDGE_BASE_PATH)
logger = ConversationLogger(Path(__file__).parent / "data" / "conversations.db")


class ChatRequest(BaseModel):
    message: str
    history: list[dict] | None = None


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not GOOGLE_API_KEY:
        return StreamingResponse(
            iter(["data: " + json.dumps({"type": "error", "content": "AI service not configured"}) + "\n\n"]),
            media_type="text/event-stream",
            status_code=503,
        )

    agent = AgentLoop(kb=kb, api_key=GOOGLE_API_KEY)
    start_time = time.time()

    async def event_stream():
        response_text = ""
        files_cited = []
        tool_calls_log = []

        try:
            async for event in agent.run(request.message, request.history):
                yield f"data: {json.dumps(event)}\n\n"

                if event["type"] == "text":
                    response_text += event["content"]
                elif event["type"] == "done":
                    files_cited = event.get("files_cited", [])
                    tool_calls_log = event.get("tool_calls", [])
                elif event["type"] == "limit_reached":
                    response_text += event.get("message", "")

        except Exception:
            yield f"data: {json.dumps({'type': 'error', 'content': 'An unexpected error occurred.'})}\n\n"
            return

        # Log the conversation
        latency_ms = int((time.time() - start_time) * 1000)
        try:
            logger.log(
                user_message=request.message,
                assistant_response=response_text,
                tool_calls=tool_calls_log,
                files_cited=files_cited,
                reasoning_trace=tool_calls_log,
                latency_ms=latency_ms,
            )
        except Exception:
            pass  # Don't fail the response if logging fails

    return StreamingResponse(event_stream(), media_type="text/event-stream")


@app.on_event("startup")
async def startup():
    print(f"Knowledge base loaded: {len(kb.manifest)} files indexed")
    print(f"FTS5 search ready")
