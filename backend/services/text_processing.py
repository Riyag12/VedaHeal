import json
import re
import os

BOOKS_DIR = os.path.abspath("data/books/")
EXTRACTED_TEXT_FILE = os.path.join(BOOKS_DIR, "extracted_text.json")
PROCESSED_TEXT_FILE = os.path.join(BOOKS_DIR, "processed_text.json")

def process_text():
    """Extracts drug names, scientific names, diseases, and formulations dynamically based on structure."""
    with open(EXTRACTED_TEXT_FILE, "r", encoding="utf-8") as file:
        raw_text = json.load(file)

    structured_data = []

    for page in raw_text:
        lines = [line.strip() for line in page.split("\n") if line.strip()]
        if len(lines) < 3:
            continue  # Skip pages with insufficient data

        # Step 1: Extract Drug Name (First Line)
        current_drug = lines[0]

        # Step 2: Extract Scientific Name (Second Line in Parentheses)
        if "(" in lines[1] and ")" in lines[1]:
            current_scientific_name = lines[1]
            lines = lines[2:]  # Remove drug and scientific name from further processing
        else:
            current_scientific_name = None  # Reset if not found

        # Step 3: Check if Diseases and Formulations are Interleaved or Separated
        diseases = []
        formulations = []
        temp_formulation = ""
        is_separated = False  # Flag to detect if they are separate blocks

        for i, line in enumerate(lines):
            if re.match(r"^[A-Za-z\s&]+$", line) and not any(c.isdigit() for c in line):
                # If formulations already exist, mark structure as separated
                if formulations:
                    is_separated = True

                diseases.append(line)
                if temp_formulation:
                    formulations.append(temp_formulation.strip())
                    temp_formulation = ""

            else:
                temp_formulation += " " + line.strip()

        if temp_formulation:
            formulations.append(temp_formulation.strip())

        # Step 4: Map Diseases to Formulations
        if is_separated:
            for i in range(min(len(diseases), len(formulations))):
                structured_data.append({
                    "drug": current_drug,
                    "scientific_name": current_scientific_name,
                    "disease": diseases[i].strip(),
                    "formulation": formulations[i].strip()
                })
        else:
            for i in range(0, len(lines) - 1, 2):  # Interleaved structure
                if i + 1 < len(lines):
                    structured_data.append({
                        "drug": current_drug,
                        "scientific_name": current_scientific_name,
                        "disease": lines[i].strip(),
                        "formulation": lines[i + 1].strip()
                    })

    # Save to JSON
    with open(PROCESSED_TEXT_FILE, "w", encoding="utf-8") as json_file:
        json.dump(structured_data, json_file, indent=4, ensure_ascii=False)

    print(f"✅ Processed text saved to {PROCESSED_TEXT_FILE}")

if __name__ == "__main__":
    process_text()
