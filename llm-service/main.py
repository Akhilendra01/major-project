import logging
import uuid
from flask import Flask, request, jsonify, Response
import httpx
import os, requests, io
import PyPDF2
from llama_cpp import Llama
from dotenv import load_dotenv
from urllib.parse import quote

load_dotenv()

# ----------------------- Config -----------------------
MODEL_PATH = "C:/Users/ankit/Downloads/phi-3-mini-4k-instruct-q4.gguf"
N_CTX = 4096
N_THREADS = 8
N_GPU_LAYERS = -1
MAX_TOKENS = 1024
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
        "Generate a comma-separated list of 5 to 10 concise hyphen-separated word tags for the following post:\n\n"
        f"{prompt}\n\n"
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

    raw_output = output["choices"][0]["text"]
    tags = [tag.strip().lower() for tag in raw_output.split(",") if tag.strip()]

    return tags


def generateSupportTextFromArticles(articles):
    text = ""
    for idx, article in enumerate(articles):
        text += (
            f"{idx + 1}. Title: {article['title']}\nContent: {article['content']}\n\n"
        )
    return text


# --------------------- Routes --------------------------


@app.route("/", methods=["GET"])
def home():
    return "✅ Phi-3 Mini Instruct API is up and running!"

@app.route("/predict", methods=["POST"])
async def predict():
    def format_prompt(topic: str, support_text: str) -> str:
        session_id = str(uuid.uuid4())[:8]
        return (
            "<|user|>\n"
            f"You are an AI tutor. Generate 5 different and insightful job interview questions (without answers) "
            f"about the topic: '{topic}'. Use the support material below to ensure relevance and depth.\n\n"
            f"Support Articles:\n{support_text}\n\n"
            f"Session ID: {session_id}\n"
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

        prompt = data["prompt"].strip()

        req_path = f'{os.environ.get("CONTENT_SERVER_URL")}/search-articles?q={quote(prompt)}'

        async with httpx.AsyncClient() as client:
            res = await client.get(
                req_path,
                headers={"Authorization": f'Bearer {os.environ.get("ACCESS_TOKEN")}'},
            )
            articles = res.json().get("data", {}).get("articles", [])

        support_text = generateSupportTextFromArticles(articles)


        logger.info(f"Generating interview questions for topic: '{prompt}'")
        full_prompt = format_prompt(prompt, support_text)
        logger.info(f"Full prompt: '{full_prompt}'")
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
            f"Generate a comma-separated list of 5 to 10 concise tags for the following text:\n\n{content}\n\n"
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
    
@app.route("/judge-resume", methods=["POST"])
def judgeResume():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        if file.filename == '' or not file.filename.endswith('.pdf'):
            return jsonify({"error": "Invalid file. Please upload a PDF"}), 400

        # Read PDF and extract text
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        resume_text = ""
        for page in pdf_reader.pages:
            resume_text += page.extract_text()

        resume_text = resume_text.strip()
        logger.info(f"Analyzing resume: '{resume_text[:100]}...'")

        judge_prompt = (
            "<|user|>\n"
            "Evaluate the following entry-level resume professionally. Provide a detailed and constructive review in the following format:\n\n"
            "1. Overall Score (1-10)\n"
            "2. Key Strengths (bullet points)\n"
            "3. Areas for Improvement (bullet points)\n"
            "4. Format and Presentation (score 1-10)\n"
            "5. Academic Foundation (score 1-10)\n"
            "6. Projects and Internships (score 1-10)\n"
            "7. Skill Presentation (score 1-10)\n"
            "8. Initiative and Extra Effort (score 1-10)\n"
            "9. Communication and Tone (score 1-10)\n"
            "10. ATS Readiness (score 1-10)\n"
            "11. Summary Gap Analysis (3–5 bullet points suggesting specific improvements for an entry-level resume)\n\n"
            f"Resume:\n{resume_text}\n"
            "<|end|>\n<|assistant|>"
        )


        output = llm(
            judge_prompt,
            max_tokens=512,  # Increased for detailed response
            temperature=TEMPERATURE,
            top_p=TOP_P,
            repeat_penalty=REPEAT_PENALTY,
            stop=STOP_TOKENS,
        )

        raw_output = output["choices"][0]["text"]
        
        # Parse the structured feedback
        feedback_sections = raw_output.split('\n\n')
        
        try:
            overall_score = int(feedback_sections[0].split(':')[-1].strip())
        except:
            overall_score = 0

        return jsonify({
            "success": True,
            "analysis": {
                "overall_score": overall_score,
                "detailed_feedback": raw_output,
            }
        }), 200

    except Exception as e:
        logger.exception("Error during resume analysis")
        return jsonify({"error": str(e)}), 500


# ------------------- App Entry Point -------------------

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
