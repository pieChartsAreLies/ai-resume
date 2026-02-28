import pytest
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from agent import AgentLoop

@pytest.fixture
def mock_kb(tmp_path):
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
