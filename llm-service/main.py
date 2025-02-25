from flask import Flask, request

from transformers import AutoModelForCausalLM, AutoTokenizer

def create_chain():
    save_path = "/content/drive/MyDrive/Phi-3-mini-4k-instruct"

    # Load tokenizer
    tokenizer = AutoTokenizer.from_pretrained(save_path)

    # Load model
    model = AutoModelForCausalLM.from_pretrained(save_path, device_map="auto")

    from transformers import pipeline

    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=200,
        temperature=1.2,
        do_sample=True,
    )

    from langchain.llms import HuggingFacePipeline

    llm = HuggingFacePipeline(pipeline=pipe)

    from langchain.chains import LLMChain

    from langchain.prompts import PromptTemplate

    template = PromptTemplate(
        template="""You are tutor who helps in preparation for interviews for software engineer jobs.
        Please the question from the suggested topics: {topics}. Do not generate more than 3 questions. Generate questions only without answers""",
        input_variables=["topics"],
    )

    chain = LLMChain(llm=llm, prompt=template)
    print("Model loaded successfully!")
    return chain


chain=create_chain()

app = Flask(__name__)

@app.route('/')
def home():
    return 'Model running api'


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Get input data in JSON format
    topic = data["prompt"]  # Assuming the input is in this format

    response = chain.invoke({"topics": topic})
    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
