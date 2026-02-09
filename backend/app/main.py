from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .predictor import predict_fraud
from .explainer import explain_transaction

app = FastAPI(title="Fraud Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TransactionInput(BaseModel):
    TransactionDT: float
    TransactionAmt: float
    tx_count_last_10: float
    avg_amt_last_10: float
    amt_deviation: float
    card1: float
    card2: float
    card3: float
    card5: float
    addr1: float
    addr2: float

@app.post("/predict")
def predict(tx: TransactionInput):
    prob, decision, scaled_row = predict_fraud(tx.dict())
    reasons = explain_transaction(scaled_row)

    return {
        "fraud_probability": round(prob, 3),
        "decision": decision,
        "reasons": reasons
    }
