from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, Disease, Drug, Formulation 
from fastapi.middleware.cors import CORSMiddleware

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
        formulations = db.query(Formulation).filter(Formulation.drug_id == drug.id).all()
        drug_data = {
            "drug_name": drug.name,
            "scientific_name": drug.scientific_name,
            "formulations": [{"name": f.name, "ingredients": f.ingredients, "dosage": f.dosage} for f in formulations]
        }
        drugs.append(drug_data)

    return {
        "disease": disease.name,
        "sanskrit_name": disease.sanskrit_name,
        "description": disease.description,
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
