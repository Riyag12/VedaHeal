import re

def clean_text(text):
    text = re.sub(r"\n+", "\n", text)  # Remove extra newlines
    text = re.sub(r"[^a-zA-Z0-9\s.,-]", "", text)  # Remove special characters
    text = text.lower()  # Convert to lowercase
    return text
