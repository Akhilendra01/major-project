from flask import Flask, request, jsonify, Response
from llama_cpp import Llama
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Path to your Mistral 7B model
MODEL_PATH = "C:/Users/ankit/Downloads/mistral-7b-v0.1.Q4_K_M.gguf"

# Load the model
logger.info("Loading Llama model...")
llm = Llama(model_path=MODEL_PATH, n_ctx=4096, n_threads=8)
logger.info("Model loaded successfully!")

# Flask app
app = Flask(__name__)

# Interview Prompt Template
INTERVIEW_PROMPT = """
You are tutor who helps in preparation for interviews for software engineer jobs.
Please the question from the suggested topics: {prompt}. Do not generate more than 3 questions. Generate questions only without answers
"""

@app.route('/')
def home():
    return "Mistral 7B Interview AI is running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Validate input
        data = request.json
        if not data or "prompt" not in data:
            return jsonify({"error": "Invalid input. 'prompt' key is required."}), 400
        
        user_prompt = data["prompt"]
        full_prompt = INTERVIEW_PROMPT.format(prompt=user_prompt)

        logger.info(f"Received prompt: {user_prompt}")

        # Generate response using Llama model
        def generate():
            for response in llm(full_prompt, max_tokens=500, temperature=1.2, stream=True):
                yield response["choices"][0]["text"]

        return Response(generate(), content_type="text/plain")

    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred during prediction."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
