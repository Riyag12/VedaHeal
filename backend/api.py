import sys
sys.path.append("C:/Users/admin/OneDrive/Desktop/VedaHeal/VedaHeal/backend/weaviate")

from weaviate_retriever import search_weaviate

from fastapi import FastAPI
from pydantic import BaseModel
import ollama
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "FastAPI is running!"}

class QueryRequest(BaseModel):
    query: str

def generate_response(query):
    retrieved_chunks = search_weaviate(query)
    
    # Format retrieved data as context
    context = "\n".join([f"{res['content']}" for res in retrieved_chunks])

    # Construct the optimized prompt
    prompt = f"""
    You are an Ayurveda expert. Answer the question concisely in 2-3 lines using the given Ayurvedic texts.

    Context:
    {context}

    Question: {query}
    
    Provide a short answer:
    """

    response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])

    return response["message"]["content"]

@app.post("/chat")
async def chat(request: QueryRequest):
    try:
        print(f"User Query: {request.query}")
        response_text = generate_response(request.query)

        print(f"Response: {response_text}")
        return {"response": response_text}

    except Exception as e:
        print(f"❌ Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Run locally: uvicorn api:app --reload
