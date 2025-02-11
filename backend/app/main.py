from fastapi import FastAPI
import pandas as pd

app = FastAPI()

# Load Ayurvedic data
#df = pd.read_csv("../data/ayurveda_data.csv")

@app.get("/")
def home():
    return {"message": "Ayurveda API is running!"}

# @app.get("/diseases/{disease_name}")
# def get_disease(disease_name: str):
#     result = df[df["Disease Name"].str.lower() == disease_name.lower()]
#     return result.to_dict(orient="records")