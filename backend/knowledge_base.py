import re
import yaml
from pathlib import Path

EXCLUDE_PREFIXES = ("00_", "01_", "02_")
EXCLUDE_DIRS = {"_templates"}


def build_manifest(kb_root: Path) -> list[dict]:
    """Scan knowledge base directory and build a manifest of content files.

    Each entry contains:
        filename  - relative path from kb_root (e.g. "career/career_chewy.md")
        category  - from frontmatter, or inferred from parent directory
        tags      - list of tags from frontmatter
        summary   - first meaningful sentence extracted from the body
    """
    manifest = []
    kb_resolved = kb_root.resolve()

    for md_file in sorted(kb_resolved.rglob("*.md")):
        rel_path = md_file.relative_to(kb_resolved)

        if any(part in EXCLUDE_DIRS for part in rel_path.parts):
            continue
        if rel_path.name.startswith(EXCLUDE_PREFIXES):
            continue
        if rel_path.name in ("README.md", "ENV_SETUP.md"):
            continue

        text = md_file.read_text(encoding="utf-8")
        frontmatter = _parse_frontmatter(text)
        summary = _extract_summary(text)
        category = frontmatter.get(
            "category",
            rel_path.parts[0] if len(rel_path.parts) > 1 else "general",
        )
        tags = frontmatter.get("tags", [])

        manifest.append({
            "filename": str(rel_path),
            "category": category,
            "tags": tags,
            "summary": summary,
        })

    return manifest


def _parse_frontmatter(text: str) -> dict:
    """Extract YAML frontmatter from markdown text.

    Parsing rules:
    1. If the file starts with '---', parse standard YAML frontmatter
       up to the closing '---'.
    2. Otherwise, scan for '---' within the first 15 lines. This handles
       files that start with a heading before frontmatter (a pattern used
       throughout the knowledge base).
    3. Return empty dict if no valid frontmatter found.
    """
    # Standard frontmatter at top of file
    match = re.match(r"^---\s*\n(.*?)\n---", text, re.DOTALL)
    if not match:
        # Non-standard: frontmatter appears after an initial heading
        match = re.search(r"\n---\s*\n(.*?)\n---", text, re.DOTALL)
    if match:
        try:
            return yaml.safe_load(match.group(1)) or {}
        except yaml.YAMLError:
            return {}
    return {}


def _extract_summary(text: str) -> str:
    """Extract a one-line summary from the first meaningful paragraph.

    Strips frontmatter, skips headings and delimiter lines, then takes
    the first sentence (up to 150 characters) from the first content line.
    """
    # Remove frontmatter block (standard or non-standard position)
    cleaned = re.sub(r"---.*?---", "", text, count=1, flags=re.DOTALL).strip()
    lines = cleaned.split("\n")
    for line in lines:
        line = line.strip()
        if line and not line.startswith("#") and not line.startswith("---"):
            sentence = line.split(".")[0].strip()
            return sentence[:150]
    return ""
