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
