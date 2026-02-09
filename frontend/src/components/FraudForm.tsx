import { useState } from "react";
import type { TransactionInput, FraudResponse } from "../api/fraudApi";
import { predictFraud } from "../api/fraudApi";
import ResultCard from "./ResultCard";

const initialState: TransactionInput = {
  TransactionDT: 0,
  TransactionAmt: 0,
  tx_count_last_10: 0,
  avg_amt_last_10: 0,
  amt_deviation: 0,
  card1: 0,
  card2: 0,
  card3: 0,
  card5: 0,
  addr1: 0,
  addr2: 0,
};

const FIELD_INFO: Record<keyof TransactionInput, string> = {
  TransactionDT: "Time since first transaction (in seconds). Helps detect unusual timing patterns.",
  TransactionAmt: "Amount of the current transaction. Higher or abnormal amounts may indicate fraud.",
  tx_count_last_10: "Number of transactions made by this card in the last 10 transactions.",
  avg_amt_last_10: "Average transaction amount of the last 10 transactions for this card.",
  amt_deviation: "Difference between current amount and recent average. Large deviation is risky.",
  card1: "Primary card identifier. Used to track user behavior over time.",
  card2: "Secondary card attribute related to issuer or card type.",
  card3: "Card category or brand information.",
  card5: "Additional card-level risk attribute.",
  addr1: "Billing address region code. Mismatch patterns increase fraud risk.",
  addr2: "Secondary address indicator for finer location tracking.",
};

export default function FraudForm() {
  const [form, setForm] = useState<TransactionInput>(initialState);
  const [result, setResult] = useState<FraudResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState<keyof TransactionInput | null>(null);
  const [showHeaderInfo, setShowHeaderInfo] = useState(false);

  const handleChange = (key: keyof TransactionInput, value: number) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await predictFraud(form);
      setResult(res);
    } catch {
      setError("API error. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="card">
      {/* HEADER */}
      <div className="form-header">
        <h2>Transaction Details</h2>

        <div
          className="info-wrapper"
          onMouseEnter={() => setShowHeaderInfo(true)}
          onMouseLeave={() => setShowHeaderInfo(false)}
        >
          <span className="info-btn">ℹ️</span>

          {showHeaderInfo && (
            <div className="info-tooltip">
              Fill in transaction behavior metrics. These values help the fraud
              detection model analyze spending patterns, frequency spikes, and
              abnormal location behavior.
            </div>
          )}
        </div>
      </div>

      {/* FIELDS */}
      <div className="form-grid">
        {(Object.keys(form) as (keyof TransactionInput)[]).map((key) => (
          <div key={key} className="input-group">
            <div className="label-row">
              <label htmlFor={key}>{key}</label>

              <div
                className="field-info-wrapper"
                onMouseEnter={() => setActiveField(key)}
                onMouseLeave={() => setActiveField(null)}
              >
                <span className="field-info-btn">ℹ️</span>

                {activeField === key && (
                  <div className="field-tooltip">
                    {FIELD_INFO[key]}
                  </div>
                )}
              </div>
            </div>

            <input
              id={key}
              type="number"
              value={form[key]}
              onChange={(e) => handleChange(key, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <button onClick={submit} disabled={loading}>
        {loading ? "Analyzing..." : "Predict Fraud"}
      </button>

      {error && <p className="error">{error}</p>}
      {result && <ResultCard result={result} />}
    </div>
  );
}
