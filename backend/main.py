# from fastapi import FastAPI
# from routers import diseases, drugs, formulations
# from database import engine, Base
# from fastapi.middleware.cors import CORSMiddleware

# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(diseases.router)
# app.include_router(drugs.router)
# app.include_router(formulations.router)

# @app.get("/")
# def root():
#     return {"message": "Ayurveda Drug Suggestion API"}


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
