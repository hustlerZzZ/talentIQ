import fitz  # PyMuPDF
import re
import json
from langchain_groq import ChatGroq

# Initialize the LLaMA model once
llm = ChatGroq(
    model="llama3-8b-8192",
    groq_api_key="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",
    temperature=0,
    max_tokens=100,
    timeout=30,
    max_retries=2
)

# Function to get the correct answer from LLaMA based on the question and options
def get_correct_answer_from_llama(question, options):
    # Format the input for LLaMA
    input_text = f"Question: {question}\nOptions:\n" + "\n".join([f"{idx + 1}. {option}" for idx, option in enumerate(options)]) + "\nAnswer:"
    
    try:
        # Get the response from LLaMA
        response = llm.invoke(input_text + " Just give the option index as answer")
        return response.content.strip()  # Clean up the response
    except Exception as e:
        print(f"An error occurred while calling LLaMA: {e}")
        return "Correct answer not available"

# Function to process a single PDF file and extract questions, options, correct answer, and points
def process_pdf(pdf_path):
    # Open the PDF file
    doc = fitz.open(pdf_path)
    questions = []

    # Regex patterns to match questions, options, and points
    question_pattern = re.compile(r'^\d+\.\s(.+?)(?:\(Points: \d+\))?$|^Q\d+\.\s(.+?)(?:\(Points: \d+\))?$')
    option_pattern = re.compile(r'^[A-Da-d]?\s?[\)\.\-]?[\u2022]?\s*(.+)')
    points_pattern = re.compile(r'\(Points:\s*(\d+)\)')
    
    # Set default points
    default_points = 10

    # Temporary variables to store question data
    current_question = None
    current_options = []
    current_points = None

    # Process each page in the PDF
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text = page.get_text("text")

        # Split text into lines
        lines = text.splitlines()

        for line in lines:
            # Check if line contains a question
            question_match = question_pattern.search(line)
            if question_match:
                # Store the previous question if it exists
                if current_question:
                    correct_answer = get_correct_answer_from_llama(current_question, current_options)
                    questions.append({
                        "question": current_question,
                        "options": current_options,
                        "CorrectOption": correct_answer,
                        "points": int(current_points) if current_points else default_points
                    })

                # Initialize new question
                current_question = question_match.group(1) or question_match.group(2)
                current_options = []
                current_points = None
                continue

            # Check if line contains an option
            if option_pattern.match(line):
                option_text = option_pattern.match(line).group(1).strip()
                if option_text and "Correct Answer:" not in option_text and "Points:" not in option_text:
                    current_options.append(option_text)
                continue

            # Check if line contains points
            points_match = points_pattern.search(line)
            if points_match:
                current_points = points_match.group(1)

    # Append the last question if any
    if current_question:
        correct_answer = get_correct_answer_from_llama(current_question, current_options)
        questions.append({
            "question": current_question,
            "options": current_options,
            "CorrectOption": correct_answer,
            "points": int(current_points) if current_points else default_points
        })

    return questions

# Main function to process multiple PDF files and save as JSON
def generate_json_from_pdfs(pdf_paths, output_path):
    all_questions = []

    for pdf_path in pdf_paths:
        all_questions.extend(process_pdf(pdf_path))

    # Structure data as JSON
    quiz_data = {"questions": all_questions}

    # Write JSON data to output file
    with open(output_path, 'w') as f:
        json.dump(quiz_data, f, indent=2)

    print(f"JSON data has been saved to {output_path}")

# Specify PDF paths and output path for JSON
pdf_paths = ["C:/Users/satya/OneDrive/Desktop/React_Quiz.pdf"]  # Ensure this path is correct
output_path = 'questions.json'

# Run the JSON generation function
generate_json_from_pdfs(pdf_paths, output_path)
