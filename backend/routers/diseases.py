from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from database import Disease

router = APIRouter(prefix="/diseases", tags=["Diseases"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/{disease_name}")
def get_disease(disease_name: str, db: Session = Depends(get_db)):
    return db.query(Disease).filter(Disease.name.ilike(f"%{disease_name}%")).all()
