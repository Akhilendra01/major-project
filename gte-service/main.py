import os
import torch
import requests
from transformers import AutoTokenizer, AutoModel
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

tokenizer = AutoTokenizer.from_pretrained(os.environ.get("MODEL_PATH"))
model = AutoModel.from_pretrained(os.environ.get("MODEL_PATH"))

print("Model loaded successfully")

app = Flask(__name__)

def generateEmbedding(prompt: str):
    inputs = tokenizer(
        prompt, return_tensors="pt", max_length=512, truncation=True, padding=True
    )

    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state
    paragraph_embedding = embeddings.mean(dim=1)

    return paragraph_embedding.squeeze().tolist()

@app.route("/get-embeddings", methods=["POST"])
def getEmbeddings():
    try:
        data=request.get_json()

        if "prompt" not in data:
            return jsonify({"error": "No prompt field in request"}), 400
        
        prompt=data["prompt"]
        embedding=generateEmbedding(prompt)

        return jsonify({"embedding": embedding}), 200
    except:
        return jsonify({"error": "An internal error occured"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
