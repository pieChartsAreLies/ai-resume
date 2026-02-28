import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path


class ConversationLogger:
    def __init__(self, db_path: Path):
        self.db_path = db_path
        db_path.parent.mkdir(parents=True, exist_ok=True)
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
                reasoning_trace TEXT,
                latency_ms INTEGER
            )
        """)
        self._conn.commit()

    def log(self, user_message: str, assistant_response: str,
            tool_calls: list | None = None, files_cited: list | None = None,
            reasoning_trace: list | None = None, latency_ms: int | None = None):
        self._conn.execute(
            "INSERT INTO conversations (timestamp, user_message, assistant_response, tool_calls, files_cited, reasoning_trace, latency_ms) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                datetime.now(timezone.utc).isoformat(),
                user_message,
                assistant_response,
                json.dumps(tool_calls) if tool_calls else None,
                json.dumps(files_cited) if files_cited else None,
                json.dumps(reasoning_trace) if reasoning_trace else None,
                latency_ms,
            )
        )
        self._conn.commit()

    def recent(self, limit: int = 20) -> list[dict]:
        rows = self._conn.execute(
            "SELECT * FROM conversations ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
        return [dict(row) for row in rows]
