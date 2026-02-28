import pytest
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from knowledge_base import KnowledgeBase

@pytest.fixture
def populated_kb(tmp_path):
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
    # "migrations" should match "migration" via Porter stemming (both stem to "migrat")
    results = populated_kb.search("migrations")
    assert len(results) > 0

def test_search_no_results(populated_kb):
    results = populated_kb.search("blockchain")
    assert len(results) == 0
