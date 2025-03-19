from flask import Flask, request, jsonify, Response
import torch
import logging
import threading
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, TextIteratorStreamer
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms import HuggingFacePipeline

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_chain():
    save_path = "../../Phi-3-mini-4k-instruct"
    try:
        # Load tokenizer
        tokenizer = AutoTokenizer.from_pretrained(save_path)

        # Load model with correct dtype
        model = AutoModelForCausalLM.from_pretrained(
            save_path,
            device_map="auto",
            load_in_4bit=True,  # Enable 4-bit precision
            eos_token_id=tokenizer.eos_token_id,
            bnb_4bit_compute_dtype=torch.float16  # Match compute dtype to input dtype
        )

        # Create text generation pipeline
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            max_new_tokens=250,
            temperature=1.2,
            do_sample=True,
            eos_token_id=tokenizer.eos_token_id
        )

        # Wrap pipeline in HuggingFacePipeline
        llm = HuggingFacePipeline(pipeline=pipe)

        # Define prompt template
        template = PromptTemplate(
            input_variables=["prompt"],
            template="""
You are tutor who helps in preparation for interviews for software engineer jobs.
    Please the question from the suggested topics: {prompt}. Do not generate more than 3 questions. Generate questions only without answers
            """
        )

        # Create LLMChain
        chain = LLMChain(llm=llm, prompt=template)
        logger.info("Model loaded successfully!")
        return chain, template, model, tokenizer
    
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise

# Initialize the chain
chain, template, model, tokenizer = create_chain()

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def home():
    return 'Model running API'

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get input data
        data = request.json
        if not data or "prompt" not in data:
            return jsonify({"error": "Invalid input. 'prompt' key is required."}), 400

        prompt = data["prompt"]

        # Create streamer for streaming generation
        streamer = TextIteratorStreamer(tokenizer)

        # Generate text in a separate thread to avoid blocking
        generation_kwargs = {
            "input_ids": tokenizer(prompt, return_tensors="pt").input_ids.to(model.device),
            "max_new_tokens": 500,
            "temperature": 1.2,
            "do_sample": True,
            "eos_token_id": tokenizer.eos_token_id,
            "streamer": streamer,  # ✅ Correct way to stream tokens
        }

        thread = threading.Thread(target=model.generate, kwargs=generation_kwargs)
        thread.start()

        # Stream response
        def generate():
            for new_token in streamer:
                yield new_token

        return Response(generate(), content_type="text/plain")

    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        return jsonify({"error": "An error occurred during prediction."}), 500

if __name__ == "__main__":
    # Run the app
    app.run(host="0.0.0.0", port=5000, debug=True)