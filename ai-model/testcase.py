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

def get_test_cases_from_llama(description):
    # Format the input for LLaMA
    input_text = f"Description: {description} Generate 5 test cases for this description. Don't give the code; provide a word description suitable for an interview question."
    
    try:
        # Get the response from LLaMA
        response = llm.invoke(input_text + " Just give a JSON format output")
        return response.content.strip()  # Clean up the response
    except Exception as e:
        print(f"An error occurred while calling LLaMA: {e}")
        return "Test cases not generated"


def jsonreader(json_path, output_path="test.json"):
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
            description = data.get("Description", "")
    except FileNotFoundError:
        print(f"File {json_path} not found. Please check the path and try again.")
        return
    except json.JSONDecodeError:
        print(f"Error decoding JSON in {json_path}.")
        return

    if description:
        test_cases = get_test_cases_from_llama(description)
        output_data = {
            "description": description,
            "test_cases": test_cases
        }
        with open(output_path, 'w') as f:
            json.dump(output_data, f, indent=2)
        print(f"Test cases have been saved to {output_path}")
    else:
        print("No description found in the JSON file.")

# Specify the JSON path and run the test case generation function
json_path = "description.json"
jsonreader(json_path)
