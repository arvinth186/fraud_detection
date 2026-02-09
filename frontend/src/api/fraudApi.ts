export interface TransactionInput {
  TransactionDT: number;
  TransactionAmt: number;
  tx_count_last_10: number;
  avg_amt_last_10: number;
  amt_deviation: number;
  card1: number;
  card2: number;
  card3: number;
  card5: number;
  addr1: number;
  addr2: number;
}

export interface FraudResponse {
  fraud_probability: number;
  decision: string;
  reasons: string[];
}

const API_URL = "https://fraud-detection-ftbu.onrender.com";

export async function predictFraud(
  data: TransactionInput
): Promise<FraudResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Prediction failed");
  }

  return res.json();
}
