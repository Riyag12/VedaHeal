from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from database import Drug

router = APIRouter(prefix="/drugs", tags=["Drugs"])

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 📌 Get all drugs
@router.get("/")
def get_all_drugs(db: Session = Depends(get_db)):
    drugs = db.query(Drug).all()
    return drugs

# 📌 Get drug by name (exact match)
@router.get("/{drug_name}")
def get_drug_by_name(drug_name: str, db: Session = Depends(get_db)):
    drug = db.query(Drug).filter(Drug.name.ilike(f"%{drug_name}%")).first()
    if not drug:
        raise HTTPException(status_code=404, detail="Drug not found")
    return drug

# 📌 Get drugs based on properties (rasa, guna, virya, etc.)
@router.get("/search/")
def search_drugs(rasa: str = None, guna: str = None, virya: str = None, db: Session = Depends(get_db)):
    query = db.query(Drug)

    if rasa:
        query = query.filter(Drug.rasa.ilike(f"%{rasa}%"))
    if guna:
        query = query.filter(Drug.guna.ilike(f"%{guna}%"))
    if virya:
        query = query.filter(Drug.virya.ilike(f"%{virya}%"))

    results = query.all()
    if not results:
        raise HTTPException(status_code=404, detail="No drugs found matching criteria")
    
    return results
