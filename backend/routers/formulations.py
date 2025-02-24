from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from database import Formulation

router = APIRouter(prefix="/formulations", tags=["Formulations"])

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 📌 Get all formulations
@router.get("/")
def get_all_formulations(db: Session = Depends(get_db)):
    formulations = db.query(Formulation).all()
    return formulations

# 📌 Get formulation by name (exact match)
@router.get("/{formulation_name}")
def get_formulation_by_name(formulation_name: str, db: Session = Depends(get_db)):
    formulation = db.query(Formulation).filter(Formulation.name.ilike(f"%{formulation_name}%")).first()
    if not formulation:
        raise HTTPException(status_code=404, detail="Formulation not found")
    return formulation

# 📌 Get formulations based on ingredients (partial match)
@router.get("/search/")
def search_formulations(ingredient: str = None, db: Session = Depends(get_db)):
    query = db.query(Formulation)

    if ingredient:
        query = query.filter(Formulation.ingredients.ilike(f"%{ingredient}%"))

    results = query.all()
    if not results:
        raise HTTPException(status_code=404, detail="No formulations found matching criteria")

    return results
