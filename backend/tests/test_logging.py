import pytest
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

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
        reasoning_trace=[{"step": 1, "tool": "search_files", "result": "found 2 files"}],
        latency_ms=1500,
    )
    logs = logger.recent(limit=1)
    assert len(logs) == 1
    assert logs[0]["user_message"] == "Who is Michael?"
