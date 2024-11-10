import json
from langchain_groq import ChatGroq

# Initialize the LLaMA model
llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key="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",
    temperature=0,
    timeout=30,
    max_retries=2
)

# Path to the JSON file
code_path = r"backend/dist/controller/code.json"
output_path = r"backend/dist/controller/terminal.json"

# Read the JSON file
with open(code_path, "r") as file:
    data = json.load(file)

# Extract the code and language
code = data.get("code")
language = data.get("language")

# Prepare prompt based on language
prompt = f"Compile and run the following {language} code:\n\n{code} just give the output in terminal format "

# Execute the code via LLaMA API
try:
    response = llm.invoke(prompt + "the format of output should be exactly '========/n<output line by line>/n========'").content.strip()
    
    # Save the response to terminal.json
    with open(output_path, "w") as output_file:
        json.dump({"output": response}, output_file, indent=4)
    
    print("Response saved to terminal.json")
except Exception as e:
    print(f"An error occurred: {e}")
