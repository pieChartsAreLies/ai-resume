"""
The Gerstl Interface - Chainlit App with Google Gemini
Uses Google Gemini API instead of Ollama for LLM inference
"""
import chainlit as cl
import sys
from pathlib import Path

# Add scripts to path
sys.path.append(str(Path(__file__).parent.parent / "scripts"))

from config import GOOGLE_API_KEY, QDRANT_URL, COLLECTION_NAME, SIMILARITY_THRESHOLD, TOP_K

import google.generativeai as genai
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.llms.gemini import Gemini
from qdrant_client import QdrantClient

# Configure Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini LLM
llm = Gemini(model="models/gemini-pro", api_key=GOOGLE_API_KEY)

# Initialize Gemini Embeddings
embed_model = GeminiEmbedding(model_name="models/embedding-001", api_key=GOOGLE_API_KEY)

# Initialize Qdrant client
client = QdrantClient(url=QDRANT_URL)

# Load vector store
vector_store = QdrantVectorStore(client=client, collection_name=COLLECTION_NAME)

# Create index
index = VectorStoreIndex.from_vector_store(
    vector_store,
    embed_model=embed_model
)

# Create query engine
query_engine = index.as_query_engine(
    llm=llm,
    similarity_top_k=TOP_K,
    response_mode="compact",
    verbose=True
)

@cl.on_chat_start
async def start():
    """Initialize chat session"""
    await cl.Message(
        content="""# Welcome to The Gerstl Interface 👋

I'm an AI assistant with access to Michael Gerstl's professional knowledge base. I can answer questions about:

- **Career History** (Chewy, Babylist, and earlier roles)
- **Technical Expertise** (Data platforms, governance, analytics)
- **Leadership Philosophy** (Servant leadership, team scaling)
- **Project Case Studies** (Tableau scaling, PII reduction, instrumentation audits)
- **Skills & Technologies** (Snowflake, AWS, Airflow, dbt, and more)

Ask me anything! Every response includes source citations showing where the information comes from.

**Powered by:** Google Gemini API + Qdrant Vector Database
"""
    ).send()

@cl.on_message
async def main(message: cl.Message):
    """Handle incoming messages"""

    # Show loading indicator
    msg = cl.Message(content="")
    await msg.send()

    try:
        # Query the knowledge base
        response = query_engine.query(message.content)

        # Extract source nodes
        source_nodes = response.source_nodes
        filtered_nodes = [n for n in source_nodes if n.score >= SIMILARITY_THRESHOLD]

        if not filtered_nodes:
            msg.content = "I don't have high-confidence information on this topic. Could you rephrase your question or ask about something else?"
        else:
            # Format response with sources
            answer = str(response.response)

            # Add sources section
            sources = "\n\n---\n\n### 📚 Sources\n\n"
            for i, node in enumerate(filtered_nodes, 1):
                file_name = node.node.metadata.get('file_name', 'unknown')
                similarity = node.score
                sources += f"{i}. **{file_name}** (similarity: {similarity:.2%})\n"

            msg.content = answer + sources

        await msg.update()

    except Exception as e:
        msg.content = f"❌ Error processing your question: {str(e)}\n\nPlease try again or rephrase your question."
        await msg.update()

if __name__ == "__main__":
    print("Starting Chainlit app with Google Gemini...")
    print(f"Qdrant URL: {QDRANT_URL}")
    print(f"Collection: {COLLECTION_NAME}")
