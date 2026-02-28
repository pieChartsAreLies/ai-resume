import pytest
from pathlib import Path

# Add backend to path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent))

from security import safe_resolve_path

# Use resolved root so macOS /tmp -> /private/tmp symlink doesn't break assertions.
KB_ROOT = Path("/tmp/test_kb").resolve()

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

def test_null_byte_rejected():
    with pytest.raises(ValueError):
        safe_resolve_path("career/notes\x00.md", KB_ROOT)
