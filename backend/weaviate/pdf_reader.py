import pymupdf as fitz
 # PyMuPDF

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    extracted_text = []

    for page_num in range(len(doc)):
        text = doc[page_num].get_text("text")
        extracted_text.append({"page": page_num + 1, "text": text})

    return extracted_text
