import type { FraudResponse } from "../api/fraudApi";

export default function ResultCard({ result }: { result: FraudResponse }) {
  return (
    <div className={`result ${result.decision.toLowerCase()}`}>
      <h2>Decision: {result.decision}</h2>
      <p>Fraud Probability: {result.fraud_probability}</p>

      <h3>Why?</h3>
      <ul>
        {result.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
