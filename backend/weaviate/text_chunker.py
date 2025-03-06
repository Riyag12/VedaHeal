def chunk_text(text, chunk_size=500):
    """
    Splits text into smaller chunks for embedding.
    :param text: The extracted text
    :param chunk_size: Number of words per chunk
    :return: List of text chunks
    """
    words = text.split()
    return [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
