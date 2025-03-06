import ollama
from weaviate_retriever import search_weaviate

def generate_response(query):
    """
    Retrieves relevant text from Weaviate and generates an AI-powered response using Llama 2 via Ollama.
    
    :param query: User's input question
    :return: AI-generated response
    """
    retrieved_chunks = search_weaviate(query)

    # Format retrieved data as context
    context = "\n".join([f"🔹 {res['content']}" for res in retrieved_chunks])

    # Construct the prompt for Llama 2
    prompt = f"""
    You are an expert in Ayurveda. Use the following Ayurvedic texts to answer the user's question.

    Context:
    {context}

    Question: {query}
    Answer:
    """

    response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])

    return response["message"]["content"]

# Example usage
if __name__ == "__main__":
    user_query = "What are the benefits of Triphala?"
    answer = generate_response(user_query)
    print(f"🤖 Chatbot Answer:\n{answer}")
