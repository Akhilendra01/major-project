import logging
import uuid
from flask import Flask, request, jsonify, Response
import os, requests
from llama_cpp import Llama

# ----------------------- Config -----------------------
MODEL_PATH = "C:/Users/ankit/Downloads/phi-3-mini-4k-instruct-q4.gguf"
N_CTX = 4096
N_THREADS = 8
N_GPU_LAYERS = -1
MAX_TOKENS = 512
TEMPERATURE = 1.0
TOP_P = 0.95
REPEAT_PENALTY = 1.1
STOP_TOKENS = ["<|end|>"]

# -------------------- Logging Setup --------------------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------- Flask App ----------------------
app = Flask(__name__)

# ------------------- Load Model Once -------------------
logger.info("Loading Phi-3 Mini model...")
llm = Llama(
    model_path=MODEL_PATH, n_ctx=N_CTX, n_threads=N_THREADS, n_gpu_layers=N_GPU_LAYERS
)
logger.info("Model loaded successfully.")


def generateTagsForPrompt(prompt):
    logger.info(f"Generating tags for content: '{prompt}...'")

    tag_prompt = (
        "<|user|>\n"
        f"Generate a comma-separated list of 5 to 10 concise tags for the following post:\n\n{prompt}\n\n"
        "All tags should be lowercase, relevant, and without hashtags.\n"
        "<|end|>\n<|assistant|>"
    )

    output = llm(
        tag_prompt,
        max_tokens=128,
        temperature=TEMPERATURE,
        top_p=TOP_P,
        repeat_penalty=REPEAT_PENALTY,
        stop=STOP_TOKENS,
    )

    print(output)
    raw_output = output["choices"][0]["text"]
    tags = [tag.strip().lower() for tag in raw_output.split(",") if tag.strip()]

    return tags

# --------------------- Routes --------------------------


@app.route("/", methods=["GET"])
def home():
    return "✅ Phi-3 Mini Instruct API is up and running!"


@app.route("/predict", methods=["POST"])
async def predict():
    def format_prompt(topic: str) -> str:
        session_id = str(uuid.uuid4())[:8]
        return (
            "<|user|>\n"
            f"Generate 5 different job interview questions without answers about: {topic}. Session: {session_id}\n"
            "<|end|>\n<|assistant|>"
        )

    def stream_response(prompt: str):
        try:
            for response in llm(
                prompt,
                max_tokens=MAX_TOKENS,
                temperature=TEMPERATURE,
                top_p=TOP_P,
                repeat_penalty=REPEAT_PENALTY,
                stream=True,
                stop=STOP_TOKENS,
            ):
                token = response["choices"][0]["text"]
                yield token
        except Exception as e:
            logger.error(f"Error in model generation: {e}")
            yield "[ERROR] Model generation failed."

    try:
        data = request.get_json()
        if not data or "prompt" not in data:
            return jsonify({"error": "Invalid input. 'prompt' key is required."}), 400

        topic = data["prompt"].strip()
        prompt=data["prompt"].strip()
        tags=generateTagsForPrompt(prompt)
        #fetch articles with most relevant tags from the database
        req_path=f"{os.environ.get("CONTENT_SERVER_URL")}/get-tagged-articles"
        articles=await requests.post(req_path, json={'tags': tags})
        print(articles)

        logger.info(f"Generating interview questions for topic: '{prompt}'")

        full_prompt = format_prompt(prompt)
        return Response(stream_response(full_prompt), content_type="text/plain")

    except Exception as e:
        logger.exception("Unexpected error during prediction.")
        return jsonify({"error": "An internal server error occurred."}), 500


@app.route("/generate-tags", methods=["POST"])
def generateTags():
    try:
        data = request.get_json()
        if not data or "prompt" not in data:
            return jsonify({"error": "Invalid input. 'prompt' key is required."}), 400

        content = data["prompt"].strip()
        logger.info(f"Generating tags for content: '{content[:100]}...'")

        tag_prompt = (
            "<|user|>\n"
            f"Generate a comma-separated list of 5 to 10 concise tags for the following post:\n\n{content}\n\n"
            "All tags should be lowercase, relevant, and without hashtags.\n"
            "<|end|>\n<|assistant|>"
        )

        output = llm(
            tag_prompt,
            max_tokens=128,
            temperature=TEMPERATURE,
            top_p=TOP_P,
            repeat_penalty=REPEAT_PENALTY,
            stop=STOP_TOKENS,
        )

        print(output)
        raw_output = output["choices"][0]["text"]
        tags = [tag.strip().lower() for tag in raw_output.split(",") if tag.strip()]

        return jsonify({"tags": tags}), 200

    except Exception as e:
        logger.exception("Unexpected error during tag generation.")
        return jsonify({"error": "An internal server error occurred."}), 500


# ------------------- App Entry Point -------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
