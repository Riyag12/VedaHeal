# import spacy

# nlp = spacy.load("en_core_web_sm")

# def extract_entities(text):
#     doc = nlp(text)
#     diseases = set()
#     drugs = set()
    
#     for ent in doc.ents:
#         if ent.label_ == "DISEASE":
#             diseases.add(ent.text)
#         elif ent.label_ == "DRUG":
#             drugs.add(ent.text)
    
#     return diseases, drugs
import json
import spacy

BOOKS_DIR = "backend/data/books/"
PROCESSED_TEXT_FILE = os.path.join(BOOKS_DIR, "processed_text.json")
NLP_OUTPUT_FILE = os.path.join(BOOKS_DIR, "nlp_output.json")

nlp = spacy.load("en_core_web_sm")

def perform_nlp_analysis():
    """Applies Named Entity Recognition (NER) to extract relevant medical entities."""
    with open(PROCESSED_TEXT_FILE, "r", encoding="utf-8") as file:
        processed_data = json.load(file)

    for entry in processed_data:
        doc = nlp(entry["formulation"])
        entities = [ent.text for ent in doc.ents if ent.label_ in ["ORG", "GPE", "PERSON", "PRODUCT"]]
        entry["identified_entities"] = entities

    with open(NLP_OUTPUT_FILE, "w", encoding="utf-8") as json_file:
        json.dump(processed_data, json_file, indent=4, ensure_ascii=False)

    print(f"NLP analysis saved to {NLP_OUTPUT_FILE}")

if __name__ == "__main__":
    perform_nlp_analysis()
