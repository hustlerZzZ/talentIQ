import json
from langchain_groq import ChatGroq

# Initialize the LLaMA model once
llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key="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",
    temperature=0,
    timeout=30,
    max_retries=2
)

def compiling_from_llama(code, test_cases):
    # Format the input for LLaMA
    input_text = f"Here is the code:\n\n{code}\n\nNow, run these test cases and provide a result:\n{test_cases}"
    
    try:
        # Get the response from LLaMA
        response = llm.invoke(input_text + " Just give a JSON format output")
        return response.content.strip()  # Clean up the response
    except Exception as e:
        print(f"An error occurred while calling LLaMA: {e}")
        return "Test cases not generated"

def case_reader(case_path, code_path):
    try:
        # Read the test cases JSON file
        with open(case_path, 'r') as f:
            case_data = json.load(f)
            test_cases = case_data.get("test_cases", [])
    except FileNotFoundError:
        print(f"File {case_path} not found. Please check the path and try again.")
        return
    except json.JSONDecodeError:
        print(f"Error decoding JSON in {case_path}.")
        return

    try:
        # Read the code JSON file
        with open(code_path, 'r') as f:
            code_data = json.load(f)
            code = code_data.get("code", "")
    except FileNotFoundError:
        print(f"File {code_path} not found. Please check the path and try again.")
        return
    except json.JSONDecodeError:
        print(f"Error decoding JSON in {code_path}.")
        return

    if test_cases and code:
        # Compile using LLaMA
        result = compiling_from_llama(code, test_cases)
        
        # Output the result
        print(f"Result from LLaMA:\n{result}")
    else:
        print("Either code or test cases are missing in the JSON files.")

# Specify the paths to the case and code JSON files
case_path = "test.json"
code_path = "code.json"

# Call the case reader function
case_reader(case_path, code_path)
