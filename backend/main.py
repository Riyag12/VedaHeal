from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, Disease, Drug, Formulation 
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append("C:/Users/admin/OneDrive/Desktop/VedaHeal/VedaHeal/backend/weaviate")

from weaviate_retriever import search_weaviate
from pydantic import BaseModel
import ollama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/diseases/{disease_name}")
def get_disease_info(disease_name: str, db: Session = Depends(get_db)):
    disease = db.query(Disease).filter(Disease.name.ilike(f"%{disease_name}%")).first()
    if not disease:
        return {"message": "No data found for this disease."}

    drugs = []
    for drug in disease.drugs:
        formulations = db.query(Formulation).filter(
            Formulation.drug_id == drug.id,
            Formulation.disease_id == disease.id
        ).all()

        drug_data = {
            "drug_name": drug.name,
            "scientific_name": drug.scientific_name if hasattr(drug, "scientific_name") else None,
            "formulations": [{"name": f.name, "dosage": f.dosage} for f in formulations]
        }
        drugs.append(drug_data)

    return {
        "disease": disease.name,
        "drugs": drugs
    }

# ✅ Fetch herb details and the diseases it can cure
@app.get("/herbs/{herb_name}")
def get_herb_info(herb_name: str, db: Session = Depends(get_db)):
    herb = db.query(Drug).filter(Drug.name.ilike(f"%{herb_name}%")).first()
    if not herb:
        return {"message": "No data found for this herb."}

    # ✅ Corrected Many-to-Many Query for Diseases Linked to This Herb
    diseases = db.query(Disease).join(Disease.drugs).filter(Disease.drugs.any(id=herb.id)).all()
    disease_names = [disease.name for disease in diseases]

    return {
        "name": herb.name,
        "scientific_name": herb.scientific_name,
        "diseases": disease_names
    }

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