import sys
import os
from database import SessionLocal
from database import Disease, Drug, Formulation
from data.mockdata import disease_data 

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

db = SessionLocal()

for disease in disease_data:
    db_disease = Disease(name=disease["name"])
    db.add(db_disease)
    db.commit()
    db.refresh(db_disease)

    for drug in disease["drugs"]:
        db_drug = db.query(Drug).filter(Drug.name == drug["name"]).first()
        
        if not db_drug:
            db_drug = Drug(name=drug["name"], scientific_name=drug["scientific_name"])
            db.add(db_drug)
            db.commit()
            db.refresh(db_drug)

        db_disease.drugs.append(db_drug)

        for formulation in drug["formulations"]:
            db_formulation = Formulation(
                name=formulation["name"],
                dosage=formulation["dosage"],
                drug_id=db_drug.id,
                disease_id=db_disease.id
            )
            db.add(db_formulation)

db.commit()
db.close()

print("Data inserted successfully!")