import pytest
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from knowledge_base import build_manifest


@pytest.fixture
def sample_kb(tmp_path):
    career = tmp_path / "career"
    career.mkdir()
    (career / "career_chewy.md").write_text(
        "---\ncategory: career\ntags: [fortune-500, ipo]\n---\n"
        "# VP Leadership at Chewy\n\nMichael led analytics at Chewy for 6 years."
    )
    templates = tmp_path / "_templates"
    templates.mkdir()
    (templates / "TEMPLATE_career.md").write_text("# Template")
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
    assert not any(Path(f).name.startswith("00_") for f in filenames)


def test_manifest_entry_has_required_fields(sample_kb):
    manifest = build_manifest(sample_kb)
    entry = manifest[0]
    assert "filename" in entry
    assert "category" in entry
    assert "summary" in entry
