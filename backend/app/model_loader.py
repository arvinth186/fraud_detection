import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

model = joblib.load(os.path.join(BASE_DIR, "models", "fraud_model.pkl"))
scaler = joblib.load(os.path.join(BASE_DIR, "models", "scaler.pkl"))
