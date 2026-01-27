"""
Test script for Google Gemini API integration
Demonstrates how to use the API key from .env file
"""
from config import GOOGLE_API_KEY
import google.generativeai as genai

def test_gemini_connection():
    """Test that the Gemini API key works"""
    if not GOOGLE_API_KEY:
        print("❌ ERROR: GOOGLE_API_KEY not found in .env file")
        return False

    try:
        # Configure the API
        genai.configure(api_key=GOOGLE_API_KEY)

        # List available models
        print("✅ API Key loaded successfully!")
        print("\n📋 Available Gemini models:")
        for model in genai.list_models():
            if 'generateContent' in model.supported_generation_methods:
                print(f"  - {model.name}")

        # Test a simple generation
        print("\n🧪 Testing content generation...")
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Say hello in one sentence.")
        print(f"✅ Response: {response.text}")

        return True

    except Exception as e:
        print(f"❌ ERROR: {e}")
        return False

if __name__ == "__main__":
    test_gemini_connection()
