# import sys
# import os

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# from database import SessionLocal
# from models import AyurvedaText
# from services.text_extraction import extract_text_from_pdf  # Import function

# db = SessionLocal()
# pdf_text = extract_text_from_pdf("data/books/AyurvedicHomeRemedies.pdf")

# # Create a new record
# new_entry = AyurvedaText(title="Ayurvedic Home Remedies", content=pdf_text)
# db.add(new_entry)
# db.commit()
# db.refresh(new_entry)

# print("✅ Data inserted successfully!")

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from database import SessionLocal
from database import Disease, Drug, Formulation
from data.mockdata import disease_data 
db = SessionLocal()

# ✅ Disease, Drug & Formulation Data
# disease_data = [
#     {
#         "name": "Skin diseases",
#         "drugs": [
#             {
#                 "name": "Kalimirach",
#                 "scientific_name": "Piper nigrum Linn., Maricha",
#                 "formulations": [
#                     {"name": "Kalimirach Skin Remedy", "ingredients": "Kalimirach, ghee, honey", "preparation_method": "Mix ingredients and consume.", "dosage": "1 gm powder of seeds with ghee and honey twice daily."}
#                 ],
#             },
#             {
#                 "name": "Karela",
#                 "scientific_name": "Momordica charantia Linn., Karavellaka",
#                 "formulations": [
#                     {"name": "Karela Juice Remedy", "ingredients": "Karela juice", "preparation_method": "Drink on an empty stomach.", "dosage": "5-10 ml juice every morning."}
#                 ],
#             },
#         ],
#     },
#     {
#         "name": "Indigestion",
#         "drugs": [
#             {
#                 "name": "Kalimirach",
#                 "scientific_name": "Piper nigrum Linn., Maricha",
#                 "formulations": [
#                     {"name": "Kalimirach Indigestion Remedy", "ingredients": "Kalimirach, ginger, rock salt", "preparation_method": "Mix ingredients and take before meals.", "dosage": "A pinch before meals."}
#                 ],
#             },
#             {
#                 "name": "Karela",
#                 "scientific_name": "Momordica charantia Linn., Karavellaka",
#                 "formulations": [
#                     {"name": "Karela Juice for Digestion", "ingredients": "Karela juice", "preparation_method": "Drink twice daily.", "dosage": "5-10 ml juice of fruit twice daily."}
#                 ],
#             },
#         ],
#     },
# ]

# ✅ Insert Data
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
                name=formulation["name"], ingredients=formulation["ingredients"],
                preparation_method=formulation["preparation_method"], dosage=formulation["dosage"],
                drug_id=db_drug.id
            )
            db.add(db_formulation)

db.commit()
db.close()

print("✅ Data inserted successfully!")
