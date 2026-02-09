import pandas as pd
from .model_loader import model, scaler

FEATURES = [
    "TransactionDT",
    "TransactionAmt",
    "tx_count_last_10",
    "avg_amt_last_10",
    "amt_deviation",
    "card1",
    "card2",
    "card3",
    "card5",
    "addr1",
    "addr2"
]

THRESHOLD = 0.7

def predict_fraud(tx: dict):
    df = pd.DataFrame([tx])[FEATURES]
    X_scaled = scaler.transform(df)

    prob = model.predict_proba(X_scaled)[0][1]
    decision = "BLOCK" if prob >= THRESHOLD else "ALLOW"

    return prob, decision, X_scaled[0]
