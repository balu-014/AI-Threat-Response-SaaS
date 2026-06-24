from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import joblib
from predict import analyze
from fastapi.middleware.cors import CORSMiddleware
from threat_utils import get_severity

app = FastAPI(
    title="AI Threat Response API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "../models/threat_model.pkl"
)

model = joblib.load(MODEL_PATH)


class ThreatInput(BaseModel):
    features: List[float]


@app.get("/")
def home():
    return {
        "message": "AI Threat Response API Running"
    }


@app.post("/predict")
def predict(data: ThreatInput):

    prediction = int(
        model.predict([data.features])[0]
    )

    severity = get_severity(prediction)

    return {
        "prediction": prediction,
        "severity": severity,
        "message": "Threat analysis completed"
    }