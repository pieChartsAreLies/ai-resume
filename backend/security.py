from pathlib import Path


def safe_resolve_path(filename: str, kb_root: Path) -> Path:
    """Resolve a filename to an absolute path within kb_root. Raises ValueError if unsafe."""
    if not filename or not filename.strip():
        raise ValueError("Filename must not be empty")

    if "\x00" in filename:
        raise ValueError("Invalid filename")

    resolved = (kb_root / filename).resolve()
    kb_resolved = kb_root.resolve()

    # Check path containment before anything else -- this is the critical security gate.
    if not str(resolved).startswith(str(kb_resolved) + "/") and resolved != kb_resolved:
        raise ValueError(f"Path resolves outside knowledge base: {filename}")

    if not filename.endswith(".md"):
        raise ValueError("File must be .md")

    return resolved
