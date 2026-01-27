#!/bin/bash
# Start the Gemini-powered Chainlit app

cd "$(dirname "$0")"

echo "🚀 Starting The Gerstl Interface (Gemini Edition)..."
echo ""
echo "📍 Running from: $(pwd)"
echo "🔑 Using API key from: .env"
echo "🗄️  Qdrant URL: ${QDRANT_URL:-http://localhost:6333}"
echo ""

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    echo "✅ Activating virtual environment..."
    source venv/bin/activate
fi

# Install dependencies if needed
if ! python3 -c "import chainlit" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

# Run the app
echo "🎯 Starting Chainlit on port 8001..."
chainlit run app/chainlit_gemini_app.py --host 0.0.0.0 --port 8001
