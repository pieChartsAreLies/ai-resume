# Environment Configuration Guide

## Quick Start

1. **Your `.env` file is already created** and contains your Google API key
2. **The `.gitignore` file protects it** from being committed to git
3. **All scripts load from `.env` automatically** using `python-dotenv`

## How It Works

### The `.env` File (Already Created ✅)
```bash
# Located at: /Users/llama/Development/ai-resume/.env
GOOGLE_API_KEY=AIzaSy... (your actual key)
QDRANT_URL=http://localhost:6333
COLLECTION_NAME=gerstl_career
# ... other settings
```

### The `.gitignore` File (Already Created ✅)
```bash
# Prevents .env from being committed
.env
.env.local
.env.*.local
```

### Using Environment Variables in Your Code

**Example 1: Using the config module**
```python
from scripts.config import GOOGLE_API_KEY, QDRANT_URL

# Use the variables
print(f"Connecting to Qdrant at {QDRANT_URL}")
```

**Example 2: Direct usage with python-dotenv**
```python
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env file
api_key = os.getenv("GOOGLE_API_KEY")
```

## Installation

Install dependencies to use the configuration:

```bash
# Install Python dependencies
pip install -r requirements.txt

# OR install just the essentials
pip install python-dotenv google-generativeai
```

## Testing Your Setup

Run the test script to verify your API key works:

```bash
cd /Users/llama/Development/ai-resume
python scripts/test_gemini.py
```

Expected output:
```
✅ API Key loaded successfully!
📋 Available Gemini models:
  - models/gemini-pro
  - models/gemini-pro-vision
🧪 Testing content generation...
✅ Response: Hello! How can I help you today?
```

## Security Best Practices ✅

- ✅ **API key is in `.env` file** (not in code)
- ✅ **`.env` is in `.gitignore`** (won't be committed)
- ✅ **Scripts use `config.py`** (centralized configuration)
- ✅ **Never share the actual key value** (only reference the variable name)

## Configuration Variables

Your `.env` file contains these settings:

| Variable | Purpose | Default |
|----------|---------|---------|
| `GOOGLE_API_KEY` | Google Gemini API authentication | Required |
| `QDRANT_URL` | Vector database connection | `http://localhost:6333` |
| `COLLECTION_NAME` | Qdrant collection name | `gerstl_career` |
| `POSTGRES_HOST` | Analytics database host | `localhost` |
| `POSTGRES_DB` | Analytics database name | `gerstl_analytics` |
| `POSTGRES_USER` | Database user | `gerstl` |
| `POSTGRES_PASSWORD` | Database password | Set this! |
| `SIMILARITY_THRESHOLD` | RAG similarity cutoff | `0.70` |
| `TOP_K` | Number of chunks to retrieve | `5` |

## Next Steps

1. **Update `POSTGRES_PASSWORD`** in `.env` with a secure password
2. **Test the API key** with `python scripts/test_gemini.py`
3. **Start building** your RAG pipeline using the configuration

## Using in Different Components

### In Ingestion Scripts
```python
from scripts.config import GOOGLE_API_KEY, QDRANT_URL, KNOWLEDGE_BASE_PATH
# Your ingestion logic here
```

### In Query Engine
```python
from scripts.config import GOOGLE_API_KEY, SIMILARITY_THRESHOLD, TOP_K
# Your query logic here
```

### In Chainlit App
```python
from scripts.config import GOOGLE_API_KEY, QDRANT_URL
# Your UI logic here
```

## Troubleshooting

**Problem:** "GOOGLE_API_KEY not found"
- **Solution:** Make sure `.env` file exists in project root
- **Check:** Run `cat .env` to verify the file exists

**Problem:** API key not working
- **Solution:** Verify the key in Google Cloud Console
- **Check:** Run `python scripts/test_gemini.py` to test

**Problem:** Can't import config
- **Solution:** Make sure you're in the project root or adjust Python path
- **Fix:** `cd /Users/llama/Development/ai-resume` before running scripts
