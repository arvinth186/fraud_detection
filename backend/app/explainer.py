import numpy as np
from .model_loader import model

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

def explain_transaction(scaled_row):
    contributions = scaled_row * model.coef_[0]

    top_idx = np.argsort(np.abs(contributions))[::-1][:5]
    reasons = []

    for i in top_idx:
        f = FEATURES[i]
        if f == "avg_amt_last_10":
            reasons.append("Unusual recent spending pattern")
        elif f == "amt_deviation":
            reasons.append("Transaction deviates from normal behavior")
        elif "card" in f:
            reasons.append("Card usage increased risk")
        else:
            reasons.append(f"{f} influenced risk")

    return reasons
