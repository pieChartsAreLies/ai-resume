"""
Configuration management for The Gerstl Interface
Loads environment variables from .env file
"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root
project_root = Path(__file__).parent.parent
env_path = project_root / ".env"
load_dotenv(dotenv_path=env_path)

# API Keys
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Qdrant Configuration
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "gerstl_career")

# PostgreSQL Configuration
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_DB = os.getenv("POSTGRES_DB", "gerstl_analytics")
POSTGRES_USER = os.getenv("POSTGRES_USER", "gerstl")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")

# Application Settings
SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", "0.70"))
TOP_K = int(os.getenv("TOP_K", "5"))

# Paths
KNOWLEDGE_BASE_PATH = str(project_root)

# Validate required settings
if not GOOGLE_API_KEY:
    print("WARNING: GOOGLE_API_KEY not found in .env file")
