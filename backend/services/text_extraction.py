import os
import json
import pytesseract
from pdf2image import convert_from_path
from PIL import Image

BOOKS_DIR = os.path.abspath("data/books/")
SCANNED_PDF = os.path.join(BOOKS_DIR, "AyurvedicHomeRemedies.pdf")
EXTRACTED_TEXT_FILE = os.path.join(BOOKS_DIR, "extracted_text.json")

def extract_text_from_scanned_pdf(pdf_path, output_text_file):
    """Extracts text from a scanned PDF using OCR (Tesseract)."""

    # Convert PDF pages to images
    images = convert_from_path(pdf_path)

    extracted_pages = []
    
    for i, img in enumerate(images):
        # Perform OCR on each page
        text = pytesseract.image_to_string(img, lang="eng")  # Use 'eng' for English text
        extracted_pages.append(text.strip())
        print(f"✅ Processed Page {i+1}/{len(images)}")  # Progress tracking

    # Save extracted text to JSON
    with open(output_text_file, "w", encoding="utf-8") as json_file:
        json.dump(extracted_pages, json_file, indent=4, ensure_ascii=False)

    print(f"✅ OCR text saved to {output_text_file}")

if __name__ == "__main__":
    extract_text_from_scanned_pdf(SCANNED_PDF, EXTRACTED_TEXT_FILE)
