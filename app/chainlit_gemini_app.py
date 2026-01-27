"""
Michael Gerstl - AI Career Assistant
Chainlit App with Google Gemini + RAG
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

# System prompt for job matching
JOB_MATCH_PROMPT = """You are analyzing how well Michael Gerstl's background matches a job description.

Based on the job description provided and Michael's experience from the knowledge base, provide:

1. **Match Score**: A percentage (0-100%) indicating overall fit
2. **Strong Matches**: 3-5 areas where Michael's experience directly aligns
3. **Potential Gaps**: Any requirements where experience may be limited
4. **Talking Points**: 2-3 specific accomplishments Michael should highlight for this role

Be specific and reference actual projects, metrics, and experiences from Michael's background.
Keep the response concise and actionable."""


@cl.on_chat_start
async def start():
    """Initialize chat session"""
    cl.user_session.set("mode", "chat")

    await cl.Message(
        content="""**Ask me anything** about Michael's experience, projects, or leadership approach.

Or paste a **job description** and I'll analyze the fit.

*Try: "What's Michael's experience with Snowflake?" or paste a JD to see match analysis.*"""
    ).send()


def is_job_description(text: str) -> bool:
    """Detect if the message looks like a job description"""
    jd_indicators = [
        "responsibilities",
        "requirements",
        "qualifications",
        "experience required",
        "years of experience",
        "bachelor's degree",
        "master's degree",
        "we are looking for",
        "you will",
        "you'll",
        "about the role",
        "job description",
        "what you'll do",
        "who you are",
        "preferred qualifications",
        "nice to have",
        "compensation",
        "benefits",
    ]
    text_lower = text.lower()
    matches = sum(1 for indicator in jd_indicators if indicator in text_lower)
    # If 3+ indicators, likely a JD
    return matches >= 3 or len(text) > 1000


@cl.on_message
async def main(message: cl.Message):
    """Handle incoming messages"""

    msg = cl.Message(content="")
    await msg.send()

    try:
        user_input = message.content

        # Check if this looks like a job description
        if is_job_description(user_input):
            # Job matching mode
            msg.content = "📋 *Analyzing job description against Michael's background...*"
            await msg.update()

            # Query for relevant experience
            match_query = f"""Based on this job description, what relevant experience does Michael have?

Job Description:
{user_input}

Provide a detailed match analysis including: match percentage, strong alignments, potential gaps, and specific talking points from Michael's actual experience."""

            response = query_engine.query(match_query)
            source_nodes = response.source_nodes
            filtered_nodes = [n for n in source_nodes if n.score >= SIMILARITY_THRESHOLD]

            answer = str(response.response)

            # Add sources
            if filtered_nodes:
                sources = "\n\n---\n**Sources:** "
                source_files = list(set(n.node.metadata.get('file_name', 'unknown') for n in filtered_nodes))
                sources += ", ".join(source_files[:5])
                answer += sources

            msg.content = answer

        else:
            # Regular Q&A mode
            response = query_engine.query(user_input)
            source_nodes = response.source_nodes
            filtered_nodes = [n for n in source_nodes if n.score >= SIMILARITY_THRESHOLD]

            if not filtered_nodes:
                msg.content = "I don't have specific information on that topic. Try asking about Michael's experience at Chewy, Babylist, data platforms, team leadership, or specific projects."
            else:
                answer = str(response.response)

                # Compact sources
                sources = "\n\n---\n**Sources:** "
                source_files = list(set(n.node.metadata.get('file_name', 'unknown') for n in filtered_nodes))
                sources += ", ".join(source_files[:5])

                msg.content = answer + sources

        await msg.update()

    except Exception as e:
        msg.content = f"Error: {str(e)}\n\nPlease try rephrasing your question."
        await msg.update()


if __name__ == "__main__":
    print("Starting Chainlit app with Google Gemini...")
    print(f"Qdrant URL: {QDRANT_URL}")
    print(f"Collection: {COLLECTION_NAME}")
