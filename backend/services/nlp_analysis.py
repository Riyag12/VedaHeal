import spacy

nlp = spacy.load("en_core_web_sm")

def extract_entities(text):
    doc = nlp(text)
    diseases = set()
    drugs = set()
    
    for ent in doc.ents:
        if ent.label_ == "DISEASE":
            diseases.add(ent.text)
        elif ent.label_ == "DRUG":
            drugs.add(ent.text)
    
    return diseases, drugs
